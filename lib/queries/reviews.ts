import "server-only";
import { publicClient } from "../supabase/public";
import type { Review } from "../types";

export const COMPANY_SIZES = ["1 to 10", "11 to 50", "51 to 200", "201 to 500", "500 plus"] as const;
export const INDUSTRIES = [
  "Accounting and finance",
  "Construction",
  "Education",
  "Healthcare",
  "Information technology",
  "Manufacturing",
  "Professional services",
  "Retail and wholesale",
  "Other",
] as const;

export type ReviewSort = "helpful" | "recent";

export interface ReviewQuery {
  size?: string;
  industry?: string;
  sort: ReviewSort;
  page: number;
}

export const REVIEW_PAGE_SIZE = 10;

const BASE_COLUMNS =
  "id, software_slug, rating, sub_ease, sub_value, sub_support, sub_functionality, title, body, author_name, author_role, company_size, industry, helpful, created_at";
const DETAIL_COLUMNS = "pros, cons, time_used, plan_used, used_for, switched_from, alternatives_considered, reasons, vendor_reply, vendor_reply_by, vendor_reply_at";
const REVIEW_COLUMNS = `${BASE_COLUMNS}, ${DETAIL_COLUMNS}`;

/** Postgres says 42703 when a column does not exist, which is what a database that has not run migration 0004 returns. */
const missingColumn = (error: { code?: string; message?: string } | null) => Boolean(error && (error.code === "42703" || /column .* does not exist/i.test(error.message ?? "")));

export interface ReviewPage {
  rows: Review[];
  total: number;
  pages: number;
}

/**
 * Approved reviews for one product. Reviews arrive through the form on
 * /register/[slug]/reviews/new, wait in the moderation queue, and only appear
 * here once an admin approves them. Nothing here is averaged or counted into a
 * rating: the register publishes no rating.
 */
export async function getReviews(slug: string, q: ReviewQuery): Promise<ReviewPage> {
  const sb = publicClient();
  if (!sb) return { rows: [], total: 0, pages: 1 };

  const from = (q.page - 1) * REVIEW_PAGE_SIZE;
  const run = (columns: string) => {
    // Named columns, not "*": the database withholds ip_hash from anonymous readers, so a wildcard would be refused.
    let query = sb.from("reviews").select(columns, { count: "exact" }).eq("software_slug", slug).eq("status", "approved");
    if (q.size) query = query.eq("company_size", q.size);
    if (q.industry) query = query.eq("industry", q.industry);
    query = q.sort === "recent" ? query.order("created_at", { ascending: false }) : query.order("helpful", { ascending: false }).order("created_at", { ascending: false });
    return query.range(from, from + REVIEW_PAGE_SIZE - 1);
  };
  let { data, count, error } = await run(REVIEW_COLUMNS);
  if (missingColumn(error)) ({ data, count, error } = await run(BASE_COLUMNS)); // migration 0004 has not been run yet
  if (error) {
    console.warn(`[softwareregister] supabase reviews: ${error.message}`);
    return { rows: [], total: 0, pages: 1 };
  }
  const total = count ?? 0;
  return { rows: (data ?? []) as unknown as Review[], total, pages: Math.max(1, Math.ceil(total / REVIEW_PAGE_SIZE)) };
}

/**
 * The latest approved review for each product, from one query, so a list of
 * cards does not make one request per card. Empty when the database is not
 * connected or has no approved review yet.
 */
export async function getLatestReviews(): Promise<Map<string, Review>> {
  const latest = new Map<string, Review>();
  const sb = publicClient();
  if (!sb) return latest;
  const run = (columns: string) => sb.from("reviews").select(columns).eq("status", "approved").order("created_at", { ascending: false }).limit(500);
  let { data, error } = await run(REVIEW_COLUMNS);
  if (missingColumn(error)) ({ data, error } = await run(BASE_COLUMNS)); // migration 0004 has not been run yet
  if (error) {
    console.warn(`[softwareregister] supabase latest reviews: ${error.message}`);
    return latest;
  }
  for (const r of (data ?? []) as unknown as Review[]) if (!latest.has(r.software_slug)) latest.set(r.software_slug, r);
  return latest;
}

export async function getTopReviews(slug: string, limit = 10): Promise<Review[]> {
  return (await getReviews(slug, { sort: "helpful", page: 1 })).rows.slice(0, limit);
}
