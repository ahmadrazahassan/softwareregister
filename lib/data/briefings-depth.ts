import type { BriefingBlock } from "../types";

/**
 * Extra sections for the guides, each placed before a named heading of its guide,
 * or at the end (before the closing note, if the guide has one). They sit in
 * their own file so each guide reads in the order it is shown, and so the depth
 * can grow without the first file turning into a wall of text.
 *
 * Same rules as the guides they extend: register figures come from {{tokens}} and
 * `live` blocks, statutory facts are the short stable list the guides state, and
 * copy has no hyphens and no dashes.
 */
export interface Depth {
  slug: string;
  /** The text of an h2 in the guide to insert before, or "end". */
  before: string;
  blocks: BriefingBlock[];
}

export const DEPTH: Depth[] = [
  /* ------------------------------------------------------------ pricing */
  {
    slug: "what-software-costs-in-rand",
    before: "Prices in dollars, pounds and euros",
    blocks: [
      { type: "h2", text: "What a bill looks like in each sector" },
      {
        type: "table",
        head: ["Sector", "How it is usually priced", "What to multiply"],
        rows: [
          ["[Accounting](/sector/accounting)", "A plan per organisation, with users and companies included up to a limit", "Extra users, extra companies and add on modules"],
          ["[Payroll](/sector/payroll)", "A rate per employee, or bands of headcount", "Your employees, and each company you run"],
          ["[HR](/sector/hr)", "A rate per employee for a core plan, with modules added on", "Employees times the core plan, plus each module you switch on"],
          ["[CRM](/sector/crm)", "A rate per user, rising by tier", "The salespeople who log in, at the tier you need"],
          ["[Project management](/sector/project-management)", "A rate per seat, often with a free plan for a few users", "Everyone who edits, at the plan that holds the views you need"],
          ["[ERP](/sector/erp)", "A quote, covering licences or a subscription plus implementation", "Users, modules and the partner's hours"],
        ],
      },
    ],
  },
  {
    slug: "what-software-costs-in-rand",
    before: "How to use the table",
    blocks: [
      { type: "h2", text: "Why the cheapest is not the answer" },
      {
        type: "p",
        text: "A product that costs less each month but cannot read your bank, prepare your VAT201 or produce your IRP5 certificates costs you hours, and your hours have a price. Rank the products you are considering on what they cost you in total: the subscription, the extras, your time and the cost of leaving. The cheapest plan that does everything you need is the right one, and it is often not the cheapest on the page.",
      },
      {
        type: "p",
        text: "The register keeps each price as the vendor stated it, with the date it was read. Vendors change their prices, and some announce increases in advance, so a price on this register is a record of a day and not a promise. Check the vendor's own page on the day you buy.",
      },
    ],
  },
  {
    slug: "including-and-excluding-vat",
    before: "When the vendor does not say",
    blocks: [
      { type: "h2", text: "Paying yearly or monthly" },
      {
        type: "p",
        text: "Many vendors show two prices: one when you pay each month and a lower monthly figure when you pay for a year at once. Both are usually per month, so a yearly plan is quoted as a monthly price but charged as a single yearly payment. Put the yearly figure on the same footing as the monthly one before you compare, and remember that the yearly payment leaves your bank account in one go. The calculator on each product's review shows both.",
      },
      { type: "h2", text: "Vendors outside South Africa" },
      {
        type: "p",
        text: "Many of the products on the register are made by companies abroad and priced in dollars, pounds or euros. A vendor outside South Africa may or may not charge South African VAT on your invoice, depending on how it is registered. The register converts the vendor's price to rand and does not add VAT it has not been told about. Ask the vendor whether the invoice you will receive carries South African VAT and shows its VAT number, because a VAT registered business can only claim what is on a proper tax invoice.",
      },
    ],
  },
  {
    slug: "how-to-ask-for-a-quote",
    before: "A message you can send",
    blocks: [
      { type: "h2", text: "What an ERP quote contains" },
      {
        type: "p",
        text: "An ERP is bought in pieces, and a quote can hide most of its cost in the pieces you did not know to ask about. Expect these lines, and ask for each one separately.",
      },
      {
        type: "ul",
        items: [
          "The licence or subscription: usually per user, with different prices for full users and light users.",
          "Modules: finance, stock, manufacturing, projects and the rest are often separate lines.",
          "Implementation: the partner's hours and rate, to set it up and bring your data across.",
          "Customisation: anything built for you, and who owns and maintains it.",
          "Training: for the team that will use it, and for the people who will run it.",
          "Support and updates after the first year, which is often a yearly percentage.",
          "Hosting, if the product runs on your own servers or with a hosting provider.",
        ],
      },
    ],
  },
  {
    slug: "how-to-ask-for-a-quote",
    before: "Expect it to take time",
    blocks: [
      { type: "h2", text: "The vendor, or the partner?" },
      {
        type: "p",
        text: "Many larger products are sold and implemented by local partners and not by the vendor directly. The partner sets its own implementation fee, knows the local rules, and is who you will phone when something breaks. Two partners selling the same product can quote very differently. Ask two, for the same scope, and compare the written proposals. Then ask each for a customer of your size and industry that you can phone.",
      },
    ],
  },
  {
    slug: "free-tiers-on-the-register",
    before: "Before you build on a free tier",
    blocks: [
      { type: "h2", text: "Who a free tier suits" },
      {
        type: "ul",
        items: [
          "A freelancer or a very small business with a handful of invoices a month, who needs a ledger and not a team.",
          "A business that wants to learn a product before it pays, and that will move to a paid plan on purpose.",
          "A small team trying a CRM or a project tool, where the free seats cover everyone who needs to log in.",
          "A business that already pays for other software from the same vendor and wants one more tool alongside.",
        ],
      },
      { type: "h2", text: "Why vendors offer them" },
      {
        type: "p",
        text: "A free plan is a way to get you in the door. It is honest to say so: the vendor hopes you will grow into a paid plan, and most free plans are built so that growth is the point at which you start paying. That is not a problem. It is a reason to read the paid plan above before you commit your records to a product.",
      },
    ],
  },
  {
    slug: "free-tiers-on-the-register",
    before: "A plan for outgrowing it",
    blocks: [
      { type: "h2", text: "Keep your exit open" },
      {
        type: "ul",
        items: [
          "Export your data on a schedule, and keep a copy that you can open without the product.",
          "Do not build a process that only works on the free plan's quirks.",
          "Keep your customers' details in a form you can move, and tell the vendor to delete them if you leave.",
          "Note the date a free plan was last checked on its own page. The register records it for every product.",
        ],
      },
    ],
  },

  /* --------------------------------------------------------- compliance */
  {
    slug: "vat-and-the-vat201-return",
    before: "What the register records",
    blocks: [
      { type: "h2", text: "Registering for VAT" },
      {
        type: "p",
        text: "Registration is compulsory once your taxable turnover passes R1 million in a twelve month period. You can register voluntarily if your taxable supplies have passed R50 000 in the last twelve months. A business that is registered must charge VAT on its taxable supplies and submit returns, even in a period in which it sold nothing. Registering voluntarily can make sense if your customers are VAT registered and you have large inputs to claim back, but it also adds a return every period, so ask your accountant first.",
      },
      { type: "h2", text: "Standard rated, zero rated and exempt" },
      {
        type: "table",
        head: ["Kind of supply", "VAT charged", "Can you claim input tax?"],
        rows: [
          ["Standard rated", "{{vat_pct}} percent", "Yes"],
          ["Zero rated, such as exports and some basic foodstuffs", "0 percent, but the sale still goes on the return", "Yes"],
          ["Exempt, such as residential rent and financial services", "None, and it is not on the return", "No, for the costs of making the exempt supply"],
        ],
      },
      {
        type: "p",
        text: "Your software has to keep these separate. A zero rated sale and an exempt sale look the same on an invoice, because neither shows VAT, but they are treated differently on the return. Check that the product has distinct VAT codes for each, and that you can add your own.",
      },
    ],
  },
  {
    slug: "vat-and-the-vat201-return",
    before: "Keep the records",
    blocks: [
      { type: "h2", text: "Your first return" },
      {
        type: "ol",
        items: [
          "Make sure your VAT number, period and basis are set up in the software before you issue your first invoice.",
          "Code every sale and purchase correctly as you enter it: standard, zero rated, exempt or no VAT.",
          "At the end of the period, run the VAT report and compare it to your bank and your ledger.",
          "Check that the VAT201 figures add up: output tax less input tax gives the amount due or refundable.",
          "Submit on eFiling and pay by the date SARS gives. Keep the proof of both.",
        ],
      },
    ],
  },
  {
    slug: "payroll-returns-emp201-emp501-irp5",
    before: "e@syFile",
    blocks: [
      { type: "h2", text: "Registering as an employer" },
      {
        type: "p",
        text: "An employer registers with SARS for PAYE, and for SDL and UIF where they apply, and gets a reference number that appears on every EMP201. Contributions to UIF are also declared to the Unemployment Insurance Fund, which has its own online service. Employers are also expected to register with the Compensation Fund under COIDA and file a Return of Earnings each year. Your payroll software holds these numbers, so check that each is entered and correct before the first pay run.",
      },
      { type: "h2", text: "The rhythm of the year" },
      {
        type: "ol",
        items: [
          "Every month: run payroll, pay staff, submit the EMP201 and pay SARS by the 7th.",
          "Around the end of October: the interim EMP501 reconciliation for the first six months of the tax year.",
          "At the end of the tax year in February: check every employee's details and fix any open corrections.",
          "By the end of May: the annual EMP501 reconciliation, and the IRP5 and IT3(a) certificates.",
        ],
      },
    ],
  },
  {
    slug: "bcea-leave-what-hr-software-must-accrue",
    before: "What happens when someone leaves",
    blocks: [
      { type: "h2", text: "Sick leave in practice" },
      {
        type: "p",
        text: "An employer need not pay sick leave unless the employee produces a medical certificate, where the employee has been absent for more than two consecutive days, or more than twice in an eight week period. Software that records sick leave should let you attach the certificate and see how many occasions fall in a rolling eight weeks, because that is the question an HR manager asks first.",
      },
      { type: "h2", text: "Maternity, parental and the UIF" },
      {
        type: "p",
        text: "The BCEA gives the leave. Pay during maternity or parental leave usually comes from the Unemployment Insurance Fund as a benefit, and not from the employer, unless the contract says otherwise. Payroll has to stop paying the salary during the leave and give the employee the documents they need to claim, so HR and payroll have to agree on the dates.",
      },
      { type: "h2", text: "Part time and flexible staff" },
      {
        type: "p",
        text: "Leave accrues by days or hours worked, so an employee on three days a week accrues differently from one on five. A product that assumes everyone works a standard week will misstate the balance of every part time employee. Ask the vendor to show a part time employee's accrual during the demonstration.",
      },
    ],
  },
  {
    slug: "bank-feeds-by-bank",
    before: "Test it with your own account",
    blocks: [
      { type: "h2", text: "Why feeds go wrong" },
      {
        type: "ul",
        items: [
          "Your bank changes how it connects, and the feed stops until the vendor or bank fixes it.",
          "The authorisation you gave expires, and the feed asks you to approve it again.",
          "Descriptions differ from the statement, so automatic matching rules stop matching.",
          "A transaction arrives twice, once from the feed and once from a file you imported.",
        ],
      },
      { type: "h2", text: "A reconciliation routine" },
      {
        type: "ol",
        items: [
          "Reconcile at least weekly, so that an error is a few lines and not a month.",
          "Accept the matches the software suggests only after you have looked at the amount and the description.",
          "Create a rule for every repeating item, such as rent, bank charges and salaries.",
          "At month end, check that the closing balance in the software equals the closing balance on the statement.",
        ],
      },
      { type: "h2", text: "Card and payment service settlements" },
      {
        type: "p",
        text: "If you take card or EFT payments through a payment service, your bank shows one settlement that covers many sales, less fees. The software has to let you match one bank line to several invoices and record the fee. Test this with a real settlement, because it is the item that most often stops a reconciliation from balancing.",
      },
    ],
  },

  /* ------------------------------------------------------------- buying */
  {
    slug: "payroll-software-checklist-for-south-african-employers",
    before: "Leave, and the law behind it",
    blocks: [
      { type: "h2", text: "Taking a person on, and letting a person go" },
      {
        type: "p",
        text: "Payroll starts and ends with an employee, and both ends have data and documents that the software should handle.",
      },
      {
        type: "ul",
        items: [
          "On starting: ID or passport number, tax reference, bank details, start date, hours and the pay structure.",
          "During: changes of pay, deductions, loans, leave and any increases, each with a date.",
          "On leaving: the final pay run, any accrued leave paid out, the UIF information, and the certificate that reaches SARS.",
        ],
      },
      {
        type: "p",
        text: "Ask the vendor to show you each in the demonstration, with a dummy employee. The two ends are where a product reveals how well it fits South African rules.",
      },
    ],
  },
  {
    slug: "how-to-test-software-in-a-free-trial",
    before: "After the trial",
    blocks: [
      { type: "h2", text: "A scorecard you can copy" },
      {
        type: "table",
        head: ["Test", "What good looks like", "Result"],
        rows: [
          ["1. A real tax invoice", "Carries the words tax invoice, both VAT numbers and an unbroken number", ""],
          ["2. Your own bank", "Yesterday's transactions arrive, and a month reconciles with few hand fixes", ""],
          ["3. A past return", "VAT201 or payslip figures match what you actually filed or paid", ""],
          ["4. A support question", "A reply that answers it, within the vendor's stated hours", ""],
          ["5. Your data out", "Invoices as PDFs and the ledger as a file you can open", ""],
        ],
      },
      { type: "h2", text: "If the trial is too short" },
      {
        type: "p",
        text: "Many trials run for a few weeks, and a month end can fall outside them. Ask the vendor for an extension, and say what you are testing and why. A vendor that wants your business will usually agree, and one that will not is telling you how it treats customers who need help.",
      },
    ],
  },
  {
    slug: "a-valid-tax-invoice-in-south-africa",
    before: "Keep the copies",
    blocks: [
      { type: "h2", text: "Sending invoices electronically" },
      {
        type: "p",
        text: "A tax invoice may be issued and kept electronically. An emailed PDF is a valid copy as long as it carries every required detail, and the record you keep can be produced to SARS in a readable form. What matters is that the invoice you send is the same as the one you keep, which is another reason not to edit sent invoices.",
      },
      { type: "h2", text: "A check before you send" },
      {
        type: "ul",
        items: [
          "Is the word invoice or tax invoice at the top?",
          "Are your VAT number and address correct?",
          "Is the customer's name right, and their VAT number there if the value is above R5 000?",
          "Does the invoice have a number that follows the last one?",
          "Do the lines add up, and does the VAT total match the VAT on the lines?",
        ],
      },
    ],
  },
  {
    slug: "the-south-african-small-business-compliance-calendar",
    before: "Do not leave it to the last day",
    blocks: [
      { type: "h2", text: "A routine that holds" },
      {
        type: "ol",
        items: [
          "On the 1st of each month: close the previous month in your books and reconcile the bank.",
          "By the 3rd: run payroll and prepare the EMP201.",
          "By the 5th: pay SARS, with a clear day to spare before the 7th.",
          "In a VAT month: prepare the VAT201 from the ledger and check it against the bank before you submit.",
          "In October and May: block a day for the payroll reconciliations and certificates.",
        ],
      },
      { type: "h2", text: "Who to call" },
      {
        type: "p",
        text: "Your accountant or bookkeeper is the first call for anything that looks wrong. For a payment or a return that you cannot make on time, contact SARS before the date and not after it. The vendor of your software can tell you how the product handles a correction, but it cannot decide what you owe.",
      },
    ],
  },
  {
    slug: "popia-and-your-software-vendor",
    before: "Payroll and HR carry more risk",
    blocks: [
      { type: "h2", text: "What to write down" },
      {
        type: "p",
        text: "A small business does not need a long policy, but it does need to be able to say what it holds and why. A page that answers these is a good start, and it is the first thing a regulator or a customer will ask for.",
      },
      {
        type: "ul",
        items: [
          "What personal information you collect, and from whom: customers, suppliers, employees.",
          "Why you collect it, and who in the business can see it.",
          "Which software holds it, and where that software stores it.",
          "How long you keep it, and how you delete it.",
          "Who the information officer is, and how a person can contact them.",
        ],
      },
      { type: "h2", text: "If something goes wrong" },
      {
        type: "ol",
        items: [
          "Contain it: change passwords, remove access and ask your vendor what happened.",
          "Find out what was exposed, and whose information it was.",
          "Notify the Information Regulator and the people affected as soon as reasonably possible, as the Act requires.",
          "Write down what happened and what you changed, and keep the record.",
        ],
      },
    ],
  },
  {
    slug: "moving-from-sage-pastel-to-cloud-accounting",
    before: "Ask each vendor what it can import",
    blocks: [
      { type: "h2", text: "A four week plan" },
      {
        type: "table",
        head: ["Week", "What happens"],
        rows: [
          ["Before", "Choose the product, take the trial, test the import with a copy of your data and agree the changeover date with your accountant"],
          ["Week 1", "Set up the new company, VAT settings and chart of accounts, and enter opening balances"],
          ["Week 2", "Connect the bank, import transactions and reconcile. Raise the first invoices from the new system"],
          ["Week 3", "Run old and new side by side, and compare the bank balance, debtors and creditors"],
          ["Week 4", "Close the month in both, compare the VAT, then switch off the old system for new entries"],
        ],
      },
      { type: "h2", text: "Mistakes to avoid" },
      {
        type: "ul",
        items: [
          "Changing over in the middle of a VAT period, so that a return needs figures from two systems.",
          "Importing everything, including years of old transactions you will never use, instead of balances and a clean start.",
          "Forgetting the stock count, so that inventory values start wrong.",
          "Not telling your bank, your accountant and your auditor which system is now the record.",
        ],
      },
    ],
  },
  {
    slug: "load-shedding-and-business-software",
    before: "Plan around the deadlines",
    blocks: [
      { type: "h2", text: "A month end with a power cut" },
      {
        type: "p",
        text: "Picture the last working day of the month with two hours of load shedding in the middle of payroll. If your router is on a battery, you lose nothing. If it is not, you lose two hours of a day you cannot spare. The fix is small and has to be done before the day, not during it. The same goes for your payment run, since banks and SARS work to their own timetables, not yours.",
      },
      { type: "h2", text: "Payroll day plan" },
      {
        type: "ol",
        items: [
          "Run payroll a few days before it is due, not the evening before.",
          "Check the load shedding schedule for your area, and plan the run for a stretch with power.",
          "Keep the bank's payment file ready, and know how to submit it from a phone if the office is dark.",
          "Submit the EMP201 on the first day you can, and keep the proof of payment.",
        ],
      },
    ],
  },
  {
    slug: "including-and-excluding-vat",
    before: "Check the first invoice",
    blocks: [
      { type: "h2", text: "A checklist before you sign" },
      {
        type: "ol",
        items: [
          "Write down the listed price, the basis it is on and whether it is per month, per user or per employee.",
          "Convert it to the footing you pay: the price excluding VAT if you are registered, the price including VAT if you are not.",
          "Multiply by the users or employees you will actually have, and add the extras you need.",
          "Ask whether the yearly price is charged once or monthly, and when the first payment leaves your account.",
          "Ask in writing whether the invoice will carry South African VAT and the vendor's VAT number.",
        ],
      },
      {
        type: "p",
        text: "The reviews on the register do this sum for you. Each has a calculator that adds a plan, a team size and any extras, and shows the month and the year with VAT in and out where the vendor states its basis.",
      },
    ],
  },
  {
    slug: "how-to-ask-for-a-quote",
    before: "Expect it to take time",
    blocks: [
      { type: "h2", text: "Questions about the project" },
      {
        type: "ul",
        items: [
          "Who does the implementation, how many hours are quoted and what is the rate?",
          "How long will it take from signing to the first real transaction, and what do you need from us?",
          "What happens if the project overruns, and who pays for it?",
          "Can we start with one module or one site and add the rest later?",
          "What is the notice period, and what do we pay if we stop?",
        ],
      },
    ],
  },
  {
    slug: "free-tiers-on-the-register",
    before: "Keep your exit open",
    blocks: [
      { type: "h2", text: "Where to find the limits" },
      {
        type: "table",
        head: ["What you need to know", "Where to look"],
        rows: [
          ["What the free plan includes", "The vendor's own pricing page, linked from the product's review on the register"],
          ["What the first paid plan costs in rand, and on what footing", "The plan cards and the calculator on the review"],
          ["Whether a trial or a free plan is on offer", "The review's at a glance figures"],
          ["Whether your data can leave", "The vendor's help pages, and a test export during your first week"],
        ],
      },
    ],
  },
  {
    slug: "payroll-returns-emp201-emp501-irp5",
    before: "What good payroll software does",
    blocks: [
      { type: "h2", text: "When a declaration is wrong" },
      {
        type: "p",
        text: "Mistakes happen: an employee is paid the wrong amount, an increase is back dated or a deduction is missed. The correction has to be made in the payroll and then reflected in the next declaration, in line with SARS's rules. Ask your payroll vendor how its software records a correction, whether it keeps the original figure beside the new one, and what it exports, so that the EMP501 can still be reconciled. Software that overwrites history makes the reconciliation harder, not easier.",
      },
      { type: "h2", text: "Why timing matters" },
      {
        type: "p",
        text: "The declaration and the payment are due together, and SARS charges penalties and interest on what is late. A payroll that is run late cannot produce an EMP201 in time, and so the date to protect is the day staff are paid, not the 7th. Build in a day or two of slack, and read [load shedding and business software](/briefings/load-shedding-and-business-software) if your office loses power.",
      },
    ],
  },
  {
    slug: "bcea-leave-what-hr-software-must-accrue",
    before: "Keep the records",
    blocks: [
      { type: "h2", text: "When leave must be taken" },
      {
        type: "p",
        text: "An employer must allow annual leave to be taken, by agreement, within six months after the end of the leave cycle in which it accrued. That sets a clock on every balance, so the useful report is not just who has days, but whose days are about to become a problem. Ask whether the product flags balances that are large or ageing.",
      },
      { type: "h2", text: "What to show in a dispute" },
      {
        type: "ul",
        items: [
          "The employee's start date and the leave cycle that applies to them.",
          "The accrual rule used, and the record of every day taken or paid out.",
          "Any medical certificates and approvals attached to the days.",
          "The final calculation, if the employee has left.",
        ],
      },
    ],
  },
  {
    slug: "bank-feeds-by-bank",
    before: "Why feeds go wrong",
    blocks: [
      { type: "h2", text: "Feed or file: what each costs you" },
      {
        type: "table",
        head: ["Route", "Setup", "Effort each week", "Works with any bank"],
        rows: [
          ["Direct feed", "A one off authorisation, sometimes a form for the bank", "Review and reconcile", "No, only the banks the vendor lists"],
          ["Feed through a service", "A one off authorisation with the service", "Review and reconcile", "No, only the banks the service supports"],
          ["File import", "None, beyond downloading the statement", "Download, import, review and reconcile", "Yes"],
        ],
      },
    ],
  },
  {
    slug: "choosing-a-crm-for-a-south-african-sales-team",
    before: "A test worth running",
    blocks: [
      { type: "h2", text: "Moving your data in" },
      {
        type: "p",
        text: "Most teams start from a spreadsheet, and the first import decides how much they trust the new system. Clean the file before you load it: one row for each person, no duplicates, dates in one format and a column for who owns each contact. Ask the vendor how it matches contacts that already exist, and what happens to the history, such as notes and past deals, that a spreadsheet does not hold.",
      },
      { type: "h2", text: "When a salesperson leaves" },
      {
        type: "p",
        text: "A CRM is meant to keep what a salesperson knows inside the business. Check how you reassign their contacts and deals in one step, whether their emails and notes stay, and what the former employee can still see. Under POPIA the customer details are yours to protect, so access has to end the day the person does.",
      },
    ],
  },
  {
    slug: "choosing-project-management-software-in-south-africa",
    before: "Run a real project through it",
    blocks: [
      { type: "h2", text: "Roles, guests and permissions" },
      {
        type: "p",
        text: "Decide who can create a project, who can only edit tasks and who can only look. Most products separate full members from guests, and many do not charge for guests. Check which of your people count as which, since a client who comments on a task and a contractor who logs hours are priced differently from a colleague who runs the project.",
      },
      { type: "h2", text: "Roll it out one team at a time" },
      {
        type: "p",
        text: "A tool fails when it is switched on for everyone on the same Monday. Start with one team and one real project, let them set the stages and the rules, and add the next team once the first is using it without being chased. Keep the old way running beside it for a short while, and set a date on which it stops.",
      },
    ],
  },
];
