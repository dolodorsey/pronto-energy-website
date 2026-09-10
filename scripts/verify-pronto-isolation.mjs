import { readFileSync } from 'node:fs';

const route = readFileSync('src/app/api/forms/route.js', 'utf8');
const submitAlias = readFileSync('src/app/api/forms/submit/route.js', 'utf8');
const formClient = readFileSync('src/components/KHGForms.jsx', 'utf8');
const connectPage = readFileSync('src/app/connect/page.jsx', 'utf8');
const formsIndex = readFileSync('src/app/forms/page.jsx', 'utf8');
const formLayout = readFileSync('src/app/forms/[type]/layout.jsx', 'utf8');
const migration = readFileSync(
  'supabase/migrations/20260904074606_pronto_isolated_intake_and_crm_outbox.sql',
  'utf8'
);

const approvedFormSet = "['vendor', 'influencer', 'sponsor', 'inquiry']";

const requiredRouteMarkers = [
  "const BRAND_KEY = 'pronto'",
  "const ASSIGNED_TEAM = 'Pronto Energy Sales'",
  "const PRONTO_GHL_LOCATION_ID = 'P3Xk1DXrNRFozNsGQeJ8'",
  "const ALLOWED_REQUEST_BRANDS = new Set(['pronto', 'pronto_energy'])",
  `const ALLOWED_FORM_TYPES = new Set(${approvedFormSet})`,
  'const UPSTREAM_TIMEOUT_MS = 5000',
  '/rest/v1/pronto_quote_requests',
  'syncFallbackCrm',
  'utmFromReferer(request)',
  'formatAttribution(utm)',
  "'Retry-After': '60'",
  "persistence: outcome.persistence",
];

for (const marker of requiredRouteMarkers) {
  if (!route.includes(marker)) {
    throw new Error(`Pronto isolation contract missing route marker: ${marker}`);
  }
}

const brandGuard = 'if (!ALLOWED_REQUEST_BRANDS.has(requestBrand))';
const formGuard = 'if (!ALLOWED_FORM_TYPES.has(formType))';
const brandGuardIndex = route.indexOf(brandGuard);
const formGuardIndex = route.indexOf(formGuard);
const referenceIndex = route.indexOf('reference = makeReference()');
const databaseIndex = route.indexOf('/rest/v1/pronto_quote_requests');
if (
  brandGuardIndex < 0 ||
  formGuardIndex < 0 ||
  referenceIndex < 0 ||
  databaseIndex < 0
) {
  throw new Error('Pronto isolation contract cannot prove request guard ordering');
}
if (brandGuardIndex > formGuardIndex || formGuardIndex > referenceIndex) {
  throw new Error('Pronto brand and form-type guards must execute before a lead reference is created');
}

const requiredClientMarkers = [
  "fetch('/api/forms'",
  'body: JSON.stringify({ brand_key: brandKey, form_type: formType, ...formData })',
];
for (const marker of requiredClientMarkers) {
  if (!formClient.includes(marker)) {
    throw new Error(`Pronto live form client contract missing marker: ${marker}`);
  }
}

if (submitAlias.trim() !== "export { POST } from '../route.js';") {
  throw new Error('Pronto /api/forms/submit alias must delegate only to the isolated Pronto POST route');
}

const requiredConnectMarkers = [
  `const SECONDARY_FORMS = ${approvedFormSet}`,
  '<KHGFormGrid',
  'brandKey="pronto_energy"',
  'forms={SECONDARY_FORMS}',
  'Partner With Pronto',
  'khg-forms.vercel.app/water/pronto-energy/wholesale',
  'khg-forms.vercel.app/water/pronto-energy/retail',
  'khg-forms.vercel.app/water/pronto-energy/distribution',
  'khg-forms.vercel.app/water/pronto-energy/events',
];
for (const marker of requiredConnectMarkers) {
  if (!connectPage.includes(marker)) {
    throw new Error(`Pronto connect page missing scoped marker: ${marker}`);
  }
}

const forbiddenConnectMarkers = [
  'showSelective={false}',
  'View every Pronto Energy inquiry',
  '/forms/index',
];
for (const marker of forbiddenConnectMarkers) {
  if (connectPage.includes(marker)) {
    throw new Error(`Pronto connect page exposes forbidden generic form surface: ${marker}`);
  }
}

if (!formsIndex.includes("redirect('/connect')")) {
  throw new Error('Pronto generic forms index must redirect to the scoped /connect page');
}
if (!formLayout.includes(`const ALLOWED_PRONTO_FORM_TYPES = new Set(${approvedFormSet})`)) {
  throw new Error('Pronto standalone form layout must use the approved form allowlist');
}
if (!formLayout.includes("redirect('/connect')")) {
  throw new Error('Unsupported Pronto standalone form routes must redirect to /connect');
}

const forbiddenRouteMarkers = [
  '/rest/v1/quote_requests',
  'process.env.GHL_LOCATION_ID',
  "assigned_team: 'Water Portfolio Sales'",
  'Infinity Water',
  'ORA Sparkling Water',
];

for (const marker of forbiddenRouteMarkers) {
  if (route.includes(marker)) {
    throw new Error(`Pronto isolation contract found forbidden route marker: ${marker}`);
  }
}

const requiredMigrationMarkers = [
  'public.pronto_quote_requests',
  'public.pronto_crm_outbox',
  "ghl_location_id = 'P3Xk1DXrNRFozNsGQeJ8'",
  "assigned_team = 'Pronto Energy Sales'",
  'enable row level security',
  'revoke all on table public.pronto_crm_outbox from public, anon, authenticated',
];

for (const marker of requiredMigrationMarkers) {
  if (!migration.includes(marker)) {
    throw new Error(`Pronto isolation contract missing migration marker: ${marker}`);
  }
}

const forbiddenNamespaces = [
  'infinity_quote_requests',
  'ora_',
  'island_',
  'noir_',
  'otini_',
  'tempo_',
  'casa_cantina_',
  'xxx_',
  'prive_',
];

for (const marker of forbiddenNamespaces) {
  if (migration.toLowerCase().includes(marker)) {
    throw new Error(`Pronto migration references another beverage namespace: ${marker}`);
  }
}

console.log('Pronto isolation contract: PASS');
