import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { markChecked } from "@/lib/actions/admin";
import { countRows, ageClass, loadAdminSoftware } from "@/lib/admin/data";
import { requireAdmin } from "@/lib/admin/guard";
import { SAGE_AFFILIATE_URL, isNetworkAffiliateLink, isSageProduct } from "@/lib/affiliates";
import { basisLabel, daysSince, formatDateLong, formatDateStamp, hostOf, isoDaysAgo, priceLabel } from "@/lib/format";
import { isForeign } from "@/lib/registry";

export const metadata = { title: "Dashboard" };

function Block({ title, children, id }: { title: string; children: React.ReactNode; id?: string }) {
  return (
    <section id={id} className="mb-10 border border-line bg-surface">
      <h2 className="stamp border-b border-line px-4 py-3 text-muted">{title}</h2>
      <div className="p-4">{children}</div>
    </section>
  );
}

export default async function AdminDashboard() {
  const { supabase } = await requireAdmin();

  const since30 = isoDaysAgo(30);
  const [software, pendingReviews, comparisons, briefings, subsConfirmed, subsPending, enquiries, unsubs, clicks] = await Promise.all([
    loadAdminSoftware(supabase),
    countRows(supabase, "reviews", ["status", "pending"]),
    countRows(supabase, "comparisons", ["published", true]),
    countRows(supabase, "briefings", ["published", true]),
    countRows(supabase, "dispatch_subscribers", ["status", "confirmed"]),
    countRows(supabase, "dispatch_subscribers", ["status", "pending"]),
    supabase.from("enquiries").select("id, name, subject, created_at, handled").order("created_at", { ascending: false }).limit(5),
    supabase.from("dispatch_subscribers").select("*", { count: "exact", head: true }).eq("status", "unsubscribed").gte("unsubscribed_at", since30),
    supabase.from("affiliate_clicks").select("software_slug, placement").order("created_at", { ascending: false }).limit(5000),
  ]);

  if (software.length === 0) {
    return (
      <>
        <h1 className="font-heading text-[28px] leading-8 font-bold tracking-[-0.02em]">Dashboard</h1>
        <p className="mt-6 max-w-[560px] border border-line-firm p-4 text-[14px] leading-5">
          The database has no products yet. Apply the migrations in supabase/migrations, then run <code>npm run seed</code>. Until then the public site is served from the bundled dataset.
        </p>
      </>
    );
  }

  const now = new Date();
  const over90 = software.filter((s) => s.price_checked_at && daysSince(s.price_checked_at, now) > 90);
  const never = software.filter((s) => !s.price_checked_at);
  const dates = software.map((s) => s.price_checked_at).filter((d): d is string => Boolean(d));
  const latest = dates.length ? dates.reduce((a, b) => (a > b ? a : b)) : null;
  const firstOver90 = dates.length ? new Date(Date.parse(dates.reduce((a, b) => (a < b ? a : b))) + 91 * 86_400_000) : null;

  const affiliate = software.filter((s) => s.affiliate_url || isSageProduct(s));
  const placements = new Map<string, Set<string>>();
  for (const c of clicks.data ?? []) {
    const set = placements.get(c.software_slug as string) ?? new Set<string>();
    set.add(c.placement as string);
    placements.set(c.software_slug as string, set);
  }
  const drift = affiliate.filter((s) => isSageProduct(s) && s.affiliate_url !== SAGE_AFFILIATE_URL);

  const foreign = software.filter((s) => isForeign(s.price_currency));

  return (
    <>
      <h1 className="font-heading text-[28px] leading-8 font-bold tracking-[-0.02em]">Dashboard</h1>
      <p className="mt-1 mb-8 text-[13px] text-muted">
        {software.length} products. Today is {formatDateLong(new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Johannesburg" }).format(now))}.
      </p>

      {/* Block 1. Price freshness. The one operational risk this business has is stale pricing. */}
      <Block title="1. Price freshness" id="freshness">
        <p className="mb-4 max-w-[760px] text-[14px] leading-5">
          <span className={over90.length > 0 ? "font-semibold text-alert" : "font-semibold"}>
            {over90.length === 0 ? "No product is" : over90.length === 1 ? "1 product is" : `${over90.length} products are`} more than 90 days past its last check.
          </span>{" "}
          {never.length > 0 && <span className="font-semibold text-alert">{never.length} have never been checked. </span>}
          {latest && <>The latest check was {formatDateLong(latest)}. </>}
          {firstOver90 && over90.length === 0 && <>The oldest dated check passes 90 days on {formatDateLong(firstOver90.toISOString().slice(0, 10))}.</>}
        </p>
        <div className="overflow-x-auto">
          <table className="register register-dense">
            <caption className="sr-only">Every product by days since its price was last checked, oldest first</caption>
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Vendor</th>
                <th scope="col" className="num">Price</th>
                <th scope="col">Basis</th>
                <th scope="col">Listed in</th>
                <th scope="col">Checked</th>
                <th scope="col" className="num">Days</th>
                <th scope="col"><span className="sr-only">Action</span></th>
              </tr>
            </thead>
            <tbody>
              {software.map((s) => {
                const days = s.price_checked_at ? daysSince(s.price_checked_at, now) : null;
                const p = priceLabel(s);
                return (
                  <tr key={s.slug}>
                    <td>
                      <Link href={`/admin/products/${s.slug}`} className="font-semibold hover:underline">
                        {s.name}
                      </Link>
                      {s.status === "withdrawn" && <span className="stamp ml-2 text-alert">Withdrawn</span>}
                    </td>
                    <td className="text-muted">{s.vendor}</td>
                    <td className="num font-semibold">{p.kind === "quoted" ? <span className="font-normal text-muted">On request</span> : p.amount}</td>
                    <td className="text-[12px] text-muted">{basisLabel(s.price_basis)}</td>
                    <td className={isForeign(s.price_currency) ? "font-semibold text-alert" : ""}>{s.price_currency ?? <span className="text-muted">On request</span>}</td>
                    <td>{s.price_checked_at ? formatDateStamp(s.price_checked_at) : <span className="stamp text-muted">Never</span>}</td>
                    <td className={`num ${ageClass(days)}`}>{days === null ? "Never" : days}</td>
                    <td>
                      <form action={markChecked}>
                        <input type="hidden" name="slug" value={s.slug} />
                        <button type="submit" className="cursor-pointer border border-line-firm px-3 py-1 text-[13px] font-semibold whitespace-nowrap hover:bg-lime-wash">
                          Mark checked
                        </button>
                      </form>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-[12px] leading-4 text-muted">
          Mark checked stamps today&apos;s date, in South Africa, on the product. Only press it after you have opened the vendor&apos;s own page and read the price.
        </p>
      </Block>

      {/* Block 2. Content counts. */}
      <Block title="2. Content">
        <dl className="grid grid-cols-2 border-y border-line md:grid-cols-4">
          {[
            { label: "Products", value: software.filter((s) => s.status === "active").length, href: "/admin/products", alert: false },
            { label: "Reviews pending moderation", value: pendingReviews, href: "/admin/reviews?status=pending", alert: pendingReviews > 0 },
            { label: "Briefings published", value: briefings, href: "/admin/briefings", alert: false },
            { label: "Comparisons", value: comparisons, href: "/admin/comparisons", alert: false },
          ].map((f, i) => (
            <Link key={f.label} href={f.href} className={`flex flex-col-reverse justify-end gap-1 px-4 py-4 hover:bg-lime-wash ${i > 0 ? "md:border-l md:border-line" : ""}`}>
              <dt className="stamp text-muted">{f.label}</dt>
              <dd className={`m-0 font-heading text-[36px] leading-10 font-bold tracking-[-0.03em] ${f.alert ? "text-alert" : ""}`}>{f.value}</dd>
            </Link>
          ))}
        </dl>
      </Block>

      {/* Block 3. Affiliate health. */}
      <Block title="3. Affiliate health" id="affiliate">
        {drift.length > 0 && (
          <p role="alert" className="mb-4 border border-alert p-3 text-[14px] leading-5 text-alert">
            {drift.length} Sage {drift.length === 1 ? "product does" : "products do"} not carry the Sage affiliate link ({drift.map((s) => s.name).join(", ")}). Attribution is silently broken for {drift.length === 1 ? "it" : "them"}. Open the product and set the affiliate URL to {SAGE_AFFILIATE_URL}.
          </p>
        )}
        {affiliate.length === 0 ? (
          <p className="text-[14px] text-muted">No product carries an affiliate link.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="register register-dense">
              <caption className="sr-only">Products that carry an affiliate link</caption>
              <thead>
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col">Destination host</th>
                  <th scope="col">Recognised network link</th>
                  <th scope="col">Placements in use</th>
                </tr>
              </thead>
              <tbody>
                {affiliate.map((s) => {
                  const wrong = isSageProduct(s) && s.affiliate_url !== SAGE_AFFILIATE_URL;
                  const recognised = isNetworkAffiliateLink(s.affiliate_url);
                  const used = [...(placements.get(s.slug) ?? [])];
                  return (
                    <tr key={s.slug}>
                      <td className={`font-semibold ${wrong ? "text-alert" : ""}`}>{s.name}</td>
                      <td className={wrong ? "text-alert" : ""}>{s.affiliate_url ? hostOf(s.affiliate_url) : "No affiliate link"}</td>
                      <td className={recognised ? "" : "font-semibold text-alert"}>{recognised ? "Yes" : "No"}</td>
                      <td className="text-[12px] text-muted">{used.length ? used.join(", ") : "No clicks recorded"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Block>

      {/* Block 4. Converted prices. */}
      <Block title="4. Prices converted to rand">
        <p className="mb-3 text-[14px] leading-5">
          <span className="font-heading text-[28px] font-bold tracking-[-0.03em]">{foreign.length}</span> of {software.length} products list in a foreign currency, so their rand price is converted at the day&apos;s rate.
        </p>
        <p className="text-[14px] leading-6">
          {foreign.map((s, i) => (
            <span key={s.slug}>
              {s.name} <span className="font-semibold">{s.price_currency}</span>
              {i < foreign.length - 1 ? ", " : ""}
            </span>
          ))}
        </p>
      </Block>

      {/* Block 5. Enquiries. */}
      <Block title="5. Enquiries">
        {(enquiries.data ?? []).length === 0 ? (
          <p className="text-[14px] text-muted">No enquiries yet.</p>
        ) : (
          <ul className="border-t border-line">
            {(enquiries.data ?? []).map((e) => (
              <li key={e.id as string} className="border-b border-line">
                <Link href="/admin/enquiries" className="flex items-center gap-4 py-3 hover:bg-lime-wash">
                  <span className="min-w-0 flex-1">
                    <span className="block text-[15px] font-semibold">{e.name as string}</span>
                    <span className="block text-[13px] text-muted">{e.subject as string}</span>
                  </span>
                  <span className="stamp text-muted">{e.handled ? "Handled" : <span className="text-alert">Open</span>}</span>
                  <span className="stamp text-muted">{formatDateStamp((e.created_at as string).slice(0, 10))}</span>
                  <ChevronRight size={16} strokeWidth={1.5} aria-hidden="true" className="text-muted" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Block>

      {/* Block 6. Dispatch. */}
      <Block title="6. The Dispatch">
        <dl className="grid grid-cols-3 border-y border-line">
          {[
            { label: "Confirmed subscribers", value: subsConfirmed },
            { label: "Confirmations pending", value: subsPending },
            { label: "Unsubscribes in 30 days", value: unsubs.count ?? 0 },
          ].map((f, i) => (
            <div key={f.label} className={`flex flex-col-reverse justify-end gap-1 px-4 py-4 ${i > 0 ? "border-l border-line" : ""}`}>
              <dt className="stamp text-muted">{f.label}</dt>
              <dd className="m-0 font-heading text-[36px] leading-10 font-bold tracking-[-0.03em]">{f.value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-4">
          <a href="/admin/dispatch/export" className="inline-flex min-h-10 items-center border border-line-firm px-4 text-[14px] font-semibold hover:bg-lime-wash">
            Export confirmed subscribers as CSV
          </a>
        </div>
      </Block>
    </>
  );
}
