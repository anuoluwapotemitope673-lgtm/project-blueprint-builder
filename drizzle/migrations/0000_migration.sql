CREATE TABLE public.contact_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL CHECK (char_length(full_name) BETWEEN 1 AND 120),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255),
  company text CHECK (company IS NULL OR char_length(company) <= 160),
  service text NOT NULL CHECK (char_length(service) <= 120),
  budget text CHECK (budget IS NULL OR char_length(budget) <= 60),
  timeline text CHECK (timeline IS NULL OR char_length(timeline) <= 60),
  description text NOT NULL CHECK (char_length(description) BETWEEN 10 AND 4000),
  contact_method text CHECK (contact_method IS NULL OR char_length(contact_method) <= 40),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.contact_inquiries TO anon, authenticated;
GRANT ALL ON public.contact_inquiries TO service_role;
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit an inquiry" ON public.contact_inquiries FOR INSERT TO anon, authenticated WITH CHECK (true);