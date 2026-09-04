-- PRONTO ENERGY ONLY
-- Isolates Pronto website intake from the shared Water Portfolio quote_requests table.

create table if not exists public.pronto_quote_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  brand_key text not null default 'pronto' check (brand_key = 'pronto'),
  ghl_location_id text not null default 'P3Xk1DXrNRFozNsGQeJ8' check (ghl_location_id = 'P3Xk1DXrNRFozNsGQeJ8'),
  inquiry_type text not null check (char_length(inquiry_type) between 2 and 80),
  name text not null check (char_length(btrim(name)) between 2 and 120),
  email text not null check (
    char_length(email) between 5 and 254
    and email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+[.][A-Z]{2,}$'
  ),
  organization text check (organization is null or char_length(organization) <= 200),
  phone text check (phone is null or char_length(phone) <= 50),
  details text check (details is null or char_length(details) <= 5000),
  reference text not null unique check (reference like 'PRONTO-%' and char_length(reference) <= 64),
  workflow_status text not null default 'submitted' check (workflow_status = 'submitted'),
  consent_at timestamptz not null,
  source_page text check (source_page is null or char_length(source_page) <= 500),
  utm jsonb not null default '{}'::jsonb check (jsonb_typeof(utm) = 'object'),
  assigned_team text not null default 'Pronto Energy Sales' check (assigned_team = 'Pronto Energy Sales')
);

create index if not exists pronto_quote_requests_created_at_idx
  on public.pronto_quote_requests (created_at desc);
create index if not exists pronto_quote_requests_email_idx
  on public.pronto_quote_requests (lower(email));
create index if not exists pronto_quote_requests_inquiry_type_idx
  on public.pronto_quote_requests (inquiry_type, created_at desc);

alter table public.pronto_quote_requests enable row level security;

revoke all on table public.pronto_quote_requests from public, anon, authenticated;
grant insert on table public.pronto_quote_requests to anon, authenticated;
grant all on table public.pronto_quote_requests to service_role;

drop policy if exists pronto_public_insert on public.pronto_quote_requests;
create policy pronto_public_insert
on public.pronto_quote_requests
for insert
to anon, authenticated
with check (
  brand_key = 'pronto'
  and ghl_location_id = 'P3Xk1DXrNRFozNsGQeJ8'
  and assigned_team = 'Pronto Energy Sales'
  and workflow_status = 'submitted'
  and consent_at is not null
  and char_length(btrim(name)) between 2 and 120
  and char_length(email) between 5 and 254
  and email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+[.][A-Z]{2,}$'
  and char_length(inquiry_type) between 2 and 80
);

create table if not exists public.pronto_crm_outbox (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null unique references public.pronto_quote_requests(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  status text not null default 'pending' check (status in ('pending','leased','retry','delivered','dead_letter')),
  attempts integer not null default 0 check (attempts >= 0),
  next_attempt_at timestamptz not null default now(),
  leased_at timestamptz,
  lease_owner text,
  delivered_at timestamptz,
  last_error text,
  ghl_contact_id text,
  ghl_location_id text not null default 'P3Xk1DXrNRFozNsGQeJ8' check (ghl_location_id = 'P3Xk1DXrNRFozNsGQeJ8'),
  idempotency_key text not null unique check (idempotency_key like 'pronto_crm:%')
);

create index if not exists pronto_crm_outbox_ready_idx
  on public.pronto_crm_outbox (status, next_attempt_at, created_at);

alter table public.pronto_crm_outbox enable row level security;

revoke all on table public.pronto_crm_outbox from public, anon, authenticated;
grant all on table public.pronto_crm_outbox to service_role;

create or replace function public.enqueue_pronto_crm_outbox()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.pronto_crm_outbox (
    lead_id,
    ghl_location_id,
    idempotency_key
  ) values (
    new.id,
    'P3Xk1DXrNRFozNsGQeJ8',
    'pronto_crm:' || new.reference
  )
  on conflict (lead_id) do nothing;
  return new;
end;
$$;

revoke all on function public.enqueue_pronto_crm_outbox() from public, anon, authenticated;
grant execute on function public.enqueue_pronto_crm_outbox() to service_role;

drop trigger if exists pronto_quote_request_enqueue_crm on public.pronto_quote_requests;
create trigger pronto_quote_request_enqueue_crm
after insert on public.pronto_quote_requests
for each row execute function public.enqueue_pronto_crm_outbox();

comment on table public.pronto_quote_requests is 'Pronto Energy website intake only. Do not route other Water Portfolio brands here.';
comment on table public.pronto_crm_outbox is 'Pronto Energy CRM delivery queue locked to GHL location P3Xk1DXrNRFozNsGQeJ8.';
