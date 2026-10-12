import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/data/blog";
import { getAllSoftware, getSiteStats, loadBriefings, loadComparisons, loadSectors } from "@/lib/queries";
import { resolveLists } from "@/lib/lists";
import { SITE_URL } from "@/lib/site";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [software, sectors, comparisons, briefings, stats] = await Promise.all([
    getAllSoftware(),
    loadSectors(),
    loadComparisons(),
    loadBriefings(),
    getSiteStats(),
  ]);

  const checked = stats.lastChecked ? new Date(stats.lastChecked) : undefined;
  const url = (path: string, priority: number, lastModified?: Date) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority,
  });

  return [
    url("/", 1, checked),
    url("/register", 0.9, checked),
    url("/sectors", 0.8, checked),
    url("/versus", 0.8, checked),
    url("/briefings", 0.7),
    url("/lists", 0.8),
    url("/finder", 0.7),
    url("/glossary", 0.6),
    url("/faq", 0.6),
    url("/vendors", 0.4),
    url("/review-guidelines", 0.4),
    url("/suggest-a-correction", 0.3),
    ...resolveLists(software).map((l) => url(`/lists/${l.def.slug}`, 0.7, checked)),
    url("/blog", 0.7),
    url("/add-a-product", 0.4),
    url("/masthead", 0.5),
    url("/method", 0.6),
    url("/write-a-review", 0.4),
    url("/enquiries", 0.3),
    url("/dispatch", 0.3),
    ...software.flatMap((s) => [
      url(`/register/${s.slug}`, 0.8, s.price_checked_at ? new Date(s.price_checked_at) : undefined),
      url(`/register/${s.slug}/reviews`, 0.7, s.price_checked_at ? new Date(s.price_checked_at) : undefined),
      url(`/register/${s.slug}/alternatives`, 0.4),
    ]),
    ...sectors.map((s) => url(`/sector/${s.slug}`, 0.7, checked)),
    ...comparisons.map((c) => url(`/versus/${c.slug}`, 0.7, checked)),
    ...briefings.map((b) => url(`/briefings/${b.slug}`, 0.6, new Date(b.published_at))),
    ...BLOG_POSTS.map((p) => url(`/blog/${p.slug}`, 0.6, new Date(p.published_at))),
    ...["terms", "privacy-policy", "cookie-policy", "affiliate-disclosure", "paia-manual", "accessibility"].map((p) => url(`/${p}`, 0.2)),
  ];
}
