import Link from "next/link";
import { outboundLink } from "@/lib/affiliates";
import { saAvailability, SA_STATUS_LABEL } from "@/lib/data/availability";
import { priceLabel } from "@/lib/format";
import type { PricedSoftware } from "@/lib/types";
import { AffiliateCTAButton } from "./AffiliateCTAButton";
import { ctaClass } from "./CtaButton";
import { LogoBadge } from "./LogoBadge";
import { SaFlag } from "./SaFlag";

/**
 * A featured product, in the compact form a directory uses for a row of five:
 * the logo in a circle, the name, the price in rand with its basis, and one
 * full width action.
 */
export function FeaturedCard({ s, placement = "home-featured" }: { s: PricedSoftware; placement?: string }) {
  const price = priceLabel(s);
  const link = outboundLink(s);
  const local = saAvailability(s.slug).status === "local";

  return (
    <article className="relative flex h-full flex-col items-center rounded-[16px] border border-line-firm bg-surface px-4 pt-6 pb-5 text-center transition-colors hover:border-ink">
      {local && (
        <span
          title={SA_STATUS_LABEL.local}
          className="absolute top-3 right-3 inline-flex items-center rounded-[8px] border border-line bg-surface p-1.5"
        >
          <SaFlag height={14} className="border-0" />
          <span className="sr-only">{SA_STATUS_LABEL.local}</span>
        </span>
      )}
      <LogoBadge slug={s.slug} name={s.name} size={88} />
      <h3 className="mt-4 font-heading text-[18px] leading-6 font-bold tracking-[-0.01em]">
        <Link href={`/register/${s.slug}`} className="hover:underline hover:underline-offset-4">
          {s.name}
        </Link>
      </h3>
      <p className="mt-0.5 text-[12px] leading-4 text-muted">{s.vendor}</p>

      <p className="mt-4 text-[15px] leading-6">
        <span className={`font-semibold ${price.kind === "quoted" ? "text-muted" : ""}`}>{price.amount}</span>
        {price.basis && <span className="ml-1 text-[13px] text-muted">{price.basis}</span>}
        {price.kind === "free" && <span className="ml-1 text-[13px] text-muted">to start</span>}
      </p>

      <div className="mt-auto w-full pt-4">
        {link ? (
          <AffiliateCTAButton slug={s.slug} href={link.href} affiliate={link.affiliate} placement={placement} variant="primary" className="w-full">
            Visit website
          </AffiliateCTAButton>
        ) : (
          <Link href={`/register/${s.slug}`} className={ctaClass("blue", "w-full")}>
            View details
          </Link>
        )}
      </div>
    </article>
  );
}
