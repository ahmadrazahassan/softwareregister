import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/LoginForm";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const metadata: Metadata = { title: "Sign in" };

const REASONS: Record<string, string> = {
  unconfigured:
    "Supabase is not configured, so the admin area is closed. Add NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY and SUPABASE_SERVICE_ROLE_KEY to .env.local, then run npm run create-admin.",
  forbidden: "You are signed in, but that account is not an administrator.",
};

export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const reason = typeof sp.reason === "string" ? REASONS[sp.reason] : undefined;
  const next = typeof sp.next === "string" ? sp.next : "";
  const configured = isSupabaseConfigured();

  return (
    <main className="mx-auto w-full max-w-[420px] px-6 py-24">
      <p className="stamp text-muted">Software Register admin</p>
      <h1 className="mt-2 mb-8 font-heading text-[32px] leading-9 font-bold tracking-[-0.02em]">Sign in</h1>
      {(reason || !configured) && (
        <p role="alert" className="mb-8 border border-line-firm p-4 text-[14px] leading-5">
          {reason ?? REASONS.unconfigured}
        </p>
      )}
      <LoginForm next={next} disabled={!configured} />
    </main>
  );
}
