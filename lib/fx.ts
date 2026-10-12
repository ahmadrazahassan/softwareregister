import type { Currency } from "./types";

/**
 * Prices on the register are shown in rand. Where a vendor lists in dollars,
 * pounds or euros, the price is converted at the European Central Bank's
 * reference rate. The rate and its date are printed under every price list, so
 * a converted figure can be checked against its source.
 */
export type ForeignCurrency = Exclude<Currency, "ZAR">;

export interface FxRates {
  /** The date the rates were published. */
  asOf: string;
  source: string;
  /** True when fetched just now, false when it is the saved snapshot. */
  live: boolean;
  /** How much of each currency one rand buys. */
  perRand: Record<ForeignCurrency, number>;
}

export interface FxInfo {
  currency: ForeignCurrency;
  /** Rand per one unit of the foreign currency. */
  rand_per_unit: number;
  as_of: string;
}

export const CURRENCY_SINGULAR: Record<Currency, string> = {
  ZAR: "rand",
  USD: "US dollar",
  GBP: "pound",
  EUR: "euro",
};

export function fxFor(currency: Currency | null, rates: FxRates): FxInfo | null {
  if (!currency || currency === "ZAR") return null;
  return { currency, rand_per_unit: 1 / rates.perRand[currency], as_of: rates.asOf };
}

/** "R16.73 per US dollar". */
export function rateText(fx: FxInfo): string {
  return `R${fx.rand_per_unit.toFixed(2)} per ${CURRENCY_SINGULAR[fx.currency]}`;
}
