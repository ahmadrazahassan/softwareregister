import type { Software } from "./types";

/**
 * The one live programme: Sage South Africa on Impact. Applications are out to
 * Xero, FreshBooks, ClickUp and PartnerStack. None of those links exist yet, so
 * none appear here.
 */
export const SAGE_AFFILIATE_URL = "https://sagesouthafrica.pxf.io/dyq0qK";
export const IMPACT_MEDIA_PARTNER_ID = "7649214";
export const IMPACT_CAMPAIGN_ID = "34654";

/** Hosts that are known affiliate network tracking domains. */
const NETWORK_HOSTS = [
  "pxf.io",
  "sjv.io",
  "ojrq.net",
  "evyy.net",
  "7eer.net",
  "impactradius.com",
  "partnerstack.com",
  "getrewardful.com",
  "shareasale.com",
  "awin1.com",
];

export function isNetworkAffiliateLink(url: string | null | undefined): boolean {
  if (!url) return false;
  try {
    const host = new URL(url).hostname.toLowerCase();
    return NETWORK_HOSTS.some((h) => host === h || host.endsWith(`.${h}`));
  } catch {
    return false;
  }
}

export function isSageProduct(s: Pick<Software, "vendor" | "slug">): boolean {
  return /^sage\b/i.test(s.vendor) || s.slug.startsWith("sage-");
}

export type AffiliatePlacement =
  | "record-masthead"
  | "record-footer"
  | "versus-verdict"
  | "versus-matrix"
  | "sponsored-leaderboard"
  | "briefing-products";

export interface OutboundLink {
  href: string;
  /** True when the link earns a commission and must carry the disclosure. */
  affiliate: boolean;
}

/** The href a "Visit" button should use. Affiliate link when one exists, else the vendor's own site. */
export function outboundLink(s: Pick<Software, "affiliate_url" | "website_url">): OutboundLink | null {
  if (s.affiliate_url) return { href: s.affiliate_url, affiliate: true };
  if (s.website_url) return { href: s.website_url, affiliate: false };
  return null;
}

export const AFFILIATE_DISCLOSURE_SHORT =
  "Affiliate link. We earn if you buy. It does not change what we publish.";

/**
 * Where a plan button should go: the vendor's own pricing page, the page the
 * price was read from, so a reader lands on the plan they just looked at. An
 * affiliate link, where one exists, wins. Falls back to the vendor's site.
 */
export function pricingLink(s: Pick<Software, "affiliate_url" | "website_url" | "vendor_website">): OutboundLink | null {
  if (s.affiliate_url) return { href: s.affiliate_url, affiliate: true };
  if (s.vendor_website) {
    try {
      const url = new URL(/^https?:\/\//i.test(s.vendor_website) ? s.vendor_website : `https://${s.vendor_website}`);
      if (url.hostname.includes(".")) return { href: url.toString(), affiliate: false };
    } catch {
      // Fall through to the vendor's site.
    }
  }
  return outboundLink(s);
}
