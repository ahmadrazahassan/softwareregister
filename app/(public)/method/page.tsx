import type { Metadata } from "next";
import Link from "next/link";
import { Section, PageHeader } from "@/components/primitives";
import { formatDateLong } from "@/lib/format";
import { getRegistry } from "@/lib/queries";
import { CONTACT_EMAIL, VAT_PERCENT } from "@/lib/site";

export const metadata: Metadata = {
  title: "How the register works",
  description: "How Software Register reads and dates prices, shows them in rand, records SARS filing and bank feeds, takes reader reviews, and how to ask for a correction.",
  alternates: { canonical: "/method" },
};

export default async function MethodPage() {
  const reg = await getRegistry();
  const dates = [...new Set(reg.items.map((s) => s.price_checked_at).filter((d): d is string => Boolean(d)))].sort().reverse();
  const byDate = dates.map((d) => ({ date: d, items: reg.items.filter((s) => s.price_checked_at === d) }));

  return (
    <>
      <PageHeader title="How the register works" stamp="The method">
        How prices are read, dated and shown in rand, in full. Nothing on this page describes a process that is not running.
      </PageHeader>

      <Section title="How prices are read" first>
        <div className="max-w-[68ch] space-y-4 text-[15px] leading-6">
          <p>
            A price on the register is the vendor&apos;s own published list price for South Africa. We open the vendor&apos;s page, read the figure, and record the amount, the basis (per month, per employee, per user, including or excluding VAT) and the date we read it.
          </p>
          {byDate.map(({ date, items }) => (
            <p key={date}>
              <span className="font-semibold">{formatDateLong(date)}.</span>{" "}
              {`${items.length} ${items.length === 1 ? "product" : "products"} read: ${items.map((s) => s.name).join(", ")}.`}
            </p>
          ))}
          <p>
            Where a vendor gives its price only after you contact it, the register says Price on request and carries no date, because there is no published figure to read. No recurring check is scheduled or running. A date on a price is the last time it was read from the vendor, and the admin dashboard flags any price older than 90 days.
          </p>
        </div>
      </Section>

      <Section title="Rand and VAT">
        <div className="max-w-[68ch] space-y-4 text-[15px] leading-6">
          <p>
            Every price prints with its basis. Sage quotes cloud products including VAT and Pastel products excluding it, and at {VAT_PERCENT} percent that is real money, so the basis is never dropped. A price with no stated VAT basis is recorded as a plain monthly figure and not assumed.
          </p>
          <p>
            Price on request means the vendor gives its price after you contact it. Free means the starting price is zero. They are different facts and render differently.
          </p>
          <p>
            Every price on the register is shown in rand. Where a vendor lists in dollars, pounds or euros, the register converts the figure at the European Central Bank reference rate, fetched from Frankfurter and refreshed twice a day, and prints that rate and its date under the price list. If the rate feed is unavailable the site falls back to the last rates saved with it and says so.
          </p>
        </div>
      </Section>

      <Section title="Comparisons">
        <div className="max-w-[68ch] space-y-4 text-[15px] leading-6">
          <p>
            Each curated pair has a detailed comparison written from the vendors&apos; own pages. The prices in the table beside it come from the register and carry their own dates.
          </p>
          <p>
            Some vendors load their prices by script or publish no price at all. When that happens the register says so and never fills the gap with a guess.
          </p>
          <p>
            Everything on this site is written for South African buyers, and every product page carries a note on what that means for you. Sold in South Africa marks products that have a South African site, rand pricing, a local phone line or South African origin, which covers every Sage product, because Sage South Africa builds, sells and supports them locally, and also Xero, QuickBooks and Zoho Books. The others are available to South African businesses online, and the note says what the vendor&apos;s page shows.
          </p>
        </div>
      </Section>

      <Section title="SARS filing and bank feeds">
        <div className="max-w-[68ch] space-y-4 text-[15px] leading-6">
          <p>
            A product shows SARS filing when the vendor&apos;s own page says it handles VAT201, EMP201, EMP501, IRP5, IT3(a) or e@syFile returns. Bank feeds are recorded by bank where the vendor lists them: Capitec, FNB, Absa, Standard Bank, Nedbank, TymeBank, Investec and Discovery Bank. A fact the vendor does not state is left out.
          </p>
          <p>
            The filters on the register are built from the values present in the data, so a filter never offers an option that returns nothing for a reason we cannot explain.
          </p>
        </div>
      </Section>

      <Section title="Order, ratings and reader reviews">
        <div className="max-w-[68ch] space-y-4 text-[15px] leading-6">
          <p>
            Products are listed alphabetically and can be sorted by price or by the date the price was checked. The register publishes no rating and no ranking. No affiliate link, sponsorship or vendor relationship changes what we publish or the order it appears in.
          </p>
          <p>
            Anyone can write a review of any product. An editor reads it before it appears, it is published as written, and a vendor cannot pay to change or remove it.
          </p>
        </div>
      </Section>

      <Section title="Corrections">
        <div className="max-w-[68ch] space-y-4 text-[15px] leading-6">
          <p>
            If a price or a record is wrong, <Link href="/enquiries?subject=correction" className="prose-link">write to us</Link> or email <a href={`mailto:${CONTACT_EMAIL}`} className="prose-link">{CONTACT_EMAIL}</a> with the page and a source. A confirmed error is corrected on the page and the check date is updated. Corrections are never sold, and a vendor cannot pay to change a record.
          </p>
        </div>
      </Section>
    </>
  );
}
