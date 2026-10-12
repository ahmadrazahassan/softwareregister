import type { ProductProfile } from "../../types";

/**
 * ERP products other than Sage, from each vendor's own pages (read 5 and 11 October
 * 2026). Most give their price on request, so the reviews say what to ask for.
 * Copy contains no hyphens and no dashes.
 */

const DATE = "2026-10-11";

export const ERP_PROFILES: ProductProfile[] = [
  {
    slug: "syspro",
    headline: "A South African ERP built for manufacturers and distributors, moving to named user subscriptions.",
    summary:
      "SYSPRO is an ERP software company that began in Johannesburg in 1978 and describes itself as the industrial AI company for manufacturing and distribution. It runs in the cloud and on premise with a cloud first commitment, and it has announced that it is replacing the initial licence plus annual licence fee model with a named user subscription. It publishes no price.",
    bestFor: [
      "Manufacturers and distributors that want an ERP built for their industries",
      "Mid sized companies that want local origin, support and a long track record",
      "Food and beverage, automotive, electronics, packaging, plastics, metals and chemical manufacturers",
    ],
    thinkTwice: [
      "You are a retailer or services business, because the product targets manufacturing and distribution",
      "You need to compare prices before a conversation with a partner",
      "You are in the middle of a licence agreement, because the pricing model is changing",
    ],
    pros: [
      "Built for manufacturers and distributors, and South African in origin since 1978",
      "Cloud and on premise deployment, cloud first",
      "Finance, manufacturing and supply chain, with lot traceability",
      "SIDEKICK, an AI co pilot",
    ],
    cons: [
      "No published price",
      "Aimed at manufacturing and distribution, so less to like for retail or services",
      "The pricing model is moving to a named user subscription, which changes how you compare quotes",
      "The page lists no SARS or VAT features, so ask for a demonstration",
    ],
    stats: [
      { label: "Price", value: "On request", note: "A quote or a demo" },
      { label: "Founded", value: "1978", note: "In Johannesburg" },
      { label: "Experience", value: "Nearly 50 years", note: "SYSPRO's own statement" },
      { label: "Deployment", value: "Cloud and on premise", note: "Cloud first" },
      { label: "Pricing model", value: "Named user subscription", note: "Replacing licence plus annual fees" },
    ],
    faqs: [
      { q: "What is the SYSPRO pricing model?", a: "SYSPRO has announced that it is replacing the initial licence fee and annual licence fee model with a named user, subscription based platform model. Ask for the price per named user, the modules it includes and the implementation cost in writing." },
    ],
    verdict:
      "If you manufacture or distribute, shortlist it. Ask for a written, all in quote with the same scope as any rival, and a South African reference customer in your industry.",
    sources: [{ label: "SYSPRO", url: "https://www.syspro.com/" }],
    researchedAt: "2026-10-05",
  },

  {
    slug: "sap-business-one",
    headline: "SAP's ERP for small and midsize businesses, sold through partners on a request a quote basis.",
    summary:
      "SAP Business One is the smaller ERP in the SAP family. SAP's page describes a single, affordable ERP solution that covers accounting and financials, purchasing, inventory, sales and customer relationships, and reporting and analytics, with integrated business intelligence, integration with SAP HANA and quick deployment. It publishes no price and offers a Request a quote button.",
    bestFor: [
      "Small and midsize businesses that want a recognised ERP brand",
      "Companies that want to be part of the SAP family as they grow",
      "Businesses that will buy through a local implementation partner",
    ],
    thinkTwice: [
      "You want a price without a conversation, because none is published",
      "You want a simple tool, because implementation is a project",
      "You want to compare partners, because who implements it matters as much as the software",
    ],
    pros: [
      "A recognised ERP brand for small and midsize businesses",
      "Covers financials, purchasing, inventory, sales, customers and reporting",
      "Integrates with SAP HANA",
      "Delivered through local partners, who set up VAT, eFiling and bank integration",
    ],
    cons: [
      "No published price: request a quote",
      "The page is brief and marketing led",
      "The experience varies with the implementation partner",
      "The page lists no South African tax features",
    ],
    stats: [
      { label: "Price", value: "On request", note: "A quote from a local partner" },
      { label: "Scope", value: "6 areas", note: "Financials, purchasing, inventory, sales, customers, reporting" },
      { label: "Founded", value: "1972", note: "SAP SE" },
      { label: "Sold through", value: "Local partners", note: "Who also implement it" },
    ],
    faqs: [{ q: "How do I get a price for SAP Business One?", a: "Use the Request a quote button, or ask a local SAP partner. The quote should state licences, implementation, training and support separately, with the VAT basis." }],
    verdict:
      "A sensible shortlist name for a growing business that wants an ERP brand. Ask two partners to quote the same scope and show you VAT, eFiling and your bank in a live demonstration.",
    sources: [{ label: "SAP Business One", url: "https://www.sap.com/products/erp/business-one.html" }],
    researchedAt: "2026-10-05",
  },

  {
    slug: "netsuite",
    headline: "Oracle's cloud ERP for mid market and growing businesses, sold by quote.",
    summary:
      "NetSuite is Oracle's cloud ERP for mid market and growing businesses, covering financials, inventory, order management, CRM and more, sold as modules. Oracle publishes no price: it gives NetSuite pricing through a sales quote, typically as a platform fee, user licences and add on modules. Implementation can cost as much as the first year's subscription.",
    bestFor: [
      "Growing mid market companies that want a single cloud ERP",
      "Businesses with subscription or multi entity needs, where NetSuite is often considered",
    ],
    thinkTwice: [
      "You want to compare with confirmed prices, because Oracle publishes none",
      "You are a small business, where a platform fee and implementation are heavy",
      "You need South African VAT handling confirmed in a demonstration",
    ],
    pros: [
      "A well known cloud ERP for mid market and growing businesses",
      "Often considered for subscription and multi entity needs",
      "Modules for financials, inventory, order management and CRM",
    ],
    cons: [
      "Oracle publishes no price",
      "Oracle's page does not detail South African VAT handling",
      "Implementation can exceed the first year's subscription",
      "Modules are sold separately, so the scope of the quote matters",
    ],
    stats: [
      { label: "Price", value: "On request", note: "An Oracle sales quote" },
      { label: "Modules", value: "Sold separately", note: "Financials, inventory, orders, CRM and more" },
      { label: "Founded", value: "1998", note: "NetSuite, now part of Oracle" },
      { label: "Deployment", value: "Cloud", note: "Oracle's cloud ERP" },
    ],
    faqs: [{ q: "What does NetSuite cost?", a: "Oracle publishes no price. A quote has a platform fee, user licences and modules, and implementation is separate. Ask for all of them in writing, in rand, with the VAT basis." }],
    verdict:
      "A well known cloud ERP, with the usual caveat that the real cost is in the quote and the implementation. Ask Oracle for a written all in quote and a South African reference customer.",
    sources: [{ label: "Oracle NetSuite", url: "https://www.netsuite.com/" }],
    researchedAt: "2026-10-05",
  },

  {
    slug: "acumatica",
    headline: "A cloud ERP for small and mid market businesses that lists South Africa among its localisations.",
    summary:
      "Acumatica is a cloud ERP covering financials, distribution, manufacturing, construction, retail and professional services, with project accounting, CRM, payroll management, inventory, warehouse management and reporting. It says it serves more than 10,000 businesses and lists South Africa among its supported countries. It publishes no price and points to calculators and a partner quote.",
    bestFor: [
      "Small and mid market businesses that want a cloud ERP with a broad industry range",
      "Construction, distribution and professional services firms that want project accounting in the ERP",
    ],
    thinkTwice: [
      "You need a published price, because Acumatica does not show one on the page",
      "You need local support details, because the page gives none for South Africa",
    ],
    pros: [
      "A cloud ERP for distribution, manufacturing, construction, retail and professional services",
      "Project accounting, CRM, payroll management and warehouse management",
      "Lists South Africa among its localisation countries",
      "Used by more than 10,000 businesses, by its own count",
    ],
    cons: [
      "No price on the page: it points to calculators and a partner quote",
      "The page names no local partner or South African support details",
      "A general page, so you rely on a demonstration and a partner's quote",
    ],
    stats: [
      { label: "Price", value: "On request", note: "Calculators and a partner quote" },
      { label: "Businesses", value: "10,000 plus", note: "Acumatica's own count" },
      { label: "Industries", value: "5", note: "Distribution, manufacturing, construction, retail, professional services" },
      { label: "Founded", value: "2008", note: "Acumatica" },
    ],
    faqs: [{ q: "Is Acumatica available in South Africa?", a: "Acumatica lists South Africa among the countries it localises for. Ask a partner to show your VAT output, eFiling step and bank integration in a live demonstration." }],
    verdict:
      "Worth a place on a mid sized business's shortlist. Let the written quote, a local partner and a South African reference decide.",
    sources: [{ label: "Acumatica", url: "https://www.acumatica.com/cloud-erp-software/" }],
    researchedAt: DATE,
  },

  {
    slug: "odoo",
    headline: "An open ecosystem ERP with a free app, and one of the lowest per user prices in its category.",
    summary:
      "Odoo is a Belgian business software suite that sells hundreds of apps. Its pricing page shows One App Free with unlimited users, Standard at about R150 per user a month (about R133 on yearly billing) with all apps, and Custom at about R274 (about R224 yearly) with multi company, an external API and a choice of hosting. Support, hosting and upgrades are included, and implementation is separate.",
    bestFor: [
      "Small businesses that want to start with one free app, such as invoicing or CRM",
      "Companies that want many apps under one login at a low per user price",
      "Businesses with developers who want to customise the system",
    ],
    thinkTwice: [
      "You need South African tax features confirmed, because the pricing page does not list them",
      "You rely on a local partner, because implementation quality varies",
      "You want support seven days a week, because support runs Monday to Friday",
    ],
    pros: [
      "One App Free, with unlimited users and hosting included",
      "Standard gives all apps at a low per user price, cheaper again on yearly billing",
      "Hundreds of apps under one login",
      "An open model that suits developers and partners who customise",
    ],
    cons: [
      "The page lists no South African tax features",
      "Support runs Monday to Friday, not seven days",
      "The total cost depends on implementation and your local partner",
      "Light users cost extra on Custom",
    ],
    stats: [
      { label: "One App Free", value: "Free", note: "One app, unlimited users, hosting included" },
      { label: "Standard", value: "About R150 per user", note: "A month, all apps; about R133 on yearly billing" },
      { label: "Custom", value: "About R274 per user", note: "A month; about R224 on yearly billing" },
      { label: "Light user", value: "About R49", note: "A month, on Custom" },
      { label: "Ten users on Standard", value: "About R1 500", note: "A month" },
      { label: "Founded", value: "2005", note: "Odoo SA" },
    ],
    billing: [
      { plan: "Standard", monthly: 8.95, yearly: 7.95, currency: "USD" },
      { plan: "Custom", monthly: 16.4, yearly: 13.4, currency: "USD" },
    ],
    faqs: [{ q: "Is Odoo free?", a: "One App Free gives you one app for unlimited users with hosting included. Standard and Custom are paid per user and include all apps." }],
    verdict:
      "Excellent value on paper and a good place to start free. Ask a South African partner to demonstrate VAT and bank reconciliation, and budget for implementation.",
    sources: [{ label: "Odoo pricing", url: "https://www.odoo.com/pricing" }],
    researchedAt: DATE,
  },
];
