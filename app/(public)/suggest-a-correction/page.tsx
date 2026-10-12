import type { Metadata } from "next";
import Link from "next/link";
import { CorrectionForm } from "@/components/forms/CorrectionForm";
import { getRegistry } from "@/lib/queries";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Suggest a correction",
  description: "Tell Software Register about a wrong price or record. Send the vendor's page that shows the right figure, and a confirmed error is corrected and dated.",
  alternates: { canonical: "/suggest-a-correction" },
  robots: { index: false, follow: true },
};

export default async function CorrectionPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const raw = Array.isArray(sp.product) ? sp.product[0] : sp.product;
  const reg = await getRegistry();
  const product = raw ? reg.bySlug.get(raw) : undefined;

  return (
    <section className="mx-auto grid w-full max-w-[1120px] gap-12 px-6 pt-10 pb-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16 lg:pt-16 lg:pb-[72px]">
      <div>
        <p className="stamp mb-4 text-muted">Corrections</p>
        <h1 className="font-heading text-[36px] leading-[40px] font-bold tracking-[-0.03em] md:text-[54px] md:leading-[56px]">
          {product ? `Something wrong about ${product.name}?` : "Found a mistake?"}
        </h1>
        <p className="mt-5 max-w-[520px] text-[17px] leading-7 text-muted">
          A price that has changed, a plan that is missing, a feature we got wrong or a fact about a vendor that is out of date. Tell us, with the vendor&apos;s page that shows the right figure.
        </p>

        <h2 className="mt-10 font-heading text-[20px] leading-6 font-bold tracking-[-0.01em]">What happens next</h2>
        <ol className="mt-4 space-y-3 text-[15px] leading-6">
          <li className="flex gap-3">
            <span aria-hidden="true" className="grid h-7 w-7 flex-none place-items-center rounded-full bg-lime text-[13px] font-bold text-lime-ink">1</span>
            An editor reads it and opens the vendor&apos;s own page.
          </li>
          <li className="flex gap-3">
            <span aria-hidden="true" className="grid h-7 w-7 flex-none place-items-center rounded-full bg-lime text-[13px] font-bold text-lime-ink">2</span>
            If the page shows what you say, the register is corrected and the date it was read is updated.
          </li>
          <li className="flex gap-3">
            <span aria-hidden="true" className="grid h-7 w-7 flex-none place-items-center rounded-full bg-lime text-[13px] font-bold text-lime-ink">3</span>
            If it does not, we write back and say what the page shows. We do not change a record on someone&apos;s say so alone.
          </li>
        </ol>
        <p className="mt-8 max-w-[520px] text-[14px] leading-6 text-muted">
          Corrections are never sold, and a vendor cannot pay to change a record. We do not promise a time, and a correction is not a request to remove a review: for that, read the <Link href="/review-guidelines" className="prose-link">review guidelines</Link>. Vendors can also <Link href="/vendors" className="prose-link">read how to keep a listing right</Link>. You can write to <a href={`mailto:${CONTACT_EMAIL}`} className="prose-link">{CONTACT_EMAIL}</a> instead.
        </p>
      </div>

      <div className="rounded-[28px] border border-line-firm bg-surface p-6 md:p-10">
        <CorrectionForm products={reg.items.map((s) => ({ slug: s.slug, name: s.name }))} defaultProduct={product?.slug ?? ""} />
      </div>
    </section>
  );
}
