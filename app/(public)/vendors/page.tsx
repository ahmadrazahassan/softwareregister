import type { Metadata } from "next";
import Link from "next/link";
import { ctaClass } from "@/components/CtaButton";
import { JsonLd, breadcrumbLd } from "@/lib/seo";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "For software vendors",
  description: "How a product gets onto Software Register, how its price is read, how to keep a listing right and how to reply to a reader review. Listing is free and buys no position.",
  alternates: { canonical: "/vendors" },
};

const STEPS = [
  { title: "Ask to be listed", text: "Use the listing form with the address of your pricing page. A listing is free." },
  { title: "We read your page", text: "An editor reads your own pricing and product pages, records each plan in rand with its basis, and dates it." },
  { title: "It appears in the register", text: "Alphabetically, like every product. No payment, affiliate link or sponsorship changes the order." },
  { title: "You keep it right", text: "If a price or a fact changes, tell us with the page that shows it, and the record is corrected and dated." },
] as const;

export default function VendorsPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "For vendors", path: "/vendors" }])} />
      <header className="mx-auto w-full max-w-[1120px] px-6 pt-12 lg:pt-16">
        <p className="stamp mb-4 text-muted">For software vendors</p>
        <h1 className="max-w-[900px] font-heading text-[38px] leading-[42px] font-bold tracking-[-0.03em] md:text-[64px] md:leading-[66px]">Be on the register, and keep it right.</h1>
        <p className="mt-6 max-w-[700px] text-[17px] leading-7 text-muted">
          Software Register is read by South African buyers who want a price in rand, the SARS returns a product handles and the banks it feeds from. This page says how a vendor gets onto it, what you can ask us to change and what you cannot.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/add-a-product" className={ctaClass("primary")}>
            Add a product
          </Link>
          <Link href="/enquiries?subject=update" className={ctaClass("blue")}>
            Update a listing
          </Link>
          <Link href="/enquiries?subject=reply" className={ctaClass("quiet")}>
            Reply to a review
          </Link>
        </div>
      </header>

      <div className="mx-auto mt-14 w-full max-w-[1120px] space-y-16 px-6 pb-12 lg:pb-[72px]">
        <section aria-labelledby="how-title">
          <h2 id="how-title" className="font-heading text-[30px] leading-9 font-bold tracking-[-0.02em] md:text-[38px] md:leading-[42px]">
            How a listing works
          </h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <li key={s.title} className="rounded-[20px] border border-line-firm bg-surface p-6">
                <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-full bg-lime font-heading text-[15px] font-bold text-lime-ink">
                  {i + 1}
                </span>
                <h3 className="mt-4 font-heading text-[20px] leading-6 font-bold tracking-[-0.01em]">{s.title}</h3>
                <p className="mt-2 text-[14px] leading-6 text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="read-title" className="grid gap-10 border-t border-line-firm pt-12 lg:grid-cols-2">
          <div>
            <h2 id="read-title" className="font-heading text-[28px] leading-8 font-bold tracking-[-0.02em] md:text-[34px] md:leading-10">
              What we record, and from where
            </h2>
            <p className="mt-4 text-[16px] leading-7">
              The price of each plan as your own page states it, in your currency and converted to rand, with the date it was read. The SARS returns, bank feeds, integrations and features your page lists. Whether the product is sold in South Africa, from what your pages show.
            </p>
            <p className="mt-4 text-[16px] leading-7">A fact your pages do not state is left out, and never shown as a no. If you want it on the register, put it on your page and tell us.</p>
          </div>
          <div>
            <h2 className="font-heading text-[28px] leading-8 font-bold tracking-[-0.02em] md:text-[34px] md:leading-10">What you can and cannot do</h2>
            <ul className="mt-4 space-y-2.5 text-[16px] leading-7">
              <li>You can ask for a listing, for free, and for a price or a record to be corrected with a source.</li>
              <li>You can ask for a reply of yours to be shown beneath a reader review.</li>
              <li>You cannot pay to change the order, a record or a review.</li>
              <li>You cannot have a review removed because it is critical. See the <Link href="/review-guidelines" className="prose-link">review guidelines</Link>.</li>
            </ul>
          </div>
        </section>

        <section aria-labelledby="keep-title" className="border-t border-line-firm pt-12">
          <h2 id="keep-title" className="font-heading text-[28px] leading-8 font-bold tracking-[-0.02em] md:text-[34px] md:leading-10">
            Keeping a listing right
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            <div className="rounded-[20px] border border-line-firm bg-surface p-6">
              <h3 className="font-heading text-[20px] leading-6 font-bold tracking-[-0.01em]">A price has changed</h3>
              <p className="mt-2 text-[14px] leading-6 text-muted">Send the correction with the address of your page that shows the new figure. A confirmed change is made and the date updated.</p>
              <Link href="/suggest-a-correction" className={ctaClass("quiet", "mt-5")}>
                Suggest a correction
              </Link>
            </div>
            <div className="rounded-[20px] border border-line-firm bg-surface p-6">
              <h3 className="font-heading text-[20px] leading-6 font-bold tracking-[-0.01em]">Your plans or features changed</h3>
              <p className="mt-2 text-[14px] leading-6 text-muted">Tell us what is new and where your page says so, and we update the listing.</p>
              <Link href="/enquiries?subject=update" className={ctaClass("quiet", "mt-5")}>
                Update a listing
              </Link>
            </div>
            <div id="replies" className="rounded-[20px] border border-line-firm bg-surface p-6">
              <h3 className="font-heading text-[20px] leading-6 font-bold tracking-[-0.01em]">A reader reviewed you</h3>
              <p className="mt-2 text-[14px] leading-6 text-muted">You cannot change it, but you can ask for a reply to be shown beneath it, labelled as yours. Send the address of the review, your name and role, and the reply.</p>
              <Link href="/enquiries?subject=reply" className={ctaClass("quiet", "mt-5")}>
                Reply to a review
              </Link>
            </div>
          </div>
        </section>

        <section aria-labelledby="money-title" className="border-t border-line-firm pt-12">
          <h2 id="money-title" className="font-heading text-[28px] leading-8 font-bold tracking-[-0.02em] md:text-[34px] md:leading-10">
            Money, and what it does not buy
          </h2>
          <p className="mt-4 max-w-[70ch] text-[16px] leading-7">
            Listing is free. Some links to vendors are affiliate links, and a labelled sponsored unit can appear, and neither changes what we publish or the order of the register. Read the <Link href="/affiliate-disclosure" className="prose-link">affiliate disclosure</Link> and <Link href="/method" className="prose-link">how the register works</Link>. Questions? Write to <a href={`mailto:${CONTACT_EMAIL}`} className="prose-link">{CONTACT_EMAIL}</a>.
          </p>
        </section>
      </div>
    </>
  );
}
