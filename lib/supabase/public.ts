import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { isSupabaseConfigured, supabaseAnonKey, supabaseUrl } from "./config";

/**
 * Anonymous read client for public pages. It carries no session and no cookies,
 * so pages that use it stay statically renderable. Row level security decides
 * what it can see: published content and approved reviews only.
 *
 * A new client is made on every call and never kept in a module variable. On
 * Cloudflare Workers a client created while serving one request must not be
 * reused by another: its pending promises belong to the first request, and the
 * second request can hang waiting on them. The client is cheap to make.
 */
export function publicClient(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
}
