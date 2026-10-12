import { rateText, type FxInfo } from "./fx";
import type { Currency, PriceBasis, Software } from "./types";

/** Non breaking space, so "8 099" and "R1 375" never wrap across a line. */
const NBSP = " ";

export function formatInt(n: number): string {
  const sign = n < 0 ? "-" : "";
  const digits = Math.abs(Math.trunc(n)).toString();
  return sign + digits.replace(/\B(?=(\d{3})+(?!\d))/g, NBSP);
}

/** Rand amounts use a space for thousands and a point for decimals: R1 375, R21.49. */
export function formatRand(n: number): string {
  if (Number.isInteger(n)) return `R${formatInt(n)}`;
  const [whole, frac] = n.toFixed(2).split(".");
  return `R${formatInt(Number(whole))}.${frac}`;
}

export function formatMoney(amount: number, currency: Currency | null): string {
  if (currency === null || currency === "ZAR") return formatRand(amount);
  const fixed = Number.isInteger(amount) ? formatInt(amount) : amount.toFixed(2);
  return `${currency}${NBSP}${fixed}`;
}

export function formatRating(n: number): string {
  return n.toFixed(1);
}

const BASIS_LABEL: Record<PriceBasis, string> = {
  mo: "/mo",
  mo_incl_vat: "/mo incl VAT",
  mo_excl_vat: "/mo excl VAT",
  employee_mo: "/employee /mo",
  user_mo: "/user /mo",
};

export function basisLabel(basis: PriceBasis | null): string {
  return basis ? BASIS_LABEL[basis] : "";
}

export type PriceKind = "priced" | "free" | "quoted";

export interface PriceLabel {
  kind: PriceKind;
  /** What a reader sees first, always in rand: "R240", "R262", "Free" or "On request". Never blank and never a dash. */
  amount: string;
  /** "/mo incl VAT" and friends. Empty for free and quoted. */
  basis: string;
  /** True when the amount was converted from a foreign currency at the reference rate. */
  converted: boolean;
  /** The vendor's own price, such as "USD 14", when it was converted. */
  original: string | null;
  /** "R16.73 per US dollar, 2 OCT 2026", when it was converted. */
  rate: string | null;
}

type Priced = Pick<Software, "starting_price" | "price_currency" | "price_basis"> & { price_rand?: number | null; fx?: FxInfo | null };

/**
 * null is a price given on request. Zero is Free. They are different facts and render differently.
 * Every price is shown in rand. A foreign price is converted at the reference rate
 * and marked with a leading ≈, and the vendor's own figure rides along in `original`.
 */
export function priceLabel(s: Priced): PriceLabel {
  const plain = { converted: false, original: null, rate: null };
  if (s.starting_price === null) return { kind: "quoted", amount: "On request", basis: "", ...plain };
  if (s.starting_price === 0) return { kind: "free", amount: "Free", basis: "", ...plain };
  const basis = basisLabel(s.price_basis);
  if (s.fx && typeof s.price_rand === "number") {
    return {
      kind: "priced",
      amount: formatRand(Math.round(s.price_rand)),
      basis,
      converted: true,
      original: formatMoney(s.starting_price, s.price_currency),
      rate: `${rateText(s.fx)}, ${formatDateStamp(s.fx.as_of)}`,
    };
  }
  return { kind: "priced", amount: formatMoney(s.starting_price, s.price_currency), basis, ...plain };
}

/** The price in rand, as one string: "R262 /user /mo". */
export function randText(s: Priced): string {
  const p = priceLabel(s);
  return p.basis ? `${p.amount} ${p.basis}` : p.amount;
}

/** The vendor's own price in its own currency: "USD 14 /user /mo". Used for structured data and the dataset check. */
export function priceText(s: Pick<Software, "starting_price" | "price_currency" | "price_basis">): string {
  const p = priceLabel({ starting_price: s.starting_price, price_currency: s.price_currency, price_basis: s.price_basis });
  return p.basis ? `${p.amount} ${p.basis}` : p.amount;
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function parseISO(iso: string): { y: number; m: number; d: number } {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  return { y, m, d };
}

/** "12 AUG 2026", the stamp form. */
export function formatDateStamp(iso: string): string {
  const { y, m, d } = parseISO(iso);
  return `${d} ${MONTHS[m - 1].slice(0, 3).toUpperCase()} ${y}`;
}

/** "12 August 2026". */
export function formatDateLong(iso: string): string {
  const { y, m, d } = parseISO(iso);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

/** Whole days between an ISO date and now, counted on UTC calendar days. */
export function daysSince(iso: string, now: Date = new Date()): number {
  const { y, m, d } = parseISO(iso);
  const then = Date.UTC(y, m - 1, d);
  const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  return Math.floor((today - then) / 86_400_000);
}

/** An ISO timestamp for n days ago. Kept out of components so render stays pure. */
export function isoDaysAgo(days: number): string {
  return new Date(Date.now() - days * 86_400_000).toISOString();
}

/** Display form of a vendor host. Strips protocol and a leading www. */
export function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function pad2(n: number): string {
  return n.toString().padStart(2, "0");
}

export function plural(n: number, one: string, many: string = `${one}s`): string {
  return n === 1 ? one : many;
}

const ONES = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
];
const TENS = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

/** Spells 0 to 99 in words with a space, never a hyphen: "thirty nine". Larger numbers stay as digits. */
export function spellNumber(n: number): string {
  if (!Number.isInteger(n) || n < 0 || n > 99) return formatInt(n);
  if (n < 20) return ONES[n];
  const tens = TENS[Math.floor(n / 10)];
  return n % 10 === 0 ? tens : `${tens} ${ONES[n % 10]}`;
}

export function capitalise(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** Rounded to cents. For VAT arithmetic. */
export function roundCents(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

/**
 * The first n sentences of a paragraph. A sentence ends at ., ! or ? followed by
 * a space, so a decimal such as 4.17 or a price such as R21.49 never splits one.
 */
export function firstSentences(text: string, n: number): string {
  const parts = text.split(/(?<=[.!?])\s+/);
  return parts.slice(0, n).join(" ").trim();
}
