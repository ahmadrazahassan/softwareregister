import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, PageHeader } from "@/components/primitives";
import { priceLabel } from "@/lib/format";
import { getRegistry, getSoftwareBySlug, loadSectors } from "@/lib/queries";
import { alternativesFor, sectorOf } from "@/lib/registry";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const s = await getSoftwareBySlug((await params).slug);
  if (!s) return {};
  return {
    title: `${s.name} alternatives`,
    description: `Every other ${s.sector.replace("-", " ")} product on the register, listed beside ${s.name}, with the reason to consider each.`,
    alternates: { canonical: `/register/${s.slug}/alternatives` },
  };
}

export default async function AlternativesPage({ params }: { params: Promise<{ slug: string }> }) {
  const [s, reg, sectors] = await Promise.all([getSoftwareBySlug((await params).slug), getRegistry(), loadSectors()]);
  if (!s) notFound();

  const sector = sectorOf(s.sector, sectors);
  const everyone = alternativesFor(s, reg, 99);

  return (
    <>
      <PageHeader title={`${s.name} alternatives`} stamp={`${everyone.length} other ${sector?.name ?? ""} products`}>
        Every other product in {sector?.label}, in alphabetical order. Each reason is drawn from that product&apos;s own record.
      </PageHeader>
      <Container className="pb-12 lg:pb-[72px]">
        <div className="overflow-x-auto border-t border-line-firm">
          <table className="register">
            <caption className="sr-only">Alternatives to {s.name}</caption>
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col" className="num">From</th>
                <th scope="col">Why consider it</th>
              </tr>
            </thead>
            <tbody>
              {everyone.map(({ software: alt, reason }) => {
                const p = priceLabel(alt);
                return (
                  <tr key={alt.slug} className="row">
                    <td>
                      <Link href={`/register/${alt.slug}`} className="row-link block font-semibold">{alt.name}</Link>
                      <span className="text-[12px] text-muted">{alt.vendor}</span>
                    </td>
                    <td className="num whitespace-nowrap">{p.kind === "quoted" ? <span className="text-muted">On request</span> : p.amount}</td>
                    <td className="text-muted">{reason}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-6 text-[13px]">
          <Link href={`/register/${s.slug}`} className="prose-link">Back to the {s.name} record</Link>
        </p>
      </Container>
    </>
  );
}
