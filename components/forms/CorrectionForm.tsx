"use client";

import { useActionState } from "react";
import { keepForm } from "@/components/forms/keep-form";
import { submitCorrection } from "@/lib/actions/forms";
import { initialFormState } from "@/lib/actions/state";

export interface CorrectionProduct {
  slug: string;
  name: string;
}

/**
 * A correction, sent with the vendor's own page as the source. The product comes
 * from the page the reader was on, so most of the form is already filled in.
 */
export function CorrectionForm({ products, defaultProduct }: { products: CorrectionProduct[]; defaultProduct: string }) {
  const [state, action, pending] = useActionState(submitCorrection, initialFormState);
  const e = state.errors ?? {};

  if (state.ok) {
    return (
      <div role="status" className="rounded-[20px] bg-lime-wash p-8">
        <p className="font-heading text-[24px] leading-8 font-bold tracking-[-0.02em]">Thank you.</p>
        <p className="mt-2 text-[15px] leading-6">{state.message}</p>
      </div>
    );
  }

  const field = (id: string, label: string, input: React.ReactNode, hint?: string) => (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[14px] leading-5 font-semibold">
        {label}
      </label>
      {hint && <p className="mb-2 text-[13px] leading-5 text-muted">{hint}</p>}
      {input}
      {e[id] && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-[13px] text-alert">
          {e[id]}
        </p>
      )}
    </div>
  );

  return (
    <form action={action} onSubmit={keepForm(action)} className="space-y-6" noValidate>
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Leave this field empty
          <input type="text" name="website_url" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {field(
        "product",
        "Which product is it about?",
        <select id="product" name="product" defaultValue={defaultProduct} className="field">
          <option value="">Not about one product</option>
          {products.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.name}
            </option>
          ))}
        </select>,
      )}
      {field(
        "what",
        "What is wrong, and what should it say?",
        <textarea id="what" name="what" rows={5} maxLength={3000} className="field min-h-[130px]" aria-invalid={e.what ? true : undefined} />,
        "For example: the Standard plan is shown at one price and the vendor's page now shows another.",
      )}
      {field(
        "source",
        "The vendor's page that shows it",
        <input id="source" name="source" type="text" inputMode="url" maxLength={300} placeholder="https://" className="field" aria-invalid={e.source ? true : undefined} />,
        "A link lets us check it quickly. If it is not on a public page, say where you saw it.",
      )}
      <div className="grid gap-6 sm:grid-cols-2">
        {field("name", "Your name", <input id="name" name="name" type="text" autoComplete="name" maxLength={120} className="field" aria-invalid={e.name ? true : undefined} />)}
        {field("email", "Your email", <input id="email" name="email" type="email" autoComplete="email" maxLength={254} className="field" aria-invalid={e.email ? true : undefined} />)}
      </div>

      {state.message && !state.ok && (
        <p role="alert" className="text-[14px] text-alert">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-12 cursor-pointer items-center justify-center rounded-[10px] border border-lime bg-lime px-8 text-[16px] leading-6 font-semibold text-lime-ink hover:border-lime-deep hover:bg-lime-deep hover:text-panel-ink disabled:opacity-60"
      >
        {pending ? "Sending" : "Send the correction"}
      </button>
      <p className="text-[12px] leading-4 text-muted">
        We use what you send only to check the correction and to write back. We store a salted hash of your connection to limit abuse, never your address. See the{" "}
        <a href="/privacy-policy" className="underline underline-offset-2">
          privacy policy
        </a>
        .
      </p>
    </form>
  );
}
