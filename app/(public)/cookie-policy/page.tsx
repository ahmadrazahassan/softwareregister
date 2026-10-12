import type { Metadata } from "next";
import Link from "next/link";
import { LEGAL_UPDATED, LegalPage } from "@/components/LegalPage";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = { title: "Cookie policy", alternates: { canonical: "/cookie-policy" } };

export default function CookiePolicyPage() {
  return (
    <LegalPage title="Cookie policy" updated={LEGAL_UPDATED}>
      <p>The public pages of this site set no cookies. There is no cookie banner because there is nothing to consent to.</p>

      <h2>What we set</h2>
      <ul>
        <li>
          <strong>Public pages.</strong> No cookies, and nothing stored in your browser.
        </li>
        <li>
          <strong>The administration area.</strong> Signed in staff receive authentication cookies that keep them signed in. They are strictly necessary and they are set only after a staff sign in. Readers never receive them.
        </li>
      </ul>

      <h2>What we do not use</h2>
      <p>
        We do not use advertising cookies, tracking pixels or third party analytics today. If that changes, this page will change before the new tool goes live, and where the law requires it we will ask you first.
      </p>

      <h2>Links that leave the site</h2>
      <p>
        When you follow a link to a vendor, the vendor&apos;s own site and the affiliate network that tracks the referral may set their own cookies. We do not control them. Read the <Link href="/affiliate-disclosure">affiliate disclosure</Link> and that site&apos;s own policy.
      </p>

      <h2>Questions</h2>
      <p>
        Write to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </LegalPage>
  );
}
