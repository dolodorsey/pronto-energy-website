-- PRONTO ENERGY ONLY
-- Production follow-up for schema drift discovered after WATER PORTFOLIO restoration.
-- The original 20260904074606 migration had already been recorded before the
-- marketing_consent column was added to its repository copy, so this immutable
-- follow-up makes the live schema match the Pronto intake contract.

alter table public.pronto_quote_requests
  add column if not exists marketing_consent boolean;

update public.pronto_quote_requests
  set marketing_consent = false
  where marketing_consent is null;

alter table public.pronto_quote_requests
  alter column marketing_consent set default false,
  alter column marketing_consent set not null;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'pronto_quote_requests_marketing_consent_false_chk'
      and conrelid = 'public.pronto_quote_requests'::regclass
  ) then
    alter table public.pronto_quote_requests
      add constraint pronto_quote_requests_marketing_consent_false_chk
      check (marketing_consent = false);
  end if;
end
$$;

comment on column public.pronto_quote_requests.marketing_consent is
  'False for Pronto inquiry intake because this surface does not collect explicit marketing consent.';
