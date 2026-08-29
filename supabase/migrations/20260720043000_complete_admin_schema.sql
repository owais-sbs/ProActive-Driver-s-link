/*
  ProActive Driver's Link Canada — complete Supabase schema for admin + public site

  Covers:
  - Leads      → bookings
  - Packages   → pricing
  - Content    → site_content (Hero, Why, Lessons, Testimonials, Final CTA)
  - Settings   → site_settings (contact / payment / hours)

  How to run:
  1. Open Supabase Dashboard → SQL Editor
  2. Paste this entire file → Run
  3. Set env in .env.local:
       NEXT_PUBLIC_SUPABASE_URL=...
       NEXT_PUBLIC_SUPABASE_ANON_KEY=...
       SUPABASE_SERVICE_ROLE_KEY=...

  Security model:
  - Public (anon): INSERT bookings, SELECT pricing / site_content / site_settings
  - Admin API (service role): full read/write (bypasses RLS)
*/

-- ---------------------------------------------------------------------------
-- Extensions
-- ---------------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ---------------------------------------------------------------------------
-- 1) LEADS → bookings
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  lesson_type text NOT NULL,
  preferred_time text NOT NULL,
  pick_up_location text NOT NULL,
  drop_off_location text NOT NULL,
  address text NOT NULL,
  message text,
  status text NOT NULL DEFAULT 'Pending'
    CHECK (status IN ('Pending', 'Confirmed', 'Paid')),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS bookings_created_at_idx ON public.bookings (created_at DESC);
CREATE INDEX IF NOT EXISTS bookings_status_idx ON public.bookings (status);
CREATE INDEX IF NOT EXISTS bookings_email_idx ON public.bookings (email);

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_bookings" ON public.bookings;
CREATE POLICY "anon_insert_bookings"
  ON public.bookings
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- No public SELECT / UPDATE / DELETE — admin uses service role via /api/bookings

-- ---------------------------------------------------------------------------
-- 2) PACKAGES → pricing
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.pricing (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL
    CHECK (category IN ('G2', 'G')),
  name text NOT NULL,
  price text NOT NULL,
  period text,
  description text,
  features jsonb NOT NULL DEFAULT '[]'::jsonb,
  highlighted boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS pricing_category_sort_idx
  ON public.pricing (category, sort_order);

ALTER TABLE public.pricing ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "read_pricing_public" ON public.pricing;
CREATE POLICY "read_pricing_public"
  ON public.pricing
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- No public INSERT / UPDATE / DELETE — admin uses service role via /api/pricing

-- Seed default packages (skip if any rows already exist)
INSERT INTO public.pricing (category, name, price, period, description, features, highlighted, sort_order)
SELECT * FROM (VALUES
  (
    'G2',
    'Starter',
    '$399',
    'package',
    'Everything you need to get behind the wheel and pass your G2.',
    '["5 private in-car lessons (1 hour each)","Pick-up & drop-off included","All-weather training","Defensive driving skills","Road test preparation"]'::jsonb,
    false,
    1
  ),
  (
    'G2',
    'Complete',
    '$599',
    'package',
    'Our most popular package — best value for new drivers.',
    '["10 private in-car lessons (1 hour each)","Pick-up & drop-off included","All-weather training","Defensive driving skills","Mock road test included","Use of school car for G2 test"]'::jsonb,
    true,
    2
  ),
  (
    'G2',
    'BDE Course',
    '$799',
    'MTO-approved',
    'Full 20-hour Beginner Driver Education course + in-car hours.',
    '["20-hour MTO-approved classroom course","10 private in-car lessons","Pick-up & drop-off included","All-weather training","Defensive driving skills","MTO certificate (insurance discount)","Use of school car for G2 test"]'::jsonb,
    false,
    3
  ),
  (
    'G',
    'G Refresher',
    '$249',
    'package',
    'A focused refresher before your highway G road test.',
    '["3 private in-car lessons (1 hour each)","Highway driving practice","Pick-up & drop-off included","All-weather training","Defensive driving skills"]'::jsonb,
    false,
    1
  ),
  (
    'G',
    'G Complete',
    '$449',
    'package',
    'Comprehensive prep for your full G licence road test.',
    '["6 private in-car lessons (1 hour each)","Highway driving practice","Pick-up & drop-off included","All-weather training","Defensive driving skills","Mock road test included","Use of school car for G test"]'::jsonb,
    true,
    2
  )
) AS v(category, name, price, period, description, features, highlighted, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM public.pricing LIMIT 1);

-- ---------------------------------------------------------------------------
-- 3) SETTINGS → site_settings (singleton row)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phone text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  whatsapp text NOT NULL DEFAULT '',
  address text NOT NULL DEFAULT '',
  etransfer text NOT NULL DEFAULT '',
  hours text NOT NULL DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "read_site_settings_public" ON public.site_settings;
CREATE POLICY "read_site_settings_public"
  ON public.site_settings
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Admin writes via service role (no public write policies)

-- Seed one settings row if empty
INSERT INTO public.site_settings (phone, email, whatsapp, address, etransfer, hours)
SELECT
  '+1 (416) 555-0199',
  'info@proactivedriverslink.ca',
  'https://wa.me/14165550199',
  'Greater Toronto Area, ON',
  'info@proactivedriverslink.ca',
  'Mon–Sun · Flexible scheduling'
WHERE NOT EXISTS (SELECT 1 FROM public.site_settings LIMIT 1);

-- ---------------------------------------------------------------------------
-- 4) CONTENT → site_content (one row per section, JSON payload)
--    Sections used by /admin/content:
--      hero | why | lessons | testimonials | final_cta
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.site_content (
  section text PRIMARY KEY
    CHECK (section IN ('hero', 'why', 'lessons', 'testimonials', 'final_cta')),
  data jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "read_site_content_public" ON public.site_content;
CREATE POLICY "read_site_content_public"
  ON public.site_content
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Admin writes via service role

INSERT INTO public.site_content (section, data) VALUES
(
  'hero',
  '{
    "eyebrow": "MTO-Approved · Toronto / GTA",
    "title": "Pass Your G2 & G Driving Test With Confidence!",
    "titleAccent": "G2 & G",
    "tagline": "Where great drivers are made, not born.",
    "body": "Private, one-on-one driving lessons across the Greater Toronto Area with flexible scheduling and complimentary pick-up & drop-off.",
    "videoUrl": "/videos/hero-screen.mp4"
  }'::jsonb
),
(
  'why',
  '{
    "title": "Why Choose",
    "titleAccent": "ProActive Driver's Link?",
    "subtitle": "ProActive Driver's Link Canada provides private G2 & G driving lessons across GTA with a focus on confidence, safety, and test success.",
    "features": [
      {"title": "Road Test Preparation", "description": "Expert guidance to help you ace your G2 and G road tests."},
      {"title": "One-on-One Lessons", "description": "Personalized instruction tailored to your learning pace."},
      {"title": "Flexible Scheduling", "description": "Choose times that work best for your busy schedule."},
      {"title": "Patient & Friendly Teaching", "description": "Build confidence with supportive, encouraging instruction."},
      {"title": "Multilingual Instruction", "description": "Learn comfortably in English, Urdu, Hindi, and Punjabi."},
      {"title": "High Pass Rate", "description": "Proven methods that help students build confidence and pass."}
    ],
    "media": [
      "/videos/why-choose-us-3.mp4",
      "/images/why-choose-us-1.jpg",
      "/images/why-choose-us-2.jpg",
      "/images/why-choose-us-4.jpg"
    ]
  }'::jsonb
),
(
  'lessons',
  '{
    "items": [
      {
        "title": "G2 Preparation",
        "description": "Master the basics and build confidence for your G2 exit test.",
        "price": "From $50 / hr",
        "image": "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800"
      },
      {
        "title": "G Road Test Prep",
        "description": "Highway-focused training to help you upgrade to a full G licence.",
        "price": "From $55 / hr",
        "image": "https://images.pexels.com/photos/97079/pexels-photo-97079.jpeg?auto=compress&cs=tinysrgb&w=800"
      },
      {
        "title": "Refresher Lessons",
        "description": "Targeted refresher sessions to rebuild confidence behind the wheel.",
        "price": "From $50 / hr",
        "image": "https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=800"
      },
      {
        "title": "BDE Course (MTO-approved)",
        "description": "Full 20-hour Beginner Driver Education program with MTO certification.",
        "price": "From $399",
        "image": "https://images.pexels.com/photos/2076622/pexels-photo-2076622.jpeg?auto=compress&cs=tinysrgb&w=800"
      }
    ]
  }'::jsonb
),
(
  'testimonials',
  '{
    "items": [
      {"name": "Karen Smith", "rating": 5, "text": "I was so nervous before my G2, but my instructor was incredibly patient."},
      {"name": "Ali Khan", "rating": 5, "text": "Flexible timing was a game-changer for me."},
      {"name": "Priya Sharma", "rating": 5, "text": "Lessons in my own language made a huge difference."}
    ]
  }'::jsonb
),
(
  'final_cta',
  '{
    "title": "Ready to get behind the wheel?",
    "body": "Book a private lesson today — flexible times, pick-up & drop-off across the GTA.",
    "primaryCta": "Book a Lesson",
    "primaryHref": "/#book",
    "secondaryCta": "WhatsApp Us",
    "secondaryHref": "https://wa.me/14165550199"
  }'::jsonb
)
ON CONFLICT (section) DO NOTHING;

-- ---------------------------------------------------------------------------
-- 5) updated_at helper (optional trigger)
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS pricing_set_updated_at ON public.pricing;
CREATE TRIGGER pricing_set_updated_at
  BEFORE UPDATE ON public.pricing
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS site_settings_set_updated_at ON public.site_settings;
CREATE TRIGGER site_settings_set_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS site_content_set_updated_at ON public.site_content;
CREATE TRIGGER site_content_set_updated_at
  BEFORE UPDATE ON public.site_content
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
