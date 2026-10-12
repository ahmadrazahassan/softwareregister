import { requireAdmin } from "@/lib/admin/guard";
import { isoDaysAgo } from "@/lib/format";

export const metadata = { title: "Analytics" };

export default async function AdminAnalytics() {
  const { supabase } = await requireAdmin();
  const since = isoDaysAgo(30);
  const { data } = await supabase
    .from("affiliate_clicks")
    .select("software_slug, placement, affiliate")
    .gte("created_at", since)
    .limit(10000);

  const rows = (data ?? []) as { software_slug: string; placement: string; affiliate: boolean }[];
  const byKey = new Map<string, { slug: string; placement: string; affiliate: boolean; n: number }>();
  for (const r of rows) {
    const key = `${r.software_slug}|${r.placement}`;
    const cur = byKey.get(key) ?? { slug: r.software_slug, placement: r.placement, affiliate: r.affiliate, n: 0 };
    cur.n += 1;
    byKey.set(key, cur);
  }
  const table = [...byKey.values()].sort((a, b) => b.n - a.n);
  const affiliateClicks = rows.filter((r) => r.affiliate).length;

  return (
    <>
      <h1 className="font-heading text-[28px] leading-8 font-bold tracking-[-0.02em]">Analytics</h1>
      <p className="mt-1 mb-6 text-[13px] text-muted">
        Outbound clicks in the last 30 days. No reader is identified: each click stores a product, a placement and a salted hash, never an address. There are no charts here on purpose. Add one when a specific question needs it.
      </p>
      <dl className="mb-8 grid max-w-[560px] grid-cols-2 border-y border-line">
        <div className="flex flex-col-reverse gap-1 py-4 pr-4">
          <dt className="stamp text-muted">Outbound clicks</dt>
          <dd className="m-0 font-heading text-[36px] leading-10 font-bold tracking-[-0.03em]">{rows.length}</dd>
        </div>
        <div className="flex flex-col-reverse gap-1 border-l border-line px-4 py-4">
          <dt className="stamp text-muted">On affiliate links</dt>
          <dd className="m-0 font-heading text-[36px] leading-10 font-bold tracking-[-0.03em]">{affiliateClicks}</dd>
        </div>
      </dl>
      <div className="max-w-[760px] overflow-x-auto border border-line">
        <table className="register">
          <caption className="sr-only">Clicks by product and placement</caption>
          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Placement</th>
              <th scope="col">Affiliate</th>
              <th scope="col" className="num">Clicks</th>
            </tr>
          </thead>
          <tbody>
            {table.length === 0 && (
              <tr>
                <td colSpan={4} className="text-muted">No clicks recorded in the last 30 days.</td>
              </tr>
            )}
            {table.map((r) => (
              <tr key={`${r.slug}|${r.placement}`}>
                <td className="font-semibold">{r.slug}</td>
                <td className="text-muted">{r.placement}</td>
                <td>{r.affiliate ? "Yes" : "No"}</td>
                <td className="num font-semibold">{r.n}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
