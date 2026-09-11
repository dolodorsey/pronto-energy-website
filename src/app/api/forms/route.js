import { NextResponse } from 'next/server';
import { decideProntoIntakeOutcome } from '../../../lib/pronto-intake-policy.mjs';

const BRAND_KEY = 'pronto';
const BRAND_NAME = 'Pronto Energy';
const ASSIGNED_TEAM = 'Pronto Energy Sales';
const PRONTO_GHL_LOCATION_ID = 'P3Xk1DXrNRFozNsGQeJ8';
const PRONTO_GHL_FALLBACK_CERTIFIED = process.env.PRONTO_GHL_FALLBACK_CERTIFIED === 'true';
const GHL_API = 'https://services.leadconnectorhq.com';
const UPSTREAM_TIMEOUT_MS = 5000;
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'];
const ALLOWED_REQUEST_BRANDS = new Set(['pronto', 'pronto_energy']);
const ALLOWED_FORM_TYPES = new Set(['vendor', 'influencer', 'sponsor', 'inquiry']);

function clean(value, max = 5000) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function cleanUtm(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  return Object.fromEntries(
    UTM_KEYS.map((key) => [key, clean(value[key], 200)]).filter(([, item]) => item)
  );
}

function utmFromReferer(request) {
  const referer = request.headers.get('referer');
  if (!referer) return {};

  try {
    const url = new URL(referer);
    return Object.fromEntries(
      UTM_KEYS.map((key) => [key, clean(url.searchParams.get(key), 200)]).filter(([, item]) => item)
    );
  } catch {
    return {};
  }
}

function formatAttribution(utm) {
  const entries = Object.entries(utm || {});
  if (!entries.length) return 'Attribution: none captured';
  return `Attribution: ${entries.map(([key, value]) => `${key}=${value}`).join('; ')}`;
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

  if (!url || !key) {
    throw new Error('storage_not_configured');
  }

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
    throw new Error('storage_failed');
  }
}

async function syncFallbackCrm({ reference, formType, name, email, phone, fields, utm }) {
  const pitToken = process.env.GHL_PIT_TOKEN;
  if (!pitToken || !PRONTO_GHL_FALLBACK_CERTIFIED) return false;

  const [firstName = '', ...lastNameParts] = name.split(/\s+/);
  const contactResponse = await fetch(`${GHL_API}/contacts/upsert`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${pitToken}`,
      Version: '2021-07-28',
    },
    body: JSON.stringify({
      firstName,
      lastName: lastNameParts.join(' '),
      email,
      phone: phone || undefined,
      locationId: PRONTO_GHL_LOCATION_ID,
      source: `${BRAND_NAME}: ${formType.replaceAll('_', ' ')}`,
      tags: [
        `form_${formType}`,
        'website_form',
        BRAND_KEY,
        'database_fallback',
        'inquiry_only',
        'marketing_consent_unverified',
      ],
    }),
    signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
  });

  if (!contactResponse.ok) return false;
  const contact = await contactResponse.json();
  const contactId = contact?.contact?.id;
  if (!contactId) return true;

  const noteResponse = await fetch(`${GHL_API}/contacts/${contactId}/notes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${pitToken}`,
      Version: '2021-07-28',
    },
    body: JSON.stringify({
      body: `Pronto reference: ${reference}\nPersistence: CRM fallback while database unavailable\nMarketing consent: not collected\n${formatAttribution(utm)}\n${formDetails(formType, fields)}`,
    }),
    signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
  });

  return noteResponse.ok;
}

export async function POST(request) {
  let reference = null;

  try {
    const body = await request.json();
    const requestBrand = clean(body.brand_key || body.brand, 80).toLowerCase();

    if (!ALLOWED_REQUEST_BRANDS.has(requestBrand)) {
      return NextResponse.json(
        { success: false, error: 'invalid_pronto_brand' },
        { status: 400, headers: { 'Cache-Control': 'no-store' } }
      );
    }

    const formType = clean(body.formType || body.form_type, 80);
    if (!ALLOWED_FORM_TYPES.has(formType)) {
      return NextResponse.json(
        { success: false, error: 'unsupported_pronto_form' },
        { status: 400, headers: { 'Cache-Control': 'no-store' } }
      );
    }

    const name = clean(body.name || body.full_name, 120);
    const email = clean(body.email, 254).toLowerCase();
    const phone = clean(body.phone, 50);
    const referer = clean(request.headers.get('referer'), 500);
    const source = clean(body.source, 500) || referer;
    const fields = body.fields || body.form_data || body;
    const utm = { ...utmFromReferer(request), ...cleanUtm(body.utm) };

    if (clean(fields.company_website, 200)) {
      return NextResponse.json({ success: true });
    }
    if (
      formType.length < 2 ||
      name.length < 2 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid form type, name, and email.' },
        { status: 400, headers: { 'Cache-Control': 'no-store' } }
      );
    }

    reference = makeReference();
    let databasePersisted = false;
    let crmPersisted = false;

    try {
      await storeLead({ reference, formType, name, email, phone, source, fields, utm });
      databasePersisted = true;
    } catch (storageError) {
      console.error('Pronto database persistence failed:', storageError?.message || storageError);
      crmPersisted = await syncFallbackCrm({
        reference,
        formType,
        name,
        email,
        phone,
        fields,
        utm,
      }).catch((crmError) => {
        console.error('Pronto CRM fallback failed:', crmError?.message || crmError);
        return false;
      });
    }

    const outcome = decideProntoIntakeOutcome({ databasePersisted, crmPersisted });

    if (outcome.status === 503) {
      return NextResponse.json(
        {
          success: false,
          error: 'Pronto intake is temporarily unavailable. Please retry shortly.',
          reference,
          persistence: outcome.persistence,
        },
        {
          status: 503,
          headers: { 'Retry-After': '60', 'Cache-Control': 'no-store' },
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message:
          outcome.persistence === 'crm_only'
            ? 'Received. Your Pronto reference is secured and our sales team will be in touch.'
            : 'Received. Our sales team will be in touch.',
        reference,
        persistence: outcome.persistence,
        crmQueued: outcome.crmQueued,
        crmSynced: crmPersisted,
        reconciliationRequired: outcome.reconciliationRequired,
      },
      {
        status: outcome.status,
        headers: { 'Cache-Control': 'no-store' },
      }
    );
  } catch (error) {
    console.error('Pronto form submission failed:', error?.message || error);
    return NextResponse.json(
      {
        success: false,
        error: 'Pronto intake is temporarily unavailable. Please retry shortly.',
        reference,
      },
      {
        status: 503,
        headers: { 'Retry-After': '60', 'Cache-Control': 'no-store' },
      }
    );
  }
}
