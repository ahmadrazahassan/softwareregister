import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { hasServiceRole, supabaseUrl } from "./config";

/**
 * Service role client. It bypasses row level security, so it is server only
 * and is used for exactly two things: writing visitor submissions that must not
 * be readable back (subscribers, hashed IPs) and sending confirmations.
 * Never import this from a client component and never prefix the key with
 * NEXT_PUBLIC_.
 */
export function serviceClient(): SupabaseClient | null {
  if (!hasServiceRole()) return null;
  return createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
