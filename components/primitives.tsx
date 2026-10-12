import { Check, Minus, X } from "lucide-react";
import type { ReactNode } from "react";
import { formatDateStamp, formatDateLong } from "@/lib/format";
import type { MatrixCell } from "@/lib/registry";

/** The content column: fluid, max 1080px, 24px side padding. */
export function Container({ wide = false, className = "", children }: { wide?: boolean; className?: string; children: ReactNode }) {
  return (
    <div className={`mx-auto w-full px-6 ${wide ? "max-w-[1280px]" : "max-w-[1080px]"} ${className}`}>{children}</div>
  );
}

/** A section opened by a full width 1px rule, with 72px padding on desktop and 48px on mobile. */
export function Section({
  title,
  id,
  first = false,
  wide = false,
  tight = false,
  children,
  aside,
}: {
  title?: string;
  id?: string;
  first?: boolean;
  wide?: boolean;
  tight?: boolean;
  children: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section id={id} className={`mx-auto w-full px-6 ${wide ? "max-w-[1280px]" : "max-w-[1080px]"}`}>
      <div className={`${first ? "" : "border-t border-line-firm"} ${tight ? "py-8 lg:py-10" : "py-12 lg:py-[72px]"}`}>
        {title && (
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <h2 className="font-heading text-[24px] leading-7 font-bold tracking-[-0.01em]">{title}</h2>
            {aside}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

export function PageTitle({ children }: { children: ReactNode }) {
  return (
    <h1 className="font-heading text-[32px] leading-9 font-bold tracking-[-0.02em] md:text-[44px] md:leading-[46px]">
      {children}
    </h1>
  );
}

/** Page opening: stamp, title, optional standfirst. No image. */
export function PageHeader({
  title,
  stamp,
  children,
  wide = false,
}: {
  title: ReactNode;
  stamp?: string;
  children?: ReactNode;
  wide?: boolean;
}) {
  return (
    <header className={`mx-auto w-full px-6 pt-12 pb-10 lg:pt-[72px] ${wide ? "max-w-[1280px]" : "max-w-[1080px]"}`}>
      {stamp && <p className="stamp mb-3 text-muted">{stamp}</p>}
      <PageTitle>{title}</PageTitle>
      {children && <div className="mt-5 max-w-[640px] text-[15px] leading-6 text-muted">{children}</div>}
    </header>
  );
}

export interface Figure {
  value: string;
  label: string;
  /** Winning figure on a comparison, set in --lime-text. */
  win?: boolean;
}

/** Numerals on a rule, divided by 1px verticals. No boxes, no icons. */
export function FigureBand({ figures, size = 44 }: { figures: Figure[]; size?: 44 | 72 }) {
  return (
    <dl
      className="grid border-y border-line"
      style={{ gridTemplateColumns: `repeat(auto-fit, minmax(${size === 72 ? 150 : 140}px, 1fr))` }}
    >
      {figures.map((f, i) => (
        <div
          key={`${f.label}-${i}`}
          className={`flex flex-col-reverse justify-end gap-2 px-0 py-6 sm:px-6 ${i > 0 ? "sm:border-l sm:border-line" : "sm:pl-0"}`}
        >
          <dt className="stamp text-muted">{f.label}</dt>
          <dd
            className={`m-0 font-heading font-bold tracking-[-0.03em] ${f.win ? "text-lime-text" : "text-ink"}`}
            style={{ fontSize: size, lineHeight: size === 72 ? "64px" : "46px" }}
          >
            {f.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** The date a price was read, on --lime-wash. Nothing at all when there is no date. */
export function CheckedStamp({ date, compact = false }: { date: string | null; compact?: boolean }) {
  if (!date) return null;
  return (
    <span
      title={`Price read on ${formatDateLong(date)}`}
      className="stamp inline-flex items-center gap-1 bg-lime-wash px-1.5 py-[3px] whitespace-nowrap text-ink"
    >
      <Check size={12} strokeWidth={1.5} aria-hidden="true" />
      <span className="sr-only">Checked </span>
      {compact ? formatDateStamp(date).slice(0, -5) : formatDateStamp(date)}
    </span>
  );
}

/** A cell in a compliance matrix. Check in --lime-text, X in --muted, Minus for not applicable. */
export function ComplianceMark({ cell }: { cell: MatrixCell }) {
  switch (cell) {
    case "yes":
      return (
        <span className="inline-flex text-lime-text">
          <Check size={18} strokeWidth={1.5} aria-hidden="true" />
          <span className="sr-only">Yes</span>
        </span>
      );
    case "no":
      return (
        <span className="inline-flex text-muted">
          <X size={18} strokeWidth={1.5} aria-hidden="true" />
          <span className="sr-only">No</span>
        </span>
      );
    case "na":
      return (
        <span className="inline-flex text-muted">
          <Minus size={18} strokeWidth={1.5} aria-hidden="true" />
          <span className="sr-only">Not applicable</span>
        </span>
      );
    default:
      // Not listed on the vendor's page: a quiet minus, never a word.
      return (
        <span className="inline-flex text-line-firm">
          <Minus size={18} strokeWidth={1.5} aria-hidden="true" />
          <span className="sr-only">Not listed</span>
        </span>
      );
  }
}

/** Star glyphs stay because in a rating they are data, not decoration. */
export function StarGlyph({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`text-[0.8em] leading-none ${className}`}>
      ★
    </span>
  );
}

export function Note({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`text-[13px] leading-5 text-muted ${className}`}>{children}</p>;
}

export function Stamp({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`stamp ${className}`}>{children}</span>;
}
