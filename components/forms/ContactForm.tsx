"use client";

import { useActionState } from "react";
import { keepForm } from "@/components/forms/keep-form";
import { submitEnquiry } from "@/lib/actions/forms";
import { initialFormState } from "@/lib/actions/state";

export const ENQUIRY_SUBJECTS = ["General", "Submit a listing", "Correct a price or a record", "Update a listing", "Reply to a review", "Press", "Other"] as const;

/** Bare inputs, one --lime submit. */
export function ContactForm({ defaultSubject }: { defaultSubject: string }) {
  const [state, action, pending] = useActionState(submitEnquiry, initialFormState);
  const e = state.errors ?? {};

  if (state.ok) {
    return (
      <p role="status" className="bg-lime-wash p-4 text-[15px] leading-6 text-ink">
        {state.message}
      </p>
    );
  }

  const field = (id: string, label: string, input: React.ReactNode) => (
    <div>
      <label htmlFor={id} className="stamp mb-1 block text-muted">
        {label}
      </label>
      {input}
      {e[id] && (
        <p id={`${id}-error`} role="alert" className="mt-1 text-[13px] text-alert">
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

      {field("name", "Your name", <input id="name" name="name" type="text" autoComplete="name" maxLength={120} className="field" aria-invalid={e.name ? true : undefined} />)}
      {field("email", "Email address", <input id="email" name="email" type="email" autoComplete="email" maxLength={254} className="field" aria-invalid={e.email ? true : undefined} />)}
      {field(
        "subject",
        "Subject",
        <select id="subject" name="subject" defaultValue={defaultSubject} className="field">
          {ENQUIRY_SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>,
      )}
      {field("message", "Message", <textarea id="message" name="message" maxLength={4000} className="field" aria-invalid={e.message ? true : undefined} />)}

      {state.message && !state.ok && (
        <p role="alert" className="text-[14px] text-alert">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-[10px] border border-lime bg-lime px-5 text-[15px] leading-6 font-semibold text-lime-ink hover:border-lime-deep hover:bg-lime-deep hover:text-panel-ink disabled:opacity-60"
      >
        {pending ? "Sending" : "Send enquiry"}
      </button>
      <p className="text-[12px] leading-4 text-muted">
        We use what you send only to answer you. We store a salted hash of your connection to limit abuse, never your address. See the privacy policy.
      </p>
    </form>
  );
}
