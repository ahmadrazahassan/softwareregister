"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SHORTLIST_MAX, useShortlist, writeShortlist } from "@/lib/shortlist";
import { ctaClass } from "./CtaButton";

interface Props {
  /** The slugs in the address of the page, in order. Empty when the reader opened /shortlist on its own. */
  urlSlugs: string[];
  names: Record<string, string>;
}

/**
 * The controls of the shortlist page. The page itself is drawn on the server from
 * the slugs in its address, so a shortlist can be shared as a link. This part
 * brings the reader's saved shortlist into the address when it is empty, lets
 * them remove a product or clear the lot, copy the link, and open two side by
 * side in a full comparison.
 */
export function ShortlistManager({ urlSlugs, names }: Props) {
  const router = useRouter();
  const saved = useShortlist();
  const [copied, setCopied] = useState(false);
  const [pickA, setA] = useState("");
  const [pickB, setB] = useState("");
  // What the two selects show: the reader's pick while it is still on the shortlist, else the first two products.
  const a = urlSlugs.includes(pickA) ? pickA : (urlSlugs[0] ?? "");
  const b = urlSlugs.includes(pickB) && pickB !== a ? pickB : (urlSlugs.find((s) => s !== a) ?? "");

  useEffect(() => {
    if (urlSlugs.length === 0 && saved.length > 0) router.replace(`/shortlist?s=${saved.join(",")}`);
  }, [urlSlugs.length, saved, router]);

  const go = (slugs: string[]) => router.replace(slugs.length ? `/shortlist?s=${slugs.join(",")}` : "/shortlist");
  const remove = (slug: string) => {
    if (saved.includes(slug)) writeShortlist(saved.filter((s) => s !== slug));
    go(urlSlugs.filter((s) => s !== slug));
  };
  const same = urlSlugs.length === saved.length && urlSlugs.every((s) => saved.includes(s));

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/shortlist?s=${urlSlugs.join(",")}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Copying is a convenience. The address bar holds the same link.
    }
  };

  if (urlSlugs.length === 0) {
    return (
      <div className="rounded-[20px] border border-line-firm bg-surface p-6 md:p-8">
        <h2 className="font-heading text-[24px] leading-8 font-bold tracking-[-0.02em]">Nothing on your shortlist yet.</h2>
        <p className="mt-2 max-w-[60ch] text-[15px] leading-6 text-muted">
          Press Add to shortlist on any product, up to {SHORTLIST_MAX}. Your shortlist stays in this browser, and you can share it as a link.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/finder" className={ctaClass("primary")}>
            Build a shortlist
          </Link>
          <Link href="/register" className={ctaClass("quiet")}>
            Browse all software
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ul className="flex flex-wrap gap-2" aria-label="On your shortlist">
        {urlSlugs.map((slug) => (
          <li key={slug}>
            <button
              type="button"
              onClick={() => remove(slug)}
              aria-label={`Remove ${names[slug] ?? slug} from the shortlist`}
              className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-full border border-lime-deep/40 bg-lime-wash px-4 text-[14px] leading-5 font-medium"
            >
              {names[slug] ?? slug}
              <X size={14} strokeWidth={2} aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap items-center gap-3">
        {!same && (
          <button type="button" onClick={() => writeShortlist(urlSlugs)} className={ctaClass("primary", "min-h-10 px-4 text-[14px]")}>
            Save these to my shortlist
          </button>
        )}
        <button type="button" onClick={copy} className={ctaClass("quiet", "min-h-10 px-4 text-[14px]")}>
          {copied ? "Link copied" : "Copy a link to share"}
        </button>
        <button
          type="button"
          onClick={() => {
            writeShortlist([]);
            go([]);
          }}
          className="cursor-pointer text-[14px] underline underline-offset-4"
        >
          Clear the shortlist
        </button>
        {same && <p className="text-[13px] leading-5 text-muted">Saved in this browser.</p>}
      </div>

      {urlSlugs.length >= 2 && (
        <div className="rounded-[20px] border border-line-firm bg-surface p-5">
          <p className="font-heading text-[18px] leading-6 font-bold tracking-[-0.01em]">Compare two in full</p>
          <div className="mt-3 flex flex-wrap items-end gap-3">
            {[
              { id: "cmp-a", value: a, set: setA, label: "First" },
              { id: "cmp-b", value: b, set: setB, label: "Second" },
            ].map((f) => (
              <div key={f.id}>
                <label htmlFor={f.id} className="stamp mb-1 block text-muted">
                  {f.label}
                </label>
                <select id={f.id} value={f.value} onChange={(e) => f.set(e.target.value)} className="field min-w-[180px]">
                  {urlSlugs.map((s) => (
                    <option key={s} value={s}>
                      {names[s] ?? s}
                    </option>
                  ))}
                </select>
              </div>
            ))}
            <Link
              href={a && b && a !== b ? `/versus/${a}-vs-${b}` : "#"}
              aria-disabled={!a || !b || a === b}
              className={ctaClass("blue", a && b && a !== b ? "" : "pointer-events-none opacity-50")}
            >
              Open the comparison
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
