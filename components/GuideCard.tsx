import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { guideHero } from "@/lib/data/guide-heroes";
import { formatDateStamp } from "@/lib/format";
import { fillTokens, type Registry } from "@/lib/registry";
import type { Briefing } from "@/lib/types";
import { BlogHero } from "./BlogHero";

/** A guide as a card, the same shape as a blog post: its picture, topic, date and reading time, the title and two lines of the standfirst. The whole card is the link. */
export function GuideCard({ b, tokens, reg }: { b: Briefing; tokens: Record<string, string>; reg: Registry }) {
  return (
    <article className="group relative flex h-full flex-col">
      <BlogHero hero={guideHero(b.slug, b.topic)} reg={reg} compact />
      <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="rounded-full border border-line-firm px-2.5 py-1 text-[12px] leading-4 font-semibold">{b.topic === "Buying" ? "Buying guide" : b.topic}</span>
        <span className="stamp text-muted">{formatDateStamp(b.published_at)}</span>
        <span className="stamp text-muted">{b.read_minutes} min read</span>
      </div>
      <h3 className="mt-3 font-heading text-[22px] leading-7 font-bold tracking-[-0.02em]">
        <Link href={`/briefings/${b.slug}`} className="after:absolute after:inset-0 group-hover:underline group-hover:underline-offset-4">
          {b.title}
        </Link>
      </h3>
      <p className="mt-2 line-clamp-2 text-[14px] leading-6 text-muted">{fillTokens(b.standfirst, tokens)}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-[14px] leading-5 font-semibold text-lime-text">
        Read the guide
        <ChevronRight size={16} strokeWidth={1.5} aria-hidden="true" />
      </span>
    </article>
  );
}
