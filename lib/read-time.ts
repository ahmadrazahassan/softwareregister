import type { BriefingBlock } from "./types";

/** Words in a body, counting every kind of block. A `live` block reads from the register and has no words of its own. */
export function blockWords(blocks: BriefingBlock[]): number {
  const text = blocks
    .map((b) => {
      if (b.type === "ul" || b.type === "ol") return b.items.join(" ");
      if (b.type === "table") return [...b.head, ...b.rows.flat()].join(" ");
      if (b.type === "live") return "";
      return b.text;
    })
    .join(" ");
  return text.split(/\s+/).filter(Boolean).length;
}

/** Reading time in whole minutes at 200 words a minute, never under two. */
export function readTime(blocks: BriefingBlock[], standfirst = ""): number {
  return Math.max(2, Math.round((blockWords(blocks) + standfirst.split(/\s+/).filter(Boolean).length) / 200));
}
