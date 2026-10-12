import type { ProductProfile } from "../../types";

/**
 * Project and work management products, from each vendor's own pricing pages (read
 * 5 and 11 October 2026). Foreign prices are written as rand marked "about" at the
 * 2 October 2026 reference rate. Copy contains no hyphens and no dashes.
 */

const DATE = "2026-10-11";

export const PM_PROFILES: ProductProfile[] = [
  {
    slug: "asana",
    headline: "A polished work management tool whose free plan stops at two users.",
    summary:
      "Asana is a work management platform for teams. Its pricing page lists a free Personal plan for two users, Starter at about R184 and Advanced at about R418 per user a month on yearly billing, converted from dollars, and custom priced Enterprise tiers. Paid plans include unlimited free guests, and portfolios, goals and resource management begin on Advanced.",
    bestFor: [
      "Teams that want a clean, well designed way to plan and track work",
      "Marketing and operations teams that need timelines, forms and reporting dashboards",
      "Businesses that want unlimited free guests on paid plans",
    ],
    thinkTwice: [
      "You counted on a generous free plan, because Personal is limited to two users",
      "You need portfolios, goals and resource management, which start on Advanced at about R418 per user",
      "You want a flat, predictable bill, because cost scales with every user you add",
    ],
    pros: [
      "A clean, well designed tool for planning and tracking work",
      "A free Personal plan with unlimited tasks and projects",
      "Unlimited free guests on paid plans",
      "Timeline and Gantt views, forms, reporting dashboards and more than 100 free integrations",
    ],
    cons: [
      "The free plan stops at two users",
      "Portfolios, goals and resource management start on Advanced",
      "AI is included with limits on paid plans",
      "Paid monthly, Starter is about R226 and Advanced about R510",
    ],
    stats: [
      { label: "Personal", value: "Free", note: "Two users, unlimited tasks and projects" },
      { label: "Starter", value: "About R184", note: "Per user a month, yearly billing" },
      { label: "Advanced", value: "About R418", note: "Per user a month, yearly billing" },
      { label: "Five users on Advanced", value: "About R2 091", note: "A month, yearly billing" },
      { label: "Integrations", value: "100 plus", note: "Free" },
      { label: "Founded", value: "2008", note: "Asana, Inc." },
    ],
    billing: [
      { plan: "Starter", monthly: 13.49, yearly: 10.99, currency: "USD" },
      { plan: "Advanced", monthly: 30.49, yearly: 24.99, currency: "USD" },
    ],
    faqs: [{ q: "Is Asana free?", a: "Asana's Personal plan is free for two users, with unlimited tasks and projects. For more people you pay per user on Starter or Advanced." }],
    verdict:
      "A very good tool for a team that wants clarity, and a bill that grows with the team. Use the free plan to learn it, and price the tier you will really need for the whole team before you move everyone in.",
    sources: [{ label: "Asana pricing", url: "https://asana.com/pricing" }],
    researchedAt: DATE,
  },

  {
    slug: "clickup",
    headline: "Low priced paid plans and a free plan that is generous on tasks and tight on storage.",
    summary:
      "ClickUp is an all in one work platform. Its pricing page lists Free Forever, Unlimited at about R117 and Business at about R201 per user a month on yearly billing, converted from dollars, and a custom Enterprise tier. AI add ons cost about R151 and R468 per user a month and change the picture, since they can double or triple the per user price.",
    bestFor: [
      "Budget conscious teams that want many features at a low per user price",
      "Teams that want tasks, docs, goals, chat and whiteboards in one place",
      "Small businesses that want unlimited storage and integrations without paying much",
    ],
    thinkTwice: [
      "You want a simple tool, because ClickUp has a lot to configure",
      "You plan to add the AI plans, which can double or triple the per user cost",
      "You need more than 60 MB of storage on the free plan, because it ends quickly",
    ],
    pros: [
      "Among the lowest paid plans in the category, from about R117 per user a month",
      "Tasks, docs, goals, chat and whiteboards in one place",
      "A Free Forever plan with unlimited tasks",
      "Unlimited storage and integrations on paid plans, and round the clock support on every plan",
    ],
    cons: [
      "The free plan's 60 MB of storage ends quickly",
      "A lot to configure, which can overwhelm a small team",
      "The AI add ons change the price picture",
      "Paid monthly, Unlimited is about R167 and Business about R318",
    ],
    stats: [
      { label: "Free Forever", value: "Free", note: "Unlimited tasks, 60 MB, five spaces" },
      { label: "Unlimited", value: "About R117", note: "Per user a month, yearly billing" },
      { label: "Business", value: "About R201", note: "Per user a month, yearly billing" },
      { label: "Ten users on Business", value: "About R2 008", note: "A month, yearly billing" },
      { label: "AI add ons", value: "About R151 and R468", note: "Per user a month" },
      { label: "Founded", value: "2017", note: "ClickUp" },
    ],
    billing: [
      { plan: "Unlimited", monthly: 10, yearly: 7, currency: "USD" },
      { plan: "Business", monthly: 19, yearly: 12, currency: "USD" },
    ],
    addOns: [
      { name: "Brain AI", monthly: 9, currency: "USD", kind: "seat", note: "Per user" },
      { name: "Everything AI", monthly: 28, currency: "USD", kind: "seat", note: "Per user" },
    ],
    faqs: [{ q: "Does ClickUp charge extra for AI?", a: "Yes. ClickUp sells AI as add ons of about R151 and R468 per user a month on top of the plan, so a team that adds them pays several times the plan price." }],
    verdict:
      "Hard to beat on price per feature, as long as someone is willing to set it up. Price your team with the AI add ons if you will use them, and keep the free plan for trying it only.",
    sources: [{ label: "ClickUp pricing", url: "https://clickup.com/pricing" }],
    researchedAt: DATE,
  },

  {
    slug: "monday-com",
    headline: "A configurable work platform where the real price is the number of seats and the tier.",
    summary:
      "monday.com is a work management platform. Its pricing page lists a Free plan for up to two seats, then Basic at about R151, Standard at about R201 and Pro at about R318 per seat a month on yearly billing, converted from dollars, with a custom Enterprise tier. Its page shows the price for ten seats as the example, which is about R1 500 to R3 200 a month.",
    bestFor: [
      "Teams that want to design their own boards, workflows and dashboards",
      "Businesses that want free viewers and flexible views",
      "Teams that also want CRM, service or dev products from the same vendor",
    ],
    thinkTwice: [
      "You are a team of fewer than ten, because the page shows the price for ten seats",
      "You need Gantt and calendar views, which start on Standard",
      "You want round the clock support, which the page lists only on Enterprise",
    ],
    pros: [
      "Boards, workflows and dashboards you shape yourself",
      "A free plan for up to two seats",
      "Unlimited free viewers on Basic",
      "More than 200 templates, and CRM, service and dev products from the same vendor",
    ],
    cons: [
      "Prices are shown for ten seats, which can overstate the need of a smaller team",
      "Timeline, Gantt and calendar views start on Standard",
      "Round the clock support is listed only on Enterprise",
    ],
    stats: [
      { label: "Free", value: "2 seats", note: "Three boards, three Docs" },
      { label: "Basic", value: "About R151", note: "Per seat a month, yearly billing" },
      { label: "Standard", value: "About R201", note: "Per seat a month, yearly billing" },
      { label: "Pro", value: "About R318", note: "Per seat a month, yearly billing" },
      { label: "Ten seats on Standard", value: "About R2 008", note: "A month, yearly billing" },
      { label: "Founded", value: "2012", note: "monday.com Ltd" },
    ],
    faqs: [{ q: "Why does monday.com show prices for ten seats?", a: "monday.com's pricing page shows its prices for ten seats as the example. A smaller team should check the minimum seats for its plan before it counts on the per seat figure." }],
    verdict:
      "A flexible platform for a team that wants to build its own workflow. Check the seats you will really pay for, and which plan holds the views you need, before you commit.",
    sources: [{ label: "monday.com pricing", url: "https://monday.com/pricing" }],
    researchedAt: DATE,
  },

  {
    slug: "smartsheet",
    headline: "A spreadsheet style work platform for structured projects, priced in rand per member.",
    summary:
      "Smartsheet is a work management platform that presents projects as sheets, with Gantt, table, board and calendar views. Its pricing page lists Pro at R170 and Business at R359 per member a month on yearly billing, in rand, with a 30 day trial. Contributors and guests are free on paid plans, and Enterprise and Advanced Work Management are priced through sales.",
    bestFor: [
      "Teams that think in spreadsheets and want structure, forms and reports",
      "Organisations with many contributors, since contributors are free",
      "Enterprises that need portfolios, scenario planning and single sign on",
    ],
    thinkTwice: [
      "You want a free plan, because Smartsheet offers a trial, not a free tier",
      "You have more than ten members, because Pro is sold for one to ten members",
      "You are a team of one or two, because Business is sold for three or more members",
    ],
    pros: [
      "A spreadsheet style structure with Gantt, table, board and calendar views",
      "Unlimited free contributors and guests on paid plans",
      "A 30 day trial",
      "Prices in rand, so there is no conversion to do",
      "Portfolios, scenario planning and single sign on on Enterprise",
    ],
    cons: [
      "A trial, not a free tier",
      "Member limits: Pro is one to ten members, Business is three or more",
      "Paid monthly, Pro is R230 and Business is R450 per member",
    ],
    stats: [
      { label: "Pro", value: "R170", note: "Per member a month, yearly billing" },
      { label: "Business", value: "R359", note: "Per member a month, yearly billing" },
      { label: "Ten members on Pro", value: "R1 700", note: "A month, yearly billing" },
      { label: "Ten members on Business", value: "R3 590", note: "A month, yearly billing" },
      { label: "Free trial", value: "30 days", note: "No credit card" },
      { label: "Founded", value: "2005", note: "Smartsheet Inc." },
    ],
    seatRules: [
      { plan: "Pro", min: 1, max: 10 },
      { plan: "Business", min: 3 },
    ],
    billing: [
      { plan: "Pro", monthly: 230, yearly: 170, currency: "ZAR" },
      { plan: "Business", monthly: 450, yearly: 359, currency: "ZAR" },
    ],
    faqs: [{ q: "Are Smartsheet contributors free?", a: "Yes. Smartsheet's paid plans include unlimited free contributors and guests, so you pay for the members who build and manage sheets, and not for everyone who fills them in." }],
    verdict:
      "A good fit for a team that already thinks in sheets, and one of few in this category that prices in rand. Count the members who build and manage, since contributors are free, and check the limits of the plan you need.",
    sources: [{ label: "Smartsheet pricing", url: "https://www.smartsheet.com/pricing" }],
    researchedAt: DATE,
  },

  {
    slug: "trello",
    headline: "The simplest board tool in the category, and the cheapest paid plan at about R84 a user.",
    summary:
      "Trello is Atlassian's board and card tool. Its pricing page lists a Free plan for up to ten collaborators per workspace, then Standard at about R84, Premium at about R167 and Enterprise at about R293 per user a month on yearly billing, converted from dollars. A free trial of Premium is offered to all users.",
    bestFor: [
      "Small teams that want a simple, visual board for tasks",
      "People who value speed and a gentle learning curve",
      "Teams that already use Atlassian products",
    ],
    thinkTwice: [
      "You need heavy reporting or resource planning, because Trello is deliberately light",
      "You need views beyond the board, which start on Premium",
      "You plan complex projects with dependencies, which can outgrow a board",
    ],
    pros: [
      "The simplest board tool in the category, with a gentle learning curve",
      "The cheapest paid plan, from about R84 per user a month",
      "A free plan for up to ten collaborators",
      "Five views on Premium: Calendar, Timeline, Table, Dashboard and Map",
      "A free Premium trial for all users",
    ],
    cons: [
      "Light by design: complex projects with dependencies can outgrow it",
      "Views beyond the board start on Premium",
      "Free plan files are limited to 10 MB",
      "Paid monthly, Standard is about R100 and Premium about R209",
    ],
    stats: [
      { label: "Free", value: "10 collaborators", note: "Per workspace, 10 boards" },
      { label: "Standard", value: "About R84", note: "Per user a month, yearly billing" },
      { label: "Premium", value: "About R167", note: "Per user a month, yearly billing" },
      { label: "Enterprise", value: "About R293", note: "Per user a month, yearly billing" },
      { label: "Ten users on Standard", value: "About R837", note: "A month, yearly billing" },
      { label: "Founded", value: "2011", note: "Trello, now part of Atlassian" },
    ],
    billing: [
      { plan: "Standard", monthly: 6, yearly: 5, currency: "USD" },
      { plan: "Premium", monthly: 12.5, yearly: 10, currency: "USD" },
    ],
    faqs: [{ q: "Is Trello free?", a: "Trello's free plan covers up to ten collaborators per workspace and ten boards. Standard, Premium and Enterprise are paid per user." }],
    verdict:
      "The easiest place to start and a low price to stay on. If your projects grow dependencies, timelines and reporting, look at Premium or at a heavier tool before you pile on.",
    sources: [{ label: "Trello pricing", url: "https://trello.com/pricing" }],
    researchedAt: DATE,
  },

  {
    slug: "wrike",
    headline: "Project and request management for teams of five to two hundred, with a free plan and a 14 day trial.",
    summary:
      "Wrike is a work management platform for teams that manage projects and requests. Its pricing page lists a Free plan, Team at about R167 per user a month for two to fifteen users, and Business at about R418 for five to two hundred users, billed yearly and converted from dollars, with custom priced Pinnacle and Apex tiers and a 14 day trial with no credit card.",
    bestFor: [
      "Teams of five to two hundred that want robust project and request management",
      "Organisations that want AI features and templated workflows on a business plan",
      "Enterprises that need resource planning, budgeting and advanced reporting on Pinnacle",
    ],
    thinkTwice: [
      "You need more than the free plan's board and table views, because Gantt charts start on Team",
      "You are a single user, because Team is sold for two to fifteen users",
      "You are a large team, because Business stops at two hundred users",
    ],
    pros: [
      "A free plan with board and table views",
      "A 14 day trial with no credit card",
      "Interactive Gantt charts from Team and shareable dashboards",
      "Business templatises work and adds AI features",
      "Resource planning, budgeting and advanced reporting on Pinnacle",
    ],
    cons: [
      "Gantt charts start on Team, not on the free plan",
      "Paid plans have user ranges: two to fifteen on Team, five to two hundred on Business",
      "Pinnacle and Apex are priced on request",
    ],
    stats: [
      { label: "Free", value: "Free", note: "Board and table views" },
      { label: "Team", value: "About R167", note: "Per user a month, two to fifteen users" },
      { label: "Business", value: "About R418", note: "Per user a month, five to two hundred users" },
      { label: "Ten users on Team", value: "About R1 673", note: "A month, yearly billing" },
      { label: "Free trial", value: "14 days", note: "No credit card" },
      { label: "Founded", value: "2006", note: "Wrike, Inc." },
    ],
    seatRules: [
      { plan: "Team", min: 2, max: 15 },
      { plan: "Business", min: 5, max: 200 },
    ],
    faqs: [{ q: "How many users can be on Wrike Team?", a: "Wrike's Team plan is for two to fifteen users and its Business plan is for five to two hundred. A team beyond that talks to Wrike about Pinnacle or Apex." }],
    verdict:
      "A strong choice for a mid sized team that wants real project and request handling. Count your users against the plan ranges first, and use the 14 day trial to test Gantt and dashboards.",
    sources: [{ label: "Wrike pricing", url: "https://www.wrike.com/price/" }],
    researchedAt: DATE,
  },
];
