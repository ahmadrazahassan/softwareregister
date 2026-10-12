import type { NextConfig } from "next";

/**
 * Permanent 308 redirects from every legacy path to its new route.
 *
 * These live here and not in the database redirect table on purpose. That
 * table is only consulted when Supabase is configured, and the site must keep
 * its old URLs alive when it is not.
 *
 * Order matters: the first match wins, so the specific Sage payroll rename sits
 * ahead of the generic /software rule.
 */
const legacyRedirects = [
  // Sage renamed Sage Business Cloud Payroll to Sage Payroll, so the slug followed.
  { source: "/software/sage-business-cloud-payroll", destination: "/register/sage-payroll" },
  { source: "/software/sage-business-cloud-payroll/:path*", destination: "/register/sage-payroll/:path*" },
  { source: "/compare/:before-vs-sage-business-cloud-payroll", destination: "/versus/:before-vs-sage-payroll" },
  { source: "/compare/sage-business-cloud-payroll-vs-:after", destination: "/versus/sage-payroll-vs-:after" },

  { source: "/software", destination: "/register" },
  { source: "/software/:path*", destination: "/register/:path*" },
  { source: "/categories", destination: "/sectors" },
  { source: "/category/:slug", destination: "/sector/:slug" },
  { source: "/compare", destination: "/versus" },
  { source: "/compare/:pair", destination: "/versus/:pair" },
  // The old site kept its guides under /blog. /blog is now the blog, so only the old guide slugs move.
  {
    source: "/blog/:slug(what-software-costs-in-rand|including-and-excluding-vat|how-to-ask-for-a-quote|free-tiers-on-the-register|vat-and-the-vat201-return|payroll-returns-emp201-emp501-irp5|bcea-leave-what-hr-software-must-accrue|bank-feeds-by-bank)",
    destination: "/briefings/:slug",
  },
  // The guide on billing currency was withdrawn on 2026-10-11.
  { source: "/briefings/rand-exposure-billed-in-rand-or-not", destination: "/briefings" },
  { source: "/blog/rand-exposure-billed-in-rand-or-not", destination: "/briefings" },
  // Contact has one form for listings now.
  { source: "/list-your-software", destination: "/add-a-product" },
  { source: "/editorial-policy", destination: "/method" },
  { source: "/about", destination: "/masthead" },
  { source: "/contact", destination: "/enquiries" },
  { source: "/newsletter", destination: "/dispatch" },
  { source: "/newsletter/unsubscribe", destination: "/dispatch/unsubscribe" },
  { source: "/search", destination: "/lookup" },
  // The reviews hub was removed with the ratings on 2026-10-11. Product pages keep their own reader reviews.
  { source: "/reviews", destination: "/register" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Lets a verification build run beside a live dev server without touching its cache: NEXT_DIST_DIR=.next-verify next build
  distDir: process.env.NEXT_DIST_DIR || ".next",
  poweredByHeader: false,
  async redirects() {
    return legacyRedirects.map((r) => ({ ...r, permanent: true }));
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
