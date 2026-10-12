import "server-only";
import { cache } from "react";
import { BRIEFINGS } from "../data/briefings";
import { guideRank } from "../data/guide-heroes";
import { COMPARISONS } from "../data/comparisons";
import { SECTORS } from "../data/sectors";
import { SOFTWARE } from "../data/software";
import { publicClient } from "../supabase/public";
import type { Briefing, Comparison, Sector, Software } from "../types";

/**
 * Where data comes from. Supabase is authoritative when it is configured and
 * returns rows. If it is not configured, errors, or is still empty because the
 * seed has not run, the bundled dataset in lib/data answers instead, so the
 * public site never goes blank.
 */

function warn(table: string, message: string) {
  console.warn(`[softwareregister] supabase ${table}: ${message}. Serving the bundled dataset.`);
}

export const loadSoftware = cache(async (): Promise<Software[]> => {
  const sb = publicClient();
  if (!sb) return SOFTWARE;
  const { data, error } = await sb.from("software").select("*").eq("status", "active");
  if (error) {
    warn("software", error.message);
    return SOFTWARE;
  }
  if (!data || data.length === 0) {
    warn("software", "no rows");
    return SOFTWARE;
  }
  return data as Software[];
});

export const loadSectors = cache(async (): Promise<Sector[]> => {
  const sb = publicClient();
  if (!sb) return SECTORS;
  const { data, error } = await sb.from("sectors").select("*").order("sort");
  if (error || !data || data.length === 0) {
    if (error) warn("sectors", error.message);
    return SECTORS;
  }
  return data as Sector[];
});

export const loadComparisons = cache(async (): Promise<Comparison[]> => {
  const sb = publicClient();
  if (!sb) return COMPARISONS;
  const { data, error } = await sb.from("comparisons").select("slug, a, b").eq("published", true).order("slug");
  if (error || !data || data.length === 0) {
    if (error) warn("comparisons", error.message);
    return COMPARISONS;
  }
  return data as Comparison[];
});

export const loadBriefings = cache(async (): Promise<Briefing[]> => {
  const sb = publicClient();
  const sort = (rows: Briefing[]) =>
    [...rows].sort((a, b) => guideRank(a.slug) - guideRank(b.slug) || b.published_at.localeCompare(a.published_at) || a.title.localeCompare(b.title));
  if (!sb) return sort(BRIEFINGS.filter((b) => b.published));
  const { data, error } = await sb.from("briefings").select("*").eq("published", true);
  if (error || !data || data.length === 0) {
    if (error) warn("briefings", error.message);
    return sort(BRIEFINGS.filter((b) => b.published));
  }
  return sort(data as Briefing[]);
});
