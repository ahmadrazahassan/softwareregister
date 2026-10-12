"use client";

import { Play } from "lucide-react";
import { useState } from "react";

export interface VideoItem {
  id: string;
  label: string;
  channel: string;
  channelUrl: string;
  /** 1:52 */
  duration: string;
  /** March 2026 */
  published: string;
  kind: string;
  sa: boolean;
}

const thumb = (id: string, size: "hq" | "mq") => `https://i.ytimg.com/vi/${id}/${size}default.jpg`;

/**
 * The vendor's own YouTube videos for a product. Nothing is requested from
 * YouTube's player until a reader presses play: the picture is a still, and the
 * player is added to the page only then, from the no cookie address. Every video
 * has its title, its channel, its length and the day it was published in text.
 */
export function VideoGallery({ items, productName }: { items: VideoItem[]; productName: string }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState<string | null>(null);
  const v = items[active];
  const isPlaying = playing === v.id;

  return (
    <div className={items.length > 1 ? "grid gap-6 lg:grid-cols-[1.7fr_1fr]" : ""}>
      <div>
        <div className="relative aspect-video overflow-hidden rounded-[16px] border border-line-firm bg-panel">
          {isPlaying ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0`}
              title={`${productName}: ${v.label}, from ${v.channel}`}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              className="absolute inset-0 h-full w-full border-0"
            />
          ) : (
            <button type="button" onClick={() => setPlaying(v.id)} aria-label={`Play: ${v.label}, ${v.duration}`} className="group absolute inset-0 block h-full w-full cursor-pointer">
              {/* A still from YouTube's own image servers. It is not run through the site's image optimiser on purpose. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={thumb(v.id, "hq")} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-lime text-lime-ink transition-transform group-hover:scale-105 md:h-[72px] md:w-[72px]">
                  <Play size={26} strokeWidth={0} fill="currentColor" aria-hidden="true" className="ml-1" />
                </span>
              </span>
              <span className="absolute bottom-3 left-3 rounded-full bg-surface px-2.5 py-1 text-[12px] leading-4 font-semibold">{v.duration}</span>
            </button>
          )}
        </div>
        <div className="mt-4">
          <p className="font-heading text-[19px] leading-6 font-bold tracking-[-0.01em]">{v.label}</p>
          <p className="mt-1 text-[14px] leading-5 text-muted">
            {v.kind}, {v.duration}, published {v.published}. From the{" "}
            <a href={v.channelUrl} target="_blank" rel="noopener noreferrer" className="prose-link">
              {v.channel}
            </a>{" "}
            channel on YouTube.
            {v.sa && <span className="ml-2 inline-flex rounded-full border border-lime-deep/30 bg-lime-wash px-2.5 py-0.5 text-[12px] leading-4 font-semibold text-ink">Made for South Africa</span>}
          </p>
        </div>
      </div>

      {items.length > 1 && (
        <ul className="space-y-2" aria-label={`More videos about ${productName}`}>
          {items.map((it, i) => (
            <li key={it.id}>
              <button
                type="button"
                aria-pressed={i === active}
                onClick={() => setActive(i)}
                className={`flex w-full cursor-pointer items-start gap-3 rounded-[12px] border p-2.5 text-left ${i === active ? "border-lime-deep bg-lime-wash" : "border-line-firm bg-surface hover:bg-lime-wash"}`}
              >
                <span className="relative block aspect-video w-[112px] flex-none overflow-hidden rounded-[8px] bg-panel">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={thumb(it.id, "mq")} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
                  <span className="absolute right-1.5 bottom-1.5 rounded-full bg-surface px-1.5 py-0.5 text-[11px] leading-3 font-semibold">{it.duration}</span>
                </span>
                <span className="min-w-0">
                  <span className="block text-[14px] leading-5 font-semibold">{it.label}</span>
                  <span className="mt-0.5 block text-[12px] leading-4 text-muted">{it.kind}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
