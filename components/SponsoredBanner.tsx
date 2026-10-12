import { creativeFor, type AdSlot } from "@/lib/ads";
import { AffiliateCTAButton } from "./AffiliateCTAButton";

/**
 * A paid placement. The "Sponsored" label stays visible above the unit, because
 * a paid placement must be identified to a reader, and the ASA and the FTC both
 * require it. No gradient, no overlay, no shadow.
 */
export function SponsoredBanner({ slot }: { slot: AdSlot }) {
  const ad = creativeFor(slot);
  if (!ad) return null;

  return (
    <aside aria-label="Sponsored">
      <p className="stamp mb-2 text-muted">Sponsored</p>
      <div className="flex flex-col gap-4 border border-line-firm bg-surface p-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-[560px]">
          <p className="stamp mb-1 text-muted">{ad.advertiser}</p>
          <p className="font-heading text-[20px] leading-7 font-bold tracking-[-0.01em]">{ad.headline}</p>
          <p className="mt-1 text-[14px] leading-5 text-muted">{ad.body}</p>
        </div>
        <AffiliateCTAButton slug={ad.id} href={ad.href} affiliate placement={`sponsored-${slot}`} variant="quiet" className="flex-none">
          {ad.cta}
        </AffiliateCTAButton>
      </div>
    </aside>
  );
}
