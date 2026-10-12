/**
 * Writes the Software Register mark and its icons. Run with `node scripts/make-brand.mjs`.
 *
 * The mark is a square cut S built from straight bars, like the rules of a
 * ledger page. Its middle bar is a double rule, the double underline an
 * accountant draws under a grand total, one rule in ink and one in lime.
 * There is no background: the mark sits straight on the page.
 */
import fs from "node:fs";
import sharp from "sharp";

const INK = "#12130f";
const LIME = "#c8f000";
const PAPER = "#fbfbf9";

// All shapes sit in a 44 by 44 box.
const INK_BARS = [
  { x: 4, y: 4, w: 36, h: 8.5 }, // top
  { x: 4, y: 4, w: 8.5, h: 22.25 }, // upper left, down to the foot of the middle rules
  { x: 4, y: 17.75, w: 36, h: 3.5 }, // the ink rule
  { x: 31.5, y: 17.75, w: 8.5, h: 22.25 }, // lower right, from the ink rule to the bottom
  { x: 4, y: 31.5, w: 36, h: 8.5 }, // bottom
];
// The lime rule sits under the ink rule, between the two uprights.
const LIME_RULE = { x: 12.5, y: 22.75, w: 19, h: 3.5 };

const rect = (r, fill, cls = "") => `<rect${cls ? ` class="${cls}"` : ""} x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" fill="${fill}"/>`;
const body = (ink) => INK_BARS.map((r) => rect(r, ink, "i")).join("") + rect(LIME_RULE, LIME);

const svg = (ink, extra = "") => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44" width="44" height="44">${extra}${body(ink)}</svg>\n`;

// The favicon follows the browser theme: ink on a light tab, paper on a dark one.
fs.writeFileSync("app/icon.svg", svg(INK, `<style>@media (prefers-color-scheme: dark){.i{fill:${PAPER}}}</style>`));
fs.mkdirSync("public/brand", { recursive: true });
fs.writeFileSync("public/brand/softwareregister-mark.svg", svg(INK));
fs.writeFileSync("public/brand/softwareregister-mark-light.svg", svg("#ffffff"));

// iOS fills a transparent touch icon with black, so this one alone carries a paper ground.
const touch = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180"><rect width="180" height="180" fill="${PAPER}"/><g transform="translate(30,30) scale(${120 / 44})">${body(INK)}</g></svg>`;
await sharp(Buffer.from(touch)).png().toFile("app/apple-icon.png");

// A proof sheet for a human to look at: light, dark, and the small sizes.
if (process.argv[2]) {
  const cell = (bg, ink, size, x, y) => `<rect x="${x}" y="${y}" width="${size + 40}" height="${size + 40}" fill="${bg}"/><svg x="${x + 20}" y="${y + 20}" width="${size}" height="${size}" viewBox="0 0 44 44">${body(ink)}</svg>`;
  const parts = [];
  let x = 0;
  for (const [bg, ink] of [[PAPER, INK], ["#ffffff", INK], [INK, "#ffffff"], [LIME, INK]]) {
    parts.push(cell(bg, ink, 220, x, 0));
    x += 260;
  }
  x = 0;
  for (const size of [64, 32, 24, 16]) {
    parts.push(cell(PAPER, INK, size, x, 280));
    parts.push(cell(INK, "#ffffff", size, x, 380));
    x += size + 60;
  }
  const sheet = `<svg xmlns="http://www.w3.org/2000/svg" width="1040" height="500"><rect width="1040" height="500" fill="#e9e9e2"/>${parts.join("")}</svg>`;
  await sharp(Buffer.from(sheet)).png().toFile(process.argv[2]);
}
console.log("brand written");
