const SEGMENTS = 22;
const CX = 130;
const CY = 124;
const R_IN = 84;
const R_OUT = 112;

/**
 * A half circle made of rounded segments, lime where it is filled. It shows one
 * stated figure against a scale the caption names, such as the share of the
 * monthly price that paying for a year takes off. The figure is printed in the
 * middle as text, so the picture is never the only place the number lives.
 * It is a measure of one price, not a score of a product.
 */
export function SegmentGauge({
  value,
  max = 100,
  centre,
  title,
  caption,
  pill,
}: {
  /** Where the fill stops, on a scale of zero to `max`. */
  value: number;
  max?: number;
  /** The figure in the middle, such as "17%". */
  centre: string;
  title: string;
  caption: string;
  /** A short line under the gauge, in a pill. */
  pill?: string;
}) {
  const filled = value <= 0 ? 0 : Math.max(1, Math.min(SEGMENTS, Math.round((value / max) * SEGMENTS)));
  const segs = Array.from({ length: SEGMENTS }, (_, i) => {
    const a = Math.PI - (i / (SEGMENTS - 1)) * Math.PI;
    return {
      x1: CX + R_IN * Math.cos(a),
      y1: CY - R_IN * Math.sin(a),
      x2: CX + R_OUT * Math.cos(a),
      y2: CY - R_OUT * Math.sin(a),
      on: i < filled,
    };
  });
  return (
    <figure className="m-0 flex flex-col items-center text-center">
      <figcaption className="stamp mb-2 text-muted">{title}</figcaption>
      <div className="relative w-full max-w-[260px]">
        <svg viewBox="0 0 260 140" role="img" aria-label={`${title}: ${centre}. ${caption}`} className="block h-auto w-full">
          {segs.map((g, i) => (
            <line key={i} x1={g.x1} y1={g.y1} x2={g.x2} y2={g.y2} strokeWidth={9} strokeLinecap="round" className={g.on ? "stroke-lime" : "stroke-line-firm"} />
          ))}
        </svg>
        <div className="absolute inset-x-0 bottom-0 text-center">
          <p className="font-heading text-[40px] leading-[44px] font-bold tracking-[-0.03em]">{centre}</p>
        </div>
      </div>
      <p className="mt-2 max-w-[240px] text-[13px] leading-5 text-muted">{caption}</p>
      {pill && <p className="mt-3 rounded-full border border-line-firm bg-surface px-3 py-1 text-[13px] leading-5">{pill}</p>}
    </figure>
  );
}
