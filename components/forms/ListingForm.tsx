"use client";

import { useActionState } from "react";
import { keepForm } from "@/components/forms/keep-form";
import { submitListing } from "@/lib/actions/forms";
import { initialFormState } from "@/lib/actions/state";

const CATEGORIES = ["Accounting", "ERP", "Payroll", "HR", "CRM", "Project management", "Something else"];

function Field({ label, id, hint, error, children }: { label: string; id: string; hint?: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[14px] leading-5 font-semibold">
        {label}
      </label>
      {children}
      {hint && !error && <p className="mt-1.5 text-[12px] leading-4 text-muted">{hint}</p>}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-[13px] text-alert">
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * The vendor's listing request. A few plain fields, one lime submit. The
 * request goes to the same inbox as every enquiry, under its own subject, so
 * an editor can open the vendor's pricing page and read it.
 */
export function ListingForm() {
  const [state, action, pending] = useActionState(submitListing, initialFormState);
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
    <form action={action} onSubmit={keepForm(action)} className="space-y-6" noValidate>
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Leave this field empty
          <input type="text" name="website_url" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Your name" id="name" error={e.name}>
          <input id="name" name="name" type="text" autoComplete="name" maxLength={120} className="field" aria-invalid={e.name ? true : undefined} />
        </Field>
        <Field label="Work email" id="email" error={e.email}>
          <input id="email" name="email" type="email" autoComplete="email" maxLength={254} className="field" aria-invalid={e.email ? true : undefined} />
        </Field>
        <Field label="Company" id="company" error={e.company}>
          <input id="company" name="company" type="text" autoComplete="organization" maxLength={160} className="field" aria-invalid={e.company ? true : undefined} />
        </Field>
        <Field label="Product name" id="product" error={e.product}>
          <input id="product" name="product" type="text" maxLength={160} className="field" aria-invalid={e.product ? true : undefined} />
        </Field>
        <Field label="Product website" id="website" hint="For example example.co.za" error={e.website}>
          <input id="website" name="website" type="text" inputMode="url" autoComplete="url" maxLength={300} className="field" aria-invalid={e.website ? true : undefined} />
        </Field>
        <Field label="Category" id="category" error={e.category}>
          <select id="category" name="category" className="field" defaultValue="">
            <option value="" disabled>
              Choose the closest
            </option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Pricing page" id="pricing_url" hint="Optional. The page where you publish your prices, if you have one." error={e.pricing_url}>
        <input id="pricing_url" name="pricing_url" type="text" inputMode="url" maxLength={300} className="field" aria-invalid={e.pricing_url ? true : undefined} />
      </Field>

      <Field label="Anything we should know" id="notes" hint="Optional. Plans, who it is for, or what it handles for SARS.">
        <textarea id="notes" name="notes" maxLength={1500} rows={4} className="field min-h-[110px]" />
      </Field>

      {state.message && !state.ok && (
        <p role="alert" className="text-[14px] text-alert">
          {state.message}
        </p>
      )}

      <div className="flex flex-col gap-4 border-t border-line pt-6">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-12 cursor-pointer items-center justify-center rounded-[10px] border border-lime bg-lime px-8 text-[16px] leading-6 font-semibold text-lime-ink hover:border-lime-deep hover:bg-lime-deep hover:text-panel-ink disabled:opacity-60"
        >
          {pending ? "Sending" : "Send my listing request"}
        </button>
        <p className="text-[12px] leading-4 text-muted">
          We use what you send only to answer you. We store a salted hash of your connection to limit abuse, never your address. See the{" "}
          <a href="/privacy-policy" className="underline underline-offset-2">
            privacy policy
          </a>
          .
        </p>
      </div>
    </form>
  );
}
