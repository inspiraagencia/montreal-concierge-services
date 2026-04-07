-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en TEXT NOT NULL,
  name_fr TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_fr TEXT NOT NULL,
  icon TEXT DEFAULT '🔧',
  color TEXT DEFAULT '#00c0d4',
  "order" INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en TEXT NOT NULL,
  title_fr TEXT NOT NULL,
  slug_en TEXT UNIQUE NOT NULL,
  slug_fr TEXT UNIQUE NOT NULL,
  excerpt_en TEXT,
  excerpt_fr TEXT,
  content_en TEXT NOT NULL,
  content_fr TEXT NOT NULL,
  featured_image TEXT,
  author_en TEXT,
  author_fr TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
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

-- Create images_gallery table
CREATE TABLE IF NOT EXISTS images_gallery (
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

-- Enable RLS
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE images_gallery ENABLE ROW LEVEL SECURITY;

-- RLS Policies for services (admins/editors can manage, public can read)
CREATE POLICY services_public_read ON services
  FOR SELECT
  USING (active = true);

CREATE POLICY services_admin_write ON services
  FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM admin_users WHERE id = auth.uid() AND role IN ('admin', 'editor')
  ));

CREATE POLICY services_admin_update ON services
  FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM admin_users WHERE id = auth.uid() AND role IN ('admin', 'editor')
  ));

CREATE POLICY services_admin_delete ON services
  FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM admin_users WHERE id = auth.uid() AND role = 'admin'
  ));

-- RLS Policies for blog_posts
CREATE POLICY blog_posts_public_read ON blog_posts
  FOR SELECT
  USING (published = true);

CREATE POLICY blog_posts_admin_all ON blog_posts
  FOR ALL
  USING (EXISTS (
    SELECT 1 FROM admin_users WHERE id = auth.uid() AND role IN ('admin', 'editor')
  ));

-- RLS Policies for testimonials
CREATE POLICY testimonials_public_read ON testimonials
  FOR SELECT
  USING (published = true);

CREATE POLICY testimonials_admin_all ON testimonials
  FOR ALL
  USING (EXISTS (
    SELECT 1 FROM admin_users WHERE id = auth.uid() AND role IN ('admin', 'editor')
  ));

-- RLS Policies for images_gallery
CREATE POLICY images_gallery_public_read ON images_gallery
  FOR SELECT
  USING (true);

CREATE POLICY images_gallery_admin_write ON images_gallery
  FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM admin_users WHERE id = auth.uid() AND role IN ('admin', 'editor')
  ));

CREATE POLICY images_gallery_admin_update ON images_gallery
  FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM admin_users WHERE id = auth.uid() AND role IN ('admin', 'editor')
  ));

CREATE POLICY images_gallery_admin_delete ON images_gallery
  FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM admin_users WHERE id = auth.uid() AND role IN ('admin', 'editor')
  ));

-- Create indexes for performance
CREATE INDEX idx_services_order ON services("order");
CREATE INDEX idx_services_active ON services(active);
CREATE INDEX idx_blog_posts_slug_en ON blog_posts(slug_en);
CREATE INDEX idx_blog_posts_slug_fr ON blog_posts(slug_fr);
CREATE INDEX idx_blog_posts_published ON blog_posts(published);
CREATE INDEX idx_blog_posts_created_at ON blog_posts(created_at);
CREATE INDEX idx_testimonials_published ON testimonials(published);
CREATE INDEX idx_images_gallery_category ON images_gallery(category);
CREATE INDEX idx_images_gallery_order ON images_gallery("order");
