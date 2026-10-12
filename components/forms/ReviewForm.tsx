"use client";

import { X } from "lucide-react";
import { useActionState, useState } from "react";
import { keepForm } from "@/components/forms/keep-form";
import { submitReview } from "@/lib/actions/forms";
import { initialFormState } from "@/lib/actions/state";
import { MAX_ALTERNATIVES, MAX_REASONS, REASONS, REVIEW_LIMITS, TIME_USED } from "@/lib/review-options";

export interface ReviewFormProduct {
  slug: string;
  name: string;
}

const SIZES = ["1 to 10", "11 to 50", "51 to 200", "201 to 500", "500 plus"];
const INDUSTRIES = [
  "Accounting and finance",
  "Construction",
  "Education",
  "Healthcare",
  "Information technology",
  "Manufacturing",
  "Professional services",
  "Retail and wholesale",
  "Other",
];

const WORDS = ["", "Poor", "Fair", "Good", "Very good", "Excellent"];

/** One overall rating, set by the reader. It belongs to this review only and is never averaged or counted. */
function StarRow({ error }: { error?: string }) {
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(0);
  const shown = hover || value;
  return (
    <div>
      <div role="radiogroup" aria-label="Your overall rating" className="flex items-center" onMouseLeave={() => setHover(0)}>
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={value === n}
            aria-label={`${n} out of 5, ${WORDS[n]}`}
            onClick={() => setValue(n)}
            onMouseEnter={() => setHover(n)}
            className={`h-12 w-11 cursor-pointer text-[32px] leading-none ${n <= shown ? "text-ink" : "text-line-firm"}`}
          >
            ★
          </button>
        ))}
        <span className="ml-3 text-[14px] leading-5 text-muted">{WORDS[shown]}</span>
      </div>
      <input type="hidden" name="rating" value={value || ""} />
      {error && (
        <p role="alert" className="mt-1 text-[13px] text-alert">
          {error}
        </p>
      )}
    </div>
  );
}

function Field({ label, htmlFor, hint, error, children }: { label: string; htmlFor: string; hint?: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-[14px] leading-5 font-semibold">
        {label}
      </label>
      {hint && <p className="mb-2 text-[13px] leading-5 text-muted">{hint}</p>}
      {children}
      {error && (
        <p id={`${htmlFor}-error`} role="alert" className="mt-1.5 text-[13px] text-alert">
          {error}
        </p>
      )}
    </div>
  );
}

/** Up to three other products the reader looked at. Each chip sends the product's slug. */
function AlternativesPicker({ products, selfSlug }: { products: ReviewFormProduct[]; selfSlug: string }) {
  const [picked, setPicked] = useState<string[]>([]);
  const nameOf = (slug: string) => products.find((p) => p.slug === slug)?.name ?? slug;
  const left = products.filter((p) => p.slug !== selfSlug && !picked.includes(p.slug));
  return (
    <div>
      {picked.length > 0 && (
        <ul className="mb-3 flex flex-wrap gap-2">
          {picked.map((slug) => (
            <li key={slug}>
              <button
                type="button"
                onClick={() => setPicked(picked.filter((x) => x !== slug))}
                aria-label={`Remove ${nameOf(slug)}`}
                className="inline-flex min-h-9 cursor-pointer items-center gap-2 rounded-full border border-lime-deep/40 bg-lime-wash px-3 text-[14px] leading-5 font-medium"
              >
                {nameOf(slug)}
                <X size={14} strokeWidth={2} aria-hidden="true" />
              </button>
              <input type="hidden" name="alternatives" value={slug} />
            </li>
          ))}
        </ul>
      )}
      {picked.length < MAX_ALTERNATIVES ? (
        <select
          id="alternatives"
          aria-label="Add a product you also looked at"
          value=""
          onChange={(e) => e.target.value && setPicked([...picked, e.target.value])}
          className="field"
        >
          <option value="">{picked.length === 0 ? "Choose a product" : "Add another product"}</option>
          {left.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.name}
            </option>
          ))}
        </select>
      ) : (
        <p className="text-[13px] leading-5 text-muted">That is three, the most you can add.</p>
      )}
    </div>
  );
}

/** Why the reader chose it, up to four reasons from a fixed list. */
function ReasonPicker() {
  const [picked, setPicked] = useState<string[]>([]);
  const full = picked.length >= MAX_REASONS;
  return (
    <fieldset className="m-0 border-0 p-0">
      <legend className="mb-1.5 text-[14px] leading-5 font-semibold">Why did you choose it?</legend>
      <p className="mb-3 text-[13px] leading-5 text-muted">Choose up to {MAX_REASONS}.</p>
      <ul className="grid gap-2 sm:grid-cols-2">
        {REASONS.map((r) => {
          const on = picked.includes(r);
          return (
            <li key={r}>
              <label className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-[12px] border px-3 text-[14px] leading-5 ${on ? "border-lime-deep bg-lime-wash font-medium" : "border-line-firm bg-surface"} ${full && !on ? "cursor-not-allowed opacity-50" : ""}`}>
                <input
                  type="checkbox"
                  className="check"
                  name="reasons"
                  value={r}
                  checked={on}
                  disabled={full && !on}
                  onChange={(e) => setPicked(e.target.checked ? [...picked, r] : picked.filter((x) => x !== r))}
                />
                {r}
              </label>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
}

function Step({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div role="group" aria-labelledby={`step-${n}`} className="border-t border-line pt-8 first:border-t-0 first:pt-0">
      <h3 id={`step-${n}`} className="mb-6 flex items-center gap-3">
        <span aria-hidden="true" className="grid h-8 w-8 flex-none place-items-center rounded-full bg-lime font-heading text-[14px] font-bold text-lime-ink">
          {n}
        </span>
        <span className="font-heading text-[20px] leading-6 font-bold tracking-[-0.01em]">{title}</span>
      </h3>
      <div className="space-y-6">{children}</div>
    </div>
  );
}

/**
 * The review form, in four numbered steps inside one card: the experience, what
 * it does well and where it falls short, how the reader uses it, then who is
 * writing. One overall rating, a title and a free text review, plus the details
 * that help the next buyer: time used, plan, what for, what they used before,
 * what else they looked at and why they chose it. One lime
 * submit, and success is a plain block saying the review is queued for an
 * editor. Nothing is averaged, counted or ranked from what is sent here.
 */
export function ReviewForm({ slug, name, products, plans }: { slug: string; name: string; products: ReviewFormProduct[]; plans: string[] }) {
  const [state, action, pending] = useActionState(submitReview, initialFormState);
  const e = state.errors ?? {};

  if (state.ok) {
    return (
      <div role="status" className="rounded-[20px] bg-lime-wash p-8">
        <p className="font-heading text-[24px] leading-8 font-bold tracking-[-0.02em]">Thank you.</p>
        <p className="mt-2 text-[15px] leading-6">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} onSubmit={keepForm(action)} className="space-y-8" noValidate>
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Leave this field empty
          <input type="text" name="website_url" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <input type="hidden" name="software_slug" value={slug} />

      <Step n="1" title="Your experience">
        <div>
          <p className="mb-1.5 text-[14px] leading-5 font-semibold">Overall, how was {name}?</p>
          <StarRow error={e.rating} />
        </div>
        <Field label="Give your review a headline" htmlFor="title" error={e.title}>
          <input id="title" name="title" type="text" maxLength={140} placeholder="For example: Good value once you are past the first plan" className="field" aria-invalid={e.title ? true : undefined} />
        </Field>
        <Field
          label="Your review"
          htmlFor="body"
          hint="What does it do well? Where does it fall short? Which plan are you on, and who would you recommend it to?"
          error={e.body}
        >
          <textarea id="body" name="body" maxLength={4000} rows={7} className="field min-h-[180px]" aria-invalid={e.body ? true : undefined} />
        </Field>
      </Step>

      <Step n="2" title="What it does well and where it falls short">
        <Field label="What does it do well?" htmlFor="pros" hint="One or two things you would point to." error={e.pros}>
          <textarea id="pros" name="pros" maxLength={REVIEW_LIMITS.pros} rows={3} className="field min-h-[96px]" />
        </Field>
        <Field label="Where does it fall short?" htmlFor="cons" hint="What annoyed you, cost more than you expected, or was missing?" error={e.cons}>
          <textarea id="cons" name="cons" maxLength={REVIEW_LIMITS.cons} rows={3} className="field min-h-[96px]" />
        </Field>
      </Step>

      <Step n="3" title="How you use it">
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="How long have you used it?" htmlFor="time_used" error={e.time_used}>
            <select id="time_used" name="time_used" className="field" defaultValue="">
              <option value="">Choose</option>
              {TIME_USED.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Which plan are you on?" htmlFor="plan_used">
            <input id="plan_used" name="plan_used" type="text" list="plan-options" maxLength={REVIEW_LIMITS.plan_used} placeholder="For example: Standard" className="field" />
            <datalist id="plan-options">
              {plans.map((p) => (
                <option key={p} value={p} />
              ))}
            </datalist>
          </Field>
        </div>
        <Field label="What do you use it for?" htmlFor="used_for" hint="For example: monthly payroll for 14 staff, or invoicing and VAT returns.">
          <input id="used_for" name="used_for" type="text" maxLength={REVIEW_LIMITS.used_for} className="field" />
        </Field>
        <Field label="What did you use before?" htmlFor="switched_from" hint="Another product, spreadsheets, or nothing.">
          <input id="switched_from" name="switched_from" type="text" list="before-options" maxLength={REVIEW_LIMITS.switched_from} className="field" />
          <datalist id="before-options">
            <option value="Spreadsheets" />
            <option value="Nothing, this is my first" />
            {products
              .filter((p) => p.slug !== slug)
              .map((p) => (
                <option key={p.slug} value={p.name} />
              ))}
          </datalist>
        </Field>
        <div>
          <p className="mb-1.5 text-[14px] leading-5 font-semibold">Which other products did you look at?</p>
          <AlternativesPicker products={products} selfSlug={slug} />
        </div>
        <ReasonPicker />
      </Step>

      <Step n="4" title="About you">
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Your name" htmlFor="author_name" error={e.author_name}>
            <input id="author_name" name="author_name" type="text" maxLength={100} autoComplete="name" className="field" />
          </Field>
          <Field label="Your role" htmlFor="author_role">
            <input id="author_role" name="author_role" type="text" maxLength={100} autoComplete="organization-title" className="field" />
          </Field>
          <Field label="Company size" htmlFor="company_size" error={e.company_size}>
            <select id="company_size" name="company_size" className="field" defaultValue="">
              <option value="">Choose</option>
              {SIZES.map((s) => (
                <option key={s} value={s}>
                  {s} employees
                </option>
              ))}
            </select>
          </Field>
          <Field label="Industry" htmlFor="industry" error={e.industry}>
            <select id="industry" name="industry" className="field" defaultValue="">
              <option value="">Choose</option>
              {INDUSTRIES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </Step>

      {state.message && !state.ok && (
        <p role="alert" className="text-[14px] text-alert">
          {state.message}
        </p>
      )}
      {e.software_slug && (
        <p role="alert" className="text-[14px] text-alert">
          {e.software_slug}
        </p>
      )}

      <div className="flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-[360px] text-[12px] leading-4 text-muted">
          An editor reads every review before it appears. We store a salted hash of your connection to limit abuse, never your address. See the{" "}
          <a href="/privacy-policy" className="underline underline-offset-2">
            privacy policy
          </a>
          .
        </p>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-12 flex-none cursor-pointer items-center justify-center rounded-[10px] border border-lime bg-lime px-8 text-[16px] leading-6 font-semibold text-lime-ink hover:border-lime-deep hover:bg-lime-deep hover:text-panel-ink disabled:opacity-60"
        >
          {pending ? "Sending" : "Submit my review"}
        </button>
      </div>
    </form>
  );
}
