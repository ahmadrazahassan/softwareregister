import type { ProductProfile } from "../../types";

/**
 * Payroll and HR products other than the Sage ones, from each vendor's own pages
 * (read 5 and 11 October 2026). Foreign prices are written as rand marked "about"
 * at the 2 October 2026 reference rate. Copy contains no hyphens and no dashes.
 */

const DATE = "2026-10-11";

export const PEOPLE_PROFILES: ProductProfile[] = [
  {
    slug: "simplepay",
    headline: "Cloud payroll that a person without an accounting background can run, quoted by headcount.",
    summary:
      "SimplePay is South African cloud payroll with one plan and every feature switched on. You enter your company details and the site quotes you instantly, by number of employees, excluding VAT. At ten employees the quote is R235.50 a month, which is R23.55 each. A 30 day free trial includes full support, and PAYE, UIF and SDL are calculated for you.",
    bestFor: [
      "Small and mid sized employers that want payroll without hiring a specialist",
      "Businesses that keep their books in Xero or QuickBooks and want payroll to connect",
      "Accounting firms that want to point clients to a product they can run themselves",
    ],
    thinkTwice: [
      "You have more than 500 employees, because SimplePay quotes large employers individually",
      "You run payroll for clients as a bureau, which also needs an individual arrangement",
      "You have several companies, because each is billed and quoted separately",
    ],
    pros: [
      "One plan with every feature, and an instant online quote from your headcount",
      "A 30 day trial with full access and support",
      "PAYE, UIF and SDL calculated, with IRP5 and IT3(a) certificates for SARS e@syFile",
      "Connects to Xero and QuickBooks",
      "Employee self service with iOS and Android apps, and free online training",
    ],
    cons: [
      "The rate changes with headcount, so you must run the quote for your own size",
      "Prices exclude VAT",
      "Employers above 500 employees and bureaus are quoted individually",
      "Several companies are billed and quoted separately",
    ],
    stats: [
      { label: "Ten employees", value: "R235.50", note: "A month, excluding VAT" },
      { label: "Per employee at ten", value: "R23.55", note: "The rate falls or rises with headcount" },
      { label: "Plans", value: "1", note: "Every feature is in it" },
      { label: "Free trial", value: "30 days", note: "Full access and support" },
      { label: "Connects to", value: "Xero, QuickBooks", note: "Accounting packages" },
    ],
    rateByHeadcount: true,
    vat: "excl",
    faqs: [
      { q: "How much does SimplePay cost?", a: "SimplePay quotes by headcount. For ten employees the quote on its site is R235.50 a month, or R23.55 each, excluding VAT. Run the quote for your own number of employees, because the rate changes with it." },
      { q: "Does the SimplePay price include VAT?", a: "No. SimplePay's prices exclude VAT, so a VAT registered business claims it back and a business that is not registered adds 15 percent." },
    ],
    verdict:
      "A strong first look for a small employer that wants payroll it can run alone. Run the quote for your headcount, use the 30 day trial, and ask about the arrangement if you have several companies.",
    sources: [{ label: "SimplePay pricing", url: "https://www.simplepay.co.za/pricing" }],
    researchedAt: DATE,
  },

  {
    slug: "payspace",
    headline: "Payroll and HR that scales from fifty employees to multinational, quoted per employee.",
    summary:
      "PaySpace is a South African payroll and HR platform in three tiers: Lite for up to 50 employees, Premier for growing businesses and Master for large or multinational organisations. It says it serves more than 20,000 customers and has payroll configured for 49 countries. It gives its rate in a demonstration, charged per employee per month with no annual licence.",
    bestFor: [
      "Growing employers that expect to need analytics and more advanced payroll later",
      "Companies with staff in several African countries",
      "Businesses that want the option of managed, outsourced payroll",
    ],
    thinkTwice: [
      "You are a very small employer that wants to see a rate and sign up in minutes",
      "You need a published price to compare, because PaySpace gives its rate in a demonstration",
      "You only need basic payslips, where a simpler product may do",
    ],
    pros: [
      "Three tiers that scale from up to 50 employees to multinational payroll",
      "Payroll configured for 49 countries",
      "Employee self service through WhatsApp, and an AI assistant for payroll questions",
      "General ledger connections with Xero, QuickBooks and Acumatica",
      "Self serve or managed payroll",
    ],
    cons: [
      "No published rate: you book a demonstration to get one",
      "Probably more platform than a ten person business needs",
      "The page read does not list SARS returns by name, so ask for EMP201, EMP501 and IRP5 in a demonstration",
    ],
    stats: [
      { label: "Price", value: "On request", note: "Per employee a month, no annual licence" },
      { label: "Tiers", value: "3", note: "Lite, Premier and Master" },
      { label: "Lite limit", value: "50 employees", note: "Premier and Master go beyond" },
      { label: "Countries", value: "49", note: "Payroll configured" },
      { label: "Customers", value: "20,000 plus", note: "PaySpace's own count" },
    ],
    faqs: [{ q: "How much does PaySpace cost?", a: "PaySpace gives its rate in a demonstration. Ask for the per employee price by tier, what is charged once only and the VAT basis, in writing." }],
    verdict:
      "A good fit for an employer that expects to grow past a basic payroll. Book the demonstration, ask for the rate by tier, and check the SARS returns you need are in the tier you are quoted.",
    sources: [{ label: "PaySpace", url: "https://www.payspace.com/" }],
    researchedAt: DATE,
  },

  {
    slug: "paysoft",
    headline: "A payments company first: salaries, collections and account verification, quoted on request.",
    summary:
      "PaySoft's own site presents a payments business rather than a payroll calculator. It offers salary, supplier and SARS payments, debit order collections including DebiCheck, account verification, a direct Xero integration and a service for non profits and schools. It publishes no price and asks you to request a quote or book a demonstration.",
    bestFor: [
      "Employers that already calculate payroll elsewhere and need reliable salary payment files",
      "Businesses that collect recurring payments by DebiCheck or debit order",
      "Non profits and schools that need debit order processing and Section 18A certificates",
    ],
    thinkTwice: [
      "You need a tool that calculates PAYE, UIF and payslips, which the site does not describe",
      "You want a price before you talk to a salesperson",
    ],
    pros: [
      "Salary, supplier and SARS payments, with same day or next day settlement",
      "DebiCheck, EFT debit orders and registered mandates",
      "Account, check digit and ID verification",
      "Direct Xero integration with automatic reconciliation",
      "Section 18A certificates for non profits and schools",
    ],
    cons: [
      "The site does not describe PAYE, UIF, payslips or EMP201 returns",
      "No published price: request a quote or a demonstration",
      "Not a like for like alternative to a payroll calculator such as SimplePay or Sage Payroll",
    ],
    stats: [
      { label: "Price", value: "On request", note: "A quote or a demonstration" },
      { label: "Core offer", value: "Payments", note: "Salaries, collections, verification" },
      { label: "Settlement", value: "Same or next day", note: "PaySoft's own wording" },
      { label: "Connects to", value: "Xero", note: "With automatic reconciliation" },
    ],
    faqs: [{ q: "Is PaySoft a payroll system?", a: "PaySoft's site describes payments: salary, supplier and SARS payments, collections and verification. It does not describe a payslip or tax calculator, so pair it with payroll software if you need one." }],
    verdict:
      "Read PaySoft as the payment side of payroll. If you need payslips and returns calculated, put a payroll product beside it, and ask PaySoft for a written quote for the payment service you need.",
    sources: [{ label: "PaySoft", url: "https://www.paysoft.co.za/" }],
    researchedAt: DATE,
  },

  {
    slug: "peoplehr",
    headline: "A UK built HR product with clear per employee tiers, shown here in rand.",
    summary:
      "PeopleHR lists four HR tiers per employee a month: Starter at about R66, Core at about R121, Pro at about R177 and Elite+ at about R210, converted from pounds, with a 14 day free trial and no card. Its payroll plans are written around the British tax authority, and its pricing page does not mention South Africa.",
    bestFor: [
      "Businesses with UK operations or UK employees",
      "South African firms that want HR records, absence and onboarding only, and run payroll separately",
    ],
    thinkTwice: [
      "You need South African payroll, because the payroll plans are written for the UK",
      "You need local leave rules built in, because the pricing page does not name them",
      "You want local phone support in your own time zone",
    ],
    pros: [
      "Four clear per employee tiers",
      "A 14 day trial with no credit card",
      "Employee records, absence tracking, onboarding and a mobile app",
      "Performance management and timesheets on Pro, workflows and analytics on Elite+",
    ],
    cons: [
      "The pricing page names no South African features, such as leave rules or statutory reporting",
      "Payroll plans are written around UK tax rules",
      "Benefits and premium analytics add ons cost about R33 per employee a month each",
    ],
    stats: [
      { label: "Starter", value: "About R66", note: "Per employee a month" },
      { label: "Core", value: "About R121", note: "Per employee a month" },
      { label: "Pro", value: "About R177", note: "Per employee a month" },
      { label: "Elite+", value: "About R210", note: "Per employee a month" },
      { label: "Ten employees on Core", value: "About R1 215", note: "A month" },
      { label: "Free trial", value: "14 days", note: "No credit card" },
    ],
    addOns: [
      { name: "Employee benefits", monthly: 1.5, currency: "GBP", kind: "seat", note: "Per employee" },
      { name: "Premium analytics", monthly: 1.5, currency: "GBP", kind: "seat", note: "Per employee" },
    ],
    faqs: [{ q: "Does PeopleHR have South African payroll?", a: "PeopleHR's payroll plans are written around the British tax authority, and its pricing page does not mention South Africa. Use it for HR records, absence and onboarding, and run payroll in a South African product." }],
    verdict:
      "Good value for HR records and absence if you are happy to run payroll elsewhere. Take the 14 day trial and check that leave and reporting match what you need.",
    sources: [{ label: "PeopleHR pricing", url: "https://www.peoplehr.com/en-gb/pricing" }],
    researchedAt: DATE,
  },

  {
    slug: "bamboohr",
    headline: "A polished HR platform for people records, hiring and performance, with payroll for US employees only.",
    summary:
      "BambooHR has three tiers: Core at about R167, Pro at about R284 and Elite at about R418 per employee a month for companies of more than 25 employees. Companies of 25 or fewer pay a flat monthly rate instead, about R4 180, R7 110 or R10 870. Its payroll and benefits add ons are for US employees.",
    bestFor: [
      "Companies of more than 25 employees that want a polished HR platform",
      "Teams that value performance reviews, onboarding and employee surveys in a friendly interface",
    ],
    thinkTwice: [
      "You need payroll for South African employees, because BambooHR's payroll add on is for US employees",
      "You are a small team, because 25 or fewer employees pay a flat rate of about R4 180 a month or more",
      "You need South African leave rules and statutory reporting, which the page does not describe",
    ],
    pros: [
      "Employee records, hiring, onboarding, time off and surveys in a friendly interface",
      "Three clear tiers, with 360 reviews and one to ones on Pro",
      "Compensation planning and salary benchmarking on Elite",
      "An established platform, founded in 2008",
    ],
    cons: [
      "Payroll and benefits add ons are for US employees",
      "Companies of 25 or fewer employees pay a flat rate, which is a high start",
      "The page describes no South African leave law or statutory reporting",
    ],
    stats: [
      { label: "Core", value: "About R167", note: "Per employee a month, above 25 employees" },
      { label: "Pro", value: "About R284", note: "Per employee a month, above 25 employees" },
      { label: "Elite", value: "About R418", note: "Per employee a month, above 25 employees" },
      { label: "25 or fewer, Core", value: "About R4 180", note: "A flat monthly rate" },
      { label: "50 employees on Core", value: "About R8 370", note: "A month" },
      { label: "Founded", value: "2008", note: "BambooHR" },
    ],
    seatRules: [
      { plan: "Core", flatUpTo: 25, flatMonthly: 250, currency: "USD" },
      { plan: "Pro", flatUpTo: 25, flatMonthly: 425, currency: "USD" },
      { plan: "Elite", flatUpTo: 25, flatMonthly: 650, currency: "USD" },
    ],
    faqs: [{ q: "Does BambooHR do South African payroll?", a: "No. BambooHR's payroll and benefits add ons are for US employees. You can use it for people records, hiring, time off and performance, and run South African payroll in another product." }],
    verdict:
      "A well made HR tool for a company above 25 employees that runs payroll elsewhere. If you are smaller, price the flat rate against a per employee product first.",
    sources: [{ label: "BambooHR pricing", url: "https://www.bamboohr.com/pricing" }],
    researchedAt: DATE,
  },

  {
    slug: "personio",
    headline: "A European HR suite for growing companies, sold through a demonstration.",
    summary:
      "Personio is a German HR software company that positions itself for HR teams across Europe. It has two tiers, Core and Core Pro, and add on apps for recruiting, performance, compensation and surveys, plus a Xero connection. It says more than 16,000 companies use it, gives its price in a demonstration, and does not mention South Africa.",
    bestFor: [
      "Companies with employees in Europe that want one HR suite",
      "Teams that want recruiting, performance and payroll data connected",
    ],
    thinkTwice: [
      "Your employees are mostly in South Africa, because the product is written for European HR teams",
      "You want a quick start, because the sale is demonstration led",
      "You need South African leave and statutory reporting, which the page does not describe",
    ],
    pros: [
      "One suite across the employee lifecycle: recruiting, performance, compensation and surveys",
      "Workflow automation, documents and e signatures, and analytics",
      "A Xero connection",
      "Used by more than 16,000 companies, by its own count",
    ],
    cons: [
      "No published price: you book a demonstration",
      "The page does not mention South Africa",
      "The sale is demonstration led, so there is no quick start",
    ],
    stats: [
      { label: "Price", value: "On request", note: "Given in a demonstration" },
      { label: "Tiers", value: "2", note: "Core and Core Pro" },
      { label: "Add on apps", value: "4", note: "Recruiting, performance, compensation, surveys" },
      { label: "Customers", value: "16,000 plus", note: "Personio's own count" },
      { label: "Founded", value: "2015", note: "Personio SE" },
    ],
    faqs: [{ q: "How much does Personio cost?", a: "Personio gives its price in a demonstration. Ask for the price per employee by tier, the price of each app and the VAT basis, in writing." }],
    verdict:
      "A capable suite for a company with European staff. For a South African team, ask for a demonstration of leave, statutory reporting and your payroll connection before you go further.",
    sources: [{ label: "Personio", url: "https://www.personio.com/" }],
    researchedAt: DATE,
  },

  {
    slug: "labournet",
    headline: "A South African labour law consultancy first, with payroll and HR software behind the advice.",
    summary:
      "LabourNet describes itself as the largest labour law consulting firm in South Africa, established in 1996 and serving more than 6,500 businesses by its own count. Alongside the advice it sells payroll, health and safety, information compliance, transformation services and learning. It publishes no price, and states no upfront costs or joining fees.",
    bestFor: [
      "Employers that want labour law advice and payroll from one South African provider",
      "Businesses that value dedicated consultants and guaranteed turnaround times",
      "Firms that need employment equity, BBBEE or POPIA support",
    ],
    thinkTwice: [
      "You want to buy software online without talking to anyone",
      "You want a published price to compare against a product such as SimplePay",
      "You only need a software licence, because the model is service heavy",
    ],
    pros: [
      "Labour law consulting from a firm established in 1996",
      "Payroll alongside health and safety, POPIA and BBBEE support",
      "People Management software with SARS and UIF integration and employee self service",
      "Dedicated consultants and online training",
      "No upfront costs or joining fees, by LabourNet's own statement",
    ],
    cons: [
      "No published price",
      "A service heavy model, so it is not a software purchase you complete online",
      "It is hard to tell software cost from advisory time without a written quote",
    ],
    stats: [
      { label: "Price", value: "On request", note: "No upfront costs or joining fees" },
      { label: "Established", value: "1996", note: "LabourNet's own statement" },
      { label: "Customers", value: "6,500 plus", note: "LabourNet's own count" },
      { label: "Offer", value: "Advice and software", note: "Labour law, payroll, health and safety, learning" },
    ],
    faqs: [{ q: "Is LabourNet payroll software?", a: "LabourNet is a labour law consultancy that also sells payroll and People Management software. Ask for the software and advisory costs separately, so you can compare the software with a product that publishes its price." }],
    verdict:
      "A sensible choice if you want advice and payroll under one roof. Ask for a written quote that splits software from advice, and compare it with a payroll product that publishes its price.",
    sources: [{ label: "LabourNet", url: "https://www.labournet.com/" }],
    researchedAt: DATE,
  },
];
