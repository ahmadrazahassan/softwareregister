import type { Metadata } from "next";
import Link from "next/link";
import { LEGAL_UPDATED, LegalPage } from "@/components/LegalPage";
import { CONTACT_EMAIL, SITE_ADDRESS, SITE_FOUNDER, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = { title: "Terms of use", alternates: { canonical: "/terms" } };

export default function TermsPage() {
  return (
    <LegalPage title="Terms of use" updated={LEGAL_UPDATED}>
      <p>
        These terms govern your use of {SITE_NAME}. By using the site you accept them. If you do not accept them, do not use the site.
      </p>

      <h2>Who publishes this site</h2>
      <p>
        {SITE_NAME} is published by {SITE_FOUNDER}, at {SITE_ADDRESS}. You can reach us at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>

      <h2>Information, not advice</h2>
      <p>
        The register and the briefings are information. They are not financial, tax, accounting, legal or labour law advice. Statutory rules such as VAT, PAYE, UIF, SDL and the BCEA change, and your circumstances are your own. Speak to a registered tax practitioner, an accountant or a labour lawyer before you rely on anything here to decide a compliance question.
      </p>

      <h2>Accuracy of prices and records</h2>
      <p>
        A price on the register is the vendor&apos;s published list price, read on the date shown beside it. Vendors change prices without telling us. Always confirm the price and the VAT basis with the vendor before you buy. We work to keep the register correct and we correct confirmed errors, but we do not guarantee that any entry is complete, current or free of error.
      </p>

      <h2>Affiliate links and sponsored units</h2>
      <p>
        Some links on this site are affiliate links, and some units are sponsored. We earn a commission when a reader buys through an affiliate link. It does not change what we publish. Read the <Link href="/affiliate-disclosure">affiliate disclosure</Link>.
      </p>

      <h2>Reviews and what you send us</h2>
      <p>
        If you submit a review or an enquiry you confirm that it is your own, that it is honest, and that it does not defame anyone or break the law. You give us a free licence to publish a review you submit on this site. We read every review before it appears and we may decline to publish one. We may remove a review that breaks these terms.
      </p>

      <h2>How you may use the register</h2>
      <p>
        You may read the site, quote figures from it with attribution and a link, and share links to it. You may not copy the register or republish its data in bulk without our written permission. You may not scrape the site at a rate that harms it, probe it for weaknesses, or try to get around any security measure.
      </p>

      <h2>Names, logos and trade marks</h2>
      <p>
        Product names, vendor names and trade marks on the register belong to their owners. Their appearance here is to identify the product and does not imply endorsement by, or any relationship with, that owner beyond the affiliate relationships we disclose.
      </p>

      <h2>Limit of our liability</h2>
      <p>
        To the extent the law allows, we are not liable for any loss that comes from relying on the site, from a price or record being out of date, or from a vendor&apos;s product or service. Nothing in these terms limits a right you have under the Consumer Protection Act 68 of 2008 or any other law that cannot be limited by agreement.
      </p>

      <h2>Law that applies</h2>
      <p>These terms are governed by the law of the Republic of South Africa, and the courts of South Africa have jurisdiction over any dispute about them.</p>

      <h2>Changes</h2>
      <p>We may change these terms. The date at the top shows when they were last updated. If you keep using the site after a change, you accept the new terms.</p>

      <h2>Contact</h2>
      <p>
        Questions about these terms go to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </LegalPage>
  );
}
