import type { BlogHeroSpec, HeroTone } from "@/lib/data/blog";
import { priceLabel } from "@/lib/format";
import type { Registry } from "@/lib/registry";
import { SITE_NAME } from "@/lib/site";
import { BrandMark } from "./BrandMark";
import { LogoBadge } from "./LogoBadge";

const TONE: Record<HeroTone, { panel: string; bar: string; muted: string }> = {
  lime: { panel: "bg-lime text-lime-ink", bar: "bg-ink", muted: "text-lime-ink/70" },
  wash: { panel: "bg-lime-wash text-ink", bar: "bg-ink", muted: "text-muted" },
  azure: { panel: "bg-azure text-white", bar: "bg-white", muted: "text-white/75" },
  ink: { panel: "bg-panel text-white", bar: "bg-lime", muted: "text-white/70" },
};

/**
 * The picture for a blog post, drawn from the register instead of bought from a
 * stock library: starting prices as bars, a cluster of product logos, one large
 * figure, or the mark. It is flat, has no shadow and carries only facts the
 * register holds, so it cannot show a product doing something it does not do.
 * `compact` is the card size.
 */
export function BlogHero({ hero, reg, compact = false }: { hero: BlogHeroSpec; reg: Registry; compact?: boolean }) {
  const t = TONE[hero.tone];
  const pad = compact ? "p-5" : "p-7 md:p-10";
  const frame = `relative flex flex-col justify-between overflow-hidden rounded-[20px] ${t.panel} ${pad} ${compact ? "min-h-[230px]" : "min-h-[320px] md:min-h-[400px]"}`;

  if (hero.kind === "prices") {
    const rows = hero.slugs
      .map((slug) => reg.bySlug.get(slug))
      .filter((s): s is NonNullable<typeof s> => Boolean(s))
      .map((s) => ({ s, p: priceLabel(s) }));
    const max = Math.max(1, ...rows.map(({ s }) => s.price_rand ?? 0));
    return (
      <div className={frame}>
        <p className={`stamp ${t.muted}`}>{hero.caption}</p>
        <ul className={`mt-5 ${compact ? "space-y-2" : "space-y-3.5"}`}>
          {rows.map(({ s, p }) => {
            const width = p.kind === "quoted" ? 0 : p.kind === "free" ? 2 : Math.max(6, Math.round(((s.price_rand ?? 0) / max) * 100));
            return (
              <li key={s.slug} className="flex items-center gap-3">
                <LogoBadge slug={s.slug} name={s.name} size={compact ? 32 : 44} />
                <span className="relative h-3 flex-1 overflow-hidden rounded-full bg-black/10">
                  <span className={`absolute inset-y-0 left-0 rounded-full ${t.bar}`} style={{ width: `${width}%` }} />
                </span>
                <span className={`flex-none text-right font-semibold ${compact ? "w-[84px] text-[12px] leading-4" : "w-[130px] text-[15px] leading-5"}`}>
                  {p.kind === "quoted" ? "On request" : p.kind === "free" ? "Free" : p.amount}
                  {p.basis && p.kind !== "free" && !compact && <span className={`block text-[11px] leading-4 font-normal ${t.muted}`}>{p.basis}</span>}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  if (hero.kind === "logos") {
    return (
      <div className={frame}>
        <ul className="grid grid-cols-3 gap-3 sm:gap-4">
          {hero.slugs.map((slug) => {
            const s = reg.bySlug.get(slug);
            return s ? (
              <li key={slug} className="flex justify-center">
                <LogoBadge slug={s.slug} name={s.name} size={compact ? 56 : 92} />
              </li>
            ) : null;
          })}
        </ul>
        <p className={`mt-6 font-heading font-bold tracking-[-0.02em] ${compact ? "text-[20px] leading-6" : "text-[30px] leading-9 md:text-[40px] md:leading-[44px]"}`}>{hero.caption}</p>
      </div>
    );
  }

  if (hero.kind === "figure") {
    return (
      <div className={frame}>
        <p className={`stamp ${t.muted}`}>{hero.caption}</p>
        <p className={`font-heading font-bold tracking-[-0.04em] ${hero.tone === "ink" ? "text-lime" : ""} ${compact ? "text-[44px] leading-[48px]" : "text-[56px] leading-[60px] md:text-[104px] md:leading-[104px]"}`}>
          {hero.figure}
        </p>
      </div>
    );
  }

  return (
    <div className={frame}>
      <p className={`stamp ${t.muted}`}>{SITE_NAME}</p>
      <div className="flex items-end justify-between gap-6">
        <p className={`font-heading font-bold tracking-[-0.03em] ${compact ? "text-[20px] leading-6" : "text-[30px] leading-9 md:text-[48px] md:leading-[52px]"}`}>{hero.caption}</p>
        <BrandMark size={compact ? 64 : 150} className="flex-none" />
      </div>
    </div>
  );
}
