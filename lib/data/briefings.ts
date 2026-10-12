import { readTime } from "../read-time";
import type { Briefing } from "../types";
import { DEPTH } from "./briefings-depth";
import { MORE_BRIEFINGS, type Draft } from "./briefings-more";
import { SECTOR_GUIDES } from "./briefings-sectors";

/**
 * Guides.
 *
 * Every guide is written for South African buyers: rand prices, SARS returns,
 * the BCEA, POPIA, South African banks and the realities of load shedding.
 *
 * Two rules govern every line here.
 *
 * 1. Register figures are never typed in. Prose uses {{tokens}} that are filled
 *    from the live dataset at render time, and `live` blocks render tables
 *    straight from the data. If a price or a count changes, the guide
 *    changes with it.
 * 2. Statutory facts are limited to ones that are stable and widely published,
 *    each stated plainly: the VAT rate, the R1 million registration threshold,
 *    the R2.5 million payments basis limit, the contents of a tax invoice and the
 *    R5 000 line for an abridged one, EMP201, EMP501, IRP5, UIF at one percent
 *    each side, SDL at one percent over R500 000 of payroll, the five year record
 *    keeping rule, the usual SARS return dates, POPIA's operator, breach and
 *    cross border rules, and BCEA minimum leave. Nothing here claims what a named
 *    product does with SARS: that comes from the record, where the vendor's page
 *    states it.
 *
 * Reading time is worked out from the words, so it cannot drift from the text.
 * Copy contains no hyphens and no dashes. Rewrite the sentence instead.
 */

const AUTHOR = "Software Register editorial";
const DATE = "2026-10-11";

const FIRST: Draft[] = [
  {
    slug: "what-software-costs-in-rand",
    title: "What business software costs in rand",
    standfirst:
      "{{priced}} products publish a price we could read, {{free}} start free, and {{quoted}} give their price on request. Here is the whole table, and how to read it.",
    topic: "Pricing",
    author: AUTHOR,
    published_at: DATE,
    product_slugs: ["sage-accounting", "xero", "quickbooks-online", "payspace"],
    published: true,
    body: [
      {
        type: "p",
        text: "The register holds {{products}} products across {{sectors}} sectors. Before you build a shortlist, know how they split. {{priced}} publish a list price that we read on the vendor's own page and recorded with its date. {{free}} start at zero. {{quoted}} give their price on request.",
      },
      { type: "h2", text: "The priced products" },
      { type: "live", name: "priced" },
      { type: "h2", text: "Read the basis before the number" },
      {
        type: "p",
        text: "A price is only comparable when you know what it covers. Sage quotes cloud products including VAT and Pastel products excluding it. At {{vat_pct}} percent VAT that gap is real money, so the register prints the basis next to every number: /mo incl VAT, /mo excl VAT, /employee /mo or /user /mo.",
      },
      {
        type: "table",
        head: ["Basis", "What the price is charged on", "What it means for your bill"],
        rows: [
          ["A month, per organisation", "The business, whatever the number of users up to a limit", "Steady until you pass a plan limit, then a step up"],
          ["Per user a month", "Each person who logs in", "Grows with the team, so price it for the team you will have"],
          ["Per employee a month", "Each person on the payroll", "Grows with headcount, and a payroll of twenty costs twenty times the rate"],
          ["In bands", "A range of employees, such as 6 to 10", "Steps at each band, so check where you sit"],
        ],
      },
      { type: "h2", text: "Free is not price on request" },
      {
        type: "p",
        text: "A zero price is a price. A price given on request is a different thing. The register prints Free for the first and Price on request for the second. A product that gives its price on request may well cost less than one that lists, but you cannot know until you ask. [How to ask for a quote](/briefings/how-to-ask-for-a-quote) shows how to turn a quote into something you can compare.",
      },
      { type: "h2", text: "What the number leaves out" },
      {
        type: "ul",
        items: [
          "Extra users, extra companies and add on modules, which many plans sell on top of the headline plan.",
          "Once off charges such as setup, data migration and training, which appear in a quote and rarely on a pricing page.",
          "VAT, where the vendor quotes without it.",
          "The cost of your own time: a cheap product that cannot read your bank costs hours every month.",
        ],
      },
      { type: "h2", text: "Prices in dollars, pounds and euros" },
      {
        type: "p",
        text: "Where a vendor lists in dollars, pounds or euros, the register shows the rand figure at the day's rate and says so. Rand amounts written into a review or a post use the rate of the day it was read. Read [how prices are read](/method) before you rely on any number here.",
      },
      { type: "h2", text: "How to use the table" },
      {
        type: "ol",
        items: [
          "Decide the sector first. A payroll price and a project tool price are not the same kind of price.",
          "Put every price on the same footing, using [including and excluding VAT](/briefings/including-and-excluding-vat).",
          "Multiply a per user or per employee price by your real headcount.",
          "Add the extras you know you need: users, companies, modules.",
          "Open the review of each product on your shortlist for its plans, add ons and a calculator that does this sum for you.",
        ],
      },
    ],
  },
  {
    slug: "including-and-excluding-vat",
    title: "Including and excluding VAT in a software price",
    standfirst:
      "Sage quotes cloud products including VAT and Pastel products excluding it. Put both on the same footing and the order changes.",
    topic: "Pricing",
    author: AUTHOR,
    published_at: DATE,
    product_slugs: ["sage-accounting", "sage-50cloud-pastel", "sage-payroll", "xero"],
    published: true,
    body: [
      {
        type: "p",
        text: "South African VAT is {{vat_pct}} percent. A price including VAT is the net price multiplied by {{vat_factor}}. A price excluding VAT needs {{vat_pct}} percent added before it is comparable with one that already includes it.",
      },
      { type: "live", name: "vat" },
      { type: "h2", text: "A worked example" },
      {
        type: "p",
        text: "Take a product at R100 a month excluding VAT and another at R110 a month including VAT. The second looks dearer. Put them on one footing and the first is R115 including VAT while the second is about R95.65 excluding it. The cheaper product is the second one, by a wider margin than the headline suggests.",
      },
      {
        type: "table",
        head: ["Listed price", "To get the price including VAT", "To get the price excluding VAT"],
        rows: [
          ["Excluding VAT", "Multiply by {{vat_factor}}", "Already there"],
          ["Including VAT", "Already there", "Divide by {{vat_factor}}"],
        ],
      },
      { type: "h2", text: "Which column matters to you" },
      {
        type: "p",
        text: "Which column matters to you depends on whether you are registered for VAT. A registered vendor claims the VAT back as an input, so the excluding figure is the real cost. A business that is not registered pays the including figure and cannot recover it. The R1 million registration threshold is explained in [VAT and the VAT201 return](/briefings/vat-and-the-vat201-return).",
      },
      { type: "h2", text: "Where it goes wrong" },
      {
        type: "ul",
        items: [
          "A per user price multiplies. Eight users at a price excluding VAT is eight times the figure, then {{vat_pct}} percent on top.",
          "A yearly price may be quoted as a monthly figure. Check whether the amount shown is per month when paid yearly, or per month when paid monthly.",
          "Add ons and modules are often priced without VAT even when the plan is priced with it.",
          "A price in dollars is converted to rand at the day's rate, and the VAT is added to the rand amount you are invoiced.",
        ],
      },
      { type: "h2", text: "When the vendor does not say" },
      {
        type: "p",
        text: "Where a vendor does not say whether VAT is in its price, the register shows the plain monthly figure and does not guess. Ask the vendor before you compare it with one that does, and ask for it in writing, since the answer changes the bill by {{vat_pct}} percent.",
      },
      { type: "h2", text: "Check the first invoice" },
      {
        type: "p",
        text: "When the first invoice arrives, check that it is a proper tax invoice with the vendor's VAT number, and that the amount you pay is the amount you were quoted. A registered business needs that invoice to claim the VAT back. See [what a valid tax invoice needs](/briefings/a-valid-tax-invoice-in-south-africa).",
      },
    ],
  },
  {
    slug: "how-to-ask-for-a-quote",
    title: "How to ask for a quote",
    standfirst:
      "{{quoted}} products on the register give their price on request. These are the questions that turn a quote into something you can compare.",
    topic: "Pricing",
    author: AUTHOR,
    published_at: DATE,
    product_slugs: [],
    published: true,
    body: [
      {
        type: "p",
        text: "A product that gives its price on request is not hiding anything. ERP and enterprise payroll are priced by company size and scope, and no two businesses want the same thing. But a quote that arrives as a single number is not a comparison. Ask for these in writing.",
      },
      { type: "live", name: "quoted" },
      { type: "h2", text: "Ask every vendor" },
      {
        type: "ul",
        items: [
          "The price per month and per year, with the VAT basis stated.",
          "The total for twelve months in rand, with VAT shown on its own line.",
          "What is charged once only: implementation, data migration, training.",
          "Which SARS returns the product files directly into eFiling and e@syFile.",
          "Which banks it feeds from, and whether Capitec and TymeBank are included.",
          "What happens to your data, and in what format you can take it out, if you leave.",
        ],
      },
      { type: "h2", text: "A message you can send" },
      {
        type: "quote",
        text: "We are a business of [number] employees with [number] users, registered for VAT, banking with [bank]. Please quote in rand for twelve months, with VAT on its own line, and list separately anything charged once only. Please say which SARS returns the product prepares and which it submits, and how we take our data out if we leave.",
      },
      {
        type: "p",
        text: "Send the same message to every vendor on your shortlist. The quotes will differ, and the differences are the information you are after.",
      },
      { type: "h2", text: "Compare like with like" },
      {
        type: "table",
        head: ["Line in the quote", "Product A", "Product B"],
        rows: [
          ["Subscription for twelve months, excluding VAT", "", ""],
          ["Once off charges", "", ""],
          ["Users and companies included", "", ""],
          ["Support included, and the hours", "", ""],
          ["Total for the first twelve months, with VAT", "", ""],
        ],
      },
      { type: "h2", text: "What should worry you" },
      {
        type: "ul",
        items: [
          "A quote that will not state a total in rand.",
          "A price that is the same for every business size, with no mention of scope.",
          "Pressure to sign before you have seen the product with your own data.",
          "No written answer on where your data lives and how you can leave. See [POPIA and your software vendor](/briefings/popia-and-your-software-vendor).",
        ],
      },
      { type: "h2", text: "Expect it to take time" },
      {
        type: "p",
        text: "A quote for an ERP can need a call, a scoping workshop and a written proposal. Allow a few weeks, and ask the vendor or its partner in South Africa for a reference customer of your size that you can phone.",
      },
    ],
  },
  {
    slug: "free-tiers-on-the-register",
    title: "The free tiers on the register",
    standfirst:
      "{{free}} products start at zero. A free tier is a way in. Here is what to check before you build on one.",
    topic: "Pricing",
    author: AUTHOR,
    published_at: DATE,
    product_slugs: [],
    published: true,
    body: [
      { type: "live", name: "free" },
      {
        type: "p",
        text: "A free plan usually limits something, such as the number of users, invoices or contacts. Those limits are where a free plan stops being free, and the vendor's pricing page states them.",
      },
      { type: "h2", text: "A free plan is not a free trial" },
      {
        type: "p",
        text: "A free trial gives you the whole product for a short time, then asks for money. A free plan gives you part of the product for as long as the vendor keeps it. The first is a test. The second is something you could run a business on, if the limits suit you and the vendor does not change them.",
      },
      { type: "h2", text: "Limits to look for" },
      {
        type: "ul",
        items: [
          "The number of users, and whether your accountant counts as one.",
          "Caps on invoices, contacts, projects, storage or automations.",
          "Features that are missing, such as VAT reporting, bank feeds, exports or integrations.",
          "Support: a free plan often means no support, or only help articles.",
          "Revenue limits. Some plans are free only while your turnover stays under a stated figure.",
        ],
      },
      { type: "h2", text: "Before you build on a free tier" },
      {
        type: "ul",
        items: [
          "Find the limit that would force an upgrade, and price the plan above it.",
          "Check what that next plan costs per user per month in rand, with VAT shown.",
          "Check whether your data can be exported if the vendor changes the free plan.",
          "Remember that your data still counts under the law, whatever you pay. See [POPIA and your software vendor](/briefings/popia-and-your-software-vendor).",
        ],
      },
      { type: "h2", text: "A plan for outgrowing it" },
      {
        type: "p",
        text: "Most businesses outgrow a free plan, and the cost of that moment is the price of the next plan. Look at the first paid plan before you commit, and work out what you will pay when you have the team you expect in a year. If that price is out of reach, a different product's entry plan may be the better start. See [what business software costs in rand](/briefings/what-software-costs-in-rand) for the whole table.",
      },
    ],
  },
  {
    slug: "vat-and-the-vat201-return",
    title: "VAT and the VAT201 return",
    standfirst:
      "The VAT201 is the return a registered vendor submits to SARS. Accounting software can prepare it, and some can transfer it into eFiling. Those are different things.",
    topic: "Compliance",
    author: AUTHOR,
    published_at: DATE,
    product_slugs: [],
    published: true,
    body: [
      {
        type: "p",
        text: "Value added tax is charged at {{vat_pct}} percent. A business must register once its taxable turnover passes R1 million in any twelve month period, and may register voluntarily below that.",
      },
      { type: "h2", text: "What the VAT201 is" },
      {
        type: "p",
        text: "A registered vendor submits a VAT201 to SARS for each tax period. Most small vendors file every two months. Larger vendors file monthly. It is submitted through SARS eFiling and is due shortly after the period ends, so check the current SARS calendar rather than a guide for the exact date.",
      },
      {
        type: "p",
        text: "Software can help in two ways. It can produce the VAT201 figures from your ledger. Some products can also transfer those figures into eFiling so nobody retypes them. The second saves the time and avoids the keying error, and it is the one the register is built to record.",
      },
      { type: "h2", text: "Output tax and input tax" },
      {
        type: "p",
        text: "Output tax is the VAT you charge your customers. Input tax is the VAT your suppliers charge you. The return works out the difference: if your output tax is more, you pay SARS the difference, and if your input tax is more, SARS owes you a refund. You can only claim input tax on a valid tax invoice, so what you keep matters. See [what a valid tax invoice needs](/briefings/a-valid-tax-invoice-in-south-africa).",
      },
      { type: "h2", text: "Invoice basis and payments basis" },
      {
        type: "table",
        head: ["Basis", "When VAT is accounted for", "Who can use it"],
        rows: [
          ["Invoice basis", "When the invoice is issued or received, even if no money has moved", "Every vendor, and the default"],
          ["Payments basis", "When money is paid or received", "Smaller vendors whose taxable supplies stay under R2.5 million a year, with SARS's approval"],
        ],
      },
      {
        type: "p",
        text: "The basis changes which period an invoice falls into, so your software has to use the one you are registered for. A product that handles only the invoice basis will give the wrong figures to a business on the payments basis.",
      },
      { type: "h2", text: "What the register records" },
      {
        type: "p",
        text: "Where an accounting vendor's own page says its VAT201 report is prepared for SARS, the register records it, and the compliance matrix on the [accounting sector page](/sector/accounting) shows it.",
      },
      { type: "h2", text: "Questions to ask before you buy" },
      {
        type: "ul",
        items: [
          "Does the VAT201 it produces match the SARS form line by line?",
          "Can it submit to eFiling, or only export a file?",
          "Does it handle both the invoice basis and the payments basis?",
          "Does it keep an audit trail SARS will accept in a VAT review?",
          "Does it issue credit notes that point back to the invoice they correct?",
        ],
      },
      { type: "h2", text: "Keep the records" },
      {
        type: "p",
        text: "SARS expects you to keep your financial records for five years, including the invoices behind every return. Check that you can still reach them if you leave the product. See [choosing accounting software in South Africa](/briefings/choosing-accounting-software-in-south-africa).",
      },
    ],
  },
  {
    slug: "payroll-returns-emp201-emp501-irp5",
    title: "Payroll returns: EMP201, EMP501 and IRP5",
    standfirst:
      "South African payroll produces a chain of statutory documents. A mistake in one link costs penalties in the next.",
    topic: "Compliance",
    author: AUTHOR,
    published_at: DATE,
    product_slugs: [],
    published: true,
    body: [
      {
        type: "p",
        text: "Running payroll in South Africa is not just paying salaries. Every month the employer declares and pays tax and contributions to SARS, and every year the employer reconciles those declarations and issues certificates to employees.",
      },
      {
        type: "table",
        head: ["Document", "What it is", "When"],
        rows: [
          ["EMP201", "Monthly employer declaration of PAYE, UIF and SDL", "Monthly, due by the 7th of the following month"],
          ["EMP501", "Reconciliation of what was declared against what was paid and certified", "Twice a year: an interim and an annual reconciliation"],
          ["IRP5", "Employee tax certificate showing PAYE deducted", "Issued after the tax year ends"],
          ["IT3(a)", "Certificate for employees from whom no PAYE was deducted", "Issued after the tax year ends"],
        ],
      },
      { type: "h2", text: "The deductions inside it" },
      {
        type: "ul",
        items: [
          "PAYE: income tax withheld from salary.",
          "UIF: 1 percent from the employee and 1 percent from the employer.",
          "SDL: 1 percent of payroll, for employers whose annual payroll is above R500 000.",
          "ETI: an incentive that reduces PAYE for qualifying young employees.",
        ],
      },
      { type: "h2", text: "How the chain fits together" },
      {
        type: "p",
        text: "Each EMP201 you submit is one month of the year. The EMP501 adds those months up and checks them against the certificates you issue to employees. If the figures do not agree, SARS will not accept the reconciliation until you correct it. That is why a mistake in January can cost you a day in May.",
      },
      { type: "h2", text: "What goes wrong" },
      {
        type: "ul",
        items: [
          "A late EMP201 or a late payment, which SARS charges penalties and interest on.",
          "An EMP201 that does not match the payments you actually made, which breaks the reconciliation later.",
          "Missing or wrong employee details, such as an ID number or a tax reference.",
          "A correction made in the software without a matching correction in the declaration.",
          "Terminated employees left off the certificates.",
        ],
      },
      { type: "h2", text: "e@syFile" },
      {
        type: "p",
        text: "e@syFile is the SARS desktop application that payroll output is commonly loaded into for EMP501 reconciliations and certificate submissions. A product that transfers into e@syFile or eFiling saves you retyping. One that does not forces a manual capture, which is where the errors happen.",
      },
      { type: "h2", text: "What good payroll software does" },
      {
        type: "ul",
        items: [
          "Calculates PAYE, UIF and SDL from tax tables that update when SARS changes them.",
          "Produces the EMP201 figure that matches what you pay.",
          "Holds the data for the interim and annual reconciliations, so nothing is recaptured.",
          "Issues IRP5 and IT3(a) certificates in the form SARS accepts.",
          "Keeps a record of every change, so you can explain a correction.",
        ],
      },
      {
        type: "p",
        text: "The register records which payroll products handle these returns, taken from each vendor's own page. See the [payroll sector page](/sector/payroll), and use [a payroll software checklist](/briefings/payroll-software-checklist-for-south-african-employers) when you compare. The [compliance calendar](/briefings/the-south-african-small-business-compliance-calendar) shows when each return falls.",
      },
    ],
  },
  {
    slug: "bcea-leave-what-hr-software-must-accrue",
    title: "BCEA leave: what HR software must accrue",
    standfirst:
      "The Basic Conditions of Employment Act sets minimum leave. HR software that accrues it wrongly will quietly misstate what you owe.",
    topic: "Compliance",
    author: AUTHOR,
    published_at: DATE,
    product_slugs: [],
    published: true,
    body: [
      {
        type: "table",
        head: ["Leave", "Minimum under the BCEA"],
        rows: [
          ["Annual", "21 consecutive days in each twelve month leave cycle"],
          ["Sick", "30 days over a three year cycle"],
          ["Family responsibility", "3 days a year for qualifying employees"],
          ["Maternity", "4 consecutive months, unpaid by the employer unless the contract says otherwise"],
          ["Parental", "10 consecutive days"],
        ],
      },
      {
        type: "p",
        text: "Contracts and collective agreements can give more. The Act sets the floor. What matters for software is whether it accrues each leave type by the rule that applies to your employee, and keeps a record you can produce in a CCMA dispute.",
      },
      { type: "h2", text: "How the cycles work" },
      {
        type: "ul",
        items: [
          "Annual leave is counted over a twelve month cycle, and can be accrued at a rate of one day for every 17 days worked, or one hour for every 17 hours worked, as an alternative to a fixed block.",
          "Sick leave runs over a cycle of 36 months. During the first six months of employment, the employee is entitled to one day of paid sick leave for every 26 days worked.",
          "Family responsibility leave is for a child's birth or illness, or the death of a close family member, and applies to employees who have worked for the employer for more than four months and work at least four days a week.",
        ],
      },
      { type: "h2", text: "What happens when someone leaves" },
      {
        type: "p",
        text: "An employer must pay out leave that an employee has accrued and not taken when employment ends. HR software that tracks the balance correctly turns that calculation into a report. Software that does not leaves you to reconstruct it, usually in the middle of a dispute.",
      },
      { type: "h2", text: "Keep the records" },
      {
        type: "p",
        text: "The Act requires employers to keep records of time worked, pay and leave for three years. A leave balance that you can show an employee, and a history that you can produce for the CCMA or a labour inspector, is the real product here.",
      },
      { type: "h2", text: "Questions to ask a vendor" },
      {
        type: "ul",
        items: [
          "Does it accrue annual, sick, family responsibility, maternity and parental leave by the rule above, and can it be changed where your contract gives more?",
          "Does it run the sick leave cycle over 36 months?",
          "Does it calculate leave pay on termination?",
          "Does it keep the record for three years, and can you export it?",
          "Does payroll read the same leave data, so that pay and leave agree? See [a payroll software checklist](/briefings/payroll-software-checklist-for-south-african-employers).",
        ],
      },
      {
        type: "p",
        text: "BCEA leave accrual is the headline compliance item for the [HR sector](/sector/hr). Ask each vendor to show you how it accrues each leave type before you commit.",
      },
    ],
  },
  {
    slug: "bank-feeds-by-bank",
    title: "Bank feeds, bank by bank",
    standfirst:
      "A product that feeds from Chase and Barclays is useless to a business banking with Capitec. The register asks about eight South African banks.",
    topic: "Compliance",
    author: AUTHOR,
    published_at: DATE,
    product_slugs: [],
    published: true,
    body: [
      {
        type: "p",
        text: "A bank feed pulls your transactions into the software each day so you reconcile instead of typing. Global products usually build feeds for American and British banks first. Coverage of South African banks varies, and it varies by account type as well as by bank.",
      },
      { type: "live", name: "banks" },
      {
        type: "p",
        text: "The table counts the products whose own pages list a feed with each bank. Treat a vendor's list as a starting point and ask for the feed by name for your account type.",
      },
      { type: "h2", text: "How transactions reach your books" },
      {
        type: "ul",
        items: [
          "A direct feed, where the software is connected to your bank and new transactions arrive automatically.",
          "A feed through a service that links to the bank on the vendor's behalf, which you authorise once.",
          "A file import, where you download a statement from internet banking and load it. It works with any bank and costs a few minutes each time.",
        ],
      },
      {
        type: "p",
        text: "If the product you like has no feed for your bank, a file import is not a failure. It is a slower route, and you should count the time it costs in the comparison.",
      },
      { type: "h2", text: "Ask about your account, not just your bank" },
      {
        type: "ul",
        items: [
          "Is the feed for business accounts, personal accounts or both?",
          "Does it cover credit cards and savings accounts, or only a current account?",
          "How far back does it pull when you first connect?",
          "What does it cost? Some vendors charge for feeds or limit them by plan.",
          "Who sets up the connection, you or your bank? Some banks need a form signed before a feed starts.",
        ],
      },
      { type: "h2", text: "Test it with your own account" },
      {
        type: "p",
        text: "Connect your real account during the trial and reconcile a full month. If lines arrive late, with different descriptions or in the wrong order, you will know before you pay. See [how to test software in a free trial](/briefings/how-to-test-software-in-a-free-trial).",
      },
      { type: "h2", text: "Security" },
      {
        type: "p",
        text: "A feed should only be able to read your transactions. It should not be able to move money. Ask the vendor whether the connection is read only, and who at the vendor can see your bank data. See [POPIA and your software vendor](/briefings/popia-and-your-software-vendor).",
      },
    ],
  },
];

/** Depth entries whose heading was not found in their guide. Empty when every one landed; `npm run verify` fails if it is not. */
export const DEPTH_UNMATCHED: string[] = [];

/** Places each extra section before its named heading, or before the closing note at the end. */
function withDepth(d: Draft): Draft {
  const body = [...d.body];
  for (const x of DEPTH.filter((e) => e.slug === d.slug)) {
    if (x.before === "end") {
      body.splice(body[body.length - 1]?.type === "note" ? body.length - 1 : body.length, 0, ...x.blocks);
      continue;
    }
    const at = body.findIndex((b) => b.type === "h2" && b.text === x.before);
    if (at === -1) {
      DEPTH_UNMATCHED.push(`${x.slug}: ${x.before}`);
      body.push(...x.blocks);
    } else {
      body.splice(at, 0, ...x.blocks);
    }
  }
  return { ...d, body };
}

/** Every guide, with its reading time worked out from its words. */
export const BRIEFINGS: Briefing[] = [...MORE_BRIEFINGS, ...SECTOR_GUIDES, ...FIRST].map(withDepth).map((d) => ({ ...d, read_minutes: readTime(d.body, d.standfirst) }));
