import "server-only";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { supabaseAnonKey, supabaseUrl } from "./config";

/**
 * Session aware client for server components, server actions and route
 * handlers. Reads and writes the auth cookies, so row level security sees the
 * signed in user. Use this for everything in the admin area.
 */
export async function createServerSupabase() {
  const cookieStore = await cookies();
  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) cookieStore.set(name, value, options);
        } catch {
          // Called from a server component, where cookies are read only.
          // The proxy refreshes the session, so ignoring this is safe.
        }
      },
    },
  });
}
