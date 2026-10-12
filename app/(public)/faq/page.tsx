import type { Metadata } from "next";
import Link from "next/link";
import { ctaClass } from "@/components/CtaButton";
import { ALL_FAQS, FAQ_GROUPS } from "@/lib/data/faq";
import { JsonLd, breadcrumbLd, faqLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Frequently asked questions",
  description: "How Software Register reads prices, why it has no ratings, what Sold in South Africa means, how reviews work and how to report a mistake.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={[breadcrumbLd([{ name: "FAQ", path: "/faq" }]), faqLd(ALL_FAQS.map((f) => ({ q: f.q, a: f.a })))]} />
      <header className="mx-auto w-full max-w-[1120px] px-6 pt-12 lg:pt-16">
        <p className="stamp mb-4 text-muted">Frequently asked questions</p>
        <h1 className="max-w-[900px] font-heading text-[38px] leading-[42px] font-bold tracking-[-0.03em] md:text-[64px] md:leading-[66px]">Questions we get asked.</h1>
        <p className="mt-6 max-w-[680px] text-[17px] leading-7 text-muted">How the register works, in short answers, each pointing to the page that explains it in full. If yours is not here, write to us.</p>
      </header>

      <div className="mx-auto mt-12 w-full max-w-[1120px] space-y-14 px-6 pb-12 lg:pb-[72px]">
        {FAQ_GROUPS.map((g) => (
          <section key={g.heading} aria-labelledby={`g-${g.heading}`} className="border-t border-line-firm pt-8">
            <h2 id={`g-${g.heading}`} className="font-heading text-[30px] leading-9 font-bold tracking-[-0.02em]">
              {g.heading}
            </h2>
            <div className="mt-6 max-w-[860px] border-t border-line-firm">
              {g.items.map((f) => (
                <details key={f.q} className="group border-b border-line-firm py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-heading text-[19px] leading-6 font-bold tracking-[-0.01em] marker:content-none">
                    {f.q}
                    <span aria-hidden="true" className="grid h-8 w-8 flex-none place-items-center rounded-full border border-line-firm text-[18px] leading-none group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 max-w-[70ch] text-[15px] leading-7 text-muted">{f.a}</p>
                  {f.link && (
                    <p className="mt-3 text-[14px] leading-5">
                      <Link href={f.link.href} className="prose-link">
                        {f.link.label}
                      </Link>
                    </p>
                  )}
                </details>
              ))}
            </div>
          </section>
        ))}

        <div className="flex flex-col gap-4 rounded-[24px] bg-lime-wash p-8 md:flex-row md:items-center md:justify-between md:p-10">
          <div>
            <h2 className="font-heading text-[26px] leading-8 font-bold tracking-[-0.02em]">Still not answered?</h2>
            <p className="mt-1 text-[15px] leading-6 text-muted">Write to us. A person reads every message.</p>
          </div>
          <Link href="/enquiries" className={ctaClass("primary", "flex-none")}>
            Contact us
          </Link>
        </div>
      </div>
    </>
  );
}
