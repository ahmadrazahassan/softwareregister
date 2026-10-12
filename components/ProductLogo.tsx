import Image from "next/image";
import { LOGOS } from "@/lib/data/assets.generated";

interface Props {
  slug: string;
  name: string;
  /** Height in pixels. Wide logos are held to a sensible width, and low resolution ones are held to what they can bear. */
  height?: number;
  /** Cap on the width, for a narrow slot such as a table cell. */
  maxWidth?: number;
  /** What to show when the product has no logo on file. A wordmark is the name set in type. It is never an invented logo. */
  fallback?: "wordmark" | "none";
  /** The name is printed beside the logo, so a screen reader should not hear it twice. */
  decorative?: boolean;
  className?: string;
  priority?: boolean;
}

/**
 * A product logo, set bare: no tile, no circle and no background behind it.
 * The artwork in /public/brand/logos has its edge background removed by
 * `npm run assets`, so it sits straight on the page.
 */
export function ProductLogo({ slug, name, height = 64, maxWidth, fallback = "wordmark", decorative = false, className = "", priority = false }: Props) {
  const logo = LOGOS[slug];

  if (!logo) {
    if (fallback === "none") return null;
    return (
      <span
        className={`font-heading font-bold tracking-[-0.02em] text-ink ${className}`}
        style={{ fontSize: Math.max(15, Math.round(height * 0.42)), lineHeight: 1.05 }}
      >
        {name}
      </span>
    );
  }

  // A 32px source blown up to 96px looks like mud. Cap the height at twice what the artwork really has.
  let h = logo.native ? Math.min(height, Math.max(40, logo.native * 2)) : height;
  const aspect = logo.width / logo.height;
  const maxW = maxWidth ?? height * 3.4;
  if (h * aspect > maxW) h = maxW / aspect;
  const w = Math.round(h * aspect);
  h = Math.round(h);

  return (
    <Image
      src={logo.src}
      alt={decorative ? "" : `${name} logo`}
      width={w}
      height={h}
      priority={priority}
      unoptimized={logo.src.endsWith(".svg")}
      className={`block flex-none object-contain ${className}`}
      style={{ width: w, height: h }}
    />
  );
}
