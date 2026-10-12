/**
 * The glossary: the South African tax, payroll, labour and privacy terms a
 * software buyer meets, in plain words, and the software terms the register uses.
 *
 * Statutory entries are limited to facts that are stable and widely published,
 * the same short list the guides use, and each links to the guide that explains it
 * in full. They explain rules; they are not tax, legal or financial advice. The
 * VAT rate is not typed into an entry. The page fills it from the one place it is
 * defined.
 *
 * Copy contains no hyphens and no dashes. Rewrite the sentence instead.
 */

export type GlossaryGroup = "Tax and VAT" | "Payroll and labour" | "Privacy and company law" | "Software";

export interface GlossaryTerm {
  term: string;
  /** What the letters stand for, where they stand for something. */
  full?: string;
  group: GlossaryGroup;
  /** One or two plain sentences. {{vat_pct}} is filled from the site's VAT rate. */
  meaning: string;
  /** Who it applies to, or when. */
  applies?: string;
  links?: { label: string; href: string }[];
}

export const GLOSSARY: GlossaryTerm[] = [
  /* ------------------------------------------------------------- tax and VAT */
  {
    term: "SARS",
    full: "South African Revenue Service",
    group: "Tax and VAT",
    meaning: "The national tax authority. It collects income tax, VAT, PAYE and the other taxes, and receives the returns that payroll and accounting software prepare.",
    links: [{ label: "The compliance calendar", href: "/briefings/the-south-african-small-business-compliance-calendar" }],
  },
  {
    term: "SARS eFiling",
    group: "Tax and VAT",
    meaning: "SARS's online service, where returns are submitted and payments are made. Software can prepare the figures for a return, and some products can also transfer them into eFiling so no one retypes them.",
    links: [{ label: "VAT and the VAT201 return", href: "/briefings/vat-and-the-vat201-return" }],
  },
  {
    term: "VAT",
    full: "Value added tax",
    group: "Tax and VAT",
    meaning: "A tax on most goods and services, charged at the standard rate of {{vat_pct}} percent. A business must register once its taxable turnover passes R1 million in any twelve month period, and may register voluntarily once its taxable supplies have passed R50 000 in twelve months.",
    applies: "Every business that is registered for VAT, and every business that buys from one.",
    links: [
      { label: "Including and excluding VAT in a software price", href: "/briefings/including-and-excluding-vat" },
      { label: "VAT and the VAT201 return", href: "/briefings/vat-and-the-vat201-return" },
    ],
  },
  {
    term: "VAT201",
    group: "Tax and VAT",
    meaning: "The return a VAT registered business submits to SARS for each tax period. Most small vendors file every two months and larger ones monthly. Accounting software can prepare its figures from the ledger.",
    applies: "VAT registered vendors.",
    links: [{ label: "Accounting software that prepares the VAT201", href: "/lists/accounting-software-that-prepares-the-vat201" }],
  },
  {
    term: "Output tax and input tax",
    group: "Tax and VAT",
    meaning: "Output tax is the VAT you charge your customers. Input tax is the VAT your suppliers charge you. The VAT201 works out the difference: you pay SARS the excess of output over input, or SARS owes you a refund. Input tax can only be claimed on a valid tax invoice.",
    applies: "VAT registered vendors.",
  },
  {
    term: "Tax invoice",
    group: "Tax and VAT",
    meaning: "The document the VAT Act requires for a taxable supply. A full tax invoice shows, among other things, the supplier's name, address and VAT number, the customer's details, a serial number and date, a description and the VAT. Where the total is R5 000 or less, a shorter abridged invoice is allowed.",
    applies: "VAT registered suppliers, and their customers who claim input tax.",
    links: [{ label: "What a valid tax invoice needs", href: "/briefings/a-valid-tax-invoice-in-south-africa" }],
  },
  {
    term: "Invoice basis and payments basis",
    group: "Tax and VAT",
    meaning: "Two ways of timing VAT. On the invoice basis VAT is accounted for when an invoice is issued or received. On the payments basis it is accounted for when money is paid or received. The payments basis is open to smaller vendors whose taxable supplies stay under R2.5 million a year, with SARS's approval.",
    applies: "VAT registered vendors.",
  },
  {
    term: "Zero rated and exempt supplies",
    group: "Tax and VAT",
    meaning: "A zero rated supply, such as an export or some basic foodstuffs, is charged VAT at 0 percent and still goes on the return. An exempt supply, such as residential rent, is outside VAT, does not go on the return and carries no input tax claim for its costs.",
    applies: "VAT registered vendors.",
  },
  {
    term: "Provisional tax",
    full: "IRP6",
    group: "Tax and VAT",
    meaning: "Income tax paid in advance during the year by provisional taxpayers, through two payments, usually at the end of August and the end of February for individuals, with an optional third after the year end. The return that goes with each payment is the IRP6. Companies follow their own year end.",
    applies: "Provisional taxpayers.",
    links: [{ label: "The compliance calendar", href: "/briefings/the-south-african-small-business-compliance-calendar" }],
  },

  /* ----------------------------------------------------- payroll and labour */
  {
    term: "PAYE",
    full: "Pay as you earn",
    group: "Payroll and labour",
    meaning: "Income tax that an employer withholds from an employee's pay and pays over to SARS. It is declared on the monthly EMP201 and reconciled on the EMP501.",
    applies: "Every employer that pays salaries above the tax threshold.",
    links: [{ label: "Payroll returns: EMP201, EMP501 and IRP5", href: "/briefings/payroll-returns-emp201-emp501-irp5" }],
  },
  {
    term: "UIF",
    full: "Unemployment Insurance Fund",
    group: "Payroll and labour",
    meaning: "A fund that pays benefits to workers who lose their income, and during maternity, adoption and parental leave and illness. The employee contributes 1 percent of pay and the employer 1 percent, up to a ceiling the law sets. Employers also declare each month to the Fund.",
    applies: "Most employers and employees.",
    links: [{ label: "Payroll software that calculates UIF", href: "/lists/payroll-software-that-calculates-uif" }],
  },
  {
    term: "SDL",
    full: "Skills Development Levy",
    group: "Payroll and labour",
    meaning: "A levy of 1 percent of payroll, paid by employers whose annual payroll is above R500 000. It is declared and paid on the monthly EMP201.",
    applies: "Employers above the payroll threshold.",
  },
  {
    term: "ETI",
    full: "Employment Tax Incentive",
    group: "Payroll and labour",
    meaning: "An incentive that reduces the PAYE an employer pays on qualifying young employees, within limits the law sets. It is claimed through the EMP201.",
    applies: "Employers with qualifying employees.",
  },
  {
    term: "EMP201",
    group: "Payroll and labour",
    meaning: "The employer's monthly declaration of PAYE, UIF and SDL, with the payment, due by the 7th of the following month.",
    applies: "Every employer.",
    links: [{ label: "Payroll software that prepares the EMP201", href: "/lists/payroll-software-that-prepares-the-emp201" }],
  },
  {
    term: "EMP501",
    group: "Payroll and labour",
    meaning: "The reconciliation of what an employer declared and paid in the EMP201 returns against the certificates it issued to employees. It is done twice a year: an interim reconciliation and an annual one.",
    applies: "Every employer.",
    links: [{ label: "Payroll software for the EMP501 reconciliation", href: "/lists/payroll-software-for-the-emp501-reconciliation" }],
  },
  {
    term: "IRP5",
    group: "Payroll and labour",
    meaning: "The tax certificate an employer issues to an employee, showing income and the PAYE withheld, after the tax year ends. Employees need it for their own tax returns.",
    applies: "Employers, for each employee from whom PAYE was withheld.",
    links: [{ label: "Payroll software that issues IRP5 certificates", href: "/lists/payroll-software-that-issues-irp5-certificates" }],
  },
  {
    term: "IT3(a)",
    group: "Payroll and labour",
    meaning: "The certificate an employer issues, in place of an IRP5, for an employee from whom no PAYE was withheld.",
    applies: "Employers, for employees below the tax threshold.",
    links: [{ label: "Payroll software that issues IT3(a) certificates", href: "/lists/payroll-software-that-issues-it3a-certificates" }],
  },
  {
    term: "e@syFile",
    group: "Payroll and labour",
    meaning: "A SARS desktop application that payroll output is commonly loaded into for EMP501 reconciliations and certificate submissions. A payroll product that works with it saves you retyping.",
    applies: "Employers.",
    links: [{ label: "Payroll software with e@syFile", href: "/lists/payroll-software-with-easyfile" }],
  },
  {
    term: "uFiling",
    group: "Payroll and labour",
    meaning: "The Unemployment Insurance Fund's online service, where an employer declares its UIF contributions and employees.",
    applies: "Employers who contribute to UIF.",
  },
  {
    term: "COIDA",
    full: "Compensation for Occupational Injuries and Diseases Act",
    group: "Payroll and labour",
    meaning: "The law under which employers register with the Compensation Fund and pay a levy that covers employees injured or made ill at work. Employers file an annual Return of Earnings, usually between April and the end of May.",
    applies: "Employers.",
  },
  {
    term: "BCEA",
    full: "Basic Conditions of Employment Act",
    group: "Payroll and labour",
    meaning: "The law that sets the minimum conditions of employment, including leave: 21 consecutive days of annual leave a cycle, sick leave over a three year cycle, family responsibility leave, and maternity and parental leave. Contracts can give more, never less.",
    applies: "Most employers and employees.",
    links: [{ label: "BCEA leave: what HR software must accrue", href: "/briefings/bcea-leave-what-hr-software-must-accrue" }],
  },
  {
    term: "CCMA",
    full: "Commission for Conciliation, Mediation and Arbitration",
    group: "Payroll and labour",
    meaning: "The body that resolves many labour disputes, such as dismissals and unpaid leave. The records an HR system keeps, such as a leave balance or a warning, are what an employer produces there.",
    applies: "Employers and employees in a dispute.",
  },

  /* -------------------------------------------------- privacy and company law */
  {
    term: "POPIA",
    full: "Protection of Personal Information Act",
    group: "Privacy and company law",
    meaning: "The law that governs how personal information is collected, kept and used. It has been fully enforceable since 1 July 2021 and applies to any business that holds customer, supplier or employee details, including in its software.",
    applies: "Every business.",
    links: [{ label: "POPIA and your software vendor", href: "/briefings/popia-and-your-software-vendor" }],
  },
  {
    term: "Information Regulator",
    group: "Privacy and company law",
    meaning: "The body that enforces POPIA. A business notifies it, and the people affected, when personal information is compromised, and registers its information officer with it.",
    applies: "Every business that holds personal information.",
  },
  {
    term: "Information officer",
    group: "Privacy and company law",
    meaning: "The person responsible for a business's compliance with POPIA, registered with the Information Regulator. In a small business it is usually the owner or the head of the business.",
    applies: "Every business.",
  },
  {
    term: "Responsible party and operator",
    group: "Privacy and company law",
    meaning: "The responsible party is the business that decides why and how personal information is used. An operator, such as a software vendor, handles it on the business's behalf under a written contract. The responsible party stays accountable for what its operators do.",
    applies: "Every business and its software vendors.",
    links: [{ label: "POPIA and your software vendor", href: "/briefings/popia-and-your-software-vendor" }],
  },
  {
    term: "CIPC",
    full: "Companies and Intellectual Property Commission",
    group: "Privacy and company law",
    meaning: "The body that registers companies and keeps their records. A registered company files an annual return with it after each anniversary of its registration.",
    applies: "Registered companies.",
  },

  /* ------------------------------------------------------------------ software */
  {
    term: "Bank feed",
    group: "Software",
    meaning: "A connection between your bank and your accounting software that brings your transactions in every day, so you reconcile instead of typing. Coverage of South African banks varies by product and by account type.",
    links: [{ label: "Bank feeds, bank by bank", href: "/briefings/bank-feeds-by-bank" }],
  },
  {
    term: "Bank reconciliation",
    group: "Software",
    meaning: "Checking that the transactions in your books match your bank statement, so the balance in the software equals the balance at the bank. It is the monthly job that bank feeds exist to shorten.",
  },
  {
    term: "ERP",
    full: "Enterprise resource planning",
    group: "Software",
    meaning: "One system that holds a business's accounts, stock, buying, selling and sometimes production, so one entry updates all of them. It is usually priced by quote and set up by an implementation partner.",
    links: [{ label: "Choosing an ERP in South Africa", href: "/briefings/choosing-an-erp-in-south-africa" }],
  },
  {
    term: "CRM",
    full: "Customer relationship management",
    group: "Software",
    meaning: "Software that keeps the record of every customer and every sale in progress: contacts, conversations, follow ups and the pipeline of deals.",
    links: [{ label: "Choosing a CRM for a South African sales team", href: "/briefings/choosing-a-crm-for-a-south-african-sales-team" }],
  },
  {
    term: "Price basis",
    group: "Software",
    meaning: "What a software price is charged on and whether VAT is in it: per month, per user, per employee, in bands, including or excluding VAT. The register prints the basis beside every price, since two prices are only comparable on the same one.",
    links: [{ label: "What business software costs in rand", href: "/briefings/what-software-costs-in-rand" }],
  },
  {
    term: "Price on request",
    group: "Software",
    meaning: "The vendor gives its price only after you contact it. The register says so and does not estimate a figure. It is different from Free, which means the starting price is zero.",
    links: [{ label: "How to ask for a quote", href: "/briefings/how-to-ask-for-a-quote" }],
  },
  {
    term: "Free plan and free trial",
    group: "Software",
    meaning: "A free plan gives part of a product for as long as the vendor keeps it, with limits. A free trial gives the whole product for a short time and then asks for payment.",
    links: [{ label: "The free tiers on the register", href: "/briefings/free-tiers-on-the-register" }],
  },
  {
    term: "Sold in South Africa",
    group: "Software",
    meaning: "The register's mark for a product whose vendor's own pages show a South African site, rand pricing, a local phone line or South African origin. Other products are available to South African businesses online, with the price shown in rand.",
    links: [{ label: "How the register works", href: "/method" }],
  },
  {
    term: "Implementation partner",
    group: "Software",
    meaning: "A company that sets up a larger product for you, brings your data across and trains your staff, and that you phone when something breaks. It sets its own fee, so two partners can quote very differently for the same product.",
  },
  {
    term: "Cloud and on premise",
    group: "Software",
    meaning: "Cloud software runs on the vendor's servers and is used in a browser or an app, and needs a connection. On premise software runs on a computer or server in your own building and needs power and a backup routine.",
    links: [{ label: "Load shedding and business software", href: "/briefings/load-shedding-and-business-software" }],
  },
];

export const GLOSSARY_GROUPS: GlossaryGroup[] = ["Tax and VAT", "Payroll and labour", "Privacy and company law", "Software"];

export function glossarySlug(term: string): string {
  return term
    .toLowerCase()
    .replace(/[^a-z0-9@()]+/g, "-")
    .replace(/[()@]/g, "")
    .replace(/^-+|-+$/g, "");
}
