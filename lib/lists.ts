import { BANKS, SECTORS } from "./data/sectors";
import { filterSoftware, parseRegisterQuery, type RegisterQuery } from "./registry";
import type { PricedSoftware, Sector } from "./types";

/**
 * Lists: a page for each question a South African buyer asks of the register,
 * such as free accounting software, payroll software that issues IT3(a)
 * certificates or accounting software with an FNB bank feed. Each is a filter of
 * the register written out as a page that can be found, linked and shared, with
 * the products it holds, the questions to ask and the guides that help.
 *
 * Lists are built from the data, not typed in. A list exists only while it holds
 * products, and its members change with the register. A product appears on a
 * list only where its own page states the fact, so a product missing from a list
 * may still do the thing: the page says so and tells the reader to ask.
 *
 * Copy contains no hyphens and no dashes.
 */

export type ListGroup = "Price and plans" | "Sold in South Africa" | "SARS and the law" | "Bank feeds";

export interface ListDef {
  slug: string;
  group: ListGroup;
  sector: string;
  title: string;
  /** The words on a link to the list from an index or a sector page. */
  short: string;
  description: string;
  query: Record<string, string>;
  /** What the register means by the list, in one sentence for a reader. */
  rule: string;
  asks: string[];
  guides: string[];
  faqs: { q: string; a: string }[];
}

/** A sector's label in running text: accounting software, but ERP software and CRM software keep their capitals. */
const lower = (s: Sector) => (/^[A-Z]{2}/.test(s.label) ? s.label : s.label[0].toLowerCase() + s.label.slice(1));

const GUIDE_FOR_SECTOR: Record<string, string> = {
  accounting: "choosing-accounting-software-in-south-africa",
  payroll: "payroll-software-checklist-for-south-african-employers",
  hr: "choosing-hr-software-for-a-south-african-employer",
  crm: "choosing-a-crm-for-a-south-african-sales-team",
  erp: "choosing-an-erp-in-south-africa",
  "project-management": "choosing-project-management-software-in-south-africa",
};

const sectorGuide = (sector: string) => GUIDE_FOR_SECTOR[sector] ?? "what-software-costs-in-rand";

/** The SARS and legal items worth a page of their own, with the words a buyer would use. */
const RETURNS: { sector: string; item: string; param: "sars" | "legal"; slug: string; title: string; short: string; what: string }[] = [
  { sector: "accounting", item: "VAT201", param: "sars", slug: "accounting-software-that-prepares-the-vat201", title: "Accounting software that prepares the VAT201", short: "Prepares the VAT201", what: "prepares the VAT201 return for SARS" },
  { sector: "payroll", item: "EMP201", param: "sars", slug: "payroll-software-that-prepares-the-emp201", title: "Payroll software that prepares the EMP201", short: "Prepares the EMP201", what: "prepares the monthly EMP201 declaration" },
  { sector: "payroll", item: "EMP501", param: "sars", slug: "payroll-software-for-the-emp501-reconciliation", title: "Payroll software for the EMP501 reconciliation", short: "EMP501 reconciliation", what: "supports the EMP501 reconciliation" },
  { sector: "payroll", item: "IRP5", param: "sars", slug: "payroll-software-that-issues-irp5-certificates", title: "Payroll software that issues IRP5 certificates", short: "Issues IRP5 certificates", what: "issues IRP5 employee tax certificates" },
  { sector: "payroll", item: "IT3(a)", param: "sars", slug: "payroll-software-that-issues-it3a-certificates", title: "Payroll software that issues IT3(a) certificates", short: "Issues IT3(a) certificates", what: "issues IT3(a) certificates" },
  { sector: "payroll", item: "e@syFile", param: "sars", slug: "payroll-software-with-easyfile", title: "Payroll software with e@syFile", short: "Works with e@syFile", what: "works with e@syFile for SARS reconciliations and certificates" },
  { sector: "payroll", item: "UIF", param: "legal", slug: "payroll-software-that-calculates-uif", title: "Payroll software that calculates UIF", short: "Calculates UIF", what: "calculates UIF" },
  { sector: "payroll", item: "SDL", param: "legal", slug: "payroll-software-that-calculates-sdl", title: "Payroll software that calculates SDL", short: "Calculates SDL", what: "calculates SDL" },
  { sector: "payroll", item: "BCEA leave", param: "legal", slug: "payroll-software-that-follows-bcea-leave-rules", title: "Payroll software that follows BCEA leave rules", short: "Follows BCEA leave rules", what: "follows the BCEA leave rules" },
];

export function buildListDefs(): ListDef[] {
  const defs: ListDef[] = [];

  for (const s of SECTORS) {
    const label = lower(s);
    const guide = sectorGuide(s.slug);

    defs.push({
      slug: `free-${s.slug}-software`,
      group: "Price and plans",
      sector: s.slug,
      title: `Free ${label} in South Africa`,
      short: "Free plan",
      description: `${s.label} with a free plan, with every paid plan priced in rand and dated. What each free plan covers, where it stops and what to ask before you build on it.`,
      query: { sector: s.slug, avail: "plan" },
      rule: "Products whose own pages list a plan that costs nothing.",
      asks: [
        "What is the limit that would force you to pay: users, invoices, contacts, projects or features?",
        "What does the first paid plan cost in rand, and is VAT in the price?",
        "Can you export your data if the vendor changes the free plan?",
        "Does the free plan include the South African things you need, such as VAT returns or a bank feed for your bank?",
      ],
      guides: ["free-tiers-on-the-register", guide, "how-to-test-software-in-a-free-trial"],
      faqs: [
        { q: `Is there free ${label} in South Africa?`, a: `Yes, where the register lists one. The products on this page start with a free plan on their own pricing pages. Every free plan limits something, so read the limit before you build on it.` },
        { q: "Is a free plan the same as a free trial?", a: "No. A free trial gives you the whole product for a short time. A free plan gives you part of the product for as long as the vendor keeps it." },
      ],
    });

    defs.push({
      slug: `${s.slug}-software-with-a-free-trial`,
      group: "Price and plans",
      sector: s.slug,
      title: `${s.label} with a free trial`,
      short: "Free trial",
      description: `${s.label} that offer a free trial, read from the vendors' own pages, with prices in rand. Five tests to run before the trial ends.`,
      query: { sector: s.slug, avail: "trial" },
      rule: "Products whose own pages offer a free trial.",
      asks: [
        "How long is the trial, and does it need a card?",
        "Is it the whole product or a cut down version?",
        "Can you bring in your own data, such as your bank statement or last month's payslips?",
        "What happens to what you entered if the trial ends and you do not pay?",
      ],
      guides: ["how-to-test-software-in-a-free-trial", guide],
      faqs: [
        { q: `Which ${label} offer a free trial?`, a: "The products listed on this page, where the vendor's own page offers one. Trial lengths and limits change, so check the vendor's page on the day you sign up." },
        { q: "What should I test in a trial?", a: "Raise a real tax invoice, connect your own bank, run a past return from the numbers, ask support a real question and export your data. The full method is in the guide on testing software in a free trial." },
      ],
    });

    defs.push({
      slug: `${s.slug}-software-sold-in-south-africa`,
      group: "Sold in South Africa",
      sector: s.slug,
      title: `${s.label} sold in South Africa`,
      short: "Sold in South Africa",
      description: `${s.label} that the vendor sells and supports in South Africa: a South African site, rand pricing, a local phone line or South African origin.`,
      query: { sector: s.slug, local: "1" },
      rule: "Products with a South African site, rand pricing, a local phone line or South African origin on the vendor's own pages.",
      asks: [
        "Who do you phone in South Africa, and during which hours?",
        "Is the price in rand, and does it include VAT?",
        "Does the vendor or its partner have South African customers you can speak to?",
        "Which South African banks and SARS returns does it handle?",
      ],
      guides: [guide, "popia-and-your-software-vendor"],
      faqs: [
        { q: "What does Sold in South Africa mean?", a: "The register marks a product Sold in South Africa when the vendor's own pages show a South African site, rand pricing, a local phone line or South African origin. The note on each product says which of those the page showed." },
        { q: "Are the other products unusable in South Africa?", a: "No. Other products are available to South African businesses online, with the price shown here in rand. Check support hours, VAT and your bank before you buy." },
      ],
    });

    defs.push({
      slug: `${s.slug}-software-priced-on-request`,
      group: "Price and plans",
      sector: s.slug,
      title: `${s.label} priced on request`,
      short: "Price on request",
      description: `${s.label} whose vendors give their price on request, and how to turn a quote into something you can compare.`,
      query: { sector: s.slug, price: "quoted" },
      rule: "Products whose own pages give no price and ask you to contact the vendor.",
      asks: [
        "The price per month and per year, with the VAT basis stated.",
        "What is charged once only: implementation, data migration, training.",
        "Which SARS returns it prepares and which it submits.",
        "How you take your data out if you leave.",
      ],
      guides: ["how-to-ask-for-a-quote", guide],
      faqs: [
        { q: "Why do some vendors not publish a price?", a: "Products priced by company size and scope, such as ERP and enterprise payroll, are usually quoted. The register says Price on request and does not estimate a figure." },
        { q: "How do I compare quotes?", a: "Send every vendor the same message, ask for twelve months in rand with VAT on its own line, and list anything charged once only. The guide on asking for a quote has a message you can copy." },
      ],
    });

    defs.push({
      slug: `${s.slug}-software-under-r300-a-month`,
      group: "Price and plans",
      sector: s.slug,
      title: `${s.label} under R300 a month`,
      short: "Under R300 a month",
      description: `${s.label} with a starting price under R300 a month in rand, with the basis shown. A per user or per employee price is the price of one.`,
      query: { sector: s.slug, price: "under300" },
      rule: "Products with a starting price above zero and under R300 in rand. A per user or per employee price is the price of one.",
      asks: [
        "Is the price per organisation, per user or per employee?",
        "Is VAT in the price? Put it on the footing you pay.",
        "What does the plan above the starting price cost?",
        "Which limits apply on the entry plan?",
      ],
      guides: ["including-and-excluding-vat", "what-software-costs-in-rand", guide],
      faqs: [
        { q: "Is the cheapest plan the right one?", a: "Not always. A cheap plan that cannot read your bank or prepare your return costs hours every month. Price the whole sum, including the extras and your time." },
        { q: "Why does the basis matter?", a: "A price per user multiplies by your team and a price excluding VAT needs 15 percent added. The register prints the basis next to every price." },
      ],
    });
  }

  for (const r of RETURNS) {
    const sector = SECTORS.find((s) => s.slug === r.sector) as Sector;
    defs.push({
      slug: r.slug,
      group: "SARS and the law",
      sector: r.sector,
      title: r.title,
      short: r.short,
      description: `${sector.label} that ${r.what}, where the vendor's own page says so. Prices in rand, dated, with questions to ask before you buy.`,
      query: { sector: r.sector, [r.param]: r.item },
      rule: `Products whose own pages state that they ${r.what}.`,
      asks: [
        `Show me ${r.item} produced from a real month, not a sample.`,
        "Does it transfer into eFiling or e@syFile, or only export a file?",
        "Does it keep the original figure beside a correction?",
        "Is the tax table update included in the price?",
      ],
      guides: r.sector === "payroll" ? ["payroll-returns-emp201-emp501-irp5", "payroll-software-checklist-for-south-african-employers", "the-south-african-small-business-compliance-calendar"] : ["vat-and-the-vat201-return", "a-valid-tax-invoice-in-south-africa", "choosing-accounting-software-in-south-africa"],
      faqs: [
        { q: `Does every ${lower(sector).replace(" software", "")} product handle the ${r.item}?`, a: `No, and the register does not guess. It records ${r.item} only where the vendor's own page states it. A product not on this page may still support it, so ask the vendor and ask to see it work.` },
        { q: "Where can I read what the document is for?", a: "The guides linked below explain each return in plain words, with when it is due and what goes wrong." },
      ],
    });
  }

  for (const bank of BANKS) {
    const slug = `accounting-software-with-${bank.toLowerCase().replace(/\s+/g, "-")}-bank-feed`;
    defs.push({
      slug,
      group: "Bank feeds",
      sector: "accounting",
      title: `Accounting software with a ${bank} bank feed`,
      short: `${bank} bank feed`,
      description: `Accounting software whose own pages list a bank feed with ${bank}, with prices in rand. How to check the feed for your account type.`,
      query: { sector: "accounting", bank },
      rule: `Products whose own pages list a bank feed with ${bank}.`,
      asks: [
        `Is the ${bank} feed for business accounts, personal accounts or both?`,
        "Does it cover credit cards and savings accounts, or only a current account?",
        "Does the feed cost extra, or sit on a particular plan?",
        "If there is no feed for your account, how many lines do you fix by hand when you import a statement?",
      ],
      guides: ["bank-feeds-by-bank", "choosing-accounting-software-in-south-africa", "how-to-test-software-in-a-free-trial"],
      faqs: [
        { q: `Which accounting software feeds from ${bank}?`, a: `The products on this page, where the vendor's own page lists a ${bank} feed. A product not listed may feed from your account all the same, or may let you import a statement file. Ask, and test with your own account in the trial.` },
        { q: "What if my bank is not listed?", a: "Most products also accept a statement file from internet banking. It works with any bank and takes a few minutes each time." },
      ],
    });
  }

  return defs;
}

export interface ResolvedList {
  def: ListDef;
  items: PricedSoftware[];
  query: RegisterQuery;
}

/** The lists that hold products. A bank list or a SARS list may hold one, since that is exactly the question a reader asked and the page says what to ask next. Others need two to be worth a page. */
export function resolveLists(items: PricedSoftware[], defs: ListDef[] = buildListDefs()): ResolvedList[] {
  return defs
    .map((def) => {
      const query = parseRegisterQuery(def.query);
      const members = filterSoftware(items, query).sort((a, b) => a.name.localeCompare(b.name, "en-ZA"));
      return { def, items: members, query };
    })
    .filter((l) => l.items.length >= (l.def.group === "Bank feeds" || l.def.group === "SARS and the law" ? 1 : 2));
}

/** A sentence naming the members: "Wave Accounting and Zoho Books" or "A, B and C". */
export function nameList(names: string[]): string {
  if (names.length <= 1) return names.join("");
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}
