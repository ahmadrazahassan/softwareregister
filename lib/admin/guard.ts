import "server-only";
import { redirect } from "next/navigation";
import type { SupabaseClient, User } from "@supabase/supabase-js";
import { isSupabaseConfigured } from "../supabase/config";
import { createServerSupabase } from "../supabase/server";

export const ADMIN_ROLE = "admin";

export interface AdminContext {
  supabase: SupabaseClient;
  user: User;
}

/**
 * The server side admin guard. The proxy is the first line of defence and this
 * is the second: every admin page, server action and route handler calls it
 * itself, because a proxy can be misconfigured or bypassed by a matcher change,
 * and a client side check is not a guard at all.
 *
 * It verifies the token with the Supabase Auth server (getUser, never
 * getSession) and requires app_metadata.role to be "admin". app_metadata can
 * only be written with the service role key, so a user cannot grant it to
 * themselves. Fails closed when Supabase is not configured.
 */
export async function requireAdmin(): Promise<AdminContext> {
  if (!isSupabaseConfigured()) redirect("/admin/login?reason=unconfigured");
  const supabase = await createServerSupabase();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) redirect("/admin/login");
  if (data.user.app_metadata?.role !== ADMIN_ROLE) redirect("/admin/login?reason=forbidden");
  return { supabase, user: data.user };
}

/** For route handlers, which should answer 401 rather than redirect. */
export async function adminOrNull(): Promise<AdminContext | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createServerSupabase();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user || data.user.app_metadata?.role !== ADMIN_ROLE) return null;
  return { supabase, user: data.user };
}
