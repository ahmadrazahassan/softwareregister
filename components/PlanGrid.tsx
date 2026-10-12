import Link from "next/link";
import { planPrice } from "@/lib/pricing";
import type { PricedSoftware } from "@/lib/types";

/** The most plans a listing card shows. A product with more sends the reader to its page. */
const MAX_PLANS = 6;

/**
 * Every plan a vendor lists, as a tile: the plan name, the price in rand with
 * what it is per and whether VAT is in it, and the line the vendor gives for
 * what the plan adds. A free plan reads Free. A plan the vendor prices in a
 * sales call is not a tile: it is one line under the tiles, in the vendor's
 * own words. This is the row a buyer reads to see what the paid plans cost
 * without opening the product page.
 */
export function PlanGrid({ s }: { s: PricedSoftware }) {
  const priced = s.pricing_plans.filter((p) => p.price !== null);
  const unpriced = s.pricing_plans.filter((p) => p.price === null);

  // A product that gives its price on request has nothing to tabulate, unless its plans have names worth showing.
  const named = unpriced.filter((p) => p.name !== "On request");
  const tiles = priced.length > 0 ? priced : named;
  if (tiles.length === 0) return null;

  const shown = tiles.slice(0, MAX_PLANS);
  const more = tiles.length - shown.length;
  const notes = priced.length > 0 ? unpriced.map((p) => p.adds).filter((t): t is string => Boolean(t)) : [];

  return (
    <div className="mt-5">
      <h4 className="stamp text-muted">Plans and pricing</h4>
      <ul className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3">
        {shown.map((plan) => {
          const price = planPrice(s, plan);
          return (
            <li key={plan.name} className="flex flex-col rounded-[12px] border border-line-firm bg-paper p-3.5">
              <p className="text-[13px] leading-5 font-semibold">{plan.name}</p>
              <p className={`mt-1 font-heading text-[22px] leading-7 font-bold tracking-[-0.02em] ${price.kind === "quoted" ? "text-muted" : ""}`}>{price.amount}</p>
              <p className="min-h-4 text-[12px] leading-4 text-muted">{price.kind === "free" ? "Free to start" : price.basis}</p>
              {plan.adds && <p className="mt-2 line-clamp-3 text-[12px] leading-4 text-muted">{plan.adds}</p>}
            </li>
          );
        })}
      </ul>
      {notes.map((t) => (
        <p key={t} className="mt-3 text-[13px] leading-5 text-muted">
          {t}
        </p>
      ))}
      {more > 0 && (
        <p className="mt-3 text-[13px] leading-5">
          <Link href={`/register/${s.slug}#pricing`} className="prose-link">
            See all {tiles.length} plans for {s.name}
          </Link>
        </p>
      )}
    </div>
  );
}
