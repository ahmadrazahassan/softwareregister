import type { Briefing } from "../types";

/**
 * The buying and compliance guides added on 12 October 2026, all written for
 * South African buyers. They follow the same two rules as the first guides.
 *
 * 1. Register figures are never typed in. Prose uses {{tokens}} and `live`
 *    blocks, so a price or a count changes with the register.
 * 2. Statutory facts are limited to ones that are stable and widely published,
 *    and each is stated plainly with the body to check it with: the VAT rate,
 *    the R1 million registration threshold, the contents of a tax invoice and
 *    the R5 000 line for an abridged one, EMP201, EMP501, IRP5, UIF at one
 *    percent each side, SDL at one percent over R500 000 of payroll, the five
 *    year record keeping rule, the regular SARS return dates, POPIA's operator,
 *    breach and cross border rules, and BCEA minimum leave. Nothing here claims
 *    what a named product does with SARS or POPIA: that comes from the record,
 *    or the reader is told to ask.
 *
 * Copy contains no hyphens and no dashes. Rewrite the sentence instead.
 */

const AUTHOR = "Software Register editorial";
const DATE = "2026-10-12";

export type Draft = Omit<Briefing, "read_minutes">;

export const MORE_BRIEFINGS: Draft[] = [
  /* ------------------------------------------------------------------------ */
  {
    slug: "choosing-accounting-software-in-south-africa",
    title: "Choosing accounting software in South Africa",
    standfirst:
      "Most advice on accounting software is written for America or Britain. These are the six questions that decide whether a product works for a South African business, with the register's own tables to check each one against.",
    topic: "Buying",
    author: AUTHOR,
    published_at: DATE,
    product_slugs: ["sage-accounting", "xero", "quickbooks-online", "zoho-books", "freshbooks", "wave-accounting", "sage-50cloud-pastel"],
    published: true,
    body: [
      {
        type: "p",
        text: "A ranking of accounting software tells you which product a reviewer preferred. It does not tell you whether the product prepares a VAT201, reads transactions from your bank or quotes a price you can compare with the next one. Those are the questions that decide whether accounting software works in South Africa, and they have right and wrong answers that you can check.",
      },
      {
        type: "p",
        text: "Work through the six below in order. Each one cuts the shortlist. By the end you should have two or three products to put through a real trial, and you will know what to test.",
      },
      { type: "h2", text: "1. Are you registered for VAT?" },
      {
        type: "p",
        text: "VAT is charged at {{vat_pct}} percent. A business must register once its taxable turnover passes R1 million in any twelve month period, and may register voluntarily below that. If you are registered, you submit a VAT201 return to SARS for every tax period, and your software has to keep the books in a way that makes the return easy to produce and easy to defend.",
      },
      {
        type: "p",
        text: "If you are not registered, you can ignore VAT reporting for now, but check that the product lets you switch it on later without rebuilding your books. A business that grows past R1 million often has to register faster than it planned.",
      },
      {
        type: "ul",
        items: [
          "Does the product prepare the VAT201 figures from your ledger?",
          "Can it move them into SARS eFiling, or does it only export a file?",
          "Does it handle both the invoice basis and the payments basis?",
          "Does it print a valid tax invoice? See [what a valid tax invoice needs](/briefings/a-valid-tax-invoice-in-south-africa).",
        ],
      },
      {
        type: "p",
        text: "The register records VAT201 support only where the vendor's own page states it. The compliance matrix on the [accounting sector page](/sector/accounting) shows which products do. For the background, read [VAT and the VAT201 return](/briefings/vat-and-the-vat201-return).",
      },
      { type: "h2", text: "2. Does it read your bank?" },
      {
        type: "p",
        text: "A bank feed pulls your transactions in every day so that you reconcile instead of typing. It is the feature that saves the most hours, and the one where global products let South African businesses down most often, because feeds are built for American and British banks first.",
      },
      { type: "live", name: "banks" },
      {
        type: "p",
        text: "The table counts the products whose own pages list a feed with each bank. Capitec and TymeBank are the two to check first if you bank with a newer bank. Read [bank feeds, bank by bank](/briefings/bank-feeds-by-bank), then ask the vendor to confirm the feed for your account type by name.",
      },
      { type: "h2", text: "3. What does the price really cover?" },
      {
        type: "p",
        text: "Two prices are only comparable on the same footing. Some South African vendors quote with VAT included, some without, and some do not say. A business that is registered for VAT claims the VAT back, so the price excluding VAT is its real cost. A business that is not registered pays the price including VAT.",
      },
      { type: "live", name: "vat" },
      {
        type: "p",
        text: "Then ask what the price is charged on. Accounting products are priced per organisation, per user or by a bundle of both. A plan that includes three users and one company is a different product from one that charges for each. [Including and excluding VAT in a software price](/briefings/including-and-excluding-vat) shows how to put them side by side.",
      },
      { type: "h2", text: "4. How many users and companies?" },
      {
        type: "p",
        text: "Count the people who need to log in: you, a bookkeeper, an accountant who reviews the books each quarter, perhaps a salesperson who raises invoices. Then count the companies. A business owner with a trading company and a property company needs two sets of books, and some plans charge for each company.",
      },
      {
        type: "ul",
        items: [
          "How many users does the plan include, and what does an extra user cost?",
          "Can your accountant log in without taking up a paid seat?",
          "How many companies does the plan include?",
          "What limits sit on the entry plan, such as invoices or bills a month?",
        ],
      },
      { type: "h2", text: "5. Cloud, desktop, or both?" },
      {
        type: "p",
        text: "Most of the products on the register run in a browser. Sage describes Sage 50cloud Pastel as desktop accounting with cloud access. Cloud products need a connection to work. Desktop products need power and a backup routine. In a country with load shedding, neither is simply better, and the right answer depends on how you work. Read [load shedding and business software](/briefings/load-shedding-and-business-software) before you decide.",
      },
      { type: "h2", text: "6. What does leaving cost?" },
      {
        type: "p",
        text: "You will change systems at some point. Ask now what you can take with you. SARS expects you to keep your financial records for five years, so you need to be able to produce the history even after you stop paying. A product that only lets you export the current year, or that deletes your data the day you cancel, is expensive in a way the price does not show.",
      },
      {
        type: "ul",
        items: [
          "In what formats can you export your ledger, customers, suppliers and stock?",
          "How long does the vendor keep your data after you cancel?",
          "Can you download every invoice as a PDF?",
        ],
      },
      { type: "h2", text: "From six answers to a shortlist" },
      {
        type: "ol",
        items: [
          "Write down your answers to the six questions on one page, including your bank and whether you are registered for VAT.",
          "Open the [accounting sector page](/sector/accounting) and use the compliance matrix to drop any product that does not state the VAT201 support you need.",
          "Check the bank feed table for your bank and drop any product that does not list it.",
          "Price the remaining products on the same footing, for your real number of users and companies.",
          "Take the two or three that are left through a trial, using the five tests in [how to test software in a free trial](/briefings/how-to-test-software-in-a-free-trial).",
        ],
      },
      {
        type: "note",
        text: "The register does not rank products or name a best one. A product that suits a registered trading business with three users may be wrong for a freelancer, and the cheapest plan is not the best value if it cannot read your bank.",
      },
    ],
  },

  /* ------------------------------------------------------------------------ */
  {
    slug: "payroll-software-checklist-for-south-african-employers",
    title: "A payroll software checklist for South African employers",
    standfirst:
      "Payroll is the one kind of business software where a mistake reaches your staff and SARS in the same month. These are the checks that matter in South Africa, from the payslip to the EMP501.",
    topic: "Buying",
    author: AUTHOR,
    published_at: DATE,
    product_slugs: ["simplepay", "sage-payroll", "payspace", "paysoft", "labournet", "sage-pastel-payroll"],
    published: true,
    body: [
      {
        type: "p",
        text: "Running payroll in South Africa is not only paying salaries. Every month the employer works out tax and contributions, declares and pays them to SARS, and gives each employee a payslip. Every year it reconciles the year's declarations and issues certificates. Software that does the first part well and the second part badly leaves you with a bill in May.",
      },
      { type: "h2", text: "What it has to calculate" },
      {
        type: "ul",
        items: [
          "PAYE, the income tax withheld from each salary.",
          "UIF, at 1 percent from the employee and 1 percent from the employer.",
          "SDL, at 1 percent of payroll, for employers whose annual payroll is above R500 000.",
          "ETI, the incentive that reduces PAYE for qualifying young employees, where it applies.",
          "Employer contributions to the Compensation Fund under COIDA, which have their own annual return.",
        ],
      },
      {
        type: "p",
        text: "Ask the vendor whether tax tables update automatically when SARS changes them, and whether the update is included in the price. Software that needs a paid upgrade each tax year is a cost that belongs in your comparison.",
      },
      { type: "h2", text: "What it has to produce" },
      {
        type: "table",
        head: ["Output", "What to ask the vendor"],
        rows: [
          ["Payslip", "Does it show leave balances and every deduction, and can employees read it on a phone?"],
          ["EMP201", "Does it prepare the monthly declaration of PAYE, UIF and SDL, and is the figure the one you pay?"],
          ["EMP501 data", "Does it support the interim and annual reconciliations without recapturing anything?"],
          ["IRP5 and IT3(a)", "Does it issue the employee certificates, and in the form SARS accepts?"],
          ["UIF declaration", "Does it produce the monthly UIF declaration file?"],
        ],
      },
      {
        type: "p",
        text: "The full chain, and what each document is for, is in [payroll returns: EMP201, EMP501 and IRP5](/briefings/payroll-returns-emp201-emp501-irp5). The register records which payroll products state support for these returns on their own pages. See the [payroll sector page](/sector/payroll).",
      },
      { type: "h2", text: "How it reaches SARS" },
      {
        type: "p",
        text: "There is a difference between software that prepares a return and software that submits it. Many products produce a file that you load into e@syFile or capture on eFiling yourself. Some transfer the figures directly. The first costs you an hour a month and a chance to mistype; the second does not. Ask which one you are buying, and ask to see it happen.",
      },
      { type: "h2", text: "Leave, and the law behind it" },
      {
        type: "p",
        text: "Payroll and leave are connected: leave taken reduces pay, and accrued leave is owed when an employee leaves. If the product handles leave, check that it accrues each type by the rule that applies. [BCEA leave: what HR software must accrue](/briefings/bcea-leave-what-hr-software-must-accrue) lists the minimums.",
      },
      { type: "h2", text: "How it is priced" },
      {
        type: "p",
        text: "Payroll is priced in three ways on the register: a rate per employee, bands of headcount, and on request. A rate per employee is easy to scale. Bands change in steps, so the cost of the next employee depends on where you sit. A quote has to be turned into something you can compare, which [how to ask for a quote](/briefings/how-to-ask-for-a-quote) explains.",
      },
      {
        type: "ul",
        items: [
          "Is the price per employee, per band, or per company?",
          "Is VAT included? Read [including and excluding VAT](/briefings/including-and-excluding-vat).",
          "Are several companies billed separately?",
          "Is there a minimum, or a different arrangement above a certain headcount?",
          "Is a bureau or accountant running payroll for clients priced differently?",
        ],
      },
      { type: "h2", text: "Run it yourself, or have it run for you" },
      {
        type: "p",
        text: "Some vendors sell software you operate. Some also run payroll for you, and some are payments companies or labour law advisers whose payroll is part of a wider service. A payments company is not a payslip calculator, and the register lists what each vendor's own page says it does. If your staff are few and your time is short, a managed service may cost less than your hours; if you want control and a lower price, run it yourself.",
      },
      { type: "h2", text: "The test that settles it" },
      {
        type: "p",
        text: "Take last month's payroll and run it in the trial. Compare every payslip to the cent against the one you actually issued: gross pay, PAYE, UIF, leave balance, net pay. Any difference is either an error in your old process or a gap in the new one, and both are worth knowing before you pay. The full method is in [how to test software in a free trial](/briefings/how-to-test-software-in-a-free-trial).",
      },
      {
        type: "note",
        text: "A payroll product that is cheap per employee but cannot produce your EMP501 data or IRP5 certificates will cost more in your time than a dearer one that can. Price the whole year, including the reconciliation.",
      },
    ],
  },

  /* ------------------------------------------------------------------------ */
  {
    slug: "how-to-test-software-in-a-free-trial",
    title: "How to test software in a free trial",
    standfirst:
      "A trial that you click around in tells you almost nothing. These are five tests, set for South African businesses, that tell you whether a product will survive a month of real work.",
    topic: "Buying",
    author: AUTHOR,
    published_at: DATE,
    product_slugs: [],
    published: true,
    body: [
      {
        type: "p",
        text: "Most trials are wasted. People log in, look at the dashboard, create one invoice and let the trial lapse. The product looks fine, because the dashboard always looks fine. What matters is whether it copes with your bank, your VAT, your payslips and your leaving. Those can be tested in an afternoon, if you prepare.",
      },
      { type: "h2", text: "Before you start the trial" },
      {
        type: "p",
        text: "A trial clock starts the day you sign up, so do not sign up until you have what you need to hand. Pull together a test pack from the last month of your real business.",
      },
      {
        type: "ul",
        items: [
          "Three or four real customer invoices, including one with VAT and one without.",
          "Your last bank statement as a file, and a note of which account type it is.",
          "Last month's payslips, if you are testing payroll or HR.",
          "Your last VAT201 or EMP201 figures, for comparison.",
          "A short list of questions you want the vendor's support to answer.",
        ],
      },
      { type: "h2", text: "Test 1: raise a real tax invoice" },
      {
        type: "p",
        text: "Create one of your real invoices and look at it as a SARS officer or your customer's accounts clerk would. Does it say tax invoice, carry your VAT number and your customer's details, and show the VAT amount? Does it number invoices in an unbroken sequence? Check it against [what a valid tax invoice needs](/briefings/a-valid-tax-invoice-in-south-africa). Then issue a credit note against it and see whether the product links the two.",
      },
      { type: "h2", text: "Test 2: connect your own bank" },
      {
        type: "p",
        text: "Connect the account you actually use, not a demo account. If there is a feed for your bank, check that it connects and that yesterday's transactions arrive. If there is no feed, import the statement file and see how many lines you have to fix by hand. Then reconcile a full month. Fifteen minutes of this tells you more than any feature list. See [bank feeds, bank by bank](/briefings/bank-feeds-by-bank).",
      },
      { type: "h2", text: "Test 3: run a VAT or payroll return from the numbers" },
      {
        type: "p",
        text: "For accounting software, enter a past VAT period and produce the VAT201 figures. Do they match the return you submitted? For payroll, run last month's payroll and compare each payslip to the cent. A difference is information. Either your old process had an error, or the new product handles something differently, and you want to know which before you pay.",
      },
      { type: "h2", text: "Test 4: ask support a real question" },
      {
        type: "p",
        text: "Send support a question you do not know the answer to, during South African office hours, and note when you wrote and when the reply came. Ask something specific, such as how the product handles a zero rated sale or a leave cycle. You are buying the product's answers as much as its screens, and a slow reply in the trial is a slow reply when you have a deadline.",
      },
      { type: "h2", text: "Test 5: get your data out" },
      {
        type: "p",
        text: "Before the trial ends, export what you entered. Download an invoice as a PDF. Export your customers, your ledger and your stock. Open the files. If you cannot take your data out cleanly while you are a trial user, you will not be able to when you are a customer who is leaving.",
      },
      { type: "h2", text: "After the trial" },
      {
        type: "ol",
        items: [
          "Write down what failed, not what impressed you. Failures are what you will live with.",
          "Price the plan you actually tested, for your real users and companies, not the plan that was on the front page.",
          "Check the VAT basis of that price before you compare it with another, using [including and excluding VAT](/briefings/including-and-excluding-vat).",
          "If two products pass, choose on the support experience and the price, and read both reviews on the [register](/register).",
        ],
      },
      {
        type: "note",
        text: "A free plan is not a free trial. A trial gives you the full product for a short time. A free plan limits something for ever. See [the free tiers on the register](/briefings/free-tiers-on-the-register) for what to check before you build on one.",
      },
    ],
  },

  /* ------------------------------------------------------------------------ */
  {
    slug: "a-valid-tax-invoice-in-south-africa",
    title: "What a valid tax invoice needs in South Africa",
    standfirst:
      "A customer who is registered for VAT can only claim back the VAT on an invoice that meets the law. Your software should produce one every time, and you should know what to look for.",
    topic: "Compliance",
    author: AUTHOR,
    published_at: DATE,
    product_slugs: ["sage-accounting", "xero", "quickbooks-online", "zoho-books"],
    published: true,
    body: [
      {
        type: "p",
        text: "If you are registered for VAT, the invoices you issue have to meet the VAT Act. If your customer is registered, the invoices they receive from you are what they claim input tax on, and an invoice that does not meet the Act can cost them the claim. That makes the layout of an invoice a matter of money for your customers, and so a matter of reputation for you.",
      },
      { type: "h2", text: "A quote is not a tax invoice" },
      {
        type: "p",
        text: "A quotation, a statement, a pro forma invoice and a delivery note are not tax invoices. A tax invoice is a document that records a supply that has happened. An invoice from a supplier who is not registered for VAT is not a tax invoice either, however professional it looks, and cannot be used to claim input tax.",
      },
      { type: "h2", text: "What a full tax invoice shows" },
      {
        type: "p",
        text: "A full tax invoice is the standard one. Where the value of the supply is more than R5 000, the invoice has to carry all of the following.",
      },
      {
        type: "table",
        head: ["Detail", "Why it matters"],
        rows: [
          ["The words tax invoice, VAT invoice or invoice, in a prominent place", "It identifies the document as the one the law means."],
          ["Your name, address and VAT registration number", "Your customer needs your VAT number to claim."],
          ["The customer's name and address, and their VAT number if the value is above R5 000", "It ties the invoice to the person claiming."],
          ["A serial number and the date of the invoice", "SARS expects an unbroken sequence, so gaps are noticed."],
          ["A description of the goods or services, and the quantity or volume", "It says what was supplied."],
          ["The value of the supply, the VAT charged and the total, or a statement that VAT is included at the standard rate", "It shows how much input tax is claimed."],
        ],
      },
      { type: "h2", text: "The abridged tax invoice" },
      {
        type: "p",
        text: "Where the total is R5 000 or less, an abridged tax invoice is allowed. It still has to show your name, address and VAT number, the date, a description of the goods or services, the total amount, and either the VAT charged or a statement that the amount includes VAT. It does not need the customer's details. Till slips are the common example.",
      },
      { type: "h2", text: "Credit and debit notes" },
      {
        type: "p",
        text: "If an invoice is wrong, you do not change it. You issue a credit note to reduce it or a debit note to increase it, and the note refers to the original invoice. Software that lets you edit an issued invoice in place breaks the paper trail that SARS looks for. Ask any product you are testing what it does when you need to correct a sent invoice.",
      },
      { type: "h2", text: "What your software should do" },
      {
        type: "ul",
        items: [
          "Print the words tax invoice and your VAT number on every invoice, automatically.",
          "Number invoices in an unbroken sequence and warn you before a number is skipped or reused.",
          "Hold your customers' VAT numbers and address them on the invoice when the value needs it.",
          "Show the VAT amount per line and in total, in rand.",
          "Issue credit and debit notes that point back to the invoice they correct.",
          "Keep a copy of every invoice you issued, in a form you can produce to SARS.",
        ],
      },
      { type: "h2", text: "Keep the copies" },
      {
        type: "p",
        text: "You are expected to keep your financial records, including the invoices you issued and received, for five years. If your software is cloud based, check that you can still reach them if you cancel, and that you can download them in bulk. See [choosing accounting software in South Africa](/briefings/choosing-accounting-software-in-south-africa) for the exit questions.",
      },
      {
        type: "note",
        text: "This guide lists what the VAT Act asks of an invoice in plain words. The Act and SARS's guides are the authority, and your accountant can confirm what applies to your business. Read [VAT and the VAT201 return](/briefings/vat-and-the-vat201-return) for how the invoices feed the return.",
      },
    ],
  },

  /* ------------------------------------------------------------------------ */
  {
    slug: "the-south-african-small-business-compliance-calendar",
    title: "The South African small business compliance calendar",
    standfirst:
      "VAT, payroll, provisional tax and the annual returns each have their own rhythm. One page showing what falls when, and what your software should do about it.",
    topic: "Compliance",
    author: AUTHOR,
    published_at: DATE,
    product_slugs: [],
    published: true,
    body: [
      {
        type: "p",
        text: "A small business in South Africa answers to several bodies on different rhythms. SARS wants its returns monthly, every two months, twice a year and once a year. The Compensation Fund wants an annual return. The company registry wants its own. Software cannot remember all of that for you, but good software puts the dates in front of you and prepares what each return needs.",
      },
      {
        type: "note",
        text: "The dates below are the usual ones. SARS, the Compensation Fund and the company registry publish their calendars each year, and a date that falls on a weekend or public holiday moves. Check the current calendar before you rely on a date.",
      },
      { type: "h2", text: "Every month" },
      {
        type: "table",
        head: ["What", "Usually due", "Who it applies to"],
        rows: [
          ["EMP201 declaration and payment of PAYE, UIF and SDL", "By the 7th of the following month", "Every employer with employees"],
          ["UIF declaration", "Monthly, with the EMP201 cycle", "Employers who contribute to UIF"],
          ["VAT201 return and payment", "Shortly after the end of the tax period: SARS publishes the dates, and returns submitted on eFiling have until the last business day of the month", "Vendors registered for VAT, monthly or every two months by category"],
        ],
      },
      { type: "h2", text: "Twice a year" },
      {
        type: "table",
        head: ["What", "Usually due", "Who it applies to"],
        rows: [
          ["Provisional tax payments (IRP6)", "The end of August and the end of February for individuals, with a third top up after the year end", "Provisional taxpayers; companies follow their own year end"],
          ["Interim EMP501 reconciliation", "By the end of October, covering the first six months of the tax year", "Every employer"],
        ],
      },
      { type: "h2", text: "Once a year" },
      {
        type: "table",
        head: ["What", "Usually due", "Who it applies to"],
        rows: [
          ["Annual EMP501 reconciliation and the issue of IRP5 and IT3(a) certificates", "By the end of May, for the tax year that ended in February", "Every employer"],
          ["Return of Earnings under COIDA", "Opens in April and closes at the end of May", "Employers registered with the Compensation Fund"],
          ["The company's income tax return", "Within twelve months of the company's financial year end", "Every company"],
          ["The annual return at the company registry", "After each anniversary of the company's registration, by the date the registry sets", "Every registered company"],
        ],
      },
      { type: "h2", text: "How the year feels" },
      {
        type: "p",
        text: "Most months are quiet except for the 7th and the VAT date. The pressure points are the end of October, when the interim payroll reconciliation is due, and May, when the annual reconciliation, the certificates and the Return of Earnings all land together. A payroll product that handles the reconciliation well earns its price in those two months.",
      },
      { type: "h2", text: "What your software should do" },
      {
        type: "ul",
        items: [
          "Prepare the VAT201 figures and the EMP201 from your records, so that the return is a check and not a calculation.",
          "Keep payroll data in a form that supports the EMP501 and the certificates. See [payroll returns: EMP201, EMP501 and IRP5](/briefings/payroll-returns-emp201-emp501-irp5).",
          "Show reminders for returns that are coming up, or let you set your own.",
          "Keep an audit trail, since SARS expects you to keep your records for five years.",
        ],
      },
      { type: "h2", text: "Do not leave it to the last day" },
      {
        type: "p",
        text: "SARS eFiling is a website, and your connection and the system's load on the deadline day are not in your control. File early, especially in a country with load shedding. Read [load shedding and business software](/briefings/load-shedding-and-business-software) for a plan.",
      },
      {
        type: "p",
        text: "SARS charges penalties and interest on late returns and late payments, so a missed date costs money even when the return itself is correct. If you cannot meet a date, tell your accountant early. The next step is to check each product on the register against the returns you need. The sector pages for [accounting](/sector/accounting) and [payroll](/sector/payroll) show what each vendor's own page states.",
      },
    ],
  },

  /* ------------------------------------------------------------------------ */
  {
    slug: "popia-and-your-software-vendor",
    title: "POPIA and your software vendor",
    standfirst:
      "Your customers' and employees' details sit in the software you choose. The law makes you responsible for them, and the vendor is acting for you. Here are the questions to put to a vendor before you hand over the data.",
    topic: "Compliance",
    author: AUTHOR,
    published_at: DATE,
    product_slugs: [],
    published: true,
    body: [
      {
        type: "p",
        text: "The Protection of Personal Information Act, known as POPIA, has been fully enforceable since 1 July 2021. It applies to a plumber with a customer list as much as to a bank. If your accounting, payroll, HR or CRM software holds names, ID numbers, addresses, bank details or salaries, the Act applies to how you choose and use it.",
      },
      { type: "h2", text: "You are the responsible party" },
      {
        type: "p",
        text: "POPIA calls the business that decides why and how personal information is used the responsible party. That is you. A software vendor that stores and processes that information on your behalf is an operator. You stay accountable for what an operator does with your data, which is why the choice of vendor is yours to defend.",
      },
      { type: "h2", text: "What the Act asks in practice" },
      {
        type: "ul",
        items: [
          "A written contract with every operator, requiring it to keep the information secure and to tell you if it is compromised.",
          "Reasonable security safeguards for the personal information you hold.",
          "Notifying the Information Regulator, and the people affected, if their information is accessed or acquired without authority.",
          "Restrictions on sending personal information outside South Africa, which allow it in set circumstances, such as where the recipient is bound by protection comparable to POPIA.",
          "An information officer for the business, registered with the Information Regulator. In a small business the owner usually holds this role.",
        ],
      },
      { type: "h2", text: "Questions to put to the vendor" },
      {
        type: "ol",
        items: [
          "Where is my data stored: which country, and which provider hosts it?",
          "Will you sign an operator agreement, or does your standard contract already contain one?",
          "Which other companies handle my data on your behalf, and can I see the list?",
          "How quickly will you tell me about a breach, and how?",
          "Who at your company can see my customers' data, and how is that access controlled and logged?",
          "How do I turn on two factor sign in and limit what each of my users can see?",
          "How long do you keep my data after I cancel, and how do I have it deleted?",
          "Do you use my data for anything other than running my account?",
        ],
      },
      { type: "h2", text: "What the register can and cannot tell you" },
      {
        type: "p",
        text: "The register records prices, plans, compliance features the vendors state and the banks they feed from. It does not record where each vendor stores data or what its contracts say. Many vendors publish a security or trust page that answers some of the questions above. Read it, and put the rest in writing. [How to ask for a quote](/briefings/how-to-ask-for-a-quote) covers the same habit for prices.",
      },
      { type: "h2", text: "Payroll and HR carry more risk" },
      {
        type: "p",
        text: "Payroll and HR software holds ID numbers, bank details, salaries and often health information such as sick leave notes. Some of that is special personal information under the Act, which carries stricter rules. If you choose a product for either, take the security questions more seriously and ask for them first. See [a payroll software checklist](/briefings/payroll-software-checklist-for-south-african-employers).",
      },
      { type: "h2", text: "Marketing and your CRM" },
      {
        type: "p",
        text: "If you use a CRM or an email tool to market to people, POPIA limits unsolicited electronic marketing. In general you need a person's consent, except where they are an existing customer and you are marketing similar products with an easy way to opt out. Check that your software records consent and handles unsubscribes properly.",
      },
      {
        type: "note",
        text: "This guide explains the Act in plain words and is not legal advice. The Information Regulator publishes guidance, and an attorney can tell you what applies to your business.",
      },
    ],
  },

  /* ------------------------------------------------------------------------ */
  {
    slug: "moving-from-sage-pastel-to-cloud-accounting",
    title: "Moving from Sage Pastel to cloud accounting",
    standfirst:
      "Many South African businesses have run on Pastel for years. Moving to a cloud product is a project with a start date, a checklist and a way back. This is how to do it without losing a VAT period.",
    topic: "Buying",
    author: AUTHOR,
    published_at: DATE,
    product_slugs: ["sage-50cloud-pastel", "sage-accounting", "xero", "quickbooks-online", "zoho-books"],
    published: true,
    body: [
      {
        type: "p",
        text: "Pastel is the accounting package that many South African bookkeepers learned on. Its newer form, Sage 50cloud Pastel, is described by Sage as desktop accounting with cloud access. A business that moves to a fully cloud product such as Sage Accounting, Xero, QuickBooks Online or Zoho Books gets access from anywhere, a monthly price in place of a licence and an accountant who can log in. It also takes on a project.",
      },
      { type: "h2", text: "First decide if you should move" },
      {
        type: "ul",
        items: [
          "Do you or your accountant need access from more than one place?",
          "Do you want bank feeds, so that reconciliation stops being typing?",
          "Do you need more users than your Pastel licence allows?",
          "Can your connection and your power cope with a cloud product? Read [load shedding and business software](/briefings/load-shedding-and-business-software).",
          "Is Pastel doing the job? A product that works and that your bookkeeper knows well is not a problem to solve.",
        ],
      },
      { type: "h2", text: "Pick the date of the changeover" },
      {
        type: "p",
        text: "Move at the start of a financial period, ideally the first day of a VAT period, so that each return comes entirely from one system. The first day of the month is easiest, and the start of your financial year is cleanest if you can wait for it. Avoid moving in the last month before a VAT return or a year end.",
      },
      { type: "h2", text: "The steps" },
      {
        type: "ol",
        items: [
          "Close the last period in Pastel completely: post everything, reconcile the bank, and run and submit the VAT201 for that period.",
          "Print or save a trial balance as at the changeover date. It is the number that the new system's opening balances must match.",
          "Export your customers and suppliers with their balances, aged by invoice if you can. Check the totals against the ledger controls.",
          "Export stock on hand and values, and your fixed asset register, if you hold them in the system.",
          "Set up the new product: your company details, VAT number, VAT basis and period, financial year end and chart of accounts. Map each Pastel account to a new one.",
          "Enter the opening balances and check that the trial balance agrees with the one you saved.",
          "Connect your bank, import transactions from the changeover date and reconcile. See [bank feeds, bank by bank](/briefings/bank-feeds-by-bank).",
          "Run the old and the new system side by side for one month, and compare the VAT and the bank balance at month end.",
          "Raise your first invoices and check that they meet the law. See [what a valid tax invoice needs](/briefings/a-valid-tax-invoice-in-south-africa).",
        ],
      },
      { type: "h2", text: "Keep the old data" },
      {
        type: "p",
        text: "SARS expects you to keep your financial records for five years. That includes the years that sit in Pastel. Take a full backup of the company data, save the main reports as PDFs and keep both somewhere safe and off the old computer. Do not uninstall Pastel or throw away the machine until your accountant agrees that you no longer need to open the data.",
      },
      { type: "h2", text: "What changes day to day" },
      {
        type: "ul",
        items: [
          "You pay a monthly or yearly price instead of a licence. Price it on the same footing as your old costs, with VAT shown, using [including and excluding VAT](/briefings/including-and-excluding-vat).",
          "Updates arrive without you installing them, and so do changes to the screens.",
          "More than one person can work in the books at the same time, so permissions matter.",
          "You depend on a connection. Plan for the days it fails.",
        ],
      },
      { type: "h2", text: "Ask each vendor what it can import" },
      {
        type: "p",
        text: "Every product has its own import tools and its own limits. Ask each one in writing what it can bring across from Pastel, which parts you have to enter by hand and whether it offers help for the changeover. Then test the import with a copy of your data in the trial, not on the day you switch. See [how to test software in a free trial](/briefings/how-to-test-software-in-a-free-trial) and [choosing accounting software in South Africa](/briefings/choosing-accounting-software-in-south-africa).",
      },
      {
        type: "note",
        text: "If your payroll also runs on Pastel, treat it as a separate project with its own date, since payroll should change at the start of a tax month and be tested against a real payroll. See [a payroll software checklist](/briefings/payroll-software-checklist-for-south-african-employers).",
      },
    ],
  },

  /* ------------------------------------------------------------------------ */
  {
    slug: "load-shedding-and-business-software",
    title: "Load shedding and business software",
    standfirst:
      "A product is only as available as the power and the connection under it. What stops working when the lights go out, what keeps working, and how to choose and set up your software so a power cut does not cost you a deadline.",
    topic: "Buying",
    author: AUTHOR,
    published_at: DATE,
    product_slugs: ["sage-50cloud-pastel", "sage-accounting", "xero", "simplepay"],
    published: true,
    body: [
      {
        type: "p",
        text: "Software reviews written overseas never ask what happens when the power goes off. In South Africa it is a buying criterion. A cloud product that never goes down is no use if your router is dark, and a desktop product that runs without a connection is no use if your computer has no power. Both can be made to work, and the right choice depends on how you work.",
      },
      { type: "h2", text: "What stops, and when" },
      {
        type: "table",
        head: ["Setup", "What a power cut stops", "What still works"],
        rows: [
          ["Cloud product, office computer and router on mains", "Everything, until the power returns", "Nothing in the office. Your data is safe off site."],
          ["Cloud product, router and computer on a UPS or battery", "Nothing, for as long as the battery lasts", "The product, as long as the internet service is up"],
          ["Cloud product, a laptop and a phone on mobile data", "Nothing", "The product, over mobile data"],
          ["Desktop product on a computer on mains", "Everything, and an unclean shutdown can damage the database", "Nothing until power returns"],
          ["Desktop product on a laptop", "Nothing, for the battery's life", "The product, with no connection needed"],
        ],
      },
      {
        type: "p",
        text: "The row that surprises people is the third. A cloud product on a laptop and a phone hotspot keeps working through a power cut. It also does not care if the office power is out, because your data is not in the office.",
      },
      { type: "h2", text: "Cloud or desktop, honestly" },
      {
        type: "ul",
        items: [
          "A cloud product needs a connection, and it needs it at the moment you save. Ask what happens to something you were typing when the connection drops.",
          "A desktop product keeps your data on one computer. A power cut, a failed disk or a theft takes it with it, unless you back up.",
          "A product that does both, such as a desktop ledger with cloud features, gives you a choice but also two things to look after.",
          "Neither is simply safer. What matters is that you know which failure you have prepared for.",
        ],
      },
      { type: "h2", text: "Set up for the outage" },
      {
        type: "ol",
        items: [
          "Put your router, and the fibre or wireless unit, on a small battery or UPS. It costs little and covers most outages.",
          "Use a laptop for accounting and payroll, so that the computer carries its own battery.",
          "Keep a phone with a data plan ready to share as a hotspot, and test that it works with your software.",
          "Turn on automatic saving or drafts, where the product offers them, and ask the vendor how it protects work in progress.",
          "If you use a desktop product, back up every day to a place that is not the same computer, and test a restore.",
          "Check whether the product has a phone app, and what the app can do when the connection is poor.",
        ],
      },
      { type: "h2", text: "Plan around the deadlines" },
      {
        type: "p",
        text: "The EMP201 is due by the 7th of every month, and the VAT return has its own date. SARS eFiling is a website, so you need a working connection to submit. Do not leave a return to the last hour. File a day or two early, especially in months when the schedule is bad. The [compliance calendar](/briefings/the-south-african-small-business-compliance-calendar) shows the dates that matter.",
      },
      { type: "h2", text: "Questions to ask a vendor" },
      {
        type: "ul",
        items: [
          "Is there a phone app, and which tasks does it support on a weak connection?",
          "What happens to an invoice or a payroll run I was part way through when the connection drops?",
          "How often is my data backed up, and where?",
          "Can I export a full copy of my data whenever I like?",
          "Does your support run during South African business hours, and how do I reach it when my own connection is down?",
        ],
      },
      {
        type: "note",
        text: "Whatever you choose, test it the way you will use it: with the router off and a phone hotspot on. [How to test software in a free trial](/briefings/how-to-test-software-in-a-free-trial) has the other tests worth running.",
      },
    ],
  },
];
