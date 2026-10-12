"use client";

import { useEffect, useState } from "react";

/**
 * A 180px contents column listing the h2s, with the active one in --lime-text.
 * It is shown only above 1280px and omitted below it, never collapsed into an
 * accordion. Plain anchor links, so it works without scripts. The scroll spy
 * only changes which item is coloured.
 */
export function Toc({ items }: { items: { id: string; text: string }[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => Boolean(e));
    if (els.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "0px 0px -70% 0px", threshold: 0 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;
  return (
    <nav aria-label="Contents" className="sticky top-8 hidden w-[180px] self-start xl:block">
      <p className="stamp mb-3 text-muted">Contents</p>
      <ul className="border-l border-line">
        {items.map((i) => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              aria-current={active === i.id ? "location" : undefined}
              className={`block py-1.5 pl-3 text-[13px] leading-5 ${active === i.id ? "font-semibold text-lime-text" : "text-muted hover:text-ink"}`}
            >
              {i.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
