"use client";

import { useActionState } from "react";
import { keepForm } from "@/components/forms/keep-form";
import { unsubscribeDispatch } from "@/lib/actions/forms";
import { initialFormState } from "@/lib/actions/state";

export function UnsubscribeForm({ token }: { token: string }) {
  const [state, action, pending] = useActionState(unsubscribeDispatch, initialFormState);

  if (state.ok) {
    return (
      <p role="status" className="bg-lime-wash p-4 text-[15px] leading-6">
        {state.message}
      </p>
    );
  }

  return (
    <form action={action} onSubmit={keepForm(action)} className="space-y-6" noValidate>
      {token ? (
        <input type="hidden" name="token" value={token} />
      ) : (
        <div>
          <label htmlFor="unsub-email" className="stamp mb-1 block text-muted">
            Email address
          </label>
          <input id="unsub-email" name="email" type="email" autoComplete="email" className="field" aria-invalid={state.errors?.email ? true : undefined} />
          {state.errors?.email && (
            <p role="alert" className="mt-1 text-[13px] text-alert">
              {state.errors.email}
            </p>
          )}
        </div>
      )}
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
        {pending ? "Removing" : "Unsubscribe"}
      </button>
    </form>
  );
}
