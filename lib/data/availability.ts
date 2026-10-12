/**
 * Whether a product is sold and supported in South Africa, product by product.
 *
 * Each note says what the vendor's own pages showed: a South African site, rand
 * pricing, a local phone line, or South African origin. A product counts as
 * sold in South Africa when it has at least one of those. Every other product is
 * available to South African businesses online, with its price shown here in
 * rand. The notes are written for a South African reader and say only what a
 * page shows.
 */
export type SaStatus = "local" | "global";

export interface SaAvailability {
  status: SaStatus;
  /** One sentence, written for a South African reader. */
  note: string;
}

export const SA_STATUS_LABEL: Record<SaStatus, string> = {
  local: "Sold in South Africa",
  global: "Available to South African buyers",
};

export const SA_STATUS_ORDER: SaStatus[] = ["local", "global"];

const ONLINE = "Available to South African businesses online, with the price shown here in rand.";

export const SA_AVAILABILITY: Record<string, SaAvailability> = {
  // Sage South Africa. Every product below has its own page on sage.com/en-za and is sold and supported locally.
  "sage-accounting": {
    status: "local",
    note: "Sold and supported by Sage South Africa. Priced in rand including VAT, with a local phone line and direct bank feeds with FNB, Nedbank and Investec.",
  },
  "sage-50cloud-pastel": {
    status: "local",
    note: "Sage South Africa's own desktop accounting product, priced in rand and supported on a local phone line.",
  },
  "sage-intacct": {
    status: "local",
    note: "Launched in South Africa by Sage South Africa in 2020, with South African VAT and statutory reporting, according to Sage's Africa pages.",
  },
  "sage-payroll": {
    status: "local",
    note: "Sage South Africa's cloud payroll, priced in rand including VAT and built around PAYE, UIF, SDL, EMP201, EMP501 and IRP5.",
  },
  "sage-pastel-payroll": {
    status: "local",
    note: "Desktop payroll from Sage South Africa, still receiving South African legislative updates.",
  },
  "sage-hr": {
    status: "local",
    note: "Sold by Sage South Africa with a South African pricing page in rand, a 30 day trial and local support.",
  },
  "sage-crm": {
    status: "local",
    note: "Sold by Sage South Africa to its business management customers, with a South African callback service.",
  },
  "sage-200-evolution": {
    status: "local",
    note: "A Sage South Africa ERP. VAT201 submission to SARS is available from version 11, and Sage sets it up through its Evolution business partners.",
  },
  "sage-x3": {
    status: "local",
    note: "Sold by Sage South Africa, which says local tax, accounting and regulatory requirements are handled as standard.",
  },

  // Other products with a South African site, rand pricing, a local line or South African origin.
  xero: {
    status: "local",
    note: "A South African Xero site with rand pricing including VAT, bank feeds from FNB, Absa, Standard Bank and Nedbank, and local apps such as PayFast, Yoco and SimplePay.",
  },
  "quickbooks-online": {
    status: "local",
    note: "A South African QuickBooks site with prices in rand, a local support number and free phone support with a paid plan.",
  },
  "zoho-books": {
    status: "local",
    note: "A South African Zoho Books site priced in rand, with VAT 201 reports and a South African support line.",
  },
  simplepay: {
    status: "local",
    note: "Built for South African employers: PAYE, UIF and SDL, with tax certificates for SARS e@syFile.",
  },
  payspace: {
    status: "local",
    note: "A South African payroll platform that also runs payroll in more than 45 countries.",
  },
  paysoft: {
    status: "local",
    note: "A South African payments company with a local phone line, SARS payments and Section 18A support.",
  },
  labournet: {
    status: "local",
    note: "A South African labour law and payroll firm, established in 1996 and serving more than 6,500 businesses.",
  },
  syspro: {
    status: "local",
    note: "A South African ERP company, founded in Johannesburg in 1978 and built for local manufacturers and distributors.",
  },
  smartsheet: {
    status: "local",
    note: "Smartsheet lists its Pro and Business plans in rand for South African customers.",
  },

  // Available to South African businesses online.
  "sap-business-one": {
    status: "global",
    note: "Sold to South African businesses through SAP's local partners, who set up VAT, eFiling and bank integration.",
  },
  netsuite: { status: "global", note: ONLINE },
  acumatica: {
    status: "global",
    note: "Acumatica lists South Africa among the countries it localises for.",
  },
  odoo: {
    status: "global",
    note: "Available to South African businesses, with local setup through Odoo partners.",
  },
  "zoho-crm": {
    status: "global",
    note: "Zoho runs a South African site, and the CRM has a free edition for three users.",
  },
  freshbooks: { status: "global", note: ONLINE },
  hubspot: { status: "global", note: ONLINE },
  pipedrive: { status: "global", note: ONLINE },
  freshsales: { status: "global", note: ONLINE },
  "salesforce-sales-cloud": {
    status: "global",
    note: "Available to South African businesses, with a network of Salesforce partners in South Africa.",
  },
  asana: { status: "global", note: ONLINE },
  clickup: { status: "global", note: ONLINE },
  "monday-com": { status: "global", note: ONLINE },
  trello: { status: "global", note: ONLINE },
  wrike: { status: "global", note: ONLINE },
  "wave-accounting": {
    status: "global",
    note: "Free accounting and invoicing. Wave is run from North America, so its card payment and payroll add ons serve US and Canadian businesses.",
  },
  peoplehr: {
    status: "global",
    note: "HR records, absence and onboarding for any location. PeopleHR's payroll plans are built for the United Kingdom.",
  },
  bamboohr: {
    status: "global",
    note: "HR records, hiring and performance for any location. BambooHR's payroll and benefits add ons are for US employees.",
  },
  personio: {
    status: "global",
    note: "An HR suite sold across Europe, with pricing given in a demo.",
  },
};

export function saAvailability(slug: string): SaAvailability {
  return SA_AVAILABILITY[slug] ?? { status: "global", note: ONLINE };
}
