"use client";

import { useEffect, useState } from "react";
import { AffiliateCTAButton } from "./AffiliateCTAButton";
import { ctaClass } from "./CtaButton";

interface Props {
  slug: string;
  name: string;
  /** "From R170 per user a month" or "Price on request". */
  priceText: string;
  href: string;
  affiliate: boolean;
  /** The label of the main button, such as "Visit Xero" or "Start free trial". */
  label: string;
  /** Id of the element that, once scrolled past, makes the bar appear. */
  afterId: string;
  /** Id of the closing call to action. The bar steps aside when that is on screen. */
  untilId: string;
}

/**
 * A slim bar fixed to the foot of a review once the reader has scrolled past the
 * first buttons. It keeps the product, its starting price and the way to the
 * vendor within reach all the way down the page, and steps aside when the closing
 * call to action is on screen so the two never stack. One lime button, one blue.
 */
export function StickyCta({ slug, name, priceText, href, affiliate, label, afterId, untilId }: Props) {
  const [past, setPast] = useState(false);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const first = document.getElementById(afterId);
    const last = document.getElementById(untilId);
    if (!first) return;
    const a = new IntersectionObserver(([entry]) => setPast(!entry.isIntersecting && entry.boundingClientRect.top < 0), { threshold: 0 });
    a.observe(first);
    const b = last ? new IntersectionObserver(([entry]) => setAtEnd(entry.isIntersecting), { threshold: 0 }) : null;
    if (last && b) b.observe(last);
    return () => {
      a.disconnect();
      b?.disconnect();
    };
  }, [afterId, untilId]);

  const show = past && !atEnd;
  return (
    <div
      inert={!show}
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-line-firm bg-surface transition-transform duration-200 print:hidden ${show ? "translate-y-0" : "pointer-events-none translate-y-full"}`}
    >
      <div className="mx-auto flex w-full max-w-[1120px] items-center justify-between gap-4 px-6 py-3">
        <div className="min-w-0">
          <p className="truncate font-heading text-[16px] leading-5 font-bold tracking-[-0.01em]">{name}</p>
          <p className="truncate text-[13px] leading-4 text-muted">{priceText}</p>
        </div>
        <div className="flex flex-none items-center gap-2">
          <div className="hidden sm:block">
            <a href="#plans" className={ctaClass("blue")}>
              See the plans
            </a>
          </div>
          <AffiliateCTAButton slug={slug} href={href} affiliate={affiliate} placement="review-sticky" variant="primary">
            {label}
          </AffiliateCTAButton>
        </div>
      </div>
    </div>
  );
}
