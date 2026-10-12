import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHeader, Section } from "@/components/primitives";
import { formatDateLong } from "@/lib/format";
import { getRegistry, getSiteStats } from "@/lib/queries";
import {
  ADDRESS_LINES,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_HREF,
  CONTRIBUTORS,
  INFORMATION_OFFICER,
  SITE_FOUNDER,
  SITE_MAP_URL,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "About us",
  description: "Who publishes Software Register, how it is funded, and what the register does not cover.",
  alternates: { canonical: "/masthead" },
};

export default async function MastheadPage() {
  const [stats, reg] = await Promise.all([getSiteStats(), getRegistry()]);
  const affiliated = reg.items.filter((s) => s.affiliate_url);

  return (
    <>
      <PageHeader title="About us" stamp="Who is accountable">
        Software Register lists {stats.products} business software products with their price in rand, their features and whether they file with SARS. It is published by a named person at a named address in Cape Town, and every figure carries the date it was read. It is not a marketplace, it does not sell software, and it is not tax or legal advice.
      </PageHeader>

      <Section title="Who publishes this" first>
        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-[20px] border border-line-firm bg-surface p-6">
            <p className="stamp text-muted">Publisher</p>
            <p className="mt-3 font-heading text-[28px] leading-8 font-bold tracking-[-0.02em]">{SITE_FOUNDER}</p>
            <p className="mt-1 text-[15px] leading-6">Founder and editor</p>
            <p className="mt-4 text-[14px] leading-6 text-muted">
              Information officer for POPIA and PAIA: {INFORMATION_OFFICER}.
              {CONTRIBUTORS.length > 0 && <> With {CONTRIBUTORS.join(" and ")}.</>}
            </p>
          </div>
          <address className="rounded-[20px] border border-line-firm bg-surface p-6 not-italic">
            <p className="stamp text-muted">Address</p>
            <p className="mt-3 text-[16px] leading-7">
              {ADDRESS_LINES.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
            <a href={SITE_MAP_URL} target="_blank" rel="noopener noreferrer" className="prose-link mt-4 inline-block text-[14px]">
              View on a map
            </a>
          </address>
          <div className="rounded-[20px] border border-line-firm bg-surface p-6">
            <p className="stamp text-muted">Contact</p>
            <ul className="mt-3 space-y-2 text-[16px] leading-7">
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className="prose-link">{CONTACT_EMAIL}</a>
              </li>
              <li>
                <a href={CONTACT_PHONE_HREF} className="prose-link">{CONTACT_PHONE}</a>
              </li>
            </ul>
            <Link href="/enquiries" className="prose-link mt-4 inline-block text-[14px]">
              Use the contact form
            </Link>
          </div>
        </div>
        <p className="mt-6 max-w-[68ch] text-[14px] leading-6 text-muted">
          Software Register is published from Cape Town. The person named here answers for what the register says, reads every review before it appears and is the one to write to about a record, a review or your personal information.
        </p>
      </Section>

      <Section title="How we are funded">
        <div className="max-w-[68ch] space-y-4 text-[15px] leading-6">
          <p>
            Affiliate commission. When a reader follows a link from this site and buys, the vendor may pay us. That is the only revenue.
          </p>
          <p>
            One programme is live: Sage South Africa, through the Impact network. {affiliated.length} products on the register carry the Sage link: {affiliated.map((s) => s.name).join(", ")}. We have applied to Xero, FreshBooks, ClickUp and PartnerStack. None of those has produced a link yet, so none appears on the site.
          </p>
          <p>
            The register is listed alphabetically and carries no ranking. A vendor cannot buy position or a kinder write up. A sponsored unit is labelled Sponsored. Read the <Link href="/affiliate-disclosure" className="prose-link">affiliate disclosure</Link> and the <Link href="/method" className="prose-link">method</Link>.
          </p>
        </div>
      </Section>

      <Section title="What the register does not cover">
        <p className="mb-6 max-w-[68ch] text-[15px] leading-6 text-muted">
          A register earns trust by saying where it is thin. This list is computed from the data where it can be, so it cannot go stale on its own.
        </p>
        <ul className="max-w-[68ch] border-t border-line-firm">
          {[
            `Prices were read from the vendors' own pages${stats.lastChecked ? `, the latest on ${formatDateLong(stats.lastChecked)}` : ""}. They are read again by hand, so a vendor can change a price before we do. Confirm it with the vendor before you buy.`,
            `SARS filing and bank feeds appear only where a vendor's own page lists them. A product that shows none has not published a list.`,
            `Where a vendor gives its price on request, the register says so and does not estimate one.`,
            `The register publishes no ratings. Readers can write a review of any product, and an editor reads it before it appears.`,
            `The briefings summarise statutory rules in plain words. They have not been reviewed by a registered tax practitioner or a labour lawyer, and they are not advice.`,
            `The legal pages have not been reviewed by an attorney.`,
            `The register records prices, plans, features and integrations. It does not score support or ease of use.`,
          ].map((line) => (
            <li key={line} className="border-b border-line py-4 text-[15px] leading-6">
              {line}
            </li>
          ))}
        </ul>
      </Section>

      <Container className="pb-12">
        <p className="text-[13px] leading-5 text-muted">
          To correct a record, <Link href="/enquiries?subject=correction" className="prose-link">write to us</Link>.
        </p>
      </Container>
    </>
  );
}
