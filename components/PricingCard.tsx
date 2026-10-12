import { Check, X } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { saAvailability, SA_STATUS_LABEL } from "@/lib/data/availability";
import { formatDateLong } from "@/lib/format";
import { planPrice, priceFacts, type Fact } from "@/lib/pricing";
import { vatRows } from "@/lib/registry";
import { VAT_PERCENT } from "@/lib/site";
import type { PricingPlan, PricedSoftware } from "@/lib/types";
import { ProductActions } from "./ProductActions";
import { ProductLogo } from "./ProductLogo";
import { SaFlag } from "./SaFlag";

function FactRow({ fact }: { fact: Fact }) {
  return (
    <li className="flex items-center justify-between gap-3 border-b border-line py-2.5 text-[14px] leading-5 last:border-b-0">
      <span className="flex items-center gap-2">
        {fact.state === "yes" ? (
          <Check size={18} strokeWidth={1.5} aria-hidden="true" className="flex-none text-lime-text" />
        ) : (
          <X size={18} strokeWidth={1.5} aria-hidden="true" className="flex-none text-muted" />
        )}
        {fact.label}
      </span>
      <span className={fact.state === "yes" ? "font-semibold" : "text-muted"}>{fact.detail}</span>
    </li>
  );
}

interface PricingCardProps {
  s: PricedSoftware;
  /** A plan to price the card from. Without one, the card uses the product's starting price. */
  plan?: PricingPlan;
  /** A small label top right, such as the plan name. */
  tag?: string;
  /** The first plan on a row is washed lime. */
  highlight?: boolean;
  /** Replaces the default buttons. Without it the card carries Visit and View details. */
  cta?: ReactNode;
  /** Where a click on the outbound button is counted from. */
  placement?: string;
  /** What the second button does. On the record itself it points at alternatives, since the reader is already on the details. */
  second?: "details" | "alternatives" | "none";
  logoHeight?: number;
}

/**
 * A pricing card: the logo set large and bare, the price in rand as the biggest
 * number on the card, what it is per, and the plain facts the vendor's page
 * states about it. A fact the page does not state is not listed.
 */
export function PricingCard({ s, plan, tag, highlight = false, cta, placement = "pricing-card", second = "details", logoHeight = 56 }: PricingCardProps) {
  const p = plan ?? { name: "Starting plan", price: s.starting_price, currency: s.price_currency, basis: s.price_basis, adds: null };
  const price = planPrice(s, p);
  const vat = vatRows([{ ...s, starting_price: p.price, price_currency: p.currency, price_basis: p.basis }])[0];
  const sa = saAvailability(s.slug);
  const facts = priceFacts(s);

  return (
    <article className={`flex h-full flex-col overflow-hidden rounded-[16px] border bg-surface ${highlight ? "border-lime-deep" : "border-line-firm"}`}>
      <div className={`flex min-h-[116px] items-start justify-between gap-4 px-6 pt-6 pb-5 ${highlight ? "bg-lime-wash" : ""}`}>
        <ProductLogo slug={s.slug} name={s.name} height={logoHeight} decorative />
        {tag && (
          <span className={`stamp flex-none rounded-[6px] px-2 py-1 ${highlight ? "bg-lime text-lime-ink" : "border border-line-firm text-muted"}`}>{tag}</span>
        )}
      </div>

      <div className="flex flex-1 flex-col px-6 pt-5 pb-6">
        <h3 className="font-heading text-[22px] leading-7 font-bold tracking-[-0.01em]">
          <Link href={`/register/${s.slug}`} className="hover:underline hover:underline-offset-4">
            {s.name}
          </Link>
        </h3>
        <p className="text-[13px] leading-5 text-muted">{s.vendor}</p>
        {sa.status === "local" && !plan && (
          <p className="stamp mt-2 inline-flex items-center gap-2 text-lime-text">
            <SaFlag height={13} />
            {SA_STATUS_LABEL.local}
          </p>
        )}

        <div className="mt-6">
          <p className="stamp text-muted">{price.kind === "free" || price.kind === "quoted" ? "Price" : "From"}</p>
          <p className={`font-heading text-[56px] leading-[56px] font-bold tracking-[-0.03em] ${price.kind === "quoted" ? "text-muted" : ""}`}>{price.amount}</p>
          <p className="mt-1 min-h-5 text-[14px] leading-5 text-muted">{price.basis || (price.kind === "free" ? "Free to start" : "Price on request")}</p>
          {vat && (
            <p className="mt-1 text-[13px] leading-5 text-muted">
              {vat.including} including VAT · {vat.excluding} excluding VAT
            </p>
          )}
        </div>

        {p.adds && <p className="mt-4 text-[14px] leading-5">{p.adds}</p>}

        {facts.length > 0 && (
          <ul className="mt-6 border-t border-line">
            {facts.map((f) => (
              <FactRow key={f.label} fact={f} />
            ))}
          </ul>
        )}

        <div className="mt-auto flex flex-col gap-4 pt-6">{cta ?? <ProductActions s={s} placement={placement} second={second} />}</div>
      </div>
    </article>
  );
}

const CARD = "flex h-full flex-col rounded-[16px] border border-line-firm bg-surface p-6";

/** The second card on a pricing row. It changes with what is true of the product. */
export function PriceContextCard({ s }: { s: PricedSoftware }) {
  const vat = vatRows([s])[0];
  const quoted = s.starting_price === null;
  const free = s.starting_price === 0;

  if (vat) {
    return (
      <aside className={CARD} aria-label="Both VAT footings">
        <p className="stamp text-muted">Both VAT footings</p>
        <dl className="mt-4 space-y-4">
          <div>
            <dt className="text-[13px] leading-5 text-muted">Including VAT</dt>
            <dd className="m-0 font-heading text-[40px] leading-[44px] font-bold tracking-[-0.03em]">{vat.including}</dd>
          </div>
          <div>
            <dt className="text-[13px] leading-5 text-muted">Excluding VAT</dt>
            <dd className="m-0 font-heading text-[40px] leading-[44px] font-bold tracking-[-0.03em]">{vat.excluding}</dd>
          </div>
        </dl>
        <p className="mt-4 text-[14px] leading-5 text-muted">
          Computed at {VAT_PERCENT} percent. A VAT registered business claims the VAT back, so the excluding figure is its real cost.
        </p>
        <Link href="/briefings/including-and-excluding-vat" className="prose-link mt-auto pt-6 text-[14px]">
          Read about VAT in a software price
        </Link>
      </aside>
    );
  }

  if (quoted) {
    return (
      <aside className={CARD} aria-label="How to ask for a quote">
        <p className="stamp text-muted">Price on request</p>
        <p className="mt-4 font-heading text-[24px] leading-7 font-bold tracking-[-0.02em]">{s.name} gives its price on request. Ask for these in writing.</p>
        <ul className="mt-4 space-y-2 text-[14px] leading-5">
          {["The price per month, with the VAT basis stated", "What is charged once only", "Which SARS returns it files for you", "Implementation and support costs"].map((t) => (
            <li key={t} className="flex gap-2">
              <Check size={18} strokeWidth={1.5} aria-hidden="true" className="mt-px flex-none text-lime-text" />
              {t}
            </li>
          ))}
        </ul>
        <Link href="/briefings/how-to-ask-for-a-quote" className="prose-link mt-auto pt-6 text-[14px]">
          How to ask for a quote
        </Link>
      </aside>
    );
  }

  if (free) {
    return (
      <aside className={CARD} aria-label="The free plan">
        <p className="stamp text-muted">Free plan</p>
        <p className="mt-4 font-heading text-[24px] leading-7 font-bold tracking-[-0.02em]">Start at zero, then see what the paid plans add.</p>
        <p className="mt-4 text-[14px] leading-5 text-muted">A free plan usually limits users, storage or features. The plans beside this card show where each limit lifts.</p>
        <Link href="/briefings/free-tiers-on-the-register" className="prose-link mt-auto pt-6 text-[14px]">
          Read about free plans
        </Link>
      </aside>
    );
  }

  return null;
}

/** The last card: where the number came from, and when. */
export function PriceSourceCard({ s }: { s: PricedSoftware }) {
  if (s.starting_price === null) {
    return (
      <aside className={CARD} aria-label="Where to get this price">
        <p className="stamp text-muted">Where to get this price</p>
        <p className="mt-4 font-heading text-[24px] leading-7 font-bold tracking-[-0.02em]">{s.name} gives its price after you contact it.</p>
        <p className="mt-4 text-[14px] leading-5 text-muted">{s.vendor_website ? `Start at ${s.vendor_website}.` : "Use the vendor's own site."} Ask for the price in writing, with the VAT basis stated.</p>
        {s.pricing_note && <p className="mt-3 text-[14px] leading-5">{s.pricing_note}</p>}
        <Link href="/method" className="prose-link mt-auto pt-6 text-[14px]">
          How prices are read
        </Link>
      </aside>
    );
  }
  return (
    <aside className={CARD} aria-label="Where this price comes from">
      <p className="stamp text-muted">Where this price comes from</p>
      <p className="mt-4 font-heading text-[24px] leading-7 font-bold tracking-[-0.02em]">
        {s.price_checked_at ? `Read${s.vendor_website ? ` from ${s.vendor_website}` : ""} on ${formatDateLong(s.price_checked_at)}.` : "The vendor's own page."}
      </p>
      <p className="mt-4 text-[14px] leading-5 text-muted">The vendor&apos;s own published list price, read from its page on that date.</p>
      {s.pricing_note && <p className="mt-3 text-[14px] leading-5">{s.pricing_note}</p>}
      <Link href="/method" className="prose-link mt-auto pt-6 text-[14px]">
        How prices are read
      </Link>
    </aside>
  );
}
