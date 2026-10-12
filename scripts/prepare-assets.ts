/**
 * Prepares the logos and screenshots in /public for the site.
 *
 *   npm run assets
 *
 * What it does, for every product on the register:
 *
 * 1. Picks the best source logo. The table in SOURCES below decides for the products listed there.
 *    For any other product, a file named exactly `public/logos/{slug}.(svg|png|webp)` is used, so
 *    dropping a new logo in is enough. A vector (SVG) beats a bitmap, because it is sharp at any size.
 * 2. Removes a white or transparent background that touches the edge of the image, so the
 *    logo can sit straight on the page with no tile behind it. White that is part of the
 *    artwork, such as the letters inside the Xero mark, is left alone.
 * 3. Trims the empty margin and smooths small bitmaps up to a usable size.
 * 4. Writes the result to public/brand/logos/{slug}.(svg|png). The originals are never touched.
 * 5. Writes lib/data/assets.generated.ts, the manifest the site reads: every logo's size and
 *    every product's screenshots.
 *
 * A product with no source logo gets no entry, and the site shows its name as a wordmark.
 * It never invents a logo.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { SOFTWARE } from "../lib/data/software";

const PUBLIC = path.resolve("public");
const OUT_DIR = path.join(PUBLIC, "brand", "logos");
const MANIFEST = path.resolve("lib/data/assets.generated.ts");

/** Product slug to candidate source files under /public, best first. */
const SAGE_WORDMARK = "integrations/sage-accounting.svg";
const SOURCES: Record<string, string[]> = {
  "sage-accounting": [SAGE_WORDMARK],
  "sage-50cloud-pastel": [SAGE_WORDMARK],
  "sage-intacct": [SAGE_WORDMARK],
  "sage-payroll": [SAGE_WORDMARK],
  "sage-pastel-payroll": [SAGE_WORDMARK],
  "sage-hr": [SAGE_WORDMARK],
  "sage-crm": [SAGE_WORDMARK],
  "sage-200-evolution": [SAGE_WORDMARK],
  "sage-x3": [SAGE_WORDMARK],
  xero: ["integrations/xero.svg", "logos/xero.png"],
  "quickbooks-online": ["integrations/quickbooks-online.svg", "logos/quickbooks-online.png"],
  "zoho-books": ["integrations/zoho-books.svg", "logos/zoho-books.png"],
  "zoho-crm": ["integrations/zoho-books.svg", "logos/zoho-crm.png"],
  hubspot: ["logos/hubspot.png"],
  freshsales: ["logos/freshsales.png"],
  asana: ["logos/asana.png"],
  clickup: ["logos/clickup.png"],
  "monday-com": ["logos/monday-com.png"],
  trello: ["logos/trello.png"],
  pipedrive: ["logos/pipedrive.png"],
  payspace: ["logos/payspace.png"],
  netsuite: ["logos/netsuite.png"],
  simplepay: ["logos/simplepay.png", "integrations/simplepay.co.za.png"],
  syspro: ["logos/syspro.png"],
  bamboohr: ["logos/bamboohr.png"],
  odoo: ["logos/odoo.png"],
  "salesforce-sales-cloud": ["logos/salesforce.png", "integrations/salesforce.png"],
  "sap-business-one": ["logos/sap-business-one.png", "integrations/sap.com.png"],
};

/**
 * Logos that are a colour tile with a white mark on it, where the real brand mark is just the colour.
 * The white becomes transparency and the tile colour becomes the ink, leaving the bare mark.
 */
const BARE_MARK = new Set(["hubspot"]);

interface Entry {
  src: string;
  width: number;
  height: number;
  /** Height of the artwork before smoothing it up, so the site can avoid blowing a 32px logo up past what it can bear. Vectors have none. */
  native?: number;
}

/** Some files are really a Windows icon with a .png name. Decode the biggest BMP frame by hand. */
function decodeIco(buf: Buffer): { data: Buffer; width: number; height: number } | null {
  if (buf.readUInt16LE(0) !== 0 || buf.readUInt16LE(2) !== 1) return null;
  const count = buf.readUInt16LE(4);
  let best: { w: number; h: number; size: number; offset: number } | null = null;
  for (let i = 0; i < count; i++) {
    const o = 6 + i * 16;
    const w = buf[o] || 256;
    const h = buf[o + 1] || 256;
    const size = buf.readUInt32LE(o + 8);
    const offset = buf.readUInt32LE(o + 12);
    if (!best || w > best.w) best = { w, h, size, offset };
  }
  if (!best) return null;
  const hdr = best.offset;
  const headerSize = buf.readUInt32LE(hdr);
  const bpp = buf.readUInt16LE(hdr + 14);
  if (bpp !== 32 || headerSize < 40) return null;
  const { w, h } = best;
  const pixels = hdr + headerSize;
  const out = Buffer.alloc(w * h * 4);
  for (let y = 0; y < h; y++) {
    const srcRow = pixels + (h - 1 - y) * w * 4; // BMP rows run bottom to top
    for (let x = 0; x < w; x++) {
      const s = srcRow + x * 4;
      const d = (y * w + x) * 4;
      out[d] = buf[s + 2];
      out[d + 1] = buf[s + 1];
      out[d + 2] = buf[s];
      out[d + 3] = buf[s + 3];
    }
  }
  return { data: out, width: w, height: h };
}

/** Flood fills in from the border and makes background pixels transparent. */
function removeEdgeBackground(data: Buffer, W: number, H: number): void {
  const isBg = (i: number) => {
    const a = data[i + 3];
    if (a < 20) return true;
    return a > 200 && Math.min(data[i], data[i + 1], data[i + 2]) >= 236;
  };
  const seen = new Uint8Array(W * H);
  const queue: number[] = [];
  const push = (x: number, y: number) => {
    const p = y * W + x;
    if (seen[p] || !isBg(p * 4)) return;
    seen[p] = 1;
    queue.push(p);
  };
  for (let x = 0; x < W; x++) {
    push(x, 0);
    push(x, H - 1);
  }
  for (let y = 0; y < H; y++) {
    push(0, y);
    push(W - 1, y);
  }
  while (queue.length) {
    const p = queue.pop()!;
    const x = p % W;
    const y = (p - x) / W;
    if (x > 0) push(x - 1, y);
    if (x < W - 1) push(x + 1, y);
    if (y > 0) push(x, y - 1);
    if (y < H - 1) push(x, y + 1);
  }
  for (let p = 0; p < W * H; p++) if (seen[p]) data[p * 4 + 3] = 0;

  // Soften the fringe: a light pixel that touches the removed area fades out in proportion to how white it is.
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const p = y * W + x;
      if (seen[p]) continue;
      const touches =
        (x > 0 && seen[p - 1]) || (x < W - 1 && seen[p + 1]) || (y > 0 && seen[p - W]) || (y < H - 1 && seen[p + W]);
      if (!touches) continue;
      const m = Math.min(data[p * 4], data[p * 4 + 1], data[p * 4 + 2]);
      if (m > 200) data[p * 4 + 3] = Math.round(((235 - Math.min(m, 235)) / 35) * data[p * 4 + 3]);
    }
  }
}

/** White on a coloured tile becomes the colour on transparency. The tile colour is read from the top left pixel. */
function tileToBareMark(data: Buffer, W: number): void {
  const off = (3 * W + 3) * 4;
  const [tr, tg, tb] = [data[off], data[off + 1], data[off + 2]];
  // The channel that differs most from white gives the cleanest measure of how far a pixel is from the tile colour.
  const ch = [tr, tg, tb].indexOf(Math.min(tr, tg, tb));
  const base = [tr, tg, tb][ch];
  for (let i = 0; i < data.length; i += 4) {
    const t = Math.max(0, Math.min(1, (data[i + ch] - base) / (255 - base)));
    data[i] = tr;
    data[i + 1] = tg;
    data[i + 2] = tb;
    data[i + 3] = Math.round(255 * t * (data[i + 3] / 255));
  }
}

function findSource(slug: string): string | null {
  for (const ext of ["svg", "png", "webp"]) {
    const exact = path.join(PUBLIC, "logos", `${slug}.${ext}`);
    // An exact name wins, but only a file the user dropped in for this slug, not a shared product icon.
    if (fs.existsSync(exact) && !SOURCES[slug]) return exact;
  }
  for (const rel of SOURCES[slug] ?? []) {
    const p = path.join(PUBLIC, rel);
    if (fs.existsSync(p)) return p;
  }
  return null;
}

function svgSize(text: string): { width: number; height: number } {
  const vb = text.match(/viewBox="([\d.\s-]+)"/);
  if (vb) {
    const [, , w, h] = vb[1].trim().split(/\s+/).map(Number);
    if (w > 0 && h > 0) return { width: w, height: h };
  }
  const w = Number(text.match(/\bwidth="([\d.]+)/)?.[1]);
  const h = Number(text.match(/\bheight="([\d.]+)/)?.[1]);
  return w > 0 && h > 0 ? { width: w, height: h } : { width: 24, height: 24 };
}

/**
 * Crops an SVG's viewBox to the artwork. Many logos are drawn inside a square
 * canvas with empty margin, which makes a wordmark look small and off centre
 * when the box is sized to the logo. Rendering it once and measuring the ink
 * gives the true bounds.
 */
async function tightenSvg(text: string): Promise<{ text: string; width: number; height: number }> {
  const vb = text.match(/viewBox="([\d.\s-]+)"/);
  if (!vb) {
    const { width, height } = svgSize(text);
    return { text, width, height };
  }
  const [vx, vy, vw, vh] = vb[1].trim().split(/\s+/).map(Number);
  const target = 1200;
  const scale = target / vw;
  const { data, info } = await sharp(Buffer.from(text), { density: (72 * target) / vw })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  let minX = info.width, minY = info.height, maxX = -1, maxY = -1;
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      if (data[(y * info.width + x) * 4 + 3] > 12) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX < 0) return { text, width: vw, height: vh };
  const pad = 2; // a hair of margin so anti aliased edges are not clipped
  const x0 = Math.max(0, minX - pad);
  const y0 = Math.max(0, minY - pad);
  const w = Math.min(info.width, maxX + pad + 1) - x0;
  const h = Math.min(info.height, maxY + pad + 1) - y0;
  const round = (n: number) => Math.round(n * 1000) / 1000;
  const nx = round(vx + x0 / scale);
  const ny = round(vy + y0 / scale);
  const nw = round(w / scale);
  const nh = round(h / scale);
  return { text: text.replace(vb[0], `viewBox="${nx} ${ny} ${nw} ${nh}"`), width: nw, height: nh };
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  for (const f of fs.readdirSync(OUT_DIR)) fs.rmSync(path.join(OUT_DIR, f));

  const logos: Record<string, Entry> = {};
  const missing: string[] = [];

  for (const s of SOFTWARE) {
    const src = findSource(s.slug);
    if (!src) {
      missing.push(s.slug);
      continue;
    }

    if (src.endsWith(".svg")) {
      const tight = await tightenSvg(fs.readFileSync(src, "utf8"));
      fs.writeFileSync(path.join(OUT_DIR, `${s.slug}.svg`), tight.text);
      logos[s.slug] = { src: `/brand/logos/${s.slug}.svg`, width: tight.width, height: tight.height };
      continue;
    }

    const file = fs.readFileSync(src);
    let raw: { data: Buffer; width: number; height: number };
    const ico = decodeIco(file);
    if (ico) {
      raw = ico;
    } else {
      const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
      raw = { data, width: info.width, height: info.height };
    }

    if (BARE_MARK.has(s.slug)) tileToBareMark(raw.data, raw.width);
    removeEdgeBackground(raw.data, raw.width, raw.height);

    // Trim the transparent margin.
    let minX = raw.width, minY = raw.height, maxX = -1, maxY = -1;
    for (let y = 0; y < raw.height; y++) {
      for (let x = 0; x < raw.width; x++) {
        if (raw.data[(y * raw.width + x) * 4 + 3] > 10) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }
    if (maxX < 0) {
      missing.push(s.slug);
      continue;
    }
    const cropW = maxX - minX + 1;
    const cropH = maxY - minY + 1;

    let pipeline = sharp(raw.data, { raw: { width: raw.width, height: raw.height, channels: 4 } }).extract({
      left: minX,
      top: minY,
      width: cropW,
      height: cropH,
    });
    // Smooth small bitmaps up so they stay clean at 64 to 96px, and cap very large ones.
    const targetH = cropH < 256 ? 256 : cropH > 512 ? 512 : cropH;
    if (targetH !== cropH) pipeline = pipeline.resize({ height: targetH, kernel: "lanczos3" });

    const out = await pipeline.png({ compressionLevel: 9 }).toBuffer({ resolveWithObject: true });
    fs.writeFileSync(path.join(OUT_DIR, `${s.slug}.png`), out.data);
    logos[s.slug] = { src: `/brand/logos/${s.slug}.png`, width: out.info.width, height: out.info.height, native: cropH };
  }

  // Screenshots: public/screenshots/{slug}-{n}.png
  const screenshots: Record<string, Entry[]> = {};
  const shotDir = path.join(PUBLIC, "screenshots");
  if (fs.existsSync(shotDir)) {
    const files = fs.readdirSync(shotDir);
    for (const s of SOFTWARE) {
      const mine = files
        .map((f) => ({ f, m: f.match(new RegExp(`^${s.slug}-(\\d+)\\.(png|jpe?g|webp)$`)) }))
        .filter((x) => x.m)
        .sort((a, b) => Number(a.m![1]) - Number(b.m![1]));
      for (const { f } of mine) {
        const meta = await sharp(path.join(shotDir, f)).metadata();
        (screenshots[s.slug] ??= []).push({ src: `/screenshots/${f}`, width: meta.width ?? 1280, height: meta.height ?? 800 });
      }
    }
  }

  const header = `/**\n * GENERATED by scripts/prepare-assets.ts. Do not edit by hand. Run \`npm run assets\`.\n */\n`;
  const body =
    `export interface AssetEntry {\n  src: string;\n  width: number;\n  height: number;\n  /** Height of the artwork before smoothing. Vectors have none. */\n  native?: number;\n}\n\n` +
    `/** Products that have a logo. Anything missing here is shown as a wordmark. */\n` +
    `export const LOGOS: Record<string, AssetEntry> = ${JSON.stringify(logos, null, 2)};\n\n` +
    `export const SCREENSHOTS: Record<string, AssetEntry[]> = ${JSON.stringify(screenshots, null, 2)};\n`;
  fs.writeFileSync(MANIFEST, header + body);

  console.log(`logos        ${Object.keys(logos).length} of ${SOFTWARE.length} products`);
  console.log(`screenshots  ${Object.values(screenshots).reduce((n, a) => n + a.length, 0)} across ${Object.keys(screenshots).length} products`);
  console.log(`no logo      ${missing.join(", ")}`);
}

main();
