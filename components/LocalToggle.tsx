import Link from "next/link";
import { SaFlag } from "./SaFlag";

/**
 * The South African products switch: the flag, a label and a toggle. It is a
 * plain link that flips ?local=1, so it works with scripts off and a filtered
 * view stays shareable.
 */
export function LocalToggle({ on, href, className = "" }: { on: boolean; href: string; className?: string }) {
  return (
    <Link
      href={href}
      role="switch"
      aria-checked={on}
      className={`inline-flex items-center gap-3 rounded-[10px] py-1 text-[15px] leading-6 font-medium text-ink hover:text-lime-text ${className}`}
    >
      <SaFlag height={18} />
      <span>Show South African products</span>
      <span
        aria-hidden="true"
        className={`relative h-6 w-11 flex-none rounded-full border transition-colors ${on ? "border-lime-deep bg-lime" : "border-line-firm bg-paper"}`}
      >
        <span className={`absolute top-0.5 left-0.5 h-[18px] w-[18px] rounded-full bg-ink transition-transform ${on ? "translate-x-5" : ""}`} />
      </span>
    </Link>
  );
}
