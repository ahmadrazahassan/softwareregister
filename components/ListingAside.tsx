import Link from "next/link";
import { ctaClass } from "./CtaButton";
import { SaFlag } from "./SaFlag";

/**
 * The column beside a product list: how the list is made, and the two things a
 * reader can do next. Every line is true of how the register is built.
 */
export function ListingAside() {
  return (
    <aside aria-label="About this list" className="space-y-5 lg:sticky lg:top-28 lg:self-start">
      <div className="rounded-[16px] border border-line-firm bg-surface p-6">
        <p className="stamp flex items-center gap-2 text-muted">
          <SaFlag height={14} />
          Made for South African buyers
        </p>
        <h2 className="mt-3 font-heading text-[20px] leading-6 font-bold tracking-[-0.01em]">How this list is made</h2>
        <ul className="mt-4 space-y-3 text-[14px] leading-5">
          {[
            "Every price is read from the vendor's own page and carries the date it was read.",
            "All prices are shown in rand, with VAT stated where the vendor states it.",
            "Products are listed A to Z. There is no ranking, and no vendor can pay to move up.",
            "SARS filing and bank feeds appear only where the vendor's page lists them.",
          ].map((line) => (
            <li key={line} className="flex gap-3">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-lime-deep" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
        <Link href="/method" className="prose-link mt-5 inline-block text-[14px]">
          How the register works
        </Link>
      </div>

      <div className="rounded-[16px] border border-line-firm bg-surface p-6">
        <h2 className="font-heading text-[20px] leading-6 font-bold tracking-[-0.01em]">Used one of these?</h2>
        <p className="mt-2 text-[14px] leading-5 text-muted">Tell other buyers what it did well and where it fell short. An editor reads every review first.</p>
        <Link href="/write-a-review" className={ctaClass("primary", "mt-4 w-full")}>
          Write a review
        </Link>
        <Link href="/versus" className={ctaClass("quiet", "mt-3 w-full")}>
          Compare two products
        </Link>
      </div>
    </aside>
  );
}
