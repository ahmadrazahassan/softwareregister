export interface RangeRow {
  label: string;
  /** Every paid plan price in rand, lowest first. Drawn as a dot each. */
  prices: number[];
  /** The range as text, such as "R170 to R359". */
  display: string;
  self?: boolean;
}

/**
 * For each product, a bar from its cheapest paid plan to its dearest, with a dot
 * on every plan between. It shows how far a product's plans stretch, not which
 * is better. Rows are sorted by cheapest plan, and the product under review is
 * lime. Every range is also written out as text.
 */
export function RangeChart({ rows, caption, note, scale = "linear" }: { rows: RangeRow[]; caption: string; note?: string; scale?: "linear" | "sqrt" }) {
  const max = Math.max(1, ...rows.flatMap((r) => r.prices));
  const pos = (v: number) => (scale === "sqrt" ? Math.sqrt(v / max) : v / max) * 100;
  return (
    <figure className="m-0">
      <figcaption className="stamp mb-4 text-muted">{caption}</figcaption>
      <ul className="space-y-3.5">
        {rows.map((r) => {
          const lo = Math.min(...r.prices);
          const hi = Math.max(...r.prices);
          const left = pos(lo);
          const width = Math.max(1.2, pos(hi) - pos(lo));
          return (
            <li key={r.label} className="grid grid-cols-[minmax(0,110px)_1fr] items-center gap-x-4 gap-y-1 sm:grid-cols-[minmax(0,170px)_1fr_minmax(0,130px)]">
              <span className={`min-w-0 truncate text-[14px] leading-5 font-semibold ${r.self ? "text-ink" : ""}`}>{r.label}</span>
              <span aria-hidden="true" className="relative h-5 rounded-full bg-black/[0.06]">
                <span className={`absolute top-1/2 h-2.5 -translate-y-1/2 rounded-full ${r.self ? "bg-lime-deep" : "bg-line-firm"}`} style={{ left: `${left}%`, width: `${width}%` }} />
                {r.prices.map((p, i) => (
                  <span
                    key={i}
                    className={`absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-surface ${r.self ? "bg-ink" : "bg-muted"}`}
                    style={{ left: `${pos(p)}%` }}
                  />
                ))}
              </span>
              <span className="col-span-2 text-[13px] leading-5 whitespace-nowrap sm:col-span-1 sm:text-right sm:font-semibold">{r.display}</span>
            </li>
          );
        })}
      </ul>
      {scale === "sqrt" && <p className="mt-4 text-[12px] leading-4 text-muted">Positions use a square root scale, so a very high price does not flatten the rest. The figures are exact.</p>}
      {note && <p className="mt-2 text-[12px] leading-4 text-muted">{note}</p>}
    </figure>
  );
}
