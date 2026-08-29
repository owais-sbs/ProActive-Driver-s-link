-- Rebrand site contact defaults from Turbo Teach → ProActive Driver's Link Canada
UPDATE public.site_settings
SET
  email = 'info@proactivedriverslink.ca',
  etransfer = 'info@proactivedriverslink.ca',
  updated_at = now()
WHERE email ILIKE '%turboteach%'
   OR etransfer ILIKE '%turboteach%';
