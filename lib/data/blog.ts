import { readTime } from "../read-time";
import type { BriefingBlock } from "../types";

/**
 * The blog.
 *
 * Guides explain a rule and stay true for years. The blog is dated: what a
 * price looked like on a day, what a vendor changed, and how to read a figure.
 * Every price below was read from the vendor's own page on 11 October 2026 and
 * says so. A price a vendor lists in dollars, pounds or euros is shown in rand
 * at the reference rate of 2 October 2026 and marked "about", because the rate
 * moves daily. Statutory facts are limited to the VAT rate and the VAT
 * registration threshold. Nothing here ranks a product or names a winner.
 *
 * Copy contains no hyphens and no dashes. Rewrite the sentence instead.
 */

export type HeroTone = "lime" | "wash" | "azure" | "ink";

export type BlogHeroSpec =
  /** Horizontal bars of starting price in rand, one per product, read live from the register. */
  | { kind: "prices"; slugs: string[]; caption: string; tone: HeroTone }
  /** A cluster of product logos with a short caption. */
  | { kind: "logos"; slugs: string[]; caption: string; tone: HeroTone }
  /** One large figure and what it is. */
  | { kind: "figure"; figure: string; caption: string; tone: HeroTone }
  /** The Software Register mark, large. */
  | { kind: "mark"; caption: string; tone: HeroTone };

export interface BlogPost {
  slug: string;
  title: string;
  standfirst: string;
  category: "Pricing" | "Market notes" | "Buying guide" | "Editorial";
  author: string;
  published_at: string;
  hero: BlogHeroSpec;
  product_slugs: string[];
  body: BriefingBlock[];
}

const AUTHOR = "Software Register editorial";
const DATE = "2026-10-11";

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "sage-payroll-22-bands-what-5-25-and-100-employees-pay",
    title: "Sage Payroll's 22 bands: what 5, 25 and 100 employees pay",
    standfirst:
      "Sage Payroll is priced in bands of headcount, not per employee. Read from Sage's page on 11 October 2026, here is what each size of business pays, and where the price jumps.",
    category: "Pricing",
    author: AUTHOR,
    published_at: "2026-10-12",
    hero: { kind: "figure", figure: "22 bands", caption: "Sage Payroll, priced by number of employees", tone: "lime" },
    product_slugs: ["sage-payroll", "simplepay", "payspace", "sage-pastel-payroll"],
    body: [
      {
        type: "p",
        text: "Most payroll products on the register charge a rate for each employee. Sage Payroll does not. It sells 22 bands of headcount, from one to two employees up to 200, and above 200 it charges a rate for each employee. Sage says every feature is in every band, with unlimited companies and users. The prices below include VAT, as Sage states them on its South African page.",
      },
      { type: "h2", text: "What six sizes of business pay" },
      {
        type: "table",
        head: ["Employees up to", "A month including VAT", "A month excluding VAT", "Per employee, including VAT"],
        rows: [
          ["5", "R224", "R194.78", "R44.80"],
          ["10", "R430", "R373.91", "R43.00"],
          ["25", "R1 018", "R885.22", "R40.72"],
          ["50", "R1 832", "R1 593.04", "R36.64"],
          ["100", "R3 225", "R2 804.35", "R32.25"],
          ["200", "R4 475", "R3 891.30", "R22.38"],
        ],
      },
      {
        type: "p",
        text: "A business registered for VAT claims the VAT back, so the middle column is its real cost. A business that is not registered pays the third. The per employee column is the price of the top of each band divided by its headcount, so a business at the bottom of a band pays more for each employee than the table shows.",
      },
      { type: "h2", text: "Where the price jumps" },
      {
        type: "p",
        text: "Bands change in steps, so the cost of one more employee depends on where you stand. A business with ten employees that hires an eleventh moves from the 6 to 10 band at R430 to the 11 to 15 band at R641, a rise of R211 for one person. At 25 employees the next hire adds R143. At 100 the next adds R130. Above 200 each extra employee adds R22.37.",
      },
      {
        type: "ul",
        items: [
          "From 10 to 11 employees: R430 to R641, a rise of R211 including VAT.",
          "From 25 to 26 employees: R1 018 to R1 161, a rise of R143.",
          "From 50 to 51 employees: R1 832 to R2 199, a rise of R367.",
          "From 100 to 101 employees: R3 225 to R3 355, a rise of R130.",
          "From 200 to 201 employees: R4 475 to R4 496.37, a rise of R21.37.",
        ],
      },
      {
        type: "p",
        text: "If you are close to the top of a band, a hire costs little. If you are at the bottom of the next one, it costs the whole step. That is worth knowing before a business plans a round of hiring.",
      },
      { type: "h2", text: "Set beside a rate per employee" },
      {
        type: "p",
        text: "SimplePay prices by headcount too, but it quotes a rate for each employee on its own site: for ten employees the quote read on 11 October 2026 was R235.50 a month excluding VAT, which is R23.55 each, and the rate changes with headcount. Sage Payroll's band for 6 to 10 employees is R430 including VAT, which is R373.91 excluding. On the same footing, at ten employees, the figures are R235.50 and R373.91.",
      },
      {
        type: "p",
        text: "The figures are the vendors' own, and they do not describe the same product. SimplePay has one plan with every feature switched on, and quotes per company. Sage Payroll has every feature in every band, with unlimited companies and users. Which is the better fit depends on how many companies you run and what you need the product to produce. Read both reviews before you decide.",
      },
      { type: "h2", text: "Yearly pricing is not the same as monthly times twelve" },
      {
        type: "p",
        text: "Sage's page also shows a yearly price for each band. Its headline says payroll from R1 080 a year, but the yearly toggle shows R1 164 for one to two employees. That is a difference on Sage's own page, and the review on the register records it. If you plan to pay yearly, ask Sage South Africa in writing which figure applies.",
      },
      { type: "h2", text: "Work out your own bill" },
      {
        type: "p",
        text: "The [Sage Payroll review](/register/sage-payroll/reviews) has a calculator that takes your number of employees and shows the band, the monthly price with and without VAT, and the price per employee. For the returns payroll has to produce, read [payroll returns: EMP201, EMP501 and IRP5](/briefings/payroll-returns-emp201-emp501-irp5) and [a payroll software checklist](/briefings/payroll-software-checklist-for-south-african-employers).",
      },
    ],
  },

  {
    slug: "free-accounting-software-in-south-africa-what-r0-gets-you",
    title: "Free accounting software in South Africa: what R0 gets you",
    standfirst:
      "Two accounting products on the register start free. What each free plan covers, where it stops, and what a business that is registered for VAT should check before it builds on one.",
    category: "Buying guide",
    author: AUTHOR,
    published_at: "2026-10-12",
    hero: { kind: "logos", slugs: ["zoho-books", "wave-accounting"], caption: "Two accounting products that start at R0", tone: "wash" },
    product_slugs: ["zoho-books", "wave-accounting", "freshbooks", "sage-accounting"],
    body: [
      {
        type: "p",
        text: "A business that is just starting, or that runs a side line, does not always want to pay for accounting software. Two products on the register publish a free plan: Zoho Books and Wave Accounting. They are free in different ways, and they were built with different countries in mind. Read from the vendors' own pages on 11 October 2026, here is what each one says.",
      },
      { type: "h2", text: "Zoho Books: free for one user and one accountant" },
      {
        type: "p",
        text: "Zoho Books has a South African page and lists its prices in rand, excluding VAT. Its Free plan is for one user and one accountant, while the business's revenue stays under R1 million a year. The first paid plan, Standard at R99 a month excluding VAT, is described as three users with VAT tracking, VAT returns and bank feeds. Paid for a year, the same plan is R82.50 a month.",
      },
      {
        type: "p",
        text: "R1 million is also the turnover at which a business must register for VAT, so a business that is about to cross it will need to look at Standard or above, since VAT returns are listed with that plan.",
      },
      { type: "h2", text: "Wave Accounting: free to keep the books, with paid parts" },
      {
        type: "p",
        text: "Wave's Starter plan is free, with unlimited estimates, invoices, bills and bookkeeping records. Automatic bank import and receipt capture are on Pro, which Wave prices in dollars at about R318 a month at the 2 October 2026 rate. Wave is run from North America, and its own card payment and payroll add ons serve US and Canadian businesses, so a South African business would use it for the bookkeeping and not for those.",
      },
      { type: "h2", text: "What a VAT registered business should check" },
      {
        type: "ul",
        items: [
          "Does the plan you would use prepare the VAT201 figures? The register records this only where the vendor's own page says so. See the [accounting sector page](/sector/accounting).",
          "Does it read your bank? Check [bank feeds, bank by bank](/briefings/bank-feeds-by-bank) for your bank, and ask whether the feed is on the free plan.",
          "Does it issue a valid tax invoice? See [what a valid tax invoice needs](/briefings/a-valid-tax-invoice-in-south-africa).",
          "Can you take your data with you if you leave or the free plan changes?",
        ],
      },
      { type: "h2", text: "When to move to a paid plan" },
      {
        type: "ol",
        items: [
          "When you register for VAT and need a return prepared from the books.",
          "When you add a second user, or your accountant needs to work in the books as well as view them.",
          "When reconciling by hand starts to cost more of your time than a bank feed costs in rand.",
          "When revenue approaches a limit stated on the free plan.",
        ],
      },
      {
        type: "p",
        text: "Put the paid plan's price on the same footing as the others, using [including and excluding VAT](/briefings/including-and-excluding-vat). The Zoho Books price excludes VAT, so a business that is not registered pays 15 percent more than the figure on the page. [The free tiers on the register](/briefings/free-tiers-on-the-register) lists every product that starts at zero, across all six sectors.",
      },
      { type: "h2", text: "Read the reviews" },
      {
        type: "p",
        text: "The [Zoho Books review](/register/zoho-books/reviews) and the [Wave Accounting review](/register/wave-accounting/reviews) have the plan cards, charts and a calculator for each, with every figure in rand.",
      },
    ],
  },

  {
    slug: "what-accounting-software-costs-in-south-africa-october-2026",
    title: "What accounting software costs in South Africa, October 2026",
    standfirst: "Five accounting products, their entry plans and the next plan up, read from the vendors on 11 October 2026. Two include VAT, two leave it out and one does not say.",
    category: "Pricing",
    author: AUTHOR,
    published_at: DATE,
    hero: { kind: "prices", slugs: ["sage-accounting", "quickbooks-online", "xero", "zoho-books", "sage-50cloud-pastel"], caption: "Starting price a month, in rand", tone: "wash" },
    product_slugs: ["sage-accounting", "xero", "quickbooks-online", "zoho-books", "sage-50cloud-pastel"],
    body: [
      {
        type: "p",
        text: "A buyer comparing accounting software in South Africa meets five names fast: Sage Accounting, Xero, QuickBooks Online, Zoho Books and Sage 50cloud Pastel. All five publish a rand price. They do not publish it on the same footing, so the cheapest looking figure is not always the cheapest bill.",
      },
      { type: "h2", text: "The prices, side by side" },
      {
        type: "p",
        text: "Monthly prices, in rand, read from each vendor's own page on 11 October 2026. The last column says whether the vendor's figure includes VAT.",
      },
      {
        type: "table",
        head: ["Product", "Entry plan", "Next plan", "VAT basis"],
        rows: [
          ["Sage Accounting", "Start R270", "Standard R490", "Including VAT"],
          ["Xero", "Starter R450", "Standard R795", "Including VAT"],
          ["QuickBooks Online", "Simple Start R322", "Essentials R508", "Not stated"],
          ["Zoho Books", "Free, then Standard R99", "Professional R199", "Excluding VAT"],
          ["Sage 50cloud Pastel", "Start R1 375", "Core R1 915", "Excluding VAT"],
        ],
      },
      { type: "h2", text: "Put them on the same VAT footing" },
      {
        type: "p",
        text: "South African VAT is 15 percent. A figure that includes VAT is the net price multiplied by 1.15. Take the VAT out of Sage Accounting's R270 and you have R234.78. Take it out of Xero's R450 and you have R391.30. Add it to Zoho Books Standard's R99 and you have R113.85. Add it to Sage 50cloud Pastel's R1 375 and you have R1 581.25.",
      },
      {
        type: "p",
        text: "Which side matters depends on you. A business registered for VAT claims the VAT back, so the figure excluding VAT is its real cost. A business that is not registered pays the figure including VAT and cannot recover it. The compulsory registration threshold is R1 million of taxable turnover in twelve months.",
      },
      { type: "h2", text: "What the entry plan leaves out" },
      {
        type: "ul",
        items: [
          "Xero Starter allows 20 invoices and five bills a month. Standard lifts the limits.",
          "Sage Accounting Start is for one user. VAT returns and two to five users sit on Standard.",
          "Zoho Books Free covers one user and an accountant while revenue stays under R1 million a year, and leaves out VAT tracking and bank feeds. Standard adds both.",
          "QuickBooks Simple Start is for one user. Essentials covers three, Plus five and Advanced twenty five.",
        ],
      },
      { type: "h2", text: "Offers do not change the plan price" },
      {
        type: "p",
        text: "Xero gives new South African customers 80 percent off the first three months, and QuickBooks lists 90 percent off for six months. Both make the first quarter cheap and then end. Compare the plans on the price that applies after the offer.",
      },
      { type: "h2", text: "Where to go next" },
      {
        type: "p",
        text: "Read the head to head pages for [Sage Accounting against Xero](/versus/sage-accounting-vs-xero), [Zoho Books against Xero](/versus/zoho-books-vs-xero) and [Xero against QuickBooks Online](/versus/xero-vs-quickbooks-online), or open the whole [accounting category](/sector/accounting) with every plan priced.",
      },
    ],
  },

  {
    slug: "xero-prices-rise-from-1-november-2026",
    title: "Xero says its South African prices rise from 1 November 2026",
    standfirst: "Xero's pricing page tells customers that subscription prices increase on 1 November. The new rand figures are not published yet. Here is what is known, and what to do before the date.",
    category: "Market notes",
    author: AUTHOR,
    published_at: DATE,
    hero: { kind: "figure", figure: "1 Nov", caption: "Xero subscription prices change", tone: "ink" },
    product_slugs: ["xero", "sage-accounting", "quickbooks-online", "zoho-books"],
    body: [
      {
        type: "p",
        text: "Xero's South African pricing page carries a notice that its subscription prices increase from 1 November 2026. When the register read the page on 11 October 2026 it still showed the current prices, and the notice did not give the new ones.",
      },
      { type: "h2", text: "What the page shows today" },
      {
        type: "ul",
        items: [
          "Starter, R450 a month including VAT, with 20 invoices and five bills a month.",
          "Standard, R795 a month including VAT, with the limits lifted.",
          "Premium, R1 095 a month including VAT, with multiple currencies and a 180 day cash flow forecast.",
          "New South African customers get 80 percent off the first three months.",
        ],
      },
      { type: "h2", text: "What is not known" },
      {
        type: "p",
        text: "The new prices, whether all three plans change, and whether the introductory offer continues. We will not guess a figure. The register will show the new prices, with the date they were read, once Xero publishes them.",
      },
      { type: "h2", text: "What to do before 1 November" },
      {
        type: "ul",
        items: [
          "Check which plan you are on, and whether you use more than Starter allows. A cap you hit is a plan change whatever the price does.",
          "Look for an email from Xero about your own subscription. A notice to existing customers can carry details the public page does not.",
          "Price the alternatives on the same footing. Xero quotes including VAT, Zoho Books quotes excluding it, and QuickBooks does not say.",
          "If you are comparing for the first time, take the 30 day trial of each with your own bank and one real VAT period.",
        ],
      },
      { type: "h2", text: "See the alternatives" },
      {
        type: "p",
        text: "[Sage Accounting against Xero](/versus/sage-accounting-vs-xero), [Zoho Books against Xero](/versus/zoho-books-vs-xero) and [Xero against QuickBooks Online](/versus/xero-vs-quickbooks-online) each lay the plans side by side in rand.",
      },
      { type: "p", text: "Read [the full Xero record](/register/xero) for every plan, and subscribe to [price alerts](/dispatch) to hear when the new figures appear." },
    ],
  },

  {
    slug: "why-270-and-1375-are-not-the-same-kind-of-price",
    title: "Why R270 and R1 375 are not the same kind of price",
    standfirst: "Sage sells accounting software at R270 a month and at R1 375 a month. The second is not five times the first, because one includes VAT and the other leaves it out.",
    category: "Pricing",
    author: AUTHOR,
    published_at: DATE,
    hero: { kind: "figure", figure: "R270 vs R1 375", caption: "Including VAT against excluding VAT", tone: "lime" },
    product_slugs: ["sage-accounting", "sage-50cloud-pastel", "sage-payroll", "zoho-books"],
    body: [
      {
        type: "p",
        text: "On Sage's South African pages, Sage Accounting starts at R270 a month including VAT. Sage 50cloud Pastel starts at R1 375 a month excluding VAT. Set next to each other the numbers invite a wrong conclusion, and the register prints the basis beside every price for that reason.",
      },
      { type: "h2", text: "The arithmetic" },
      {
        type: "p",
        text: "VAT is 15 percent. To remove it from a price that includes it, divide by 1.15. To add it to a price that excludes it, multiply by 1.15.",
      },
      {
        type: "table",
        head: ["Listed price", "Basis", "Excluding VAT", "Including VAT"],
        rows: [
          ["R270", "Including VAT", "R234.78", "R270.00"],
          ["R1 375", "Excluding VAT", "R1 375.00", "R1 581.25"],
          ["R490", "Including VAT", "R426.09", "R490.00"],
          ["R99", "Excluding VAT", "R99.00", "R113.85"],
        ],
      },
      { type: "h2", text: "These are different products" },
      {
        type: "p",
        text: "Sage Accounting is a cloud product for small businesses. Sage 50cloud Pastel is Sage's desktop based accounting product, with two users and two companies in its Start plan and modules priced on top. The gap between R270 and R1 375 is mostly a difference in what is sold, with the VAT footing a smaller part of it.",
      },
      { type: "h2", text: "A rule for reading any South African price" },
      {
        type: "ul",
        items: [
          "Find the words including VAT or excluding VAT. If neither appears, the vendor has not said, and you should ask.",
          "If you are registered for VAT, compare the figures excluding VAT. You claim the VAT back.",
          "If you are not registered, compare the figures including VAT. That is what leaves your account.",
          "Do the sum again for each add on. Extra users, extra companies and modules carry the same basis as the plan.",
        ],
      },
      {
        type: "p",
        text: "The guide to [including and excluding VAT in a software price](/briefings/including-and-excluding-vat) puts every rand priced product on both footings in one table.",
      },
    ],
  },

  {
    slug: "payroll-and-hr-software-priced-per-employee",
    title: "Payroll and HR software priced per employee: what ten people cost",
    standfirst: "Payroll and HR tools charge by the head. Here is what a ten person business pays a month at the published rates, and why a payroll price and an HR price are not the same job.",
    category: "Pricing",
    author: AUTHOR,
    published_at: DATE,
    hero: { kind: "logos", slugs: ["simplepay", "sage-hr", "peoplehr", "bamboohr", "payspace", "sage-payroll"], caption: "Priced per employee", tone: "azure" },
    product_slugs: ["simplepay", "sage-hr", "peoplehr", "bamboohr", "sage-payroll", "payspace"],
    body: [
      {
        type: "p",
        text: "Most payroll and HR products charge per employee per month. That makes a quick sum possible: multiply by your headcount. The sum goes wrong when you add up a payroll price and an HR price as if they bought the same thing.",
      },
      { type: "h2", text: "Payroll runs your salaries. HR runs your people." },
      {
        type: "p",
        text: "Payroll software calculates pay, PAYE, UIF and SDL and produces the returns and certificates SARS asks for. HR software holds employee records, leave, onboarding and performance. Some products do both. Many do one, and connect to the other.",
      },
      { type: "h2", text: "A ten person business, a month" },
      {
        type: "table",
        head: ["Product", "Per employee", "Ten employees", "VAT basis"],
        rows: [
          ["SimplePay, payroll", "R23.55", "R235.50", "Excluding VAT"],
          ["Sage HR, core HR and leave", "R28", "R280", "Not stated"],
          ["Sage HR with Timesheets, Performance and Expenses", "R66", "R660", "Not stated"],
          ["PeopleHR Starter, HR", "About R66", "About R660", "Not stated"],
        ],
      },
      {
        type: "p",
        text: "SimplePay's R23.55 is for a ten employee business, and its calculator gives your own figure for your own headcount. Add VAT at 15 percent and ten employees come to about R271 a month. Sage HR's core price is R28 per employee, with Timesheets and Performance at R14 and Expenses at R10 per employee on top. PeopleHR lists its Starter plan in pounds, shown here at about R66 per employee.",
      },
      { type: "h2", text: "Banded and flat prices" },
      {
        type: "ul",
        items: [
          "Sage Payroll prices by employee band. The first band, one to two employees, starts at R97 a month including VAT, or R1 080 a year.",
          "BambooHR lists a flat monthly rate for companies of 25 or fewer, and a per employee rate above that. Its payroll and benefits add ons are for US employees.",
          "PaySpace gives its per employee rate in a demo.",
        ],
      },
      { type: "h2", text: "Questions to put to a vendor" },
      {
        type: "ul",
        items: [
          "Does the price include VAT, and does it include every statutory return, or only the payslip?",
          "What happens to the price when you add a second company?",
          "Does leave accrue under the BCEA, and can you produce the record in a dispute?",
        ],
      },
      {
        type: "p",
        text: "See [SimplePay against PaySpace](/versus/simplepay-vs-payspace), [Sage Payroll against SimplePay](/versus/sage-payroll-vs-simplepay) and [Sage HR against BambooHR](/versus/sage-hr-vs-bamboohr), or read the guide to [payroll returns](/briefings/payroll-returns-emp201-emp501-irp5).",
      },
    ],
  },

  {
    slug: "project-management-tools-that-start-free",
    title: "Project management tools that start free, and what the paid plan costs",
    standfirst: "Five of six project management tools on the register have a free plan. The free plans stop in different places, and the first paid plan is where the real price starts.",
    category: "Pricing",
    author: AUTHOR,
    published_at: DATE,
    hero: { kind: "logos", slugs: ["asana", "clickup", "monday-com", "trello", "wrike", "smartsheet"], caption: "Start free, then check the limit", tone: "wash" },
    product_slugs: ["asana", "clickup", "monday-com", "trello", "wrike", "smartsheet"],
    body: [
      {
        type: "p",
        text: "Project management is the one category on the register where nearly every product lets you start for nothing. A free plan is a way in, not a price. The question is where it stops.",
      },
      { type: "h2", text: "Where each free plan stops" },
      {
        type: "ul",
        items: [
          "Asana Personal is free for two users.",
          "ClickUp Free Forever has unlimited tasks, five spaces and 60 MB of storage.",
          "monday.com Free covers two seats, three boards and three Docs.",
          "Trello Free allows up to ten collaborators and ten boards per workspace.",
          "Wrike Free gives project and task management with board and table views.",
          "Smartsheet has no free plan, only a 30 day trial.",
        ],
      },
      { type: "h2", text: "The first two paid plans, per user a month" },
      {
        type: "p",
        text: "Prices per user per month billed annually, in rand. Where a vendor lists in dollars, the figure is converted at the 2 October 2026 reference rate and marked about, because the rate moves daily. Smartsheet lists its rand prices itself.",
      },
      {
        type: "table",
        head: ["Product", "First paid plan", "Second paid plan"],
        rows: [
          ["Trello", "Standard, about R84", "Premium, about R167"],
          ["ClickUp", "Unlimited, about R117", "Business, about R201"],
          ["monday.com", "Basic, about R151", "Standard, about R201"],
          ["Wrike", "Team, about R167", "Business, about R418"],
          ["Asana", "Starter, about R184", "Advanced, about R418"],
          ["Smartsheet", "Pro, R170", "Business, R359"],
        ],
      },
      { type: "h2", text: "Read the gating, not the headline" },
      {
        type: "p",
        text: "The cheapest first plan is not always the cheapest useful plan. monday.com holds its Gantt and calendar views for Standard. Asana includes timeline and Gantt views from Starter. ClickUp lists its AI add ons separately, which can add a large share to the bill. A team that needs one specific view should price the plan that holds it.",
      },
      {
        type: "p",
        text: "Compare [Asana with monday.com](/versus/asana-vs-monday-com), [ClickUp with Trello](/versus/clickup-vs-trello) and [Smartsheet with Wrike](/versus/smartsheet-vs-wrike) for the plan detail, or see the whole [project management category](/sector/project-management).",
      },
    ],
  },

  {
    slug: "choosing-an-erp-in-south-africa-seven-questions",
    title: "Choosing an ERP in South Africa: seven questions to put in writing",
    standfirst: "Most ERP vendors give their price on request. That makes the quote the product. These seven questions turn a quote into something you can compare.",
    category: "Buying guide",
    author: AUTHOR,
    published_at: DATE,
    hero: { kind: "logos", slugs: ["syspro", "sap-business-one", "netsuite", "acumatica", "sage-200-evolution", "sage-x3"], caption: "Price on request", tone: "ink" },
    product_slugs: ["syspro", "sap-business-one", "netsuite", "acumatica", "sage-200-evolution", "sage-x3"],
    body: [
      {
        type: "p",
        text: "An ERP ties your accounts, stock, purchasing and often your payroll together, and nearly every vendor gives its price after a conversation. These are the products on the register, across every category, that price on request.",
      },
      { type: "live", name: "quoted" },
      { type: "h2", text: "Seven questions" },
      {
        type: "ul",
        items: [
          "What is the price per user and per module a month, with the VAT basis stated?",
          "What is charged once only: implementation, data migration, training and customisation?",
          "Does it prepare the VAT201, and can it submit it to SARS eFiling, or only export a file?",
          "Which South African banks does it integrate with, and for which account types?",
          "Which local partner implements it, and can you speak to a South African customer in your industry?",
          "Where is the data hosted, and in what format can you take it with you if you leave?",
          "What are the support hours in South African time, and what does an urgent call cost?",
        ],
      },
      { type: "h2", text: "A fixed scope beats a low quote" },
      {
        type: "p",
        text: "For an ERP the implementation can cost as much as the first year's subscription. A quote that is low and open ended is not cheaper than one that is higher and fixed. Ask each vendor to price the same scope: the same users, the same modules, the same two years.",
      },
      { type: "h2", text: "What the vendors say about South Africa" },
      {
        type: "p",
        text: "Sage South Africa says VAT201 submission to SARS is available in Sage 200 Evolution from version 11. SYSPRO is a South African company founded in Johannesburg in 1978. Acumatica lists South Africa among its localisation countries. SAP sells Business One to South African businesses through local partners. Ask each to show the VAT output and the eFiling step in a live demonstration, not a slide.",
      },
      {
        type: "p",
        text: "See [SYSPRO against SAP Business One](/versus/syspro-vs-sap-business-one) and [NetSuite against Acumatica](/versus/netsuite-vs-acumatica), the guide to [asking for a quote](/briefings/how-to-ask-for-a-quote), or the whole [ERP category](/sector/erp).",
      },
    ],
  },

  {
    slug: "why-software-register-has-no-ratings-and-no-rankings",
    title: "Why Software Register has no ratings and no rankings",
    standfirst: "Every product on the register is listed A to Z. None is scored, ranked or given a star count. Here is why, and what you can still do.",
    category: "Editorial",
    author: AUTHOR,
    published_at: DATE,
    hero: { kind: "mark", caption: "No ratings. No rankings.", tone: "azure" },
    product_slugs: [],
    body: [
      {
        type: "p",
        text: "On 11 October 2026 we removed every rating, review count, score and rank from the site. The register is now listed alphabetically, and you can sort it by price or by the date the price was read. Nothing is placed above anything else.",
      },
      { type: "h2", text: "The problem with a score" },
      {
        type: "p",
        text: "A single number looks like a fact and is not one. It folds together things a South African buyer weighs very differently: whether a product files VAT201, whether it feeds from your bank, what it costs in rand with VAT in or out. A product can score highly for a business in another country and still be wrong for yours.",
      },
      { type: "h2", text: "What replaces it" },
      {
        type: "ul",
        items: [
          "The price in rand, with its VAT basis and the date it was read from the vendor.",
          "Every plan the vendor lists, with what each one adds.",
          "SARS returns and bank feeds, only where the vendor's own page says so.",
          "Head to head pages that set two products side by side and name no winner.",
        ],
      },
      { type: "h2", text: "What you can still do" },
      {
        type: "p",
        text: "Anyone can [write a review](/write-a-review) of any product. An editor reads it first, and it appears on that product's page as written. Reviews are never averaged or counted into a score, and a vendor cannot pay to change or remove one.",
      },
      { type: "h2", text: "Money and order" },
      {
        type: "p",
        text: "Some links on the site are affiliate links, and we earn a commission when a reader buys. That does not change what we publish or the order of the register. Read the [affiliate disclosure](/affiliate-disclosure) and [how the register works](/method).",
      },
    ],
  },
];

const BY_SLUG = new Map(BLOG_POSTS.map((p) => [p.slug, p]));

export function getBlogPost(slug: string): BlogPost | undefined {
  return BY_SLUG.get(slug);
}

/** Newest first. Posts on the same day keep the order they are written in. */
export function getBlogPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort((a, b) => b.published_at.localeCompare(a.published_at));
}

/** Reading time in whole minutes at 200 words a minute, never under two. */
export function readMinutes(post: BlogPost): number {
  return readTime(post.body, post.standfirst);
}

export const BLOG_CATEGORIES = ["Pricing", "Market notes", "Buying guide", "Editorial"] as const;
