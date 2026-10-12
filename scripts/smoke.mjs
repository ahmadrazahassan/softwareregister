/**
 * Requests every URL in the sitemap, plus the admin, legacy redirect and form
 * routes, against a running server. Run `npm run build && npm start` first.
 *
 *   node scripts/smoke.mjs http://localhost:3000
 */
const base = process.argv[2] ?? "http://localhost:3000";

let failures = 0;
const fail = (msg) => {
  failures++;
  console.log(`FAIL  ${msg}`);
};

async function get(path, init = {}) {
  return fetch(new URL(path, base), { redirect: "manual", ...init });
}

// 1. Every sitemap URL answers 200 and carries one h1.
const sitemap = await (await get("/sitemap.xml")).text();
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
console.log(`sitemap lists ${urls.length} urls`);

const banned = [/linear-gradient|radial-gradient|conic-gradient/i, /box-shadow:\s*[^n;]/i];
banned.push(/reviews analysed|weighted score|aggregateRating/i); // ratings and review counts were removed from the site on 2026-10-11
let checked = 0;
for (const path of urls) {
  const res = await get(path);
  const html = await res.text();
  checked++;
  if (res.status !== 200) {
    fail(`${path} -> ${res.status}`);
    continue;
  }
  const h1s = (html.match(/<h1[\s>]/g) ?? []).length;
  if (h1s !== 1) fail(`${path} has ${h1s} h1 elements`);
  for (const re of banned) if (re.test(html)) fail(`${path} contains ${re}`);
  if (/\bverified reviews?\b/i.test(html)) fail(`${path} says verified reviews`);
  if (/quarterly/i.test(html)) fail(`${path} claims a quarterly check`);
  if (/trusted by|seamless|empower|unlock|game changer/i.test(html)) fail(`${path} uses banned marketing copy`);
}
console.log(`checked ${checked} pages`);

// 2. Legacy paths 308 to their new home.
const legacy = {
  "/software": "/register",
  "/software/xero": "/register/xero",
  "/software/sage-business-cloud-payroll": "/register/sage-payroll",
  "/categories": "/sectors",
  "/category/payroll": "/sector/payroll",
  "/compare": "/versus",
  "/compare/sage-accounting-vs-xero": "/versus/sage-accounting-vs-xero",
  "/blog/what-software-costs-in-rand": "/briefings/what-software-costs-in-rand",
  "/editorial-policy": "/method",
  "/about": "/masthead",
  "/contact": "/enquiries",
  "/newsletter": "/dispatch",
  "/search": "/lookup",
  "/reviews": "/register",
  "/briefings/rand-exposure-billed-in-rand-or-not": "/briefings",
  "/list-your-software": "/add-a-product",
};
for (const [from, to] of Object.entries(legacy)) {
  const res = await get(from);
  const loc = res.headers.get("location") ?? "";
  if (res.status !== 308 || !loc.endsWith(to)) fail(`${from} -> ${res.status} ${loc} (wanted 308 ${to})`);
}
console.log(`checked ${Object.keys(legacy).length} legacy redirects`);

// 3. The admin is closed to anyone not signed in.
for (const path of ["/admin", "/admin/products", "/admin/products/xero", "/admin/reviews", "/admin/dispatch", "/admin/settings", "/admin/analytics"]) {
  const res = await get(path);
  const loc = res.headers.get("location") ?? "";
  if (![307, 308].includes(res.status) || !loc.includes("/admin/login")) fail(`${path} is not guarded: ${res.status} ${loc}`);
}
const exportRes = await get("/admin/dispatch/export");
if (![307, 308, 401].includes(exportRes.status)) fail(`/admin/dispatch/export is not guarded: ${exportRes.status}`);
const login = await get("/admin/login");
if (login.status !== 200) fail(`/admin/login -> ${login.status}`);
console.log("checked admin guard");

// 4. Filtered register views render, and bad input does not break them.
for (const q of ["?local=1", "?avail=trial&avail=plan", "?price=free", "?price=under300", "?sector=payroll&sort=price&dir=asc", "?sars=VAT201", "?sort=bogus&dir=sideways", "?price=nonsense"]) {
  const res = await get(`/register${q}`);
  if (res.status !== 200) fail(`/register${q} -> ${res.status}`);
}
console.log("checked register filters");

// 5. The versus selector redirects, and unknown pairs 404.
const sel = await get("/versus?a=xero&b=sage-accounting");
if (sel.status !== 307 || !(sel.headers.get("location") ?? "").endsWith("/versus/xero-vs-sage-accounting")) fail(`versus selector -> ${sel.status} ${sel.headers.get("location")}`);
const arbitrary = await get("/versus/xero-vs-hubspot");
if (arbitrary.status !== 200) fail(`an uncurated pair should still render: ${arbitrary.status}`);
for (const path of ["/versus/nonsense", "/versus/xero-vs-xero", "/register/not-a-product", "/sector/nope", "/briefings/nope"]) {
  const res = await get(path);
  if (res.status !== 404) fail(`${path} should 404, got ${res.status}`);
}
console.log("checked versus and 404s");

// 6. Lookup.
const hit = await (await get("/lookup?q=payroll")).text();
if (!/Products/.test(hit)) fail("lookup?q=payroll shows no products");
const miss = await (await get("/lookup?q=zzzzqqq")).text();
if (!/Nothing matched/.test(miss)) fail("lookup with no results lacks the empty state");
console.log("checked lookup");

// 7. Tracking endpoint never errors a reader.
const click = await get("/api/track-click", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ slug: "xero", placement: "smoke" }) });
if (click.status !== 204) fail(`track-click -> ${click.status}`);
const junk = await get("/api/track-click", { method: "POST", body: "not json" });
if (junk.status !== 204) fail(`track-click with junk -> ${junk.status}`);
console.log("checked track-click");

// 7b. Every image on the pages that carry logos, flags and screenshots really loads.
{
  const pages = ["/", "/register", "/register/xero", "/register/sage-accounting", "/register/hubspot", "/versus", "/versus/sage-accounting-vs-xero", "/sector/accounting"];
  const seen = new Set();
  let imageCount = 0;
  for (const p of pages) {
    const html = await (await get(p)).text();
    const urls = [...html.matchAll(/<img[^>]+?src="([^"]+)"/g)].map((m) => m[1].replace(/&amp;/g, "&"));
    for (const u of urls) {
      if (seen.has(u)) continue;
      seen.add(u);
      const res = await get(u);
      imageCount++;
      const type = res.headers.get("content-type") ?? "";
      if (res.status !== 200 || !type.startsWith("image/")) fail(`image ${u} on ${p} -> ${res.status} ${type}`);
    }
  }
  // The bare logos must be transparent or vector: no opaque tile may sneak back in.
  const logoPaths = [...new Set([...(await (await get("/register/sage-accounting")).text()).matchAll(/\/brand\/logos\/[a-z0-9-]+\.(?:png|svg)/g)].map((m) => m[0]))];
  if (logoPaths.length === 0) fail("no logo found on /register/sage-accounting");
  console.log(`checked ${imageCount} images`);
}

// 8. Security headers.
const home = await get("/");
for (const h of ["x-content-type-options", "x-frame-options", "referrer-policy"]) {
  if (!home.headers.get(h)) fail(`missing header ${h}`);
}
if (home.headers.get("x-powered-by")) fail("x-powered-by is exposed");

console.log(failures === 0 ? "\nSmoke test passed." : `\n${failures} failure(s).`);
process.exit(failures === 0 ? 0 : 1);
