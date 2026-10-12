"use client";

import { useActionState } from "react";
import { keepForm } from "@/components/forms/keep-form";
import { signIn } from "@/lib/actions/admin";
import { initialFormState } from "@/lib/actions/state";

export function LoginForm({ next, disabled }: { next: string; disabled: boolean }) {
  const [state, action, pending] = useActionState(signIn, initialFormState);

  return (
    <form action={action} onSubmit={keepForm(action)} className="space-y-6" noValidate>
      <input type="hidden" name="next" value={next} />
      <div>
        <label htmlFor="email" className="stamp mb-1 block text-muted">
          Email address
        </label>
        <input id="email" name="email" type="email" autoComplete="username" required disabled={disabled} className="field" />
      </div>
      <div>
        <label htmlFor="password" className="stamp mb-1 block text-muted">
          Password
        </label>
        <input id="password" name="password" type="password" autoComplete="current-password" required disabled={disabled} className="field" />
      </div>
      {state.message && (
        <p role="alert" className="text-[14px] text-alert">
          {state.message}
        </p>
      )}
      <button
        type="submit"
        disabled={pending || disabled}
        className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-[10px] border border-lime bg-lime px-5 text-[15px] font-semibold text-lime-ink hover:border-lime-deep hover:bg-lime-deep hover:text-panel-ink disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending ? "Signing in" : "Sign in"}
      </button>
    </form>
  );
}
