import { ADDRESS_PARTS, CONTACT_EMAIL, CONTACT_PHONE_HREF, SITE_FOUNDER, SITE_NAME, SITE_URL } from "./site";
import type { Briefing, PricedSoftware } from "./types";

type Json = Record<string, unknown>;

/** Renders a JSON-LD block. "<" is escaped so a stray "</script>" in data cannot break out. */
export function JsonLd({ data }: { data: Json | Json[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Deliberately no sameAs. We do not name social profiles that are not
 * confirmed to exist, because structured data that points at nothing is a
 * trust signal facing the wrong way.
 */
export function organizationLd(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/brand/softwareregister-mark.svg`,
    email: CONTACT_EMAIL,
    telephone: CONTACT_PHONE_HREF.replace("tel:", ""),
    founder: { "@type": "Person", name: SITE_FOUNDER },
    address: {
      "@type": "PostalAddress",
      streetAddress: `${ADDRESS_PARTS.building}, ${ADDRESS_PARTS.street}, ${ADDRESS_PARTS.suburb}`,
      addressLocality: ADDRESS_PARTS.city,
      addressRegion: ADDRESS_PARTS.region,
      postalCode: ADDRESS_PARTS.postcode,
      addressCountry: ADDRESS_PARTS.countryCode,
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: CONTACT_EMAIL,
      telephone: CONTACT_PHONE_HREF.replace("tel:", ""),
      areaServed: "ZA",
      availableLanguage: "en",
    },
  };
}

export function websiteLd(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "en-ZA",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/lookup?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** Structured data for a product page. It carries the price and nothing about ratings: the register publishes none. */
export function softwareLd(s: PricedSoftware): Json {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: s.name,
    description: s.summary,
    applicationCategory: "BusinessApplication",
    url: absoluteUrl(`/register/${s.slug}`),
    publisher: { "@type": "Organization", name: s.vendor },
    ...(s.starting_price !== null && s.price_currency
      ? {
          offers: {
            "@type": "Offer",
            price: s.starting_price,
            priceCurrency: s.price_currency,
            ...(s.price_checked_at ? { priceValidUntil: undefined } : {}),
          },
        }
      : {}),
  };
}

export function blogPostLd(p: { slug: string; title: string; standfirst: string; published_at: string; author: string }): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    description: p.standfirst,
    datePublished: p.published_at,
    author: { "@type": "Organization", name: p.author },
    publisher: { "@type": "Organization", name: SITE_NAME, logo: { "@type": "ImageObject", url: absoluteUrl("/brand/softwareregister-mark.svg") } },
    mainEntityOfPage: absoluteUrl(`/blog/${p.slug}`),
    inLanguage: "en-ZA",
  };
}

export function articleLd(b: Briefing): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: b.title,
    datePublished: b.published_at,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME },
    mainEntityOfPage: absoluteUrl(`/briefings/${b.slug}`),
    inLanguage: "en-ZA",
  };
}

/** Structured data for a list of questions and answers. */
export function faqLd(items: { q: string; a: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "en-ZA",
    mainEntity: items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
  };
}

/** Structured data for a vendor's own video that plays in an embedded player on a review. */
export function videoLd(v: { id: string; name: string; description: string; uploadDate: string; seconds: number }): Json {
  const m = Math.floor(v.seconds / 60);
  const s = v.seconds % 60;
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: v.name,
    description: v.description,
    thumbnailUrl: [`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`],
    uploadDate: v.uploadDate,
    duration: `PT${m}M${s}S`,
    embedUrl: `https://www.youtube-nocookie.com/embed/${v.id}`,
    contentUrl: `https://www.youtube.com/watch?v=${v.id}`,
    inLanguage: "en",
  };
}

/** Structured data for a list of products, in the order the page shows them. */
export function itemListLd(name: string, items: { name: string; path: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    inLanguage: "en-ZA",
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, url: absoluteUrl(it.path) })),
  };
}

/** Structured data for a glossary: each term with its meaning. */
export function definedTermSetLd(name: string, path: string, terms: { term: string; description: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name,
    url: absoluteUrl(path),
    inLanguage: "en-ZA",
    hasDefinedTerm: terms.map((t) => ({ "@type": "DefinedTerm", name: t.term, description: t.description })),
  };
}
