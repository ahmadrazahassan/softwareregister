import { saAvailability } from "./data/availability";
import { BANKS, LEGAL_ITEMS, SARS_ITEMS, SECTOR_COMPLIANCE } from "./data/sectors";
import { basisLabel, formatDateStamp, priceLabel } from "./format";
import { matrixCell, sarsStatus, type MatrixCell } from "./registry";
import type { PricedSoftware } from "./types";

export type VCell = { type: "text"; text: string; muted?: boolean } | { type: "mark"; cell: MatrixCell };

export interface VRow {
  label: string;
  a: VCell;
  b: VCell;
  /** Which side wins this row, if either does. */
  win: "a" | "b" | null;
}

export interface VGroup {
  title: string;
  rows: VRow[];
}

const text = (t: string, muted = false): VCell => ({ type: "text", text: t, muted });
const mark = (cell: MatrixCell): VCell => ({ type: "mark", cell });

function higher(a: number, b: number): "a" | "b" | null {
  return a === b ? null : a > b ? "a" : "b";
}

const MARK_RANK: Record<MatrixCell, number> = { yes: 2, no: 1, unlisted: 0, na: 0 };

function markWin(a: MatrixCell, b: MatrixCell): "a" | "b" | null {
  return MARK_RANK[a] === MARK_RANK[b] ? null : MARK_RANK[a] > MARK_RANK[b] ? "a" : "b";
}

/** Lower starting price wins, compared in rand, but only when both are on the same VAT footing. */
function cheaper(a: PricedSoftware, b: PricedSoftware): "a" | "b" | null {
  if (a.starting_price === null || b.starting_price === null) return null;
  if (a.price_basis !== b.price_basis && (a.price_basis?.includes("vat") || b.price_basis?.includes("vat"))) return null;
  const ra = a.price_rand ?? a.starting_price;
  const rb = b.price_rand ?? b.starting_price;
  return ra === rb ? null : ra < rb ? "a" : "b";
}

/**
 * A group of yes or no rows for items the vendors' pages list. The group is left
 * out when neither product lists anything, so a table never carries a column of
 * empty marks.
 */
function checklist(
  title: string,
  items: string[],
  a: PricedSoftware,
  b: PricedSoftware,
  read: (s: PricedSoftware) => string[] | null,
  summaryLabel: string,
): VGroup | null {
  const aData = read(a);
  const bData = read(b);
  if (aData === null && bData === null) return null;
  const summary = (data: string[] | null): VCell => (data === null ? mark("unlisted") : text(data.length ? `${data.length} listed` : "None listed", !data.length));
  const rows: VRow[] = [
    {
      label: summaryLabel,
      a: summary(aData),
      b: summary(bData),
      win: aData && bData ? higher(aData.length, bData.length) : null,
    },
  ];
  for (const item of items) {
    const ca: MatrixCell = aData === null ? "unlisted" : aData.includes(item) ? "yes" : "no";
    const cb: MatrixCell = bData === null ? "unlisted" : bData.includes(item) ? "yes" : "no";
    rows.push({ label: item, a: mark(ca), b: mark(cb), win: markWin(ca, cb) });
  }
  return { title, rows };
}

/**
 * The comparison matrix. Rows are grouped into Pricing, South Africa, SARS
 * filing, Bank feeds, Compliance, Features and Plans. The winning cell in a row
 * renders in --ink 600 and the loser in --muted 400, so a row can be read
 * without comparing numbers by eye. A group with nothing to say is left out.
 */
export function buildMatrix(a: PricedSoftware, b: PricedSoftware): VGroup[] {
  const pa = priceLabel(a);
  const pb = priceLabel(b);

  const pricing: VGroup = {
    title: "Pricing",
    rows: [
      {
        label: "Starting price",
        a: text(pa.kind === "quoted" ? "On request" : pa.amount, pa.kind === "quoted"),
        b: text(pb.kind === "quoted" ? "On request" : pb.amount, pb.kind === "quoted"),
        win: cheaper(a, b),
      },
      { label: "Basis", a: text(basisLabel(a.price_basis) || "Not applicable", !a.price_basis), b: text(basisLabel(b.price_basis) || "Not applicable", !b.price_basis), win: null },
    ],
  };
  if (a.price_checked_at || b.price_checked_at) {
    pricing.rows.push({
      label: "Price read",
      a: a.price_checked_at ? text(formatDateStamp(a.price_checked_at)) : mark("unlisted"),
      b: b.price_checked_at ? text(formatDateStamp(b.price_checked_at)) : mark("unlisted"),
      win: a.price_checked_at && b.price_checked_at ? (a.price_checked_at === b.price_checked_at ? null : a.price_checked_at > b.price_checked_at ? "a" : "b") : a.price_checked_at ? "a" : "b",
    });
  }

  const sa = (s: PricedSoftware) => saAvailability(s.slug).status;
  const southAfrica: VGroup = {
    title: "South Africa",
    rows: [
      {
        label: "Availability",
        a: text(sa(a) === "local" ? "Sold in South Africa" : "Available online"),
        b: text(sa(b) === "local" ? "Sold in South Africa" : "Available online"),
        win: sa(a) === sa(b) ? null : sa(a) === "local" ? "a" : "b",
      },
    ],
  };

  const applicable = new Set([...(SECTOR_COMPLIANCE[a.sector] ?? []), ...(SECTOR_COMPLIANCE[b.sector] ?? [])]);
  const sarsItems = SARS_ITEMS.filter((i) => applicable.has(i));
  const legalItems = LEGAL_ITEMS.filter((i) => applicable.has(i));

  const sars = checklist("SARS filing", sarsItems, a, b, (s) => (s.compliance === null ? null : s.compliance.filter((c) => (SARS_ITEMS as readonly string[]).includes(c) || c === "eFiling")), "SARS returns listed");
  if (sars) {
    const handles = (s: PricedSoftware): VCell => (sarsStatus(s) === "files" ? text("Yes") : mark("unlisted"));
    sars.rows.unshift({
      label: "Handles SARS returns",
      a: handles(a),
      b: handles(b),
      win: sarsStatus(a) === sarsStatus(b) ? null : sarsStatus(a) === "files" ? "a" : "b",
    });
  }

  const banks = checklist("Bank feeds", [...BANKS], a, b, (s) => s.bank_feeds, "Banks listed");
  const compliance = checklist("Compliance", legalItems, a, b, (s) => (s.compliance === null ? null : s.compliance.filter((c) => (LEGAL_ITEMS as readonly string[]).includes(c))), "Items listed");

  const featureUnion = [...new Set([...a.features, ...b.features])];
  const features: VGroup | null = featureUnion.length
    ? {
        title: "Features",
        rows: featureUnion.map((f) => {
          const ca: MatrixCell = a.features.includes(f) ? "yes" : "no";
          const cb: MatrixCell = b.features.includes(f) ? "yes" : "no";
          return { label: f, a: mark(ca), b: mark(cb), win: markWin(ca, cb) };
        }),
      }
    : null;

  const flag = (v: boolean | null): MatrixCell => (v === null ? "unlisted" : v ? "yes" : "no");
  const planRows: VRow[] = [
    { label: "Free trial", a: mark(flag(a.free_trial)), b: mark(flag(b.free_trial)), win: markWin(flag(a.free_trial), flag(b.free_trial)) },
    { label: "Free plan", a: mark(flag(a.free_plan)), b: mark(flag(b.free_plan)), win: markWin(flag(a.free_plan), flag(b.free_plan)) },
    { label: "Demo", a: mark(flag(a.demo)), b: mark(flag(b.demo)), win: markWin(flag(a.demo), flag(b.demo)) },
  ].filter((r) => !(r.a.type === "mark" && r.a.cell === "unlisted" && r.b.type === "mark" && r.b.cell === "unlisted"));
  const plans: VGroup | null = planRows.length ? { title: "Plans", rows: planRows } : null;

  return [pricing, southAfrica, sars, banks, compliance, features, plans].filter((g): g is VGroup => g !== null);
}

export { matrixCell };
