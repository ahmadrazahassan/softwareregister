import type { Metadata } from "next";
import { LEGAL_UPDATED, LegalPage } from "@/components/LegalPage";
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_HREF, INFORMATION_OFFICER, SITE_ADDRESS, SITE_FOUNDER, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = { title: "PAIA manual", alternates: { canonical: "/paia-manual" } };

export default function PaiaManualPage() {
  return (
    <LegalPage title="PAIA manual" updated={LEGAL_UPDATED}>
      <p>
        This manual is published under section 51 of the Promotion of Access to Information Act 2 of 2000, known as PAIA. It tells you what records {SITE_NAME} holds and how to ask for them.
      </p>

      <h2>Contact details</h2>
      <ul>
        <li>Private body: {SITE_NAME}</li>
        <li>Head of the body: {SITE_FOUNDER}</li>
        <li>Information officer: {INFORMATION_OFFICER}</li>
        <li>Physical and postal address: {SITE_ADDRESS}</li>
        <li>
          Email: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </li>
        <li>
          Phone: <a href={CONTACT_PHONE_HREF}>{CONTACT_PHONE}</a>
        </li>
      </ul>

      <h2>The guide of the Information Regulator</h2>
      <p>
        The Information Regulator (South Africa) publishes a guide on how to use PAIA. It is available from the Regulator&apos;s website at <a href="https://inforeg.org.za" rel="noopener noreferrer">inforeg.org.za</a>.
      </p>

      <h2>Records available without a request</h2>
      <p>The content of this website is public: the register, the briefings, the method and the legal pages. You do not need to make a request to read it.</p>

      <h2>Records we hold</h2>
      <ul>
        <li>Enquiries sent through the contact form, and our replies.</li>
        <li>Reviews submitted for products on the register, and moderation records.</li>
        <li>The list of people subscribed to The Dispatch, with their consent records.</li>
        <li>Records of clicks on outbound links, held with a salted hash and no raw address.</li>
        <li>Records of price checks: the product, the figure, the currency, the basis and the date read.</li>
        <li>Correspondence with vendors about listings and corrections.</li>
        <li>Records about the staff accounts that administer the site.</li>
      </ul>

      <h2>How to request a record</h2>
      <p>
        Complete the request form prescribed under PAIA and send it to the information officer at the address above. Say which record you want, who you are, and which right you are exercising. If you ask on behalf of someone else, send proof of your authority. We decide within 30 days and tell you if we need more time. A request fee and an access fee may apply as the regulations prescribe.
      </p>

      <h2>When we may refuse</h2>
      <p>
        PAIA lists the grounds on which a private body must or may refuse access, such as protecting another person&apos;s privacy or commercial information. If we refuse, we give you the reasons in writing.
      </p>

      <h2>If you disagree with our decision</h2>
      <p>You may lodge a complaint with the Information Regulator (South Africa), or apply to a court with jurisdiction.</p>

      <h2>How we process personal information</h2>
      <p>
        We process personal information to answer enquiries, to publish approved reviews, to send The Dispatch to people who asked for it, and to keep the site secure. The categories are name, email address, role, company size, industry and the content you send. The recipients are our operators for database hosting, site hosting and email. Some of them store information outside South Africa. We protect it with access control, server side checks and database level restrictions. The privacy policy has the detail.
      </p>
    </LegalPage>
  );
}
