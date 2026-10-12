/**
 * Shared shapes. Field names match the database columns one to one, so a row
 * read from Supabase is already a `Software` and needs no mapping.
 */

export type Currency = "ZAR" | "USD" | "GBP" | "EUR";

/** What a listed price is per, and whether VAT is inside it. */
export type PriceBasis = "mo" | "mo_incl_vat" | "mo_excl_vat" | "employee_mo" | "user_mo";

export type SectorSlug = "accounting" | "erp" | "payroll" | "hr" | "crm" | "project-management";

export interface Sector {
  slug: SectorSlug;
  name: string;
  /** Used in lists, for example "Accounting software". */
  label: string;
  description: string;
  sort: number;
}

export interface PricingPlan {
  name: string;
  /** null means the plan is quoted. 0 means it is free. */
  price: number | null;
  currency: Currency | null;
  basis: PriceBasis | null;
  adds: string | null;
}

export interface Software {
  id: string;
  slug: string;
  name: string;
  vendor: string;
  sector: SectorSlug;
  summary: string;
  website_url: string | null;
  /** The host and path the price was read from, for the pricing stamp. */
  vendor_website: string | null;
  affiliate_url: string | null;
  founded: number | null;
  /** null is a price given on request. 0 is Free. They are not the same thing. */
  starting_price: number | null;
  /** Currency of the listed price. null when the price is quoted and unpublished. */
  price_currency: Currency | null;
  price_basis: PriceBasis | null;
  /** ISO date the price was read. null when the vendor gives its price on request. */
  price_checked_at: string | null;
  pricing_plans: PricingPlan[];
  pricing_note: string | null;
  free_trial: boolean | null;
  free_plan: boolean | null;
  demo: boolean | null;
  /** The items the vendor's page says the product handles. null when the page lists none. */
  compliance: string[] | null;
  bank_feeds: string[] | null;
  features: string[];
  integrations: string[];
  assessment: string | null;
  logo: string | null;
  screenshots: string[];
  status: "active" | "withdrawn";
}

import type { FxInfo } from "./fx";

export interface PricedSoftware extends Software {
  /** The starting price in rand. Converted at the reference rate when the vendor lists in another currency. null when the price is on request. */
  price_rand: number | null;
  /** Set only when the price was converted. Carries the rate and its date. */
  fx: FxInfo | null;
}

export interface Comparison {
  slug: string;
  a: string;
  b: string;
}

export type BriefingBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "quote"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "note"; text: string }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "live"; name: "priced" | "quoted" | "free" | "vat" | "banks" };

export type BriefingTopic = "Pricing" | "Buying" | "Compliance";

export interface Briefing {
  slug: string;
  title: string;
  standfirst: string;
  topic: BriefingTopic;
  author: string;
  published_at: string;
  read_minutes: number;
  body: BriefingBlock[];
  product_slugs: string[];
  published: boolean;
}

export interface Review {
  id: string;
  software_slug: string;
  rating: number;
  title: string;
  body: string;
  author_name: string;
  author_role: string | null;
  company_size: string | null;
  industry: string | null;
  helpful: number;
  created_at: string;
  sub_ease: number | null;
  sub_value: number | null;
  sub_support: number | null;
  sub_functionality: number | null;
  /** The reader's own account, all optional. None of it is averaged, counted into a score or used to rank. */
  pros?: string | null;
  cons?: string | null;
  time_used?: string | null;
  plan_used?: string | null;
  used_for?: string | null;
  switched_from?: string | null;
  /** Slugs of products the reader also looked at. */
  alternatives_considered?: string[] | null;
  reasons?: string[] | null;
  /** A reply the vendor asked to have shown beneath the review. An editor saves it; a reader cannot. */
  vendor_reply?: string | null;
  vendor_reply_by?: string | null;
  vendor_reply_at?: string | null;
}

export interface SiteStats {
  products: number;
  sectors: number;
  comparisons: number;
  briefings: number;
  priced: number;
  free: number;
  quoted: number;
  lastChecked: string | null;
  checkedCount: number;
}

/* ------------------------------------------------------------- editorial */

export interface EditorialSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface EditorialComparison {
  /** The pair slug, a-vs-b. */
  slug: string;
  headline: string;
  summary: string;
  chooseA: string[];
  chooseB: string[];
  /** Side by side facts, in the order a, b. */
  glance: { label: string; a: string; b: string }[];
  sections: EditorialSection[];
  verdict: string;
  researchedAt: string;
}

/** One section of a product's in depth review: a heading, paragraphs, and optional bullet points. */
export interface ProfileSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

/** A vendor fact shown as a number tile, such as the year it was founded. `note` says whose figure it is. */
export interface ProfileStat {
  label: string;
  value: string;
  note?: string;
}

/**
 * An optional extra a vendor sells on top of a plan. Amounts are in `currency`
 * (rand when absent) per month, and `yearly` is the per month price when the
 * add on is bought for a year, where the vendor says so.
 */
export interface ProfileAddOn {
  name: string;
  monthly: number;
  yearly?: number;
  currency?: Currency;
  /** flat is one charge, seat is charged per user or employee, count is bought in units such as an extra user. */
  kind: "flat" | "seat" | "count";
  countLabel?: string;
  note?: string;
}

/** One employee band of a banded price list, such as Sage Payroll's. `upTo` is null for the open ended top band. */
export interface ProfileBand {
  label: string;
  upTo: number | null;
  /** Rand a month for the whole band. Null when the top band is priced per employee. */
  monthly: number | null;
  perEmployee?: number;
}

/** What a plan costs a month when paid monthly and when paid for a year. */
export interface ProfileBilling {
  plan: string;
  monthly: number;
  yearly: number;
  currency?: Currency;
}

export interface ProfileFaq {
  q: string;
  a: string;
}

export interface ProfileSource {
  label: string;
  url: string;
}

/**
 * The in depth review of one product. Everything on it is a fact read from the
 * vendor's own pages: it carries no score and no rank. Prices, plans and charts
 * are built from the live record; this holds the words and the extra figures.
 */
/** A limit or flat rate on a per seat plan, such as Wrike Team for 2 to 15 users or a flat monthly rate below 25 employees. */
export interface ProfileSeatRule {
  plan: string;
  /** Fewest seats the plan is sold for. */
  min?: number;
  /** Most seats the plan is sold for. */
  max?: number;
  /** Up to this many seats the vendor charges one flat monthly amount instead of a price per seat. */
  flatUpTo?: number;
  flatMonthly?: number;
  currency?: Currency;
}

export interface ProductProfile {
  slug: string;
  headline: string;
  summary: string;
  bestFor: string[];
  thinkTwice: string[];
  pros: string[];
  cons: string[];
  stats: ProfileStat[];
  /** For a product whose plans are not all alternatives (Sage HR sells modules on a core plan): the plans that are base plans. */
  basePlans?: string[];
  /** Seat limits and flat rates for the plans that have them. */
  seatRules?: ProfileSeatRule[];
  /** The VAT basis of the plan prices when the vendor states it but the price basis, which is per seat, cannot carry it. */
  vat?: "incl" | "excl";
  /** The vendor quotes its per employee rate by headcount, so the listed rate holds only for the size it was quoted at. Turns off the team size chart and the calculator. */
  rateByHeadcount?: boolean;
  /** Hand written sections. When present they replace the reused archive sections for this product. */
  sections?: ProfileSection[];
  /** Extra sections added after the reused archive sections, for a product that has no hand written set. */
  moreSections?: ProfileSection[];
  addOns?: ProfileAddOn[];
  bands?: ProfileBand[];
  billing?: ProfileBilling[];
  faqs?: ProfileFaq[];
  verdict: string;
  sources?: ProfileSource[];
  researchedAt: string;
}
