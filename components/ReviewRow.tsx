import { Check, X } from "lucide-react";
import Link from "next/link";
import { formatDateLong, formatRating } from "@/lib/format";
import type { Review } from "@/lib/types";

/**
 * A reader's review. The rating numeral sits in a 56px left column and belongs to
 * this review alone: it is never averaged or counted. On the right are the
 * headline, the reader's own words, what it does well and where it falls short,
 * and the details a buyer can weigh against their own situation: how long they
 * have used it, which plan, what for, what they used before, what else they
 * looked at and why they chose it. A detail the reader left out is left out.
 */
export function ReviewRow({ review, productNames }: { review: Review; productNames?: Record<string, string> }) {
  const attribution = [review.author_name, review.author_role, review.industry, review.company_size && `${review.company_size} employees`].filter(Boolean).join(" · ");

  const facts: { label: string; value: React.ReactNode }[] = [];
  if (review.time_used) facts.push({ label: "Time using it", value: review.time_used });
  if (review.plan_used) facts.push({ label: "Plan", value: review.plan_used });
  if (review.used_for) facts.push({ label: "Uses it for", value: review.used_for });
  if (review.switched_from) facts.push({ label: "Used before", value: review.switched_from });
  const alternatives = (review.alternatives_considered ?? []).filter((slug) => productNames?.[slug]);
  if (alternatives.length) {
    facts.push({
      label: "Also looked at",
      value: alternatives.map((slug, i) => (
        <span key={slug}>
          {i > 0 && ", "}
          <Link href={`/register/${slug}`} className="prose-link">
            {productNames?.[slug]}
          </Link>
        </span>
      )),
    });
  }

  return (
    <li className="flex gap-4 border-b border-line py-6">
      <div className="w-14 flex-none">
        <p className="font-heading text-[32px] leading-9 font-bold tracking-[-0.02em]">{formatRating(review.rating)}</p>
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-[16px] leading-6 font-semibold">{review.title}</h3>
        <p className="mt-1 max-w-[68ch] text-[15px] leading-6 whitespace-pre-line">{review.body}</p>

        {(review.pros || review.cons) && (
          <div className="mt-4 grid max-w-[760px] gap-3 sm:grid-cols-2">
            {review.pros && (
              <div className="rounded-[12px] bg-lime-wash p-3.5">
                <p className="flex items-center gap-2 text-[13px] leading-5 font-semibold">
                  <Check size={16} strokeWidth={2} aria-hidden="true" className="text-lime-text" />
                  Does well
                </p>
                <p className="mt-1 text-[14px] leading-5 whitespace-pre-line">{review.pros}</p>
              </div>
            )}
            {review.cons && (
              <div className="rounded-[12px] border border-line-firm p-3.5">
                <p className="flex items-center gap-2 text-[13px] leading-5 font-semibold">
                  <X size={16} strokeWidth={2} aria-hidden="true" className="text-muted" />
                  Falls short
                </p>
                <p className="mt-1 text-[14px] leading-5 whitespace-pre-line">{review.cons}</p>
              </div>
            )}
          </div>
        )}

        {facts.length > 0 && (
          <dl className="mt-4 grid max-w-[760px] gap-x-6 gap-y-2.5 text-[13px] leading-5 sm:grid-cols-2">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="stamp text-muted">{f.label}</dt>
                <dd className="mt-0.5 text-[14px] leading-5">{f.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {review.reasons && review.reasons.length > 0 && (
          <div className="mt-4">
            <p className="stamp text-muted">Chose it for</p>
            <ul className="mt-1.5 flex flex-wrap gap-2">
              {review.reasons.map((r) => (
                <li key={r} className="rounded-full border border-line-firm px-3 py-1 text-[13px] leading-5">
                  {r}
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="mt-3 text-[12px] leading-4 text-muted">
          {attribution} · {formatDateLong(review.created_at)}
        </p>

        {review.vendor_reply && (
          <div className="mt-4 max-w-[760px] rounded-[12px] border border-line-firm bg-paper p-4">
            <p className="stamp text-muted">Reply from the vendor{review.vendor_reply_by ? `: ${review.vendor_reply_by}` : ""}</p>
            <p className="mt-1.5 text-[14px] leading-5 whitespace-pre-line">{review.vendor_reply}</p>
            <p className="mt-2 text-[12px] leading-4 text-muted">
              Shown at the vendor&apos;s request{review.vendor_reply_at ? `, ${formatDateLong(review.vendor_reply_at)}` : ""}. It does not change the review above. <Link href="/review-guidelines#replies" className="prose-link">How replies work</Link>.
            </p>
          </div>
        )}
      </div>
    </li>
  );
}
