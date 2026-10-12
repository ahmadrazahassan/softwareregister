import type { Metadata } from "next";
import Link from "next/link";
import { ctaClass } from "@/components/CtaButton";
import { JsonLd, breadcrumbLd } from "@/lib/seo";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Review guidelines",
  description: "Who can write a review on Software Register, what an editor checks, what is published and what is not, how vendors reply, and how to ask for a review to be removed.",
  alternates: { canonical: "/review-guidelines" },
};

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-28 font-heading text-[26px] leading-8 font-bold tracking-[-0.02em] md:text-[32px] md:leading-10">
      {children}
    </h2>
  );
}

export default function ReviewGuidelinesPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Review guidelines", path: "/review-guidelines" }])} />
      <header className="mx-auto w-full max-w-[1120px] px-6 pt-12 lg:pt-16">
        <p className="stamp mb-4 text-muted">Review guidelines</p>
        <h1 className="max-w-[900px] font-heading text-[38px] leading-[42px] font-bold tracking-[-0.03em] md:text-[64px] md:leading-[66px]">How reviews are written, read and published.</h1>
        <p className="mt-6 max-w-[700px] text-[17px] leading-7 text-muted">
          Anyone can review any product here. This page says what an editor checks, what appears and what does not, what a vendor can do, and what we do not do. Nothing on it describes a process that is not running. Last updated 12 October 2026.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/write-a-review" className={ctaClass("primary")}>
            Write a review
          </Link>
          <Link href="/faq" className={ctaClass("quiet")}>
            Read the FAQ
          </Link>
        </div>
      </header>

      <div className="mx-auto mt-14 w-full max-w-[760px] space-y-12 px-6 pb-12 text-[16px] leading-7 lg:pb-[72px]">
        <section>
          <H2 id="who">Who can write one</H2>
          <p className="mt-4">
            Anyone who has used, or seriously tried, a product on the register. You give your name, and you can add your role, your industry and your company size. You do not need an account. Write about your own experience, in your own words.
          </p>
          <p className="mt-4">
            If you work for the vendor, for a competitor, or you were paid or given something to write, say so in the review. A review from someone with that kind of connection that does not say so is rejected.
          </p>
        </section>

        <section>
          <H2 id="what">What we ask you to write</H2>
          <ul className="mt-4 space-y-2.5">
            <li>What the product does well and where it falls short, with an example of each.</li>
            <li>Which plan you are on, how long you have used it and what you use it for.</li>
            <li>What you used before, and what else you looked at.</li>
            <li>Facts you can stand behind. Say what happened, not what you suspect.</li>
          </ul>
        </section>

        <section>
          <H2 id="not">What is not published</H2>
          <ul className="mt-4 space-y-2.5">
            <li>Anything that is not about the product, such as a dispute about a refund with no detail about the software.</li>
            <li>Personal information about anyone else: names of staff, phone numbers, ID numbers, bank details or screenshots that show them.</li>
            <li>Abuse, threats, discrimination, or claims you cannot support that damage a named person or company.</li>
            <li>Advertising, links to your own business, or the same text posted for several products.</li>
            <li>A review by the vendor of its own product, or by a competitor, without saying so.</li>
            <li>Reviews that offer or ask for payment, discounts or other rewards.</li>
          </ul>
        </section>

        <section>
          <H2 id="check">What an editor checks</H2>
          <p className="mt-4">
            An editor reads every review before it appears. They check that it is about the product it is posted under, that it follows the points above and that it is not obviously a copy or an advertisement. They do not check purchase records, and no review is marked as checked or confirmed. Treat each review as one person&apos;s account, which is how it is presented.
          </p>
          <p className="mt-4">We keep a salted hash of the connection a review was sent from, to limit repeat submissions. We never keep the address. See the <Link href="/privacy-policy" className="prose-link">privacy policy</Link>.</p>
        </section>

        <section>
          <H2 id="published">Published as written</H2>
          <p className="mt-4">
            A review that meets the guidelines is published as you wrote it. We do not edit it to make a vendor look better or worse. If part of it breaks a guideline, we reject it and you are welcome to send it again without that part. We do not promise a time for an editor to read a review.
          </p>
        </section>

        <section>
          <H2 id="scores">Ratings and scores</H2>
          <p className="mt-4">
            The register publishes no rating for a product, no review count and no ranking, and a vendor cannot pay to change that. The one to five mark a reviewer gives belongs to that review alone. It is never averaged, added up or used to order products.
          </p>
        </section>

        <section>
          <H2 id="replies">Replies from vendors</H2>
          <p className="mt-4">
            A vendor cannot change or remove a review. It can ask for a reply to be shown beneath one. Send the reply with the address of the review, the name and role of the person replying and the vendor&apos;s company, through the <Link href="/enquiries?subject=reply" className="prose-link">contact form</Link>. An editor checks that the request comes from the vendor and that the reply follows these guidelines, then saves it beneath the review, labelled as the vendor&apos;s, with the date. The review above it does not change.
          </p>
          <p className="mt-4">A reply should answer what the review says, correct a fact it gets wrong or say what the vendor has changed. It is not a place for advertising or for attacking the reviewer.</p>
        </section>

        <section>
          <H2 id="remove">Asking for a review to be removed</H2>
          <ul className="mt-4 space-y-2.5">
            <li>
              <span className="font-semibold">If you wrote it,</span> write to us from the email you used, or give details only the writer would know, and we will take it down.
            </li>
            <li>
              <span className="font-semibold">If it names you or contains your personal information,</span> tell us which review and what is wrong. We remove personal information that should not be there.
            </li>
            <li>
              <span className="font-semibold">If it states a fact about a product that is wrong,</span> use <Link href="/suggest-a-correction" className="prose-link">Suggest a correction</Link>, or send a reply as above. We reject a review that breaks the guidelines, and we do not remove one only because it is critical.
            </li>
            <li>
              <span className="font-semibold">If you believe a review is unlawful,</span> write to <a href={`mailto:${CONTACT_EMAIL}`} className="prose-link">{CONTACT_EMAIL}</a> with the address of the review and the reason.
            </li>
          </ul>
        </section>

        <section>
          <H2 id="money">Money and independence</H2>
          <p className="mt-4">
            Some links on this site are affiliate links, and we earn a commission when a reader buys. That does not change which reviews are published, how they are read or the order of the register. See the <Link href="/affiliate-disclosure" className="prose-link">affiliate disclosure</Link> and <Link href="/method" className="prose-link">how the register works</Link>.
          </p>
        </section>
      </div>
    </>
  );
}
