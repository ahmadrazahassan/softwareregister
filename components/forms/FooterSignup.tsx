"use client";

import { ChevronRight } from "lucide-react";
import { useActionState } from "react";
import { keepForm } from "@/components/forms/keep-form";
import { subscribeDispatch } from "@/lib/actions/forms";
import { initialFormState } from "@/lib/actions/state";

/**
 * The footer subscribe field: one large bare input on a rule, with an arrow to
 * send it. Same server action as every other Dispatch form, same honeypot, no
 * subscriber count and no incentive.
 */
export function FooterSignup({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  const [state, action, pending] = useActionState(subscribeDispatch, initialFormState);

  if (state.ok) {
    return (
      <p role="status" className="max-w-[460px] rounded-[10px] bg-lime-wash p-4 text-[15px] leading-6 text-ink">
        {state.message}
      </p>
    );
  }

  return (
    <form action={action} onSubmit={keepForm(action)} className="max-w-[460px]" noValidate>
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Leave this field empty
          <input type="text" name="website_url" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label htmlFor="footer-email" className="sr-only">
        Email address
      </label>
      <div className={`flex items-center border-b ${dark ? "border-white/40" : "border-ink"}`}>
        <input
          id="footer-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Email address"
          aria-invalid={state.errors?.email ? true : undefined}
          aria-describedby={state.errors?.email ? "footer-email-error" : undefined}
          className={`block min-w-0 flex-1 border-0 bg-transparent outline-none focus-visible:outline-2 focus-visible:outline-offset-2 ${
            dark ? "h-12 text-[16px] text-white placeholder:text-white/60 focus-visible:outline-lime" : "h-14 text-[22px] placeholder:text-muted focus-visible:outline-lime-deep"
          }`}
          style={{ borderRadius: 0 }}
        />
        <button
          type="submit"
          disabled={pending}
          aria-label="Subscribe to The Dispatch"
          className="flex h-11 w-11 flex-none cursor-pointer items-center justify-center rounded-[10px] bg-lime text-lime-ink hover:bg-lime-deep hover:text-panel-ink disabled:opacity-60"
        >
          <ChevronRight size={22} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>

      {state.errors?.email && (
        <p id="footer-email-error" role="alert" className={`mt-2 text-[13px] ${dark ? "text-[#ffb4a8]" : "text-alert"}`}>
          {state.errors.email}
        </p>
      )}
      {state.message && !state.ok && (
        <p role="alert" className={`mt-2 text-[13px] ${dark ? "text-[#ffb4a8]" : "text-alert"}`}>
          {state.message}
        </p>
      )}
      <p className={`mt-3 text-[12px] leading-4 ${dark ? "text-white/60" : "text-muted"}`}>
        A note only when a price changes or a product is withdrawn. By subscribing you agree to the{" "}
        <a href="/privacy-policy" className="underline underline-offset-2">
          privacy policy
        </a>
        .
      </p>
    </form>
  );
}
