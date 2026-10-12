import { Check } from "lucide-react";
import { formatDateLong } from "@/lib/format";
import type { EditorialComparison } from "@/lib/types";
import { EditorialSections } from "./EditorialSections";

/** The long form comparison: the short answer, who should pick which, a side by side of researched facts, the detail and a verdict. */
export function EditorialComparisonBlock({ c, aName, bName }: { c: EditorialComparison; aName: string; bName: string }) {
  return (
    <div>
      <p className="stamp text-muted">Researched {formatDateLong(c.researchedAt)} from both vendors&apos; own pages</p>
      <h3 className="mt-3 max-w-[32ch] font-heading text-[28px] leading-8 font-bold tracking-[-0.02em] md:text-[34px] md:leading-10">{c.headline}</h3>
      <p className="mt-4 max-w-[68ch] text-[16px] leading-7">{c.summary}</p>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {[
          { name: aName, items: c.chooseA },
          { name: bName, items: c.chooseB },
        ].map((side) => (
          <div key={side.name} className="rounded-[16px] border border-line-firm bg-surface p-5">
            <p className="stamp text-lime-text">Choose {side.name} if</p>
            <ul className="mt-3 space-y-2.5">
              {side.items.map((t) => (
                <li key={t} className="flex gap-3 text-[15px] leading-6">
                  <Check size={18} strokeWidth={1.5} aria-hidden="true" className="mt-0.5 flex-none text-lime-text" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {c.glance.length > 0 && (
        <div className="mt-8 overflow-hidden rounded-[16px] border border-line-firm">
          <div className="overflow-x-auto">
            <table className="register register-compare">
              <caption className="sr-only">
                {aName} and {bName}, side by side
              </caption>
              <thead>
                <tr>
                  <th scope="col" className="w-[28%]">
                    At a glance
                  </th>
                  <th scope="col" className="w-[36%]">
                    {aName}
                  </th>
                  <th scope="col" className="w-[36%]">
                    {bName}
                  </th>
                </tr>
              </thead>
              <tbody>
                {c.glance.map((row) => (
                  <tr key={row.label} className="row">
                    <th scope="row" className="text-left font-semibold">
                      {row.label}
                    </th>
                    <td>{row.a}</td>
                    <td>{row.b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="mt-10">
        <EditorialSections sections={c.sections} />
      </div>

      <div className="mt-10 max-w-[68ch] rounded-[16px] border border-lime-deep/30 bg-lime-wash p-6">
        <p className="stamp text-lime-text">The verdict</p>
        <p className="mt-3 text-[16px] leading-7">{c.verdict}</p>
      </div>
    </div>
  );
}
