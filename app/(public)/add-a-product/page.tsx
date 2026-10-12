import { Check } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { ListingForm } from "@/components/forms/ListingForm";
import { SaFlag } from "@/components/SaFlag";
import { getSiteStats } from "@/lib/queries";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Add a product",
  description: "List your software on Software Register, where South African buyers compare prices in rand. A listing is free, it does not buy a better position, and we read your price from your own pages.",
  alternates: { canonical: "/add-a-product" },
};

const PROMISES = [
  { title: "Free to list", body: "A listing costs nothing. There is no fee to be on the register." },
  { title: "No paying for position", body: "Products are listed A to Z. No vendor can pay to move up, and nothing is ranked or scored." },
  { title: "Your own pages, dated", body: "We read your price from your own site and print the date we read it, so a buyer can trust the figure." },
];

const STEPS = [
  { n: "01", title: "You send the details", body: "Your product name, website and category. A link to your pricing page helps most." },
  { n: "02", title: "We read your pages", body: "We record your price in rand, the VAT basis, each plan, the features you list and any SARS returns or bank feeds your page states." },
  { n: "03", title: "We write back", body: "We email you at the address you gave to confirm the listing, or to ask for what we could not find on your pages." },
];

const RECORDED = [
  "The price in rand, with whether VAT is included",
  "Every plan you list, and what each one adds",
  "The features your own pages describe",
  "SARS returns and bank feeds, only where your page says so",
  "Your logo, and a link to your site",
  "A free trial, a free plan or a demo, if you offer one",
];

const FAQ = [
  { q: "Does it cost anything to be listed?", a: "No. A listing is free. Some links on the site are affiliate links, and we say so wherever we use one. A vendor cannot pay to be listed higher, to be featured, or to change what we publish." },
  { q: "What if I do not publish a price?", a: "We say price on request and we do not estimate one. A buyer can still find you, compare your features and ask you for a quote." },
  { q: "What do I need to send?", a: "Your product name and website are enough to start. A link to your pricing page, your plan names and whether your prices include VAT let us finish the record on the first read." },
  { q: "Can I correct my listing later?", a: "Yes. Write to us with the page and a source, and a confirmed error is corrected and the date updated. Corrections are never sold." },
  { q: "Will you publish reviews of my product?", a: "Readers can write a review of any product. An editor reads each one first, it is published as written, and a vendor cannot pay to change or remove it." },
];

export default async function AddProductPage() {
  const stats = await getSiteStats();

  return (
    <>
      <section className="mx-auto grid w-full max-w-[1280px] gap-12 px-6 pt-12 pb-14 lg:grid-cols-[1fr_1fr] lg:gap-20 lg:pt-20 lg:pb-[72px]">
        <div>
          <p className="stamp mb-4 flex items-center gap-2.5 text-muted">
            <SaFlag height={14} />
            For vendors
          </p>
          <h1 className="font-heading text-[38px] leading-[40px] font-bold tracking-[-0.03em] md:text-[60px] md:leading-[60px]">List your software where South Africans compare prices.</h1>
          <p className="mt-6 max-w-[520px] text-[17px] leading-7 text-muted">
            Software Register lists {stats.products} business software products, with every price in rand and every plan side by side. Tell us about yours and we will read it from your own pages.
          </p>

          <ul className="mt-10 space-y-6">
            {PROMISES.map((p) => (
              <li key={p.title} className="flex gap-4">
                <span className="mt-0.5 grid h-8 w-8 flex-none place-items-center rounded-full bg-lime text-lime-ink">
                  <Check size={16} strokeWidth={2.25} aria-hidden="true" />
                </span>
                <div>
                  <h2 className="font-heading text-[18px] leading-6 font-bold tracking-[-0.01em]">{p.title}</h2>
                  <p className="mt-1 text-[14px] leading-6 text-muted">{p.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div id="form" className="lg:pt-2">
          <div className="rounded-[28px] border border-line-firm bg-surface p-6 md:p-10">
            <h2 className="font-heading text-[26px] leading-8 font-bold tracking-[-0.02em]">Tell us about your product</h2>
            <p className="mt-2 mb-8 text-[14px] leading-5 text-muted">A few short fields. A person reads every request.</p>
            <ListingForm />
          </div>
        </div>
      </section>

      <section aria-labelledby="steps-title" className="mx-auto w-full max-w-[1280px] px-6 pb-14 lg:pb-[72px]">
        <h2 id="steps-title" className="border-t border-line-firm pt-12 pb-8 font-heading text-[30px] leading-9 font-bold tracking-[-0.02em] lg:pt-[72px]">
          How a listing works
        </h2>
        <ol className="grid gap-8 md:grid-cols-3">
          {STEPS.map((s) => (
            <li key={s.n} className="rounded-[22px] border border-line-firm bg-surface p-7">
              <p className="font-heading text-[44px] leading-[44px] font-bold tracking-[-0.03em] text-line-firm">{s.n}</p>
              <span aria-hidden="true" className="mt-5 block h-px w-8 bg-ink" />
              <h3 className="mt-5 font-heading text-[20px] leading-6 font-bold tracking-[-0.01em]">{s.title}</h3>
              <p className="mt-2 text-[14px] leading-6 text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="recorded-title" className="mx-auto w-full max-w-[1280px] px-6 pb-14 lg:pb-[72px]">
        <div className="grid gap-10 rounded-[28px] bg-lime-wash p-8 md:p-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <h2 id="recorded-title" className="font-heading text-[30px] leading-9 font-bold tracking-[-0.02em] md:text-[40px] md:leading-[44px]">
              What we put on your page.
            </h2>
            <p className="mt-4 max-w-[420px] text-[15px] leading-6 text-muted">Only what your own pages say. We do not guess, and we do not score.</p>
          </div>
          <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {RECORDED.map((t) => (
              <li key={t} className="flex gap-3 text-[15px] leading-6">
                <Check size={18} strokeWidth={1.75} aria-hidden="true" className="mt-1 flex-none text-lime-text" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="faq-title" className="mx-auto w-full max-w-[860px] px-6 pb-14 lg:pb-[72px]">
        <h2 id="faq-title" className="mb-6 font-heading text-[30px] leading-9 font-bold tracking-[-0.02em]">
          Questions vendors ask
        </h2>
        <div className="border-t border-line-firm">
          {FAQ.map((f) => (
            <details key={f.q} className="group border-b border-line-firm py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-heading text-[18px] leading-6 font-bold tracking-[-0.01em] marker:content-none">
                {f.q}
                <span aria-hidden="true" className="grid h-8 w-8 flex-none place-items-center rounded-full border border-line-firm text-[18px] leading-none group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-[68ch] text-[15px] leading-7 text-muted">{f.a}</p>
            </details>
          ))}
        </div>
        <p className="mt-8 text-[14px] leading-6 text-muted">
          Prefer to write? Email <a href={`mailto:${CONTACT_EMAIL}`} className="prose-link">{CONTACT_EMAIL}</a>, or see <Link href="/method" className="prose-link">how the register works</Link>.
        </p>
      </section>
    </>
  );
}
