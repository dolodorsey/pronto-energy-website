import { NextResponse } from 'next/server';

/**
 * POST /api/forms
 * 
 * Receives form submissions from any KHG form component,
 * upserts the contact into GHL via Contacts API,
 * applies tags, and stores form-specific data in notes.
 * 
 * Required env vars per brand site:
 *   GHL_PIT_TOKEN=pit-xxxxx
 *   GHL_LOCATION_ID=xxxxx
 *   NEXT_PUBLIC_BRAND_KEY=huglife
 */

const GHL_API = 'https://services.leadconnectorhq.com';
const ALLOWED_FORM_TYPES = new Set(['inquiry', 'group_pricing']);

export async function POST(request) {
  try {
    const contentLength = Number(request.headers.get('content-length') || 0);
    if (contentLength > 25000) {
      return NextResponse.json({ error: 'Submission is too large' }, { status: 413 });
    }
    const body = await request.json();
    const { formType, name, email, phone, source, fields = {}, website, consent, requestId } = body;
    if (website) return NextResponse.json({ success: true }, { status: 202 });

    if (!formType || !name || !email) {
      return NextResponse.json(
        { error: 'Missing required fields: formType, name, email' },
        { status: 400 }
      );
    }
    if (
      typeof formType !== 'string' || !ALLOWED_FORM_TYPES.has(formType) ||
      typeof name !== 'string' || name.trim().length > 120 ||
      typeof email !== 'string' || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      (phone && (typeof phone !== 'string' || phone.length > 40)) ||
      !fields || typeof fields !== 'object' || Array.isArray(fields) ||
      Object.keys(fields).length > 30 ||
      JSON.stringify(fields).length > 4000 ||
      Object.values(fields).some(value => typeof value === 'string' && value.length > 2000) ||
      consent !== true ||
      typeof requestId !== 'string' || !/^[a-zA-Z0-9-]{8,80}$/.test(requestId)
    ) {
      return NextResponse.json({ error: 'Invalid submission' }, { status: 400 });
    }

    const pitToken = process.env.GHL_PIT_TOKEN;
    const locationId = process.env.GHL_LOCATION_ID;

    if (!pitToken || !locationId) {
      console.error('Missing GHL_PIT_TOKEN or GHL_LOCATION_ID');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Build the notes string with all form-specific fields
    const formTag = `form_${formType}`;
    const timestamp = new Date().toISOString();
    const notesLines = [
      `═══ ${formType.toUpperCase().replace(/_/g, ' ')} SUBMISSION ═══`,
      `Submitted: ${timestamp}`,
      `Source: ${source || 'Website'}`,
      `Receipt: ${requestId}`,
      '',
      ...Object.entries(fields).map(([k, v]) => `${k.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}: ${v}`),
    ];
    const notesText = notesLines.join('\n');

    // Split name into first/last
    const nameParts = name.trim().split(/\s+/);
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    // Upsert contact in GHL
    const contactPayload = {
      firstName,
      lastName,
      email,
      phone: phone || undefined,
      locationId,
      source: `KHG Form: ${formType.replace(/_/g, ' ')}`,
      tags: [formTag, 'website_form', `form_${timestamp.split('T')[0]}`],
    };

    // Remove undefined values
    Object.keys(contactPayload).forEach(k => {
      if (contactPayload[k] === undefined) delete contactPayload[k];
    });

    const contactRes = await fetch(`${GHL_API}/contacts/upsert`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${pitToken}`,
        'Version': '2021-07-28',
      },
      body: JSON.stringify(contactPayload),
    });

    if (!contactRes.ok) {
      const errText = await contactRes.text();
      console.error('GHL contact upsert failed:', contactRes.status, errText);
      return NextResponse.json({ error: 'We could not safely save your request. Please try again.' }, { status: 502 });
    }

    const contactData = await contactRes.json();
    const contactId = contactData?.contact?.id;
    if (!contactId) {
      console.error('GHL contact upsert returned no contact id');
      return NextResponse.json({ error: 'We could not safely save your request. Please try again.' }, { status: 502 });
    }

    // Add notes with form details
    const noteRes = await fetch(`${GHL_API}/contacts/${contactId}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${pitToken}`,
        'Version': '2021-07-28',
      },
      body: JSON.stringify({ body: notesText }),
    });
    if (!noteRes.ok) {
      console.error('GHL note creation failed:', noteRes.status);
      return NextResponse.json({ error: 'Your contact was saved, but the request details were not. Please try again.' }, { status: 502 });
    }

    return NextResponse.json({
      success: true,
      message: 'Form submitted successfully. Our team will be in touch.',
      receiptId: requestId,
    });
  } catch (err) {
    console.error('Form API error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
