import { isSeatBasis, randLabel, seatTotal, toRand, vatBasisOf, type VatBasis } from "./calc";
import { getProfile } from "./data/profiles";
import { saAvailability } from "./data/availability";
import { BANKS, SECTORS } from "./data/sectors";
import type { FxRates } from "./fx";
import { VAT_RATE } from "./site";
import type { PricedSoftware } from "./types";

/**
 * The shortlist finder. Five questions, then every product that fits, in
 * alphabetical order or by price. It is a filter and a sum, never a ranking: a
 * product appears when its own pages state what the answers need, and the page
 * lists the products it left out and why. A fact a vendor does not state is not
 * treated as a no, so the reader is told to ask.
 *
 * Copy contains no hyphens and no dashes.
 */

export const SIZES = [
  { value: "tiny", label: "1 to 5 people", seats: 3 },
  { value: "small", label: "6 to 25 people", seats: 15 },
  { value: "medium", label: "26 to 100 people", seats: 60 },
  { value: "large", label: "101 to 250 people", seats: 175 },
] as const;

export const VAT_ANSWERS = [
  { value: "yes", label: "Yes, registered for VAT" },
  { value: "no", label: "No, not registered" },
  { value: "unsure", label: "Not sure yet" },
] as const;

export const BUDGETS = [
  { value: "any", label: "Any budget", limit: Infinity },
  { value: "r500", label: "Up to R500 a month", limit: 500 },
  { value: "r1500", label: "Up to R1 500 a month", limit: 1500 },
  { value: "r5000", label: "Up to R5 000 a month", limit: 5000 },
] as const;

/** Bank feeds matter to accounting and ERP, which reconcile a bank. For the rest the bank question is ignored. */
export const BANK_SECTORS = ["accounting", "erp"];
/** VAT201 preparation matters to the products that keep a ledger. */
export const VAT_SECTORS = ["accounting", "erp"];

export interface FinderAnswers {
  sector: string;
  size: (typeof SIZES)[number]["value"];
  vat: (typeof VAT_ANSWERS)[number]["value"];
  bank: string;
  budget: (typeof BUDGETS)[number]["value"];
  sort: "name" | "price";
}

type Params = Record<string, string | string[] | undefined>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

export function parseAnswers(sp: Params): FinderAnswers | null {
  const sector = one(sp.sector);
  if (!SECTORS.some((s) => s.slug === sector)) return null;
  const size = one(sp.size);
  const vat = one(sp.vat);
  const bank = one(sp.bank);
  const budget = one(sp.budget);
  return {
    sector,
    size: SIZES.find((s) => s.value === size)?.value ?? "small",
    vat: VAT_ANSWERS.find((v) => v.value === vat)?.value ?? "unsure",
    bank: (BANKS as readonly string[]).includes(bank) ? bank : "",
    budget: BUDGETS.find((b) => b.value === budget)?.value ?? "any",
    sort: one(sp.sort) === "price" ? "price" : "name",
  };
}

export interface Estimate {
  kind: "quoted" | "headcount" | "bands" | "seats" | "flat";
  /** Rand a month on the footing the vendor lists, or null when it cannot be worked out. */
  amount: number | null;
  /** The same figure with VAT in, where the footing is known. */
  inclVat: number | null;
  basis: VatBasis;
  /** One line saying how the figure was reached. */
  how: string;
  /** A plan at no cost exists, whatever its limits. */
  freePlan: boolean;
}

/** What the product costs a month for this many people on the cheapest plan sold at that size. */
export function estimate(s: PricedSoftware, seats: number, rates: FxRates): Estimate {
  const profile = getProfile(s.slug);
  const freePlan = s.pricing_plans.some((p) => p.price === 0);

  if (s.starting_price === null) return { kind: "quoted", amount: null, inclVat: null, basis: "unstated", how: "The vendor gives its price on request.", freePlan };
  if (profile?.rateByHeadcount) {
    return { kind: "headcount", amount: null, inclVat: null, basis: profile.vat ?? "unstated", how: "The vendor quotes by headcount, so run its quote for your number.", freePlan };
  }
  if (profile?.bands?.length) {
    const open = profile.bands.find((b) => b.upTo === null);
    const band = profile.bands.find((b) => b.upTo !== null && seats <= (b.upTo as number));
    const amount = band ? band.monthly : open?.perEmployee ? open.perEmployee * seats : null;
    if (amount !== null) return { kind: "bands", amount, inclVat: amount, basis: "incl", how: `The band for ${band ? band.label : "more than 200"} employees, including VAT.`, freePlan };
  }

  const rules = profile?.seatRules ?? [];
  const candidates = s.pricing_plans
    .filter((p) => p.price !== null && p.price > 0 && (!profile?.basePlans || profile.basePlans.includes(p.name)))
    .map((p) => ({ p, rand: toRand(p.price as number, p.currency, rates) }))
    .sort((a, b) => a.rand - b.rand);

  for (const { p, rand } of candidates) {
    const seat = isSeatBasis(p.basis);
    const total = seat ? seatTotal(rules.find((r) => r.plan === p.name), seats, rand, rates) : rand;
    if (total === null) continue;
    const basis = profile?.vat ?? vatBasisOf(p.basis);
    const inclVat = basis === "excl" ? total * (1 + VAT_RATE) : total;
    return {
      kind: seat ? "seats" : "flat",
      amount: total,
      inclVat,
      basis,
      how: seat ? `${p.name} at ${randLabel(rand, Boolean(p.currency && p.currency !== "ZAR"))} each for ${seats} ${p.basis === "employee_mo" ? "employees" : "users"}.` : `${p.name}, priced for the organisation.`,
      freePlan,
    };
  }
  return { kind: "flat", amount: null, inclVat: null, basis: "unstated", how: "The plans listed cannot be priced at this size from the page.", freePlan };
}

export interface FinderRow {
  s: PricedSoftware;
  est: Estimate;
  reasons: string[];
}

export interface FinderResult {
  fits: FinderRow[];
  quoted: FinderRow[];
  left: { s: PricedSoftware; why: string }[];
  seats: number;
  notes: string[];
}

export function runFinder(items: PricedSoftware[], a: FinderAnswers, rates: FxRates): FinderResult {
  const seats = SIZES.find((s) => s.value === a.size)?.seats ?? 15;
  const limit = BUDGETS.find((b) => b.value === a.budget)?.limit ?? Infinity;
  const needVat = a.vat === "yes" && VAT_SECTORS.includes(a.sector);
  const needBank = Boolean(a.bank) && BANK_SECTORS.includes(a.sector);

  const notes: string[] = [];
  if (a.vat === "yes" && !VAT_SECTORS.includes(a.sector)) notes.push("VAT registration does not change which products suit in this sector, so that answer was not used.");
  if (a.bank && !BANK_SECTORS.includes(a.sector)) notes.push("The bank question only applies to accounting and ERP, so it was not used.");
  if (a.vat === "unsure" && VAT_SECTORS.includes(a.sector)) notes.push("You were not sure about VAT, so no VAT201 filter was applied. Registration is compulsory once taxable turnover passes R1 million in twelve months.");

  const fits: FinderRow[] = [];
  const quoted: FinderRow[] = [];
  const left: { s: PricedSoftware; why: string }[] = [];

  for (const s of items.filter((x) => x.sector === a.sector)) {
    const est = estimate(s, seats, rates);
    const reasons: string[] = [];
    if (needVat) {
      if (!s.compliance?.includes("VAT201")) {
        left.push({ s, why: "Its own pages do not state that it prepares the VAT201." });
        continue;
      }
      reasons.push("Prepares the VAT201");
    }
    if (needBank) {
      if (!s.bank_feeds?.includes(a.bank)) {
        left.push({ s, why: `Its own pages do not list a ${a.bank} bank feed.` });
        continue;
      }
      reasons.push(`${a.bank} bank feed`);
    }
    if (est.kind === "quoted") {
      quoted.push({ s, est, reasons });
      continue;
    }
    if (est.inclVat !== null && est.inclVat > limit && !est.freePlan) {
      left.push({ s, why: `About ${randLabel(est.inclVat, true)} a month for ${seats} people, over your budget.` });
      continue;
    }
    if (est.freePlan) reasons.push("Has a free plan");
    if (s.free_trial) reasons.push("Free trial");
    if (saAvailability(s.slug).status === "local") reasons.push("Sold in South Africa");
    fits.push({ s, est, reasons });
  }
  for (const q of quoted) if (saAvailability(q.s.slug).status === "local") q.reasons.push("Sold in South Africa");

  const byName = (x: FinderRow, y: FinderRow) => x.s.name.localeCompare(y.s.name, "en-ZA");
  if (a.sort === "price") fits.sort((x, y) => (x.est.inclVat ?? Infinity) - (y.est.inclVat ?? Infinity) || byName(x, y));
  else fits.sort(byName);
  quoted.sort(byName);
  return { fits, quoted, left, seats, notes };
}
