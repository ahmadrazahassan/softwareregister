import type { ProductProfile, ProfileBand } from "../../types";

/**
 * The nine Sage products, written in depth from Sage South Africa's own pages
 * (sage.com/en-za), read on 11 October 2026. A figure Sage states about itself is
 * said to be Sage's. Nothing here scores or ranks a product.
 *
 * Copy contains no hyphens and no dashes. Rewrite the sentence instead.
 */

const DATE = "2026-10-11";
const SAGE = "https://www.sage.com/en-za";

/** Sage Payroll's 22 monthly bands in rand including VAT, read from its pricing page. */
const PAYROLL_BANDS: ProfileBand[] = [
  { label: "1 to 2", upTo: 2, monthly: 97 },
  { label: "3 to 5", upTo: 5, monthly: 224 },
  { label: "6 to 10", upTo: 10, monthly: 430 },
  { label: "11 to 15", upTo: 15, monthly: 641 },
  { label: "16 to 20", upTo: 20, monthly: 816 },
  { label: "21 to 25", upTo: 25, monthly: 1018 },
  { label: "26 to 30", upTo: 30, monthly: 1161 },
  { label: "31 to 40", upTo: 40, monthly: 1549 },
  { label: "41 to 50", upTo: 50, monthly: 1832 },
  { label: "51 to 60", upTo: 60, monthly: 2199 },
  { label: "61 to 70", upTo: 70, monthly: 2421 },
  { label: "71 to 80", upTo: 80, monthly: 2769 },
  { label: "81 to 90", upTo: 90, monthly: 2931 },
  { label: "91 to 100", upTo: 100, monthly: 3225 },
  { label: "101 to 110", upTo: 110, monthly: 3355 },
  { label: "111 to 120", upTo: 120, monthly: 3421 },
  { label: "121 to 130", upTo: 130, monthly: 3706 },
  { label: "131 to 140", upTo: 140, monthly: 3838 },
  { label: "141 to 150", upTo: 150, monthly: 3970 },
  { label: "151 to 175", upTo: 175, monthly: 4273 },
  { label: "176 to 200", upTo: 200, monthly: 4475 },
  { label: "More than 200", upTo: null, monthly: null, perEmployee: 22.37 },
];

export const SAGE_PROFILES: ProductProfile[] = [
  /* ------------------------------------------------------- Sage Accounting */
  {
    slug: "sage-accounting",
    headline: "Sage's small business cloud accounting: priced in rand with VAT in, direct bank feeds, and VAT returns you can submit to SARS from the product.",
    summary:
      "Sage Accounting is the cloud product Sage South Africa sells to sole traders, freelancers and growing small businesses. It has two plans, Start at R270 a month for one user and Standard at R490 for two to five, both including VAT, with a 30 day free trial and a 30 day refund promise. Standard is the plan that calculates VAT returns, and most of the choosing is in the add ons, because the base price does not include extra companies, inventory or multi currency.",
    bestFor: [
      "Sole traders and micro businesses that want a rand priced, locally supported cloud product",
      "Small firms whose bookkeeper or accountant already works in Sage",
      "Businesses that want payroll from the same vendor, connected to their accounts",
      "VAT registered businesses that want to submit returns to SARS from the same screen",
    ],
    thinkTwice: [
      "You are VAT registered and tempted by Start, because VAT returns are listed on Standard",
      "You run several companies, because each extra company is R460 a month",
      "You want stock tracked at true cost, because Advanced Inventory is a separate R465 a month",
      "You need many users on one plan, because Standard covers two to five and extra users are R85 each",
    ],
    pros: [
      "Priced in rand including VAT, with a 30 day free trial and a 30 day full refund promise",
      "Direct bank feeds with FNB, Nedbank and Investec, and connections to ABSA, Standard Bank and Capitec, at no extra cost",
      "Sage says you enter your SARS user ID and submit VAT returns directly from the product",
      "Annual billing makes every add on 15 to 18 percent cheaper a month",
      "Sold and supported in South Africa, with local phone, chat and email support",
      "Payroll from the same vendor, and a free accountants edition for practices",
    ],
    cons: [
      "VAT returns are on Standard, from R490 a month, not the R270 headline",
      "The base package includes one company; an extra company is R460 a month",
      "Stock at true cost needs Advanced Inventory at R465 a month, and debtor follow up needs Debtors Manager at R325",
      "Base plans show no yearly discount: R270 a month is R3 240 a year",
    ],
    stats: [
      { label: "Starting price", value: "R270 a month", note: "Including VAT, Start plan" },
      { label: "Standard plan", value: "R490 a month", note: "Including VAT, 2 to 5 users" },
      { label: "Free trial", value: "30 days", note: "Plus a 30 day full refund, Sage's promise" },
      { label: "Banks it can connect to", value: "6 named", note: "Capitec, FNB, ABSA, Standard Bank, Nedbank, Investec, and more" },
      { label: "Direct bank feeds", value: "3 banks", note: "FNB, Nedbank and Investec, no CSV files" },
      { label: "Add ons", value: "7 listed", note: "Users, companies, inventory, debtors, time, multi currency, storage" },
      { label: "Document capture accuracy", value: "Up to 99%", note: "Sage's own claim for AutoEntry" },
      { label: "Vendor founded", value: "1981", note: "Sage Group plc" },
    ],
    basePlans: ["Start", "Standard"],
    addOns: [
      { name: "Extra user", monthly: 85, yearly: 70, kind: "count", countLabel: "Sage allows as many users as you like", note: "R840 a year for each extra user" },
      { name: "Extra company", monthly: 460, yearly: 375, kind: "count", note: "R4 500 a year for each extra company" },
      { name: "Advanced Inventory", monthly: 465, yearly: 385, kind: "flat", note: "R4 620 a year" },
      { name: "Debtors Manager", monthly: 325, yearly: 270, kind: "flat", note: "R3 240 a year" },
      { name: "Time Tracking", monthly: 185, kind: "flat" },
      { name: "Multi currency payments", monthly: 185, kind: "flat" },
      { name: "Extra storage, per gigabyte", monthly: 20, yearly: 17, kind: "count", note: "R204 a year for each gigabyte" },
    ],
    sections: [
      {
        heading: "What it is and who it is for",
        paragraphs: [
          "Sage Accounting is the small business cloud product in Sage's South African range. Sage sells it for sole traders, freelancers and growing small businesses, and its own pricing page calls Start popular with sole traders and micro businesses. Bigger finance teams are pointed to Sage Intacct, Sage 200 Evolution and Sage X3.",
          "It covers the everyday work of a small business: invoices, tracking what customers owe you, bank reconciliation, bookkeeping and VAT. Sage describes it as developed and built for the South African market, with local support on chat, phone and email, and its comparison with Xero and QuickBooks leans on that, and on custom compliance such as the domestic reverse charge for valuable metals.",
        ],
      },
      {
        heading: "What each plan includes",
        paragraphs: ["Start and Standard share the same core. Standard adds the bookkeeping and VAT work, and the room for a small team."],
        bullets: [
          "Start, one user: create invoices in seconds, work from anywhere, track what you are owed, and get going quickly",
          "Standard, two to five users: everything in Start, plus bookkeeping, VAT return calculation and collaboration with your accountant",
          "Both plans: automatic bank reconciliation, quotes that convert to invoices, recurring invoices, stock items with reorder levels, and the mobile app",
          "Standard: AI features that draft bills from invoices and write personalised customer emails, and receipt capture with AutoEntry",
          "The base package includes two users and one company, and you can upgrade, change or cancel at any time",
        ],
      },
      {
        heading: "Add ons, and why the base price is only the start",
        paragraphs: [
          "Sage sells the rest as add ons. Extra users are R85 a month, an extra company R460, Advanced Inventory R465, Debtors Manager R325, Time Tracking R185, multi currency payments R185 and storage R20 for each gigabyte. Pay for an add on for a year and Sage's own annual prices make it 15 to 18 percent cheaper a month: an extra user is R840 a year, an extra company R4 500, Advanced Inventory R4 620 and Debtors Manager R3 240.",
          "The cost calculator above adds them for you. A VAT registered business with three users, a second company and Debtors Manager on Standard pays R490 plus R85 plus R460 plus R325, which is R1 360 a month including VAT, against the R490 on the headline.",
        ],
      },
      {
        heading: "Stock, debtors and reporting",
        paragraphs: [
          "Both plans manage stock items with reorder levels, out of stock warnings and best seller reports, with categories and sub categories. Advanced Inventory goes further: it updates your inventory and your accounting records at the time of each incoming or outgoing transaction, which Sage says gives you the true cost of every sale.",
          "Debtors Manager adds an automated workflow for late payments, with a timeline, draft follow ups and customer account status. Reporting covers sales, purchases, quotes, customer activity and VAT liability in real time, a cash flow statement and forecast, debtors and creditors by age, and unreconciled transactions, and it exports to Excel, CSV and PDF.",
        ],
      },
      {
        heading: "VAT and SARS",
        paragraphs: [
          "Sage's VAT page describes a monthly snapshot of what you owe, a record of previous submissions and a digital paper trail of every VAT action. It says you enter your VAT registration and how often you submit, then add your SARS user ID to submit VAT returns directly from the product. Domestic reverse charge VAT for valuable metals is covered by a feature of its own.",
          "Through Sage Accountants Edition, an accountant can prepare, submit and track a client's VAT201 return in the same system. The payment itself is still made on SARS eFiling.",
        ],
      },
      {
        heading: "Banks",
        paragraphs: [
          "Sage lists direct bank feeds with First National Bank, Nedbank and Investec, which means no CSV files and no third party in the middle. It also lists connections to ABSA, FNB Business Profile, Standard Bank, Nedbank's new online banking and Capitec Bank, and says it connects to more besides. New transactions are checked on a daily schedule, and there is no extra cost for a bank feed.",
          "Sage warns that a bank may be supported while your particular account type is not, so check your own account in the trial before you commit.",
        ],
      },
      {
        heading: "Support, learning and the Sage community",
        paragraphs: [
          "Support is local, with a South African phone line (0861 237 243), chat and email, a knowledgebase and a Community Hub. Sage also gives subscribers access to member masterclasses, business advice articles and learning resources, and a software certification you can earn.",
          "The product is also sold to accountants: the Sage for Accountants programme gives a practice Sage Accounting, Accountants Edition, a discounted Sage Payroll with two free payslips and 50 percent off the subscription, 50 AI document capture credits, a directory listing and continuing professional development points.",
        ],
      },
      {
        heading: "Where it falls short",
        paragraphs: [
          "The plan structure is the main trap. If you are VAT registered, the plan that lists VAT returns is Standard, which starts at R490, not the R270 headline. Extra companies are expensive at R460 each, so a small group of related businesses pays far more than a sole trader would.",
          "The base plans carry no yearly discount, so a business that pays for a year saves only on the add ons.",
        ],
      },
      {
        heading: "How it compares",
        paragraphs: [
          "Within Sage's own range it sits below Sage 50cloud Pastel, which Sage describes as the more expensive, desktop based product for advanced businesses with a bookkeeper. Against Xero, Sage starts lower and publishes a local phone line. Against QuickBooks Online, Sage states its VAT basis and names its banks. See the head to head pages for the plan by plan detail.",
        ],
      },
    ],
    faqs: [
      { q: "Can I submit my VAT201 to SARS from Sage Accounting?", a: "Sage's VAT page says you add your SARS user ID and submit VAT returns directly from the product, and that an accountant can do the same for a client through Sage Accountants Edition. VAT return calculation is on the Standard plan." },
      { q: "How many users can I have?", a: "Start is for one user and Standard covers two to five. Sage says you can add as many users as you want, at R85 a month each, with roles from read only to full access." },
      { q: "Is the price per year cheaper than paying monthly?", a: "Not on the base plans: Start is R3 240 a year and Standard R5 880, which is the monthly price times twelve. The add ons are 15 to 18 percent cheaper a month when you pay for a year." },
      { q: "What is the difference between Sage Accounting and Sage 50cloud Pastel?", a: "Sage says Sage Accounting is affordable software that works from anywhere online and suits small businesses. Sage 50cloud Pastel is more expensive desktop accounting for advanced businesses, usually with an in house bookkeeper." },
      { q: "Can I get my money back?", a: "Sage says that if you buy and decide the software is not right for your business, you can tell it within 30 days and it will give you a full refund." },
    ],
    verdict:
      "A good starting point for a small South African business that wants its VAT, its bank feed and its phone support in one local product. Choose the plan by whether you are VAT registered, price the add ons you will really use with the calculator, and take the 30 day trial with your own bank account.",
    sources: [
      { label: "Sage Accounting", url: `${SAGE}/sage-business-cloud/accounting/` },
      { label: "Sage Accounting pricing", url: `${SAGE}/sage-business-cloud/accounting/pricing/` },
      { label: "Connect my bank", url: `${SAGE}/sage-business-cloud/accounting/features/connect-my-bank/` },
      { label: "VAT", url: `${SAGE}/sage-business-cloud/accounting/features/vat/` },
      { label: "Sage for Accountants", url: `${SAGE}/accountants/` },
    ],
    researchedAt: DATE,
  },

  /* ----------------------------------------------------- Sage 50cloud Pastel */
  {
    slug: "sage-50cloud-pastel",
    headline: "Desktop accounting for businesses with an in house bookkeeper, with cloud access and backups added, priced in rand excluding VAT.",
    summary:
      "Sage 50cloud Pastel is the long running desktop accounting product from Sage, connected to the cloud. It has three plans: Start at R1 375 a month for two users and two companies, Core at R1 915 for four and four, and Plus at R2 715 for up to five and five, all excluding VAT. A long list of modules sits on top, from Point of Sale to Advanced Reporting, so the headline is a floor and a quote is the way to learn the real bill.",
    bestFor: [
      "Businesses with an in house bookkeeper who wants desktop speed and depth",
      "Firms that need several companies under one roof, because the plans include two to five",
      "Businesses already running Pastel that want to stay on a path they know",
      "Retail or stock heavy businesses that will add Point of Sale, warehouses or serial number tracking",
    ],
    thinkTwice: [
      "You are a sole trader or micro business, because the price is far above the cloud products",
      "You want to work entirely in a browser with no software to install and back up",
      "You assumed the price includes VAT, because it is quoted excluding VAT",
      "You need several modules, because each is priced on top and the total needs a quote",
    ],
    pros: [
      "Desktop depth for an in house bookkeeper, with two to five companies included in the plans",
      "Sold and supported in South Africa, and well known to local accountants and bookkeepers",
      "Automatic bank reconciliation with a live bank feed, and automatic backups to the cloud",
      "Remote Data Access lets you review your accounts away from the office",
      "A full 30 day desktop trial, with your data kept if you buy",
      "A request a quote route sits beside buy now",
    ],
    cons: [
      "From R1 375 a month excluding VAT, several times the cloud products",
      "Modules add up quickly: Point of Sale R725, Advanced Reporting R650 and GL Manager R725 a month",
      "A desktop product, so installation and updates are yours to manage",
      "Quoted excluding VAT, so a business that is not registered pays R1 581.25 on the entry plan",
    ],
    stats: [
      { label: "Starting price", value: "R1 375 a month", note: "Excluding VAT, Start plan" },
      { label: "With VAT added", value: "R1 581.25", note: "A business not registered for VAT pays this" },
      { label: "Users and companies", value: "2 / 4 / 5", note: "Start, Core and Plus each include that many of both" },
      { label: "Extra user", value: "R265 a month", note: "On Plus" },
      { label: "Modules listed", value: "9", note: "Currency, POS, warehouses, serial numbers, reporting, time, GL, debtors, receipting" },
      { label: "Free trial", value: "30 days", note: "The full desktop version, data kept if you buy" },
      { label: "Experience", value: "30 plus years", note: "Sage's own statement about the product's history" },
      { label: "Vendor founded", value: "1981", note: "Sage Group plc" },
    ],
    addOns: [
      { name: "Foreign currency", monthly: 460, kind: "flat" },
      { name: "Point of Sale", monthly: 725, kind: "flat" },
      { name: "Multiple warehouses and inventory", monthly: 460, kind: "flat" },
      { name: "Serial number tracking", monthly: 460, kind: "flat" },
      { name: "Advanced Reporting", monthly: 650, kind: "flat" },
      { name: "Time and billing", monthly: 460, kind: "flat" },
      { name: "GL Manager", monthly: 725, kind: "flat" },
      { name: "Debtors Manager", monthly: 595, kind: "flat" },
      { name: "Receipting", monthly: 460, kind: "flat" },
      { name: "Extra user (Plus only)", monthly: 265, kind: "count" },
    ],
    sections: [
      {
        heading: "What it is and who it is for",
        paragraphs: [
          "Sage describes 50cloud Pastel as accounting software for small businesses with in house bookkeepers who need to simplify everyday invoicing and financial management alongside more complex accounting and payroll tasks. It combines desktop power with cloud connectivity. Sage says it has over 30 years of experience behind it and that it serves over 2 million businesses, which is a claim about the whole Sage range rather than this product alone.",
          "In practice this is the product for a business that has outgrown a simple cloud tool, or that has always run Pastel and sees no reason to change. Sage's own FAQ calls it the more expensive desktop accounting software for advanced businesses, and Sage Accounting the affordable online one.",
        ],
      },
      {
        heading: "What each plan includes",
        paragraphs: ["All three plans carry no long term contracts or hidden fees, according to Sage. They differ by users, companies and a few features."],
        bullets: [
          "Start, R1 375 a month: two users and two companies, personalised invoices and quotes, cash flow, income, expenses and payments, automatic discounts and automatic bank reconciliation",
          "Core, R1 915 a month: four users and four companies, everything in Start plus supplier payments, recurring invoices and transactions, bespoke reports, and multiple companies, departments and budgets",
          "Plus, R2 715 a month: up to five users and five companies, everything in Core, with extra users at R265 a month",
        ],
      },
      {
        heading: "Desktop software with cloud connection",
        paragraphs: [
          "Sage 50cloud Pastel is installed on your PC. You back up locally if you like, and you do not depend on an internet connection to use it, which Sage says lets it handle large volumes of data without lag. Cloud connectivity adds Remote Data Access, so you can review your accounts away from the office, and a set of automation features that connect to the desktop product directly.",
          "Sage can back your data up to the cloud automatically. A trial installs and runs the full desktop version for 30 days, and if you buy you receive a new serial number and activation key and keep the data you entered.",
        ],
      },
      {
        heading: "Modules, and what a full installation costs",
        paragraphs: [
          "Sage sells a long list of modules on top of the plans, all excluding VAT: foreign currency at R460 a month, Point of Sale at R725, multiple warehouses and inventory at R460, serial number tracking at R460, Advanced Reporting at R650, time and billing at R460, GL Manager at R725, Debtors Manager at R595 and Receipting at R460.",
          "A Core plan with Point of Sale, multiple warehouses and Advanced Reporting is R1 915 plus R725 plus R460 plus R650, which is R3 750 a month excluding VAT. That is why Sage offers a request a quote button beside buy now.",
        ],
      },
      {
        heading: "South African fit",
        paragraphs: [
          "Pastel is Sage's South African accounting brand, and Sage South Africa sells and supports the product locally. Sage describes it as built to keep you VAT compliant, with a live feed from your bank, a personalised dashboard and reporting automation. Local accountants and bookkeepers know it well, which is a practical advantage when you need help.",
          "Support is by phone on 0861 237 243 and through the same knowledgebase and community that Sage runs for its other South African products.",
        ],
      },
      {
        heading: "Where it falls short",
        paragraphs: [
          "The cost is the obvious drawback for a small business, and module pricing makes the final bill hard to know without a quote. A desktop product also means installation and updates are your responsibility in a way a browser product does not require. If you want something you can open on any device in thirty seconds, the cloud products in this category are a better match.",
        ],
      },
      {
        heading: "How it compares",
        paragraphs: [
          "Within Sage's own range it sits above Sage Accounting and below Sage 200 Evolution. Against Xero or Zoho Books it costs several times more, so it only makes sense when you need what it adds: multiple companies, deeper stock and reporting, and a desktop workflow your bookkeeper prefers.",
        ],
      },
    ],
    faqs: [
      { q: "What is the difference between Sage 50cloud Pastel and Sage Accounting?", a: "Sage Accounting is online software that works from anywhere and suits small businesses. Sage 50cloud Pastel is installed on your PC, handles larger volumes of data and several companies, and adds cloud access and backups." },
      { q: "Is my data backed up?", a: "Sage says Pastel can automatically back your data up to the cloud, or you can back up locally." },
      { q: "What happens to my data if I buy after the trial?", a: "Sage says that after the 30 day trial you receive a new serial number and activation key, and the data you entered remains." },
      { q: "Does the price include VAT?", a: "No. Sage quotes 50cloud Pastel excluding VAT. Adding 15 percent makes the Start plan R1 581.25 a month." },
    ],
    verdict:
      "Worth it for an established business with a bookkeeper and a need for multi company depth, and hard to justify for a small business that mainly wants to invoice and file VAT. Ask for a written quote that lists every module you will use, and remember that the R1 375 excludes VAT.",
    sources: [
      { label: "Sage 50cloud Pastel", url: `${SAGE}/products/sage-50cloud-pastel/` },
      { label: "Sage Accounting pricing, for the comparison FAQ", url: `${SAGE}/sage-business-cloud/accounting/pricing/` },
    ],
    researchedAt: DATE,
  },

  /* --------------------------------------------------------------- Sage Payroll */
  {
    slug: "sage-payroll",
    headline: "Online payroll with every feature in every package, priced by how many people you employ, from R97 a month including VAT.",
    summary:
      "Sage Payroll is the small business cloud payroll product from Sage. Its pricing page prices by 22 employee bands, from 1 to 2 employees at R97 a month to 176 to 200 at R4 475, and R22.37 per employee above 200, all including VAT. Every package carries every feature, with unlimited companies and users, and it handles PAYE, UIF and SDL, ACB payment files, leave under the BCEA, and the EMP201, EMP501 and IRP5 returns.",
    bestFor: [
      "Small employers that want clearly banded pricing with every feature included",
      "Businesses already on Sage Accounting that want payroll to connect to it",
      "Firms that run payroll for several companies, since companies and users are unlimited",
      "Accountants and bookkeepers, who get two free payslips and 50 percent off through Sage for Accountants",
    ],
    thinkTwice: [
      "You have more than 200 employees, where the price is R22.37 per employee and you may want a quote",
      "You want payroll and HR in one product, where Sage's newer Payroll Advanced is aimed instead",
      "You want to compare annual and monthly prices, because the page shows two different yearly figures",
    ],
    pros: [
      "Every feature in every package, priced in 22 bands by headcount",
      "Unlimited companies and users on every band",
      "EMP201, EMP501 and IRP5 returns, plus the UIF declaration to the Department of Labour",
      "Connects to Sage Accounting, and payslips can be emailed to employees",
      "A 30 day demo company with no credit card, and cancel at any time",
      "ISO 27001 certified, by Sage's own statement",
    ],
    cons: [
      "Payroll only: recruitment, performance and the rest of HR sit elsewhere",
      "The pricing page's headline says from R1 080 a year, while its annual toggle shows R1 164 for the same band, so ask for the figure in writing",
      "The price per head is highest for the smallest teams: R48.50 at two employees",
      "Above 200 employees the price is a per employee rate rather than a band",
    ],
    stats: [
      { label: "Starting price", value: "R97 a month", note: "Including VAT, 1 to 2 employees" },
      { label: "Price bands", value: "22", note: "From 1 to 2 up to 176 to 200, then per employee" },
      { label: "Ten employees", value: "R430 a month", note: "The 6 to 10 band, including VAT" },
      { label: "Fifty employees", value: "R1 832 a month", note: "The 41 to 50 band, R36.64 each at the top" },
      { label: "Over 200 employees", value: "R22.37 each", note: "Per employee a month, including VAT" },
      { label: "Companies and users", value: "Unlimited", note: "On every band" },
      { label: "Free trial", value: "30 days", note: "A demo company, no credit card" },
      { label: "Pay cycles", value: "3", note: "Monthly, fortnightly and weekly" },
    ],
    bands: PAYROLL_BANDS,
    sections: [
      {
        heading: "What it is and who it is for",
        paragraphs: [
          "Sage describes Sage Payroll as intuitive online payroll for start ups and small businesses, with automatic updates, and sells it in bands by the number of employees. Sage says every package carries every feature, so the only thing that changes the price is your headcount.",
          "It is a payroll product, not a full HR system. For leave, performance, shifts and recruitment alongside it, look at Sage HR, and for payroll with HR built in, Sage's newer Payroll Advanced.",
        ],
      },
      {
        heading: "What every package includes",
        paragraphs: ["The list is the same on every band."],
        bullets: [
          "Automatic updates, so legislative changes arrive without you installing anything",
          "Unlimited companies and unlimited users",
          "Monthly, fortnightly and weekly pay cycles with real time calculations",
          "Pre defined legislative and payroll reports, and customisable payslips",
          "Email payslips, leave management and ACB bank payments",
          "The UIF declaration, and integration with Sage Accounting",
        ],
      },
      {
        heading: "Statutory reporting",
        paragraphs: [
          "Sage names the monthly employer declaration (EMP201), the interim and annual employer reconciliation (EMP501), the tax certificates (IRP5) and the UIF declaration to the Department of Labour as covered. Payroll reporting also includes financial, leave, employee, company and audit reports.",
          "The product covers PAYE, UIF and SDL calculations, bonuses, travel allowances, commissions, overtime, medical aid and retirement funds, and independent contractors and labour brokers.",
        ],
      },
      {
        heading: "What a band costs, and how the price per head falls",
        paragraphs: [
          "The price rises with each band, but not as fast as headcount does. Two employees cost R97 a month, or R48.50 each. A business of ten pays R430, which is R43 each. At fifty employees it is R1 832, about R36.64 each, and at two hundred R4 475, about R22.38 each. Past 200 Sage charges R22.37 for every employee.",
          "The charts above show every band. Both the monthly figure and the price per head at the top of the band are included, with a table of every figure underneath.",
        ],
      },
      {
        heading: "Annual or monthly",
        paragraphs: [
          "Sage's payroll pricing page offers a monthly and an annual view. The headline reads from R1 080 a year including VAT, which is R90 a month, but when you switch the table to annual the 1 to 2 employee band shows R1 164, which is twelve times R97. The two figures do not agree, so ask Sage which applies to you and get it in writing before you buy for a year.",
          "Sage also sells a bundle of Accounting Standard plus Payroll, which it says is bought on an annual subscription only.",
        ],
      },
      {
        heading: "South African fit",
        paragraphs: [
          "The feature list reads like a South African compliance checklist, and it is: this is a product Sage South Africa builds, sells and supports for South African employers. Support comes through online chat, a help centre, how to videos and the Sage Community Hub. Sage cites an ISO 27001 certification for information security.",
          "Sage's South African customers quoted on its pages include Newscafe, whose HR manager says Sage Payroll lets her manage leave and track staff.",
        ],
      },
      {
        heading: "Where it falls short",
        paragraphs: [
          "It is a payroll product, not a full HR system, so recruitment and performance sit elsewhere. For a very small team the price per head is the highest on the scale, and the two yearly figures on the pricing page should be settled with Sage before you commit.",
        ],
      },
      {
        heading: "How it compares",
        paragraphs: [
          "Against SimplePay, Sage Payroll publishes a band table and connects to Sage Accounting, while SimplePay quotes per employee excluding VAT and connects to Xero and QuickBooks. Sage's prices include VAT and SimplePay's do not, so put them on the same footing before comparing.",
        ],
      },
    ],
    faqs: [
      { q: "How much is Sage Payroll for ten employees?", a: "The 6 to 10 employee band is R430 a month including VAT, which is R43 per employee. The 11 to 15 band is R641." },
      { q: "What happens above 200 employees?", a: "Sage prices above 200 employees at R22.37 per employee a month including VAT. At 250 employees that is R5 592.50." },
      { q: "Are there any extra costs per feature?", a: "Sage says every feature is in every package, with unlimited companies and users. The price depends only on the number of employees." },
      { q: "Does it submit returns to SARS?", a: "Sage lists the EMP201, EMP501 and IRP5 returns and the UIF declaration as covered. Its community hub documents how the IRP5 file is imported into SARS e@syFile, where the EMP501 is completed and submitted." },
      { q: "Is there a free trial?", a: "Yes. Sage offers a demo company free for 30 days, with no credit card, and you can cancel at any time." },
    ],
    verdict:
      "A solid, compliance first payroll for a small employer, especially one on Sage Accounting. Check your exact band in the table, settle the yearly price with Sage in writing, and take the 30 day demo with your own employees.",
    sources: [
      { label: "Sage Payroll", url: `${SAGE}/sage-business-cloud/payroll/` },
      { label: "Sage Payroll pricing", url: `${SAGE}/sage-business-cloud/payroll/pricing/` },
      { label: "Sage for Accountants", url: `${SAGE}/accountants/` },
    ],
    researchedAt: DATE,
  },

  /* ------------------------------------------------------------------ Sage HR */
  {
    slug: "sage-hr",
    headline: "Modular HR in rand: pay for core HR and leave, then add only the modules you use.",
    summary:
      "Sage HR is the cloud HR product Sage sells to South African businesses. Core HR and leave management cost R28 per employee a month, and you add Performance, Shift Scheduling and Timesheets at R14 each, Expenses at R10, and Recruitment at a flat R1 850 a month. A calculator on the pricing page works out the final price from the modules and headcount you choose, and a 30 day trial needs no credit card and ends on its own.",
    bestFor: [
      "Small and growing businesses that want to start with leave and employee records",
      "Teams that want to add modules, such as shifts or recruitment, only when they need them",
      "Businesses that already use Sage Payroll or Sage Accounting",
      "Employers who want employees to see payslips and IRP5 certificates in an app",
    ],
    thinkTwice: [
      "You want a single published price, because the final figure comes from a calculator",
      "You need payroll inside the same product, where Sage Payroll Advanced is aimed instead",
      "You have more than a few hundred employees and need advanced HR, where Sage 300 People is the larger option",
    ],
    pros: [
      "Core HR and leave management included, with other modules added only when you need them",
      "Modules are priced openly: R14 for Performance, Shifts and Timesheets, R10 for Expenses, R1 850 flat for Recruitment",
      "A 30 day trial with demo data or your own, no credit card and nothing to cancel",
      "A mobile app, free with a monthly subscription, for time off, payslips, IRP5 certificates and expenses",
      "Sold and supported by Sage South Africa, and pairs with Sage Payroll",
      "No long term contracts, commitments or hidden fees, by Sage's own statement",
    ],
    cons: [
      "The final price comes from a calculator rather than a table",
      "Payroll is not part of it, so it connects to Sage Payroll or another product",
      "The pricing page does not say how South African leave types are configured",
      "Recruitment is a flat R1 850 a month, which is dear for a very small team",
    ],
    stats: [
      { label: "Core HR and leave", value: "R28 per employee", note: "A month, the base of every plan" },
      { label: "Performance, Shifts, Timesheets", value: "R14 per employee", note: "Each, a month" },
      { label: "Expenses", value: "R10 per employee", note: "A month" },
      { label: "Recruitment", value: "R1 850 a month", note: "A flat price for the whole company" },
      { label: "All four per employee modules", value: "R66 per employee", note: "Core, Timesheets, Performance and Expenses together" },
      { label: "Ten employees, core only", value: "R280 a month", note: "R28 times ten" },
      { label: "Free trial", value: "30 days", note: "No credit card, ends automatically" },
      { label: "Modules", value: "6", note: "Core plus five optional" },
    ],
    basePlans: ["Core HR and leave management"],
    addOns: [
      { name: "Performance", monthly: 14, kind: "seat", note: "Goals, one to ones and 360 feedback" },
      { name: "Shift Scheduling", monthly: 14, kind: "seat", note: "Drag and drop shift planning" },
      { name: "Timesheets", monthly: 14, kind: "seat", note: "Clock in and out, approvals" },
      { name: "Expenses", monthly: 10, kind: "seat", note: "Snap receipts and submit from the app" },
      { name: "Recruitment", monthly: 1850, kind: "flat", note: "Job ads, applicant pipeline and interviews" },
    ],
    sections: [
      {
        heading: "What it is and who it is for",
        paragraphs: [
          "Sage describes Sage HR as an all in one HR solution for growing businesses, best suited to small and medium businesses for work on site or on the go. Core HR and leave management digitalise absence management and the HR essentials. Everything else is an optional module you add as you grow.",
        ],
      },
      {
        heading: "The modules",
        paragraphs: ["Each module is described in a few lines on Sage's page, which is enough to see where the product stops."],
        bullets: [
          "Core HR and leave management: employee records, absence management and the HR essentials",
          "Performance: goals and OKRs, one to one meetings, 360 degree and fast feedback, and surveys on satisfaction and engagement",
          "Timesheets: employees clock in and out from the dashboard or the mobile app, submit timesheets for approval, and managers run approval reports",
          "Shift Scheduling: an interactive, drag and drop planning tool, with groups, areas and templates, and employees see their assigned shifts and updates",
          "Expenses: snap receipts in the app, attach them to expense reports and submit for approval, with receipts turned into entries automatically",
          "Recruitment: custom application fields, a customised hiring flow with pipelines by hiring manager, and candidate information in one place",
        ],
      },
      {
        heading: "The mobile app",
        paragraphs: [
          "Sage's HR app is free to use with a Sage HR monthly subscription. Employees can request time off, view payslips and IRP5 tax certificates, see a shared team calendar, ask colleagues for feedback and claim expenses in several currencies. Managers and HR can accept or decline time off with instant notification, publish payslips and IRP5 certificates and share feedback.",
        ],
      },
      {
        heading: "What it costs",
        paragraphs: [
          "Core HR and leave is R28 per employee a month. A ten person business on core only pays R280 a month. Add Timesheets, Performance and Expenses and the per employee price is R66, so ten people are R660 a month. Recruitment is R1 850 a month for the whole company however many people you hire, which only pays for itself in a business that hires often.",
          "Sage says there are no hidden fees and no long term contracts, and you can change modules at any time. The calculator on this page adds the modules for you.",
        ],
      },
      {
        heading: "South African fit",
        paragraphs: [
          "Sage HR is sold and supported by Sage South Africa, with its own South African pricing page, and the mobile app shows payslips and IRP5 certificates. Leave rules are the heart of South African HR, and Sage's payroll pages describe leave managed under the Basic Conditions of Employment Act. The HR pricing page itself does not detail how leave is configured, so ask Sage South Africa to show you how family responsibility and maternity leave are set up in the trial.",
          "Customers Sage quotes include South African employers such as Newscafe and Marimba Jam.",
        ],
      },
      {
        heading: "Where it falls short",
        paragraphs: [
          "Payroll is not part of Sage HR, so you connect it to Sage Payroll or another payroll product. The price depends on a calculator rather than a table, which makes quick comparison harder.",
        ],
      },
      {
        heading: "How it compares",
        paragraphs: [
          "Against BambooHR, Sage HR is priced in rand and sold locally, while BambooHR limits its payroll and benefits add ons to US employees. Read the full comparison for the plan detail.",
        ],
      },
    ],
    faqs: [
      { q: "How much is Sage HR for ten employees?", a: "Core HR and leave is R280 a month for ten employees. With Timesheets, Performance and Expenses added it is R660 a month. Recruitment, if you add it, is a flat R1 850 on top." },
      { q: "Is the mobile app extra?", a: "Sage says the app is free to use if you have a Sage HR monthly subscription." },
      { q: "Do I have to pay for modules I do not use?", a: "No. You buy Core HR and leave management, and add modules as you need them. Sage says you can change modules at any time." },
      { q: "Does the free trial need a credit card?", a: "No. The 30 day trial needs no payment details and ends automatically, so there is nothing to cancel. You can use demo data or your own employee information." },
    ],
    verdict:
      "A sensible, locally supported HR product for a business that wants to start small. Use the trial with your real employee data, add up your modules with the calculator, and ask how South African leave types are configured.",
    sources: [
      { label: "Sage HR", url: `${SAGE}/sage-business-cloud/hr/` },
      { label: "Sage HR pricing", url: `${SAGE}/sage-business-cloud/hr/pricing/` },
    ],
    researchedAt: DATE,
  },

  /* ---------------------------------------------------------------- Sage Intacct */
  {
    slug: "sage-intacct",
    headline: "Enterprise grade cloud financials for finance teams that have outgrown small business software, from about a thousand pounds a month.",
    summary:
      "Sage Intacct is Sage's cloud financial management platform for mid sized and growing businesses. Sage's South African page says plans start from about R22 000 a month, converted from its price in pounds, and are tailored to the size and needs of the organisation. It stresses multi entity consolidation, dimensional reporting, a set of AI agents and Sage Copilot, which is included.",
    bestFor: [
      "Finance teams running several entities that need consolidation and eliminations",
      "Businesses in industries Sage targets, such as professional services, software, wholesale and non profits",
      "Companies that have outgrown Sage 50 Pastel or Sage 200 Evolution",
    ],
    thinkTwice: [
      "You run a small business, because this is built for finance teams, not for one person",
      "You need an exact price to compare, because Sage tailors it to the organisation",
      "You expect a quick start, because a platform of this kind is usually implemented, not just switched on",
    ],
    pros: [
      "Multi entity accounting with consolidation and automated eliminations",
      "Dimensional dashboards and reporting across financial and operational data",
      "AI agents for bill entry, outlier checks and month end close, and Sage Copilot included",
      "A stated starting point of about R22 000 a month, so the scale of cost is known",
      "Launched locally in 2020, with switching paths from Sage 50 Pastel and Sage 200 Evolution",
    ],
    cons: [
      "The price is tailored, so about R22 000 a month is a floor and a quote is needed",
      "Too much product for a small business",
      "Claims such as closing books up to 90 percent faster are Sage's own and untested here",
      "A platform of this kind is usually implemented, not just switched on",
    ],
    stats: [
      { label: "Plans start from", value: "About R22 000 a month", note: "Sage's starting figure on its South African page, converted from pounds" },
      { label: "Finance teams", value: "30,000 plus", note: "Sage's own count, worldwide" },
      { label: "Close books faster", value: "Up to 90%", note: "Sage's claim, not tested here" },
      { label: "Manual tasks automated", value: "50 to 90%", note: "Sage's claim" },
      { label: "Return on investment", value: "About 5 times", note: "What Sage says customers typically see" },
      { label: "Launched in South Africa", value: "2020", note: "By Sage South Africa" },
      { label: "AI", value: "Sage Copilot included", note: "Plus agents for bills, assurance and close" },
      { label: "Vendor founded", value: "1981", note: "Sage Group plc" },
    ],
    sections: [
      {
        heading: "What it is and who it is for",
        paragraphs: [
          "Sage Intacct is a cloud financial management and accounting system. Sage's South African page lists it among its products for medium businesses and describes it as AI powered, high performance finance software that delivers real time insights. It sits above Sage Accounting and Sage 50 Pastel in the range, and Sage publishes migration pages for businesses switching from Sage 50 Pastel and Sage 200 Evolution.",
        ],
      },
      {
        heading: "What you get",
        paragraphs: [
          "Sage highlights multi entity accounting that lets you manage all entities in a single system and consolidate hundreds of them in minutes, with automated eliminations and adjustments. It describes an intelligent ledger that brings financial and operational data together for budgeting and forecasting, with customisable, drillable dashboards.",
        ],
        bullets: [
          "Multi entity accounting and consolidation",
          "Multi dimensional dashboards and reporting",
          "AP Automation agent for bill entry, matching and duplicate detection",
          "Financial Assurance agent that watches for outliers and reconciliation mismatches",
          "Close agent for month end and year end close",
          "Financial Intelligence agent that answers questions in natural language",
          "Sage Copilot, now included, as an AI accounting assistant",
        ],
      },
      {
        heading: "What it costs",
        paragraphs: [
          "Sage's South African page says Sage Intacct pricing is tailored to your organisation's size and specific needs, with plans starting from about R22 000 a month, and that customers typically see returns of around five times their investment. Sage lists the figure in pounds on a South African page, so the rand amount is converted at the day's reference rate. It is before implementation, which is a separate project.",
          "Because the price is tailored, treat about R22 000 a month as the floor. Ask Sage South Africa for a written quote that covers licences, implementation, training and the first two years of support.",
        ],
      },
      {
        heading: "South African fit",
        paragraphs: [
          "Sage South Africa launched Intacct locally in 2020 and sells and supports it on the same phone line as its other products. Sage's Africa pages describe South African VAT and statutory reporting support, and its South African page offers switching paths from Sage 50 Pastel and Sage 200 Evolution, which are South African products. The product page itself speaks in global terms, so ask Sage for a demonstration of your own VAT and banking set up.",
          "A South African customer Sage quotes is Q4 Fuel, whose senior accountant says processing times fell by 10 to 20 percent a month and that inventory and margin analysis now covers the whole group.",
        ],
      },
      {
        heading: "Where it falls short",
        paragraphs: [
          "It is too much product for a small business, the price is tailored rather than listed, and the headline claims on the page are Sage's own. Implementation is a project in itself.",
        ],
      },
      {
        heading: "How it compares",
        paragraphs: [
          "Sage says Intacct is for finance teams that have outgrown Sage 50 or Sage Business Cloud. Within the range it sits above Sage 50cloud Pastel and next to Sage 200 Evolution and Sage X3, which are ERP products with stock and manufacturing in them.",
        ],
      },
    ],
    faqs: [
      { q: "What does Sage Intacct cost?", a: "Sage's South African page says plans start from about R22 000 a month, converted from pounds at the day's rate and tailored to the size and needs of the organisation. Implementation is extra." },
      { q: "Can I implement it myself?", a: "A platform of this kind is usually implemented with Sage or a partner. Ask Sage for the scope, the timeline and the cost in writing." },
    ],
    verdict:
      "A serious option when consolidation and reporting matter more than a quick start. Treat the efficiency claims as marketing, ask Sage South Africa for a written quote, and ask for a demonstration of your own VAT and banking set up.",
    sources: [{ label: "Sage Intacct", url: `${SAGE}/sage-business-cloud/intacct/` }],
    researchedAt: DATE,
  },

  /* ------------------------------------------------------- Sage 200 Evolution */
  {
    slug: "sage-200-evolution",
    headline: "Sage's all in one business management system for growing South African firms, sold and set up through local partners.",
    summary:
      "Sage 200 Evolution is Sage's ERP for growing small and medium businesses in South Africa. Sage describes it as a modular, all in one system covering financials, sales, customers, inventory and billing, with integrated business intelligence and direct bank connections. It publishes no price and invites you to request a demo, so plan on a written quote and an implementation partner.",
    bestFor: [
      "Growing small and medium businesses that have outgrown accounting software",
      "Companies already on Sage Pastel that want a path to full ERP",
      "Firms that want a modular system they can extend with industry modules",
    ],
    thinkTwice: [
      "You want a price you can compare today, because none is published",
      "You want a cloud only product, because the page does not describe the deployment in detail",
      "You are a very small business, where Sage Accounting is simpler",
    ],
    pros: [
      "Financials, sales, customers, inventory and billing in one modular system",
      "A direct bank connection and automated reconciliation",
      "Integrated business intelligence, with dashboards, reports and alerts",
      "VAT201 submission to SARS has been available since Evolution version 11",
      "Sold and supported locally through Evolution business partners, with 24 hour access to the Sage City community",
    ],
    cons: [
      "No published price: request a demo",
      "The page gives no user limits, deployment model or integration detail",
      "Set up should be done by a qualified Evolution business partner",
      "More than a very small business needs",
    ],
    stats: [
      { label: "Price", value: "On request", note: "Through a demo and a partner quote" },
      { label: "Aimed at", value: "Growing SMEs", note: "In all industries, by Sage's description" },
      { label: "Support", value: "Partner, email, chat", note: "Plus 24 hour access to Sage City and video guides" },
      { label: "VAT201 to SARS", value: "From version 11", note: "Per Sage's community hub" },
      { label: "Customers named", value: "SA firms", note: "Simply Asia and Mrs Garlic" },
      { label: "Vendor founded", value: "1981", note: "Sage Group plc" },
    ],
    sections: [
      {
        heading: "What it is and who it is for",
        paragraphs: [
          "Sage 200 Evolution is pitched at businesses that have grown beyond simple accounting. Sage describes it as an end to end business management solution for growing small and medium businesses in all industries, bringing finance, purchase orders, cash flow, sales, reporting and stock management into one place, so that you consolidate tasks that used to sit in separate systems.",
        ],
      },
      {
        heading: "What you get",
        paragraphs: ["Sage groups the benefits under finance, customer management and reporting."],
        bullets: [
          "Automated transactions and account reconciliation, with a direct bank connection and data imports",
          "Sales, customers, pricing and discounts, inventory and billing in one system",
          "A 360 degree view of customers, and real time inventory and pricing changes",
          "Integrated business intelligence, with custom dashboards, reports and alerts you can configure",
          "Specialised modules for industry specific requirements, and marketplace apps",
          "Automation of time consuming tasks and real time data for quotes, purchase orders and cash flow",
        ],
      },
      {
        heading: "Support and set up",
        paragraphs: [
          "Sage says you get award winning support through your business partner, email and online chat, with 24 hour access to its Sage City community, step by step video guides and instructor led courses. Sage's community hub says the set up should be done by a qualified Evolution business partner, which is how most of the cost arises.",
        ],
      },
      {
        heading: "South African fit",
        paragraphs: [
          "The page speaks of keeping up with legislation, with tax and legal admin covered, and Sage South Africa sells and supports the product locally. Sage's community hub shows that VAT201 submission to SARS has been available since Evolution version 11. The page lists no bank names, so ask your partner which of your banks connect.",
          "South African customers Sage quotes include Simply Asia and Mrs Garlic.",
        ],
      },
      {
        heading: "Where it falls short",
        paragraphs: [
          "The page is marketing language and does not state user limits, deployment model or integration details. ERP projects succeed or fail on implementation, so the partner you choose matters as much as the product.",
        ],
      },
      {
        heading: "How it compares",
        paragraphs: ["Within Sage's range it sits above Sage 50cloud Pastel and beside Sage X3, which is aimed at manufacturers and distributors across several entities or countries."],
      },
    ],
    faqs: [
      { q: "What does Sage 200 Evolution cost?", a: "Sage publishes no price. You request a demo, and a business partner quotes licences and implementation. Ask for both in writing, with the VAT basis stated." },
      { q: "Does it submit VAT to SARS?", a: "Sage's community hub says VAT201 submission to SARS is available from Evolution version 11, set up by a qualified business partner." },
    ],
    verdict:
      "A natural next step for a growing South African business that already knows Sage. Insist on a demonstration with your own processes, a written quote with implementation costs, and references from a business of your size.",
    sources: [{ label: "Sage 200 Evolution", url: `${SAGE}/products/sage-200-evolution/` }],
    researchedAt: DATE,
  },

  /* --------------------------------------------------------------------- Sage X3 */
  {
    slug: "sage-x3",
    headline: "A cloud first ERP for product businesses that operate across entities and countries, with Sage Copilot built in.",
    summary:
      "Sage X3 is the ERP Sage sells to midsized, product centric businesses, from single entities to global multi entity groups. Sage's page describes cloud delivery with other options, built in AI, manufacturing in discrete, process and mixed modes, and operation across multiple countries and legislations. It publishes no price and asks you to request one.",
    bestFor: [
      "Manufacturers and distributors with multiple entities, sites or countries",
      "Businesses that need lot, batch and recall traceability",
      "Companies that want an ERP they can extend with low code tools and APIs",
    ],
    thinkTwice: [
      "You are a small single entity business, because the product is built for complexity",
      "You need a price to plan with, because none is published",
      "You expect AI claims to be proved, because the figures on the page are Sage's own",
    ],
    pros: [
      "Multi entity and multi country consolidation, with multiple currencies",
      "Discrete, process and mixed mode manufacturing",
      "Lot, batch and recall traceability",
      "Low code tools and modern APIs to configure and extend it",
      "Sage Copilot built into workflows, and role based dashboards",
    ],
    cons: [
      "No published price: request pricing",
      "Built for complexity, so heavy for a small single entity business",
      "Headline claims such as 75 percent of orders automated are Sage's own",
      "Implementation, customisation and training are large costs the page does not state",
    ],
    stats: [
      { label: "Price", value: "On request", note: "Sage quotes it" },
      { label: "Orders automated", value: "Up to 75%", note: "Sage's claim" },
      { label: "Production efficiency", value: "Up to 50%", note: "Sage's claim" },
      { label: "Less manual work", value: "Up to 30%", note: "Sage's claim, through AI invoice processing" },
      { label: "Deployment", value: "Cloud first", note: "Hosted private or customer infrastructure also offered" },
      { label: "Manufacturing", value: "3 modes", note: "Discrete, process and mixed" },
    ],
    sections: [
      {
        heading: "What it is and who it is for",
        paragraphs: [
          "Sage describes X3 as a modern cloud ERP powered by AI, designed to start simple and scale from single entities to global, multi entity organisations. It is aimed at businesses that make, move and sell products, and it unifies finance, supply chain and manufacturing.",
        ],
      },
      {
        heading: "What you get",
        paragraphs: ["Sage groups the capabilities into control, multi entity operation, configurability and AI."],
        bullets: [
          "Finance, inventory, supply chain and production in one platform",
          "Support for discrete, process and mixed mode manufacturing, with lot, batch and recall controls",
          "Multi entity and multi country consolidation, with multiple currencies and legislations",
          "Local tax, accounting and regulatory requirements handled as standard in the countries it supports",
          "Low code tools to configure workflows, screens and business rules, plus modern APIs",
          "Sage Copilot for conversational interaction and real time alerts, and automation of work such as invoice handling",
        ],
      },
      {
        heading: "Deployment",
        paragraphs: [
          "Sage calls the experience cloud first, with other deployment options available. An analyst quotation on Sage's page says X3 offers public cloud, hosted in a private environment or on the customer's own infrastructure, with pricing flexibility that midsized firms look for.",
        ],
      },
      {
        heading: "South African fit",
        paragraphs: [
          "Sage South Africa sells and supports Sage X3 on its South African site, and the page says local tax, accounting and regulatory requirements are handled as standard in the countries it supports. For South African specifics such as the VAT201 and your banks, ask Sage South Africa for a demonstration and for a local reference customer.",
        ],
      },
      {
        heading: "Where it falls short",
        paragraphs: [
          "As with any ERP at this level, the product is only part of the cost. Implementation, customisation and training are large, and the page gives no figures for them.",
        ],
      },
      {
        heading: "How it compares",
        paragraphs: ["Within Sage's range it sits beside Sage 200 Evolution, which suits growing South African businesses, and above Sage Intacct for businesses whose complexity is in stock and production rather than in the ledger."],
      },
    ],
    faqs: [
      { q: "What does Sage X3 cost?", a: "Sage publishes no price. Ask for a written quote that covers licences, implementation, training and the first two years of support." },
      { q: "Which industries is it for?", a: "Sage aims it at product businesses: manufacturers, distributors and others that make, move and sell products, including process manufacturing, chemicals, food and beverage and wholesale distribution." },
    ],
    verdict:
      "A serious option for a growing manufacturer or distributor. Ask for a written quote including implementation, test the South African tax handling in a live demonstration, and speak to a customer in your industry.",
    sources: [{ label: "Sage X3", url: `${SAGE}/sage-business-cloud/sage-x3/` }],
    researchedAt: DATE,
  },

  /* -------------------------------------------------------------------- Sage CRM */
  {
    slug: "sage-crm",
    headline: "A CRM sold as an extension of your existing Sage system, with no published price.",
    summary:
      "Sage CRM is the customer relationship product from Sage, and its South African page is written for existing Sage customers. It offers a fully integrated CRM, or separate Sales, Marketing and Service modules, a Mailchimp connection for campaigns and a request a callback route. No price is published.",
    bestFor: [
      "Businesses already running Sage 200 Evolution, Sage X3 or Sage 300 that want CRM data joined to their ERP",
      "Teams that want sales, marketing and service in one connected system",
    ],
    thinkTwice: [
      "You do not use Sage elsewhere, because the value is the integration",
      "You want a published price or a self service trial",
      "You want a modern, fast to set up CRM, where Sage Sales Management or a rival may suit better",
    ],
    pros: [
      "Joins CRM data to a Sage ERP such as Sage 300",
      "Sales, marketing and service modules, taken together or separately",
      "A Mailchimp connection to send and track email campaigns",
      "Sold and supported in South Africa, with a callback service",
    ],
    cons: [
      "No published price: only a request a callback route",
      "Little reason to choose it if you do not use Sage elsewhere",
      "The page is light on specifics such as limits and mobile apps",
      "Sage Sales Management may suit a fresh start better",
    ],
    stats: [
      { label: "Price", value: "On request", note: "Through a callback" },
      { label: "Modules", value: "3 plus integrated", note: "Sales, Marketing and Service, or all together" },
      { label: "Campaigns", value: "Mailchimp", note: "Send there, track in Sage CRM" },
      { label: "Customers", value: "Hundreds", note: "Sage's own statement, worldwide" },
      { label: "Newer option", value: "Sage Sales Management", note: "Sage describes it as AI powered" },
    ],
    sections: [
      {
        heading: "What it is and who it is for",
        paragraphs: [
          "Sage CRM is aimed at Sage business management customers. The page says that as a Sage customer you can choose fully integrated CRM or the Sales, Marketing or Service modules to suit your needs. It talks about automating quotes and orders, forecasting sales, progressing leads into opportunities and tracking orders in a Sage ERP such as Sage 300.",
        ],
      },
      {
        heading: "What you get",
        paragraphs: [
          "Sage lists a consolidated view of customer data so teams avoid duplicated work, tools that let marketing identify the sources of leads, opportunities and closed sales, and targeted email campaigns through Mailchimp, tracked in Sage CRM.",
        ],
      },
      {
        heading: "South African fit",
        paragraphs: [
          "Sage CRM is sold and supported by Sage South Africa, which offers a South African callback service, and it is designed to sit alongside the Sage business management products that South African firms already run.",
        ],
      },
      {
        heading: "Where it falls short",
        paragraphs: [
          "The page is general in its claims and light on product specifics. For a business that is not a Sage customer, the strongest argument for the product disappears.",
        ],
      },
    ],
    faqs: [
      { q: "What does Sage CRM cost?", a: "Sage publishes no price. You ask for a callback and receive a quote. Ask for the price per user, the modules it includes and the VAT basis in writing." },
    ],
    verdict:
      "Sensible if you run a Sage ERP and want the data to flow into CRM. If you are choosing a CRM from scratch, compare it with Sage Sales Management, Zoho CRM and HubSpot, and insist on a written quote.",
    sources: [{ label: "Sage CRM", url: `${SAGE}/products/sage-crm/` }],
    researchedAt: DATE,
  },

  /* ------------------------------------------------------ Sage Pastel Payroll */
  {
    slug: "sage-pastel-payroll",
    headline: "The long running desktop payroll that Sage still updates, sold by quote, with cloud payroll beside it.",
    summary:
      "Sage Pastel Payroll is the desktop payroll product that many South African employers have run for years. Sage's community hub shows it still receives legislative updates, and Sage's cloud payroll range, Payroll Professional and Payroll Advanced with built in HR, sits beside it. Pastel Payroll is quoted on request.",
    bestFor: [
      "Established employers already running Pastel Payroll who want continuity",
      "Bookkeepers who know the product well and prefer a desktop workflow",
    ],
    thinkTwice: [
      "You want a cloud product with automatic updates and anywhere access, where Sage Payroll or Payroll Professional fit better",
      "You want a published price, because Pastel Payroll is sold by quote",
      "You expect payroll and HR in one browser based product",
    ],
    pros: [
      "A long running desktop payroll that still receives legislative updates",
      "Well known to many South African bookkeepers",
      "Sold and supported in South Africa",
      "Sage publishes a migration path to its cloud payroll products",
    ],
    cons: [
      "No published price: it is sold by quote",
      "A desktop product, so installation, updates and backups are yours to manage",
      "No remote access of the kind a cloud product gives",
      "For a new purchase, Sage's cloud payroll products fit better",
    ],
    stats: [
      { label: "Price", value: "On request", note: "Sold by quote" },
      { label: "Type", value: "Desktop payroll", note: "Installed on your PC" },
      { label: "Cloud siblings", value: "4", note: "Payroll, Payroll Professional, Payroll Advanced and 300 People" },
      { label: "Vendor founded", value: "1981", note: "Sage Group plc" },
    ],
    sections: [
      {
        heading: "What it is and who it is for",
        paragraphs: [
          "Pastel Payroll is the desktop payroll and HR software from Sage's Pastel heritage. Sage's community hub posts legislative updates for it, which shows the product is still maintained.",
        ],
      },
      {
        heading: "The cloud successors",
        paragraphs: [
          "Sage Payroll Professional is a true cloud payroll with automatic updates for PAYE and UIF, Employment Equity guidance, leave management, personnel records for interviews, training and qualifications, and employee and manager self service for payslips. Sage says it is available across Southern Africa and the wider continent, with a simple migration for existing customers. Sage Payroll Advanced adds built in HR, and Sage 300 People targets South African businesses with 100 or more employees.",
          "For SARS, Sage's community hub documents how Payroll Professional produces the live run IRP5 file and how that file is imported into SARS e@syFile, where the EMP501 declaration, including the EMP201 values for PAYE, SDL, UIF and ETI, is completed and submitted.",
        ],
      },
      {
        heading: "Where it falls short",
        paragraphs: [
          "As a desktop product it needs installation, updates and backups to be managed, and it cannot match a cloud product's remote access. The cost cannot be compared without a quote.",
        ],
      },
    ],
    faqs: [
      { q: "Is Pastel Payroll still updated?", a: "Sage's community hub posts legislative updates for it, so it is still maintained. Ask Sage how long it will keep supporting your version." },
      { q: "Should I move to the cloud?", a: "Sage publishes a migration path to Payroll Professional and Payroll Advanced. Ask Sage what the migration costs for your employee count." },
    ],
    verdict:
      "Right for an employer that already runs it and has no wish to move. For a new purchase, look at Sage Payroll for a small business or Payroll Professional for a larger one, and ask Sage what the migration path costs.",
    sources: [{ label: "Sage Payroll Professional", url: `${SAGE}/sage-business-cloud/payroll-professional/` }],
    researchedAt: DATE,
  },
];
