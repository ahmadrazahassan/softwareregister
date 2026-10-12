"use client";

import { useActionState } from "react";
import { keepForm } from "@/components/forms/keep-form";
import { updateProduct } from "@/lib/actions/admin";
import { initialFormState } from "@/lib/actions/state";
import { BANKS, LEGAL_ITEMS, SARS_ITEMS, SARS_TRANSFER_ITEMS } from "@/lib/data/sectors";
import type { Software } from "@/lib/types";

const COMPLIANCE_OPTIONS = [...new Set<string>([...SARS_ITEMS, ...SARS_TRANSFER_ITEMS, ...LEGAL_ITEMS])];

function Field({ id, label, hint, error, children }: { id: string; label: string; hint?: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="stamp mb-1 block text-muted">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1 text-[12px] leading-4 text-muted">{hint}</p>}
      {error && (
        <p role="alert" className="mt-1 text-[13px] text-alert">
          {error}
        </p>
      )}
    </div>
  );
}

const tri = (v: boolean | null) => (v === null ? "" : v ? "yes" : "no");

function TriState({ name, label, value }: { name: string; label: string; value: boolean | null }) {
  return (
    <Field id={name} label={label}>
      <select id={name} name={name} defaultValue={tri(value)} className="field">
        <option value="">Not set</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>
    </Field>
  );
}

export function ProductForm({ s }: { s: Software }) {
  const [state, action, pending] = useActionState(updateProduct, initialFormState);
  const e = state.errors ?? {};

  return (
    <form action={action} onSubmit={keepForm(action)} className="max-w-[860px] space-y-10" noValidate>
      <input type="hidden" name="slug" value={s.slug} />

      <fieldset className="grid gap-6 md:grid-cols-2">
        <legend className="stamp mb-4 w-full border-b border-line pb-2 text-muted">Identity</legend>
        <Field id="name" label="Name">
          <input id="name" name="name" defaultValue={s.name} className="field" />
        </Field>
        <Field id="vendor" label="Vendor">
          <input id="vendor" name="vendor" defaultValue={s.vendor} className="field" />
        </Field>
        <div className="md:col-span-2">
          <Field id="summary" label="One sentence summary">
            <textarea id="summary" name="summary" defaultValue={s.summary} className="field" style={{ minHeight: 72 }} />
          </Field>
        </div>
        <Field id="founded" label="Founded" error={e.founded}>
          <input id="founded" name="founded" defaultValue={s.founded ?? ""} inputMode="numeric" className="field" />
        </Field>
        <Field id="status" label="Status" hint="Withdrawn removes the product from the public register.">
          <select id="status" name="status" defaultValue={s.status} className="field">
            <option value="active">Active</option>
            <option value="withdrawn">Withdrawn</option>
          </select>
        </Field>
      </fieldset>

      <fieldset className="grid gap-6 md:grid-cols-2">
        <legend className="stamp mb-4 w-full border-b border-line pb-2 text-muted">Price</legend>
        <Field id="starting_price" label="Starting price" hint="Leave empty for a price on request. Enter 0 for Free." error={e.starting_price}>
          <input id="starting_price" name="starting_price" defaultValue={s.starting_price ?? ""} inputMode="decimal" className="field" />
        </Field>
        <Field id="price_currency" label="Listed in" hint="The currency the vendor lists the price in. Leave blank when the price is on request.">
          <select id="price_currency" name="price_currency" defaultValue={s.price_currency ?? ""} className="field">
            <option value="">Price on request</option>
            {["ZAR", "USD", "GBP", "EUR"].map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
        <Field id="price_basis" label="Basis" hint="Say whether VAT is inside the price. Never guess.">
          <select id="price_basis" name="price_basis" defaultValue={s.price_basis ?? ""} className="field">
            <option value="">None stated</option>
            <option value="mo">/mo</option>
            <option value="mo_incl_vat">/mo incl VAT</option>
            <option value="mo_excl_vat">/mo excl VAT</option>
            <option value="employee_mo">/employee /mo</option>
            <option value="user_mo">/user /mo</option>
          </select>
        </Field>
        <Field id="price_checked_at" label="Checked on" hint="The day you read the price on the vendor's own page. Leave empty when the price is on request." error={e.price_checked_at}>
          <input id="price_checked_at" name="price_checked_at" type="date" defaultValue={s.price_checked_at ?? ""} className="field" />
        </Field>
        <div className="md:col-span-2">
          <Field id="pricing_note" label="Pricing note">
            <textarea id="pricing_note" name="pricing_note" defaultValue={s.pricing_note ?? ""} className="field" style={{ minHeight: 72 }} />
          </Field>
        </div>
        <TriState name="free_trial" label="Free trial" value={s.free_trial} />
        <TriState name="free_plan" label="Free plan" value={s.free_plan} />
        <TriState name="demo" label="Demo" value={s.demo} />
      </fieldset>

      <fieldset>
        <legend className="stamp mb-4 w-full border-b border-line pb-2 text-muted">SARS filing and compliance</legend>
        <label className="mb-4 flex cursor-pointer items-center gap-2 text-[14px] font-semibold">
          <input type="checkbox" name="compliance_checked" defaultChecked={s.compliance !== null} className="check" />
          This product has been checked
        </label>
        <p className="mb-3 text-[12px] leading-4 text-muted">
          Leave unticked and the register shows nothing for this product. Tick it and each ticked item appears on the product page as something the vendor says it handles.
        </p>
        <div className="grid gap-2 sm:grid-cols-3">
          {COMPLIANCE_OPTIONS.map((c) => (
            <label key={c} className="flex cursor-pointer items-center gap-2 text-[14px]">
              <input type="checkbox" name="compliance" value={c} defaultChecked={s.compliance?.includes(c) ?? false} className="check" />
              {c}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="stamp mb-4 w-full border-b border-line pb-2 text-muted">Bank feeds</legend>
        <label className="mb-4 flex cursor-pointer items-center gap-2 text-[14px] font-semibold">
          <input type="checkbox" name="banks_checked" defaultChecked={s.bank_feeds !== null} className="check" />
          This product has been checked
        </label>
        <div className="grid gap-2 sm:grid-cols-4">
          {BANKS.map((b) => (
            <label key={b} className="flex cursor-pointer items-center gap-2 text-[14px]">
              <input type="checkbox" name="bank_feeds" value={b} defaultChecked={s.bank_feeds?.includes(b) ?? false} className="check" />
              {b}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="grid gap-6 md:grid-cols-2">
        <legend className="stamp mb-4 w-full border-b border-line pb-2 text-muted">Links</legend>
        <Field id="website_url" label="Vendor website" error={e.website_url}>
          <input id="website_url" name="website_url" defaultValue={s.website_url ?? ""} className="field" />
        </Field>
        <Field id="vendor_website" label="Price read from" hint="Host and path shown in the pricing stamp, for example xero.com/za.">
          <input id="vendor_website" name="vendor_website" defaultValue={s.vendor_website ?? ""} className="field" />
        </Field>
        <div className="md:col-span-2">
          <Field id="affiliate_url" label="Affiliate URL" hint="Sage products must carry the Sage link. Leave empty if there is no programme." error={e.affiliate_url}>
            <input id="affiliate_url" name="affiliate_url" defaultValue={s.affiliate_url ?? ""} className="field" />
          </Field>
        </div>
      </fieldset>

      <fieldset className="grid gap-6 md:grid-cols-2">
        <legend className="stamp mb-4 w-full border-b border-line pb-2 text-muted">Editorial</legend>
        <Field id="features" label="Features, one per line">
          <textarea id="features" name="features" defaultValue={s.features.join("\n")} className="field" />
        </Field>
        <Field id="integrations" label="Integrations, one per line">
          <textarea id="integrations" name="integrations" defaultValue={s.integrations.join("\n")} className="field" />
        </Field>
        <div className="md:col-span-2">
          <Field id="assessment" label="Assessment" hint="Leave empty and the register writes one from the data. Paragraphs are separated by a blank line.">
            <textarea id="assessment" name="assessment" defaultValue={s.assessment ?? ""} className="field" style={{ minHeight: 160 }} />
          </Field>
        </div>
      </fieldset>

      {state.message && (
        <p role={state.ok ? "status" : "alert"} className={`p-3 text-[14px] ${state.ok ? "bg-lime-wash" : "border border-alert text-alert"}`}>
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-[10px] border border-lime bg-lime px-6 text-[15px] font-semibold text-lime-ink hover:border-lime-deep hover:bg-lime-deep hover:text-panel-ink disabled:opacity-60"
      >
        {pending ? "Saving" : "Save product"}
      </button>
    </form>
  );
}
