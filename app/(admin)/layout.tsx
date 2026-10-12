import type { Metadata } from "next";

/** The admin area is never indexed, and never cached by a shared cache. */
export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | Software Register admin" },
  robots: { index: false, follow: false, nocache: true },
};

export const dynamic = "force-dynamic";

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
