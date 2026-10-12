import type { ProductProfile } from "../../types";

/**
 * CRM products other than Sage CRM, from each vendor's own pages (read 5 and 11
 * October 2026). Where a vendor lists in dollars the figures here are rand marked
 * "about", at the 2 October 2026 reference rate. Copy contains no hyphens or dashes.
 */

const DATE = "2026-10-11";

export const CRM_PROFILES: ProductProfile[] = [
  {
    slug: "hubspot",
    headline: "The friendliest way to start a CRM for free, with costs that climb as you move up the tiers.",
    summary:
      "HubSpot offers a free CRM for up to two users with no time limit, then Starter at about R251, Professional at about R837 and Enterprise at about R1 255 per user a month. It bundles marketing, sales and service tools in one platform, with a large library of training and integrations. The step from Starter to Professional is where the bill changes shape.",
    bestFor: [
      "Small sales teams that want to start on a free CRM and learn as they go",
      "Businesses that want marketing, sales and service tools in one platform",
      "Teams that value a large library of training and integrations",
    ],
    thinkTwice: [
      "You plan to move up to Professional, where the per user price is several times Starter",
      "You need more than two users on the free plan",
      "You want a flat, predictable bill, because costs scale with seats and tiers",
    ],
    pros: [
      "A free CRM with no time limit, for up to two users",
      "Marketing, sales and service tools in one platform",
      "A large library of training and integrations",
      "Four clear tiers, from Free to Enterprise",
    ],
    cons: [
      "A big jump from Starter to Professional",
      "Costs scale with seats and tiers, so the bill is hard to predict",
      "Starter's price is discounted for new customers",
      "No South African pricing or support line on the pages read",
    ],
    stats: [
      { label: "Free plan", value: "2 users", note: "No time limit" },
      { label: "Starter", value: "About R251", note: "Per user a month, new customers" },
      { label: "Professional", value: "About R837", note: "Per user a month" },
      { label: "Enterprise", value: "About R1 255", note: "Per user a month" },
      { label: "Five users on Professional", value: "About R4 185", note: "A month" },
      { label: "Founded", value: "2006", note: "HubSpot, Inc." },
    ],
    faqs: [{ q: "Is the HubSpot CRM really free?", a: "HubSpot offers free CRM tools for up to two users with no expiry. The paid tiers add marketing, sales and service features and are priced per user." }],
    verdict:
      "An easy, well supported way to start, and a platform where the bill can jump. Use the free tier to learn, and price the tier you will actually need before you commit your team to it.",
    sources: [{ label: "HubSpot CRM", url: "https://www.hubspot.com/products/crm" }],
    researchedAt: DATE,
  },

  {
    slug: "pipedrive",
    headline: "A focused sales pipeline tool, with a low paid entry price and no free plan.",
    summary:
      "Pipedrive is a CRM built around the visual sales pipeline. Its four plans, billed annually, are Lite at about R234, Growth at about R402, Premium at about R820 and Ultimate at about R1 154 per user a month, all excluding VAT, with a 14 day free trial. It is narrower than HubSpot: no marketing or service tools, and add ons such as LeadBooster and Campaigns are extra.",
    bestFor: [
      "Small sales teams that think in deals and pipeline stages",
      "Businesses that want a simple CRM without the weight of a full platform",
      "Teams that want a low per user price to start",
    ],
    thinkTwice: [
      "You need marketing and service tools in the same platform",
      "You want a free plan, because Pipedrive offers a trial instead",
      "You need VAT included in the price, because Pipedrive's prices exclude it",
    ],
    pros: [
      "A focused pipeline view that is quick for a salesperson to learn",
      "A low paid entry price, with four clear plans",
      "A 14 day free trial",
      "Add ons for web visitors, campaigns, projects and smart documents",
    ],
    cons: [
      "No free plan",
      "Narrower than HubSpot: no marketing or service tools",
      "Prices exclude VAT",
      "Add ons cost extra on top of the plan",
    ],
    stats: [
      { label: "Lite", value: "About R234", note: "Per user a month, billed annually" },
      { label: "Growth", value: "About R402", note: "Per user a month" },
      { label: "Premium", value: "About R820", note: "Per user a month" },
      { label: "Ultimate", value: "About R1 154", note: "Per user a month" },
      { label: "Free trial", value: "14 days", note: "All plans" },
      { label: "Ten users on Growth", value: "About R4 020", note: "A month, excluding VAT" },
      { label: "Founded", value: "2010", note: "Pipedrive" },
    ],
    vat: "excl",
    faqs: [{ q: "Does the Pipedrive price include VAT?", a: "No. Pipedrive's pricing page says its prices exclude VAT, so add 15 percent if you are not registered for VAT." }],
    verdict:
      "A good fit for a small team that lives in its pipeline. Price the team on the plan that holds the features you need, and remember the prices exclude VAT.",
    sources: [{ label: "Pipedrive pricing", url: "https://www.pipedrive.com/en/pricing" }],
    researchedAt: DATE,
  },

  {
    slug: "freshsales",
    headline: "A capable mid priced CRM from Freshworks, with three clear tiers and a 21 day trial.",
    summary:
      "Freshsales is the CRM from Freshworks. Its pricing page lists three tiers billed annually: Growth at about R151, Pro at about R652 and Enterprise at about R987 per user a month, with a 21 day trial of the fully loaded CRM. Every paid plan includes 500 AI sessions, and branded documents and the Freddy AI Agent cost extra.",
    bestFor: [
      "Small to mid sized sales teams that want phone, email and chat in the CRM",
      "Teams that want AI assistance and are happy to pay per use for more of it",
      "Businesses already using other Freshworks products",
    ],
    thinkTwice: [
      "You were counting on a free plan, because the page lists paid tiers and a trial",
      "You need forecasting, which starts on Enterprise",
      "You want AI sessions without a meter, because beyond the 500 included they cost extra",
    ],
    pros: [
      "Three clear tiers on annual billing",
      "A 21 day trial of the fully loaded CRM",
      "Phone, email and chat inside the CRM",
      "Every paid plan comes with 500 AI sessions",
    ],
    cons: [
      "The page shows no free plan",
      "Forecasting starts on Enterprise",
      "AI sessions and branded documents cost extra",
      "No South African pricing or support line on the page read",
    ],
    stats: [
      { label: "Growth", value: "About R151", note: "Per user a month, billed annually" },
      { label: "Pro", value: "About R652", note: "Per user a month" },
      { label: "Enterprise", value: "About R987", note: "Per user a month" },
      { label: "Free trial", value: "21 days", note: "The fully loaded CRM" },
      { label: "AI sessions included", value: "500", note: "Every paid plan" },
      { label: "Customers", value: "74,000 plus", note: "Freshworks' own count, across its products" },
    ],
    addOns: [
      { name: "Branded documents, per user", monthly: 19, currency: "USD", kind: "seat" },
      { name: "Freddy AI Agent, per 100 sessions", monthly: 49, currency: "USD", kind: "flat" },
    ],
    faqs: [{ q: "Does Freshsales have a free plan?", a: "The pricing page lists three paid tiers and a 21 day trial, and no free plan." }],
    verdict:
      "A well specified CRM at a fair mid market price. Take the 21 day trial and check which tier holds the features you need before you price the team.",
    sources: [{ label: "Freshsales pricing", url: "https://www.freshworks.com/crm/pricing/" }],
    researchedAt: DATE,
  },

  {
    slug: "zoho-crm",
    headline: "A free edition for three users and a suite behind it, with a South African regional site.",
    summary:
      "Zoho CRM is Zoho's customisable CRM. A free edition covers three users for good, and the paid editions, billed annually, are Standard at about R234, Professional at about R385, Enterprise at about R669 and Ultimate at about R870 per user a month, with local taxes such as VAT added. It splits users into org users and team users, which keeps colleagues outside sales connected at a lower licence cost.",
    bestFor: [
      "Small teams that want to start free and have up to three users",
      "Businesses that already use Zoho Books or other Zoho products",
      "Price sensitive firms that want a flexible platform",
    ],
    thinkTwice: [
      "You need more than three users for free, because paid editions apply beyond that",
      "You want a large local consulting network, where Salesforce or HubSpot have more",
      "You want a simple tool, because the flexibility brings a learning curve",
    ],
    pros: [
      "A free edition for three users",
      "Team user licences keep colleagues outside sales connected at a lower cost",
      "Free onboarding is advertised",
      "Part of the wider Zoho suite, with a South African regional site",
    ],
    cons: [
      "Free only for up to three users",
      "The flexibility brings a learning curve",
      "Fewer local consultants than the big names",
      "Local taxes such as VAT are added to the prices",
    ],
    stats: [
      { label: "Free edition", value: "3 users", note: "Free forever" },
      { label: "Standard", value: "About R234", note: "Per user a month, billed annually" },
      { label: "Professional", value: "About R385", note: "Per user a month" },
      { label: "Enterprise", value: "About R669", note: "Per user a month" },
      { label: "Ultimate", value: "About R870", note: "Per user a month" },
      { label: "Founded", value: "1996", note: "Zoho Corporation" },
    ],
    vat: "excl",
    faqs: [{ q: "Does the Zoho CRM price include VAT?", a: "No. Zoho says local taxes such as VAT are charged in addition to the prices shown." }],
    verdict:
      "A strong value choice, especially for a team already in the Zoho family. Start on the free edition, and price the paid edition that holds the automation you need before you scale.",
    sources: [{ label: "Zoho CRM pricing", url: "https://www.zoho.com/crm/zohocrm-pricing.html" }],
    researchedAt: DATE,
  },

  {
    slug: "salesforce-sales-cloud",
    headline: "The enterprise standard, with a free suite to start and prices that rise by the edition.",
    summary:
      "Salesforce Sales Cloud is the best known enterprise CRM. Its pricing page lists a Free Suite, then Starter Suite at about R418, Pro Suite at about R1 673, Core at about R3 262, Advanced at about R6 608 and Max at about R9 202 per user a month, mostly billed annually, with free trials. It has an enormous ecosystem of partners, including South African consultancies, and usually needs an administrator.",
    bestFor: [
      "Larger sales organisations that need deep customisation and forecasting",
      "Teams that want an enormous ecosystem of partners, apps and consultants",
      "Businesses that will use the AI and Agentforce features at the higher editions",
    ],
    thinkTwice: [
      "You are a small team on a rand budget, because the paid editions start at about R418 per user",
      "You want a simple tool, because Salesforce is a platform that usually needs an administrator",
      "You need the free suite to remain enough, because limits push you up",
    ],
    pros: [
      "A Free Suite, then a ladder of six editions",
      "Deep customisation, forecasting and AI at the higher editions",
      "An enormous ecosystem of partners and consultants, including South African ones",
    ],
    cons: [
      "Paid editions run from about R418 to about R9 202 per user a month",
      "The step from Starter Suite to Pro Suite is a factor of four",
      "Usually needs an administrator or a partner",
      "Ten users on Core would pay about R32 600 a month",
    ],
    stats: [
      { label: "Starter Suite", value: "About R418", note: "Per user a month" },
      { label: "Pro Suite", value: "About R1 673", note: "Per user a month, billed annually" },
      { label: "Core", value: "About R3 262", note: "Per user a month, billed annually" },
      { label: "Advanced", value: "About R6 608", note: "Per user a month, billed annually" },
      { label: "Max", value: "About R9 202", note: "Per user a month, through a sales step" },
      { label: "Ten users on Core", value: "About R32 600", note: "A month" },
      { label: "Founded", value: "1999", note: "Salesforce" },
    ],
    faqs: [{ q: "Is there a free version of Salesforce Sales Cloud?", a: "Salesforce lists a Free Suite at no cost, with a free trial of the paid editions. The Starter Suite is the first paid edition." }],
    verdict:
      "A deep platform that rewards complexity and a team to run it. Price your real edition and seat count in rand before you commit, and ask a South African partner what implementation will cost.",
    sources: [{ label: "Salesforce Sales Cloud pricing", url: "https://www.salesforce.com/sales/pricing/" }],
    researchedAt: DATE,
  },
];
