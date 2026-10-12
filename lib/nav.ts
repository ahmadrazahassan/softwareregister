/**
 * Navigation, in plain words.
 *
 * The URLs do not change, so every link and every redirect keeps working.
 * Only the words a reader sees are plain: Software, Compare, Guides, About,
 * Contact. Page titles, breadcrumbs, the header and the footer all read from
 * here, so a reader is never told they are on a page called something else.
 */
export const NAV = {
  software: { label: "Software", title: "All software", href: "/register", match: ["/register", "/sectors", "/sector"] },
  compare: { label: "Compare", title: "Compare software", href: "/versus", match: ["/versus"] },
  guides: { label: "Guides", title: "Guides", href: "/briefings", match: ["/briefings"] },
  resources: { label: "Resources", title: "Resources", href: "/blog", match: ["/blog", "/briefings", "/method"] },
  blog: { label: "Blog", title: "Blog", href: "/blog", match: ["/blog"] },
  write: { label: "Write a review", title: "Write a review", href: "/write-a-review", match: ["/write-a-review"] },
  // Vendors add a product through the contact form, which opens on its listing subject.
  add: { label: "Add a product", title: "Add a product", href: "/add-a-product", match: ["/add-a-product"] as string[] },
  about: { label: "About", title: "About us", href: "/masthead", match: ["/masthead", "/method"] },
  contact: { label: "Contact", title: "Contact us", href: "/enquiries", match: ["/enquiries"] },
} as const;

/** Links that sit below the main five: the footer and the mobile menu carry these. */
export const EXTRA = {
  method: { label: "How it works", title: "How the register works", href: "/method" },
  alerts: { label: "Price alerts", title: "Price alerts", href: "/dispatch" },
  search: { label: "Search", title: "Search", href: "/lookup" },
  categories: { label: "Categories", title: "Categories", href: "/sectors" },
  listing: { label: "List your software", title: "List your software", href: "/add-a-product" },
  finder: { label: "Build a shortlist", title: "Build a software shortlist", href: "/finder" },
  shortlist: { label: "Shortlist", title: "Your shortlist", href: "/shortlist" },
  lists: { label: "Lists", title: "Lists of software", href: "/lists" },
  glossary: { label: "Glossary", title: "Glossary of South African terms", href: "/glossary" },
  faq: { label: "FAQ", title: "Frequently asked questions", href: "/faq" },
  vendors: { label: "For vendors", title: "For software vendors", href: "/vendors" },
  guidelines: { label: "Review guidelines", title: "Review guidelines", href: "/review-guidelines" },
  correction: { label: "Suggest a correction", title: "Suggest a correction", href: "/suggest-a-correction" },
} as const;

/** The two actions the site wants a reader to take. */
export const CTA = {
  browse: { label: "Browse all software", short: "Browse", href: "/register" },
  compare: { label: "Compare two products", short: "Compare", href: "/versus" },
} as const;
