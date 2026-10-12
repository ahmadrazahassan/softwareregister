import Image from "next/image";
import type { Currency } from "@/lib/types";

/** ratio is the width over the height of the flag file, so the box matches the artwork. */
const FLAG: Record<Currency, { file: string; label: string; ratio: number }> = {
  ZAR: { file: "za", label: "South Africa", ratio: 3 / 2 },
  USD: { file: "us", label: "United States", ratio: 1235 / 650 },
  GBP: { file: "gb", label: "United Kingdom", ratio: 2 },
  EUR: { file: "eu", label: "European Union", ratio: 3 / 2 },
};

/** A small flag beside a billing currency, so rand and foreign billing can be told apart at a glance. */
export function CurrencyFlag({ currency, height = 14 }: { currency: Currency; height?: number }) {
  const f = FLAG[currency];
  const width = Math.round(height * f.ratio);
  return (
    <Image
      src={`/flags/${f.file}.svg`}
      alt=""
      width={width}
      height={height}
      unoptimized
      title={f.label}
      className="inline-block flex-none rounded-[3px] border border-black/10 align-[-2px]"
      style={{ width, height }}
    />
  );
}
