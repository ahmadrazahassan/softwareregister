import { VAT_PERCENT } from "../site";
import type { BriefingTopic } from "../types";
import type { BlogHeroSpec } from "./blog";
import { BANKS } from "./sectors";

/**
 * The picture for each guide, drawn from the register the way the blog's are:
 * product logos, one large figure, or the mark. A guide with no entry gets a
 * picture by topic, so a new guide never has a blank frame. Figures here are
 * the few statutory facts the guides themselves state, and the VAT rate comes
 * from the one place it is defined.
 *
 * Copy contains no hyphens and no dashes.
 */
export const GUIDE_HEROES: Record<string, BlogHeroSpec> = {
  "what-software-costs-in-rand": { kind: "prices", slugs: ["sage-accounting", "quickbooks-online", "xero", "zoho-books", "sage-50cloud-pastel"], caption: "Starting price a month, in rand", tone: "wash" },
  "including-and-excluding-vat": { kind: "figure", figure: `${VAT_PERCENT}%`, caption: "South African VAT, and why a price needs its basis", tone: "lime" },
  "how-to-ask-for-a-quote": { kind: "logos", slugs: ["syspro", "sap-business-one", "netsuite", "acumatica", "sage-x3", "sage-200-evolution"], caption: "Priced on request: what to ask for in writing", tone: "azure" },
  "free-tiers-on-the-register": { kind: "logos", slugs: ["zoho-books", "wave-accounting", "hubspot", "asana", "trello", "clickup"], caption: "Start at R0, and know where it stops", tone: "wash" },
  "vat-and-the-vat201-return": { kind: "figure", figure: "VAT201", caption: "Prepared by your software, filed on SARS eFiling", tone: "ink" },
  "payroll-returns-emp201-emp501-irp5": { kind: "figure", figure: "EMP201", caption: "Due by the 7th of every month", tone: "lime" },
  "bcea-leave-what-hr-software-must-accrue": { kind: "figure", figure: "21 days", caption: "Minimum annual leave under the BCEA", tone: "wash" },
  "bank-feeds-by-bank": { kind: "figure", figure: `${BANKS.length} banks`, caption: "The South African banks the register asks about", tone: "azure" },

  "choosing-accounting-software-in-south-africa": { kind: "logos", slugs: ["sage-accounting", "xero", "quickbooks-online", "zoho-books", "freshbooks", "wave-accounting"], caption: "Six products, one checklist", tone: "wash" },
  "payroll-software-checklist-for-south-african-employers": { kind: "logos", slugs: ["simplepay", "sage-payroll", "payspace", "paysoft", "labournet", "sage-pastel-payroll"], caption: "From payslip to EMP501", tone: "ink" },
  "how-to-test-software-in-a-free-trial": { kind: "figure", figure: "5 tests", caption: "Run these before the trial ends", tone: "lime" },
  "a-valid-tax-invoice-in-south-africa": { kind: "figure", figure: "R5 000", caption: "Where a full tax invoice starts to need more detail", tone: "azure" },
  "the-south-african-small-business-compliance-calendar": { kind: "figure", figure: "7th", caption: "The day the EMP201 is due, every month", tone: "ink" },
  "popia-and-your-software-vendor": { kind: "mark", caption: "Where your customers' data lives, and who can touch it", tone: "azure" },
  "moving-from-sage-pastel-to-cloud-accounting": { kind: "logos", slugs: ["sage-50cloud-pastel", "sage-accounting", "xero", "quickbooks-online", "zoho-books"], caption: "From Pastel on a desktop to the cloud", tone: "wash" },
  "choosing-hr-software-for-a-south-african-employer": { kind: "logos", slugs: ["sage-hr", "peoplehr", "bamboohr", "personio", "labournet"], caption: "Leave under the BCEA comes first", tone: "wash" },
  "choosing-a-crm-for-a-south-african-sales-team": { kind: "logos", slugs: ["hubspot", "pipedrive", "freshsales", "zoho-crm", "salesforce-sales-cloud", "sage-crm"], caption: "Priced per user, mostly in dollars", tone: "azure" },
  "choosing-an-erp-in-south-africa": { kind: "logos", slugs: ["syspro", "sap-business-one", "netsuite", "acumatica", "odoo", "sage-x3"], caption: "The partner matters as much as the product", tone: "ink" },
  "choosing-project-management-software-in-south-africa": { kind: "logos", slugs: ["asana", "clickup", "monday-com", "smartsheet", "trello", "wrike"], caption: "Boards, lists, timelines or sheets", tone: "lime" },
  "load-shedding-and-business-software": { kind: "mark", caption: "When the power is out, what still works", tone: "ink" },
};

const BY_TOPIC: Record<BriefingTopic, BlogHeroSpec> = {
  Pricing: { kind: "mark", caption: "What it costs, in rand", tone: "lime" },
  Buying: { kind: "mark", caption: "Choosing, testing, switching", tone: "wash" },
  Compliance: { kind: "mark", caption: "What South African law asks of your software", tone: "ink" },
};

export function guideHero(slug: string, topic: BriefingTopic): BlogHeroSpec {
  return GUIDE_HEROES[slug] ?? BY_TOPIC[topic];
}

/** Guides worth reading next on a product's review, by the sector the product is in. */
export const GUIDES_BY_SECTOR: Record<string, string[]> = {
  accounting: ["choosing-accounting-software-in-south-africa", "a-valid-tax-invoice-in-south-africa", "vat-and-the-vat201-return", "including-and-excluding-vat"],
  payroll: ["payroll-software-checklist-for-south-african-employers", "payroll-returns-emp201-emp501-irp5", "the-south-african-small-business-compliance-calendar", "how-to-test-software-in-a-free-trial"],
  hr: ["choosing-hr-software-for-a-south-african-employer", "bcea-leave-what-hr-software-must-accrue", "popia-and-your-software-vendor", "how-to-test-software-in-a-free-trial"],
  erp: ["choosing-an-erp-in-south-africa", "how-to-ask-for-a-quote", "popia-and-your-software-vendor", "load-shedding-and-business-software"],
  crm: ["choosing-a-crm-for-a-south-african-sales-team", "popia-and-your-software-vendor", "free-tiers-on-the-register", "how-to-test-software-in-a-free-trial"],
  "project-management": ["choosing-project-management-software-in-south-africa", "free-tiers-on-the-register", "how-to-test-software-in-a-free-trial", "load-shedding-and-business-software"],
};

/**
 * The order guides are shown in, most useful first. A guide not named here comes
 * after these, newest first. This is editorial order, the same on the guides
 * page and the home page, and it is not a ranking of products.
 */
export const GUIDE_ORDER = [
  "choosing-accounting-software-in-south-africa",
  "payroll-software-checklist-for-south-african-employers",
  "how-to-test-software-in-a-free-trial",
  "the-south-african-small-business-compliance-calendar",
  "a-valid-tax-invoice-in-south-africa",
  "popia-and-your-software-vendor",
  "moving-from-sage-pastel-to-cloud-accounting",
  "load-shedding-and-business-software",
  "choosing-hr-software-for-a-south-african-employer",
  "choosing-a-crm-for-a-south-african-sales-team",
  "choosing-an-erp-in-south-africa",
  "choosing-project-management-software-in-south-africa",
  "what-software-costs-in-rand",
  "including-and-excluding-vat",
  "how-to-ask-for-a-quote",
  "free-tiers-on-the-register",
  "vat-and-the-vat201-return",
  "payroll-returns-emp201-emp501-irp5",
  "bcea-leave-what-hr-software-must-accrue",
  "bank-feeds-by-bank",
] as const;

export function guideRank(slug: string): number {
  const i = (GUIDE_ORDER as readonly string[]).indexOf(slug);
  return i === -1 ? GUIDE_ORDER.length : i;
}
