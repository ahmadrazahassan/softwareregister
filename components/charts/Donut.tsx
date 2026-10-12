export interface DonutPart {
  label: string;
  value: number;
  display: string;
  tone?: "ink" | "azure" | "lime" | "muted";
}

const STROKE = { ink: "stroke-ink", azure: "stroke-azure", lime: "stroke-lime", muted: "stroke-line-firm" } as const;
const SWATCH = { ink: "bg-ink", azure: "bg-azure", lime: "bg-lime", muted: "bg-line-firm" } as const;
const TONES = ["ink", "lime", "azure", "muted"] as const;

const R = 46;
const C = 2 * Math.PI * R;

/**
 * A ring split into parts that add up to one sum, with the sum in the middle and
 * every part written out beside it. Used for where a bill goes: the plan, the
 * extras, the VAT. Flat colours only.
 */
export function Donut({ parts, centre, centreNote, caption }: { parts: DonutPart[]; centre: string; centreNote: string; caption: string }) {
  const total = parts.reduce((t, p) => t + p.value, 0);
  if (total <= 0) return null;
  // Where each part starts around the ring, worked out before drawing.
  const starts = parts.map((_, i) => parts.slice(0, i).reduce((t, p) => t + (p.value / total) * C, 0));
  return (
    <figure className="m-0">
      <figcaption className="stamp mb-3 text-muted">{caption}</figcaption>
      <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:gap-8">
        <div className="relative h-[170px] w-[170px] flex-none">
          <svg viewBox="0 0 120 120" role="img" aria-label={`${caption}: ${parts.map((p) => `${p.label} ${p.display}`).join(", ")}. Total ${centre}.`} className="block h-full w-full -rotate-90">
            <circle cx={60} cy={60} r={R} fill="none" strokeWidth={14} className="stroke-black/[0.06]" />
            {parts.map((p, i) => {
              const len = Math.max(0, (p.value / total) * C - 2);
              return <circle key={p.label} cx={60} cy={60} r={R} fill="none" strokeWidth={14} strokeDasharray={`${len} ${C - len}`} strokeDashoffset={-starts[i]} className={STROKE[p.tone ?? TONES[i % TONES.length]]} />;
            })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <p className="font-heading text-[20px] leading-6 font-bold tracking-[-0.02em]">{centre}</p>
            <p className="max-w-[90px] text-[11px] leading-3 text-muted">{centreNote}</p>
          </div>
        </div>
        <ul className="w-full space-y-2.5 sm:flex-1">
          {parts.map((p, i) => (
            <li key={p.label} className="flex items-center justify-between gap-4 text-[14px] leading-5">
              <span className="flex min-w-0 items-center gap-2.5">
                <span aria-hidden="true" className={`h-3 w-3 flex-none rounded-full ${SWATCH[p.tone ?? TONES[i % TONES.length]]}`} />
                <span className="truncate">{p.label}</span>
              </span>
              <span className="font-semibold whitespace-nowrap tabular-nums">{p.display}</span>
            </li>
          ))}
        </ul>
      </div>
    </figure>
  );
}
