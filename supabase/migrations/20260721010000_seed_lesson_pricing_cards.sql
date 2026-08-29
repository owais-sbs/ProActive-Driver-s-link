-- =============================================================================
-- ProActive Driver's Link Canada — Packages (pricing) SQL
-- Run in: Supabase → SQL Editor → New query → Run
-- After this, Admin create / edit / delete + Save will keep the live site in sync
-- via /api/pricing (service role). You do NOT need SQL for day-to-day edits.
-- =============================================================================

-- 1) Ensure table exists (safe if already created)
CREATE TABLE IF NOT EXISTS public.pricing (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL CHECK (category IN ('G2', 'G', 'BDE')),
  name text NOT NULL,
  price text NOT NULL,
  period text,
  description text,
  features jsonb NOT NULL DEFAULT '[]'::jsonb,
  highlighted boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- If your DB still has the old CHECK (G2, G only), widen it for BDE:
ALTER TABLE public.pricing DROP CONSTRAINT IF EXISTS pricing_category_check;
ALTER TABLE public.pricing
  ADD CONSTRAINT pricing_category_check
  CHECK (category IN ('G2', 'G', 'BDE'));

CREATE INDEX IF NOT EXISTS pricing_category_sort_idx
  ON public.pricing (category, sort_order);

ALTER TABLE public.pricing ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "read_pricing_public" ON public.pricing;
CREATE POLICY "read_pricing_public"
  ON public.pricing
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Public cannot INSERT/UPDATE/DELETE — admin app uses service role via API.


-- 2) Replace ALL packages with the live 16 lesson cards (8 G2 + 8 G)
DELETE FROM public.pricing;

INSERT INTO public.pricing
  (category, name, price, period, description, features, highlighted, sort_order)
VALUES
  -- G2 Packages
  ('G2', '1 Hour Lesson',            '$56.50',  NULL, 'HST included',            '[]'::jsonb, false, 1),
  ('G2', '1 Hour + Road Test',       '$226',    NULL, 'All-inclusive package',   '[]'::jsonb, false, 2),
  ('G2', '2 Hour Lesson',            '$113',    NULL, 'HST included',            '[]'::jsonb, false, 3),
  ('G2', '2 Hour + Road Test',       '$282.50', NULL, 'HST included',            '[]'::jsonb, false, 4),
  ('G2', '5 Hour Lesson',            '$282.50', NULL, 'Best value lesson pack',  '[]'::jsonb, true,  5),
  ('G2', '5 Hour + Road Test',       '$452',    NULL, 'All-inclusive package',   '[]'::jsonb, false, 6),
  ('G2', '10 Hour Lesson',           '$565',    NULL, 'HST included',            '[]'::jsonb, false, 7),
  ('G2', '10 Hour + Road Test',      '$734.50', NULL, 'HST included',            '[]'::jsonb, false, 8),
  -- G Packages
  ('G',  '1.5 Hour Lesson',          '$93.25',  NULL, 'Professional training',   '[]'::jsonb, false, 1),
  ('G',  '1.5 Hour + Road Test',     '$296.50', NULL, 'HST included',            '[]'::jsonb, false, 2),
  ('G',  '2 Hour Lesson',            '$124.30', NULL, 'Professional training',   '[]'::jsonb, false, 3),
  ('G',  '2 Hour + Road Test',       '$327.70', NULL, 'HST included',            '[]'::jsonb, false, 4),
  ('G',  '5 Hour Lesson',            '$310.75', NULL, 'HST included',            '[]'::jsonb, false, 5),
  ('G',  '5 Hour + Road Test',       '$514.15', NULL, 'HST included',            '[]'::jsonb, false, 6),
  ('G',  '10 Hour In-Car Lesson',    '$621.50', NULL, 'Comprehensive training',  '[]'::jsonb, false, 7),
  ('G',  '10 Hour In-Car + Road Test','$824.90', NULL, 'HST included',           '[]'::jsonb, false, 8);


-- 3) Optional helpers (usually use Admin UI instead)

-- ADD one package:
-- INSERT INTO public.pricing (category, name, price, description, features, highlighted, sort_order)
-- VALUES ('G2', 'Custom Lesson', '$99', 'HST included', '[]'::jsonb, false, 9);

-- EDIT one package (by name + category):
-- UPDATE public.pricing
-- SET price = '$60', description = 'HST included', highlighted = false
-- WHERE category = 'G2' AND name = '1 Hour Lesson';

-- DELETE one package:
-- DELETE FROM public.pricing
-- WHERE category = 'G2' AND name = '1 Hour Lesson';

-- VERIFY:
-- SELECT category, name, price, description, highlighted, sort_order
-- FROM public.pricing
-- ORDER BY category, sort_order;
