export interface AreaSeries {
  name: string;
  points: { x: number; y: number }[];
  tone?: "ink" | "azure" | "lime";
}

const STROKE = { ink: "stroke-ink", azure: "stroke-azure", lime: "stroke-lime-deep" } as const;
const DOT = { ink: "fill-ink", azure: "fill-azure", lime: "fill-lime-deep" } as const;
const SWATCH = { ink: "bg-ink", azure: "bg-azure", lime: "bg-lime-deep" } as const;
const TONES = ["ink", "azure", "lime"] as const;

const W = 560;
const H = 300;
const M = { l: 70, r: 22, t: 18, b: 44 };

/** The nearest tidy number at or above n: 1, 2, 5 or 10 times a power of ten. */
function niceCeil(n: number): number {
  if (n <= 0) return 1;
  const p = Math.pow(10, Math.floor(Math.log10(n)));
  const f = n / p;
  return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 5 ? 5 : 10) * p;
}

/**
 * A line chart with a flat tint under the first line, a grid, a dot on every
 * reading and, when asked, one marked position. It draws what it is given and
 * nothing else: no smoothing, no forecast. Every reading is also written out in
 * the table that opens beneath it, so the chart is never the only place a
 * number lives. Flat fills only: no gradient, no shadow.
 */
export function AreaChart({
  series,
  caption,
  xTicks,
  xFormat,
  yFormat,
  marker,
  note,
  tableLabel = "Show the readings as a table",
  xHeading,
}: {
  series: AreaSeries[];
  caption: string;
  xTicks: number[];
  xFormat: (n: number) => string;
  yFormat: (n: number) => string;
  marker?: { x: number; label: string };
  note?: string;
  tableLabel?: string;
  xHeading: string;
}) {
  const all = series.flatMap((s) => s.points);
  if (all.length === 0) return null;
  const xs = [...new Set(all.map((p) => p.x))].sort((a, b) => a - b);
  const xMin = xs[0];
  const xMax = xs[xs.length - 1] === xMin ? xMin + 1 : xs[xs.length - 1];
  const yMax = niceCeil(Math.max(...all.map((p) => p.y)) * 1.05);
  const sx = (x: number) => M.l + ((x - xMin) / (xMax - xMin)) * (W - M.l - M.r);
  const sy = (y: number) => H - M.b - (y / yMax) * (H - M.t - M.b);
  const yTicks = [0, 1, 2, 3, 4].map((i) => (yMax / 4) * i);
  const tone = (i: number, s: AreaSeries) => s.tone ?? TONES[i % TONES.length];

  const line = (s: AreaSeries) => s.points.map((p, i) => `${i === 0 ? "M" : "L"}${sx(p.x).toFixed(1)} ${sy(p.y).toFixed(1)}`).join(" ");
  const first = series[0];
  const area = first.points.length > 1 ? `${line(first)} L${sx(first.points[first.points.length - 1].x).toFixed(1)} ${sy(0).toFixed(1)} L${sx(first.points[0].x).toFixed(1)} ${sy(0).toFixed(1)} Z` : null;

  return (
    <figure className="m-0">
      <figcaption className="stamp mb-3 text-muted">{caption}</figcaption>
      {series.length > 1 && (
        <ul className="mb-3 flex flex-wrap gap-x-5 gap-y-1.5" aria-label="Legend">
          {series.map((s, i) => (
            <li key={s.name} className="flex items-center gap-2 text-[13px] leading-5">
              <span aria-hidden="true" className={`h-2.5 w-2.5 rounded-full ${SWATCH[tone(i, s)]}`} />
              {s.name}
            </li>
          ))}
        </ul>
      )}
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${caption}. ${series.map((s) => `${s.name}: ${s.points.map((p) => `${xFormat(p.x)} ${yFormat(p.y)}`).join(", ")}`).join(". ")}`} className="block h-auto w-full">
        {yTicks.map((t) => (
          <g key={t}>
            <line x1={M.l} x2={W - M.r} y1={sy(t)} y2={sy(t)} strokeWidth={1} className="stroke-line" />
            <text x={M.l - 10} y={sy(t) + 4} textAnchor="end" className="fill-muted" fontSize={12}>
              {yFormat(t)}
            </text>
          </g>
        ))}
        {xTicks.map((t) => (
          <text key={t} x={sx(t)} y={H - M.b + 22} textAnchor="middle" className="fill-muted" fontSize={12}>
            {xFormat(t)}
          </text>
        ))}
        {area && <path d={area} className="fill-azure/10" />}
        {marker && (
          <g>
            <line x1={sx(marker.x)} x2={sx(marker.x)} y1={M.t} y2={H - M.b} strokeWidth={1.5} strokeDasharray="4 4" className="stroke-ink" />
            <text x={sx(marker.x)} y={M.t + 10} textAnchor={sx(marker.x) > W / 2 ? "end" : "start"} dx={sx(marker.x) > W / 2 ? -6 : 6} className="fill-ink" fontSize={12} fontWeight={600}>
              {marker.label}
            </text>
          </g>
        )}
        {series.map((s, i) => (
          <g key={s.name}>
            <path d={line(s)} fill="none" strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" className={STROKE[tone(i, s)]} />
            {s.points.map((p) => (
              <circle key={p.x} cx={sx(p.x)} cy={sy(p.y)} r={4} className={`${DOT[tone(i, s)]} stroke-surface`} strokeWidth={2} />
            ))}
          </g>
        ))}
      </svg>
      {note && <p className="mt-2 text-[12px] leading-4 text-muted">{note}</p>}
      <details className="mt-3 text-[13px] leading-5">
        <summary className="cursor-pointer font-semibold">{tableLabel}</summary>
        <div className="mt-2 overflow-x-auto">
          <table className="w-full min-w-[320px] border-collapse text-left">
            <thead>
              <tr className="border-b border-line-firm">
                <th scope="col" className="py-1.5 pr-4 font-semibold">
                  {xHeading}
                </th>
                {series.map((s) => (
                  <th key={s.name} scope="col" className="py-1.5 pr-4 font-semibold">
                    {s.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {xs.map((x) => (
                <tr key={x} className="border-b border-line">
                  <th scope="row" className="py-1.5 pr-4 font-normal">
                    {xFormat(x)}
                  </th>
                  {series.map((s) => {
                    const p = s.points.find((q) => q.x === x);
                    return (
                      <td key={s.name} className="py-1.5 pr-4 tabular-nums">
                        {p ? yFormat(p.y) : "Not sold at this size"}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </figure>
  );
}
