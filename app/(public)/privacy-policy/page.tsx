import type { Metadata } from "next";
import Link from "next/link";
import { LEGAL_UPDATED, LegalPage } from "@/components/LegalPage";
import { CONTACT_EMAIL, INFORMATION_OFFICER, SITE_ADDRESS, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy policy", alternates: { canonical: "/privacy-policy" } };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy" updated={LEGAL_UPDATED}>
      <p>
        This policy explains how {SITE_NAME} handles personal information under the Protection of Personal Information Act 4 of 2013, known as POPIA. We collect as little as we can and we do not sell it.
      </p>

      <h2>Who is responsible</h2>
      <p>
        {SITE_NAME}, {SITE_ADDRESS}, is the responsible party. Our information officer is {INFORMATION_OFFICER}. Write to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>

      <h2>What we collect, and why</h2>
      <ul>
        <li>
          <strong>Enquiries.</strong> Your name, email address and message, so we can answer you.
        </li>
        <li>
          <strong>Reviews.</strong> Your name, role, company size, industry and the text you write, so an editor can read it and, if it is approved, publish it.
        </li>
        <li>
          <strong>The Dispatch.</strong> Your email address, the topics you chose and the time you consented, so we can send you a note when a price changes or a product is withdrawn.
        </li>
        <li>
          <strong>Outbound clicks.</strong> When you follow a link to a vendor, we record which product, which placement on the page and a salted hash of your connection. This lets us see that an affiliate link works.
        </li>
        <li>
          <strong>Staff accounts.</strong> The email address and sign in details of the people who administer the site.
        </li>
      </ul>

      <h2>What we do not collect</h2>
      <p>
        We never store a raw IP address. Where we need to limit abuse we store a salted hash, which cannot be turned back into an address. We do not run advertising trackers, we do not build profiles of readers, and we do not use automated decisions about you.
      </p>

      <h2>Lawful basis</h2>
      <p>
        We rely on your consent for The Dispatch and for reviews, and on our legitimate interest in answering you for enquiries and in keeping the site secure. You can withdraw consent at any time.
      </p>

      <h2>Who else handles it</h2>
      <p>
        We use operators who process information on our behalf: Supabase for the database, Vercel for hosting, and Resend for email if confirmation emails are switched on. Some of them store information outside South Africa. We rely on their contractual and security commitments, and we share nothing else with them.
      </p>

      <p>
        Some review pages carry the vendor&apos;s own YouTube videos. A video loads from YouTube only when you press play, and it is served from YouTube&apos;s no cookie address. The still picture shown before you press play comes from YouTube&apos;s image servers, which see your address when the page opens.
      </p>

      <h2>How long we keep it</h2>
      <p>
        We keep an enquiry only as long as we need to answer it and for a reasonable period afterwards. We keep a subscriber until they unsubscribe or ask us to delete the address. We keep a published review for as long as it is published. We delete anything on request, unless the law requires us to keep it.
      </p>

      <h2>Your rights</h2>
      <p>
        You may ask us what we hold about you, ask us to correct it, ask us to delete it, object to how we use it, and withdraw your consent. Write to the information officer at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. To see the records we hold and how to request them formally, read the <Link href="/paia-manual">PAIA manual</Link>.
      </p>

      <h2>If you are not satisfied</h2>
      <p>
        You may complain to the Information Regulator (South Africa), whose website is <a href="https://inforeg.org.za" rel="noopener noreferrer">inforeg.org.za</a>. We would like the chance to put things right first.
      </p>

      <h2>Security</h2>
      <p>
        Access to the administration area needs a verified sign in, every admin request is checked on the server, and the database restricts what each role can read and write. No system is perfect. If we learn that your information has been exposed we will tell you and the Information Regulator as POPIA requires.
      </p>
    </LegalPage>
  );
}
