import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { isSupabaseConfigured, supabaseAnonKey, supabaseUrl } from "./config";

export const ADMIN_ROLE = "admin";

export interface ProxySession {
  response: NextResponse;
  /** True only for a verified user whose app_metadata.role is admin. */
  isAdmin: boolean;
  signedIn: boolean;
  configured: boolean;
}

/**
 * Refreshes the Supabase session on the way in and reports who is calling.
 * getUser() asks the Supabase Auth server to validate the token, unlike
 * getSession(), which only decodes a cookie that a caller could have forged.
 */
export async function readSession(request: NextRequest): Promise<ProxySession> {
  let response = NextResponse.next({ request });

  if (!isSupabaseConfigured()) {
    return { response, isAdmin: false, signedIn: false, configured: false };
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        for (const { name, value } of cookiesToSet) request.cookies.set(name, value);
        response = NextResponse.next({ request });
        for (const { name, value, options } of cookiesToSet) response.cookies.set(name, value, options);
      },
    },
  });

  const { data, error } = await supabase.auth.getUser();
  const user = error ? null : data.user;
  const isAdmin = user?.app_metadata?.role === ADMIN_ROLE;
  return { response, isAdmin, signedIn: Boolean(user), configured: true };
}
