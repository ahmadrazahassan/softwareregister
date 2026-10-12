/**
 * The choices a reader makes when they write a review. Shared by the form, the
 * server action that checks it and the page that shows the review, so the three
 * cannot drift apart. Nothing here is a score: every field describes the
 * reader's own situation, and none of it is averaged, counted into a rating or
 * used to rank a product. Copy contains no hyphens and no dashes.
 */

export const TIME_USED = ["Free trial only", "Less than six months", "Six to twelve months", "One to two years", "More than two years"] as const;
export type TimeUsed = (typeof TIME_USED)[number];

export const REASONS = [
  "Price",
  "A free plan or trial",
  "Local support",
  "SARS and VAT features",
  "Ease of use",
  "Works with my bank",
  "Works with my other software",
  "My accountant recommended it",
  "The features it has",
  "My business already used it",
] as const;
export type Reason = (typeof REASONS)[number];

export const MAX_REASONS = 4;
export const MAX_ALTERNATIVES = 3;

/** Field limits, in characters. The database checks the same numbers. */
export const REVIEW_LIMITS = {
  pros: 600,
  cons: 600,
  used_for: 160,
  plan_used: 80,
  switched_from: 100,
} as const;
