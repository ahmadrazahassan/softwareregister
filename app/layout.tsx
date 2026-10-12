import type { Metadata, Viewport } from "next";
import { Google_Sans, IBM_Plex_Mono, Inter } from "next/font/google";
import { JsonLd, organizationLd, websiteLd } from "@/lib/seo";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site";
import "./globals.css";

const googleSans = Google_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-google-sans",
  display: "swap",
  // Google Sans has no override metrics in Next's font data, so skip computing a fallback instead of warning on every build.
  adjustFontFallback: false,
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const DESCRIPTION =
  "A South African register of what business software costs in rand and whether it files with SARS. Prices, features, bank feeds and VAT201, EMP501 and IRP5 filing, read from the vendors on a date.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME}: ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "en_ZA",
    siteName: SITE_NAME,
    title: `${SITE_NAME}: ${SITE_TAGLINE}`,
    description: DESCRIPTION,
    url: SITE_URL,
  },
  twitter: { card: "summary", title: `${SITE_NAME}: ${SITE_TAGLINE}`, description: DESCRIPTION },
  alternates: { canonical: "/" },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export const viewport: Viewport = {
  themeColor: "#fbfbf9",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-ZA" className={`${googleSans.variable} ${inter.variable} ${plexMono.variable}`}>
      <body>
        {children}
        <JsonLd data={[organizationLd(), websiteLd()]} />
      </body>
    </html>
  );
}
