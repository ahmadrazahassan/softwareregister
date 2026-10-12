import { Check, Info, Pencil } from "lucide-react";
import Link from "next/link";
import { AFFILIATE_DISCLOSURE_SHORT, outboundLink } from "@/lib/affiliates";
import { saAvailability, SA_STATUS_LABEL } from "@/lib/data/availability";
import { priceLabel } from "@/lib/format";
import { sarsStatus } from "@/lib/registry";
import type { PricedSoftware, Review } from "@/lib/types";
import { AffiliateCTAButton } from "./AffiliateCTAButton";
import { ctaClass } from "./CtaButton";
import { LogoBadge } from "./LogoBadge";
import { PlanGrid } from "./PlanGrid";
import { CheckedStamp } from "./primitives";
import { SaFlag } from "./SaFlag";
import { ShortlistButton } from "./ShortlistButton";

/** A small confirmed fact: a tick and a label. Only facts that were checked and are true get one. */
function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-line-firm bg-paper px-3 py-1 text-[13px] leading-5 font-medium">
      <Check size={14} strokeWidth={2} aria-hidden="true" className="text-lime-text" />
      {children}
    </span>
  );
}

interface Props {
  s: PricedSoftware;
  /** Where outbound clicks are counted from. */
  placement?: string;
  /** The latest approved reader review of this product, if there is one. */
  review?: Review;
}

/**
 * One product, as a directory listing, in two parts.
 *
 * The head holds the logo in a circle, the name over "Software by" the vendor,
 * a Sold in South Africa tag with the flag, a Write a review button, and the
 * actions: Visit website, View details, and a third that depends on the record.
 * A product that quotes on request offers the guide to asking for a quote. A
 * product confirmed to offer a demo offers a demo request. Neither is shown on a
 * guess.
 *
 * The body holds the product description, the South Africa note (under the flag
 * when the product is sold here, under an info mark when it is not),
 * the starting price in rand, the first features the vendor lists, a chip for
 * each fact the vendor's page states, and the latest reader review when there
 * is one. A fact the vendor does not state is left out, never marked as missing.
 */
export function SoftwareCard({ s, placement = "card", review }: Props) {
  const price = priceLabel(s);
  const sars = sarsStatus(s);
  const sa = saAvailability(s.slug);
  const link = outboundLink(s);

  return (
    <article className="rounded-[16px] border border-line-firm bg-surface transition-colors hover:border-ink">
      <div className="flex flex-col gap-5 p-5 md:flex-row md:items-start md:gap-6 md:p-6">
        <LogoBadge slug={s.slug} name={s.name} size={80} />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
            <div className="min-w-0">
              <h3 className="font-heading text-[22px] leading-7 font-bold tracking-[-0.01em]">
                <Link href={`/register/${s.slug}`} className="hover:underline hover:underline-offset-4">
                  {s.name}
                </Link>
              </h3>
              <p className="text-[14px] leading-5 text-muted">{s.vendor === s.name ? (s.founded ? `Founded ${s.founded}` : "") : `Software by ${s.vendor}`}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {sa.status === "local" && (
                <span className="inline-flex items-center gap-2 rounded-full border border-lime-deep/30 bg-lime-wash px-3 py-1 text-[13px] leading-5 font-semibold">
                  <SaFlag height={14} />
                  {SA_STATUS_LABEL.local}
                </span>
              )}
              <Link
                href={`/register/${s.slug}/reviews/new`}
                className="inline-flex items-center gap-1.5 rounded-[10px] border border-line-firm bg-surface px-3 py-1.5 text-[13px] leading-5 font-semibold hover:bg-lime-wash"
              >
                <Pencil size={14} strokeWidth={1.75} aria-hidden="true" />
                Write a review
                <span className="sr-only"> of {s.name}</span>
              </Link>
              <ShortlistButton slug={s.slug} name={s.name} compact />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            {link ? (
              <>
                <AffiliateCTAButton slug={s.slug} href={link.href} affiliate={link.affiliate} placement={placement} variant="primary">
                  Visit website
                </AffiliateCTAButton>
                <Link href={`/register/${s.slug}`} className={ctaClass("blue")}>
                  View details
                </Link>
                {s.demo === true && (
                  <AffiliateCTAButton slug={s.slug} href={link.href} affiliate={link.affiliate} placement={`${placement}-demo`} variant="quiet">
                    Request a demo
                  </AffiliateCTAButton>
                )}
              </>
            ) : (
              <Link href={`/register/${s.slug}`} className={ctaClass("primary")}>
                View details
              </Link>
            )}
            {price.kind === "quoted" && (
              <Link href="/briefings/how-to-ask-for-a-quote" className="text-[14px] leading-5 font-semibold text-lime-text underline underline-offset-4 hover:text-ink">
                How to get a quote
              </Link>
            )}
          </div>
          {link?.affiliate && <p className="mt-2 text-[12px] leading-4 text-muted">{AFFILIATE_DISCLOSURE_SHORT}</p>}
        </div>
      </div>

      <div className="border-t border-line px-5 py-5 md:px-6">
        <h4 className="stamp text-muted">Product description</h4>
        <p className="mt-2 max-w-[78ch] text-[15px] leading-6">
          {s.summary}{" "}
          <Link href={`/register/${s.slug}`} className="prose-link">
            Learn more about {s.name}
          </Link>
          {" "}or{" "}
          <Link href={`/register/${s.slug}/reviews`} className="prose-link">
            read the full review
          </Link>
        </p>
        <p className="mt-3 flex max-w-[78ch] items-start gap-2.5 text-[13px] leading-5 text-muted">
          {sa.status === "local" ? (
            <SaFlag height={16} className="mt-0.5" />
          ) : (
            <Info size={16} strokeWidth={1.5} aria-hidden="true" className="mt-0.5 flex-none" />
          )}
          <span className="line-clamp-2">{sa.note}</span>
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
          <p className="flex flex-wrap items-center gap-2 text-[14px] leading-5">
            <span className="text-muted">{price.kind === "free" ? "Starts at:" : "Starting price:"}</span>
            <span
              className={`rounded-full px-3 py-1 text-[14px] leading-5 font-bold ${price.kind === "quoted" ? "bg-paper text-muted" : "bg-lime-wash text-ink"}`}
            >
              {price.kind === "quoted" ? "Price on request" : `${price.amount} ${price.basis}`.trim()}
            </span>
          </p>
          {s.price_checked_at && price.kind !== "quoted" && (
            <span className="ml-auto inline-flex items-center gap-2">
              <span className="stamp text-muted">Price checked</span>
              <CheckedStamp date={s.price_checked_at} />
            </span>
          )}
        </div>

        <PlanGrid s={s} />

        {s.features.length > 0 && (
          <p className="mt-5 max-w-[78ch] text-[14px] leading-5">
            <span className="text-muted">Features: </span>
            {s.features.slice(0, 4).join(", ")}
            {s.features.length > 4 ? ` and ${s.features.length - 4} more` : ""}.
          </p>
        )}

        <ul className="mt-4 flex flex-wrap items-center gap-2">
          {s.free_trial === true && (
            <li>
              <Chip>Free trial</Chip>
            </li>
          )}
          {s.free_plan === true && (
            <li>
              <Chip>Free plan</Chip>
            </li>
          )}
          {s.demo === true && (
            <li>
              <Chip>Demo</Chip>
            </li>
          )}
          {sars === "files" && (
            <li>
              <Chip>Files with SARS</Chip>
            </li>
          )}
          {s.bank_feeds !== null && s.bank_feeds.length > 0 && (
            <li>
              <Chip>Bank feeds</Chip>
            </li>
          )}
        </ul>

        {review && (
          <div className="mt-5 border-t border-line pt-4">
            <p className="stamp text-muted">Recent review</p>
            <p className="mt-1.5 text-[14px] leading-6">
              &ldquo;{review.title}&rdquo; <span className="text-muted">by {review.author_name}</span>
            </p>
          </div>
        )}
      </div>
    </article>
  );
}
