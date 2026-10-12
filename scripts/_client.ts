import { createClient } from "@supabase/supabase-js";

/** Loads .env.local, then returns a service role client. Scripts only. Never import this from the app. */
export function loadEnv() {
  for (const file of [".env.local", ".env"]) {
    try {
      process.loadEnvFile(file);
    } catch {
      // The file may not exist. That is fine.
    }
  }
}

export function serviceClientOrExit() {
  loadEnv();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error("Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local first.");
    process.exit(1);
  }
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}
