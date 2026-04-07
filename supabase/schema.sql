-- ============================================================
-- Montreal Concierge Services — Supabase Schema
-- Run this in the Supabase SQL editor
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- TABLE: contact_submissions
-- ============================================================
CREATE TABLE IF NOT EXISTS contact_submissions (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name            TEXT NOT NULL,
  email           TEXT NOT NULL,
  phone           TEXT NOT NULL,
  service_type    TEXT NOT NULL,
  description     TEXT NOT NULL,
  budget          TEXT NOT NULL,
  urgency         TEXT NOT NULL,
  location        TEXT NOT NULL,
  locale          TEXT NOT NULL DEFAULT 'fr',
  status          TEXT NOT NULL DEFAULT 'new'
                  CHECK (status IN ('new', 'contacted', 'in_progress', 'completed', 'closed')),
  response_notes  TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for dashboard queries
CREATE INDEX IF NOT EXISTS idx_submissions_status    ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_submissions_created   ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_submissions_email     ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_submissions_service   ON contact_submissions(service_type);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_submissions_updated
  BEFORE UPDATE ON contact_submissions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- TABLE: services (for CMS/dashboard management)
-- ============================================================
CREATE TABLE IF NOT EXISTS services (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug_en               TEXT NOT NULL UNIQUE,
  slug_fr               TEXT NOT NULL UNIQUE,
  title_en              TEXT NOT NULL,
  title_fr              TEXT NOT NULL,
  description_en        TEXT,
  description_fr        TEXT,
  meta_description_en   TEXT,
  meta_description_fr   TEXT,
  content_en            TEXT,
  content_fr            TEXT,
  image                 TEXT,
  icon                  TEXT,
  category              TEXT,
  keywords_en           TEXT[],
  keywords_fr           TEXT[],
  price_range           TEXT,
  is_featured           BOOLEAN DEFAULT FALSE,
  display_order         INTEGER DEFAULT 0,
  is_active             BOOLEAN DEFAULT TRUE,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_services_updated
  BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- TABLE: blog_posts
-- ============================================================
CREATE TABLE IF NOT EXISTS blog_posts (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug_en               TEXT NOT NULL UNIQUE,
  slug_fr               TEXT NOT NULL UNIQUE,
  title_en              TEXT NOT NULL,
  title_fr              TEXT NOT NULL,
  excerpt_en            TEXT,
  excerpt_fr            TEXT,
  content_en            TEXT,
  content_fr            TEXT,
  meta_description_en   TEXT,
  meta_description_fr   TEXT,
  image                 TEXT,
  category              TEXT,
  tags                  TEXT[],
  author                TEXT DEFAULT 'Montreal Concierge Services',
  is_published          BOOLEAN DEFAULT FALSE,
  published_at          TIMESTAMPTZ,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_blog_published  ON blog_posts(is_published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_category   ON blog_posts(category);

CREATE TRIGGER trg_blog_updated
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- contact_submissions: anyone can INSERT, only authenticated can SELECT/UPDATE
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert" ON contact_submissions
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow admin read" ON contact_submissions
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow admin update" ON contact_submissions
  FOR UPDATE TO authenticated USING (true);

-- services: public can read active services
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read active services" ON services
  FOR SELECT TO anon USING (is_active = TRUE);

CREATE POLICY "Admin full access services" ON services
  FOR ALL TO authenticated USING (true);

-- blog_posts: public can read published posts
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published posts" ON blog_posts
  FOR SELECT TO anon USING (is_published = TRUE);

CREATE POLICY "Admin full access blog" ON blog_posts
  FOR ALL TO authenticated USING (true);

-- ============================================================
-- SEED: Admin user setup note
-- ============================================================
-- After running this schema:
-- 1. Go to Supabase > Authentication > Users
-- 2. Create a user with your admin email + password
-- 3. That user will have authenticated role = full dashboard access

COMMENT ON TABLE contact_submissions IS 'Lead capture form submissions from website visitors';
COMMENT ON TABLE services IS 'CMS-managed service pages (future use)';
COMMENT ON TABLE blog_posts IS 'CMS-managed blog posts with bilingual content';
