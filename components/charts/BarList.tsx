import type { ReactNode } from "react";

export interface BarRow {
  label: ReactNode;
  /** A line under the label, such as "R450 including VAT, R391.30 excluding VAT". */
  sub?: string | null;
  value: number;
  /** The figure as a reader should see it. Every bar carries it as text, so no chart depends on its colours. */
  display: string;
  tone?: "ink" | "lime" | "muted";
}

const FILL = { ink: "bg-ink", lime: "bg-lime-deep", muted: "bg-line-firm" } as const;

/**
 * A horizontal bar chart as a list. Each row is a label, a track and the figure
 * written out, so a reader on a screen reader or a printout gets the same
 * numbers. A bar is as long as its value is a share of the largest value shown.
 */
export function BarList({ rows, caption, note, scale = "linear" }: { rows: BarRow[]; caption: string; note?: string; scale?: "linear" | "sqrt" }) {
  const max = Math.max(1, ...rows.map((r) => r.value));
  const share = (v: number) => (scale === "sqrt" ? Math.sqrt(v / max) : v / max);
  return (
    <figure className="m-0">
      <figcaption className="stamp mb-4 text-muted">{caption}</figcaption>
      <ul className="space-y-3">
        {rows.map((r, i) => {
          const width = r.value === 0 ? 1.5 : Math.max(2.5, share(r.value) * 100);
          return (
            <li key={i} className="grid grid-cols-[minmax(0,150px)_1fr_auto] items-center gap-x-4 gap-y-1 sm:grid-cols-[minmax(0,200px)_1fr_minmax(0,110px)]">
              <span className="min-w-0">
                <span className="block truncate text-[14px] leading-5 font-semibold">{r.label}</span>
                {r.sub && <span className="hidden text-[12px] leading-4 text-muted sm:block">{r.sub}</span>}
              </span>
              <span aria-hidden="true" className="h-3.5 rounded-full bg-black/[0.06]">
                <span className={`block h-full rounded-full ${FILL[r.tone ?? "ink"]}`} style={{ width: `${width}%` }} />
              </span>
              <span className="text-right text-[14px] leading-5 font-semibold whitespace-nowrap">{r.display}</span>
            </li>
          );
        })}
      </ul>
      {scale === "sqrt" && <p className="mt-4 text-[12px] leading-4 text-muted">Bar lengths use a square root scale, so a very high price does not flatten the rest. The figures are exact.</p>}
      {note && <p className="mt-2 text-[12px] leading-4 text-muted">{note}</p>}
    </figure>
  );
}
