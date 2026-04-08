-- ============================================================
-- Montreal Concierge Services - Dashboard schema compatibility
-- ============================================================
-- This migration is intentionally additive. It aligns the database with
-- the current /admin dashboard while preserving data from earlier schemas.

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- Admin users
-- ============================================================
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT CHECK (role IN ('admin', 'editor', 'viewer')) DEFAULT 'viewer',
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.admin_users ADD COLUMN IF NOT EXISTS full_name TEXT;
ALTER TABLE public.admin_users ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'viewer';
ALTER TABLE public.admin_users ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
ALTER TABLE public.admin_users ADD COLUMN IF NOT EXISTS last_login TIMESTAMP WITH TIME ZONE;
ALTER TABLE public.admin_users ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE public.admin_users ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

DROP TRIGGER IF EXISTS trg_admin_users_updated ON public.admin_users;
CREATE TRIGGER trg_admin_users_updated
  BEFORE UPDATE ON public.admin_users
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ============================================================
-- Contact submissions
-- ============================================================
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  service_type TEXT,
  service TEXT,
  subject TEXT,
  description TEXT,
  message TEXT,
  budget TEXT,
  urgency TEXT,
  location TEXT,
  locale TEXT NOT NULL DEFAULT 'fr',
  status TEXT NOT NULL DEFAULT 'new',
  responded BOOLEAN NOT NULL DEFAULT false,
  response_notes TEXT,
  response TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  responded_at TIMESTAMP WITH TIME ZONE
);

ALTER TABLE public.contact_submissions ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE public.contact_submissions ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE public.contact_submissions ADD COLUMN IF NOT EXISTS service_type TEXT;
ALTER TABLE public.contact_submissions ADD COLUMN IF NOT EXISTS service TEXT;
ALTER TABLE public.contact_submissions ADD COLUMN IF NOT EXISTS subject TEXT;
ALTER TABLE public.contact_submissions ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE public.contact_submissions ADD COLUMN IF NOT EXISTS message TEXT;
ALTER TABLE public.contact_submissions ADD COLUMN IF NOT EXISTS budget TEXT;
ALTER TABLE public.contact_submissions ADD COLUMN IF NOT EXISTS urgency TEXT;
ALTER TABLE public.contact_submissions ADD COLUMN IF NOT EXISTS location TEXT;
ALTER TABLE public.contact_submissions ADD COLUMN IF NOT EXISTS locale TEXT DEFAULT 'fr';
ALTER TABLE public.contact_submissions ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'new';
ALTER TABLE public.contact_submissions ADD COLUMN IF NOT EXISTS responded BOOLEAN DEFAULT false;
ALTER TABLE public.contact_submissions ADD COLUMN IF NOT EXISTS response_notes TEXT;
ALTER TABLE public.contact_submissions ADD COLUMN IF NOT EXISTS response TEXT;
ALTER TABLE public.contact_submissions ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE public.contact_submissions ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE public.contact_submissions ADD COLUMN IF NOT EXISTS responded_at TIMESTAMP WITH TIME ZONE;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'contact_submissions' AND column_name = 'subject'
  ) THEN
    ALTER TABLE public.contact_submissions ALTER COLUMN subject DROP NOT NULL;
  END IF;

  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'contact_submissions' AND column_name = 'message'
  ) THEN
    ALTER TABLE public.contact_submissions ALTER COLUMN message DROP NOT NULL;
  END IF;
END $$;

DO $$
DECLARE
  constraint_record RECORD;
BEGIN
  FOR constraint_record IN
    SELECT conname
    FROM pg_constraint
    WHERE conrelid = 'public.contact_submissions'::regclass
      AND contype = 'c'
      AND pg_get_constraintdef(oid) ILIKE '%status%'
  LOOP
    EXECUTE format('ALTER TABLE public.contact_submissions DROP CONSTRAINT %I', constraint_record.conname);
  END LOOP;
END $$;

ALTER TABLE public.contact_submissions
  ADD CONSTRAINT contact_submissions_status_check
  CHECK (status IN ('new', 'contacted', 'in_progress', 'completed', 'closed', 'pending', 'responded'));

CREATE OR REPLACE FUNCTION public.sync_contact_submission_fields()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.service_type IS NULL AND NEW.service IS NOT NULL THEN
    NEW.service_type := NEW.service;
  END IF;
  IF NEW.service IS NULL AND NEW.service_type IS NOT NULL THEN
    NEW.service := NEW.service_type;
  END IF;

  IF NEW.description IS NULL AND NEW.message IS NOT NULL THEN
    NEW.description := NEW.message;
  END IF;
  IF NEW.message IS NULL AND NEW.description IS NOT NULL THEN
    NEW.message := NEW.description;
  END IF;

  IF NEW.subject IS NULL AND NEW.service_type IS NOT NULL THEN
    NEW.subject := NEW.service_type;
  END IF;

  IF NEW.status IN ('responded', 'contacted', 'in_progress', 'completed', 'closed') THEN
    NEW.responded := true;
  ELSIF NEW.responded IS TRUE AND NEW.status IN ('new', 'pending') THEN
    NEW.status := 'responded';
  END IF;

  IF NEW.responded IS TRUE AND NEW.responded_at IS NULL THEN
    NEW.responded_at := NOW();
  END IF;

  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_contact_submissions_sync ON public.contact_submissions;
CREATE TRIGGER trg_contact_submissions_sync
  BEFORE INSERT OR UPDATE ON public.contact_submissions
  FOR EACH ROW EXECUTE FUNCTION public.sync_contact_submission_fields();

UPDATE public.contact_submissions
SET
  service_type = COALESCE(service_type, service, subject),
  service = COALESCE(service, service_type, subject),
  description = COALESCE(description, message),
  message = COALESCE(message, description),
  responded = COALESCE(responded, status IN ('responded', 'contacted', 'in_progress', 'completed', 'closed'));

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- Services CMS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en TEXT,
  name_fr TEXT,
  description_en TEXT,
  description_fr TEXT,
  icon TEXT DEFAULT '',
  color TEXT DEFAULT '#00c0d4',
  "order" INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.services ADD COLUMN IF NOT EXISTS name_en TEXT;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS name_fr TEXT;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS description_en TEXT;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS description_fr TEXT;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS slug_en TEXT;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS slug_fr TEXT;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS title_en TEXT;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS title_fr TEXT;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS meta_description_en TEXT;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS meta_description_fr TEXT;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS content_en TEXT;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS content_fr TEXT;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS image TEXT;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS icon TEXT DEFAULT '';
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS color TEXT DEFAULT '#00c0d4';
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS keywords_en TEXT[];
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS keywords_fr TEXT[];
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS price_range TEXT;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS "order" INTEGER DEFAULT 0;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS active BOOLEAN DEFAULT true;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'services' AND column_name = 'slug_en') THEN
    ALTER TABLE public.services ALTER COLUMN slug_en DROP NOT NULL;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'services' AND column_name = 'slug_fr') THEN
    ALTER TABLE public.services ALTER COLUMN slug_fr DROP NOT NULL;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'services' AND column_name = 'title_en') THEN
    ALTER TABLE public.services ALTER COLUMN title_en DROP NOT NULL;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'services' AND column_name = 'title_fr') THEN
    ALTER TABLE public.services ALTER COLUMN title_fr DROP NOT NULL;
  END IF;
END $$;

CREATE OR REPLACE FUNCTION public.sync_service_fields()
RETURNS TRIGGER AS $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'services' AND column_name = 'title_en') THEN
    NEW.title_en := COALESCE(NEW.title_en, NEW.name_en);
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'services' AND column_name = 'title_fr') THEN
    NEW.title_fr := COALESCE(NEW.title_fr, NEW.name_fr);
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'services' AND column_name = 'is_active') THEN
    NEW.is_active := COALESCE(NEW.is_active, NEW.active, true);
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'services' AND column_name = 'display_order') THEN
    NEW.display_order := COALESCE(NEW.display_order, NEW."order", 0);
  END IF;

  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_services_sync ON public.services;
CREATE TRIGGER trg_services_sync
  BEFORE INSERT OR UPDATE ON public.services
  FOR EACH ROW EXECUTE FUNCTION public.sync_service_fields();

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- Blog CMS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en TEXT,
  title_fr TEXT,
  slug_en TEXT,
  slug_fr TEXT,
  excerpt_en TEXT,
  excerpt_fr TEXT,
  content_en TEXT,
  content_fr TEXT,
  featured_image TEXT,
  author_en TEXT,
  author_fr TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS title_en TEXT;
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS title_fr TEXT;
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS slug_en TEXT;
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS slug_fr TEXT;
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS excerpt_en TEXT;
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS excerpt_fr TEXT;
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS content_en TEXT;
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS content_fr TEXT;
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS meta_description_en TEXT;
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS meta_description_fr TEXT;
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS image TEXT;
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS featured_image TEXT;
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS tags TEXT[];
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS author TEXT DEFAULT 'Montreal Concierge Services';
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS author_en TEXT;
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS author_fr TEXT;
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT false;
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS published BOOLEAN DEFAULT false;
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS published_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'blog_posts' AND column_name = 'slug_en') THEN
    ALTER TABLE public.blog_posts ALTER COLUMN slug_en DROP NOT NULL;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'blog_posts' AND column_name = 'slug_fr') THEN
    ALTER TABLE public.blog_posts ALTER COLUMN slug_fr DROP NOT NULL;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'blog_posts' AND column_name = 'content_en') THEN
    ALTER TABLE public.blog_posts ALTER COLUMN content_en DROP NOT NULL;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'blog_posts' AND column_name = 'content_fr') THEN
    ALTER TABLE public.blog_posts ALTER COLUMN content_fr DROP NOT NULL;
  END IF;
END $$;

CREATE OR REPLACE FUNCTION public.sync_blog_post_fields()
RETURNS TRIGGER AS $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'blog_posts' AND column_name = 'image') THEN
    NEW.image := COALESCE(NEW.image, NEW.featured_image);
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'blog_posts' AND column_name = 'is_published') THEN
    NEW.is_published := COALESCE(NEW.is_published, NEW.published, false);
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'blog_posts' AND column_name = 'author') THEN
    NEW.author := COALESCE(NEW.author, NEW.author_en, NEW.author_fr, 'Montreal Concierge Services');
  END IF;

  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_blog_posts_sync ON public.blog_posts;
CREATE TRIGGER trg_blog_posts_sync
  BEFORE INSERT OR UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.sync_blog_post_fields();

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- Testimonials and gallery
-- ============================================================
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  company TEXT,
  quote_en TEXT NOT NULL,
  quote_fr TEXT NOT NULL,
  service_en TEXT,
  service_fr TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) DEFAULT 5,
  avatar_image TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.images_gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  image_url TEXT NOT NULL,
  alt_text_en TEXT,
  alt_text_fr TEXT,
  title_en TEXT,
  title_fr TEXT,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.testimonials ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE public.images_gallery ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;

DROP TRIGGER IF EXISTS trg_testimonials_updated ON public.testimonials;
CREATE TRIGGER trg_testimonials_updated
  BEFORE UPDATE ON public.testimonials
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS trg_images_gallery_updated ON public.images_gallery;
CREATE TRIGGER trg_images_gallery_updated
  BEFORE UPDATE ON public.images_gallery
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.images_gallery ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- Audit logs
-- ============================================================
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_user_id UUID REFERENCES public.admin_users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  table_name TEXT NOT NULL,
  record_id TEXT,
  changes JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.audit_logs ADD COLUMN IF NOT EXISTS admin_user_id UUID REFERENCES public.admin_users(id) ON DELETE SET NULL;
ALTER TABLE public.audit_logs ADD COLUMN IF NOT EXISTS changes JSONB;
ALTER TABLE public.audit_logs ADD COLUMN IF NOT EXISTS old_values JSONB;
ALTER TABLE public.audit_logs ADD COLUMN IF NOT EXISTS new_values JSONB;
ALTER TABLE public.audit_logs ADD COLUMN IF NOT EXISTS ip_address TEXT;
ALTER TABLE public.audit_logs ADD COLUMN IF NOT EXISTS user_agent TEXT;
ALTER TABLE public.audit_logs ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;

UPDATE public.audit_logs
SET changes = COALESCE(changes, new_values, old_values)
WHERE changes IS NULL;

ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- Policies
-- ============================================================
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'admin_users' AND policyname = 'admin_users_select_authenticated') THEN
    CREATE POLICY admin_users_select_authenticated ON public.admin_users
      FOR SELECT USING (auth.role() = 'authenticated');
  END IF;

  DROP POLICY IF EXISTS admin_users_admin_write ON public.admin_users;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'admin_users' AND policyname = 'admin_users_admin_insert') THEN
    CREATE POLICY admin_users_admin_insert ON public.admin_users
      FOR INSERT TO authenticated WITH CHECK (
        EXISTS (
          SELECT 1 FROM public.admin_users
          WHERE id = auth.uid() AND role = 'admin' AND is_active = true
        )
      );
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'admin_users' AND policyname = 'admin_users_admin_update') THEN
    CREATE POLICY admin_users_admin_update ON public.admin_users
      FOR UPDATE TO authenticated USING (
        EXISTS (
          SELECT 1 FROM public.admin_users
          WHERE id = auth.uid() AND role = 'admin' AND is_active = true
        )
      );
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'admin_users' AND policyname = 'admin_users_admin_delete') THEN
    CREATE POLICY admin_users_admin_delete ON public.admin_users
      FOR DELETE TO authenticated USING (
        EXISTS (
          SELECT 1 FROM public.admin_users
          WHERE id = auth.uid() AND role = 'admin' AND is_active = true
        )
      );
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'contact_submissions' AND policyname = 'contact_submissions_public_insert') THEN
    CREATE POLICY contact_submissions_public_insert ON public.contact_submissions
      FOR INSERT TO anon WITH CHECK (true);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'contact_submissions' AND policyname = 'contact_submissions_admin_read') THEN
    CREATE POLICY contact_submissions_admin_read ON public.contact_submissions
      FOR SELECT TO authenticated USING (
        EXISTS (
          SELECT 1 FROM public.admin_users
          WHERE id = auth.uid() AND is_active = true
        )
      );
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'contact_submissions' AND policyname = 'contact_submissions_admin_update') THEN
    CREATE POLICY contact_submissions_admin_update ON public.contact_submissions
      FOR UPDATE TO authenticated USING (
        EXISTS (
          SELECT 1 FROM public.admin_users
          WHERE id = auth.uid() AND role IN ('admin', 'editor') AND is_active = true
        )
      );
  END IF;
END $$;

DO $$
DECLARE
  v_table_name TEXT;
BEGIN
  FOREACH v_table_name IN ARRAY ARRAY['services', 'blog_posts', 'testimonials', 'images_gallery']
  LOOP
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = v_table_name AND policyname = v_table_name || '_admin_write') THEN
      EXECUTE format(
        'CREATE POLICY %I ON public.%I FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid() AND role IN (''admin'', ''editor'') AND is_active = true)) WITH CHECK (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid() AND role IN (''admin'', ''editor'') AND is_active = true))',
        v_table_name || '_admin_write',
        v_table_name
      );
    END IF;
  END LOOP;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'audit_logs' AND policyname = 'audit_logs_admin_read') THEN
    CREATE POLICY audit_logs_admin_read ON public.audit_logs
      FOR SELECT TO authenticated USING (
        EXISTS (
          SELECT 1 FROM public.admin_users
          WHERE id = auth.uid() AND role IN ('admin', 'editor') AND is_active = true
        )
      );
  END IF;
END $$;

-- ============================================================
-- Indexes
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON public.admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_users_role ON public.admin_users(role);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON public.contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON public.contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_services_order ON public.services("order");
CREATE INDEX IF NOT EXISTS idx_services_active ON public.services(active);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON public.blog_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON public.blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_testimonials_published ON public.testimonials(published);
CREATE INDEX IF NOT EXISTS idx_images_gallery_category ON public.images_gallery(category);
CREATE INDEX IF NOT EXISTS idx_images_gallery_order ON public.images_gallery("order");
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON public.audit_logs(created_at DESC);
