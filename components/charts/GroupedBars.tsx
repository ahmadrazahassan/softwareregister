export interface GroupBar {
  name: string;
  value: number;
  display: string;
}

export interface BarGroup {
  label: string;
  bars: GroupBar[];
  /** A short remark on the group, such as "Yearly saves 17 percent". */
  remark?: string;
}

const FILLS = ["bg-ink", "bg-azure", "bg-lime-deep"];
const DOTS = ["bg-ink", "bg-azure", "bg-lime-deep"];

/**
 * Bars in groups, with a legend. Used for what a team of each size pays on each
 * plan, and for monthly against yearly billing. Every bar prints its figure.
 */
export function GroupedBars({ groups, caption, note }: { groups: BarGroup[]; caption: string; note?: string }) {
  const names = [...new Set(groups.flatMap((g) => g.bars.map((b) => b.name)))];
  const max = Math.max(1, ...groups.flatMap((g) => g.bars.map((b) => b.value)));
  return (
    <figure className="m-0">
      <figcaption className="stamp mb-3 text-muted">{caption}</figcaption>
      <ul className="mb-5 flex flex-wrap gap-x-5 gap-y-1.5" aria-label="Legend">
        {names.map((n, i) => (
          <li key={n} className="flex items-center gap-2 text-[13px] leading-5">
            <span aria-hidden="true" className={`h-2.5 w-2.5 rounded-full ${DOTS[i % DOTS.length]}`} />
            {n}
          </li>
        ))}
      </ul>
      <div className="space-y-6">
        {groups.map((g) => (
          <div key={g.label} className="grid gap-x-4 gap-y-1.5 sm:grid-cols-[110px_1fr]">
            <p className="text-[14px] leading-5 font-semibold sm:pt-0.5">
              {g.label}
              {g.remark && <span className="mt-0.5 block text-[12px] leading-4 font-normal text-muted">{g.remark}</span>}
            </p>
            <ul className="space-y-1.5">
              {g.bars.map((b) => (
                <li key={b.name} className="grid grid-cols-[1fr_auto] items-center gap-3">
                  <span aria-hidden="true" className="h-3 rounded-full bg-black/[0.06]">
                    <span className={`block h-full rounded-full ${FILLS[names.indexOf(b.name) % FILLS.length]}`} style={{ width: `${Math.max(1.5, (b.value / max) * 100)}%` }} />
                  </span>
                  <span className="min-w-[96px] text-right text-[13px] leading-5 font-semibold whitespace-nowrap">
                    <span className="sr-only">{b.name}: </span>
                    {b.display}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {note && <p className="mt-5 text-[12px] leading-4 text-muted">{note}</p>}
    </figure>
  );
}
