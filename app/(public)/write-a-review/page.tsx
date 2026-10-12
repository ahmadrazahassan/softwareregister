import { Check } from "lucide-react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ReviewPicker } from "@/components/ReviewPicker";
import { getAllSoftware, loadSectors } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Write a review",
  description: "Anyone can review any product on the register. Choose the software you have used, say what it did well and where it fell short. An editor reads every review before it appears.",
  alternates: { canonical: "/write-a-review" },
};

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

const USEFUL = [
  "Say who you are: your role, and the size and kind of business that uses it.",
  "Say what it does well and where it fell short, with an example of each.",
  "Say which plan you are on and whether the price matched what you were told.",
];

const STEPS = [
  { n: "1", title: "You write it", body: "Choose the product and tell us your experience in your own words." },
  { n: "2", title: "An editor reads it", body: "We read every review before it appears. We do not edit your opinion." },
  { n: "3", title: "It is published as written", body: "It shows on the product's page. It is never averaged into a score, and a vendor cannot pay to change or remove it." },
];

export default async function WriteAReviewPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const pick = one(sp.product);
  const [items, sectors] = await Promise.all([getAllSoftware(), loadSectors()]);

  // A valid product in the address goes straight to its review form.
  if (pick && items.some((s) => s.slug === pick)) {
    redirect(`/register/${pick}/reviews/new`);
  }

  return (
    <section className="mx-auto grid w-full max-w-[1280px] gap-14 px-6 pt-12 pb-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20 lg:pt-20 lg:pb-[72px]">
      <div>
        <p className="stamp mb-4 text-muted">Write a review</p>
        <h1 className="font-heading text-[38px] leading-[40px] font-bold tracking-[-0.03em] md:text-[60px] md:leading-[60px]">Tell other South African buyers what it is really like.</h1>
        <p className="mt-6 max-w-[520px] text-[17px] leading-7 text-muted">
          Anyone can review any product on the register. A review from someone who has paid the bill is worth more than any score we could give.
        </p>

        <h2 className="mt-12 font-heading text-[22px] leading-7 font-bold tracking-[-0.01em]">What makes a review useful</h2>
        <ul className="mt-4 space-y-3">
          {USEFUL.map((t) => (
            <li key={t} className="flex gap-3 text-[15px] leading-6">
              <Check size={18} strokeWidth={1.75} aria-hidden="true" className="mt-1 flex-none text-lime-text" />
              {t}
            </li>
          ))}
        </ul>

        <ol className="mt-12 grid gap-6 border-t border-line-firm pt-8 sm:grid-cols-3">
          {STEPS.map((s) => (
            <li key={s.n}>
              <span className="grid h-9 w-9 place-items-center rounded-full border border-ink font-heading text-[15px] font-bold">{s.n}</span>
              <h3 className="mt-4 font-heading text-[17px] leading-6 font-bold">{s.title}</h3>
              <p className="mt-1.5 text-[13px] leading-5 text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="lg:pt-2">
        <div className="rounded-[28px] border border-line-firm bg-surface p-6 md:p-8">
          <h2 className="font-heading text-[26px] leading-8 font-bold tracking-[-0.02em]">Which product did you use?</h2>
          <p className="mt-2 mb-6 text-[14px] leading-5 text-muted">Pick it from the register and we will take you to its review form.</p>
          <ReviewPicker items={items.map((s) => ({ slug: s.slug, name: s.name, vendor: s.vendor === s.name ? "" : s.vendor, sector: s.sector }))} sectors={sectors.map((s) => ({ slug: s.slug, name: s.name }))} />
        </div>
      </div>
    </section>
  );
}
