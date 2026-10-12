import type { Comparison } from "../types";

/**
 * The curated head to head pairs. The pair slug is `{a}-vs-{b}`. Any other pair
 * of products can still be compared through the selector on /versus, and is
 * computed from the same data, but only these appear in lists and the sitemap.
 */
const PAIRS: [string, string][] = [
  ["sage-accounting", "xero"],
  ["xero", "quickbooks-online"],
  ["sage-accounting", "quickbooks-online"],
  ["zoho-books", "xero"],
  ["simplepay", "payspace"],
  ["sage-payroll", "simplepay"],
  ["sage-hr", "bamboohr"],
  ["hubspot", "pipedrive"],
  ["zoho-crm", "hubspot"],
  ["salesforce-sales-cloud", "hubspot"],
  ["syspro", "sap-business-one"],
  ["netsuite", "acumatica"],
  ["asana", "monday-com"],
  ["clickup", "trello"],
  ["smartsheet", "wrike"],
];

export const COMPARISONS: Comparison[] = PAIRS.map(([a, b]) => ({ slug: `${a}-vs-${b}`, a, b }));

export function parsePairSlug(pair: string): { a: string; b: string } | null {
  const parts = pair.split("-vs-");
  if (parts.length !== 2 || !parts[0] || !parts[1] || parts[0] === parts[1]) return null;
  return { a: parts[0], b: parts[1] };
}
