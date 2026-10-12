import type { EditorialComparison } from "../../types";

const DATE = "2026-10-11";
const EARLIER = "2026-10-05";

/**
 * ERP and project management comparisons. Every figure is from the vendors' own pages, read on the date each
 * comparison carries. A price a vendor lists in dollars is shown in rand at the reference rate of 2 October 2026
 * and is marked "about", because the rate moves daily.
 */
export const OPERATIONS_COMPARISONS: EditorialComparison[] = [
  {
    slug: "syspro-vs-sap-business-one",
    headline: "SYSPRO is built for manufacturers and distributors. SAP Business One is a broader small business ERP sold through partners.",
    summary:
      "Neither vendor lists a price, and both want a conversation. SYSPRO is a South African ERP company, founded in Johannesburg in 1978 according to industry profiles, focused on manufacturing and distribution, delivered in the cloud and on premise, and moving to a named user subscription model. SAP Business One is the smaller ERP from SAP, covering financials, purchasing, inventory, sales and customer relationships for small and midsize businesses, with SAP HANA integration and delivery through partners. Industry fit usually decides it.",
    chooseA: [
      "You make or distribute products and want an ERP built for that work",
      "You want a South African origin product with a long track record",
      "You want cloud or on premise, and are ready for a named user subscription",
    ],
    chooseB: [
      "You want a recognised ERP brand for a small business or a subsidiary",
      "Your needs are broader than manufacturing, such as sales, purchasing and financials in one",
      "You have a local SAP partner you trust",
    ],
    glance: [
      { label: "Pricing", a: "On request, through a quote or demo", b: "On request, through a quote from a local partner" },
      { label: "Focus", a: "Manufacturing and distribution", b: "Small and midsize businesses across industries" },
      { label: "Deployment", a: "Cloud and on premise, cloud first", b: "Quick deployment claimed, integration with SAP HANA" },
      { label: "Pricing model", a: "Moving to a named user subscription from licence plus annual fees", b: "Licences and partner services, per the quote process" },
      { label: "AI", a: "SIDEKICK AI co pilot", b: "Integrated business intelligence" },
      { label: "Origin", a: "Johannesburg, founded 1978", b: "SAP SE, founded 1972" },
      { label: "Sold through", a: "Direct and partners", b: "Local partners" },
    ],
    sections: [
      {
        heading: "Pricing compared",
        paragraphs: [
          "Neither vendor lists a price, so the comparison is about shape and process. SYSPRO has announced that it is discontinuing the Initial Licence Fee and Annual Licence Fee model in favour of a named user, subscription based platform model, which makes quotes comparable to other subscription ERPs. SAP Business One offers a Request a quote button and is typically delivered through partners, so the cost is licences plus a partner's implementation and support. Ask both for a written all in quote covering licences, implementation, training and the first two years of support.",
        ],
      },
      {
        heading: "Features compared",
        paragraphs: [
          "SYSPRO's modules run across finance, manufacturing, supply chain and quality: bill of materials, material requirements planning, work in progress, enterprise asset management, sales order management, warehouse management, procurement and lot traceability. SAP Business One covers accounting and financials, purchasing, inventory, sales and customer relationships, reporting and analytics, with integrated business intelligence. For a factory with complex production, SYSPRO's depth is the draw. For a trading or services business, Business One's breadth may be enough.",
        ],
      },
      {
        heading: "South African fit",
        paragraphs: [
          "SYSPRO is South African in origin and names regional manufacturers among its customers. SAP sells Business One to South African businesses through local partners, who set up VAT, eFiling and bank integration. For both, ask for a live demonstration of VAT, eFiling and bank integration, and speak to a South African reference customer in your industry.",
        ],
      },
      {
        heading: "Support and getting started",
        paragraphs: ["Both are implementation projects. The partner or implementer you choose will shape your results as much as the software. Insist on references and a fixed scope."],
      },
      {
        heading: "Where each falls short",
        paragraphs: ["SYSPRO is narrower by design and its pricing model is changing. SAP Business One's page is brief and the experience depends on the partner."],
      },
    ],
    verdict:
      "If you manufacture or distribute, shortlist SYSPRO first. If your business is broader or part of a larger group, look hard at SAP Business One and its partners. Ask both for the same written, all in quote.",
    researchedAt: EARLIER,
  },

  {
    slug: "netsuite-vs-acumatica",
    headline: "NetSuite is the better known cloud ERP. Acumatica is the challenger that lists South Africa among its localisations.",
    summary:
      "Neither vendor lists a price. Oracle gives NetSuite pricing through a sales quote, and Acumatica gives its pricing through calculators and a partner quote. Acumatica's page describes a cloud ERP for small and mid market businesses that serves more than 10,000 customers and lists South Africa among its localisation countries. For a South African mid sized business, local partner strength and confirmed localisation matter more than brand.",
    chooseA: [
      "You want the best known cloud ERP name and are prepared for a larger investment",
      "You have subscription, multi entity or complex needs where NetSuite is often considered",
    ],
    chooseB: [
      "You want a cloud ERP with broad industry editions and South Africa listed for localisation",
      "Your needs include construction, distribution, retail or professional services with project accounting",
    ],
    glance: [
      { label: "Pricing", a: "On request, through an Oracle sales quote", b: "On request, through calculators and a partner quote" },
      { label: "Customers", a: "A large global customer base", b: "10,000 plus businesses, by Acumatica's own count" },
      { label: "South Africa", a: "Sold to South African businesses, with VAT and bank setup confirmed in a demo", b: "Listed among localisation countries" },
      { label: "Industries", a: "Mid market and growing businesses, broad", b: "Distribution, manufacturing, construction, retail, professional services" },
      { label: "Founded", a: "1998", b: "2008" },
    ],
    sections: [
      {
        heading: "Pricing compared",
        paragraphs: [
          "Oracle quotes NetSuite on request, as a platform fee, user licences and add on modules. Acumatica refers to a pricing page and industry calculators, and a partner confirms the quote. Whichever you choose, ask for a written all in quote covering licences, implementation, training and the first two years of support, and compare the two on the same footing.",
        ],
      },
      {
        heading: "Features compared",
        paragraphs: [
          "Acumatica's page describes financial management, distribution, manufacturing, construction, retail and professional services, with project accounting, CRM, payroll management, inventory control, warehouse management and business intelligence reporting. NetSuite covers advanced financials, inventory and warehouse management, billing, revenue recognition, project management and CRM, sold as modules.",
        ],
      },
      {
        heading: "South African fit",
        paragraphs: [
          "Acumatica names South Africa among its localisation countries, and PaySpace lists Acumatica among its general ledger integrations, a sign of local ecosystem reach. NetSuite is sold to South African businesses too, and Oracle's page does not detail South African VAT handling. For both, ask for the South African VAT output, the eFiling process and bank integration in a live demonstration.",
        ],
      },
      {
        heading: "Support and getting started",
        paragraphs: ["Implementation can exceed the first year's subscription for either. Choose an implementer with South African references and insist on a fixed scope."],
      },
      {
        heading: "Where each falls short",
        paragraphs: ["NetSuite's price comes only with a quote. Acumatica's page is general and gives no local support detail."],
      },
    ],
    verdict:
      "Shortlist both if you are a mid sized business, and let the quotes, the local partners and a South African reference decide. Ask both for the same written, all in quote.",
    researchedAt: EARLIER,
  },

  {
    slug: "asana-vs-monday-com",
    headline: "Asana is the task first tool with unlimited automations from Starter. monday.com is the configurable board platform.",
    summary:
      "Asana's free plan covers two users and its Starter is about R184 per user per month on annual billing, with timeline and Gantt views, unlimited automations and unlimited free guests. monday.com's free plan covers two seats and three boards, and its Basic is about R151 per seat per month, with Gantt arriving on Standard at about R201 and automations capped at 250 a month there. monday.com shows its prices for ten seats.",
    chooseA: [
      "You want a task centric tool with timeline views and unlimited automations from the first paid plan",
      "You want unlimited free guests on paid plans",
      "You want goals and portfolios on a higher plan",
    ],
    chooseB: [
      "You want to design your own boards, columns and workflows",
      "You want unlimited free viewers on Basic and a lower entry price per seat",
      "You may want CRM or service products from the same vendor",
    ],
    glance: [
      { label: "Free plan", a: "2 users, unlimited tasks and projects", b: "2 seats, 3 boards, 3 Docs" },
      { label: "Entry paid", a: "Starter, about R184 per user a month, billed annually", b: "Basic, about R151 per seat a month, billed annually" },
      { label: "Middle", a: "Advanced, about R418", b: "Standard about R201, Pro about R318" },
      { label: "Timeline and Gantt", a: "From Starter", b: "From Standard" },
      { label: "Automations", a: "Unlimited from Starter", b: "250 a month on Standard, 25,000 on Pro" },
      { label: "Seat minimum shown", a: "None stated", b: "Prices shown for 10 seats" },
      { label: "Guests and viewers", a: "Unlimited free guests from Starter", b: "Unlimited free viewers from Basic" },
      { label: "Founded", a: "2008", b: "2012" },
    ],
    sections: [
      {
        heading: "Pricing compared",
        paragraphs: [
          "At the entry level monday.com is cheaper per seat, at about R151 against Asana's R184, but it shows prices for a ten seat example and gates Gantt and calendar views to Standard at about R201. Asana includes timeline and Gantt views, reporting dashboards, forms and unlimited automations in Starter. A team of ten needing Gantt pays about R2 000 a month on monday.com Standard, against about R1 840 on Asana Starter.",
        ],
      },
      {
        heading: "Features compared",
        paragraphs: [
          "Asana Advanced adds unlimited portfolios, goals, resource management, approvals and proofing, time tracking and integrations with Salesforce, Tableau and Power BI. monday.com Pro adds 20 workflows, private boards, advanced columns and 10,000 API calls a day, and Enterprise adds portfolio and resource management with 250,000 automations a month and a 99.9 percent uptime commitment.",
        ],
      },
      {
        heading: "South African fit",
        paragraphs: ["Neither makes South African claims. Asana lists data residency only on Enterprise plus. monday.com lists round the clock support only on Enterprise. Confirm support hours with both."],
      },
      {
        heading: "Support and getting started",
        paragraphs: ["Both offer a free plan to try. monday.com also offers a free trial of its paid plans, and its free plan lets two people explore three boards."],
      },
      {
        heading: "Where each falls short",
        paragraphs: ["Asana's free plan is small and its higher features sit on Advanced. monday.com's seat framing and tier gating can lead a small team to overpay."],
      },
    ],
    verdict:
      "Choose Asana for a clean task centred tool with generous automation from Starter. Choose monday.com for configurability and a lower entry price per seat. Price your actual seats and the views you need.",
    researchedAt: DATE,
  },

  {
    slug: "clickup-vs-trello",
    headline: "ClickUp is the broad, cheap, configurable platform. Trello is the simple board at an even lower price.",
    summary:
      "ClickUp's Unlimited plan costs about R117 per user per month on annual billing and adds unlimited storage, spaces and forms to a free plan that is generous on tasks but tight on storage at 60 megabytes. Trello's Standard is about R84, with unlimited boards, and its free plan allows ten boards for up to ten collaborators. ClickUp does far more. Trello does less, faster.",
    chooseA: [
      "You want tasks, docs, goals, chat and whiteboards in one tool",
      "You want unlimited storage and integrations at a low price",
      "You have time to configure a flexible platform",
    ],
    chooseB: [
      "You want simple boards and cards with almost no learning curve",
      "You want the lowest paid price, from about R84 per user",
      "You already use Atlassian products",
    ],
    glance: [
      { label: "Free plan", a: "Unlimited tasks, 60 MB storage, 5 spaces, 1 form", b: "Up to 10 collaborators, 10 boards, 10 MB files" },
      { label: "Entry paid", a: "Unlimited, about R117 per user a month, billed annually", b: "Standard, about R84 per user a month, billed annually" },
      { label: "Next tier", a: "Business, about R201", b: "Premium, about R167" },
      { label: "Automation", a: "5,000 a month on Business", b: "1,000 command runs on Standard, unlimited on Premium" },
      { label: "Views", a: "Many, including mind maps and whiteboards on Business", b: "Five views on Premium" },
      { label: "AI", a: "Add ons at about R151 and R468 per user", b: "AI capture on Standard, AI on Premium" },
      { label: "Founded", a: "2017", b: "Atlassian, Trello 2011" },
    ],
    sections: [
      {
        heading: "Pricing compared",
        paragraphs: [
          "Trello is cheaper at each step: Standard at about R84, Premium at about R167 and Enterprise at about R293 per user per month on annual billing, against ClickUp's Unlimited at about R117, Business at about R201 and custom Enterprise. ClickUp's AI add ons at about R151 and R468 per user can double the bill, so compare with and without AI. A team of ten on Trello Standard pays about R840 a month, against about R1 170 on ClickUp Unlimited.",
        ],
      },
      {
        heading: "Features compared",
        paragraphs: [
          "ClickUp's Unlimited adds integrations, native time tracking, goals, chat and email integration, and Business adds unlimited dashboards, mind maps, private whiteboards, sprint points and proofing. Trello's Standard adds card mirroring, more automation and AI capture, and Premium adds Calendar, Timeline, Table, Dashboard and Map views and workspace templates. The difference is breadth: ClickUp is a platform, Trello is a board.",
        ],
      },
      {
        heading: "South African fit",
        paragraphs: ["Neither makes South African claims. ClickUp lists round the clock support even on its free plan. Trello lists it on Enterprise."],
      },
      {
        heading: "Support and getting started",
        paragraphs: ["Trello is learned in minutes. ClickUp takes longer and rewards the investment. Trello offers a free Premium trial."],
      },
      {
        heading: "Where each falls short",
        paragraphs: ["ClickUp's breadth can overwhelm a small team and its free storage is tiny. Trello's simplicity means heavy projects outgrow it."],
      },
    ],
    verdict:
      "Choose Trello for simple boards at the lowest price. Choose ClickUp if you want one platform and will invest in setting it up. Price the team with and without ClickUp's AI.",
    researchedAt: DATE,
  },

  {
    slug: "smartsheet-vs-wrike",
    headline: "Smartsheet is the structured, spreadsheet style platform. Wrike is the request and task oriented one with a free plan.",
    summary:
      "Smartsheet lists its prices in rand on its South African page: Pro at R170 and Business at R359 per member per month billed yearly. It has no free plan, only a 30 day trial with no credit card, and contributors are free. Wrike has a Free plan, Team at about R167 per user per month for 2 to 15 users, Business at about R418 for 5 to 200 users and a 14 day trial. Smartsheet suits structured projects. Wrike suits task and request workflows.",
    chooseA: [
      "You think in sheets and want structure, forms and reports",
      "You have many contributors who only update work, since they are free",
      "You need portfolios, scenario planning and single sign on at enterprise level",
    ],
    chooseB: [
      "You want a free plan to try before you pay",
      "You manage requests and tasks across a team of 5 to 200",
      "You want AI features and templated workflows on Business",
    ],
    glance: [
      { label: "Free plan", a: "None, 30 day trial with no credit card", b: "Yes, with board and table views" },
      { label: "Price", a: "Pro R170 and Business R359 per member a month, billed yearly", b: "Team about R167 and Business about R418 per user a month, billed annually" },
      { label: "Entry limits", a: "Pro for 1 to 10 members, Business for 3 or more members", b: "Team for 2 to 15 users, Business for 5 to 200 users" },
      { label: "Contributors", a: "Unlimited and free", b: "Per user plans" },
      { label: "Automation", a: "250 a month on Pro, unlimited on Business", b: "AI Essentials on Team, AI Elite on Business" },
      { label: "Top tiers", a: "Enterprise and Advanced Work Management, custom", b: "Pinnacle and Apex, contact for pricing" },
      { label: "Trial", a: "30 days", b: "14 days" },
      { label: "Founded", a: "2005", b: "2006" },
    ],
    sections: [
      {
        heading: "Pricing compared",
        paragraphs: [
          "Smartsheet's South African page lists Pro at R170 and Business at R359 per member per month billed yearly, or R230 and R450 billed monthly. Wrike lists Team at about R167 and Business at about R418 per user per month billed annually. At the entry level the two sit close together, with Smartsheet's Pro a little above Wrike's Team. The structural difference is that Smartsheet gives away contributor seats, which helps when many people only need to update work.",
        ],
      },
      {
        heading: "Features compared",
        paragraphs: [
          "Smartsheet Pro offers unlimited sheets, forms and reports, 250 automations a month and Gantt, table, board and calendar views. Business adds timeline view, workload tracking, admin capabilities, unlimited automations and 1 terabyte of attachment storage. Wrike's Team adds AI Essentials, a shareable dashboard and interactive Gantt charts, and Business adds AI Elite, templated work and standard integrations. Pinnacle adds resource and capacity planning, budgeting and advanced reporting.",
        ],
      },
      {
        heading: "South African fit",
        paragraphs: ["Smartsheet shows its prices in rand for South African customers. Wrike makes no South African claims. Confirm support hours with both."],
      },
      {
        heading: "Support and getting started",
        paragraphs: ["Wrike offers a free plan and a 14 day trial with no credit card. Smartsheet offers 30 days with no credit card."],
      },
      {
        heading: "Where each falls short",
        paragraphs: ["Smartsheet has no free plan. Wrike's user ranges and contact us pricing for higher tiers complicate budgeting."],
      },
    ],
    verdict:
      "Choose Smartsheet for structured projects with many contributors and prices you can read in rand. Choose Wrike if you want to start on a free plan and manage requests and tasks. Run both trials with a real project.",
    researchedAt: DATE,
  },
];
