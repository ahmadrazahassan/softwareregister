/**
 * Brand facts. Every place that prints the publisher's name, address or
 * contact details reads from here. Swapping the brand is a change to this file
 * and to the mark in components/BrandMark.tsx.
 *
 * SOCIAL_LINKS is deliberately absent. Those accounts are not confirmed to
 * exist, and structured data naming profiles that do not exist points the
 * wrong way for a site whose only asset is trust.
 */
export const SITE_NAME = "Software Register";
export const SITE_DOMAIN = "softwareregister.co.za";
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? `https://${SITE_DOMAIN}`).replace(/\/$/, "");
export const SITE_TAGLINE = "What business software actually costs in rand";
export const SITE_KICKER = "SOFTWARE REGISTER";

export const CONTACT_EMAIL = "hello@softwareregister.co.za";
export const CONTACT_PHONE = "+27 66 577 3038";
export const CONTACT_PHONE_HREF = "tel:+27665773038";

export const SITE_FOUNDER = "Atif Raiz";
export const INFORMATION_OFFICER = "Atif Raiz";
/** Named contributors, shown on the About page only when there are any. */
export const CONTRIBUTORS: readonly string[] = [];

/** The registered address in parts, for the footer, the About page and structured data. */
export const ADDRESS_PARTS = {
  building: "5th Floor, Park Terraces",
  street: "Golf Park, Raapenberg Road",
  suburb: "Mowbray",
  city: "Cape Town",
  region: "Western Cape",
  postcode: "7700",
  country: "South Africa",
  countryCode: "ZA",
} as const;

/** Lines for a postal address, top to bottom. */
export const ADDRESS_LINES = [
  ADDRESS_PARTS.building,
  ADDRESS_PARTS.street,
  `${ADDRESS_PARTS.suburb}, ${ADDRESS_PARTS.city} ${ADDRESS_PARTS.postcode}`,
  ADDRESS_PARTS.country,
] as const;

export const SITE_ADDRESS = `${ADDRESS_PARTS.building}, ${ADDRESS_PARTS.street}, ${ADDRESS_PARTS.suburb}, ${ADDRESS_PARTS.city}, ${ADDRESS_PARTS.postcode}, ${ADDRESS_PARTS.country}`;
export const SITE_MAP_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE_ADDRESS)}`;
export const SITE_LOCALE = "en-ZA";

/** South African standard rate. */
export const VAT_RATE = 0.15;
export const VAT_PERCENT = Math.round(VAT_RATE * 100);

export const NEWSLETTER_INTERESTS = [
  { value: "prices", label: "Price changes" },
  { value: "withdrawn", label: "Products withdrawn" },
  { value: "sars", label: "SARS filing changes" },
  { value: "briefings", label: "New briefings" },
] as const;

export const PUBLICATION_START = "2026-10-05";
