import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { firstSentences, priceLabel } from "@/lib/format";
import type { ComparisonSummary } from "@/lib/registry";
import type { PricedSoftware } from "@/lib/types";
import { LogoBadge } from "./LogoBadge";

function priceLine(s: PricedSoftware): string {
  const p = priceLabel(s);
  return p.kind === "quoted" ? "Price on request" : p.kind === "free" ? "Free to start" : `From ${p.amount} ${p.basis}`.trim();
}

/**
 * A head to head as a card: both logos overlapped, the two names with what each
 * starts at in rand, one sentence from the register, and a link. The whole card
 * is the link.
 */
export function VersusCard({ slug, a, b, summary, category }: { slug: string; a: PricedSoftware; b: PricedSoftware; summary: ComparisonSummary; category?: string }) {
  return (
    <article className="group relative flex h-full flex-col rounded-[22px] border border-line-firm bg-surface p-6 transition-colors hover:border-ink">
      <div className="flex items-center justify-between gap-3">
        <span className="flex -space-x-3">
          <LogoBadge slug={a.slug} name={a.name} size={52} className="ring-4 ring-surface" />
          <LogoBadge slug={b.slug} name={b.name} size={52} className="ring-4 ring-surface" />
        </span>
        {category && <span className="stamp text-muted">{category}</span>}
      </div>

      <h3 className="mt-5 font-heading text-[22px] leading-7 font-bold tracking-[-0.02em]">
        <Link href={`/versus/${slug}`} aria-label={`Read the comparison of ${a.name} and ${b.name}`} className="after:absolute after:inset-0">
          {a.name} <span className="font-normal text-muted">vs</span> {b.name}
        </Link>
      </h3>

      <dl className="mt-4 grid grid-cols-2 gap-4 border-y border-line py-4">
        {[a, b].map((s) => (
          <div key={s.slug} className="min-w-0">
            <dt className="truncate text-[12px] leading-4 text-muted">{s.name}</dt>
            <dd className="m-0 mt-1 text-[14px] leading-5 font-semibold">{priceLine(s)}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-4 line-clamp-3 text-[14px] leading-6 text-muted">{firstSentences(summary.paragraphs[0], 1)}</p>
      <span className="mt-auto inline-flex items-center gap-1 pt-5 text-[14px] leading-5 font-semibold text-lime-text group-hover:underline group-hover:underline-offset-4">
        Read the comparison
        <ChevronRight size={16} strokeWidth={1.5} aria-hidden="true" />
      </span>
    </article>
  );
}
