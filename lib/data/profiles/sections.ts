import type { ProfileSection } from "../../types";

/**
 * The long form sections of each product's review, written from the vendor's own pages on 5 October 2026 and kept
 * where they still match the register. Paragraphs that quoted a price, a billing currency or the register's earlier
 * figures were removed: pricing is built from the live record on the page. Edit freely.
 */
export const PROFILE_SECTIONS: Record<string, ProfileSection[]> = {
  "sage-accounting": [
    {
      heading: "What it is and who it is for",
      paragraphs: [
        "Sage Accounting is the small business cloud product in Sage's South African range. Sage sells it for sole traders, freelancers and growing small businesses, and its own pricing page calls the entry plan popular with sole traders and micro businesses. Larger finance teams are pointed to Sage Intacct, Sage 200 Evolution and Sage X3 instead.",
        "The product covers the everyday work of a small business: invoices, tracking what customers owe, bank reconciliation, bookkeeping and VAT. Sage also leans on AI features, which its page describes as creating draft bills from invoices and writing personalised customer emails.",
      ],
    },
    {
      heading: "What you get",
      paragraphs: [
        "Start gives you invoicing in seconds, tracking of what you are owed, work from anywhere access, automatic bank reconciliation and the AI features. Standard includes everything in Start and adds bookkeeping, VAT return calculation, up to five users, digital receipt capture with AutoEntry and the option to collaborate with your accountant.",
      ],
      bullets: [
        "Invoicing, quotes and a debtors view of who owes you",
        "Automatic bank reconciliation on every plan",
        "VAT return calculation on the Standard plan",
        "AutoEntry for capturing receipts and supplier documents digitally",
        "Optional access for your accountant",
      ],
    },
    {
      heading: "South African fit",
      paragraphs: [
        "This is where Sage is strongest, because it is a South African product sold and supported by Sage South Africa, not an import. Its VAT page describes a monthly snapshot of what you owe, a record of previous submissions and a digital paper trail, and says the product is built to keep you compliant with SARS. Sage also built a SARS eFiling integration. Through Sage Accountants Edition, which is free to accounting practices, an accountant can prepare, submit and track a client's VAT201 return straight to SARS eFiling without leaving Sage, while the tax payment itself is still made on eFiling. If your accountant already works in Sage, your VAT201 can therefore go to SARS from the same system.",
        "Support is local, with a South African phone line, a knowledgebase and a community hub. For a business that wants to phone someone in its own time zone, that counts for a lot.",
      ],
    },
    {
      heading: "How it compares",
      paragraphs: [
        "Against Xero, Sage is cheaper at the entry level and offers phone support, while Xero advertises a larger app marketplace and round the clock support. Against Zoho Books, Sage costs more but is better known to South African accountants, and Zoho's free plan is hard to beat for a very small business. Read our full comparisons for the detail.",
      ],
    },
  ],
  "sage-50cloud-pastel": [
    {
      heading: "What it is and who it is for",
      paragraphs: [
        "Sage describes 50cloud Pastel as accounting software for small businesses with in house bookkeepers who need to simplify everyday invoicing and financial management alongside more complex accounting and payroll tasks. It combines desktop power with cloud connectivity. Sage says it has over 30 years of experience behind it and that it is used by over 2 million businesses, which is a claim about the whole Sage range rather than this product alone.",
        "In practice this is the product for a business that has outgrown a simple cloud tool, or that has always run Pastel and sees no reason to change.",
      ],
    },
    {
      heading: "What you get",
      paragraphs: [
        "The base product covers personalised invoices and quotes, cash flow, income, expenses and payments, automatic discounts on invoices, automatic bank reconciliation and stock tracking. Core adds supplier payments, recurring invoices and transactions, bespoke reports, and the ability to manage multiple companies, departments and budgets.",
      ],
      bullets: [
        "A personalised dashboard and automatically generated reports",
        "A live feed from your bank account and rules for future transactions",
        "Supplier payments, so paying creditors is simpler",
        "Stock and purchase order management, sold as an add on module",
      ],
    },
    {
      heading: "South African fit",
      paragraphs: [
        "Pastel is Sage's South African accounting brand, and Sage South Africa sells and supports the product locally. Sage describes it as built to keep you VAT compliant and offers direct bank feeds. Because the product is a desktop application with a long South African history, local accountants and bookkeepers tend to know it well, which is a practical advantage when you need help.",
        "Support is by phone on 086 123 7243 and through the same knowledgebase and community that Sage runs for its other South African products.",
      ],
    },
    {
      heading: "Where it falls short",
      paragraphs: [
        "The cost is the obvious drawback for a small business, and the module pricing makes it hard to know the final bill without a quote. Sage itself offers a request a quote route alongside buy now. A desktop product also means installation, updates and backups are your responsibility in a way a browser product does not require.",
        "If you want something you can open on any device in thirty seconds, the cloud products in this sector are a better match.",
      ],
    },
    {
      heading: "How it compares",
      paragraphs: [
        "Within Sage's own range it sits above Sage Accounting and below Sage 200 Evolution. Against Xero or Zoho Books it costs several times more, so it only makes sense when you need what it adds: multiple companies, deeper stock and reporting, and a desktop workflow your bookkeeper prefers.",
      ],
    },
  ],
  "xero": [
    {
      heading: "What it is and who it is for",
      paragraphs: [
        "Xero is a cloud accounting platform for small businesses and the accountants and bookkeepers who serve them. Its South African pages emphasise getting paid faster through online invoice payments, SARS compliant tax invoices, VAT returns prepared inside the product and automated bank feeds.",
      ],
    },
    {
      heading: "What you get",
      paragraphs: [
      ],
      bullets: [
        "Online invoice payments and automatic reminders",
        "Smart Document Capture for receipts and bills",
        "30, 60 or 180 day cashflow forecasts depending on plan",
        "A free mobile app for iOS and Android",
        "A directory for finding an accountant or bookkeeper who uses Xero",
      ],
    },
    {
      heading: "South African fit",
      paragraphs: [
        "Xero's page promises automated VAT calculations, VAT returns prepared in line with SARS requirements and reminders for VAT deadlines. It connects to FNB, Absa, Standard Bank, Nedbank and other major banks through bank feeds. Separately, press releases from Xero and Nedbank describe a fully digital, API enabled Nedbank feed, and Xero has announced a similar feed with Investec, which are direct, API based connections rather than file uploads.",
        "Xero says support is available around the clock. The page does not publish a South African phone number, so if phone support matters to you, ask before you buy.",
      ],
    },
    {
      heading: "Where it falls short",
      paragraphs: [
        "The Starter cap is the main catch, because a business that issues more than twenty invoices a month has outgrown the cheapest plan on day one. The jump from R450 to R795 for unlimited invoices and bills is the real entry price for many firms. There is also no built in payroll and no free plan.",
      ],
    },
    {
      heading: "How it compares",
      paragraphs: [
        "Against Sage Accounting, Xero costs more but has a larger marketplace. Against Zoho Books, it costs much more, and Zoho offers a free plan and local phone support. Against QuickBooks Online, the two are close in ambition, and QuickBooks advertises free phone support. Read the full comparisons for how those trade offs fall.",
      ],
    },
  ],
  "quickbooks-online": [
    {
      heading: "What it is and who it is for",
      paragraphs: [
        "QuickBooks Online is the cloud accounting product from Intuit, the company behind a long line of QuickBooks software. The South African site presents it for small businesses that want to send invoices their customers can pay online, track VAT, keep expenses sorted and stay in sync with time tracking and payroll.",
      ],
    },
    {
      heading: "What you get",
      paragraphs: [
        "Intuit highlights invoices you can create from handwritten notes, PDFs, photos and forwarded emails, online payment of invoices, VAT tracking and tax return preparation with error checking, bank feeds, expense sorting, inventory with purchase and sales orders, and a mobile app. It says QuickBooks connects with hundreds of integrations, naming PayPal, Square, ServiceM8 and Dext.",
      ],
      bullets: [
        "Invoice capture from photos, PDFs and forwarded emails",
        "VAT tracking and tax return preparation with error checking",
        "Bank feeds on every plan",
        "Inventory, purchase orders and sales orders from Plus",
        "A mobile app and hundreds of integrations",
      ],
    },
    {
      heading: "South African fit",
      paragraphs: [
        "Support is the standout. The page says phone support is free and included with a paid subscription, that live chat is available around the clock and that experts run free setup sessions. A South African support number is published on Intuit's pages. The VAT tools are described in general terms, and the page does not list which South African banks are supported, so ask which of your accounts will connect.",
      ],
    },
  ],
  "freshbooks": [
    {
      heading: "What it is and who it is for",
      paragraphs: [
        "FreshBooks began as invoicing software for freelancers and has grown into a light accounting product. It is organised around clients rather than around a general ledger, which suits a consultant or agency more than a trading business with stock and suppliers.",
      ],
    },
    {
      heading: "What you get",
      paragraphs: [
        "Lite covers unlimited invoices, expense tracking, estimates, payment acceptance and tax reports. Plus adds proposals, client retainers, accounting reports, expense receipt scanning, accountant access and double entry accounting. Premium adds project profitability, customised email templates and automatic bill receipt capture.",
      ],
    },
  ],
  "sage-intacct": [
    {
      heading: "What it is and who it is for",
      paragraphs: [
        "Sage Intacct is a cloud financial management and accounting system. Sage's South African page lists it among its products for medium businesses and describes it as AI powered, high performance finance software that delivers real time insights. It sits above Sage Accounting and Sage 50 Pastel in the range, and Sage publishes migration pages for businesses switching from Sage 50 Pastel and Sage 200 Evolution.",
      ],
    },
    {
      heading: "What you get",
      paragraphs: [
        "Sage highlights multi entity accounting that lets you manage all entities in a single system and consolidate hundreds of them in minutes with automated eliminations and adjustments. It also describes dashboards and reporting across financial and operational data, a set of AI agents and industry tailored configurations.",
      ],
      bullets: [
        "Multi entity accounting and consolidation",
        "Multi dimensional dashboards and reporting",
        "AP Automation agent for bill entry, matching and duplicate detection",
        "Financial Assurance agent that watches for outliers and reconciliation mismatches",
        "Close agent for month end and year end close",
        "Natural language questions through a financial intelligence agent",
      ],
    },
    {
      heading: "South African fit",
      paragraphs: [
        "Sage South Africa launched Intacct locally in 2020 and sells and supports it on the same phone line as its other products. Sage's Africa pages describe South African VAT and statutory reporting support, and its South African page offers switching paths from Sage 50 Pastel and Sage 200 Evolution, which are South African products. The product page itself speaks in global terms, so ask Sage for a demonstration of your own VAT and banking set up.",
      ],
    },
    {
      heading: "Where it falls short",
      paragraphs: [
        "It is too much product for a small business, it publishes no price and the claims on the page, such as closing books up to 90 percent faster, are Sage's own and are not independently tested here.",
      ],
    },
  ],
  "zoho-books": [
    {
      heading: "What it is and who it is for",
      paragraphs: [
        "Zoho Books is a full accounting package in the cloud: invoices, quotes, sales orders, bills, purchase orders, projects, banking, inventory, expenses, documents and reporting. Zoho sells it as part of a wide software suite, so a business that already uses Zoho CRM or other Zoho apps can connect them.",
      ],
    },
    {
      heading: "What you get",
      paragraphs: [
        "Even the free plan carries invoices, quotes, expenses, journals, online payments, a customer portal, bank reconciliation, recurring invoices and more than 50 reports. Paid plans stack inventory, projects, approval workflows, budgets and forecasting.",
      ],
      bullets: [
        "VAT 201 reports, VAT audit reports and VAT correction reports",
        "Bank reconciliation on every plan, with bank feeds from Standard",
        "Inventory and multi currency from Professional",
        "Mobile apps for iOS and Android and a Windows desktop app",
        "A customer portal and online payments",
      ],
    },
    {
      heading: "South African fit",
      paragraphs: [
        "Zoho says it supports VAT in line with SARS requirements and lists VAT 201 reports among its outputs. It publishes a South African support phone number and email address, which is a good sign for local help. The page does not name the South African banks its feeds support, so ask before you rely on an automated feed, and do not assume the free plan will import transactions.",
      ],
    },
    {
      heading: "How it compares",
      paragraphs: [
        "Zoho Books undercuts Xero and Sage on price at every step, and it matches them on core VAT reporting. Xero has the bigger marketplace and Sage the stronger local brand. See the full comparison with Xero.",
      ],
    },
  ],
  "wave-accounting": [
    {
      heading: "What it is and who it is for",
      paragraphs: [
        "Wave built its reputation on giving small businesses free invoicing and bookkeeping. It earns money from payments, payroll, receipt scanning and a bookkeeping service called Wave Advisors.",
      ],
    },
  ],
  "hubspot": [
    {
      heading: "What it is and who it is for",
      paragraphs: [
        "HubSpot is a customer platform that started in marketing and grew into sales, service, content and data management. The CRM is the centre, and the free tools are a deliberate way in. The pricing page positions Starter as essential marketing, sales, service, content and data management software.",
      ],
    },
    {
      heading: "What you get",
      paragraphs: [
        "The comparison charts on the page differ by email sending limits, automation workflows, reporting dashboards, user seat limits, removal of HubSpot branding and meeting scheduling. In plain terms, the free tier proves the concept, Starter removes the branding and raises limits, and Professional adds the automation and reporting that most sales teams eventually want.",
      ],
    },
  ],
  "pipedrive": [
    {
      heading: "What it is and who it is for",
      paragraphs: [
        "Pipedrive is a sales CRM for small and growing teams. The product is organised around pipelines and deals, which makes it quick to learn for a salesperson, and it deliberately leaves out much of the marketing and service breadth that HubSpot or Salesforce carry.",
      ],
    },
    {
      heading: "How it compares",
      paragraphs: [
        "Against HubSpot, Pipedrive is simpler and cheaper to start on a paid plan, and HubSpot has the free tier and the wider platform. See the full comparison.",
      ],
    },
  ],
  "freshsales": [
    {
      heading: "What it is and who it is for",
      paragraphs: [
        "Freshsales is a sales CRM for startups and small to mid sized businesses. Growth is described as built for teams that want a Kanban view, contact lifecycle stages, chat, email and phone, email templates, custom fields and basic workflows. Pro is for growing and mid sized businesses and adds contact scoring, deal insights, custom sales activities, territory management and sales sequences. Enterprise is for mid to large businesses and adds forecasting insights, field level permissions, custom modules, a sandbox and audit logs.",
      ],
    },
    {
      heading: "What you get",
      paragraphs: [
      ],
      bullets: [
        "Kanban view, lifecycle stages, chat, email and phone on Growth",
        "Contact scoring, deal insights and sales sequences on Pro",
        "Forecasting insights, custom modules, audit logs and a sandbox on Enterprise",
        "Branded documents as an add on at about R318 per user a month",
      ],
    },
    {
      heading: "Where it falls short",
      paragraphs: [
        "The price per user climbs quickly once you want forecasting, and add ons for AI sessions and documents can surprise a budget. There is no South African billing or support information on the pricing page.",
      ],
    },
  ],
  "zoho-crm": [
    {
      heading: "What it is and who it is for",
      paragraphs: [
        "Zoho CRM is a customisable CRM sold as part of the Zoho family. The pricing page explains two kinds of licence: org users, who have full access to the sales modules, and team users, who have partial access suited to marketing, support, legal and finance colleagues. Team users can add notes and view records but cannot own records, build reports or create automation, which is a useful way to keep non sales colleagues connected at a lower cost.",
      ],
    },
    {
      heading: "Where it falls short",
      paragraphs: [
        "Zoho's flexibility comes with complexity. The team user rules, modules and editions take time to understand, and a small team may find the setup heavier than Pipedrive.",
      ],
    },
  ],
  "salesforce-sales-cloud": [
    {
      heading: "What it is and who it is for",
      paragraphs: [
        "Sales Cloud is the sales product within Salesforce. The page describes the Free Suite as account, contact, lead and opportunity management with basic features, Starter Suite as adding built in sales flows, lead routing, AI email and event syncing and dynamic email marketing, and Pro Suite as adding greater customisation, sales quoting and forecasting. Core adds Premier Success, Slack Business plus and Tableau Next. Advanced adds enhanced security, more AI, expanded data capacity and backup and recovery. Max adds the full suite of AI, including Agentforce for Sales and Sales Planning.",
      ],
    },
    {
      heading: "Where it falls short",
      paragraphs: [
        "Cost and complexity are the main drawbacks. The free and Starter suites make the product accessible, and the step up to Pro Suite is a factor of four per user. Without an administrator, a smaller team may not use the power it is paying for.",
      ],
    },
    {
      heading: "How it compares",
      paragraphs: [
        "Against HubSpot, Salesforce is deeper and costlier, while HubSpot is easier to start and cheaper at the low end. See the full comparison.",
      ],
    },
  ],
  "sage-crm": [
    {
      heading: "What it is and who it is for",
      paragraphs: [
        "Sage CRM is aimed at Sage business management customers. The page says that as a Sage customer you can choose fully integrated CRM or the Sales, Marketing or Service modules to suit your needs. It talks about automating quotes and orders, forecasting sales, progressing leads and tracking orders in a Sage ERP such as Sage 300.",
      ],
    },
    {
      heading: "South African fit",
      paragraphs: [
        "Sage CRM is sold and supported by Sage South Africa, which offers a South African callback service, and it is designed to sit alongside the Sage business management products that South African firms already run, such as Sage 300.",
      ],
    },
    {
      heading: "Where it falls short",
      paragraphs: [
        "The page is general in its claims and light on product specifics such as limits, mobile apps or integrations beyond Sage and MailChimp. For a business that is not a Sage customer, the strongest argument for the product disappears.",
      ],
    },
  ],
  "sage-200-evolution": [
    {
      heading: "What it is and who it is for",
      paragraphs: [
        "Sage 200 Evolution is pitched at businesses that have grown beyond simple accounting. Sage says it brings your processes together in one place, from quotes and purchase orders to cash flow and tax calculation, and that it grows with you through a modular platform that you can adapt to current and future needs.",
      ],
    },
    {
      heading: "What you get",
      paragraphs: [
        "Sage groups the benefits under finance, customer management and reporting.",
      ],
      bullets: [
        "Automated transactions and account reconciliation, with a direct bank connection",
        "Sales, customers, pricing and discounts, inventory and billing in one system",
        "A 360 degree view of customers",
        "Integrated business intelligence, with custom dashboards, reports and alerts",
        "Automation of time consuming tasks and real time data for quotes, purchase orders and cash flow",
      ],
    },
    {
      heading: "South African fit",
      paragraphs: [
        "The page speaks of keeping up with legislation, with tax and legal admin covered, and Sage South Africa sells and supports the product locally through its Evolution business partners. Sage's community hub shows that VAT201 submission to SARS has been available since Evolution version 11, and that the set up should be done by a qualified Evolution business partner. The page lists no bank names, so ask your partner which of your banks connect.",
      ],
    },
    {
      heading: "Where it falls short",
      paragraphs: [
        "The page is marketing language and does not state user limits, deployment model or integration details. ERP projects succeed or fail on implementation, so the partner you choose matters as much as the product.",
      ],
    },
  ],
  "sage-x3": [
    {
      heading: "What it is and who it is for",
      paragraphs: [
        "The page describes Sage X3 as a modern cloud ERP powered by AI, designed to start simple and scale from single entities to global, multi entity organisations. It is aimed at businesses that make, move and sell products, and it unifies finance, supply chain and manufacturing.",
      ],
    },
    {
      heading: "What you get",
      paragraphs: [
        "Sage groups the capabilities into control, multi entity operation, configurability and AI.",
      ],
      bullets: [
        "Finance, inventory, supply chain and production in one platform",
        "Multi entity and multi country consolidation, with multiple currencies and legislations",
        "Local tax, accounting and regulatory requirements handled as standard",
        "Low code tools to configure workflows, screens and business rules, plus modern APIs",
        "Sage Copilot for conversational interaction and real time alerts, and automation of high volume work such as invoice handling",
        "Role based dashboards and a cloud first experience",
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
  ],
  "syspro": [
    {
      heading: "What it is and who it is for",
      paragraphs: [
        "SYSPRO states that it helps mid sized manufacturing and distribution companies run and grow with confidence. The site lists target industries including food and beverage, automotive, electronics, packaging, plastics and rubber, metals fabrication, chemical manufacturing and distribution, and names customers such as Toyota Racing Development and Hitachi alongside regional manufacturers.",
      ],
    },
    {
      heading: "What you get",
      paragraphs: [
        "The modules run across finance, manufacturing and supply chain.",
      ],
      bullets: [
        "Finance: accounts receivable and payable, cash book, general ledger, assets register and tax management",
        "Manufacturing: bill of materials, material requirements planning, work in progress, quality management and enterprise asset management",
        "Supply chain: sales order management, warehouse management, procurement and lot traceability",
        "SIDEKICK, an AI co pilot that guides teams in real time",
      ],
    },
    {
      heading: "South African fit",
      paragraphs: [
        "SYSPRO is South African in origin and its heritage shows in its support for local industries. The page does not list SARS or VAT features, which is typical for a global ERP site, so ask for the South African tax outputs in the demonstration.",
      ],
    },
    {
      heading: "Where it falls short",
      paragraphs: [
        "The industry focus is a strength and a limit. A business outside manufacturing and distribution will find less to like, and as with all ERP the cost of implementation is the larger part of the investment.",
      ],
    },
  ],
  "sap-business-one": [
    {
      heading: "What it is and who it is for",
      paragraphs: [
        "SAP says Business One helps you manage small businesses from accounting and financials to purchasing, inventory, sales and customer relationships, and to reporting and analytics. It also positions the product for subsidiaries of larger groups that want control over a business unit.",
      ],
    },
    {
      heading: "South African fit",
      paragraphs: [
        "SAP's Africa page repeats the global description and does not list South African tax features. Business One is typically delivered through local partners, who configure VAT, eFiling and bank integration, so judge the partner's South African references as carefully as the software.",
      ],
    },
    {
      heading: "Where it falls short",
      paragraphs: [
        "The page is brief and marketing led, offering no limits, user counts or pricing structure. The product's reputation is strong, but the experience varies with the partner.",
      ],
    },
  ],
  "netsuite": [
    {
      heading: "South African fit",
      paragraphs: [
        "We could not confirm NetSuite's South African tax handling from Oracle. Ask for the VAT return output, the eFiling process and the bank integrations in a live demonstration, and for a South African reference customer.",
      ],
    },
    {
      heading: "Where it falls short",
      paragraphs: [
        "The lack of a published price and the cost of implementation put it out of reach for small businesses. A mid market firm should compare it with Acumatica, Sage X3 and SAP Business One.",
      ],
    },
    {
      heading: "How it compares",
      paragraphs: [
        "Against Acumatica, NetSuite is the better known brand and Acumatica lists South Africa among its localisation countries. See the full comparison.",
      ],
    },
  ],
  "acumatica": [
    {
      heading: "What it is and who it is for",
      paragraphs: [
        "Acumatica says it is designed to help small and mid market businesses thrive in the digital economy. The platform bundles financial management with industry editions and adds project accounting, CRM, payroll management, inventory control, warehouse management and business intelligence reporting.",
      ],
    },
    {
      heading: "South African fit",
      paragraphs: [
        "Acumatica lists South Africa among the countries for which it offers localisation, but the page does not describe regional operations, support hours or local partners. Ask the vendor for the name of the local partner, the South African VAT outputs and a reference customer.",
      ],
    },
    {
      heading: "Where it falls short",
      paragraphs: [
        "The page is general, and a buyer must rely on a demonstration and a partner's quote to learn what the product costs and how it handles South African requirements.",
      ],
    },
    {
      heading: "How it compares",
      paragraphs: [
        "Against NetSuite, Acumatica is the challenger with explicit South African localisation on its list. See the full comparison.",
      ],
    },
  ],
  "odoo": [
    {
      heading: "What it is and who it is for",
      paragraphs: [
        "Odoo gives you a library of business apps on scalable cloud infrastructure, including hosting, incremental daily backups on two continents, email integration, security and monitoring. Its three plans are One App Free, Standard and Custom, and every plan includes support and upgrades.",
      ],
    },
    {
      heading: "What you get",
      paragraphs: [
        "Standard includes all apps on Odoo Online. Custom adds a choice of Odoo Online, Odoo.sh or on premise hosting, Odoo Studio and AI access, multi company support and an external API.",
      ],
    },
    {
      heading: "South African fit",
      paragraphs: [
        "The pricing page does not list South African tax localisation, SARS returns or local banks. Odoo's open model means local partners can build or supply South African modules, so ask them for evidence and a reference customer before relying on VAT or payroll features.",
      ],
    },
    {
      heading: "Where it falls short",
      paragraphs: [
        "The low per user price makes the total cost depend on implementation. Support hours are 24 by 5, not seven days, and the page gives no South African support details.",
      ],
    },
  ],
  "sage-hr": [
    {
      heading: "What it is and who it is for",
      paragraphs: [
        "Sage describes Sage HR as a way to manage and engage your workforce wherever they are, and its South African page frames the pricing around modules. Core Sage HR and leave management digitalise absence management and HR essentials. Everything else is optional.",
      ],
    },
    {
      heading: "What you get",
      paragraphs: [
        "Each module is described in a single line on the page, which is enough to see where the product stops and where you would need something bigger.",
      ],
      bullets: [
        "Core HR and leave management, included as standard",
        "Performance: goals, one to one meetings and 360 feedback",
        "Shift Scheduling: flexible shift planning",
        "Timesheets: a quick way for employees to track overtime",
        "Expenses: submit and manage company expenses from the mobile app",
        "Recruitment: job ads, an applicant pipeline and interview scheduling",
      ],
    },
    {
      heading: "South African fit",
      paragraphs: [
        "Sage HR is sold and supported by Sage South Africa, with its own South African pricing page. Leave rules are the heart of South African HR, and Sage's payroll pages describe leave managed under the Basic Conditions of Employment Act. The HR pricing page itself does not detail how leave is configured, so ask Sage South Africa to show you how family responsibility and maternity leave are set up in a trial.",
      ],
    },
    {
      heading: "Where it falls short",
      paragraphs: [
        "Payroll is not part of Sage HR, so you will connect it to Sage Payroll or another payroll product. The price depends on a calculator rather than a table, which makes quick comparison harder.",
      ],
    },
  ],
  "peoplehr": [
    {
      heading: "What it is and who it is for",
      paragraphs: [
        "PeopleHR sells HR software in tiers and an optional UK payroll. The cheapest HR tier covers HR essentials, digitised employee records, document management, absence tracking, a mobile app, an AI HR assistant, a dashboard and a learning library. Each tier above it adds more: onboarding, expenses and e signatures on Core, performance management and timesheets on Pro, and automated workflows and advanced analytics on Elite+.",
      ],
    },
    {
      heading: "Where it falls short",
      paragraphs: [
        "The currency, the UK payroll and the absence of South African detail are the limits. For most South African employers, a rand priced product such as Sage HR is the more natural fit.",
      ],
    },
  ],
  "bamboohr": [
    {
      heading: "What it is and who it is for",
      paragraphs: [
        "BambooHR is an HR information system built around employee records, hiring and onboarding, time off, benefits tracking and employee satisfaction surveys. The Pro tier adds performance management with 360 degree reviews and one to ones, employee community features and recognition. Elite adds compensation management with benchmarking, custom dashboards and a library of more than 300 compliance training courses.",
      ],
    },
    {
      heading: "South African fit",
      paragraphs: [
        "The page says payroll and benefits are for US employees only and does not mention South Africa. A South African business would therefore use BambooHR for HR records and performance, and keep payroll in a local product. Nothing on the page describes South African leave law or statutory reporting.",
      ],
    },
  ],
  "personio": [
    {
      heading: "What you get",
      paragraphs: [
        "Beyond the core product, Personio sells apps for each part of the employee lifecycle.",
      ],
      bullets: [
        "Recruiting, onboarding and time tracking",
        "Absence management and people analytics",
        "Workflow automation and documents with e signatures",
        "Performance and development, compensation management and surveys",
        "Payroll, with Personio Payroll and preliminary payroll connections to Xero and Sage 50",
      ],
    },
  ],
  "labournet": [
    {
      heading: "What it is and who it is for",
      paragraphs: [
        "LabourNet is closer to a services firm with software than a software company with services. Its site groups six solution areas: Labour Law, Payroll, Health and Safety, Information Compliance covering POPIA, PAIA and the Consumer Protection Act, Transformation covering employment equity, BBBEE and skills development, and Learning with online courses in computer skills, soft skills, leadership and labour compliance.",
      ],
    },
    {
      heading: "The software",
      paragraphs: [
        "The People Management software is described as handling SARS and UIF integration, EMP201 and EMP501 documentation, leave management and online employee self service portals. Payroll can be run yourself or outsourced.",
      ],
    },
    {
      heading: "Where it falls short",
      paragraphs: [
        "A consultancy model suits employers that want guidance more than self service. If you only want to run payslips cheaply, a product with a published price may be simpler.",
      ],
    },
  ],
  "simplepay": [
    {
      heading: "What it is and who it is for",
      paragraphs: [
        "SimplePay describes itself as cloud payroll software for South African employers and targets small to mid sized businesses. Its sign up page says that even a non accounts person can use the program, and it carries a section for accountants, which suggests that accounting firms are a real part of its audience.",
      ],
    },
    {
      heading: "What you get",
      paragraphs: [
        "The plan includes PAYE, UIF and SDL calculations, unlimited custom income and deduction items, leave management with custom policies, an employee self service portal, mobile apps, two factor authentication and role based access. Payslips can be issued through the portal and payment files can be generated for your bank.",
      ],
      bullets: [
        "PAYE, UIF and SDL calculated for you",
        "Tax certificates exported for upload to SARS eFiling or e@syFile",
        "EMP201 data and monthly UIF reporting, with pre filing validations for the bi annual reconciliations",
        "Leave requests and approvals through self service, with sick and family responsibility leave built in",
        "Bank payment files and an API for automation",
        "Integrations with Xero and QuickBooks",
      ],
    },
    {
      heading: "South African fit",
      paragraphs: [
        "Compliance is the point of the product. SimplePay says it keeps employers compliant with SARS and the Department of Labour. It is listed on the Xero marketplace as a local payroll app, and Xero names SimplePay among the local apps that connect to it. The features page does not mention COIDA, time and attendance or a Sage integration, so confirm those if you need them.",
      ],
    },
    {
      heading: "Where it falls short",
      paragraphs: [
        "The lack of a published per employee rate means you cannot compare it with PaySpace or Sage Payroll without running the quote yourself. Larger employers and bureaus cannot use the standard plan. The page does not describe time and attendance, so a business with shift work will need a separate tool.",
      ],
    },
    {
      heading: "How it compares",
      paragraphs: [
        "Against PaySpace, SimplePay is simpler and aimed at smaller employers, while PaySpace offers tiers up to multinational payroll. Against Sage Payroll, SimplePay is quote driven while Sage publishes an annual price, and Sage connects natively to Sage Accounting. See the full comparisons.",
      ],
    },
  ],
  "payspace": [
    {
      heading: "What it is and who it is for",
      paragraphs: [
        "PaySpace offers payroll, HR, an AI assistant that answers employee and administrator questions, and employee self service delivered through WhatsApp. It runs a self serve model and a managed model, and it provides sandbox environments for testing. Its three tiers make it one of the few products in this sector that scales from a small business to a multinational.",
      ],
    },
    {
      heading: "What you get",
      paragraphs: [
        "PaySpace says it automates tax updates and statutory reporting, and offers more than 95 country specific reports, pre populated to meet local revenue authority standards. HR features cover employee records, leave management, electronic onboarding and performance tracking.",
      ],
      bullets: [
        "Payroll with automated tax updates and statutory reporting",
        "HR: records, leave, onboarding and performance",
        "AI Assist for payroll questions",
        "WhatsApp self service for payslips, tax documents, leave and expense claims",
        "General ledger integrations with Xero, QuickBooks and Acumatica",
        "Workday, Power BI and Power Automate connectors on advanced tiers",
      ],
    },
    {
      heading: "South African fit",
      paragraphs: [
        "PaySpace is South African in origin and handles employees' tax and social security contributions across its markets. The homepage does not spell out SARS returns, UIF, Employment Equity or COIDA by name, so ask for a written list of South African statutory outputs. Search results also describe a Deel Local Payroll offering powered by PaySpace.",
      ],
    },
    {
      heading: "Where it falls short",
      paragraphs: [
        "The missing public rate is the obvious gap, and so is the absence of named South African statutory detail on the homepage. For a ten person business, the breadth of the platform may be more than is needed.",
      ],
    },
    {
      heading: "How it compares",
      paragraphs: [
        "Against SimplePay, PaySpace is broader and more international, and SimplePay is simpler to try. Read the full comparison for the trade offs.",
      ],
    },
  ],
  "sage-payroll": [
    {
      heading: "What it is and who it is for",
      paragraphs: [
        "Sage Payroll is described as intuitive online payroll for start ups and small business, with automatic updates. It is sold in bands by number of employees, from 1 to 2 employees up to more than 200, and Sage says every package carries every feature.",
      ],
    },
    {
      heading: "What you get",
      paragraphs: [
        "The product covers onboarding with bulk employee import, once off and fixed payments and deductions with PAYE, UIF and SDL calculated for you, payslips by print or email, ACB payment files that your banking software can import, leave management under the Basic Conditions of Employment Act, and the statutory returns.",
      ],
      bullets: [
        "Monthly, fortnightly and weekly pay cycles",
        "EMP201 monthly declarations and EMP501 reconciliations",
        "IRP5 tax certificates and the UIF declaration to the Department of Labour",
        "Bonuses, travel allowances, commissions, overtime, medical aid and retirement funds",
        "Independent contractors and labour brokers",
        "Integration with Sage Accounting",
      ],
    },
    {
      heading: "South African fit",
      paragraphs: [
        "The feature list reads like a South African compliance checklist, and it is: this is a product Sage South Africa builds, sells and supports for South African employers. Support comes through online chat, a help centre, how to videos and the Sage Community Hub. Sage has an ISO 27001 certification, which it cites for information security.",
      ],
    },
    {
      heading: "Where it falls short",
      paragraphs: [
        "It is a payroll product, not a full HR system, so recruitment and performance sit elsewhere. The price you pay depends on a band table that is only partly visible, so ask for your exact band price in writing.",
      ],
    },
    {
      heading: "How it compares",
      paragraphs: [
        "Against SimplePay, Sage Payroll publishes an annual entry price and connects to Sage Accounting, while SimplePay is quote driven and connects to Xero and QuickBooks. See the full comparison.",
      ],
    },
  ],
  "sage-pastel-payroll": [
    {
      heading: "The cloud successors",
      paragraphs: [
        "Sage Business Cloud Payroll Professional is a true cloud payroll with automatic updates, Employment Equity guidance, leave management, personnel management and employee and manager self service, and Sage says it is available across Southern Africa and the wider continent. Sage Payroll Advanced adds built in HR, and Sage 300 People targets South African businesses with 100 or more employees. Sage publishes a migration path for existing customers. For SARS, Sage's South African community hub documents how Payroll Professional produces the live run IRP5 file and how that file is imported into SARS e@syFile, where the EMP501 declaration, including the EMP201 values for PAYE, SDL, UIF and ETI, is completed and submitted.",
      ],
    },
    {
      heading: "Where it falls short",
      paragraphs: [
        "As a desktop product it needs installation, updates and backups to be managed, and it cannot match a cloud product's remote access. The cost cannot be compared without a quote.",
      ],
    },
  ],
  "paysoft": [
    {
      heading: "What it is and who it is for",
      paragraphs: [
        "The site says it serves businesses of all sizes, from those processing millions of transactions to those making a few payments a month, and names more than twenty clients, including Access Bank, Pick n Pay, Heineken and Media24.",
      ],
    },
    {
      heading: "South African fit",
      paragraphs: [
        "The compliance features described are payment specific: SARS payments, authenticated and bank verified collections, and Section 18A certificates for approved organisations. The site is bank agnostic and works with major financial institutions. Support is local, by phone and email.",
      ],
    },
    {
      heading: "Where it falls short",
      paragraphs: [
        "If you were looking for payslips and EMP201 returns, the site does not describe them. Treat PaySoft as a payments partner that pairs with a payroll engine, and confirm with the vendor whether it also offers payroll calculation.",
      ],
    },
  ],
  "asana": [
    {
      heading: "What it is and who it is for",
      paragraphs: [
        "Asana is a project and work management tool built around tasks, projects and views. The free plan allows unlimited tasks and projects, list, board and calendar views, file uploads up to 100 megabytes and more than 100 integrations, but only for two users.",
      ],
    },
    {
      heading: "Where it falls short",
      paragraphs: [
        "The free plan is small, the AI allowance is limited, and the features most teams grow into, such as goals and resource management, sit two tiers up. The page we read mentions no free trial.",
      ],
    },
    {
      heading: "How it compares",
      paragraphs: [
        "Against monday.com, Asana is more task centric and monday.com is more configurable. See the full comparison.",
      ],
    },
  ],
  "clickup": [
    {
      heading: "What it is and who it is for",
      paragraphs: [
        "ClickUp's free plan offers unlimited tasks, kanban boards, basic custom fields and round the clock support, but only 60 megabytes of storage, five spaces and one form. Unlimited lifts the storage, spaces and forms limits and adds unlimited integrations, native time tracking, goals, ClickUp Chat and email integration.",
      ],
    },
    {
      heading: "Where it falls short",
      paragraphs: [
        "The free plan's 60 megabyte storage ends quickly, the breadth of features can overwhelm a small team, and the AI add ons change the price picture.",
      ],
    },
    {
      heading: "How it compares",
      paragraphs: [
        "Against Trello, ClickUp is far broader and Trello is simpler. See the full comparison.",
      ],
    },
  ],
  "monday-com": [
    {
      heading: "What it is and who it is for",
      paragraphs: [
        "monday.com builds work management around boards and configurable columns. Free allows up to three boards, up to three Docs, more than 200 templates, eight column types and mobile apps. Basic adds unlimited items and unlimited free viewers. Standard adds three workflows, 250 automations a month, Timeline and Gantt views, calendar view, guest access and 1,000 API calls a day. Pro adds 20 workflows, 25,000 automations a month, private boards, advanced columns and 10,000 API calls a day.",
      ],
    },
    {
      heading: "South African fit",
      paragraphs: [
        "The page makes no South African claims. Support round the clock is listed only on Enterprise, so confirm support hours for the plan you buy.",
      ],
    },
    {
      heading: "How it compares",
      paragraphs: [
        "Against Asana, monday.com is more configurable and visual. See the full comparison.",
      ],
    },
  ],
  "smartsheet": [
    {
      heading: "What it is and who it is for",
      paragraphs: [
        "Smartsheet is built around members who create and manage work, and contributors who update it. Pro covers one to ten members with unlimited sheets, forms and reports and 250 automations a month, and includes Gantt, table, board and calendar views. Business is for three or more members and adds timeline view, workload tracking, admin capabilities, unlimited automations and 1 terabyte of attachment storage. Enterprise adds scenario planning, portfolios, SAML based single sign on and directory integrations for ten or more members. Advanced Work Management adds Control Center, Dynamic View, Data Shuttle and premium support.",
      ],
    },
    {
      heading: "South African fit",
      paragraphs: [
        "The page makes no South African claims beyond regional pricing. Support options by plan should be confirmed with the vendor.",
      ],
    },
    {
      heading: "Where it falls short",
      paragraphs: [
        "Member minimums, a paid only model and a price that varies by page make it harder to compare than its rivals.",
      ],
    },
    {
      heading: "How it compares",
      paragraphs: [
        "Against Wrike, Smartsheet is more spreadsheet like and Wrike is more task and request oriented. See the full comparison.",
      ],
    },
  ],
  "trello": [
    {
      heading: "What it is and who it is for",
      paragraphs: [
        "Trello organises work as cards on boards. The free plan allows up to ten boards per workspace and ten collaborators, with 10 megabytes of file storage and 250 workspace command runs a month. Standard adds unlimited boards, card mirroring, more automation with 1,000 command runs a month, 250 megabytes of file storage and AI capture. Premium adds five views, which are Calendar, Timeline, Table, Dashboard and Map, unlimited command runs, workspace level templates and admin controls. Enterprise adds unlimited workspaces, organisation wide permissions and single sign on with Atlassian Guard, plus round the clock support.",
      ],
    },
    {
      heading: "South African fit",
      paragraphs: [
        "The page mentions no South African support or billing details. Round the clock support is listed only for Enterprise.",
      ],
    },
    {
      heading: "Where it falls short",
      paragraphs: [
        "It is a lightweight tool by design, so complex projects with dependencies and resource plans will outgrow it. Views and unlimited automation sit on Premium.",
      ],
    },
    {
      heading: "How it compares",
      paragraphs: [
        "Against ClickUp, Trello is far simpler and cheaper per user at the entry level. See the full comparison.",
      ],
    },
  ],
  "wrike": [
    {
      heading: "Where it falls short",
      paragraphs: [
        "The user ranges on Team and Business, and the contact us pricing for the higher tiers, make budgeting harder for growing teams.",
      ],
    },
    {
      heading: "How it compares",
      paragraphs: [
        "Against Smartsheet, Wrike is more request and task oriented. See the full comparison.",
      ],
    },
  ],
};
