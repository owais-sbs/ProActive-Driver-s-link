/*
  Happy students gallery

  1) Allow the new 'happy_students' section in site_content.
  2) Create a public Storage bucket 'site-media' for images uploaded from the
     admin dashboard (uploads go through the service role in /api/upload).
*/

ALTER TABLE public.site_content DROP CONSTRAINT IF EXISTS site_content_section_check;
ALTER TABLE public.site_content
  ADD CONSTRAINT site_content_section_check
  CHECK (section IN ('hero', 'why', 'lessons', 'testimonials', 'happy_students', 'final_cta'));

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'site-media',
  'site-media',
  true,
  8388608,
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;
