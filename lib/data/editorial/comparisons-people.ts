import type { EditorialComparison } from "../../types";

const DATE = "2026-10-11";

/**
 * HR and CRM comparisons. Every figure is from the vendors' own pages, read on the date above. A price a vendor lists
 * in dollars is shown in rand at the reference rate of 2 October 2026 and is marked "about", because the rate moves daily.
 */
export const PEOPLE_COMPARISONS: EditorialComparison[] = [
  {
    slug: "sage-hr-vs-bamboohr",
    headline: "Sage HR is modular and sold locally. BambooHR is polished, with payroll for US employees only.",
    summary:
      "Sage HR includes core HR and leave management at R28 per employee a month, then lets you add Performance, Timesheets, Expenses and other modules, priced by a calculator, with a 30 day trial that needs no credit card. BambooHR lists Core at about R167, Pro at about R284 and Elite at about R418 per employee per month for companies of more than 25, with flat monthly rates for smaller ones, and restricts its payroll and benefits add ons to US employees. For a South African employer, local pricing and local leave handling usually settle it.",
    chooseA: [
      "You want local pricing and to add modules only when you need them",
      "You already use Sage Payroll or Sage Accounting",
      "You want a trial with no credit card that ends on its own",
    ],
    chooseB: [
      "You have a US presence or US employees, where its payroll and benefits apply",
      "You want performance reviews, surveys and a library of compliance training in one platform",
      "You are comfortable managing payroll elsewhere",
    ],
    glance: [
      { label: "Pricing shape", a: "R28 per employee a month for core HR and leave, with modules added on", b: "Core about R167, Pro about R284, Elite about R418 per employee for more than 25 employees" },
      { label: "Modules", a: "Timesheets R14, Performance R14, Expenses R10 per employee a month", b: "Time and Attendance and Global Employment as add ons" },
      { label: "Small team rate", a: "Calculated by the tool, bands from 1 to 4 employees", b: "Flat about R4 180, R7 110 or R10 870 a month for 25 or fewer" },
      { label: "Payroll", a: "Separate product, Sage Payroll", b: "US employees only" },
      { label: "Performance", a: "Optional module", b: "From Pro, with 360 reviews" },
      { label: "Founded", a: "Sage Group plc, 1981", b: "2008" },
    ],
    sections: [
      {
        heading: "Pricing compared",
        paragraphs: [
          "Sage HR gives you core HR and leave management as standard at R28 per employee a month and charges for each extra module: Timesheets and Performance at R14 and Expenses at R10 per employee a month. The pricing page also shows a calculator, so run it with your headcount and the modules you want. BambooHR's page is more direct: Core at about R167, Pro at about R284 and Elite at about R418 per employee per month for more than 25 employees, and flat monthly rates for companies of 25 or fewer of about R4 180, R7 110 and R10 870.",
          "For a team of fifteen, BambooHR's Core flat rate of about R4 180 a month works out to about R280 per person, which is higher than its per employee rate for larger companies.",
        ],
      },
      {
        heading: "Features compared",
        paragraphs: [
          "Both cover employee records and time off. Sage HR's modules add performance with goals, one to ones and 360 feedback, shift scheduling, timesheets, expenses submitted from a mobile app and recruitment with job ads and an applicant pipeline. BambooHR's tiers add hiring and onboarding in Core, performance management with 360 reviews and recognition in Pro, and compensation management, custom dashboards and over 300 compliance training courses in Elite.",
        ],
      },
      {
        heading: "South African fit",
        paragraphs: [
          "Sage HR is sold by Sage South Africa with a rand pricing page, and Sage's payroll pages describe leave managed under the BCEA. The HR pricing page does not detail leave rules, so ask how family responsibility and maternity leave are configured. BambooHR makes no South African claims and limits payroll and benefits to US employees, so a South African business would use it for HR records only.",
        ],
      },
      {
        heading: "Support and getting started",
        paragraphs: ["Sage HR's trial lets you use demo data or your own employee information for 30 days with no credit card."],
      },
      {
        heading: "Where each falls short",
        paragraphs: ["Sage HR's calculator makes quick comparison harder and payroll sits outside it. BambooHR restricts payroll to the US and says nothing about South African compliance."],
      },
    ],
    verdict:
      "For a South African employer, Sage HR is the practical choice: local pricing and support and a path to payroll. BambooHR makes sense mainly when the workforce is partly American. Run Sage's calculator with your real headcount before you decide.",
    researchedAt: DATE,
  },

  {
    slug: "hubspot-vs-pipedrive",
    headline: "HubSpot is the broad platform with a free start. Pipedrive is the focused pipeline tool with a low paid price.",
    summary:
      "HubSpot offers a free CRM for up to two users with no time limit, then Starter at about R251, Professional at about R837 and Enterprise at about R1 255 per user per month. Pipedrive has no free plan and starts at about R234 per user per month billed annually, with higher plans at about R402, R820 and R1 154. At the entry level the two cost almost the same, and the paid gap opens at the middle tier. The choice is breadth against focus.",
    chooseA: [
      "You want to start free and add marketing, sales and service tools over time",
      "You value HubSpot's training, community and integrations",
      "You can plan for the jump to Professional pricing",
    ],
    chooseB: [
      "You want a simple pipeline tool and a lower paid price at the middle tier",
      "Your team lives in deals and stages",
      "You do not need marketing automation in the same system",
    ],
    glance: [
      { label: "Free option", a: "Free CRM for up to 2 users, no time limit", b: "None, a free trial instead" },
      { label: "Entry paid price", a: "Starter, about R251 per user a month, discounted for new customers", b: "Lite, about R234 per user a month, billed annually" },
      { label: "Middle tier", a: "Professional, about R837 per user a month", b: "Growth about R402, Premium about R820" },
      { label: "Top tier", a: "Enterprise, about R1 255 per user a month", b: "Ultimate, about R1 154 per user a month" },
      { label: "VAT", a: "Not stated on the page", b: "Prices exclude VAT" },
      { label: "Scope", a: "Marketing, sales, service, content and data", b: "Sales pipeline and deal management" },
      { label: "Founded", a: "2006", b: "2010" },
    ],
    sections: [
      {
        heading: "Pricing compared",
        paragraphs: [
          "HubSpot's strength is the free start. Its page lists Starter at about R251 per user per month for new customers, Professional at about R837 and Enterprise at about R1 255. Pipedrive's Lite plan is about R234 per user per month billed annually, with Growth at about R402, Premium at about R820 and Ultimate at about R1 154, all excluding VAT.",
          "For a team of five, HubSpot Starter comes to about R1 255 a month and Pipedrive Lite to about R1 171, close enough that features should decide. At the middle tier the picture changes: five seats on HubSpot Professional come to about R4 183 a month, against about R2 008 on Pipedrive Growth.",
        ],
      },
      {
        heading: "Features compared",
        paragraphs: [
          "HubSpot is a platform: marketing, sales, service, content and data management with the CRM at the centre, and comparison charts that vary by email limits, automation, reporting, seats, branding removal and meeting scheduling. Pipedrive is organised around pipelines and deals, with add ons such as LeadBooster, Projects, Campaigns, Web Visitors and Smart Docs, and leaves broader marketing and service tools to other products.",
        ],
      },
      {
        heading: "South African fit",
        paragraphs: ["Neither makes South African claims. The checks are support hours, VAT on the invoice, and whether your email and calendar connect."],
      },
      {
        heading: "Support and getting started",
        paragraphs: ["HubSpot's free tools are an easy way to learn the product. Pipedrive's strength is its quick onboarding for sales teams."],
      },
      {
        heading: "Where each falls short",
        paragraphs: ["HubSpot's costs climb steeply as you move from Starter to Professional. Pipedrive is narrower and has no free plan."],
      },
    ],
    verdict:
      "Choose HubSpot if you want to start free and may grow into marketing and service, and price Professional before you commit. Choose Pipedrive if your need is a focused sales pipeline at a lower middle tier price.",
    researchedAt: DATE,
  },

  {
    slug: "zoho-crm-vs-hubspot",
    headline: "Zoho CRM is the value suite. HubSpot is the easier start with a steeper climb.",
    summary:
      "Zoho CRM has a free edition for three users and paid editions from about R234 per user per month billed annually, rising to about R870 on Ultimate. HubSpot offers a free CRM for two users, then Starter at about R251 and Professional at about R837. Zoho is the cheaper road at every paid step, and its Enterprise edition costs less than HubSpot Professional. HubSpot is the gentler on ramp.",
    chooseA: [
      "You want free for three users and a low cost path as you grow",
      "You already use Zoho Books or other Zoho products",
      "You want to add team users for non sales colleagues at a lower licence level",
    ],
    chooseB: [
      "You want the gentlest start with a large library of training and community help",
      "You want marketing, sales and service tools in one platform",
      "You can plan for a higher Professional tier",
    ],
    glance: [
      { label: "Free option", a: "Free for 3 users, free forever", b: "Free CRM for 2 users, no time limit" },
      { label: "Paid prices", a: "Standard about R234, Professional about R385, Enterprise about R669, Ultimate about R870 per user a month, billed annually", b: "Starter about R251, Professional about R837, Enterprise about R1 255 per user a month" },
      { label: "VAT", a: "Local taxes such as VAT are added to the price", b: "Not stated on the page" },
      { label: "User types", a: "Org users and team users", b: "Seats" },
      { label: "Onboarding", a: "Free onboarding advertised", b: "Training and community library" },
      { label: "Scope", a: "A customisable CRM within the Zoho suite", b: "A platform across marketing, sales, service and data" },
      { label: "Founded", a: "Zoho Corporation, 1996", b: "2006" },
    ],
    sections: [
      {
        heading: "Pricing compared",
        paragraphs: [
          "Zoho CRM's page is headlined free for three users and promises flexible contracts and free onboarding. Its paid editions are Standard at about R234, Professional at about R385, Enterprise at about R669 and Ultimate at about R870 per user per month billed annually, with local taxes added. HubSpot's Starter begins at about R251 per user, then Professional at about R837 and Enterprise at about R1 255. For a team of five, Zoho Professional comes to about R1 925 a month against about R4 183 on HubSpot Professional.",
        ],
      },
      {
        heading: "Features compared",
        paragraphs: [
          "Zoho splits users into org users with full access and team users who can view and annotate records in up to 10 org modules and work fully in team modules, which suits marketing, support, legal and finance colleagues at a lower licence cost. HubSpot's seats are simpler and its free tools prove the concept before you pay.",
        ],
      },
      {
        heading: "South African fit",
        paragraphs: ["Zoho runs a South African site and a CRM has no SARS role. HubSpot makes no South African claims. Confirm support hours and how VAT appears on the invoice with either."],
      },
      {
        heading: "Support and getting started",
        paragraphs: ["HubSpot has the stronger training and community. Zoho advertises free onboarding and a minimal learning curve, though its team user rules take time to learn."],
      },
      {
        heading: "Where each falls short",
        paragraphs: ["Zoho's flexibility adds complexity. HubSpot's cost jumps at Professional and its free plan is limited to two users."],
      },
    ],
    verdict:
      "Choose Zoho CRM for cost control, especially inside the Zoho suite. Choose HubSpot for the easiest start and breadth, after you have priced Professional.",
    researchedAt: DATE,
  },

  {
    slug: "salesforce-sales-cloud-vs-hubspot",
    headline: "Salesforce is the deep enterprise platform. HubSpot is the easier, cheaper way in.",
    summary:
      "Salesforce Sales Cloud lists a free suite and paid editions from about R418 to about R9 202 per user per month, with Pro Suite at about R1 673, Core at about R3 262 and Advanced at about R6 608 billed annually. HubSpot lists a free CRM and Starter at about R251, Professional at about R837 and Enterprise at about R1 255. Salesforce is deeper and costlier and usually needs an administrator or a partner. HubSpot is simpler to start, and its Professional tier is also a step up.",
    chooseA: [
      "You run a larger sales organisation that needs deep customisation, forecasting and enterprise controls",
      "You want the biggest ecosystem of partners, apps and consultants",
      "You will use the AI and agent features at the higher editions",
    ],
    chooseB: [
      "You want to start free and learn the product yourself",
      "You want marketing, sales and service tools from one vendor",
      "You are a small or mid sized team without a Salesforce administrator",
    ],
    glance: [
      { label: "Free option", a: "Free Suite, with a trial", b: "Free CRM for 2 users, no time limit" },
      { label: "Entry paid", a: "Starter Suite, about R418 per user a month", b: "Starter, about R251 per user a month" },
      { label: "Mid tier", a: "Pro Suite, about R1 673, billed annually", b: "Professional, about R837" },
      { label: "Top tiers", a: "Core about R3 262, Advanced about R6 608, Max about R9 202", b: "Enterprise, about R1 255" },
      { label: "Best at", a: "Customisation, forecasting, enterprise controls", b: "Ease of start and breadth" },
      { label: "Founded", a: "1999", b: "2006" },
    ],
    sections: [
      {
        heading: "Pricing compared",
        paragraphs: [
          "Salesforce's Starter Suite costs about R418 per user per month, against about R251 for HubSpot's Starter. At the middle, Salesforce Pro Suite costs about R1 673 against about R837 for HubSpot Professional. Salesforce then climbs to Core at about R3 262, Advanced at about R6 608 and Max at about R9 202 per user per month. A ten person team on Core would pay about R32 600 a month.",
        ],
      },
      {
        heading: "Features compared",
        paragraphs: [
          "Salesforce's editions add built in sales flows and lead routing, quoting and forecasting, Premier Success, Slack Business plus and Tableau Next, enhanced security and backup, and the full AI suite including Agentforce for Sales. HubSpot's tiers vary by email limits, automation, reporting and seats across marketing, sales and service.",
        ],
      },
      {
        heading: "South African fit",
        paragraphs: ["Neither page makes South African pricing claims. Salesforce's partner ecosystem includes South African consultancies, which is a practical advantage for customisation."],
      },
      {
        heading: "Support and getting started",
        paragraphs: ["HubSpot is easier to learn alone. Salesforce usually needs an administrator or partner, and the Premier Success offering appears from Core."],
      },
      {
        heading: "Where each falls short",
        paragraphs: ["Salesforce costs more and needs more care. HubSpot's depth for complex sales is lower."],
      },
    ],
    verdict:
      "Choose Salesforce when complexity, scale and customisation justify the price and you have an administrator or partner. Choose HubSpot when you want to start simply and grow. Price your real tier in rand before you commit to either.",
    researchedAt: DATE,
  },
];
