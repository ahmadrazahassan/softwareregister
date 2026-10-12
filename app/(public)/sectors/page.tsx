import type { Metadata } from "next";
import Link from "next/link";
import { CheckedStamp, Container, PageHeader } from "@/components/primitives";
import { priceLabel } from "@/lib/format";
import { getRegistry, getSiteStats, loadSectors } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Categories",
  description: "Accounting, ERP, payroll, HR, CRM and project management software on the register, every product on one page.",
  alternates: { canonical: "/sectors" },
};

export default async function SectorsPage() {
  const [reg, stats, sectors] = await Promise.all([getRegistry(), getSiteStats(), loadSectors()]);

  return (
    <>
      <PageHeader title="Categories" stamp={`${stats.sectors} categories · ${stats.products} products`} />
      <Container>
        {sectors.map((sec) => {
          const items = reg.items.filter((s) => s.sector === sec.slug);
          return (
            <section key={sec.slug} aria-labelledby={`sector-${sec.slug}`} className="border-t border-line-firm py-10 lg:grid lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-10">
              <div className="mb-6 lg:mb-0">
                <h2 id={`sector-${sec.slug}`} className="font-heading text-[24px] leading-7 font-bold tracking-[-0.01em]">
                  <Link href={`/sector/${sec.slug}`} className="hover:underline hover:underline-offset-4">
                    {sec.label}
                  </Link>
                </h2>
                <p className="stamp mt-2 text-muted">{items.length} products</p>
                <p className="mt-3 text-[14px] leading-5 text-muted">{sec.description}</p>
                <Link href={`/sector/${sec.slug}`} className="mt-4 inline-block text-[13px] text-lime-text underline underline-offset-4">
                  Compliance matrix
                </Link>
              </div>

              <div className="min-w-0 overflow-x-auto">
                <table className="register">
                  <caption className="sr-only">{sec.label} on the register</caption>
                  <thead>
                    <tr>
                      <th scope="col">Product</th>
                      <th scope="col" className="num">From</th>
                      <th scope="col">Price read</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((s) => {
                      const p = priceLabel(s);
                      return (
                        <tr key={s.slug} className="row">
                          <td>
                            <Link href={`/register/${s.slug}`} className="row-link block font-semibold">
                              {s.name}
                            </Link>
                          </td>
                          <td className="num">
                            {p.kind === "quoted" ? (
                              <span className="text-muted">On request</span>
                            ) : (
                              <span className="font-semibold whitespace-nowrap">
                                {p.amount}
                                {p.basis && <span className="ml-1 text-[12px] font-normal text-muted">{p.basis}</span>}
                              </span>
                            )}
                          </td>
                          <td>
                            <CheckedStamp date={s.price_checked_at} />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          );
        })}
        <div className="border-t border-line-firm pb-12 lg:pb-[72px]" />
      </Container>
    </>
  );
}
