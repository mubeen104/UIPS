import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: 'sold' | 'licensed' | 'leased';
  image_url?: string;
  deal_value?: string;
  client_name?: string;
  completion_date?: string;
  featured: boolean;
  display_order: number;
  created_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnail_url?: string;
  author: string;
  published: boolean;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  client_name: string;
  company: string;
  position?: string;
  testimonial_text: string;
  rating: number;
  featured: boolean;
  display_order: number;
  created_at: string;
}

export interface ContactSubmission {
  name: string;
  email: string;
  company?: string;
  message: string;
  submission_type: 'contact' | 'valuation';
}
