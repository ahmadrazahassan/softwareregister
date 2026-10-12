import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

/**
 * The Software Register mark: a square cut S built from straight bars, like the
 * rules of a ledger page. Its middle bar is a double rule, the double underline
 * an accountant draws under a grand total. One rule is ink and one is lime. It
 * has no background, so it sits straight on the page. The ink follows the text
 * colour of whatever holds it, which is how it turns white on a dark block. The
 * same shapes, as files, are in scripts/make-brand.mjs.
 */
export function BrandMark({ size = 28, className = "" }: { size?: number | string; className?: string }) {
  return (
    <svg viewBox="0 0 44 44" width={size} height={size} aria-hidden="true" focusable="false" className={`flex-none ${className}`}>
      <g fill="currentColor">
        <rect x="4" y="4" width="36" height="8.5" />
        <rect x="4" y="4" width="8.5" height="22.25" />
        <rect x="4" y="17.75" width="36" height="3.5" />
        <rect x="31.5" y="17.75" width="8.5" height="22.25" />
        <rect x="4" y="31.5" width="36" height="8.5" />
      </g>
      <rect x="12.5" y="22.75" width="19" height="3.5" fill="var(--lime)" />
    </svg>
  );
}

/**
 * The mark and the name, set as one link to the front page. The name is long, so
 * its type scales down on a narrow screen and the mark follows it (the mark is
 * sized in em), which keeps the Menu button on screen at 360 pixels.
 */
export function Logo({ size = 28, className = "", tone = "ink" }: { size?: number; className?: string; tone?: "ink" | "light" }) {
  const max = Math.round(size * 0.82);
  const min = Math.round(size * 0.58);
  return (
    <Link
      href="/"
      aria-label={`${SITE_NAME}, front page`}
      className={`inline-flex items-center gap-[0.4em] whitespace-nowrap ${tone === "light" ? "text-white" : "text-ink"} ${className}`}
      style={{ fontSize: `clamp(${min}px, 4.9vw, ${max}px)` }}
    >
      <BrandMark size="1.3em" />
      <span className="font-heading leading-none font-bold tracking-[-0.03em]">{SITE_NAME}</span>
    </Link>
  );
}
