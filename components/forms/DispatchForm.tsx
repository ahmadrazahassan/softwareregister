"use client";

import { useActionState } from "react";
import { keepForm } from "@/components/forms/keep-form";
import { subscribeDispatch } from "@/lib/actions/forms";
import { initialFormState } from "@/lib/actions/state";
import { NEWSLETTER_INTERESTS } from "@/lib/site";

interface Props {
  /** The inverted panel variant: white text, --lime submit. */
  inverted?: boolean;
  /** Show the interest checkboxes. The home page panel leaves them off. */
  interests?: boolean;
}

/**
 * Subscribe form. No subscriber count, no social proof, no incentive. The
 * submit is --lime with --lime-ink text, and carries no icon.
 */
export function DispatchForm({ inverted = false, interests = false }: Props) {
  const [state, action, pending] = useActionState(subscribeDispatch, initialFormState);

  if (state.ok) {
    return (
      <p role="status" className={`max-w-[520px] p-4 text-[15px] leading-6 ${inverted ? "bg-lime text-lime-ink" : "bg-lime-wash text-ink"}`}>
        {state.message}
      </p>
    );
  }

  const line = inverted ? "border-panel-ink/40 hover:border-panel-ink focus:border-panel-ink text-panel-ink placeholder:text-panel-ink/60" : "";

  return (
    <form action={action} onSubmit={keepForm(action)} className="max-w-[520px]" noValidate>
      {/* Honeypot. People never see it. Bots fill it in. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Leave this field empty
          <input type="text" name="website_url" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label htmlFor={inverted ? "dispatch-email-panel" : "dispatch-email"} className={`stamp mb-1 block ${inverted ? "text-panel-ink/70" : "text-muted"}`}>
        Email address
      </label>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <input
          id={inverted ? "dispatch-email-panel" : "dispatch-email"}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.co.za"
          aria-invalid={state.errors?.email ? true : undefined}
          aria-describedby={state.errors?.email ? "dispatch-email-error" : undefined}
          className={`field flex-1 ${line}`}
        />
        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-11 flex-none cursor-pointer items-center justify-center rounded-[10px] border border-lime bg-lime px-5 text-[15px] leading-6 font-semibold text-lime-ink hover:bg-lime-wash disabled:opacity-60"
        >
          {pending ? "Sending" : "Subscribe"}
        </button>
      </div>

      {interests && (
        <fieldset className="mt-6">
          <legend className="stamp mb-2 text-muted">Tell us when</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {NEWSLETTER_INTERESTS.map((i) => (
              <label key={i.value} className="flex cursor-pointer items-center gap-2 text-[15px]">
                <input type="checkbox" name="interests" value={i.value} defaultChecked className="check" />
                {i.label}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      {state.errors?.email && (
        <p id="dispatch-email-error" role="alert" className={`mt-2 text-[13px] ${inverted ? "text-panel-ink" : "text-alert"}`}>
          {state.errors.email}
        </p>
      )}
      {state.message && !state.ok && (
        <p role="alert" className={`mt-2 text-[13px] ${inverted ? "text-panel-ink" : "text-alert"}`}>
          {state.message}
        </p>
      )}
      <p className={`mt-3 text-[12px] leading-4 ${inverted ? "text-panel-ink/70" : "text-muted"}`}>
        By subscribing you agree to the <a href="/privacy-policy" className="underline underline-offset-2">privacy policy</a>. Unsubscribe any time.
      </p>
    </form>
  );
}
