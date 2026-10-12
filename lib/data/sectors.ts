import type { Sector } from "../types";

export const SECTORS: Sector[] = [
  {
    slug: "accounting",
    name: "Accounting",
    label: "Accounting software",
    description: "Bookkeeping, invoicing, VAT and bank reconciliation.",
    sort: 1,
  },
  {
    slug: "erp",
    name: "ERP",
    label: "ERP software",
    description: "Accounting, stock, manufacturing and purchasing in one system.",
    sort: 2,
  },
  {
    slug: "payroll",
    name: "Payroll",
    label: "Payroll software",
    description: "Salaries, PAYE, UIF, SDL and the SARS returns that follow.",
    sort: 3,
  },
  {
    slug: "hr",
    name: "HR",
    label: "HR software",
    description: "Employee records, leave and onboarding under the BCEA.",
    sort: 4,
  },
  {
    slug: "crm",
    name: "CRM",
    label: "CRM software",
    description: "Sales pipelines and customer records.",
    sort: 5,
  },
  {
    slug: "project-management",
    name: "Project management",
    label: "Project management software",
    description: "Tasks, boards and delivery tracking for teams.",
    sort: 6,
  },
];

/**
 * What the compliance matrix on a sector page measures. An item appears here
 * only if it applies to the sector. Everything else renders as Minus.
 */
export const SECTOR_COMPLIANCE: Record<string, string[]> = {
  accounting: ["VAT201", "POPIA"],
  erp: ["VAT201", "EMP201", "POPIA"],
  payroll: ["EMP201", "EMP501", "IRP5", "IT3(a)", "e@syFile", "UIF", "SDL", "ETI", "POPIA"],
  hr: ["BCEA leave", "UIF", "POPIA"],
  crm: ["POPIA"],
  "project-management": ["POPIA"],
};

/** Items that describe what is filed with SARS. */
export const SARS_ITEMS = ["VAT201", "EMP201", "EMP501", "IRP5", "IT3(a)", "e@syFile"] as const;

/** Statutory and legal items that are not SARS returns. */
export const LEGAL_ITEMS = ["UIF", "SDL", "ETI", "BCEA leave", "POPIA"] as const;

/** Entries that mean a product can transfer into SARS eFiling or e@syFile. */
export const SARS_TRANSFER_ITEMS = ["eFiling", "e@syFile"] as const;

/** The banks the register asks about, in the order the register prints them. */
export const BANKS = [
  "Capitec",
  "FNB",
  "Absa",
  "Standard Bank",
  "Nedbank",
  "TymeBank",
  "Investec",
  "Discovery Bank",
] as const;
