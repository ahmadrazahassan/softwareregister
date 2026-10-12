import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

/**
 * Three variants: the lime primary, the quiet outline, and the blue second action.
 *
 * primary  --lime fill with --lime-ink text. Hover flips to --lime-deep, which
 *          is the only lime fill that may carry white text.
 * quiet    a 1px --line-firm border and --ink text.
 * blue     --azure fill with white text, for the second action beside a lime one.
 *          White on --azure measures 6.70:1. No button on the site is black.
 *
 * No shadow, no icon chip, no lift. Hover changes the background only.
 */
export type CtaVariant = "primary" | "quiet" | "blue";

const BASE =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-[10px] border px-5 text-[15px] leading-6 font-semibold whitespace-nowrap cursor-pointer disabled:cursor-not-allowed disabled:opacity-50";

const VARIANT: Record<CtaVariant, string> = {
  primary: "border-lime bg-lime text-lime-ink hover:border-lime-deep hover:bg-lime-deep hover:text-panel-ink",
  quiet: "border-line-firm bg-surface text-ink hover:bg-lime-wash",
  // The second action. Blue beside lime reads as two clear choices without a black block.
  blue: "border-azure bg-azure text-white hover:border-azure-deep hover:bg-azure-deep",
};

export function ctaClass(variant: CtaVariant, extra = ""): string {
  return `${BASE} ${VARIANT[variant]} ${extra}`.trim();
}

interface LinkProps {
  variant?: CtaVariant;
  href: string;
  children: ReactNode;
  className?: string;
}

export function CtaLink({ variant = "primary", href, children, className }: LinkProps) {
  return (
    <Link href={href} className={ctaClass(variant, className)}>
      {children}
    </Link>
  );
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: CtaVariant;
}

export function CtaButton({ variant = "primary", className, type = "button", ...rest }: ButtonProps) {
  return <button type={type} className={ctaClass(variant, className)} {...rest} />;
}
