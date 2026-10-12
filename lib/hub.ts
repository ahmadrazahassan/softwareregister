import type { HubItem } from "@/components/CompareHub";
import { saAvailability } from "./data/availability";
import { priceLabel } from "./format";
import type { PricedSoftware } from "./types";

/** The compare tool's picker rows: each product with its starting price in rand, already formatted. */
export function toHubItems(items: PricedSoftware[]): HubItem[] {
  return items.map((s) => {
    const p = priceLabel(s);
    return {
      slug: s.slug,
      name: s.name,
      vendor: s.vendor,
      sector: s.sector,
      price: p.kind === "quoted" ? "Price on request" : p.kind === "free" ? "Free to start" : `From ${p.amount} ${p.basis}`.trim(),
      local: saAvailability(s.slug).status === "local",
    };
  });
}
