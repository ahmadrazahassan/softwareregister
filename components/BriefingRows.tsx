import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { formatDateStamp, pad2 } from "@/lib/format";
import { fillTokens } from "@/lib/registry";
import type { Briefing } from "@/lib/types";

/**
 * A numbered list, not cards. A two digit numeral, the title, and on a second
 * line the read time and the topic. 1px rules between rows.
 */
export function BriefingRows({
  items,
  tokens,
  full = false,
  start = 1,
}: {
  items: Briefing[];
  tokens: Record<string, string>;
  /** The /briefings version adds the standfirst and the date. */
  full?: boolean;
  start?: number;
}) {
  return (
    <ol className="border-t border-line-firm">
      {items.map((b, i) => (
        <li key={b.slug} className="border-b border-line">
          <Link href={`/briefings/${b.slug}`} className="flex items-start gap-4 py-4 hover:bg-lime-wash md:gap-6">
            <span className="w-8 flex-none pt-0.5 pl-1 text-[15px] leading-6 text-muted">{pad2(start + i)}</span>
            <span className="min-w-0 flex-1">
              <span className={`block font-semibold ${full ? "text-[18px] leading-6" : "text-[16px] leading-6"}`}>{b.title}</span>
              {full && <span className="mt-1 block max-w-[640px] text-[14px] leading-5 text-muted">{fillTokens(b.standfirst, tokens)}</span>}
              <span className="stamp mt-1 block text-muted">
                {b.read_minutes} MIN READ · {b.topic}
                {full ? ` · ${formatDateStamp(b.published_at)}` : ""}
              </span>
            </span>
            <ChevronRight size={16} strokeWidth={1.5} aria-hidden="true" className="mt-1 mr-1 flex-none text-muted" />
          </Link>
        </li>
      ))}
    </ol>
  );
}
