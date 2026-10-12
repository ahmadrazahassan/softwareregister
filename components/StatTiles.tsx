import Link from "next/link";

export interface StatTile {
  value: string;
  label: string;
  note: string;
  /** Makes the whole tile a link, from the label. */
  href?: string;
}

/**
 * Four numbers, as tiles. The source order is label, value, note, so a screen
 * reader or a copy and paste reads "Products 39 across six categories". The
 * numeral is moved to the top of the tile with `order`, not by reversing the
 * markup.
 */
export function StatTiles({ tiles }: { tiles: StatTile[] }) {
  return (
    <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {tiles.map((t) => (
        <div
          key={t.label}
          className={`relative flex flex-col gap-1 rounded-[16px] border border-line-firm bg-surface p-5 transition-colors ${t.href ? "hover:border-ink" : ""}`}
        >
          <dt className="stamp order-2 text-muted">
            {t.href ? (
              <Link href={t.href} className="after:absolute after:inset-0 after:content-['']">
                {t.label}
              </Link>
            ) : (
              t.label
            )}
          </dt>
          <dd className="order-1 m-0 font-heading text-[48px] leading-[52px] font-bold tracking-[-0.03em]">{t.value}</dd>
          <dd className="order-3 m-0 text-[13px] leading-5 text-muted">{t.note}</dd>
        </div>
      ))}
    </dl>
  );
}
