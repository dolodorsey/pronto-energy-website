import { readFileSync } from 'node:fs';

const route = readFileSync('src/app/api/forms/route.js', 'utf8');
const migration = readFileSync(
  'supabase/migrations/20260904074606_pronto_isolated_intake_and_crm_outbox.sql',
  'utf8'
);

const requiredRouteMarkers = [
  "const BRAND_KEY = 'pronto'",
  "const ASSIGNED_TEAM = 'Pronto Energy Sales'",
  "const PRONTO_GHL_LOCATION_ID = 'P3Xk1DXrNRFozNsGQeJ8'",
  'const UPSTREAM_TIMEOUT_MS = 5000',
  '/rest/v1/pronto_quote_requests',
  'syncFallbackCrm',
  "'Retry-After': '60'",
  "persistence: outcome.persistence",
];

for (const marker of requiredRouteMarkers) {
  if (!route.includes(marker)) {
    throw new Error(`Pronto isolation contract missing route marker: ${marker}`);
  }
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
