import { adminOrNull } from "@/lib/admin/guard";

/** A CSV cell. Quotes are doubled, and a leading = + - @ is neutralised so a spreadsheet cannot run it as a formula. */
function cell(value: string): string {
  const safe = /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
  return `"${safe.replace(/"/g, '""')}"`;
}

/**
 * Confirmed subscribers as CSV. This is a route handler, so it answers 401
 * rather than redirecting, and it checks the admin itself: it does not trust
 * the proxy to have done so.
 */
export async function GET() {
  const admin = await adminOrNull();
  if (!admin) return new Response("Unauthorized", { status: 401, headers: { "Cache-Control": "no-store" } });

  const { data, error } = await admin.supabase
    .from("dispatch_subscribers")
    .select("email, interests, consented_at, confirmed_at")
    .eq("status", "confirmed")
    .order("confirmed_at", { ascending: true });
  if (error) return new Response("Could not read subscribers", { status: 500, headers: { "Cache-Control": "no-store" } });

  const rows = [
    ["email", "interests", "consented_at", "confirmed_at"].map(cell).join(","),
    ...(data ?? []).map((r) =>
      [String(r.email), (r.interests as string[]).join(" "), String(r.consented_at ?? ""), String(r.confirmed_at ?? "")].map(cell).join(","),
    ),
  ];

  return new Response(rows.join("\r\n") + "\r\n", {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="dispatch-subscribers-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
