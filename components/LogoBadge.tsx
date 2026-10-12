import { LOGOS } from "@/lib/data/assets.generated";
import { ProductLogo } from "./ProductLogo";

/**
 * A product logo set inside a white circle with a hairline edge, the way a
 * directory listing shows one. A product with no logo on file shows the first
 * letters of its name, never an invented mark.
 */
export function LogoBadge({ slug, name, size = 88, className = "" }: { slug: string; name: string; size?: number; className?: string }) {
  const initials = name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <span
      className={`grid flex-none place-items-center overflow-hidden rounded-full border border-line bg-white ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {LOGOS[slug] ? (
        <ProductLogo slug={slug} name={name} height={Math.round(size * 0.5)} maxWidth={Math.round(size * 0.66)} fallback="none" decorative />
      ) : (
        <span className="font-heading font-bold tracking-[-0.02em] text-muted" style={{ fontSize: Math.round(size * 0.3) }}>
          {initials}
        </span>
      )}
    </span>
  );
}
