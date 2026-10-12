import type { ReactNode } from "react";

/**
 * One shared component for the six legal pages: terms, privacy, cookie,
 * affiliate disclosure, PAIA manual and accessibility. Single column 680px,
 * title 32px, a stamp for the last updated date, body 15px over 26px, h2 at
 * 20px with a rule above. No cards, no icons, no callout boxes.
 */
export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <article className="mx-auto w-full max-w-[1080px] px-6 pt-12 pb-12 lg:pt-[72px] lg:pb-[72px]">
      <h1 className="font-heading text-[32px] leading-9 font-bold tracking-[-0.02em]">{title}</h1>
      <p className="stamp mt-3 mb-10 text-muted">Last updated {updated}</p>
      <div className="legal">{children}</div>
    </article>
  );
}

export const LEGAL_UPDATED = "5 October 2026";
