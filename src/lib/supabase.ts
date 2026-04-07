import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for database tables
export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  phone: string;
  service_type: string;
  description: string;
  budget: string;
  urgency: string;
  location: string;
  locale: string;
  status: 'new' | 'contacted' | 'in_progress' | 'completed' | 'closed';
  response_notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Service {
  id?: string;
  slug_en: string;
  slug_fr: string;
  title_en: string;
  title_fr: string;
  description_en: string;
  description_fr: string;
  meta_description_en: string;
  meta_description_fr: string;
  content_en: string;
  content_fr: string;
  image: string;
  icon: string;
  category: string;
  keywords_en: string[];
  keywords_fr: string[];
  price_range: string;
  is_featured: boolean;
  display_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface BlogPost {
  id?: string;
  slug_en: string;
  slug_fr: string;
  title_en: string;
  title_fr: string;
  excerpt_en: string;
  excerpt_fr: string;
  content_en: string;
  content_fr: string;
  meta_description_en: string;
  meta_description_fr: string;
  image: string;
  category: string;
  tags: string[];
  author: string;
  is_published: boolean;
  published_at?: string;
  created_at?: string;
  updated_at?: string;
}
