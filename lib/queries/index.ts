import "server-only";
import { cache } from "react";
import { buildRegistry, computeStats, sectorOf, tokensFor, type Registry } from "../registry";
import type { Briefing, Comparison, PricedSoftware, Sector, SiteStats } from "../types";
import { getFxRates } from "./fx";
import { loadBriefings, loadComparisons, loadSectors, loadSoftware } from "./source";

export { loadBriefings, loadComparisons, loadSectors, loadSoftware };

export { getFxRates };

export const getRegistry = cache(async (): Promise<Registry> => {
  const [software, rates] = await Promise.all([loadSoftware(), getFxRates()]);
  return buildRegistry(software, rates);
});

export const getSiteStats = cache(async (): Promise<SiteStats> => {
  const [reg, sectors, comparisons, briefings] = await Promise.all([
    getRegistry(),
    loadSectors(),
    loadComparisons(),
    loadBriefings(),
  ]);
  return computeStats(reg, { sectors: sectors.length, comparisons: comparisons.length, briefings: briefings.length });
});

export const getTokens = cache(async () => tokensFor(await getSiteStats()));

export async function getAllSoftware(): Promise<PricedSoftware[]> {
  return (await getRegistry()).items;
}

export async function getSoftwareBySlug(slug: string): Promise<PricedSoftware | undefined> {
  return (await getRegistry()).bySlug.get(slug);
}

export async function getSoftwareByCategory(sectorSlug: string): Promise<PricedSoftware[]> {
  return (await getRegistry()).items.filter((s) => s.sector === sectorSlug);
}

export async function getSector(slug: string): Promise<Sector | undefined> {
  return sectorOf(slug, await loadSectors());
}

export async function getLatestBriefings(limit: number): Promise<Briefing[]> {
  return (await loadBriefings()).slice(0, limit);
}

export async function getBriefing(slug: string): Promise<Briefing | undefined> {
  return (await loadBriefings()).find((b) => b.slug === slug);
}

export interface ResolvedComparison extends Comparison {
  a_software: PricedSoftware;
  b_software: PricedSoftware;
}

export async function getResolvedComparisons(): Promise<ResolvedComparison[]> {
  const [reg, comparisons] = await Promise.all([getRegistry(), loadComparisons()]);
  const out: ResolvedComparison[] = [];
  for (const c of comparisons) {
    const a = reg.bySlug.get(c.a);
    const b = reg.bySlug.get(c.b);
    if (a && b) out.push({ ...c, a_software: a, b_software: b });
  }
  return out;
}
