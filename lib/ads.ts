import { IMPACT_CAMPAIGN_ID, IMPACT_MEDIA_PARTNER_ID, SAGE_AFFILIATE_URL } from "./affiliates";

/**
 * Sponsored units.
 *
 * Every unit renders under a visible "Sponsored" label and is kept apart from
 * the register. A paid placement must be identified.
 *
 * The Impact programme carries seven display creatives under media partner
 * 7649214 and campaign 34654. Their image URLs live in the Impact dashboard and
 * are not in this repository, so the unit below is a text creative. To add an
 * image creative, add an entry with `image` set and the leaderboard renders it.
 */
export type AdSlot = "leaderboard";

export interface AdCreative {
  id: string;
  slot: AdSlot;
  advertiser: string;
  headline: string;
  body: string;
  cta: string;
  href: string;
  /** Optional Impact display creative. Remote images are not whitelisted yet. */
  image?: { src: string; width: number; height: number; alt: string };
}

export const IMPACT = { mediaPartnerId: IMPACT_MEDIA_PARTNER_ID, campaignId: IMPACT_CAMPAIGN_ID } as const;

export const AD_CREATIVES: AdCreative[] = [
  {
    id: "sage-za-text",
    slot: "leaderboard",
    advertiser: "Sage South Africa",
    headline: "Accounting, payroll and HR from Sage.",
    body: "Sage sells cloud accounting, payroll and HR to South African businesses. Prices for four Sage products are on the register.",
    cta: "Visit Sage South Africa",
    href: SAGE_AFFILIATE_URL,
  },
];

export function creativeFor(slot: AdSlot): AdCreative | null {
  return AD_CREATIVES.find((c) => c.slot === slot) ?? null;
}
