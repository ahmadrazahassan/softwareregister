import "server-only";
import type { Briefing, PricedSoftware, Sector } from "../types";
import { getRegistry, getResolvedComparisons, loadBriefings, loadSectors, type ResolvedComparison } from "./index";

export interface SearchResults {
  products: PricedSoftware[];
  sectors: Sector[];
  comparisons: ResolvedComparison[];
  briefings: Briefing[];
  total: number;
}

function matches(haystack: (string | null | undefined)[], needles: string[]): boolean {
  const text = haystack.filter(Boolean).join(" ").toLowerCase();
  return needles.every((n) => text.includes(n));
}

/** Every term must appear somewhere in the record. Product results keep register order. */
export async function siteSearch(query: string): Promise<SearchResults> {
  const needles = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (needles.length === 0) return { products: [], sectors: [], comparisons: [], briefings: [], total: 0 };

  const [reg, sectors, comparisons, briefings] = await Promise.all([
    getRegistry(),
    loadSectors(),
    getResolvedComparisons(),
    loadBriefings(),
  ]);

  const products = reg.items.filter((s) => matches([s.name, s.vendor, s.summary, s.sector.replace("-", " ")], needles));
  const sectorHits = sectors.filter((s) => matches([s.name, s.label, s.description], needles));
  const comparisonHits = comparisons.filter((c) =>
    matches([c.a_software.name, c.b_software.name, `${c.a_software.name} vs ${c.b_software.name}`], needles),
  );
  const briefingHits = briefings.filter((b) => matches([b.title, b.standfirst, b.topic], needles));

  return {
    products,
    sectors: sectorHits,
    comparisons: comparisonHits,
    briefings: briefingHits,
    total: products.length + sectorHits.length + comparisonHits.length + briefingHits.length,
  };
}
