-- PRONTO ENERGY ONLY
-- Finalizes the public INSERT policy after consent hardening.

DROP POLICY IF EXISTS pronto_public_insert ON public.pronto_quote_requests;
CREATE POLICY pronto_public_insert
ON public.pronto_quote_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (
  brand_key = 'pronto'
  AND ghl_location_id = 'P3Xk1DXrNRFozNsGQeJ8'
  AND assigned_team = 'Pronto Energy Sales'
  AND workflow_status = 'submitted'
  AND consent_at IS NOT NULL
  AND marketing_consent = false
  AND char_length(btrim(name)) BETWEEN 2 AND 120
  AND char_length(email) BETWEEN 5 AND 254
  AND email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+[.][A-Z]{2,}$'
  AND char_length(inquiry_type) BETWEEN 2 AND 80
);
