import { saAvailability } from "./data/availability";
import { formatRand, formatDateLong } from "./format";
import type { FxRates } from "./fx";
import type { Registry } from "./registry";
import { VAT_PERCENT, VAT_RATE } from "./site";
import type { Currency, PriceBasis, PricedSoftware, ProductProfile, ProfileFaq, ProfileSeatRule } from "./types";

/**
 * The numbers behind a product's review: plan prices in rand, what a team costs,
 * how the price compares with the products beside it, and the settings of the cost
 * calculator. Pure functions over the record and the profile. Nothing here ranks
 * or scores a product: every figure is a price, a count or a sum.
 */

export type VatBasis = "incl" | "excl" | "unstated";

export const vatBasisOf = (basis: PriceBasis | null): VatBasis => (basis === "mo_incl_vat" ? "incl" : basis === "mo_excl_vat" ? "excl" : "unstated");
export const isSeatBasis = (basis: PriceBasis | null): boolean => basis === "user_mo" || basis === "employee_mo";

/** An amount in any currency, as rand at the reference rate. Rand passes through. */
export function toRand(amount: number, currency: Currency | null | undefined, rates: FxRates): number {
  if (!currency || currency === "ZAR") return amount;
  return amount / rates.perRand[currency];
}

const cents = (n: number) => Math.round(n * 100) / 100;

/** Rand with no pointless cents: R182, R23.55, R1 375. Converted amounts are rounded to whole rand. */
export function randLabel(n: number, converted = false): string {
  return formatRand(converted ? Math.round(n) : cents(n));
}

const BASIS_SUFFIX: Record<PriceBasis, string> = {
  mo: "a month",
  mo_incl_vat: "a month including VAT",
  mo_excl_vat: "a month excluding VAT",
  employee_mo: "per employee a month",
  user_mo: "per user a month",
};

export function basisSentence(basis: PriceBasis | null): string {
  return basis ? BASIS_SUFFIX[basis] : "a month";
}

/* --------------------------------------------------------------- plan ladder */

export interface LadderRow {
  name: string;
  rand: number;
  label: string;
  /** "R450 including VAT, R391.30 excluding VAT" when the vendor states a VAT basis. */
  split: string | null;
  free: boolean;
  seat: boolean;
}

export function buildLadder(s: PricedSoftware, rates: FxRates, vatOverride?: VatBasis): LadderRow[] {
  return s.pricing_plans
    .filter((p) => p.price !== null)
    .map((p) => {
      const converted = Boolean(p.currency && p.currency !== "ZAR");
      const rand = toRand(p.price as number, p.currency, rates);
      const vat = vatOverride ?? vatBasisOf(p.basis);
      const free = rand === 0;
      let split: string | null = null;
      if (!free && vat === "incl") split = `${randLabel(rand, converted)} including VAT, ${randLabel(rand / (1 + VAT_RATE), converted)} excluding VAT`;
      if (!free && vat === "excl") split = `${randLabel(rand, converted)} excluding VAT, ${randLabel(rand * (1 + VAT_RATE), converted)} including VAT`;
      return {
        name: p.name,
        rand,
        label: free ? "Free" : `${randLabel(rand, converted)}${isSeatBasis(p.basis) ? (p.basis === "employee_mo" ? " /employee" : " /user") : ""}`,
        split,
        free,
        seat: isSeatBasis(p.basis),
      };
    });
}

/* -------------------------------------------------------------- team costs */

export interface SeatCostGroup {
  seats: number;
  values: { plan: string; rand: number }[];
}

/**
 * What a team of each size pays a month on the first paid plans of a per seat
 * product. Returns an empty list for a product that is not priced per seat.
 */
export function buildSeatCosts(s: PricedSoftware, rates: FxRates, basePlans?: string[], rules: ProfileSeatRule[] = [], sizes = [1, 5, 10, 25, 50]): SeatCostGroup[] {
  const plans = s.pricing_plans.filter((p) => p.price !== null && p.price > 0 && isSeatBasis(p.basis) && (!basePlans || basePlans.includes(p.name))).slice(0, 3);
  if (plans.length === 0) return [];
  return sizes
    .map((seats) => ({
      seats,
      values: plans.flatMap((p) => {
        const total = seatTotal(rules.find((r) => r.plan === p.name), seats, toRand(p.price as number, p.currency, rates), rates);
        return total === null ? [] : [{ plan: p.name, rand: total }];
      }),
    }))
    .filter((g) => g.values.length > 0);
}

/** A month's cost of a per seat plan for a team of this size, or null when the vendor does not sell the plan at that size. */
export function seatTotal(rule: ProfileSeatRule | undefined, seats: number, perSeatRand: number, rates: FxRates): number | null {
  if (rule?.flatUpTo !== undefined && rule.flatMonthly !== undefined && seats <= rule.flatUpTo) return toRand(rule.flatMonthly, rule.currency, rates);
  if (rule?.min !== undefined && seats < rule.min) return null;
  if (rule?.max !== undefined && seats > rule.max) return null;
  return perSeatRand * seats;
}

/* ----------------------------------------------------------------- peer prices */

export interface PeerRow {
  slug: string;
  name: string;
  rand: number;
  label: string;
  self: boolean;
}

export interface PeerChart {
  rows: PeerRow[];
  onRequest: string[];
  /** The middle starting price of the priced products in this category, in rand. */
  median: number | null;
  sector: string;
}

/** Starting prices of every priced product in the same category, cheapest first. A price sort, not a ranking. */
export function buildPeers(s: PricedSoftware, reg: Registry): PeerChart {
  const peers = reg.items.filter((x) => x.sector === s.sector);
  const priced = peers
    .filter((x) => x.starting_price !== null && x.price_rand !== null)
    .map((x) => {
      const rand = x.price_rand as number;
      const converted = Boolean(x.fx);
      return {
        slug: x.slug,
        name: x.name,
        rand,
        label: rand === 0 ? "Free" : `${randLabel(rand, converted)}${isSeatBasis(x.price_basis) ? (x.price_basis === "employee_mo" ? " /employee" : " /user") : ""}`,
        self: x.slug === s.slug,
      };
    })
    .sort((a, b) => a.rand - b.rand || a.name.localeCompare(b.name, "en-ZA"));
  const paid = priced.filter((r) => r.rand > 0).map((r) => r.rand);
  const mid = Math.floor(paid.length / 2);
  const median = paid.length === 0 ? null : paid.length % 2 ? paid[mid] : (paid[mid - 1] + paid[mid]) / 2;
  return { rows: priced, onRequest: peers.filter((x) => x.starting_price === null).map((x) => x.name), median, sector: s.sector };
}

/* ------------------------------------------------------------------ calculator */

export interface CalcPlan {
  name: string;
  /** Rand a month when paid monthly, before any per seat multiplication. */
  monthly: number;
  /** Rand a month when paid for a year. Equal to `monthly` when the vendor shows no yearly price. */
  yearly: number;
  seatPriced: boolean;
  vat: VatBasis;
  note: string | null;
  /** Fewest and most seats the plan is sold for, when the vendor sets them. */
  min: number | null;
  max: number | null;
  /** Up to this many seats the vendor charges one flat monthly amount, in rand. */
  flatUpTo: number | null;
  flatMonthly: number | null;
}

export interface CalcAddOn {
  id: string;
  name: string;
  monthly: number;
  yearly: number;
  kind: "flat" | "seat" | "count";
  countLabel: string | null;
  note: string | null;
}

export interface CalcBand {
  label: string;
  upTo: number | null;
  monthly: number | null;
  perEmployee: number | null;
}

export interface CalcConfig {
  mode: "plans" | "bands";
  name: string;
  vat: VatBasis;
  seatLabel: string;
  defaultSeats: number;
  plans: CalcPlan[];
  addOns: CalcAddOn[];
  bands: CalcBand[];
  hasYearly: boolean;
}

/** The calculator's settings for a product, or null when the product has no published price to add up. */
export function buildCalcConfig(s: PricedSoftware, profile: ProductProfile | undefined, rates: FxRates): CalcConfig | null {
  if (profile?.rateByHeadcount) return null;
  if (profile?.bands && profile.bands.length) {
    return {
      mode: "bands",
      name: s.name,
      vat: "incl",
      seatLabel: "Employees",
      defaultSeats: 10,
      plans: [],
      addOns: [],
      bands: profile.bands.map((b) => ({ label: b.label, upTo: b.upTo, monthly: b.monthly, perEmployee: b.perEmployee ?? null })),
      hasYearly: false,
    };
  }

  const base = s.pricing_plans.filter((p) => p.price !== null && (!profile?.basePlans || profile.basePlans.includes(p.name)));
  if (base.length === 0) return null;
  const billing = new Map((profile?.billing ?? []).map((b) => [b.plan, b]));

  const plans: CalcPlan[] = base.map((p) => {
    const b = billing.get(p.name);
    const rule = profile?.seatRules?.find((r) => r.plan === p.name);
    const listed = toRand(p.price as number, p.currency, rates);
    return {
      name: p.name,
      monthly: b ? toRand(b.monthly, b.currency ?? p.currency, rates) : listed,
      yearly: b ? toRand(b.yearly, b.currency ?? p.currency, rates) : listed,
      seatPriced: isSeatBasis(p.basis),
      vat: profile?.vat ?? vatBasisOf(p.basis),
      note: p.adds,
      min: rule?.min ?? null,
      max: rule?.max ?? null,
      flatUpTo: rule?.flatUpTo !== undefined && rule.flatMonthly !== undefined ? rule.flatUpTo : null,
      flatMonthly: rule?.flatUpTo !== undefined && rule.flatMonthly !== undefined ? toRand(rule.flatMonthly, rule.currency ?? p.currency, rates) : null,
    };
  });

  const addOns: CalcAddOn[] = (profile?.addOns ?? []).map((a, i) => ({
    id: `a${i}`,
    name: a.name,
    monthly: toRand(a.monthly, a.currency, rates),
    yearly: toRand(a.yearly ?? a.monthly, a.currency, rates),
    kind: a.kind,
    countLabel: a.countLabel ?? null,
    note: a.note ?? null,
  }));

  const seat = plans.some((p) => p.seatPriced);
  const employee = base.some((p) => p.basis === "employee_mo");
  const hasYearly = plans.some((p) => p.yearly !== p.monthly) || addOns.some((a) => a.yearly !== a.monthly);
  const vats = new Set(plans.map((p) => p.vat));
  return {
    mode: "plans",
    name: s.name,
    vat: vats.size === 1 ? [...vats][0] : "unstated",
    seatLabel: seat ? (employee ? "Employees" : "Users") : "Users",
    defaultSeats: seat ? 10 : 1,
    plans,
    addOns,
    bands: [],
    hasYearly,
  };
}

/* ------------------------------------------------------------------- narrative */

/** The pricing section's paragraphs, built from the live record so they cannot drift from it. */
export function buildPricingParagraphs(s: PricedSoftware, rates: FxRates, vatOverride?: VatBasis): string[] {
  const ladder = buildLadder(s, rates, vatOverride);
  const paid = ladder.filter((r) => !r.free);
  const out: string[] = [];

  if (s.starting_price === null && ladder.length === 0) {
    out.push(`${s.name} does not publish a price. ${s.vendor === s.name ? "The vendor" : s.vendor} gives it after you contact them, and the quote is the product: ask for the monthly price with the VAT basis stated, what is charged once only, and which SARS returns it handles for you.`);
  } else {
    const parts = ladder.map((r) => (r.free ? `${r.name} at no cost` : `${r.name} at ${r.label}`));
    out.push(`${s.name} lists ${ladder.length} priced ${ladder.length === 1 ? "plan" : "plans"}: ${parts.join(", ")}. Every figure is shown in rand${rates && ladder.some((r) => !r.free) && s.fx ? ", converted from the vendor's own price at the day's reference rate" : ""}.`);
    const first = paid[0];
    if (first?.split) out.push(`The vendor states a VAT basis, so both footings are known: ${first.name} is ${first.split}. A business registered for VAT claims the VAT back, so the figure excluding VAT is its real cost.`);
    else if (paid.length) out.push(`The vendor does not say whether VAT is in these figures, so ask before you set them beside a price that does. South African VAT is ${VAT_PERCENT} percent.`);
  }
  if (s.pricing_note) out.push(s.pricing_note);
  if (s.price_checked_at && s.starting_price !== null) out.push(`Read from ${s.vendor_website ?? "the vendor's own page"} on ${formatDateLong(s.price_checked_at)}.`);
  return out;
}

/* ------------------------------------------------------------------------ FAQ */

/** Questions a buyer asks, answered from the record. A question appears only when the record can answer it. */
export function buildAutoFaqs(s: PricedSoftware, reg: Registry, rates: FxRates, vatOverride?: VatBasis): ProfileFaq[] {
  const faqs: ProfileFaq[] = [];
  const ladder = buildLadder(s, rates, vatOverride);
  const paid = ladder.filter((r) => !r.free);

  if (s.starting_price === null) {
    faqs.push({ q: `How much does ${s.name} cost in South Africa?`, a: `${s.name} gives its price on request, so there is no published figure to quote. Ask for the monthly price in rand with the VAT basis stated, and for any one off charges in writing.` });
  } else if (ladder.length) {
    const cheapest = paid[0];
    faqs.push({
      q: `How much does ${s.name} cost in South Africa?`,
      a: `${s.name} starts ${cheapest ? `at ${cheapest.label} ${basisSentence(s.pricing_plans.find((p) => p.name === cheapest.name)?.basis ?? null)}` : "free"}${ladder.some((r) => r.free) && cheapest ? ", with a free plan as well" : ""}. It lists ${ladder.length} priced ${ladder.length === 1 ? "plan" : "plans"}, from ${ladder[0].label} to ${ladder[ladder.length - 1].label}.`,
    });
  }

  const first = s.pricing_plans.find((p) => p.price !== null && p.price > 0);
  if (first) {
    const vat = vatOverride ?? vatBasisOf(first.basis);
    faqs.push({
      q: `Does the ${s.name} price include VAT?`,
      a:
        vat === "incl"
          ? `Yes. ${s.vendor === s.name ? "The vendor" : s.vendor} quotes its rand prices including VAT. Taking the ${VAT_PERCENT} percent out of the first paid plan leaves ${randLabel(toRand(first.price as number, first.currency, rates) / (1 + VAT_RATE))}.`
          : vat === "excl"
            ? `No. The prices are quoted excluding VAT. Adding ${VAT_PERCENT} percent to the first paid plan makes it ${randLabel(toRand(first.price as number, first.currency, rates) * (1 + VAT_RATE))}. A VAT registered business claims the VAT back.`
            : `The vendor's page does not say whether VAT is included, so we show the plain figure and do not guess. Ask before you compare it with a price that states its basis.`,
    });
  }

  if (s.free_trial !== null || s.free_plan !== null) {
    const bits: string[] = [];
    if (s.free_plan === true) bits.push("a free plan");
    if (s.free_trial === true) bits.push("a free trial");
    faqs.push({
      q: `Is there a free trial or a free plan for ${s.name}?`,
      a: bits.length ? `Yes: ${s.name} offers ${bits.join(" and ")}.` : `The vendor's page shows neither a free plan nor a free trial.`,
    });
  }

  if (s.compliance && s.compliance.length) {
    faqs.push({ q: `Does ${s.name} handle SARS returns?`, a: `${s.name}'s own page lists these: ${s.compliance.join(", ")}. Ask the vendor to show the step that reaches SARS in a trial, because preparing a return and submitting it are different jobs.` });
  }
  if (s.bank_feeds && s.bank_feeds.length) {
    faqs.push({ q: `Which South African banks does ${s.name} connect to?`, a: `The vendor's page lists ${s.bank_feeds.join(", ")}. A bank can be supported while a particular account type is not, so check your own account before you rely on a feed.` });
  }

  const sa = saAvailability(s.slug);
  faqs.push({ q: `Is ${s.name} sold in South Africa?`, a: sa.note });

  const peers = reg.items.filter((x) => x.sector === s.sector && x.slug !== s.slug).slice(0, 5);
  if (peers.length) faqs.push({ q: `What are the alternatives to ${s.name}?`, a: `On this register the closest are ${peers.map((p) => p.name).join(", ")}. Each has its own page, and the compare tool sets any two side by side.` });
  return faqs;
}

/* ------------------------------------------------------------ price ranges */

export interface PeerRange {
  slug: string;
  name: string;
  /** Every paid plan price in rand, lowest first. */
  prices: number[];
  display: string;
  self: boolean;
}

/**
 * How far each product's paid plans stretch, for every priced product in the
 * category. A product with one paid plan has a range of one point. Free plans
 * and plans on request are left out, since they have no price to place.
 */
export function buildPeerRanges(s: PricedSoftware, reg: Registry, rates: FxRates): PeerRange[] {
  return reg.items
    .filter((x) => x.sector === s.sector)
    .flatMap((x) => {
      const paid = x.pricing_plans.filter((p) => p.price !== null && p.price > 0);
      if (paid.length === 0) return [];
      const prices = paid.map((p) => toRand(p.price as number, p.currency, rates)).sort((a, b) => a - b);
      const converted = paid.some((p) => p.currency && p.currency !== "ZAR");
      const seat = paid.some((p) => isSeatBasis(p.basis));
      const lo = prices[0];
      const hi = prices[prices.length - 1];
      const unit = seat ? (paid.some((p) => p.basis === "employee_mo") ? " per employee" : " per user") : "";
      const display = Math.round(lo * 100) === Math.round(hi * 100) ? `${randLabel(lo, converted)}${unit}` : `${randLabel(lo, converted)} to ${randLabel(hi, converted)}${unit}`;
      return [{ slug: x.slug, name: x.name, prices, display, self: x.slug === s.slug }];
    })
    .sort((a, b) => a.prices[0] - b.prices[0] || a.name.localeCompare(b.name, "en-ZA"));
}

/** True when the highest price is more than twelve times the lowest, so a straight scale would squash most of the rows. */
export function needsSqrtScale(ranges: PeerRange[]): boolean {
  const all = ranges.flatMap((r) => r.prices);
  return all.length > 1 && Math.max(...all) / Math.min(...all) > 12;
}

/* -------------------------------------------------------------- team growth */

export const GROWTH_SIZES = [1, 5, 10, 15, 20, 25, 30, 40, 50];

export interface GrowthSeries {
  name: string;
  points: { x: number; y: number }[];
}

/** What a team of each size pays a month on the first three paid per seat plans, honouring seat limits and flat rates. */
export function buildGrowth(s: PricedSoftware, rates: FxRates, basePlans?: string[], rules: ProfileSeatRule[] = [], sizes = GROWTH_SIZES): GrowthSeries[] {
  const plans = s.pricing_plans.filter((p) => p.price !== null && p.price > 0 && isSeatBasis(p.basis) && (!basePlans || basePlans.includes(p.name))).slice(0, 3);
  return plans.map((p) => ({
    name: p.name,
    points: sizes.flatMap((n) => {
      const y = seatTotal(rules.find((r) => r.plan === p.name), n, toRand(p.price as number, p.currency, rates), rates);
      return y === null ? [] : [{ x: n, y }];
    }),
  }));
}

/* ---------------------------------------------------------- yearly savings */

export interface SavingGauge {
  plan: string;
  /** Whole percent off the monthly price when the year is paid at once. */
  percent: number;
  monthly: number;
  yearly: number;
}

/** For each plan whose vendor lists a monthly and a yearly price, how much of the monthly price the year takes off. */
export function buildSavings(profile: ProductProfile | undefined, rates: FxRates, fallback: Currency | null): SavingGauge[] {
  return (profile?.billing ?? [])
    .map((b) => {
      const c = b.currency ?? fallback;
      const monthly = toRand(b.monthly, c, rates);
      const yearly = toRand(b.yearly, c, rates);
      return { plan: b.plan, percent: monthly > 0 ? Math.round((1 - yearly / monthly) * 100) : 0, monthly, yearly };
    })
    .filter((g) => g.percent > 0)
    .slice(0, 4);
}
