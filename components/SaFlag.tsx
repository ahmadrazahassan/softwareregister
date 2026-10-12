import Image from "next/image";

/**
 * The flag of South Africa, from /public/flags/za.svg. The file is 3 by 2, so the
 * box is 3 by 2 as well: the flag fills it with nothing letterboxed. It is
 * decoration beside text that already says "South Africa", so it is hidden from
 * screen readers.
 */
export function SaFlag({ height = 16, className = "" }: { height?: number; className?: string }) {
  const width = Math.round(height * 1.5);
  return (
    <Image
      src="/flags/za.svg"
      alt=""
      aria-hidden="true"
      width={width}
      height={height}
      unoptimized
      className={`inline-block flex-none rounded-[3px] border border-black/10 align-[-0.15em] ${className}`}
      style={{ width, height }}
    />
  );
}
