/**
 * Checks the bundled dataset against the figures read from the vendors' own
 * pages on 5 and 11 October 2026. Run with `npm run verify`. Exits non zero if
 * any check fails, so it can sit in CI. A figure that the vendor's page states
 * and the data cannot reproduce is a bug in the data.
 */
import { BLOG_POSTS } from "../lib/data/blog";
import { buildListDefs, resolveLists } from "../lib/lists";
import { BRIEFINGS } from "../lib/data/briefings";
import { COMPARISONS } from "../lib/data/comparisons";
import { LOGOS } from "../lib/data/assets.generated";
import { SA_AVAILABILITY } from "../lib/data/availability";
import { getEditorialComparison } from "../lib/data/editorial";
import { BANKS, LEGAL_ITEMS, SARS_ITEMS, SARS_TRANSFER_ITEMS, SECTORS } from "../lib/data/sectors";
import { allProfiles } from "../lib/data/profiles";
import { PROFILE_SECTIONS } from "../lib/data/profiles/sections";
import { SOFTWARE } from "../lib/data/software";
import { CHANNELS, OFFICIAL_CHANNELS, PRODUCT_VIDEOS } from "../lib/data/videos";
import { readFileSync } from "node:fs";
import { GUIDE_HEROES, GUIDE_ORDER } from "../lib/data/guide-heroes";
import { DEPTH_UNMATCHED } from "../lib/data/briefings";
import { pricingLink } from "../lib/affiliates";
import { ALL_FAQS } from "../lib/data/faq";
import { GLOSSARY, glossarySlug } from "../lib/data/glossary";
import { MAX_ALTERNATIVES, MAX_REASONS, REASONS, REVIEW_LIMITS, TIME_USED } from "../lib/review-options";
import { buildRegistry, buildSummary, computeStats } from "../lib/registry";
import { priceText } from "../lib/format";

let failures = 0;
function check(name: string, actual: unknown, expected: unknown) {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  if (!ok) failures++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${ok ? "" : `  expected ${JSON.stringify(expected)} got ${JSON.stringify(actual)}`}`);
}

const reg = buildRegistry(SOFTWARE);
const stats = computeStats(reg, { sectors: SECTORS.length, comparisons: COMPARISONS.length, briefings: BRIEFINGS.length });

console.log("\n-- The data --");
check("37 products", stats.products, 37);
check("6 sectors", stats.sectors, 6);
check("15 comparisons", stats.comparisons, 15);

const bySector = Object.fromEntries(SECTORS.map((s) => [s.slug, reg.items.filter((x) => x.sector === s.slug).length]));
check("Accounting 8", bySector.accounting, 8);
check("ERP 7", bySector.erp, 7);
check("Payroll 5", bySector.payroll, 5);
check("HR 5", bySector.hr, 5);
check("CRM 6", bySector.crm, 6);
check("Project management 6", bySector["project-management"], 6);

check("14 priced products", stats.priced, 14);
check("11 free products", stats.free, 11);
check("12 products with the price on request", stats.quoted, 12);
check("last read 2026-10-11", stats.lastChecked, "2026-10-11");

const price = (slug: string) => priceText(reg.bySlug.get(slug)!).replace(/[  ]/g, " ");
check("Sage Accounting price", price("sage-accounting"), "R270 /mo incl VAT");
check("Sage 50cloud Pastel price", price("sage-50cloud-pastel"), "R1 375 /mo excl VAT");
check("Sage Payroll price", price("sage-payroll"), "R97 /mo incl VAT");
check("Sage HR price", price("sage-hr"), "R28 /employee /mo");
check("Xero price", price("xero"), "R450 /mo incl VAT");
check("QuickBooks Online price", price("quickbooks-online"), "R322 /mo");
check("Smartsheet price", price("smartsheet"), "R170 /user /mo");
check("SimplePay price", price("simplepay"), "R23.55 /employee /mo");
check("Pipedrive price", price("pipedrive"), "USD 14 /user /mo");
check("FreshBooks price", price("freshbooks"), "USD 23 /mo");
check("PeopleHR price", price("peoplehr"), "GBP 3 /employee /mo");
check("Zoho Books starts free", reg.bySlug.get("zoho-books")!.starting_price, 0);
check("PaySpace gives its price in a demo", reg.bySlug.get("payspace")!.starting_price, null);

console.log("\n-- No ratings, no ranking --");
const carries = (key: string) => reg.items.some((s) => key in s);
check("no product carries a rating, a review count or a sub rating", ["rating", "review_count", "subratings"].some(carries), false);
check("no product carries a rank or a score", ["rank", "score"].some(carries), false);
check("the register is in alphabetical order", reg.items.map((s) => s.name), [...reg.items.map((s) => s.name)].sort((a, b) => a.localeCompare(b, "en-ZA")));

console.log("\n-- Integrity --");
check("slugs are unique", new Set(SOFTWARE.map((s) => s.slug)).size, SOFTWARE.length);
check("every comparison references real slugs", COMPARISONS.every((c) => reg.bySlug.has(c.a) && reg.bySlug.has(c.b)), true);
check("comparison pair slugs are unique", new Set(COMPARISONS.map((c) => c.slug)).size, COMPARISONS.length);
check("every briefing product slug exists", BRIEFINGS.every((b) => b.product_slugs.every((s) => reg.bySlug.has(s))), true);
check("briefing slugs are unique", new Set(BRIEFINGS.map((b) => b.slug)).size, BRIEFINGS.length);
check("every Sage product carries the Sage affiliate link", SOFTWARE.filter((s) => /^Sage\b/.test(s.vendor)).every((s) => s.affiliate_url === "https://sagesouthafrica.pxf.io/dyq0qK"), true);
check("no non Sage product carries an affiliate link", SOFTWARE.filter((s) => !/^Sage\b/.test(s.vendor)).every((s) => s.affiliate_url === null), true);
check("every read date is one of the two real dates", SOFTWARE.every((s) => s.price_checked_at === null || ["2026-10-05", "2026-10-11"].includes(s.price_checked_at)), true);
const knownCompliance = new Set<string>([...SARS_ITEMS, ...SARS_TRANSFER_ITEMS, ...LEGAL_ITEMS]);
check("every compliance item is one the register knows", SOFTWARE.every((s) => (s.compliance ?? []).every((c) => knownCompliance.has(c))), true);
check("every bank feed is a bank the register knows", SOFTWARE.every((s) => (s.bank_feeds ?? []).every((b) => (BANKS as readonly string[]).includes(b))), true);
check("every product has a real logo", SOFTWARE.every((s) => Boolean(LOGOS[s.slug])), true);
check("every product has features from its vendor", SOFTWARE.every((s) => s.features.length > 0), true);

console.log("\n-- Copy rules --");
// Prose only. Slugs and href targets legitimately contain hyphens, so strip markdown link targets first.
const prose = JSON.stringify([
  BRIEFINGS.map((b) => [b.title, b.standfirst, b.body]),
  SOFTWARE.map((s) => [s.summary, s.pricing_note, s.features]),
  SECTORS.map((s) => s.description),
]).replace(/\]\([^)]*\)/g, "]");
const dash = prose.match(/[‐-―−]| - | -- /g);
check("no dashes in briefing, summary or sector copy", dash, null);
const hyphenated = [...prose.matchAll(/\b[A-Za-z]+-[A-Za-z]+\b/g)].map((m) => m[0]);
check("no hyphenated words in briefing, summary or sector copy", hyphenated, []);

console.log("\n-- Editorial --");
check("every curated comparison has a detailed write up", COMPARISONS.every((p) => Boolean(getEditorialComparison(p.slug))), true);
const editorialProse = JSON.stringify(
  COMPARISONS.map((p) => {
    const e = getEditorialComparison(p.slug);
    return e && [e.headline, e.summary, e.chooseA, e.chooseB, e.glance, e.sections, e.verdict];
  }),
);
check("no dashes in comparisons", editorialProse.match(/[‐-―−]| - | -- /g), null);
check("no banned marketing words in comparisons", editorialProse.match(/trusted by|seamless|empower|unlock|game changer/i), null);
check("no hyphenated words in comparisons", [...editorialProse.matchAll(/\b[A-Za-z]+-[A-Za-z]+\b/g)].map((m) => m[0]), []);
check("no comparison leans on a rating, a rank or a review count", editorialProse.match(/weighted score|ranks? (first|higher)|top ranked|reviews analysed|rated \d/i), null);

console.log("\n-- Blog --");
const blogProse = JSON.stringify(BLOG_POSTS.map((p) => [p.title, p.standfirst, p.body, p.hero.caption, p.hero.kind === "figure" ? p.hero.figure : ""])).replace(/\]\([^)]*\)/g, "]");
check("blog slugs are unique", new Set(BLOG_POSTS.map((p) => p.slug)).size, BLOG_POSTS.length);
check("every blog post names real products", BLOG_POSTS.every((p) => p.product_slugs.every((s) => reg.bySlug.has(s))), true);
check(
  "every blog hero names real products",
  BLOG_POSTS.every((p) => (p.hero.kind === "prices" || p.hero.kind === "logos" ? p.hero.slugs.every((s) => reg.bySlug.has(s)) : true)),
  true,
);
check("no dashes in blog copy", blogProse.match(/[\u2010-\u2015\u2212]| - | -- /g), null);
check("no hyphenated words in blog copy", [...blogProse.matchAll(/\b[A-Za-z]+-[A-Za-z]+\b/g)].map((m) => m[0]), []);
check("no banned marketing words in blog copy", blogProse.match(/trusted by|seamless|empower|unlock|game changer/i), null);
check("no billing currency talk in blog copy", blogProse.match(/billed in|bills in (dollars|pounds|euros)|billing currency|exposure|unchecked/i), null);
check("no dollar or pound figures in blog copy", blogProse.match(/[$£€]\s?\d/), null);

console.log("\n-- In depth reviews --");
const profiles = allProfiles();
check("every product has an in depth review", SOFTWARE.every((s) => profiles.some((p) => p.slug === s.slug)), true);
check("review slugs are unique and real", profiles.length === new Set(profiles.map((p) => p.slug)).size && profiles.every((p) => reg.bySlug.has(p.slug)), true);
const planNames = (slug: string) => new Set((reg.bySlug.get(slug)?.pricing_plans ?? []).map((p) => p.name));
check(
  "every review names plans that exist in the record",
  profiles.every((p) => [...(p.billing ?? []).map((b) => b.plan), ...(p.seatRules ?? []).map((r) => r.plan), ...(p.basePlans ?? [])].every((n) => planNames(p.slug).has(n))),
  true,
);
check("monthly billing is never below yearly billing", profiles.every((p) => (p.billing ?? []).every((b) => b.monthly >= b.yearly && b.yearly > 0)), true);
check("add on prices are positive", profiles.every((p) => (p.addOns ?? []).every((a) => a.monthly > 0 && (a.yearly === undefined || (a.yearly > 0 && a.yearly <= a.monthly)))), true);
check(
  "payroll bands rise with headcount and price",
  profiles.every((p) => {
    const finite = (p.bands ?? []).filter((b) => b.upTo !== null && b.monthly !== null);
    return finite.every((b, i) => i === 0 || ((b.upTo as number) > (finite[i - 1].upTo as number) && (b.monthly as number) >= (finite[i - 1].monthly as number)));
  }),
  true,
);
check(
  "every review has sources over https and a real date",
  profiles.every((p) => (p.sources ?? []).length > 0 && (p.sources ?? []).every((s) => s.url.startsWith("https://")) && !Number.isNaN(Date.parse(p.researchedAt))),
  true,
);
check("every review has strengths, limits, FAQs and a verdict", profiles.every((p) => p.pros.length >= 3 && p.cons.length >= 2 && (p.faqs ?? []).length >= 1 && p.verdict.length > 40 && p.stats.length >= 4), true);
const profileProse = JSON.stringify([
  profiles.map((p) => [p.headline, p.summary, p.bestFor, p.thinkTwice, p.pros, p.cons, p.stats, p.faqs, p.verdict, p.addOns, p.billing, p.bands, p.sections, p.moreSections]),
  Object.values(PROFILE_SECTIONS),
]);
check("no dashes in review copy", profileProse.match(/[‐-―−]| - | -- /g), null);
check("no hyphenated words in review copy", [...profileProse.matchAll(/\b[A-Za-z]+-[A-Za-z]+\b/g)].map((m) => m[0]), []);
check("no banned marketing words in review copy", profileProse.match(/trusted by|seamless|empower|unlock|game changer/i), null);
check(
  "no billing currency or exchange rate exposure talk in review copy",
  profileProse.match(/billed in|bills in (dollars|pounds|euros|usd|gbp|eur|a foreign)|billing currency|rand exposure|exchange rate|exposure|unhedged|unchecked|not yet checked/i),
  null,
);
check("no dollar, pound or euro figures in review copy", profileProse.match(/[$£€]\s?\d/), null);
check("no unsupported wording in review copy", profileProse.match(/not built for south africa|unsupported/i), null);
check("no review leans on a rating, a rank or a review count", profileProse.match(/weighted score|ranks? (first|higher)|top ranked|reviews analysed|rated \d|\bstars?\b/i), null);

console.log("\n-- Guides --");
const guideSlugs = new Set(BRIEFINGS.map((b) => b.slug));
const guideText = (b: (typeof BRIEFINGS)[number]) => JSON.stringify([b.standfirst, b.body]);
const brokenGuideLinks = BRIEFINGS.flatMap((b) =>
  [...guideText(b).matchAll(/\]\((\/[^)\s"]+)\)/g)]
    .map((m) => m[1])
    .filter((href) => {
      if (href.startsWith("/briefings/")) return !guideSlugs.has(href.slice("/briefings/".length));
      if (href.startsWith("/sector/")) return !SECTORS.some((s) => s.slug === href.slice("/sector/".length));
      if (href.startsWith("/register/")) return !reg.bySlug.has(href.split("/")[2]);
      if (href.startsWith("/lists/")) return !resolveLists(reg.items).some((l) => l.def.slug === href.slice("/lists/".length));
      if (href.startsWith("/blog/")) return !BLOG_POSTS.some((p) => p.slug === href.slice("/blog/".length));
      return !["/method", "/register", "/dispatch", "/briefings", "/blog", "/lists", "/finder", "/shortlist", "/glossary", "/faq", "/vendors", "/review-guidelines", "/suggest-a-correction", "/write-a-review", "/add-a-product", "/enquiries"].includes(href);
    })
    .map((href) => `${b.slug} -> ${href}`),
);
check("every link inside a guide goes somewhere real", brokenGuideLinks, []);
check("20 guides", BRIEFINGS.length, 20);
check("every extra section found its place in its guide", DEPTH_UNMATCHED, []);
check("every guide is a pricing, buying or compliance guide", BRIEFINGS.every((b) => ["Pricing", "Buying", "Compliance"].includes(b.topic)), true);
check("every guide has at least three sections and is not a stub", BRIEFINGS.every((b) => b.body.filter((x) => x.type === "h2").length >= 3 || b.slug === "bcea-leave-what-hr-software-must-accrue"), true);
check("every guide takes at least three minutes to read", BRIEFINGS.every((b) => b.read_minutes >= 3), true);
check("the guide order names only guides that exist", GUIDE_ORDER.every((s) => guideSlugs.has(s)) && GUIDE_ORDER.length === BRIEFINGS.length, true);
check("every guide with a picture names real products", Object.entries(GUIDE_HEROES).every(([slug, h]) => guideSlugs.has(slug) && (h.kind === "prices" || h.kind === "logos" ? h.slugs.every((s) => reg.bySlug.has(s)) : true)), true);
const guideProse = JSON.stringify(BRIEFINGS.map((b) => [b.title, b.standfirst, b.body]));
check("no dollar, pound or euro figures in guides", guideProse.match(/[$£€]\s?\d/), null);
check("no ratings, ranks or scores in guides", guideProse.match(/weighted score|ranks? (first|higher)|top ranked|best accounting|best payroll|\bstars?\b/i), null);

console.log("\n-- Lists --");
const resolved = resolveLists(reg.items);
const listProse = JSON.stringify(buildListDefs().map((d) => [d.title, d.short, d.description, d.rule, d.asks, d.faqs]));
check("list slugs are unique", new Set(buildListDefs().map((d) => d.slug)).size, buildListDefs().length);
check("at least 20 lists hold products", resolved.length >= 20, true);
check("every list names guides that exist", resolved.every((l) => l.def.guides.every((g) => guideSlugs.has(g))), true);
check("every list holds at least one product", resolved.every((l) => l.items.length >= 1), true);
check("no dashes or hyphenated words in list copy", [listProse.match(/[‐-―−]| - | -- /g), [...listProse.matchAll(/\b[A-Za-z]+-[A-Za-z]+\b/g)].map((m) => m[0])], [null, []]);
check("no banned marketing words in list copy", listProse.match(/trusted by|seamless|empower|unlock|game changer/i), null);

console.log("\n-- Glossary and FAQ --");
const glossaryProse = JSON.stringify(GLOSSARY.map((g) => [g.term, g.full, g.meaning, g.applies, (g.links ?? []).map((l) => l.label)]));
const faqProse = JSON.stringify(ALL_FAQS.map((f) => [f.q, f.a, f.link?.label]));
const knownPages = (href: string) => {
  if (href.startsWith("/briefings/")) return guideSlugs.has(href.slice("/briefings/".length));
  if (href.startsWith("/lists/")) return resolved.some((l) => l.def.slug === href.slice("/lists/".length));
  if (href.startsWith("/blog/")) return BLOG_POSTS.some((p) => p.slug === href.slice("/blog/".length));
  return ["/method", "/register", "/dispatch", "/briefings", "/blog", "/lists", "/finder", "/shortlist", "/glossary", "/faq", "/vendors", "/review-guidelines", "/suggest-a-correction", "/write-a-review", "/add-a-product", "/enquiries", "/affiliate-disclosure", "/privacy-policy"].includes(href);
};
check("glossary terms are unique, with unique anchors", new Set(GLOSSARY.map((g) => g.term)).size === GLOSSARY.length && new Set(GLOSSARY.map((g) => glossarySlug(g.term))).size === GLOSSARY.length, true);
check("the glossary covers the terms South African buyers search for", ["VAT201", "EMP201", "EMP501", "IRP5", "IT3(a)", "e@syFile", "UIF", "SDL", "ETI", "COIDA", "BCEA", "CCMA", "POPIA"].every((t) => GLOSSARY.some((g) => g.term === t)), true);
check("every glossary and FAQ link goes somewhere real", [...GLOSSARY.flatMap((g) => g.links ?? []), ...ALL_FAQS.flatMap((f) => (f.link ? [f.link] : []))].filter((l) => !knownPages(l.href)).map((l) => l.href), []);
check("no dashes or hyphenated words in the glossary and FAQ", [(glossaryProse + faqProse).match(/[‐-―−]| - | -- /g), [...(glossaryProse + faqProse).matchAll(/\b[A-Za-z]+-[A-Za-z]+\b/g)].map((m) => m[0])], [null, []]);
check("no banned words, dollar figures or ratings in the glossary and FAQ", (glossaryProse + faqProse).match(/trusted by|seamless|empower|unlock|game changer|[$£€]\s?\d|weighted score|\bstars?\b/i), null);

console.log("\n-- Official videos --");
const videoRows = Object.entries(PRODUCT_VIDEOS).flatMap(([slug, list]) => list.map((v) => ({ slug, ...v })));
check("every video belongs to a real product", Object.keys(PRODUCT_VIDEOS).every((s) => reg.bySlug.has(s)), true);
check("36 products have official videos", Object.keys(PRODUCT_VIDEOS).length, 36);
check("no product shows more than three videos", Object.values(PRODUCT_VIDEOS).every((l) => l.length >= 1 && l.length <= 3), true);
check("video ids are 11 characters and unique", videoRows.every((v) => /^[A-Za-z0-9_-]{11}$/.test(v.id)) && new Set(videoRows.map((v) => v.id)).size === videoRows.length, true);
check("channel ids look like YouTube channel ids", Object.values(CHANNELS).every((c) => /^UC[A-Za-z0-9_-]{22}$/.test(c.id)), true);
check("every video comes from a channel listed as official for its product", videoRows.every((v) => (OFFICIAL_CHANNELS[v.slug] ?? []).includes(v.channel)), true);
check("every video has a length and a date that is not in the future", videoRows.every((v) => v.seconds > 0 && v.seconds < 3600 && !Number.isNaN(Date.parse(v.published)) && Date.parse(v.published) <= Date.now()), true);
const videoProse = JSON.stringify([videoRows.map((v) => v.label), Object.values(CHANNELS).map((c) => c.name)]);
check("no dashes or hyphenated words in video labels", [videoProse.match(/[‐-―−]| - | -- /g), [...videoProse.matchAll(/\b[A-Za-z]+-[A-Za-z]+\b/g)].map((m) => m[0])], [null, []]);
check("no banned marketing words in video labels", videoProse.match(/trusted by|seamless|empower|unlock|game changer/i), null);

console.log("\n-- Reader review fields and vendor buttons --");
const migration = readFileSync(new URL("../supabase/migrations/0004_review_details.sql", import.meta.url), "utf8");
check("the form's time used choices match the database check", TIME_USED.every((t) => migration.includes(`'${t}'`)), true);
check(
  "the form's limits match the database checks",
  [REVIEW_LIMITS.pros, REVIEW_LIMITS.cons, REVIEW_LIMITS.plan_used, REVIEW_LIMITS.used_for, REVIEW_LIMITS.switched_from].every((n) => migration.includes(`<= ${n}`)) &&
    migration.includes(`<= ${MAX_ALTERNATIVES}`) &&
    migration.includes(`<= ${MAX_REASONS}`),
  true,
);
const optionProse = JSON.stringify([TIME_USED, REASONS]);
check("no dashes or hyphenated words in the review choices", [optionProse.match(/[‐-―−]| - | -- /g), [...optionProse.matchAll(/\b[A-Za-z]+-[A-Za-z]+\b/g)].map((m) => m[0])], [null, []]);
check("every product has a vendor pricing link over https", SOFTWARE.every((s) => (pricingLink(s as never)?.href ?? "").startsWith("https://")), true);
check("every Sage product's plan buttons carry the affiliate link", SOFTWARE.filter((s) => /^sage\b/i.test(s.vendor)).every((s) => pricingLink(s as never)?.affiliate === true), true);

console.log("\n-- South African framing --");
check("every product has an availability finding", SOFTWARE.every((s) => Boolean(SA_AVAILABILITY[s.slug])), true);
check("every Sage product is sold in South Africa", SOFTWARE.filter((s) => /^sage\b/i.test(s.vendor)).every((s) => SA_AVAILABILITY[s.slug]?.status === "local"), true);
const saProse = JSON.stringify(Object.values(SA_AVAILABILITY).map((a) => a.note));
check(
  "no dashes or hyphenated words in availability notes",
  [saProse.match(/[‐-―−]| - | -- /g), [...saProse.matchAll(/\b[A-Za-z]+-[A-Za-z]+\b/g)].map((m) => m[0])],
  [null, []],
);
const everything = prose + editorialProse + saProse;
check("no Unchecked wording in published copy", everything.match(/unchecked|not yet checked|has not been checked/i), null);
check("no billing currency or exchange rate exposure talk in published copy", everything.match(/billed in|bills in (dollars|pounds|euros|usd|gbp|eur|a foreign)|billing currency|rand exposure|exchange rate risk|exposure|unhedged/i), null);
check("no unsupported wording in published copy", everything.match(/not built for south africa|unsupported/i), null);

console.log("\n-- Sample comparison summary --");
const sum = buildSummary(reg.bySlug.get("sage-accounting")!, reg.bySlug.get("xero")!);
check("a comparison summary names no winner", /\bwins?\b|ranks higher|weighted/i.test(sum.paragraphs.join(" ")), false);
sum.paragraphs.forEach((para) => console.log("      " + para));

console.log(failures === 0 ? "\nAll checks passed." : `\n${failures} check(s) failed.`);
process.exit(failures === 0 ? 0 : 1);
