import Link from "next/link";
import { outboundLink, AFFILIATE_DISCLOSURE_SHORT } from "@/lib/affiliates";
import type { Software } from "@/lib/types";
import { AffiliateCTAButton } from "./AffiliateCTAButton";
import { ctaClass } from "./CtaButton";

interface Props {
  s: Pick<Software, "slug" | "name" | "vendor" | "affiliate_url" | "website_url">;
  /** Where the click is counted from, for example "card" or "record-pricing". */
  placement: string;
  /**
   * What the second button does.
   *   details       goes to the register record (the default)
   *   alternatives  goes to the alternatives page, for use on the record itself
   *   none          shows the outbound button alone
   */
  second?: "details" | "alternatives" | "none";
  /** Short label for the outbound button, for a narrow card. Defaults to the product name. */
  outboundLabel?: string;
  className?: string;
}

/**
 * The two actions every product surface carries: go to the vendor, and go to
 * the record. The outbound button is the lime primary and comes first. It is a
 * plain link, so it works with scripts off, and it carries the affiliate
 * disclosure whenever the link earns a commission. A product with no vendor
 * site recorded shows the record button as the primary instead, so a card
 * never has a dead end.
 *
 * The two sit side by side when the slot is wide enough and stack when it is
 * not. That is decided by the width of the slot, not the screen.
 */
export function ProductActions({ s, placement, second = "details", outboundLabel, className = "" }: Props) {
  const link = outboundLink(s);
  const secondHref = second === "alternatives" ? `/register/${s.slug}/alternatives` : `/register/${s.slug}`;
  const secondLabel = second === "alternatives" ? "See alternatives" : "View details";

  return (
    <div className={`@container ${className}`}>
      <div className={`grid gap-3 ${link && second !== "none" ? "@[300px]:grid-cols-2" : ""}`}>
        {link ? (
          <>
            <AffiliateCTAButton slug={s.slug} href={link.href} affiliate={link.affiliate} placement={placement} variant="primary" className="w-full">
              {outboundLabel ?? `Visit ${s.name}`}
            </AffiliateCTAButton>
            {second !== "none" && (
              <Link href={secondHref} className={ctaClass("blue", "w-full")}>
                {secondLabel}
              </Link>
            )}
          </>
        ) : (
          <Link href={secondHref} className={ctaClass("primary", "w-full")}>
            {secondLabel}
          </Link>
        )}
      </div>
      {link?.affiliate && <p className="mt-2 text-[12px] leading-4 text-muted">{AFFILIATE_DISCLOSURE_SHORT}</p>}
    </div>
  );
}
