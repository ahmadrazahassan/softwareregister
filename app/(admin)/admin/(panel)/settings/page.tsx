import { requireAdmin } from "@/lib/admin/guard";
import { mailConfigured } from "@/lib/server/mail";
import { SITE_URL } from "@/lib/site";
import { hasServiceRole, isSupabaseConfigured } from "@/lib/supabase/config";

export const metadata = { title: "Settings" };

export default async function AdminSettings() {
  const { user } = await requireAdmin();

  const rows: [string, string, boolean][] = [
    ["Supabase URL and anon key", isSupabaseConfigured() ? "Set" : "Missing", isSupabaseConfigured()],
    ["Service role key", hasServiceRole() ? "Set" : "Missing. Scripts and The Dispatch confirmation need it.", hasServiceRole()],
    ["IP hash salt", process.env.IP_HASH_SALT && process.env.IP_HASH_SALT !== "change-me-to-a-long-random-string" ? "Set" : "Not set. A temporary salt is used and resets on every restart.", Boolean(process.env.IP_HASH_SALT) && process.env.IP_HASH_SALT !== "change-me-to-a-long-random-string"],
    ["Confirmation email (Resend)", mailConfigured() ? "Set. Double opt in is on." : "Not set. Subscriptions are recorded as confirmed at the moment of consent.", mailConfigured()],
    ["Public site URL", SITE_URL, true],
  ];

  return (
    <>
      <h1 className="font-heading text-[28px] leading-8 font-bold tracking-[-0.02em]">Settings</h1>
      <p className="mt-1 mb-6 text-[13px] text-muted">Signed in as {user.email}. Settings come from environment variables, so they are read only here.</p>
      <div className="max-w-[860px] overflow-x-auto border border-line">
        <table className="register">
          <caption className="sr-only">Environment</caption>
          <tbody>
            {rows.map(([label, value, ok]) => (
              <tr key={label}>
                <th scope="row" className="w-[260px]">{label}</th>
                <td className={ok ? "" : "font-semibold text-alert"}>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
