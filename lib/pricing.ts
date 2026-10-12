import { formatDateStamp, priceLabel, type PriceLabel } from "./format";
import { sarsStatus } from "./registry";
import type { PricingPlan, PricedSoftware } from "./types";

/**
 * What a pricing card says about a product, drawn only from its own record.
 * A row appears only when the vendor's page states the fact, so a card never
 * claims more than the register holds and never lists a gap. Pure functions,
 * no framework imports.
 */

export type FactState = "yes" | "no";

export interface Fact {
  label: string;
  state: FactState;
  detail: string;
}

const known = (label: string, v: boolean | null): Fact[] => (v === null ? [] : [{ label, state: v ? "yes" : "no", detail: v ? "Yes" : "No" }]);

/** The rows under the price on a card. */
export function priceFacts(s: PricedSoftware): Fact[] {
  const priced = (s.starting_price ?? 0) > 0;
  const rows: Fact[] = [];

  if (s.price_checked_at && s.starting_price !== null) rows.push({ label: "Price read on", state: "yes", detail: formatDateStamp(s.price_checked_at) });

  if (priced && s.price_basis === "mo_incl_vat") rows.push({ label: "VAT", state: "yes", detail: "Included" });
  else if (priced && s.price_basis === "mo_excl_vat") rows.push({ label: "VAT", state: "yes", detail: "Excluded" });

  rows.push(...known("Free plan", s.free_plan), ...known("Free trial", s.free_trial));

  const sars = sarsStatus(s);
  if (sars === "files") rows.push({ label: "Files with SARS", state: "yes", detail: "Yes" });
  return rows;
}

/** A plan priced for display: in rand, converted at the product's rate when the plan is listed in the same foreign currency. */
export function planPrice(s: Pick<PricedSoftware, "fx">, plan: Pick<PricingPlan, "price" | "currency" | "basis">): PriceLabel {
  const fx = s.fx && s.fx.currency === plan.currency ? s.fx : null;
  return priceLabel({
    starting_price: plan.price,
    price_currency: plan.currency,
    price_basis: plan.basis,
    price_rand: plan.price === null ? null : fx ? plan.price * fx.rand_per_unit : plan.price,
    fx,
  });
}
