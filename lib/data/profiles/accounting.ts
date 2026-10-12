import type { ProductProfile } from "../../types";

/**
 * Accounting products other than Sage, written from each vendor's own pages
 * (read 5 and 11 October 2026). The long form sections are reused from the
 * earlier read, with every price taken out: pricing comes from the live record.
 * Copy contains no hyphens and no dashes.
 */

const DATE = "2026-10-11";

export const ACCOUNTING_PROFILES: ProductProfile[] = [
  {
    slug: "xero",
    headline: "The polished cloud favourite, with a bank feed list that reaches into South African banking and a large app marketplace.",
    summary:
      "Xero is a New Zealand company's cloud accounting product, sold in South Africa on rand plans that include VAT: Starter at R450 a month, Standard at R795 and Premium at R1 095. It offers a 30 day trial and 80 percent off the first three months for new South African customers. Starter is capped at 20 invoices and five bills a month, so most trading businesses end up on Standard, and Xero says its subscription prices increase from 1 November 2026.",
    bestFor: [
      "Small businesses that want a polished product with a large app marketplace",
      "Businesses that bank with FNB, Absa, Standard Bank, Nedbank or Investec",
      "Firms that work closely with an accountant or bookkeeper who uses Xero",
    ],
    thinkTwice: [
      "You send more than twenty invoices or enter more than five bills a month, because Starter is capped",
      "You want phone support included, because the page promises round the clock help but names no phone line",
      "You need multiple currencies, which only the Premium plan includes",
    ],
    pros: [
      "A polished product with a large app marketplace, including PayFast, Yoco and SimplePay",
      "Rand pricing including VAT, a 30 day trial and 80 percent off the first three months",
      "Bank feeds with FNB, Absa, Standard Bank and Nedbank, plus API feeds with Nedbank and Investec",
      "A free iOS and Android app on every plan",
      "Round the clock support is promised",
    ],
    cons: [
      "Starter is capped at 20 invoices and five bills a month, so most firms need Standard",
      "No built in payroll and no free plan",
      "The page publishes no South African phone number",
      "Multiple currencies only come with Premium",
      "Xero says its subscription prices increase from 1 November 2026, and the new figures are not published",
    ],
    stats: [
      { label: "Starting price", value: "R450 a month", note: "Including VAT, Starter" },
      { label: "Standard plan", value: "R795 a month", note: "Including VAT, limits lifted" },
      { label: "Premium plan", value: "R1 095 a month", note: "Including VAT, multiple currencies" },
      { label: "Starter cap", value: "20 and 5", note: "Invoices and bills a month" },
      { label: "Free trial", value: "30 days", note: "All features" },
      { label: "Launch offer", value: "80% off", note: "First three months, new South African customers" },
      { label: "Subscribers", value: "5 million", note: "Xero's own count, worldwide" },
      { label: "Founded", value: "2006", note: "Xero Limited, New Zealand" },
    ],
    billing: [],
    moreSections: [
      {
        heading: "What each plan adds",
        paragraphs: ["Xero's plans differ by volume, forecasting and currencies, not by whether the core accounting is there."],
        bullets: [
          "Starter: quotes, 20 invoices and 5 bills a month",
          "Standard: the invoice and bill limits lifted, bulk reconciliation and a 60 day cash flow forecast",
          "Premium: multiple currencies, KPI analysis and a 180 day cash flow forecast",
          "Expense claims from R69 a month and project tracking from R120.75 a month are priced as extras",
        ],
      },
    ],
    faqs: [
      { q: "Will Xero's prices change?", a: "Xero says its subscription prices increase from 1 November 2026. The new figures were not published when the register read the page, and we will update them once they are." },
      { q: "Is the three month discount worth counting?", a: "It lowers the first quarter only. Judge the plan on the full price: Standard at R795 a month including VAT is the realistic plan for most trading businesses." },
    ],
    verdict:
      "A strong product that suits businesses that value polish, integrations and an accounting community that already uses Xero. Budget for Standard rather than Starter, ignore the three month discount when you compare, and confirm how your payroll app connects.",
    sources: [
      { label: "Xero South Africa pricing", url: "https://www.xero.com/za/pricing-plans/" },
      { label: "Xero South Africa", url: "https://www.xero.com/za/" },
    ],
    researchedAt: DATE,
  },

  {
    slug: "quickbooks-online",
    headline: "Intuit's cloud accounting, with free phone support and a ladder from one user to twenty five.",
    summary:
      "QuickBooks Online comes from Intuit and is sold in South Africa in four plans: Simple Start at R322 a month for one user, Essentials at R508 for three, Plus at R708 for five and Advanced at R1 144 for twenty five. It offers a 30 day free trial, no contract, free phone support with a paid plan, round the clock chat and a launch offer of 90 percent off for six months. The page does not say whether the prices include VAT.",
    bestFor: [
      "Small businesses that value free phone support and a free onboarding call",
      "Growing teams that may need more than three users or inventory later",
      "Businesses that want a clear ladder of plans in one product",
    ],
    thinkTwice: [
      "You need to know whether VAT is in the price, because the page does not say",
      "You need multiple currencies, which start on Essentials",
      "You want a large South African accounting community, where Xero and Sage are more common",
    ],
    pros: [
      "Free phone support with a paid plan, round the clock live chat and a free onboarding call",
      "A clear ladder of four plans, from one user up to 25",
      "A 30 day trial, no contract and no cancellation fee",
      "Bank feeds on every plan, and invoice capture from photos, PDFs and forwarded emails",
      "A launch offer of 90 percent off for six months",
    ],
    cons: [
      "The page does not say whether VAT is included in the prices",
      "The page does not list which South African banks connect",
      "Less common among South African bookkeepers than Xero or Sage",
      "Multiple currencies start on Essentials",
    ],
    stats: [
      { label: "Starting price", value: "R322 a month", note: "Simple Start, VAT basis not stated" },
      { label: "Essentials", value: "R508 a month", note: "Three users" },
      { label: "Plus", value: "R708 a month", note: "Five users, inventory and projects" },
      { label: "Advanced", value: "R1 144 a month", note: "Twenty five users" },
      { label: "Free trial", value: "30 days", note: "All plans" },
      { label: "Launch offer", value: "90% off", note: "For six months" },
      { label: "Phone support", value: "Free", note: "With a paid subscription" },
      { label: "Founded", value: "1983", note: "Intuit Inc." },
    ],
    moreSections: [
      {
        heading: "What each plan adds",
        paragraphs: ["The ladder is by users and by what the plan adds."],
        bullets: [
          "Simple Start: one user, plus access for your accountant",
          "Essentials: three users, multiple currencies and bill management",
          "Plus: five users, inventory, projects and purchase orders",
          "Advanced: twenty five users, custom reports and workflow automation",
        ],
      },
    ],
    faqs: [
      { q: "Does QuickBooks include phone support?", a: "Yes. Intuit says phone support is free with a paid subscription, alongside round the clock chat and a free onboarding call." },
      { q: "Can I cancel any time?", a: "Intuit says there is no contract and no cancellation fee." },
    ],
    verdict:
      "A credible option, especially if free phone support and a plan ladder up to twenty five users appeal. Confirm the VAT basis, and ask which of your banks connect before you start the trial.",
    sources: [{ label: "QuickBooks Online South Africa", url: "https://quickbooks.intuit.com/za/pricing/" }],
    researchedAt: DATE,
  },

  {
    slug: "zoho-books",
    headline: "The value pick: a genuine free plan and rand pricing that stays low as you grow.",
    summary:
      "Zoho Books is Zoho's cloud accounting product, with a free plan for businesses under R1 million of annual revenue and paid plans from Standard at R99 a month, up to Ultimate at R2 490, all excluding VAT and per organisation rather than per user. Standard is where VAT tracking, VAT returns and bank feeds begin. Zoho publishes a South African support line, and paying for a year cuts about 17 percent off every paid plan.",
    bestFor: [
      "Very small businesses that want to start free",
      "Businesses that already use other Zoho products and want one suite",
      "Price sensitive firms that still want VAT reports and a South African support line",
    ],
    thinkTwice: [
      "You turn over more than R1 million a year, because the free plan then no longer applies",
      "You need bank feeds, because the free plan excludes them and the page names no South African banks",
      "Your accountant works only in Xero or Sage",
    ],
    pros: [
      "A genuine free plan for businesses with annual revenue under R1 million",
      "Rand pricing that starts at R99 a month on Standard, which includes VAT returns",
      "VAT 201 reports and a South African support line",
      "Inventory and multi currency from Professional at R199 a month",
      "Mobile apps for iOS and Android and a Windows desktop app",
    ],
    cons: [
      "The free plan excludes VAT tracking and bank feeds",
      "The page names no South African banks for its feeds",
      "Fewer South African accountants use Zoho than Xero or Sage",
      "Prices exclude VAT, so a business that is not registered pays 15 percent more",
    ],
    stats: [
      { label: "Free plan", value: "R0", note: "For revenue up to R1 million a year" },
      { label: "Standard", value: "R99 a month", note: "Excluding VAT, VAT and bank feeds" },
      { label: "Professional", value: "R199 a month", note: "Excluding VAT, inventory and multi currency" },
      { label: "Ultimate", value: "R2 490 a month", note: "Excluding VAT, fifteen users" },
      { label: "Paying for a year", value: "About 17% off", note: "Every paid plan, from Zoho's yearly prices" },
      { label: "Plans", value: "6", note: "Free plus five paid" },
      { label: "Pricing basis", value: "Per organisation", note: "Not per user" },
      { label: "Founded", value: "1996", note: "Zoho Corporation" },
    ],
    billing: [
      { plan: "Standard", monthly: 99, yearly: 82.5 },
      { plan: "Professional", monthly: 199, yearly: 165.83 },
      { plan: "Premium", monthly: 299, yearly: 249.17 },
      { plan: "Elite", monthly: 1290, yearly: 1075 },
      { plan: "Ultimate", monthly: 2490, yearly: 2075 },
    ],
    moreSections: [
      {
        heading: "What each plan adds",
        paragraphs: ["Zoho prices per organisation, so a bigger team does not raise the bill. The plans step up by features and limits."],
        bullets: [
          "Free: one user and one accountant, while revenue stays under R1 million a year",
          "Standard: three users, VAT tracking, VAT returns and bank feeds",
          "Professional: five users, inventory, purchase orders and multi currency",
          "Premium: ten users, budgets, fixed assets and cash flow forecasting",
          "Elite: advanced inventory with warehouses and serial tracking",
          "Ultimate: fifteen users and advanced analytics",
        ],
      },
    ],
    faqs: [
      { q: "Is Zoho Books really free?", a: "Zoho offers a free plan for one user and one accountant while the business's revenue stays under R1 million a year. It leaves out VAT tracking and bank feeds, which begin on Standard." },
      { q: "Do the prices include VAT?", a: "No. Zoho's paid prices are per organisation and exclude VAT." },
    ],
    verdict:
      "The best value in its category on paper. Start on the free plan if you are under R1 million and not VAT registered, move to Standard at R99 when you need VAT and bank feeds, and confirm that your bank and your accountant are both compatible.",
    sources: [
      { label: "Zoho Books South Africa", url: "https://www.zoho.com/za/books/" },
      { label: "Zoho Books pricing", url: "https://www.zoho.com/za/books/pricing/" },
    ],
    researchedAt: DATE,
  },

  {
    slug: "freshbooks",
    headline: "A friendly invoicing product built for freelancers and small service businesses, with plans limited by the number of clients you bill.",
    summary:
      "FreshBooks is an invoicing and accounting product for freelancers and small service businesses. Its Lite plan is about R380 a month for five billable clients, Plus about R720 for fifty, and Premium about R1 170 for unlimited clients, all at the day's rate. It offers a 30 day free trial with no card, proposals, retainers and project profitability on the higher plans, and team members cost extra.",
    bestFor: [
      "Freelancers and service businesses that bill a handful of clients and want friendly invoicing",
      "Consultants who want proposals, retainers and project profitability on higher plans",
      "Businesses that handle VAT outside the product",
    ],
    thinkTwice: [
      "You need VAT returns, because the pricing page makes no claim about them",
      "You have more than five clients on the cheapest plan, which caps billable clients",
      "You want a South African bank feed, because the page does not name one",
    ],
    pros: [
      "Friendly invoicing, with unlimited invoices on every plan",
      "A 30 day trial with no card required",
      "Proposals, retainers and project profitability on the higher plans",
      "Clear plans by number of billable clients",
    ],
    cons: [
      "The pricing page makes no claim about VAT returns or South African banks",
      "Lite is limited to five billable clients",
      "Team members cost about R184 a month each",
      "FreshBooks does not name South Africa on its pricing page",
    ],
    stats: [
      { label: "Lite", value: "About R380 a month", note: "Five billable clients" },
      { label: "Plus", value: "About R720 a month", note: "Fifty billable clients" },
      { label: "Premium", value: "About R1 170 a month", note: "Unlimited billable clients" },
      { label: "Team member", value: "About R184 a month", note: "Each, extra" },
      { label: "Free trial", value: "30 days", note: "No credit card" },
      { label: "Refund", value: "30 days", note: "Full refund within 30 days of purchase" },
      { label: "Founded", value: "2003", note: "FreshBooks" },
    ],
    addOns: [
      { name: "Team member", monthly: 11, currency: "USD", kind: "count" },
      { name: "Advanced Payments", monthly: 20, currency: "USD", kind: "flat" },
    ],
    faqs: [
      { q: "Does FreshBooks do VAT returns?", a: "The pricing page makes no claim about VAT returns or South African tax. A VAT registered business should confirm what it needs before it chooses." },
    ],
    verdict:
      "A pleasant tool for a freelancer who bills a few clients and does not need local compliance features. For a VAT registered South African business, a product with VAT returns and a named bank feed is the safer starting point.",
    sources: [{ label: "FreshBooks pricing", url: "https://www.freshbooks.com/pricing" }],
    researchedAt: DATE,
  },

  {
    slug: "wave-accounting",
    headline: "Free accounting and invoicing, run from North America, with card payment and payroll add ons for US and Canadian businesses.",
    summary:
      "Wave offers free accounting, invoicing and bookkeeping for small businesses, with its money coming from payment processing fees and paid add ons. Its Pro plan is about R318 a month for automatic bank import, receipt capture and reminders. Wave is run from North America, its support runs on Eastern time, and its card payments and payroll add ons serve US and Canadian businesses.",
    bestFor: [
      "Freelancers and small businesses that want free bookkeeping and invoicing records",
      "Anyone comparing free accounting tools who wants to see the trade offs against Zoho Books",
    ],
    thinkTwice: [
      "You need VAT returns or South African bank feeds, which its pages do not describe",
      "You want phone support in South African hours",
      "You want a vendor that is actively serving your market, because Wave said in December 2020 that it was withdrawing from markets outside North America",
    ],
    pros: [
      "A free Starter plan with unlimited invoices, bills and bookkeeping records",
      "A mobile app and cash flow dashboards",
      "A useful free option to set against Zoho Books",
    ],
    cons: [
      "Its pages describe no SARS return, VAT report or South African bank connection",
      "Support hours run on Eastern time",
      "Wave said in December 2020 that it was withdrawing from markets outside North America",
      "Card payments cost 2.9 percent plus about R10 on Starter",
    ],
    stats: [
      { label: "Starter", value: "Free", note: "Unlimited invoices, bills and bookkeeping" },
      { label: "Pro", value: "About R318 a month", note: "Bank import, receipt capture, reminders" },
      { label: "Pro for a year", value: "About R3 180", note: "About R265 a month" },
      { label: "Card payments", value: "2.9% plus about R10", note: "On Starter" },
      { label: "Payroll", value: "From about R669 a month", note: "For US and Canadian businesses" },
      { label: "Founded", value: "2010", note: "Wave" },
    ],
    billing: [{ plan: "Pro", monthly: 19, yearly: 15.83, currency: "USD" }],
    faqs: [
      { q: "Is Wave free in South Africa?", a: "Its Starter plan costs nothing. The card payment and payroll add ons are for US and Canadian businesses, and the pages describe no VAT return or South African bank connection." },
    ],
    verdict:
      "A well regarded free tool, run from North America. For a South African business that needs VAT and local banks, the closest free alternative on the register is Zoho Books.",
    sources: [{ label: "Wave pricing", url: "https://www.waveapps.com/pricing" }],
    researchedAt: DATE,
  },
];
