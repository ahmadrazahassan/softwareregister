import type { Draft } from "./briefings-more";

/**
 * The buyer's guides for the four sectors that had none: HR, CRM, ERP and
 * project management. Accounting and payroll have theirs in briefings-more.ts.
 * Written for South African buyers and bound by the same rules: register figures
 * come from {{tokens}} and `live` blocks, statutory facts stay on the short stable
 * list, and nothing claims what a named product does that its vendor's page does
 * not say.
 *
 * Copy contains no hyphens and no dashes. Rewrite the sentence instead.
 */

const AUTHOR = "Software Register editorial";
const DATE = "2026-10-12";

export const SECTOR_GUIDES: Draft[] = [
  /* ------------------------------------------------------------------------ */
  {
    slug: "choosing-hr-software-for-a-south-african-employer",
    title: "Choosing HR software for a South African employer",
    standfirst:
      "Many HR products are built in Britain, America or Europe. What a South African employer should check: leave under the BCEA, how HR meets payroll, the personal information it holds and what it costs for each employee.",
    topic: "Buying",
    author: AUTHOR,
    published_at: DATE,
    product_slugs: ["sage-hr", "peoplehr", "bamboohr", "personio", "labournet"],
    published: true,
    body: [
      {
        type: "p",
        text: "HR software keeps the record of each person who works for you: who they are, what they were hired to do, what leave they have, what they were told and when. In South Africa that record is also your evidence. If an employee goes to the CCMA, the leave balance, the signed contract and the date of a warning are what you produce. The software you choose decides whether that record is easy to find or impossible to defend.",
      },
      { type: "h2", text: "HR and payroll are different products" },
      {
        type: "p",
        text: "HR software holds people, leave, documents and, in some products, performance reviews and hiring. Payroll software works out pay, tax and the returns that follow. Some vendors sell both, some sell one and connect to the other, and some HR products run payroll only for their home country. Decide first which you are buying. If payroll is separate, see [a payroll software checklist](/briefings/payroll-software-checklist-for-south-african-employers).",
      },
      { type: "h2", text: "1. Leave by South African rules" },
      {
        type: "p",
        text: "Leave is where a product built abroad most often fails a South African employer. The BCEA sets minimum annual, sick, family responsibility, maternity and parental leave, with their own cycles. A product that assumes a calendar year and a standard five day week will misstate the balance of a part time employee or an employee in the first six months. Ask the vendor to show you how it accrues each type, and read [BCEA leave: what HR software must accrue](/briefings/bcea-leave-what-hr-software-must-accrue) before the demonstration.",
      },
      { type: "h2", text: "2. Does it talk to payroll?" },
      {
        type: "p",
        text: "If HR and payroll are two systems, the same facts live in both: a new employee, an increase, a resignation, a week of unpaid leave. Each fact entered twice is a chance for the two to disagree, and the employee who is paid wrongly is the one who notices. Ask whether the product connects to the payroll you use, what moves across automatically and what you capture again.",
      },
      { type: "h2", text: "3. Built for which country?" },
      {
        type: "p",
        text: "Check where the vendor says its product was built to work. The [HR sector page](/sector/hr) records which products state support for UIF, BCEA leave and POPIA on their own pages, and [HR software sold in South Africa](/lists/hr-software-sold-in-south-africa) lists the ones with a South African presence. A product that does not state them may still handle them, so ask, and ask to see it work. Some products state that their payroll or benefits add ons are for employees in their home country only. That is not a flaw in the HR part of the product, but it is a reason to pair it with South African payroll.",
      },
      { type: "h2", text: "4. Personal information" },
      {
        type: "p",
        text: "HR software holds the most sensitive information in the business: ID numbers, bank details, salaries, sick notes and disciplinary records. Some of it is special personal information under POPIA. The questions in [POPIA and your software vendor](/briefings/popia-and-your-software-vendor) apply with more force here: where the data is stored, who can see it, how access is limited by role and how long it is kept after an employee leaves.",
      },
      {
        type: "ul",
        items: [
          "Can a line manager see their own team's leave without seeing anyone's salary?",
          "Can you attach a medical certificate to a day of sick leave and limit who sees it?",
          "Is there a log of who viewed or changed an employee's record?",
          "Can you delete or anonymise a former employee's record when you are allowed to?",
        ],
      },
      { type: "h2", text: "5. What it costs for each employee" },
      {
        type: "p",
        text: "HR products are usually priced per employee per month, so the bill grows with your headcount. Many sell a core plan and then add modules, such as timesheets, performance and recruitment, each with its own price. A few set a flat monthly minimum for small companies, which makes a small team cost more per head than a large one. Price the modules you will actually use, for the headcount you expect in a year, on the footing you pay. See [including and excluding VAT](/briefings/including-and-excluding-vat).",
      },
      { type: "h2", text: "6. Documents and records" },
      {
        type: "p",
        text: "The BCEA expects employers to keep records of time worked, pay and leave for three years. Check how the product stores contracts, warnings, letters and policies, whether employees can sign electronically and whether you can pull an employee's whole file in one go. If you are a designated employer under the Employment Equity Act, ask whether it can report on the information you must submit each year.",
      },
      { type: "h2", text: "From the checklist to a shortlist" },
      {
        type: "ol",
        items: [
          "List the five things the product must do for you, such as leave, onboarding documents and a link to your payroll.",
          "Open the [HR sector page](/sector/hr) and read which products state BCEA leave and UIF.",
          "Price each for your headcount and your modules, with VAT on the same footing.",
          "Put two or three through a trial with a real part time employee and a real leave request. See [how to test software in a free trial](/briefings/how-to-test-software-in-a-free-trial).",
        ],
      },
      {
        type: "note",
        text: "A register cannot tell you how a product feels to manage people in. Ask your HR manager to take part in the trial, since they will use it every day.",
      },
    ],
  },

  /* ------------------------------------------------------------------------ */
  {
    slug: "choosing-a-crm-for-a-south-african-sales-team",
    title: "Choosing a CRM for a South African sales team",
    standfirst:
      "A CRM is priced per user, usually in dollars, and it holds your customers' details. What it costs in rand when the team grows, what POPIA asks of how you use it and what to test before you move your pipeline.",
    topic: "Buying",
    author: AUTHOR,
    published_at: DATE,
    product_slugs: ["hubspot", "pipedrive", "freshsales", "zoho-crm", "salesforce-sales-cloud", "sage-crm"],
    published: true,
    body: [
      {
        type: "p",
        text: "A CRM keeps the record of every customer and every sale in progress: who you spoke to, what you promised, when you said you would call back. For a business that sells, the alternative is a spreadsheet and someone's memory. The signs that it is time are plain: deals are lost because no one followed up, two people called the same customer, or the person who knew everything left.",
      },
      { type: "h2", text: "What you are really choosing" },
      {
        type: "ul",
        items: [
          "A pipeline: the stages a deal moves through, and what you see at a glance.",
          "Contacts and companies, with every email, call and note attached.",
          "Follow ups: reminders that stop a deal going quiet.",
          "Reports on what is in the pipeline and what closed.",
          "Marketing tools, if you want them from the same product. Some products include them and some leave them out.",
        ],
      },
      {
        type: "p",
        text: "A product that does everything is not the right one if your team uses three screens of it. Choose by the work your people will do each day.",
      },
      { type: "h2", text: "Priced per user, and mostly in dollars" },
      {
        type: "p",
        text: "CRM prices are charged for each user each month, and they rise by tier: a low entry price, a middle plan with the features most teams want and a higher plan with automation and forecasting. Many vendors price in dollars, so the register converts to rand at the day's rate and prints the basis. Multiply the price by the number of people who will log in, at the tier that holds the features you need, and not the entry tier on the front page.",
      },
      {
        type: "p",
        text: "Several CRM products start free for a small number of users: see [free CRM software](/lists/free-crm-software). A free plan is a good way to learn a product, and the limit that ends it is the thing to read. See [the free tiers on the register](/briefings/free-tiers-on-the-register) and the [CRM sector page](/sector/crm).",
      },
      { type: "h2", text: "POPIA and how you market" },
      {
        type: "p",
        text: "A CRM is a database of personal information, so POPIA applies to it. The law also limits unsolicited electronic marketing: in general you need a person's consent, except where they are an existing customer and you are marketing similar products with an easy way to opt out. Check that the product records where a contact came from and whether they consented, lets people unsubscribe and lets you delete a contact when you must. Read [POPIA and your software vendor](/briefings/popia-and-your-software-vendor) for the questions to put to the vendor.",
      },
      { type: "h2", text: "How it fits with the rest of your tools" },
      {
        type: "p",
        text: "A CRM that does not talk to your email, your calendar and your accounting software gets abandoned. Each product's page on the register lists the integrations the vendor states. Check the ones you use, and ask how an accepted deal becomes an invoice in your accounting software. Many South African businesses also talk to customers on WhatsApp, so ask whether the product can record those conversations and how.",
      },
      { type: "h2", text: "Support in South African hours" },
      {
        type: "p",
        text: "Most CRM vendors are based in America or Europe. South Africa is an hour ahead of Central European time in winter and level with it in summer, and between six and ten hours ahead of the American time zones. Ask which hours support runs, whether it is by phone, email or chat and whether the vendor has a South African partner who knows local conditions.",
      },
      { type: "h2", text: "A test worth running" },
      {
        type: "ol",
        items: [
          "Import fifty real contacts from your spreadsheet, and see how many fields land where they should.",
          "Build your own deal stages, not the sample ones.",
          "Have each salesperson work their real week in it for two weeks, not just you.",
          "Connect your email and check that conversations attach to the right contact.",
          "Export everything, and see what you get. See [how to test software in a free trial](/briefings/how-to-test-software-in-a-free-trial).",
        ],
      },
      {
        type: "note",
        text: "The register does not rank CRM products. A product that suits a team of three selling services can be wrong for twenty people selling to large accounts. Price the tier you need and test with your own people.",
      },
    ],
  },

  /* ------------------------------------------------------------------------ */
  {
    slug: "choosing-an-erp-in-south-africa",
    title: "Choosing an ERP in South Africa",
    standfirst:
      "An ERP joins your accounts, stock, buying, selling and sometimes manufacturing in one system. It is priced by quote and delivered by a partner. How to know if you need one, and how to buy one without being surprised.",
    topic: "Buying",
    author: AUTHOR,
    published_at: DATE,
    product_slugs: ["syspro", "sap-business-one", "netsuite", "acumatica", "odoo", "sage-x3", "sage-200-evolution"],
    published: true,
    body: [
      {
        type: "p",
        text: "ERP stands for enterprise resource planning. It means one system holds your accounts, your stock, your purchases and sales, and in some businesses your production, so that a sale reduces stock and raises an invoice and a purchase order books a cost without anyone typing it twice. For a business with stock in several places, a factory or a team of buyers, that saves a great deal. For a service business it is usually too much.",
      },
      { type: "h2", text: "Do you need an ERP, or better accounting software?" },
      {
        type: "ul",
        items: [
          "You hold stock in more than one place, or you make things from parts.",
          "Purchasing, receiving and invoicing are done by different people who each need to see the same numbers.",
          "Your accounting software does the books, but stock and orders sit in spreadsheets that disagree with it.",
          "You need to cost jobs or projects, or to consolidate more than one company.",
        ],
      },
      {
        type: "p",
        text: "If none of that applies, accounting software with stock features will cost less and take weeks and not months to set up. See [choosing accounting software in South Africa](/briefings/choosing-accounting-software-in-south-africa).",
      },
      { type: "h2", text: "Almost all of them are priced on request" },
      {
        type: "p",
        text: "ERP vendors price by company size, modules and users, so a published price would mislead, and most of the products on the register give theirs on request: see [ERP software priced on request](/lists/erp-software-priced-on-request). That is why [how to ask for a quote](/briefings/how-to-ask-for-a-quote) matters most here. Ask for twelve months in rand with VAT on its own line, and ask each vendor and each partner to itemise licences or subscription, modules, implementation, training, support and hosting.",
      },
      { type: "h2", text: "The partner matters as much as the product" },
      {
        type: "p",
        text: "An ERP is set up around your business, and the people who do it are usually a local partner and not the vendor. They configure the system, bring your data across and train your staff, and they are who you phone when something breaks. Two partners selling the same product can quote very differently, and the quality of the work differs more than the product does. Ask two partners for the same scope, and ask each for a customer of your size and industry that you can speak to.",
      },
      { type: "h2", text: "South African rules inside the system" },
      {
        type: "ul",
        items: [
          "VAT at the standard rate, with codes for zero rated and exempt supplies, and the VAT201 figures from the ledger.",
          "Payroll or a link to it, with PAYE, UIF and SDL, if you want people costs in the same system.",
          "Bank files and reconciliation for the South African banks you use.",
          "Tax invoices that meet the VAT Act. See [what a valid tax invoice needs](/briefings/a-valid-tax-invoice-in-south-africa).",
        ],
      },
      {
        type: "p",
        text: "The register records which ERP products state VAT201 and EMP201 support on their own pages. See the [ERP sector page](/sector/erp). A product that does not state it may still handle it, so ask the partner to show it in a demonstration with your data.",
      },
      { type: "h2", text: "Cloud, on premise and the power cut" },
      {
        type: "p",
        text: "ERP products can run in the cloud, on a server in your office or in a hosted data centre. Cloud means access from anywhere and no server to look after, with a dependence on your connection. On premise means the system runs inside your building, with a server that needs power, cooling and a backup routine. In South Africa that is not an abstract choice, so read [load shedding and business software](/briefings/load-shedding-and-business-software) and ask the partner what happens to a half finished transaction when the link drops.",
      },
      { type: "h2", text: "Implementation: months, not weeks" },
      {
        type: "p",
        text: "Expect a project, with a plan, a team on your side and a date to go live. Most of the work is not installing software. It is deciding how your business should run, cleaning your data and training people. Ask what you must provide, who in your business must give time and what happens if the project overruns, and who pays. Start with one module or one site if you can, and add the rest once the first is stable.",
      },
      { type: "h2", text: "Put it in writing" },
      {
        type: "ol",
        items: [
          "The scope: modules, users, sites and companies.",
          "The price: subscription or licence, implementation hours and rate, training, support and hosting, in rand, with VAT on its own line.",
          "The plan: dates, milestones and what the partner needs from you.",
          "The exit: how you take your data out, in what format and what it costs.",
          "The data: where it is held, who can see it and how it is protected. See [POPIA and your software vendor](/briefings/popia-and-your-software-vendor).",
        ],
      },
      {
        type: "note",
        text: "A blog post sets out [seven questions to put in writing](/blog/choosing-an-erp-in-south-africa-seven-questions) before you sign. Use it beside this guide.",
      },
    ],
  },

  /* ------------------------------------------------------------------------ */
  {
    slug: "choosing-project-management-software-in-south-africa",
    title: "Choosing project management software in South Africa",
    standfirst:
      "Boards, lists, timelines or sheets: how your team works decides the product. What a seat costs in rand, what the free plans stop at, and what changes when your vendor is in another time zone.",
    topic: "Buying",
    author: AUTHOR,
    published_at: DATE,
    product_slugs: ["asana", "clickup", "monday-com", "smartsheet", "trello", "wrike"],
    published: true,
    body: [
      {
        type: "p",
        text: "Project management software shows who is doing what by when. For a small team a shared board is enough. For a business running jobs for clients it may need timelines, dependencies, forms and reports. The products on the register are built around different ideas of work, and the right one is the one your team will open every morning without being told to.",
      },
      { type: "h2", text: "Match the product to how your team works" },
      {
        type: "table",
        head: ["If your team thinks in", "Look for", "Read"],
        rows: [
          ["Cards and columns, moving from to do to done", "A board view that is quick to use", "The simplest products on the [project management sector page](/sector/project-management)"],
          ["Lists of tasks with owners and dates", "Task lists, subtasks and a calendar", "The plan above the free one, since views are often tiered"],
          ["Jobs with start and end dates that depend on each other", "A timeline or Gantt view", "Which plan holds it, and what that plan costs per seat"],
          ["Spreadsheets with rows for each job", "A sheet view with forms and reports", "How guests and contributors are counted"],
        ],
      },
      { type: "h2", text: "Free plans, and where they stop" },
      {
        type: "p",
        text: "Many project tools start free for a small team: see [free project management software](/lists/free-project-management-software). The limit is usually a number of users, boards or storage, and the features most teams want, such as timelines, dashboards and automations, sit on paid plans. Read the limit before you build on one. See [the free tiers on the register](/briefings/free-tiers-on-the-register).",
      },
      { type: "h2", text: "Priced per seat, in dollars" },
      {
        type: "p",
        text: "Project tools charge for each seat each month, and most price in dollars, so the register converts to rand at the day's rate. Check four things: whether the price shown is for yearly or monthly payment, whether it is shown for a minimum number of seats, whether the plan that holds the view you need is the one you are pricing and whether guests, such as clients, are free. Put it on the same footing as everything else, with VAT, using [including and excluding VAT](/briefings/including-and-excluding-vat).",
      },
      { type: "h2", text: "Time zones and support" },
      {
        type: "p",
        text: "South Africa is on the same time all year. Most project tool vendors are in America or Europe, so their support hours may start late in your afternoon. Ask whether support is by chat or email, whether it runs on weekends and how fast a reply to a stuck team arrives. A tool the whole team depends on needs help available when the team is working.",
      },
      { type: "h2", text: "Phones, power and the connection" },
      {
        type: "p",
        text: "Teams in the field, on a site or between power cuts depend on the phone app. Ask what it can do with a poor connection, and whether a change made offline syncs when the signal returns. Read [load shedding and business software](/briefings/load-shedding-and-business-software) for the setup that keeps a team working.",
      },
      { type: "h2", text: "Clients, guests and personal information" },
      {
        type: "p",
        text: "A project tool often ends up holding client names, contact details and attachments. That is personal information, and POPIA applies. Control who can see which project, avoid putting ID numbers and bank details into task descriptions and ask the vendor the questions in [POPIA and your software vendor](/briefings/popia-and-your-software-vendor).",
      },
      { type: "h2", text: "Run a real project through it" },
      {
        type: "ol",
        items: [
          "Pick one live project with at least five people, not a made up one.",
          "Set it up your way: your stages, your fields, your due dates.",
          "Use it for two weeks, and note what people avoid doing.",
          "Check what happens when someone leaves: who owns their tasks, and how you reassign them.",
          "Export the project at the end, and see what you get. See [how to test software in a free trial](/briefings/how-to-test-software-in-a-free-trial).",
        ],
      },
      {
        type: "note",
        text: "The register does not rank project management products. The cheapest plan is not the best one if your team needs a view it does not include, and the most powerful tool fails if no one on the team opens it.",
      },
    ],
  },
];
