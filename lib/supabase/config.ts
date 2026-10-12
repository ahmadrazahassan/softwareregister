/**
 * Supabase is optional for the public site and mandatory for the admin area.
 * With no keys set, every public page is served from the bundled dataset in
 * lib/data. The admin area fails closed: no keys means nobody gets in.
 */
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

export function hasServiceRole(): boolean {
  return Boolean(supabaseUrl && process.env.SUPABASE_SERVICE_ROLE_KEY);
}
