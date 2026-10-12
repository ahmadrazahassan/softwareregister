import type { EditorialComparison } from "../../types";
import { FINANCE_COMPARISONS } from "./comparisons-finance";
import { OPERATIONS_COMPARISONS } from "./comparisons-operations";
import { PEOPLE_COMPARISONS } from "./comparisons-people";

/**
 * Long form comparisons of the pairs the register publishes in full, written
 * from the vendors' own pages. One file per group keeps each one readable. A
 * pair with no entry here simply shows no write up, and the side by side table
 * still stands on its own.
 *
 * The long form product reviews that used to sit beside these were removed on
 * 2026-10-11. Their text is kept in archive/removed-reviews.
 */
const COMPARISONS: EditorialComparison[] = [...FINANCE_COMPARISONS, ...PEOPLE_COMPARISONS, ...OPERATIONS_COMPARISONS];
const COMPARISON_BY_SLUG = new Map(COMPARISONS.map((c) => [c.slug, c]));

export function getEditorialComparison(pair: string): EditorialComparison | undefined {
  return COMPARISON_BY_SLUG.get(pair);
}

export const EDITORIAL_COUNT = { comparisons: COMPARISONS.length };
