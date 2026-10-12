"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";
import Link from "next/link";
import { SHORTLIST_MAX, useShortlist, writeShortlist } from "@/lib/shortlist";

/**
 * Adds a product to the reader's shortlist, kept in their own browser. The button
 * says what it will do and what it has done, and a full shortlist says so.
 */
export function ShortlistButton({ slug, name, compact = false }: { slug: string; name: string; compact?: boolean }) {
  const saved = useShortlist();
  const on = saved.includes(slug);
  const full = !on && saved.length >= SHORTLIST_MAX;

  return (
    <button
      type="button"
      aria-pressed={on}
      disabled={full}
      onClick={() => writeShortlist(on ? saved.filter((s) => s !== slug) : [...saved, slug])}
      title={full ? `A shortlist holds ${SHORTLIST_MAX} products. Remove one first.` : undefined}
      className={`inline-flex cursor-pointer items-center gap-1.5 rounded-[10px] border px-3 text-[13px] leading-5 font-semibold disabled:cursor-not-allowed disabled:opacity-50 ${compact ? "min-h-9" : "min-h-10"} ${on ? "border-lime-deep/40 bg-lime-wash" : "border-line-firm bg-surface hover:bg-lime-wash"}`}
    >
      {on ? <BookmarkCheck size={15} strokeWidth={1.75} aria-hidden="true" /> : <Bookmark size={15} strokeWidth={1.75} aria-hidden="true" />}
      {on ? "On your shortlist" : "Add to shortlist"}
      <span className="sr-only"> {name}</span>
    </button>
  );
}

/** The header link to the shortlist, with the number saved once the browser has answered. */
export function ShortlistLink({ className = "" }: { className?: string }) {
  const saved = useShortlist();
  return (
    <Link href={saved.length ? `/shortlist?s=${saved.join(",")}` : "/shortlist"} className={className}>
      Shortlist
      {saved.length > 0 && (
        <span className="ml-1.5 inline-grid h-5 min-w-5 place-items-center rounded-full bg-lime px-1.5 text-[12px] leading-none font-bold text-lime-ink">{saved.length}</span>
      )}
    </Link>
  );
}
