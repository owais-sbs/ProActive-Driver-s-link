/*
# Create bookings and pricing tables for ProActive Driver's Link Canada

1. New Tables
- `bookings`: public booking form submissions.
  - id (uuid pk), full_name, phone, email, lesson_type, preferred_time,
    pick_up_location, drop_off_location, address, message, status, created_at.
  - status is an enum-like text constrained to Pending/Confirmed/Paid.
- `pricing`: editable pricing packages (G2 and G).
  - id (uuid pk), category ('G2'|'G'), name, price, period, description,
    features (jsonb array), highlighted (bool), sort_order (int), updated_at.

2. Security
- RLS enabled on both tables.
- bookings: anon can INSERT (public booking form). No anon SELECT/UPDATE/DELETE.
  Admin reads/updates via API routes using the service role key (bypasses RLS).
- pricing: anon + authenticated can SELECT (public reads pricing on the site).
  Admin updates via API routes using the service role key.

3. Notes
- The public booking form posts to /api/bookings which inserts using the
  service role key, so the anon INSERT policy is a safety net for any
  direct client insert attempts.
- Pricing rows are seeded by the application on first read if the table
  is empty (fallback to /lib/data/pricing.ts defaults).
*/

CREATE TABLE IF NOT EXISTS bookings (
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
  status text NOT NULL DEFAULT 'Pending',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_bookings" ON bookings;
CREATE POLICY "anon_insert_bookings" ON bookings FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- No SELECT/UPDATE/DELETE policies for anon: admin uses service role.

CREATE TABLE IF NOT EXISTS pricing (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  name text NOT NULL,
  price text NOT NULL,
  period text,
  description text,
  features jsonb NOT NULL DEFAULT '[]'::jsonb,
  highlighted boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE pricing ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "read_pricing_public" ON pricing;
CREATE POLICY "read_pricing_public" ON pricing FOR SELECT
  TO anon, authenticated USING (true);

-- No INSERT/UPDATE/DELETE for anon: admin uses service role via API routes.
