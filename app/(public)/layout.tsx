import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { saAvailability } from "@/lib/data/availability";
import { formatDateStamp, priceLabel } from "@/lib/format";
import { getBlogPosts } from "@/lib/data/blog";
import { getLatestBriefings, getRegistry, getResolvedComparisons, getSiteStats, loadSectors } from "@/lib/queries";

export const revalidate = 3600;

const MENU_SLUGS = ["xero", "sage-accounting", "quickbooks-online", "zoho-books", "simplepay", "hubspot"] as const;

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const [stats, reg, sectors, comparisons, briefings] = await Promise.all([
    getSiteStats(),
    getRegistry(),
    loadSectors(),
    getResolvedComparisons(),
    getLatestBriefings(6),
  ]);

  // Computed, never hardcoded. These three lines are the publication stamp.
  const stamp = [
    `${stats.products} PRODUCTS`,
    `${stats.comparisons} COMPARISONS`,
    stats.lastChecked ? `LAST CHECKED ${formatDateStamp(stats.lastChecked)}` : "NO PRICES CHECKED YET",
  ];

  // The Software menu: each category with its live product count.
  const categories = sectors.map((s) => ({
    slug: s.slug,
    name: s.name,
    description: s.description,
    count: reg.items.filter((p) => p.sector === s.slug).length,
  }));

  // Six places to start, one or more per major category. A slug that is not on the register is skipped.
  const named = MENU_SLUGS.map((slug) => reg.bySlug.get(slug)).filter((s): s is NonNullable<typeof s> => Boolean(s));
  const popular = named.map((s) => {
    const price = priceLabel(s);
    return {
      slug: s.slug,
      name: s.name,
      price: price.kind === "quoted" ? "Price on request" : price.kind === "free" ? "Free to start" : `From ${price.amount} ${price.basis}`.trim(),
      local: saAvailability(s.slug).status === "local",
    };
  });

  const pairs = comparisons.slice(0, 6).map((c) => ({
    slug: c.slug,
    a: { slug: c.a_software.slug, name: c.a_software.name },
    b: { slug: c.b_software.slug, name: c.b_software.name },
  }));

  const guides = briefings.slice(0, 3).map((b) => ({ slug: b.slug, title: b.title, topic: b.topic }));
  const posts = getBlogPosts().slice(0, 3).map((p) => ({ slug: p.slug, title: p.title, category: p.category }));

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header stamp={stamp} categories={categories} total={stats.products} popular={popular} pairs={pairs} guides={guides} posts={posts} />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
