import { formatDateStamp } from "@/lib/format";
import type { FxRates } from "@/lib/fx";

/**
 * One line under a price list. Every price is in rand, and where a vendor lists
 * in another currency the line names the rate and its date, so a converted price
 * can be checked against its source.
 */
export function FxNote({ rates, className = "" }: { rates: FxRates; className?: string }) {
  const r = (k: "USD" | "GBP" | "EUR") => `R${(1 / rates.perRand[k]).toFixed(2)}`;
  return (
    <p className={`text-[13px] leading-5 text-muted ${className}`}>
      All prices are in rand. Where a vendor lists in dollars, pounds or euros we convert at {r("USD")} per US dollar, {r("GBP")} per pound and {r("EUR")} per euro ({rates.source}, {formatDateStamp(rates.asOf)}
      {rates.live ? "" : ", the last rates saved on the site"}).
    </p>
  );
}
