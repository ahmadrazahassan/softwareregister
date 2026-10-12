import Link from "next/link";
import { loadAdminSoftware } from "@/lib/admin/data";
import { requireAdmin } from "@/lib/admin/guard";
import { formatDateStamp, priceText } from "@/lib/format";

export const metadata = { title: "Products" };

export default async function AdminProducts() {
  const { supabase } = await requireAdmin();
  const items = (await loadAdminSoftware(supabase)).sort((a, b) => a.name.localeCompare(b.name, "en-ZA"));

  return (
    <>
      <h1 className="font-heading text-[28px] leading-8 font-bold tracking-[-0.02em]">Products</h1>
      <p className="mt-1 mb-6 text-[13px] text-muted">
        {items.length} products. Open one to set its price, SARS filing and bank feeds.
      </p>
      <div className="overflow-x-auto border border-line">
        <table className="register register-dense">
          <caption className="sr-only">Every product</caption>
          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Sector</th>
              <th scope="col">Price</th>
              <th scope="col">Checked</th>
              <th scope="col">SARS</th>
              <th scope="col">Banks</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map((s) => (
              <tr key={s.slug} className="row">
                <td>
                  <Link href={`/admin/products/${s.slug}`} className="row-link font-semibold">
                    {s.name}
                  </Link>
                </td>
                <td className="text-muted">{s.sector}</td>
                <td>{priceText(s)}</td>
                <td>{s.price_checked_at ? formatDateStamp(s.price_checked_at) : <span className="stamp text-muted">Never</span>}</td>
                <td>{s.compliance === null ? <span className="stamp text-muted">Not set</span> : `${s.compliance.length} items`}</td>
                <td>{s.bank_feeds === null ? <span className="stamp text-muted">Not set</span> : `${s.bank_feeds.length} banks`}</td>
                <td className={s.status === "withdrawn" ? "font-semibold text-alert" : "text-muted"}>{s.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
