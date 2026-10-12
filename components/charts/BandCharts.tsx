import { randLabel } from "@/lib/calc";
import type { CalcBand } from "@/lib/calc";

/**
 * Two charts for a banded price list such as Sage Payroll's. The columns show
 * what each band costs a month. The line shows what that is per employee at the
 * top of the band, so you can see the price per head fall as the headcount rises.
 * Both carry a table underneath with every figure.
 */
export function BandCharts({ bands, caption }: { bands: CalcBand[]; caption: string }) {
  const banded = bands.filter((b) => b.monthly !== null && b.upTo !== null);
  const W = 720;
  const H = 230;
  const padL = 56;
  const padR = 12;
  const padT = 14;
  const padB = 44;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;
  const maxPrice = Math.max(...banded.map((b) => b.monthly as number));
  const step = innerW / banded.length;
  const barW = Math.max(6, step * 0.62);
  const perHead = banded.map((b) => (b.monthly as number) / (b.upTo as number));
  const maxHead = Math.max(...perHead);
  const minHead = Math.min(...perHead);

  const col = (b: CalcBand, i: number) => {
    const h = ((b.monthly as number) / maxPrice) * innerH;
    return { x: padL + i * step + (step - barW) / 2, y: padT + innerH - h, h };
  };
  const yTicks = [0, 0.5, 1].map((t) => ({ t, y: padT + innerH - t * innerH, label: randLabel(Math.round((maxPrice * t) / 100) * 100) }));

  const LH = 170;
  const lineInner = LH - padT - 34;
  const pts = perHead.map((v, i) => {
    const x = padL + i * step + step / 2;
    const y = padT + lineInner - ((v - minHead * 0.9) / (maxHead - minHead * 0.9)) * lineInner;
    return { x, y, v };
  });

  return (
    <figure className="m-0">
      <figcaption className="stamp mb-4 text-muted">{caption}</figcaption>

      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Monthly price of each employee band, in rand including VAT" className="h-auto w-full">
        {yTicks.map((t) => (
          <g key={t.t}>
            <line x1={padL} x2={W - padR} y1={t.y} y2={t.y} stroke="var(--line)" strokeWidth="1" />
            <text x={padL - 8} y={t.y + 4} textAnchor="end" fontSize="11" fill="var(--muted)">
              {t.label}
            </text>
          </g>
        ))}
        {banded.map((b, i) => {
          const c = col(b, i);
          return (
            <g key={b.label}>
              <rect x={c.x} y={c.y} width={barW} height={Math.max(2, c.h)} rx="2" fill="var(--ink)" />
              {i % 3 === 0 || i === banded.length - 1 ? (
                <text x={c.x + barW / 2} y={H - 22} textAnchor="middle" fontSize="10.5" fill="var(--muted)">
                  {b.upTo}
                </text>
              ) : null}
            </g>
          );
        })}
        <text x={padL + innerW / 2} y={H - 4} textAnchor="middle" fontSize="11" fill="var(--muted)">
          Employees, the top of each band
        </text>
      </svg>

      <svg viewBox={`0 0 ${W} ${LH}`} role="img" aria-label="Price per employee a month at the top of each band, in rand including VAT" className="mt-6 h-auto w-full">
        <line x1={padL} x2={W - padR} y1={padT + lineInner} y2={padT + lineInner} stroke="var(--line)" strokeWidth="1" />
        <polyline points={pts.map((p) => `${p.x},${p.y}`).join(" ")} fill="none" stroke="var(--azure)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
        {pts.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="3.5" fill="var(--azure)" />
            {i === 0 || i === pts.length - 1 || i === Math.floor(pts.length / 2) ? (
              <text x={p.x} y={p.y - 10} textAnchor="middle" fontSize="11.5" fontWeight="600" fill="var(--ink)">
                {randLabel(p.v)}
              </text>
            ) : null}
          </g>
        ))}
        <text x={padL + innerW / 2} y={LH - 6} textAnchor="middle" fontSize="11" fill="var(--muted)">
          Price per employee a month, at the top of each band
        </text>
      </svg>

      <details className="mt-5 rounded-[12px] border border-line-firm bg-surface">
        <summary className="cursor-pointer px-4 py-3 text-[14px] leading-5 font-semibold">Every band, as a table</summary>
        <div className="overflow-x-auto px-4 pb-4">
          <table className="register">
            <caption className="sr-only">Monthly price of every band, including VAT</caption>
            <thead>
              <tr>
                <th scope="col">Employees</th>
                <th scope="col" className="num">A month</th>
                <th scope="col" className="num">Per employee at the top</th>
              </tr>
            </thead>
            <tbody>
              {bands.map((b) => (
                <tr key={b.label}>
                  <td>{b.label}</td>
                  <td className="num">{b.monthly !== null ? randLabel(b.monthly) : b.perEmployee !== null ? `${randLabel(b.perEmployee)} x employees` : ""}</td>
                  <td className="num">{b.monthly !== null && b.upTo ? randLabel(b.monthly / b.upTo) : b.perEmployee !== null ? randLabel(b.perEmployee) : ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </figure>
  );
}
