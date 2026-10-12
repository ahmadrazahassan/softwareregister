import { Check } from "lucide-react";
import type { EditorialSection } from "@/lib/types";

/** The headed sections of a long form write up, each with its paragraphs and an optional list. */
export function EditorialSections({ sections }: { sections: EditorialSection[] }) {
  return (
    <div className="space-y-10">
      {sections.map((sec) => (
        <div key={sec.heading}>
          <h3 className="font-heading text-[22px] leading-7 font-bold tracking-[-0.01em]">{sec.heading}</h3>
          <div className="mt-3 max-w-[68ch] space-y-4 text-[15px] leading-7">
            {sec.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          {sec.bullets && sec.bullets.length > 0 && (
            <ul className="mt-4 max-w-[68ch] border-t border-line">
              {sec.bullets.map((b) => (
                <li key={b} className="flex gap-3 border-b border-line py-2.5 text-[15px] leading-6">
                  <Check size={18} strokeWidth={1.5} aria-hidden="true" className="mt-0.5 flex-none text-lime-text" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
