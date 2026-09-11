import { NextResponse } from 'next/server';

const BRAND_KEY = 'pronto';
const BRAND_NAME = 'Pronto Energy';
const ASSIGNED_TEAM = 'Pronto Energy Sales';
const PRONTO_GHL_LOCATION_ID = 'P3Xk1DXrNRFozNsGQeJ8';
const UPSTREAM_TIMEOUT_MS = 5000;
const ALLOWED_REQUEST_BRANDS = new Set(['pronto', 'pronto_energy']);
const ALLOWED_FORM_TYPES = new Set([
  'vendor',
  'artist_painter',
  'artist_music',
  'influencer',
  'sponsor',
  'consultation',
  'onboarding',
  'what_you_do',
  'rsvp',
  'intern',
  'volunteer',
  'hiring_inquiry',
  'inquiry',
  'group_pricing',
  'table_reservation',
  'nda',
]);
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'];

function clean(value, max = 5000) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function cleanUtm(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  return Object.fromEntries(
    UTM_KEYS.map((key) => [key, clean(value[key], 200)]).filter(([, item]) => item)
  );
}

function formDetails(formType, fields) {
  const lines = Object.entries(fields || {})
    .filter(([, value]) => value !== '' && value !== null && value !== undefined)
    .map(([key, value]) => `${key.replaceAll('_', ' ')}: ${String(value)}`);
  return [`[${formType}]`, ...lines].join('\n').slice(0, 5000);
}

function makeReference() {
  const date = new Date().toISOString().slice(0, 10).replaceAll('-', '');
  return `PRONTO-${date}-${crypto.randomUUID().replaceAll('-', '').slice(0, 10).toUpperCase()}`;
}

async function storeLead({ reference, formType, name, email, phone, source, fields, utm }) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, '');
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) throw new Error('storage_not_configured');

  const organization = clean(
    fields.organization || fields.business_name || fields.company || fields.company_name,
    200
  );

  const response = await fetch(`${url}/rest/v1/pronto_quote_requests`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: key,
      Authorization: `Bearer ${key}`,
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({
      brand_key: BRAND_KEY,
      ghl_location_id: PRONTO_GHL_LOCATION_ID,
      inquiry_type: formType,
      name,
      email,
      phone: phone || null,
      organization: organization || null,
      details: formDetails(formType, fields),
      reference,
      workflow_status: 'submitted',
      consent_at: new Date().toISOString(),
      marketing_consent: false,
      source_page: source || `${BRAND_NAME} Website`,
      utm,
      assigned_team: ASSIGNED_TEAM,
    }),
    signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
  });

  if (!response.ok) {
    const message = await response.text();
    const error = new Error(/rate limit|too many/i.test(message) ? 'rate_limit' : 'storage_failed');
    error.cause = message;
    throw error;
  }
}

export async function POST(request) {
  let reference = null;

  try {
    const body = await request.json();
    const requestBrand = clean(body.brand_key || body.brand, 80).toLowerCase();
    const formType = clean(body.formType || body.form_type, 80);
    const name = clean(body.name || body.full_name, 120);
    const email = clean(body.email, 254).toLowerCase();
    const phone = clean(body.phone, 50);
    const source = clean(body.source, 500);
    const fields = body.fields || body.form_data || body;
    const utm = cleanUtm(body.utm);

    if (!ALLOWED_REQUEST_BRANDS.has(requestBrand)) {
      return NextResponse.json(
        { success: false, error: 'invalid_pronto_brand' },
        { status: 400, headers: { 'Cache-Control': 'no-store' } }
      );
    }

    if (!ALLOWED_FORM_TYPES.has(formType)) {
      return NextResponse.json(
        { success: false, error: 'unsupported_pronto_form' },
        { status: 400, headers: { 'Cache-Control': 'no-store' } }
      );
    }

    if (clean(fields.company_website, 200)) {
      return NextResponse.json({ success: true }, { headers: { 'Cache-Control': 'no-store' } });
    }

    if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid name and email.' },
        { status: 400, headers: { 'Cache-Control': 'no-store' } }
      );
    }

    reference = makeReference();
    await storeLead({ reference, formType, name, email, phone, source, fields, utm });

    return NextResponse.json(
      {
        success: true,
        message: 'Received. Our Pronto team will be in touch.',
        reference,
        persistence: 'database',
        crmQueued: true,
        crmSynced: false,
      },
      { status: 202, headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (error) {
    const rateLimited = error?.message === 'rate_limit';
    console.error('Pronto form submission failed:', error?.message || error);
    return NextResponse.json(
      {
        success: false,
        error: rateLimited
          ? 'Pronto intake is busy. Please retry shortly.'
          : 'Pronto intake is temporarily unavailable. Please retry shortly.',
        reference,
      },
      {
        status: rateLimited ? 429 : 503,
        headers: { 'Retry-After': rateLimited ? '120' : '60', 'Cache-Control': 'no-store' },
      }
    );
  }
}
