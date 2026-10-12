import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ComplianceMark,
  Container,
  Note,
  PageHeader,
  Section,
} from "@/components/primitives";
import { FxNote } from "@/components/FxNote";
import { ListingAside } from "@/components/ListingAside";
import { LocalToggle } from "@/components/LocalToggle";
import { SoftwareCard } from "@/components/SoftwareCard";
import { saAvailability } from "@/lib/data/availability";
import { JsonLd, breadcrumbLd } from "@/lib/seo";
import { getFxRates, getRegistry, getSector, loadSectors } from "@/lib/queries";
import { getLatestReviews } from "@/lib/queries/reviews";
import { matrixCell, matrixItems, sectorStandfirst } from "@/lib/registry";
import Link from "next/link";
import { resolveLists } from "@/lib/lists";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await loadSectors()).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const sector = await getSector((await params).slug);
  if (!sector) return {};
  return {
    title: sector.label,
    description: `${sector.label} on the register: prices in rand, features and a compliance matrix. ${sector.description}`,
    alternates: { canonical: `/sector/${sector.slug}` },
  };
}

export default async function SectorPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [{ slug }, sp] = await Promise.all([params, searchParams]);
  const [sector, reg, rates, latest] = await Promise.all([
    getSector(slug),
    getRegistry(),
    getFxRates(),
    getLatestReviews(),
  ]);
  if (!sector) notFound();

  const local = (Array.isArray(sp.local) ? sp.local[0] : sp.local) === "1";
  const all = reg.items.filter((s) => s.sector === sector.slug);
  const listed = local
    ? all.filter((s) => saAvailability(s.slug).status === "local")
    : all;
  // The matrix and the standfirst always describe the whole sector, whatever the toggle shows.
  const items = all;
  const columns = matrixItems(sector);
  const matrixRows = items.filter(
    (s) => s.compliance !== null && s.compliance.length > 0,
  );

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Categories", path: "/sectors" },
          { name: sector.label, path: `/sector/${sector.slug}` },
        ])}
      />
      <PageHeader
        title={sector.label}
        stamp={`${items.length} products · Category`}
      >
        {sectorStandfirst(sector, items)}
      </PageHeader>

      <section
        aria-labelledby="listing-title"
        className="mx-auto w-full max-w-[1280px] px-6 pb-12 lg:pb-[72px]"
      >
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10">
          <div className="min-w-0">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
              <div>
                <h2
                  id="listing-title"
                  className="font-heading text-[24px] leading-7 font-bold tracking-[-0.01em]"
                >
                  {sector.name} on the register
                </h2>
                <p className="mt-1 text-[14px] leading-5 text-muted">
                  Showing {listed.length} of {all.length} products, A to Z
                </p>
              </div>
              <LocalToggle
                on={local}
                href={`/sector/${sector.slug}${local ? "" : "?local=1"}`}
              />
            </div>
            {listed.length > 0 ? (
              <ul className="space-y-5">
                {listed.map((s) => (
                  <li key={s.slug}>
                    <SoftwareCard
                      s={s}
                      placement="sector-card"
                      review={latest.get(s.slug)}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="rounded-[16px] border border-line-firm bg-surface p-6 text-[15px] leading-6">
                No {sector.label.toLowerCase()} product here is sold by a South
                African company yet. Turn the switch off to see all {all.length}
                .
              </p>
            )}
            <FxNote rates={rates} className="mt-6 max-w-[760px]" />
          </div>
          <ListingAside />
        </div>
      </section>

      {resolveLists(all).filter((l) => l.def.sector === sector.slug).length > 0 && (
        <Section title="Lists for this category">
          <ul className="flex flex-wrap gap-2">
            {resolveLists(all)
              .filter((l) => l.def.sector === sector.slug)
              .map((l) => (
                <li key={l.def.slug}>
                  <Link href={`/lists/${l.def.slug}`} className="inline-flex min-h-10 items-center rounded-full border border-line-firm bg-surface px-4 text-[14px] leading-5 font-medium hover:bg-lime-wash">
                    {l.def.title}
                  </Link>
                </li>
              ))}
          </ul>
        </Section>
      )}

      {matrixRows.length > 0 && (
        <Section title="Compliance matrix">
          <p className="mb-6 max-w-[640px] text-[15px] leading-6 text-muted">
            What each vendor&apos;s own page says the product handles in this
            sector. A tick means the page lists the item.
          </p>
          <div className="overflow-x-auto">
            <table className="register">
              <caption className="sr-only">
                {sector.label} compliance matrix
              </caption>
              <thead>
                <tr>
                  <th scope="col">Product</th>
                  {columns.map((c) => (
                    <th key={c} scope="col" className="text-center">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {matrixRows.map((s) => (
                  <tr key={s.slug} className="row">
                    <td>
                      <Link
                        href={`/register/${s.slug}`}
                        className="row-link block font-semibold"
                      >
                        {s.name}
                      </Link>
                    </td>
                    {columns.map((c) => (
                      <td key={c} className="text-center">
                        <ComplianceMark cell={matrixCell(s, c, columns)} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      )}

      <Container className="pb-12 lg:pb-[72px]">
        <Note>
          Products are listed alphabetically. The register carries no ranking.{" "}
          <Link href="/method" className="prose-link">
            How the register works.
          </Link>
        </Note>
      </Container>
    </>
  );
}
