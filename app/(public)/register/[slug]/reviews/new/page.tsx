import { ArrowLeft, Check } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReviewForm } from "@/components/forms/ReviewForm";
import { LogoBadge } from "@/components/LogoBadge";
import { SaFlag } from "@/components/SaFlag";
import { saAvailability } from "@/lib/data/availability";
import { priceLabel } from "@/lib/format";
import { getRegistry } from "@/lib/queries";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const reg = await getRegistry();
  const s = reg.bySlug.get((await params).slug);
  return s ? { title: `Write a review of ${s.name}`, robots: { index: false, follow: true } } : {};
}

const TIPS = ["Write about your own experience, in your own words.", "Give an example of something it did well and something it did not.", "Leave out anything you would not say to the vendor's face."];

export default async function NewReviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const reg = await getRegistry();
  const s = reg.bySlug.get((await params).slug);
  if (!s) notFound();

  const p = priceLabel(s);
  const price = p.kind === "quoted" ? "Price on request" : p.kind === "free" ? "Free to start" : `From ${p.amount} ${p.basis}`.trim();
  const local = saAvailability(s.slug).status === "local";

  return (
    <section className="mx-auto grid w-full max-w-[1280px] gap-12 px-6 pt-10 pb-12 lg:grid-cols-[400px_1fr] lg:gap-16 lg:pt-16 lg:pb-[72px]">
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <Link href="/write-a-review" className="inline-flex items-center gap-2 text-[14px] leading-5 font-medium text-muted hover:text-ink">
          <ArrowLeft size={16} strokeWidth={1.5} aria-hidden="true" />
          Choose a different product
        </Link>

        <p className="stamp mt-8 mb-3 text-muted">You are reviewing</p>
        <div className="rounded-[24px] border border-line-firm bg-surface p-6">
          <LogoBadge slug={s.slug} name={s.name} size={72} />
          <h1 className="mt-5 font-heading text-[30px] leading-9 font-bold tracking-[-0.02em]">{s.name}</h1>
          <p className="text-[14px] leading-5 text-muted">{s.vendor}</p>
          <p className="mt-4 flex items-center gap-2 text-[15px] leading-6 font-semibold">
            {local && <SaFlag height={13} />}
            {price}
          </p>
          <Link href={`/register/${s.slug}`} className="prose-link mt-4 inline-block text-[14px]">
            See {s.name} on the register
          </Link>
        </div>

        <h2 className="mt-8 font-heading text-[18px] leading-6 font-bold">Before you write</h2>
        <ul className="mt-3 space-y-2.5">
          {TIPS.map((t) => (
            <li key={t} className="flex gap-3 text-[14px] leading-6">
              <Check size={16} strokeWidth={1.75} aria-hidden="true" className="mt-1 flex-none text-lime-text" />
              {t}
            </li>
          ))}
        </ul>
      </aside>

      <div>
        <h2 className="font-heading text-[34px] leading-[38px] font-bold tracking-[-0.03em] md:text-[48px] md:leading-[50px]">Write your review.</h2>
        <p className="mt-3 mb-8 max-w-[560px] text-[16px] leading-7 text-muted">It takes about five minutes. It appears on {s.name}&apos;s page once an editor has read it, and it is published as written.</p>
        {!isSupabaseConfigured() && (
          <p className="mb-8 max-w-[560px] rounded-[12px] border border-line-firm p-4 text-[14px] leading-5 text-muted">
            Review submission needs the database, which is not connected in this environment. The form below will tell you so if you try to send.
          </p>
        )}
        <div className="rounded-[28px] border border-line-firm bg-surface p-6 md:p-10">
          <ReviewForm
            slug={s.slug}
            name={s.name}
            products={reg.items.map((x) => ({ slug: x.slug, name: x.name }))}
            plans={s.pricing_plans.filter((p) => p.price !== null).map((p) => p.name)}
          />
        </div>
      </div>
    </section>
  );
}
