import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { isSupabaseConfigured, supabaseAnonKey, supabaseUrl } from "./config";

let cached: SupabaseClient | null = null;

/**
 * Anonymous read client for public pages. It carries no session and no cookies,
 * so pages that use it stay statically renderable. Row level security decides
 * what it can see: published content and approved reviews only.
 */
export function publicClient(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;
  cached ??= createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
