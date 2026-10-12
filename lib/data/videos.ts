/**
 * Official videos for each product, from the vendor's own YouTube channel.
 *
 * Every video here was opened on YouTube on 12 October 2026: it plays in an
 * embedded player, it is public, and the channel that published it is the
 * vendor's own (the channel id is recorded below, and `npm run verify` refuses a
 * video whose channel is not listed as official for its product). Labels are
 * written here in plain words, not copied from the video titles, and the
 * vendor's claims in a video are the vendor's own, as the review page says.
 * Copy contains no hyphens and no dashes.
 */

export type VideoKind = "overview" | "how to" | "feature" | "customer story";

export interface VideoChannel {
  /** YouTube channel id, 24 characters starting UC. */
  id: string;
  /** The channel's name as YouTube shows it. */
  name: string;
}

export const CHANNELS = {
  xero: { id: "UCIDB-mYEzMjGRhpHF6VvzLQ", name: "Xero Accounting Software" },
  quickbooks: { id: "UCNCK4UGSnceO052t8S1kMxw", name: "Intuit QuickBooks" },
  quickbooksIntl: { id: "UCsv_TL2YtcnhdYR3frHOsdw", name: "QuickBooks International" },
  zohoBooks: { id: "UC12OzqYu2z-D6mVJCTjQvwg", name: "Zoho Books" },
  freshbooks: { id: "UC8e4u9aUj2DU8_YsB5Dwdkg", name: "FreshBooks" },
  wave: { id: "UC7HjEprcJT0b3-jqVMRLjIQ", name: "Wave: Small Business Software" },
  sage: { id: "UCK30se6p8Zl8RKmU6Dui5wg", name: "Sage" },
  sageZA: { id: "UC6gAnfpD9OUbORY4-3iljVw", name: "SageGroupZA" },
  sageSupport: { id: "UCDN__s6NLj1vWI3PbNovjQg", name: "Sage Customer Support and Training" },
  sageUSA: { id: "UCb4smNQEcISBd7xI7bFXtxw", name: "Sage USA" },
  sageHR: { id: "UCuGJgawCiiwlo16xCLp6IIQ", name: "Sage HR" },
  simplepay: { id: "UCIE3e5W4I4f_EdU2VQv47ew", name: "SimplePayZA" },
  payspace: { id: "UC_Mj-1WzZJdHyq2LVjALRVw", name: "Deel Local Payroll, powered by PaySpace" },
  labournet: { id: "UCXoFOQAYNamoAB13cCH4urw", name: "Labournet South Africa" },
  peoplehr: { id: "UChK3FDxMHqqJ4CRFx-7u0HA", name: "Access PeopleHR" },
  bamboohr: { id: "UC813WejZjtcjeoUsBRzIQoA", name: "BambooHR" },
  personio: { id: "UCVCPA1Sjpp_llp0oAoX3Ieg", name: "Personio" },
  hubspot: { id: "UCaAx1xeTgF3rs4rBPDq6-Kw", name: "HubSpot" },
  pipedrive: { id: "UC2UlVBsngBJYo_bkjnwaM1g", name: "Pipedrive" },
  freshworks: { id: "UCYtaa2E7NSvf3uD9DbsDYZA", name: "Freshworks" },
  zohoCrm: { id: "UCy5GY9WtEg8SMgAZ_AiSlVw", name: "Zoho CRM" },
  salesforce: { id: "UCUpquzY878NEaZm5bc7m2sQ", name: "Salesforce" },
  sageCrm: { id: "UClEH4ZSCg8sF9qc1VEc6cVQ", name: "Sage CRM" },
  syspro: { id: "UCa1NDYGQhw19E2pi1wOvpIg", name: "Syspro" },
  sapB1: { id: "UCOgUq5yOy1LfTqgMAFdeRyA", name: "SAP Business One" },
  netsuite: { id: "UCHOG3jDe_EGwC-Gc_6YXwOA", name: "NetSuite" },
  acumatica: { id: "UCghyx0c7Fdl9OjgCbFDhSkw", name: "Acumatica" },
  odoo: { id: "UCkQPikELWZFLgQNHd73jkdg", name: "Odoo" },
  asana: { id: "UC2BoogM0AqwOJyoSp1S4ClQ", name: "Asana" },
  clickup: { id: "UCJC7egHqghye211WgTuXMAw", name: "ClickUp" },
  monday: { id: "UCA9UvBiKHly15rN8u_Km3BQ", name: "monday.com" },
  smartsheet: { id: "UC5ZU4ZFl2q-sfd_OR78Fp1w", name: "Smartsheet" },
  trello: { id: "UCRcOkXoOrU6sN1yCz20VmQw", name: "Trello" },
  wrike: { id: "UCiXd-ioJzcXqPWB8osZy6vA", name: "Wrike" },
} as const satisfies Record<string, VideoChannel>;

export type ChannelKey = keyof typeof CHANNELS;

export interface ProductVideo {
  /** The 11 character YouTube video id. */
  id: string;
  /** What the video shows, in our words. */
  label: string;
  channel: ChannelKey;
  kind: VideoKind;
  /** Running time in seconds. */
  seconds: number;
  /** The day the vendor published it, from YouTube. */
  published: string;
  /** Made by a South African team or for South African customers, from the channel or the title. */
  sa?: boolean;
}

/** Which channels count as the vendor's own for each product. A video from any other channel is refused by `npm run verify`. */
export const OFFICIAL_CHANNELS: Record<string, ChannelKey[]> = {
  xero: ["xero"],
  "quickbooks-online": ["quickbooks", "quickbooksIntl"],
  "zoho-books": ["zohoBooks"],
  freshbooks: ["freshbooks"],
  "wave-accounting": ["wave"],
  "sage-accounting": ["sageZA", "sage"],
  "sage-50cloud-pastel": ["sageSupport", "sageZA"],
  "sage-intacct": ["sage"],
  simplepay: ["simplepay"],
  payspace: ["payspace"],
  "sage-payroll": ["sageZA", "sageSupport"],
  "sage-pastel-payroll": ["sageSupport", "sageZA"],
  "sage-hr": ["sageHR"],
  peoplehr: ["peoplehr"],
  bamboohr: ["bamboohr"],
  personio: ["personio"],
  labournet: ["labournet"],
  hubspot: ["hubspot"],
  pipedrive: ["pipedrive"],
  freshsales: ["freshworks"],
  "zoho-crm": ["zohoCrm"],
  "salesforce-sales-cloud": ["salesforce"],
  "sage-crm": ["sageSupport", "sageCrm"],
  syspro: ["syspro"],
  "sap-business-one": ["sapB1"],
  netsuite: ["netsuite"],
  acumatica: ["acumatica"],
  odoo: ["odoo"],
  "sage-200-evolution": ["sageSupport", "sageZA"],
  "sage-x3": ["sageUSA"],
  asana: ["asana"],
  clickup: ["clickup"],
  "monday-com": ["monday"],
  smartsheet: ["smartsheet"],
  trello: ["trello"],
  wrike: ["wrike"],
};

/**
 * Up to three videos a product, the most useful first. A product with no
 * official video worth showing has no entry (PaySoft has none).
 */
export const PRODUCT_VIDEOS: Record<string, ProductVideo[]> = {
  /* ------------------------------------------------------------ accounting */
  xero: [
    { id: "Xpr7ac-55Do", label: "A South African fashion business and how it runs on Xero", channel: "xero", kind: "customer story", seconds: 188, published: "2023-06-20", sa: true },
    { id: "h-Z8ouNdrrQ", label: "How to create and send invoices", channel: "xero", kind: "how to", seconds: 376, published: "2025-11-13" },
  ],
  "quickbooks-online": [
    { id: "Q2l3somGRJ4", label: "An introduction to QuickBooks Online for South Africa", channel: "quickbooksIntl", kind: "overview", seconds: 193, published: "2020-06-04", sa: true },
    { id: "hQw7D7yrYyM", label: "A quick tour and what to do next", channel: "quickbooks", kind: "overview", seconds: 246, published: "2025-07-22" },
  ],
  "zoho-books": [{ id: "hlv2WQWeZ0A", label: "Signing up and getting started, South Africa edition", channel: "zohoBooks", kind: "how to", seconds: 976, published: "2023-01-12", sa: true }],
  freshbooks: [{ id: "LpS0nZ1uJyI", label: "How to get started", channel: "freshbooks", kind: "how to", seconds: 64, published: "2022-01-14" }],
  "wave-accounting": [{ id: "liy-T2VCwHU", label: "A tour of the dashboard", channel: "wave", kind: "overview", seconds: 144, published: "2023-01-16" }],
  "sage-accounting": [
    { id: "MTLcKkWV_Xo", label: "How a chartered accountancy practice simplifies its accounting", channel: "sageZA", kind: "customer story", seconds: 112, published: "2026-08-30", sa: true },
    { id: "Uz19Kovj_Do", label: "AI document capture with Sage Copilot", channel: "sageZA", kind: "feature", seconds: 55, published: "2026-09-30", sa: true },
    { id: "xFWvqV7qTCo", label: "Introducing Sage Copilot for accounting", channel: "sage", kind: "overview", seconds: 94, published: "2024-02-27" },
  ],
  "sage-50cloud-pastel": [{ id: "gP0ieqZ-OCU", label: "How journals work in Sage 50cloud Pastel Accounting", channel: "sageSupport", kind: "how to", seconds: 253, published: "2020-08-26", sa: true }],
  "sage-intacct": [{ id: "9s_DCXtpMrw", label: "Introducing Sage Intacct", channel: "sage", kind: "overview", seconds: 73, published: "2025-06-16" }],

  /* --------------------------------------------------------------- payroll */
  simplepay: [
    { id: "WspnmyJQd0g", label: "An introduction to SimplePay", channel: "simplepay", kind: "overview", seconds: 99, published: "2022-04-14", sa: true },
    { id: "-Erstj254cQ", label: "How SimplePay connects to QuickBooks", channel: "simplepay", kind: "feature", seconds: 80, published: "2023-09-25", sa: true },
  ],
  payspace: [
    { id: "NydbdQknShA", label: "PaySpace Lite for small business, accountants and bookkeepers", channel: "payspace", kind: "overview", seconds: 135, published: "2024-08-19", sa: true },
    { id: "7AoafigPTiA", label: "Employee self service overview", channel: "payspace", kind: "feature", seconds: 101, published: "2022-02-15", sa: true },
  ],
  "sage-payroll": [
    { id: "v3SvzxxcU0E", label: "How to create your first pay run", channel: "sageZA", kind: "how to", seconds: 294, published: "2023-06-29", sa: true },
    { id: "c7Jfo20tuvA", label: "How to pay employees", channel: "sageZA", kind: "how to", seconds: 131, published: "2023-06-29", sa: true },
    { id: "ag6sUT3ajXQ", label: "How to set up leave", channel: "sageZA", kind: "how to", seconds: 385, published: "2023-06-29", sa: true },
  ],
  "sage-pastel-payroll": [{ id: "rNIpqc1VO-8", label: "How to run the payroll", channel: "sageSupport", kind: "how to", seconds: 118, published: "2021-05-13", sa: true }],

  /* -------------------------------------------------------------------- hr */
  "sage-hr": [
    { id: "HnWJ4Bcs-x8", label: "Automating and streamlining HR tasks", channel: "sageHR", kind: "overview", seconds: 61, published: "2022-05-27" },
    { id: "OIcw1K6yvM0", label: "Timesheets", channel: "sageHR", kind: "feature", seconds: 73, published: "2022-05-27" },
    { id: "qW3A86WlIHE", label: "Employee performance management", channel: "sageHR", kind: "feature", seconds: 70, published: "2022-05-27" },
  ],
  peoplehr: [{ id: "GNy_TrKfVbU", label: "Common questions to answer before you get started", channel: "peoplehr", kind: "overview", seconds: 327, published: "2025-09-03" }],
  bamboohr: [
    { id: "PpGZ0cFQyjg", label: "Product overview", channel: "bamboohr", kind: "overview", seconds: 218, published: "2024-02-07" },
    { id: "KoKXjnAzET4", label: "One platform to make HR simpler", channel: "bamboohr", kind: "overview", seconds: 146, published: "2025-11-18" },
  ],
  personio: [{ id: "XWZSeTKi4Rw", label: "The intelligent HR platform", channel: "personio", kind: "overview", seconds: 51, published: "2025-04-25" }],
  labournet: [{ id: "TsCFNBxp17U", label: "Labournet Payroll, formerly PSIber", channel: "labournet", kind: "overview", seconds: 81, published: "2025-09-08", sa: true }],

  /* ------------------------------------------------------------------- crm */
  hubspot: [
    { id: "7L7nDEc2P14", label: "What HubSpot CRM is", channel: "hubspot", kind: "overview", seconds: 204, published: "2022-03-04" },
    { id: "GnIREMgz-SQ", label: "What HubSpot is, in just over a minute", channel: "hubspot", kind: "overview", seconds: 70, published: "2024-09-12" },
  ],
  pipedrive: [{ id: "iHZq78MUWms", label: "A quick demo of the CRM", channel: "pipedrive", kind: "overview", seconds: 403, published: "2024-03-04" }],
  freshsales: [{ id: "KehhQcMhOYE", label: "What Freshsales is", channel: "freshworks", kind: "overview", seconds: 223, published: "2024-06-10" }],
  "zoho-crm": [{ id: "0yVgZWgR2dQ", label: "Overview and demo", channel: "zohoCrm", kind: "overview", seconds: 246, published: "2025-07-09" }],
  "salesforce-sales-cloud": [{ id: "TUXh42V_ng4", label: "What Salesforce is", channel: "salesforce", kind: "overview", seconds: 531, published: "2024-07-08" }],
  "sage-crm": [{ id: "qBNl7s_nG5w", label: "An overview of the standard Sage CRM product", channel: "sageSupport", kind: "overview", seconds: 288, published: "2024-01-02" }],

  /* ------------------------------------------------------------------- erp */
  syspro: [
    { id: "_xDnAwleGgQ", label: "What ERP is and what SYSPRO does", channel: "syspro", kind: "overview", seconds: 212, published: "2022-06-06" },
    { id: "nZNPgC0eyHk", label: "ERP for supply chain management", channel: "syspro", kind: "feature", seconds: 243, published: "2022-03-06" },
  ],
  "sap-business-one": [{ id: "QSmlGqkKmWs", label: "Solution overview", channel: "sapB1", kind: "overview", seconds: 160, published: "2024-05-16" }],
  netsuite: [
    { id: "hvtBOVOUPNA", label: "What NetSuite ERP is and how it works", channel: "netsuite", kind: "overview", seconds: 85, published: "2021-05-20" },
    { id: "TkW0OIoHBg8", label: "Dashboard overview", channel: "netsuite", kind: "feature", seconds: 142, published: "2022-02-09" },
  ],
  acumatica: [{ id: "a9rLDS7bS2Q", label: "Cloud ERP overview", channel: "acumatica", kind: "overview", seconds: 434, published: "2025-01-08" }],
  odoo: [
    { id: "nbso3NVz3p8", label: "What Odoo is, in two minutes", channel: "odoo", kind: "overview", seconds: 146, published: "2023-11-29" },
    { id: "CZOXYz73gZM", label: "Getting started with Odoo Accounting", channel: "odoo", kind: "how to", seconds: 438, published: "2025-12-23" },
  ],
  "sage-200-evolution": [{ id: "8c88qV-psmc", label: "General ledger journals", channel: "sageSupport", kind: "how to", seconds: 649, published: "2022-02-27", sa: true }],
  "sage-x3": [
    { id: "L-9kI9wWOw4", label: "Sage X3 for distribution", channel: "sageUSA", kind: "overview", seconds: 116, published: "2026-08-05" },
    { id: "_G8BetzCpk4", label: "Sage X3 for discrete manufacturing", channel: "sageUSA", kind: "overview", seconds: 126, published: "2026-08-05" },
  ],

  /* ---------------------------------------------------- project management */
  asana: [
    { id: "hcY-2Xux2oI", label: "How to get started", channel: "asana", kind: "how to", seconds: 189, published: "2024-08-30" },
    { id: "r5QdECL9e6c", label: "What Asana is", channel: "asana", kind: "overview", seconds: 96, published: "2024-01-08" },
  ],
  clickup: [
    { id: "eSttHNrokmg", label: "Getting started with ClickUp Home", channel: "clickup", kind: "how to", seconds: 480, published: "2026-02-17" },
    { id: "nU41rM7zZns", label: "ClickUp 4.0 overview", channel: "clickup", kind: "overview", seconds: 104, published: "2025-12-10" },
  ],
  "monday-com": [{ id: "UMZeynogqqc", label: "How to get started", channel: "monday", kind: "how to", seconds: 210, published: "2025-06-17" }],
  smartsheet: [
    { id: "M4o1L3s5nW0", label: "Smartsheet overview", channel: "smartsheet", kind: "overview", seconds: 426, published: "2025-11-12" },
    { id: "RthO_mnO6Os", label: "Welcome to Smartsheet", channel: "smartsheet", kind: "overview", seconds: 92, published: "2021-09-22" },
  ],
  trello: [{ id: "B7mCqpFfawg", label: "A quick tour of the new Trello", channel: "trello", kind: "overview", seconds: 136, published: "2025-04-28" }],
  wrike: [{ id: "5wF9qrC6bXg", label: "What Wrike is, with a demo", channel: "wrike", kind: "overview", seconds: 191, published: "2023-08-22" }],
};

export function videosFor(slug: string): ProductVideo[] {
  return PRODUCT_VIDEOS[slug] ?? [];
}

export function channelOf(v: ProductVideo): VideoChannel {
  return CHANNELS[v.channel];
}

/** 1:52 or 16:16. */
export function durationLabel(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export const KIND_LABEL: Record<VideoKind, string> = {
  overview: "Overview",
  "how to": "How to",
  feature: "Feature",
  "customer story": "Customer story",
};
