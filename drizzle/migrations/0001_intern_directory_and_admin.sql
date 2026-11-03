CREATE TYPE public.app_role AS ENUM ('admin');
CREATE TABLE public.user_roles (id uuid PRIMARY KEY DEFAULT gen_random_uuid(),user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,role public.app_role NOT NULL,UNIQUE(user_id,role));
GRANT SELECT ON public.user_roles TO authenticated; GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE FUNCTION public.has_role(_user_id uuid,_role public.app_role) RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path=public AS $$ SELECT EXISTS(SELECT 1 FROM public.user_roles WHERE user_id=_user_id AND role=_role) $$;
CREATE POLICY own_roles ON public.user_roles FOR SELECT TO authenticated USING(user_id=auth.uid());
CREATE TABLE public.profiles (id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,display_name text NOT NULL DEFAULT '',avatar_url text NOT NULL DEFAULT '');
GRANT SELECT,UPDATE ON public.profiles TO authenticated; GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY own_profile_read ON public.profiles FOR SELECT TO authenticated USING(id=auth.uid());
CREATE POLICY own_profile_update ON public.profiles FOR UPDATE TO authenticated USING(id=auth.uid()) WITH CHECK(id=auth.uid());
CREATE FUNCTION public.initialize_account() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$ BEGIN INSERT INTO public.profiles(id) VALUES(NEW.id) ON CONFLICT DO NOTHING; IF lower(NEW.email)='mercydigitalagency1@gmail.com' AND NEW.email_confirmed_at IS NOT NULL THEN INSERT INTO public.user_roles(user_id,role) VALUES(NEW.id,'admin') ON CONFLICT DO NOTHING; END IF; RETURN NEW; END $$;
CREATE TRIGGER initialize_account AFTER INSERT OR UPDATE OF email_confirmed_at ON auth.users FOR EACH ROW EXECUTE FUNCTION public.initialize_account();
CREATE TABLE public.interns (id uuid PRIMARY KEY DEFAULT gen_random_uuid(),full_name text NOT NULL,profile_title text NOT NULL,location text NOT NULL DEFAULT '',languages text[] NOT NULL DEFAULT '{}',bio text NOT NULL DEFAULT '',profile_picture_url text NOT NULL DEFAULT '',picture_path text NOT NULL DEFAULT '',contact_link text NOT NULL DEFAULT '',slug text NOT NULL UNIQUE,status text NOT NULL DEFAULT 'active' CHECK(status IN ('active','inactive')),created_at timestamptz NOT NULL DEFAULT now(),updated_at timestamptz NOT NULL DEFAULT now());
GRANT SELECT ON public.interns TO anon; GRANT SELECT,INSERT,UPDATE,DELETE ON public.interns TO authenticated; GRANT ALL ON public.interns TO service_role;
ALTER TABLE public.interns ENABLE ROW LEVEL SECURITY;
CREATE POLICY public_active_interns ON public.interns FOR SELECT TO anon,authenticated USING(status='active');
CREATE POLICY admin_interns ON public.interns FOR ALL TO authenticated USING(public.has_role(auth.uid(),'admin')) WITH CHECK(public.has_role(auth.uid(),'admin'));
CREATE FUNCTION public.prepare_intern() RETURNS trigger LANGUAGE plpgsql SET search_path=public AS $$ DECLARE base text; candidate text; n integer:=1; BEGIN IF btrim(NEW.full_name)='' OR btrim(NEW.profile_title)='' OR btrim(NEW.location)='' OR cardinality(NEW.languages)=0 THEN RAISE EXCEPTION 'Name, title, location and languages are required'; END IF; IF NEW.slug='' THEN base:=trim(both '-' from regexp_replace(lower(NEW.full_name),'[^a-z0-9]+','-','g')); IF base='' THEN base:='intern'; END IF; PERFORM pg_advisory_xact_lock(hashtext(base)); candidate:=base; WHILE EXISTS(SELECT 1 FROM public.interns WHERE slug=candidate AND id<>NEW.id) LOOP n:=n+1; candidate:=base||'-'||n; END LOOP; NEW.slug:=candidate; END IF; IF NEW.slug !~ '^[a-z0-9]+(-[a-z0-9]+)*$' THEN RAISE EXCEPTION 'Invalid profile slug'; END IF; NEW.updated_at:=now(); RETURN NEW; END $$;
CREATE TRIGGER prepare_intern BEFORE INSERT OR UPDATE ON public.interns FOR EACH ROW EXECUTE FUNCTION public.prepare_intern();
CREATE POLICY intern_portrait_admin ON storage.objects FOR ALL TO authenticated USING(bucket_id='intern-portraits' AND public.has_role(auth.uid(),'admin')) WITH CHECK(bucket_id='intern-portraits' AND public.has_role(auth.uid(),'admin'));
CREATE POLICY active_portrait_read ON storage.objects FOR SELECT TO anon,authenticated USING(bucket_id='intern-portraits' AND EXISTS(SELECT 1 FROM public.interns WHERE picture_path=name AND status='active'));
INSERT INTO public.interns(full_name,profile_title,location,languages,slug) VALUES
('Mercy','AI Video Creator, Social Media Content Manager, Flyer Design, Post Schedule','Nigeria',ARRAY['English','French','Spanish'],'mercy'),
('Emmanuella','Online Course Website, LearnDash, Kajabi, Skool Specialist','United Kingdom',ARRAY['English','Dutch','Urdu'],'emmanuella'),
('Word Hapim','Social Media Manager, Flyer Designer, Instagram Posts, Ads, Promotional Graphics','United States',ARRAY['English','Dutch','Zulu','Bengali'],'word-hapim'),
('Emilyly','Website and App Development Specialist','United Kingdom',ARRAY['English','Dutch','Spanish','French'],'emilyly'),
('Emily Morgan','Website Designer, WordPress, Wix, Squarespace, Webflow Expert','France',ARRAY['English','Italian','French','Spanish'],'emily-morgan'),
('Camila','Social Media Manager, Content Creator, Video Editing Specialist','United Kingdom',ARRAY['English','Urdu','French','Dutch'],'camila');