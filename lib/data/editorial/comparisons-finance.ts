import type { EditorialComparison } from "../../types";

const DATE = "2026-10-11";

/** Accounting and payroll comparisons. Every figure is from the vendors' own pages, read on the date above. */
export const FINANCE_COMPARISONS: EditorialComparison[] = [
  {
    slug: "sage-accounting-vs-xero",
    headline: "Sage is cheaper to start and answers the phone. Xero costs more and connects to more.",
    summary:
      "Both are cloud accounting products priced in rand including VAT, both offer a 30 day free trial, and both connect to the big South African banks. Sage starts lower, at R270 a month against Xero's R450, and publishes a South African phone line. Xero advertises a larger app marketplace and round the clock support, and its entry plan caps invoices and bills. Xero also says its subscription prices rise from 1 November 2026. The decision comes down to how much you will pay for the plan that actually fits your business.",
    chooseA: [
      "You want the lowest rand entry price and a local phone line",
      "Your bookkeeper or accountant already works in Sage",
      "You want payroll from the same vendor, connected to your accounts",
    ],
    chooseB: [
      "You want a polished product with a big marketplace of connected apps",
      "You bank with FNB, Absa, Standard Bank, Nedbank or Investec and want those named feeds",
      "You work with an accountant who prefers Xero",
    ],
    glance: [
      { label: "Starting price", a: "R270 a month including VAT, or R3 240 a year", b: "R450 a month including VAT" },
      { label: "Promotion", a: "30 day refund promise", b: "80 percent off for the first three months for new customers" },
      { label: "Price change", a: "None announced on the page", b: "Subscription prices increase from 1 November 2026" },
      { label: "Plan with VAT returns", a: "Standard, from R490 a month", b: "VAT tools are described across the product, with invoice and bill caps on Starter" },
      { label: "Free trial", a: "30 days", b: "30 days" },
      { label: "Bank feeds", a: "Direct with FNB, Nedbank and Investec, and more", b: "FNB, Absa, Standard Bank, Nedbank and others, plus API feeds with Nedbank and Investec" },
      { label: "Payroll", a: "Sage Payroll from R97 a month, connected to Sage Accounting", b: "Through marketplace apps such as SimplePay" },
      { label: "Support", a: "Phone on 0861 237 243 plus knowledgebase", b: "Round the clock help, no phone number published" },
      { label: "Founded", a: "Sage Group plc, 1981", b: "Xero Limited, 2006" },
    ],
    sections: [
      {
        heading: "Pricing compared",
        paragraphs: [
          "On the headline figure, Sage wins. Start is R270 a month including VAT, or R3 240 a year, and Xero's Starter is R450. The comparison narrows once you look at what each plan allows. Xero Starter lets you send 20 invoices and enter five bills, which most trading businesses exceed quickly, so the realistic Xero price is Standard at R795. Sage Start serves one user and does not list VAT returns, which sit on Standard from R490 for two to five users.",
          "Matched on a VAT registered business with two users and unlimited invoicing, the real comparison is Sage Standard at R490 against Xero Standard at R795. Both then add extras. Sage sells extra users at R85 a month, extra companies at R460, advanced inventory at R465 and multi currency at R185. Xero sells expense claims from R69 and project tracking from R120.75.",
          "Xero's offer of 80 percent off for three months makes the first quarter cheap, but it ends, and Xero says its subscription prices increase from 1 November 2026. Judge both on the full price.",
        ],
      },
      {
        heading: "Features compared",
        paragraphs: [
          "Both handle invoicing, bank reconciliation, VAT and reporting. Sage adds digital receipt capture through AutoEntry and AI features that draft bills from invoices. Xero offers online invoice payments, Smart Document Capture, cashflow forecasts of 30, 60 or 180 days depending on plan, budgets and a benchmark against your industry on Premium. Xero says it connects to hundreds of apps and names local ones such as PayFast, Yoco and SimplePay.",
        ],
      },
      {
        heading: "South African fit",
        paragraphs: [
          "Sage's VAT pages speak of a monthly VAT snapshot and returns prepared with your accountant, and its bank page lists direct feeds with FNB, Nedbank and Investec. Xero names FNB, Absa, Standard Bank and Nedbank among its feeds and has announced API based feeds with Nedbank and Investec. Sage has gone further on submission: through its Accountants Edition, an accountant can submit a client's VAT201 straight to SARS eFiling. Xero's page describes preparing returns in line with SARS rules and does not state direct submission, so ask Xero exactly how a return reaches SARS.",
        ],
      },
      {
        heading: "Support and getting started",
        paragraphs: ["Sage publishes a South African phone number and a community hub. Xero promises round the clock support but names no number. If you value a voice on the line in your own time zone, that favours Sage."],
      },
      {
        heading: "Where each falls short",
        paragraphs: ["Sage's cheap plan is single user and its extras add up. Xero's cheap plan is capped and there is no free plan or built in payroll."],
      },
    ],
    verdict:
      "Choose Sage if price, local phone support and an existing Sage accountant matter most. Choose Xero if the marketplace and named bank feeds matter more and you are happy to budget for Standard at R795. In either case take the 30 day trial with your own bank and a real VAT period.",
    researchedAt: DATE,
  },

  {
    slug: "xero-vs-quickbooks-online",
    headline: "Both are polished cloud products. QuickBooks lists lower rand prices and includes phone support. Xero names more South African banks.",
    summary:
      "Xero and QuickBooks Online are close in ambition and both give a 30 day free trial. Xero lists three rand plans from R450 a month including VAT and names the banks it connects to. QuickBooks lists four plans from R322 to R1 144 a month for one to 25 users, with no contract, free phone support with a paid plan and a free onboarding call, but it does not say whether its prices include VAT. Price per plan and support style are the real differences.",
    chooseA: [
      "You want VAT inclusive rand prices and named South African bank feeds",
      "You want a big marketplace including PayFast, Yoco and SimplePay",
      "Your accountant uses Xero",
    ],
    chooseB: [
      "You want free phone support and an onboarding call with a paid plan",
      "You expect to grow beyond five users and want a plan ladder up to 25",
      "You want inventory and projects available in a defined plan",
    ],
    glance: [
      { label: "Plans", a: "Starter R450, Standard R795 and Premium R1 095 a month", b: "Simple Start R322, Essentials R508, Plus R708 and Advanced R1 144 a month" },
      { label: "Starting price", a: "R450 a month including VAT", b: "R322 a month, VAT basis not stated" },
      { label: "Offer for new customers", a: "80 percent off for three months", b: "90 percent off for six months" },
      { label: "Users", a: "Not limited on the pricing page", b: "1, 3, 5 and 25 by plan" },
      { label: "Free trial", a: "30 days", b: "30 days" },
      { label: "Contract", a: "Not stated on the page", b: "None, cancel anytime with no fee" },
      { label: "Phone support", a: "No number published, round the clock help claimed", b: "Free and included with a paid plan" },
      { label: "Multiple currencies", a: "Premium plan, R1 095", b: "From Essentials, R508" },
      { label: "Inventory", a: "Described as a feature", b: "From Plus, with purchase and sales orders" },
    ],
    sections: [
      {
        heading: "Pricing compared",
        paragraphs: [
          "Xero lists Starter at R450, Standard at R795 and Premium at R1 095 a month including VAT, with an 80 percent discount for the first three months. QuickBooks lists Simple Start at R322, Essentials at R508, Plus at R708 and Advanced at R1 144 a month, with a launch offer of 90 percent off for six months. QuickBooks does not state whether VAT is in those figures, so ask before you set them beside Xero's VAT inclusive prices. Xero also says its prices increase from 1 November 2026.",
          "On structure, QuickBooks puts multiple currencies on Essentials, the second plan, while Xero reserves them for Premium at R1 095. If you invoice abroad, that matters.",
        ],
      },
      {
        heading: "Features compared",
        paragraphs: [
          "Xero emphasises online payments, document capture, forecasts and reconciliation, with plan limits on invoices and bills in Starter. QuickBooks emphasises invoices created from photos, PDFs and emails, VAT tracking with error checking, bank feeds on every plan and a plan ladder that adds custom fields, inventory and projects. Both connect to hundreds of apps, and the named examples differ: PayFast, Yoco and SimplePay for Xero, and PayPal, Square, ServiceM8 and Dext for QuickBooks.",
        ],
      },
      {
        heading: "South African fit",
        paragraphs: [
          "Xero is more specific about South African banking, naming FNB, Absa, Standard Bank and Nedbank and describing API feeds with Nedbank and Investec. QuickBooks lists bank feeds but names no South African banks on the pages we read, so ask which of yours connect.",
        ],
      },
      {
        heading: "Support and getting started",
        paragraphs: ["QuickBooks stands out here: free phone support with a paid plan, round the clock live chat and a free onboarding call with an expert. Xero says support is available around the clock but publishes no phone number."],
      },
      {
        heading: "Where each falls short",
        paragraphs: ["Xero's entry plan is capped and it has no free plan. QuickBooks does not state its VAT basis, names no South African banks and is less common among South African bookkeepers."],
      },
    ],
    verdict:
      "Choose QuickBooks for lower list prices, free phone support and a plan ladder up to 25 users, after you confirm the VAT basis. Choose Xero for VAT inclusive prices, named bank feeds and a large accountant community. Run both trials with the same bank account.",
    researchedAt: DATE,
  },

  {
    slug: "sage-accounting-vs-quickbooks-online",
    headline: "Sage spells out the VAT basis and the banks. QuickBooks lists lower prices and offers free phone help.",
    summary:
      "Sage Accounting lists rand prices from R270 a month including VAT and names the direct bank feeds it offers. QuickBooks Online lists four plans from R322 a month for one to 25 users, with free phone support with a paid plan and no contract, but does not state its VAT basis. Both give a 30 day trial. If you value certainty on VAT and local detail, Sage is clearer today. If you value a roomy plan ladder and included phone support, QuickBooks deserves a look.",
    chooseA: [
      "You want the VAT basis and the named direct bank feeds in front of you",
      "You want a South African phone line and a local community",
      "You want payroll from the same vendor",
    ],
    chooseB: [
      "You want free phone support with every paid plan",
      "You may need more than five users, up to 25",
      "You want a plan with inventory and projects built in",
    ],
    glance: [
      { label: "Starting price", a: "R270 a month including VAT, R3 240 a year", b: "R322 a month, VAT basis not stated" },
      { label: "Plans", a: "Start R270 and Standard R490", b: "Simple Start R322, Essentials R508, Plus R708 and Advanced R1 144" },
      { label: "Users", a: "1 on Start, 2 to 5 on Standard", b: "1, 3, 5 and 25" },
      { label: "Free trial", a: "30 days, plus a 30 day refund promise", b: "30 days" },
      { label: "Bank feeds", a: "Direct with FNB, Nedbank and Investec", b: "Listed on every plan, banks not named" },
      { label: "Multi currency", a: "R185 a month add on", b: "Included from Essentials" },
      { label: "Phone support", a: "0861 237 243", b: "Free with a paid plan" },
      { label: "Contract", a: "No long term contracts", b: "None, cancel anytime" },
    ],
    sections: [
      {
        heading: "Pricing compared",
        paragraphs: [
          "Sage's pricing is explicit: Start from R270 a month including VAT and Standard from R490, with a long, clear list of add ons priced in rand. QuickBooks lists Simple Start at R322, Essentials at R508, Plus at R708 and Advanced at R1 144 a month and does not say whether VAT is included, so ask before comparing. The structure differs too. Sage keeps multi currency as an R185 add on, while QuickBooks includes it from Essentials. Sage sells extra users at R85 a month, while QuickBooks builds users into its plan ladder at 1, 3, 5 and 25.",
        ],
      },
      {
        heading: "Features compared",
        paragraphs: [
          "Both do invoicing, bank reconciliation, VAT and reporting. QuickBooks adds invoice capture from photos, PDFs and emails and inventory from Plus. Sage adds AutoEntry receipt capture, AI drafting of bills and optional modules such as debtors manager and time tracking.",
        ],
      },
      {
        heading: "South African fit",
        paragraphs: [
          "Sage is more specific: its pages discuss VAT returns with your accountant, and its bank page lists First National Bank, Nedbank and Investec for direct feeds. QuickBooks describes VAT tracking and tax return preparation in general terms and does not name South African banks.",
        ],
      },
      {
        heading: "Support and getting started",
        paragraphs: ["Both offer phone support, and QuickBooks includes it free with a paid plan and adds a free onboarding call. Sage offers a local line, a community hub and a 30 day refund promise on top of the trial."],
      },
      {
        heading: "Where each falls short",
        paragraphs: ["Sage's Start plan is single user and its add ons add up. QuickBooks gives fewer South African specifics and does not state its VAT basis."],
      },
    ],
    verdict:
      "Sage is the safer choice when you want the VAT basis, the rand price and your bank feed spelled out. QuickBooks is worth trialling when included phone support, a roomier plan ladder and lower list prices matter.",
    researchedAt: DATE,
  },

  {
    slug: "zoho-books-vs-xero",
    headline: "Zoho Books is the value pick with a free plan. Xero is the polished one with the bigger marketplace.",
    summary:
      "Zoho Books has a free plan for businesses under R1 million a year and paid plans from R99 a month excluding VAT, with VAT returns from Standard. Xero starts at R450 a month including VAT and has no free plan. The price gap is large. Xero's counter is polish, a bigger app marketplace and named bank feeds, while Zoho offers a South African support line and a wider Zoho suite.",
    chooseA: [
      "You want to start free, or pay under R100 a month for VAT and bank feeds",
      "You already use other Zoho products",
      "You want multi currency and inventory at R199 a month",
    ],
    chooseB: [
      "You want named South African bank feeds and a large marketplace",
      "Your accountant works in Xero",
      "You are happy to pay more for polish and ecosystem",
    ],
    glance: [
      { label: "Free plan", a: "Yes, R0, for annual revenue up to R1 million", b: "No" },
      { label: "First paid price", a: "Standard R99 a month excluding VAT, or R82.50 billed annually", b: "Starter R450 a month including VAT" },
      { label: "VAT returns", a: "From Standard, including VAT 201 reports", b: "VAT tools described across the product" },
      { label: "Bank feeds", a: "From Standard, banks not named on the page", b: "FNB, Absa, Standard Bank, Nedbank and others" },
      { label: "Multiple currencies", a: "Professional, R199 a month", b: "Premium, R1 095 a month" },
      { label: "Free trial", a: "Free plan, then a trial on paid plans", b: "30 days" },
      { label: "Support", a: "South African phone and email", b: "Round the clock help, no number published" },
      { label: "Mobile", a: "iOS, Android and a Windows desktop app", b: "Free iOS and Android app" },
    ],
    sections: [
      {
        heading: "Pricing compared",
        paragraphs: [
          "Zoho Books is far cheaper at every step. Free covers one user plus an accountant, up to 1,000 invoices and bills a year and 50 receipt scans a month, but excludes VAT tracking and bank feeds. Standard at R99 adds VAT, bank feeds, custom fields and API access for three users. Professional at R199 adds multi currency, inventory, timesheets and projects. Premium at R299 and Elite at R1 290 add budgets, fixed assets and advanced inventory. Every Zoho paid price excludes VAT. Xero charges R450 for Starter with a cap of 20 invoices and five bills, R795 for Standard and R1 095 for Premium, which is where multiple currencies appear, all including VAT.",
          "Even with Xero's three month discount, the gap over a year is large. A VAT registered business with three users pays about R1 188 a year on Zoho Standard, or R990 billed annually, against about R8 296 a year on Xero Standard once the VAT is taken out of R795 a month, before add ons.",
        ],
      },
      {
        heading: "Features compared",
        paragraphs: [
          "Zoho Books lists invoicing, quotes, sales orders, bills, purchase orders, projects, inventory, expenses, documents and a customer portal across its plans, with more than 50 reports on the free plan. Xero emphasises online payments, document capture, forecasts and budgets. Zoho sits in a larger suite, so connecting CRM or other Zoho apps is natural. Xero has a larger third party marketplace, including local apps.",
        ],
      },
      {
        heading: "South African fit",
        paragraphs: [
          "Zoho lists VAT 201 reports, VAT audit reports and VAT correction reports, and publishes a South African support number and email. Xero names more South African banks and has API feeds with Nedbank and Investec. The Zoho page does not name banks, so confirm yours before you rely on a feed.",
        ],
      },
      {
        heading: "Support and getting started",
        paragraphs: ["Zoho gives you a free plan to start on and a South African phone line. Xero gives 30 days and an 80 percent first three months offer for new South African customers."],
      },
      {
        heading: "Where each falls short",
        paragraphs: ["Zoho has fewer local accountants who use it and its free plan excludes VAT and feeds. Xero costs several times more and caps its entry plan."],
      },
    ],
    verdict:
      "Choose Zoho Books if cost matters and your bank and accountant can work with it. Choose Xero if its marketplace, named bank feeds and accountant community are worth the premium. Test a real month of bank transactions in whichever you choose.",
    researchedAt: DATE,
  },

  {
    slug: "simplepay-vs-payspace",
    headline: "SimplePay is the simple option with its price in plain sight. PaySpace is the broader platform that scales up.",
    summary:
      "SimplePay is one plan with every feature, at R23.55 per employee a month excluding VAT for a ten employee business, with an instant quote for your own headcount and a 30 day trial. PaySpace has Lite, Premier and Master tiers, payroll plus HR, reach across more than 45 countries, and gives its per employee rate in a demo. For a small employer who wants to start quickly, SimplePay is the easier path. For a company that expects to grow or run staff in several countries, PaySpace has more room.",
    chooseA: [
      "You want to get an instant quote and start a free trial in minutes",
      "You keep books in Xero or QuickBooks and want payroll to connect",
      "Nobody on your team is a payroll specialist",
    ],
    chooseB: [
      "You expect to grow beyond 50 employees or operate in several countries",
      "You want HR, AI assistance and WhatsApp self service in the same platform",
      "You want the option of outsourced, managed payroll",
    ],
    glance: [
      { label: "Model", a: "One plan, every feature", b: "Lite, Premier and Master tiers" },
      { label: "Pricing", a: "R23.55 per employee a month excluding VAT, quoted instantly for your headcount", b: "Per employee per month, given in a demo" },
      { label: "Free trial", a: "30 days with full support", b: "Sandbox environments, with a demo" },
      { label: "Reach", a: "South African employers", b: "45 plus countries" },
      { label: "Size limit", a: "Contact above 500 employees or for bureaus", b: "Lite up to 50 employees, higher tiers above" },
      { label: "HR", a: "Leave and self service", b: "HR module with onboarding and performance" },
      { label: "Integrations", a: "Xero, QuickBooks, API", b: "Xero, QuickBooks, Acumatica, Workday, Power BI" },
    ],
    sections: [
      {
        heading: "Pricing compared",
        paragraphs: [
          "SimplePay shows R23.55 per employee a month excluding VAT, which is R235.50 a month for ten employees, and its calculator gives your own figure instantly. It warns that multiple companies are quoted separately. PaySpace describes transparent per employee per month pricing with no annual licence and gives the rate in a demo. Ask PaySpace for a written rate and its VAT basis, then compare like with like.",
        ],
      },
      {
        heading: "Features compared",
        paragraphs: [
          "SimplePay covers PAYE, UIF and SDL, tax certificate exports for eFiling or e@syFile, leave with custom policies, self service, mobile apps, two factor authentication and bank payment files. PaySpace covers payroll with automated tax updates, more than 95 country specific reports, HR with leave, onboarding and performance, an AI assistant and WhatsApp self service, plus managed payroll for those who prefer to outsource.",
        ],
      },
      {
        heading: "South African fit",
        paragraphs: [
          "SimplePay says it keeps employers compliant with SARS and the Department of Labour and lists tax certificate and UIF outputs. PaySpace is a South African payroll platform and handles statutory deductions across its countries, but does not list SARS returns, UIF or Employment Equity by name on its homepage, so ask for a written list.",
        ],
      },
      {
        heading: "Support and getting started",
        paragraphs: ["SimplePay includes free support, training and a full featured trial. PaySpace offers sandbox environments and claims a support NPS of 97, a figure from its own pages."],
      },
      {
        heading: "Where each falls short",
        paragraphs: ["SimplePay is not for employers above 500 employees or for bureaus on the standard plan. PaySpace is more than a small employer may need and gives its rate only in a demo."],
      },
    ],
    verdict:
      "SimplePay for a small or mid sized South African employer who wants to start now. PaySpace for a growing or multi country employer who wants HR and room to scale. Get PaySpace's rate in writing and compare both with VAT on the same footing.",
    researchedAt: DATE,
  },

  {
    slug: "sage-payroll-vs-simplepay",
    headline: "Sage Payroll prices by employee band and connects to Sage. SimplePay prices per employee and connects to Xero.",
    summary:
      "Sage Payroll lists prices in employee bands from 1 to 2 up to more than 200, starting at R97 a month including VAT, or R1 080 a year when billed annually, with every feature in every package, unlimited companies and users and a 30 day trial. SimplePay is a single plan at R23.55 per employee a month excluding VAT, with its own 30 day trial. Both cover PAYE, UIF and the statutory returns. The better fit depends on which accounting package you use and how many people you pay.",
    chooseA: [
      "You use Sage Accounting and want payroll that connects to it",
      "You want banded annual pricing and unlimited companies and users",
      "You value a long established vendor with a local phone line",
    ],
    chooseB: [
      "You use Xero or QuickBooks",
      "You want an instant quote and a mobile app for employees",
      "You want a single plan with every feature switched on",
    ],
    glance: [
      { label: "Price", a: "From R97 a month including VAT, or R1 080 a year, for 1 to 2 employees", b: "R23.55 per employee a month excluding VAT" },
      { label: "Packages", a: "All features in every package, priced by employee band", b: "One plan, every feature" },
      { label: "Free trial", a: "30 days, cancel any time", b: "30 days with full support" },
      { label: "Companies and users", a: "Unlimited", b: "Multiple companies quoted separately" },
      { label: "Bank payments", a: "ACB payment file export", b: "Bank payment files" },
      { label: "Accounting link", a: "Sage Accounting", b: "Xero and QuickBooks, plus an API" },
      { label: "Self service", a: "Email payslips", b: "Self service portal with iOS and Android apps" },
    ],
    sections: [
      {
        heading: "Pricing compared",
        paragraphs: [
          "Sage shows a starting price of R97 a month including VAT, or R1 080 a year when billed annually, for the smallest band of one to two employees, and the price rises by band up to more than 200 employees. SimplePay charges R23.55 per employee a month excluding VAT, about R27 including VAT. For two employees that is about R54 a month including VAT against Sage's R97, and for ten employees R235.50 excluding VAT, about R271 including it. Sage's price for the larger bands is on its page, so put your own headcount into both.",
        ],
      },
      {
        heading: "Features compared",
        paragraphs: [
          "Sage Payroll lists pay cycles monthly, fortnightly and weekly, payslips by print or email, ACB payments, leave management under the BCEA, EMP201, EMP501 and IRP5 returns, the UIF declaration, bonuses, travel allowances, commissions, medical aid, retirement funds, contractors and labour brokers. SimplePay lists PAYE, UIF and SDL, custom income and deduction items, leave policies, tax certificate exports, two factor authentication and role based access.",
        ],
      },
      {
        heading: "South African fit",
        paragraphs: [
          "Both are South African in purpose. Sage's list reads like a compliance checklist and cites an ISO 27001 certification. SimplePay says it keeps employers compliant with SARS and the Department of Labour and lists a tax certificate export for eFiling or e@syFile. Neither page mentions COIDA, so ask if you need it.",
        ],
      },
      {
        heading: "Support and getting started",
        paragraphs: ["Sage supports through chat, a help centre, videos and a community hub. SimplePay offers free support, an online help site and free training."],
      },
      {
        heading: "Where each falls short",
        paragraphs: ["Sage prices by band, so you need your headcount to know your price. SimplePay sends employers above 500 employees and bureaus to a custom arrangement."],
      },
    ],
    verdict:
      "Pick Sage Payroll if you run Sage Accounting and like banded annual pricing. Pick SimplePay if you run Xero or QuickBooks or want the quickest quote. Either way, put your real headcount into the tool and compare VAT inclusive figures.",
    researchedAt: DATE,
  },
];
