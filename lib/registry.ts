import { LEGAL_ITEMS, SARS_ITEMS, SARS_TRANSFER_ITEMS, BANKS, SECTORS, SECTOR_COMPLIANCE } from "./data/sectors";
import {
  basisLabel,
  daysSince,
  formatDateLong,
  formatMoney,
  priceLabel,
  randText,
  roundCents,
} from "./format";
import { saAvailability } from "./data/availability";
import { FX_SNAPSHOT } from "./data/fx";
import { fxFor, type FxRates } from "./fx";
import { VAT_PERCENT, VAT_RATE } from "./site";
import type {
  Currency,
  PricedSoftware,
  Sector,
  SectorSlug,
  SiteStats,
  Software,
} from "./types";

/**
 * Pure functions over the dataset. Nothing in here touches the network, the
 * filesystem or React, so the same code runs in pages, in the seed script and
 * in scripts/verify-dataset.ts.
 */

export interface Registry {
  /** Every active product, in alphabetical order. The register has no ranking: nothing here is ordered by a rating. */
  items: PricedSoftware[];
  bySlug: Map<string, PricedSoftware>;
}

/** Alphabetical, the one neutral order. Used as the tie break wherever another column is sorted. */
export function byName(a: Pick<Software, "name">, b: Pick<Software, "name">): number {
  return a.name.localeCompare(b.name, "en-ZA");
}

export function buildRegistry(software: Software[], rates: FxRates = FX_SNAPSHOT): Registry {
  const active = software.filter((s) => s.status === "active").sort(byName);
  // Every price also gets a rand figure. A foreign price is converted at the reference rate, and the rate travels with it.
  const items: PricedSoftware[] = active.map((s) => {
    const fx = fxFor(s.price_currency, rates);
    const price_rand = s.starting_price === null ? null : fx ? s.starting_price * fx.rand_per_unit : s.starting_price;
    return { ...s, price_rand, fx };
  });
  return { items, bySlug: new Map(items.map((s) => [s.slug, s])) };
}

export function sectorOf(slug: SectorSlug | string, sectors: Sector[] = SECTORS): Sector | undefined {
  return sectors.find((s) => s.slug === slug);
}

export const CURRENCY_NAME: Record<Currency, string> = {
  ZAR: "rand",
  USD: "US dollars",
  GBP: "pounds sterling",
  EUR: "euros",
};

export const isForeign = (c: Currency | null): boolean => c === "USD" || c === "GBP" || c === "EUR";

/* ------------------------------------------------------------------ stats */

export function computeStats(
  reg: Registry,
  extra: { sectors: number; comparisons: number; briefings: number },
): SiteStats {
  const items = reg.items;
  const dates = items.map((s) => s.price_checked_at).filter((d): d is string => Boolean(d));
  return {
    products: items.length,
    sectors: extra.sectors,
    comparisons: extra.comparisons,
    briefings: extra.briefings,
    priced: items.filter((s) => (s.starting_price ?? 0) > 0).length,
    free: items.filter((s) => s.starting_price === 0).length,
    quoted: items.filter((s) => s.starting_price === null).length,
    lastChecked: dates.length ? dates.reduce((a, b) => (a > b ? a : b)) : null,
    checkedCount: dates.length,
  };
}

/* --------------------------------------------------------------- SARS etc */

export type SarsStatus = "unlisted" | "files";

/** Files means the vendor's page says the product handles at least one SARS return. Anything else is simply not listed. */
export function sarsStatus(s: Software): SarsStatus {
  if (s.compliance === null) return "unlisted";
  const sars = [...SARS_ITEMS, ...SARS_TRANSFER_ITEMS] as readonly string[];
  return s.compliance.some((c) => sars.includes(c)) ? "files" : "unlisted";
}

/* ----------------------------------------------------------- register query */

export type SortKey = "name" | "sector" | "price" | "checked";
export type PriceBand = "free" | "under300" | "300to1000" | "quoted";
export type Availability = "trial" | "plan" | "demo";

export interface RegisterQuery {
  sector: string[];
  price: PriceBand | null;
  sars: string[];
  legal: string[];
  bank: string[];
  avail: Availability[];
  /** Only products sold and supported in South Africa. */
  local: boolean;
  sort: SortKey;
  dir: "asc" | "desc";
  /** Cards are the default. The table is for people who want every column at once. */
  view: "cards" | "table";
}

type Params = Record<string, string | string[] | undefined>;

function many(v: string | string[] | undefined): string[] {
  if (v === undefined) return [];
  return (Array.isArray(v) ? v : [v]).flatMap((x) => x.split(",")).map((x) => x.trim()).filter(Boolean);
}

function one(v: string | string[] | undefined): string | null {
  if (v === undefined) return null;
  return (Array.isArray(v) ? v[0] : v) ?? null;
}

const SORT_KEYS: SortKey[] = ["name", "sector", "price", "checked"];
const PRICE_BANDS: PriceBand[] = ["free", "under300", "300to1000", "quoted"];
const AVAIL: Availability[] = ["trial", "plan", "demo"];

export function parseRegisterQuery(sp: Params): RegisterQuery {
  const sort = one(sp.sort) as SortKey | null;
  const price = one(sp.price) as PriceBand | null;
  const dir = one(sp.dir);
  const sortKey: SortKey = sort && SORT_KEYS.includes(sort) ? sort : "name";
  const defaultDir: "asc" | "desc" = sortKey === "checked" ? "desc" : "asc";
  return {
    sector: many(sp.sector),
    price: price && PRICE_BANDS.includes(price) ? price : null,
    sars: many(sp.sars),
    legal: many(sp.legal),
    bank: many(sp.bank),
    avail: many(sp.avail).filter((a): a is Availability => AVAIL.includes(a as Availability)),
    local: one(sp.local) === "1",
    sort: sortKey,
    dir: dir === "asc" || dir === "desc" ? dir : defaultDir,
    view: one(sp.view) === "table" ? "table" : "cards",
  };
}

export function isFiltered(q: RegisterQuery): boolean {
  return (
    q.sector.length > 0 ||
    q.price !== null ||
    q.sars.length > 0 ||
    q.legal.length > 0 ||
    q.bank.length > 0 ||
    q.avail.length > 0 ||
    q.local
  );
}

/** A /register URL for a query, with optional overrides. Keeps a filtered view shareable. */
export function registerHref(q: RegisterQuery, patch: Partial<RegisterQuery> = {}): string {
  const next = { ...q, ...patch };
  const params = new URLSearchParams();
  for (const v of next.sector) params.append("sector", v);
  if (next.price) params.set("price", next.price);
  for (const v of next.sars) params.append("sars", v);
  for (const v of next.legal) params.append("legal", v);
  for (const v of next.bank) params.append("bank", v);
  for (const v of next.avail) params.append("avail", v);
  if (next.local) params.set("local", "1");
  if (next.sort !== "name") {
    params.set("sort", next.sort);
    params.set("dir", next.dir);
  } else if (next.dir === "desc") {
    params.set("dir", "desc");
  }
  if (next.view === "table") params.set("view", "table");
  const qs = params.toString();
  return qs ? `/register?${qs}` : "/register";
}

function matchesPrice(s: PricedSoftware, band: PriceBand): boolean {
  const p = s.starting_price;
  // Bands are rand bands. A foreign price is placed in one by its converted figure.
  const rand = s.price_rand;
  switch (band) {
    case "free":
      return p === 0;
    case "quoted":
      return p === null;
    case "under300":
      return rand !== null && rand > 0 && rand < 300;
    case "300to1000":
      return rand !== null && rand >= 300 && rand <= 1000;
  }
}

/** Sector is OR within the group. SARS, legal, bank and availability must all match. */
export function filterSoftware(items: PricedSoftware[], q: RegisterQuery): PricedSoftware[] {
  return items.filter((s) => {
    if (q.local && saAvailability(s.slug).status !== "local") return false;
    if (q.sector.length && !q.sector.includes(s.sector)) return false;
    if (q.price && !matchesPrice(s, q.price)) return false;
    if (q.sars.length && !q.sars.every((c) => s.compliance?.includes(c))) return false;
    if (q.legal.length && !q.legal.every((c) => s.compliance?.includes(c))) return false;
    if (q.bank.length && !q.bank.every((b) => s.bank_feeds?.includes(b))) return false;
    for (const a of q.avail) {
      if (a === "trial" && s.free_trial !== true) return false;
      if (a === "plan" && s.free_plan !== true) return false;
      if (a === "demo" && s.demo !== true) return false;
    }
    return true;
  });
}

/** Free sorts first, then every price by its rand figure, and quoted always sorts last. */
function priceSortKey(s: PricedSoftware): [number, number] {
  if (s.starting_price === null) return [3, 0];
  if (s.starting_price === 0) return [0, 0];
  return [1, s.price_rand ?? s.starting_price];
}

export function sortSoftware(items: PricedSoftware[], q: RegisterQuery): PricedSoftware[] {
  const sign = q.dir === "asc" ? 1 : -1;
  const out = [...items];
  out.sort((a, b) => {
    let cmp = 0;
    switch (q.sort) {
      case "name":
        cmp = byName(a, b);
        break;
      case "sector":
        cmp = a.sector.localeCompare(b.sector) || byName(a, b);
        break;
      case "price": {
        const [ga, va] = priceSortKey(a);
        const [gb, vb] = priceSortKey(b);
        // A price on request stays last whichever way the column is sorted.
        if (ga === 3 || gb === 3) return ga === gb ? byName(a, b) : ga === 3 ? 1 : -1;
        cmp = ga - gb || va - vb;
        break;
      }
      case "checked": {
        const da = a.price_checked_at;
        const db = b.price_checked_at;
        // A missing value stays last whichever way the column is sorted.
        if (!da || !db) return da === db ? byName(a, b) : !da ? 1 : -1;
        cmp = da.localeCompare(db);
        break;
      }
    }
    return cmp === 0 ? byName(a, b) : cmp * sign;
  });
  return out;
}

/* ------------------------------------------------------------------ facets */

export interface Facet {
  value: string;
  label: string;
  count: number;
}

function orderBy(items: string[], canonical: readonly string[]): string[] {
  return [...items].sort((a, b) => {
    const ia = canonical.indexOf(a);
    const ib = canonical.indexOf(b);
    if (ia !== -1 && ib !== -1) return ia - ib;
    if (ia !== -1) return -1;
    if (ib !== -1) return 1;
    return a.localeCompare(b, "en-ZA");
  });
}

function union(items: Software[], pick: (s: Software) => string[] | null): string[] {
  const seen = new Set<string>();
  for (const s of items) for (const v of pick(s) ?? []) seen.add(v);
  return [...seen];
}

export interface Facets {
  sector: Facet[];
  sars: Facet[];
  legal: Facet[];
  bank: Facet[];
  avail: Facet[];
}

/**
 * Compliance and bank options are the union of values actually present in the
 * data. A hardcoded list would drift from the dataset and offer filters that
 * return nothing.
 */
export function buildFacets(items: PricedSoftware[], sectors: Sector[] = SECTORS): Facets {
  const compliance = union(items, (s) => s.compliance);
  const isSars = (c: string) =>
    (SARS_ITEMS as readonly string[]).includes(c) || (SARS_TRANSFER_ITEMS as readonly string[]).includes(c);
  const sarsValues = orderBy(compliance.filter(isSars), [...SARS_ITEMS, ...SARS_TRANSFER_ITEMS]);
  const legalValues = orderBy(compliance.filter((c) => !isSars(c)), LEGAL_ITEMS);
  const bankValues = orderBy(union(items, (s) => s.bank_feeds), BANKS);

  return {
    sector: sectors.map((sec) => ({
      value: sec.slug,
      label: sec.name,
      count: items.filter((s) => s.sector === sec.slug).length,
    })),
    sars: sarsValues.map((v) => ({ value: v, label: v, count: items.filter((s) => s.compliance?.includes(v)).length })),
    legal: legalValues.map((v) => ({ value: v, label: v, count: items.filter((s) => s.compliance?.includes(v)).length })),
    bank: bankValues.map((v) => ({ value: v, label: v, count: items.filter((s) => s.bank_feeds?.includes(v)).length })),
    avail: [
      { value: "trial", label: "Free trial", count: items.filter((s) => s.free_trial === true).length },
      { value: "plan", label: "Free plan", count: items.filter((s) => s.free_plan === true).length },
      { value: "demo", label: "Demo", count: items.filter((s) => s.demo === true).length },
    ],
  };
}

export const PRICE_BAND_LABEL: Record<PriceBand, string> = {
  free: "Free tier",
  under300: "Under R300 /mo",
  "300to1000": "R300 to R1 000 /mo",
  quoted: "Price on request",
};

/* --------------------------------------------------------- derived copy */

/** What the vendor's page says about SARS filing and bank feeds. A fact the page does not state is left out. */
function complianceSentence(s: Software): string {
  const parts: string[] = [];
  if (s.compliance !== null && sarsStatus(s) === "files") parts.push("It handles SARS returns.");
  if (s.bank_feeds !== null && s.bank_feeds.length) parts.push(`Bank feeds with ${s.bank_feeds.join(", ")}.`);
  return parts.join(" ");
}

/** The assessment paragraph. Computed from the record, so it can only say what the data says. */
export function assessmentFor(s: PricedSoftware, reg: Registry, sectors: Sector[] = SECTORS): string[] {
  if (s.assessment) return s.assessment.split(/\n\n+/);
  const sector = sectorOf(s.sector, sectors);
  const peers = reg.items.filter((x) => x.sector === s.sector);

  const first =
    `${s.name} is one of ${peers.length} products the register lists under ${sector?.label ?? "its sector"}. ` +
    `It is sold by ${s.vendor}${s.founded ? `, a company founded in ${s.founded}` : ""}.`;

  const p = priceLabel(s);
  let price: string;
  if (p.kind === "quoted") {
    price = "Its price is given on request.";
  } else if (p.kind === "free") {
    price = "It starts free.";
  } else {
    const where = s.vendor_website ? ` from ${s.vendor_website}` : "";
    price = s.price_checked_at ? `It lists at ${randText(s)}, read${where} on ${formatDateLong(s.price_checked_at)}.` : `It lists at ${randText(s)}.`;
  }

  return [first, price, complianceSentence(s)].filter(Boolean);
}

export interface Alternative {
  software: PricedSoftware;
  reason: string;
}

/** Other products in the same sector, in alphabetical order, each with a one line reason drawn from its own record. */
export function alternativesFor(s: PricedSoftware, reg: Registry, limit = 4): Alternative[] {
  const peers = reg.items.filter((x) => x.sector === s.sector && x.slug !== s.slug).sort(byName);
  return peers.slice(0, limit).map((alt) => {
    const p = priceLabel(alt);
    const parts: string[] = [];
    if (p.kind === "free") parts.push("Starts free.");
    if (saAvailability(alt.slug).status === "local") parts.push("Sold in South Africa.");
    if (alt.free_trial) parts.push("Free trial.");
    if (alt.free_plan && p.kind !== "free") parts.push("Free plan.");
    if (sarsStatus(alt) === "files") parts.push("Handles SARS returns.");
    return { software: alt, reason: parts.length ? parts.join(" ") : "Listed in the same category." };
  });
}

/* ------------------------------------------------------------- versus */

/** What a head to head page says in words. It names no winner: the table under it shows who is stronger on each measure. */
export interface ComparisonSummary {
  /** The lead is the price position, in one or two sentences. It doubles as the page standfirst. */
  paragraphs: string[];
}

function sameVatFooting(a: Software, b: Software): boolean {
  const kind = (s: Software) => (s.price_basis === "mo_incl_vat" ? "incl" : s.price_basis === "mo_excl_vat" ? "excl" : "plain");
  return kind(a) === kind(b) || kind(a) === "plain" || kind(b) === "plain";
}

/**
 * The summary says where the two products stand on price and SARS filing,
 * using only the dataset. It does not pick a winner, because the register holds
 * no rating to pick one with.
 */
export function buildSummary(a: PricedSoftware, b: PricedSoftware): ComparisonSummary {
  const pa = priceLabel(a);
  const pb = priceLabel(b);

  let lead: string;
  if (pa.kind === "quoted" && pb.kind === "quoted") {
    lead = "Both give their price on request, so ask each for a written quote that states the VAT basis.";
  } else if (pa.kind === "quoted" || pb.kind === "quoted") {
    const q = pa.kind === "quoted" ? a : b;
    const o = q === a ? b : a;
    lead = `${q.name} gives its price on request. ${o.name} ${priceLabel(o).kind === "free" ? "starts free" : `lists at ${randText(o)}`}.`;
  } else if (pa.kind === "free" && pb.kind === "free") {
    lead = "Both start free.";
  } else if (!sameVatFooting(a, b)) {
    lead = `${randText(a)} for ${a.name} and ${randText(b)} for ${b.name} are not on the same VAT footing. Add ${VAT_PERCENT} percent to the figure that excludes VAT before comparing.`;
  } else if (a.price_rand !== b.price_rand) {
    const cheaper = (a.price_rand ?? 0) < (b.price_rand ?? 0) ? a : b;
    const dearer = cheaper === a ? b : a;
    lead = `${cheaper.name} starts cheaper at ${randText(cheaper)} against ${randText(dearer)} for ${dearer.name}.`;
  } else {
    lead = `Both list at ${randText(a)}.`;
  }

  const detail: string[] = [];
  const filing = [a, b].filter((s) => sarsStatus(s) === "files");
  if (filing.length === 2) detail.push("Both handle SARS returns.");
  else if (filing.length === 1) detail.push(`${filing[0].name} handles SARS returns.`);

  const local = [a, b].filter((s) => saAvailability(s.slug).status === "local");
  if (local.length === 2) detail.push("Both are sold and supported in South Africa.");
  else if (local.length === 1) detail.push(`${local[0].name} is sold and supported in South Africa.`);

  return { paragraphs: [lead, detail.join(" ")].filter(Boolean) };
}

/* ---------------------------------------------------- sector standfirst */

const SECTOR_LEAD: Partial<Record<SectorSlug, string>> = {
  accounting:
    "In accounting software the two questions that cost money are whether the VAT201 transfers into SARS eFiling, and whether the product feeds from your bank.",
  payroll:
    "In payroll software the questions are EMP201, EMP501, IRP5, ETI and whether the output loads into e@syFile. A product that makes you retype any of them is a risk you pay for in penalties.",
  hr: "In HR software the question is BCEA leave accrual: whether annual, sick and family responsibility leave accrue by the rules the Act sets, and whether you can produce the record in a dispute.",
  erp: "An ERP touches VAT201 and payroll at once, and most give their price on request. The questions that matter are what the quote includes and which SARS returns the product files for you.",
  crm: "CRM software holds personal information, so POPIA applies to it directly. What separates products here is price per user, what the free plan allows and how contacts are stored.",
  "project-management":
    "Project management software has no SARS return to file. What separates products here is price per user, what the free plan allows and how many boards, projects or automations each plan includes.",
};

export function sectorStandfirst(sector: Sector, items: PricedSoftware[]): string {
  const total = items.length;
  const priced = items.filter((s) => (s.starting_price ?? 0) > 0).length;
  const free = items.filter((s) => s.starting_price === 0).length;
  const quoted = items.filter((s) => s.starting_price === null).length;
  const local = items.filter((s) => saAvailability(s.slug).status === "local").length;
  const lead = SECTOR_LEAD[sector.slug] ?? "";
  const facts =
    `The register holds ${total} ${sector.label.toLowerCase()} products: ${priced} with a published price in rand, ${free} that start free and ${quoted} priced on request. ` +
    `${local} ${local === 1 ? "is" : "are"} sold and supported in South Africa.`;
  return `${lead} ${facts}`.trim();
}

/** Compliance items that apply to a sector, for the matrix columns. */
export function matrixItems(sector: Sector): string[] {
  return SECTOR_COMPLIANCE[sector.slug] ?? [];
}

export type MatrixCell = "yes" | "no" | "unlisted" | "na";

export function matrixCell(s: Software, item: string, applicable: string[]): MatrixCell {
  if (!applicable.includes(item)) return "na";
  if (s.compliance === null) return "unlisted";
  return s.compliance.includes(item) ? "yes" : "unlisted";
}

/* ------------------------------------------------------------- briefings */

export function tokensFor(stats: SiteStats): Record<string, string> {
  return {
    products: String(stats.products),
    sectors: String(stats.sectors),
    comparisons: String(stats.comparisons),
    briefings: String(stats.briefings),
    priced: String(stats.priced),
    free: String(stats.free),
    quoted: String(stats.quoted),
    vat_pct: String(VAT_PERCENT),
    vat_factor: (1 + VAT_RATE).toFixed(2),
    checked_latest: stats.lastChecked ? formatDateLong(stats.lastChecked) : "",
    checked_count: String(stats.checkedCount),
  };
}

export function fillTokens(text: string, tokens: Record<string, string>): string {
  return text.replace(/\{\{(\w+)\}\}/g, (_, k: string) => tokens[k] ?? `{{${k}}}`);
}

export interface VatRow {
  software: Software;
  listed: string;
  basis: string;
  including: string;
  excluding: string;
}

/** Rand products with a stated VAT basis, shown on both footings. */
export function vatRows(items: Software[]): VatRow[] {
  const rows: VatRow[] = [];
  for (const s of items) {
    if (s.price_currency !== "ZAR" || !s.starting_price) continue;
    if (s.price_basis !== "mo_incl_vat" && s.price_basis !== "mo_excl_vat") continue;
    const incl = s.price_basis === "mo_incl_vat" ? s.starting_price : roundCents(s.starting_price * (1 + VAT_RATE));
    const excl = s.price_basis === "mo_excl_vat" ? s.starting_price : roundCents(s.starting_price / (1 + VAT_RATE));
    rows.push({
      software: s,
      listed: formatMoney(s.starting_price, "ZAR"),
      basis: basisLabel(s.price_basis),
      including: formatMoney(incl, "ZAR"),
      excluding: formatMoney(excl, "ZAR"),
    });
  }
  return rows;
}

export { daysSince };
