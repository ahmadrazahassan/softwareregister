"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "../admin/guard";
import { BANKS, LEGAL_ITEMS, SARS_ITEMS, SARS_TRANSFER_ITEMS } from "../data/sectors";
import { rateLimited, visitorHash } from "../server/visitor";
import { isSupabaseConfigured } from "../supabase/config";
import { createServerSupabase } from "../supabase/server";
import type { FormState } from "./state";

/**
 * Admin actions. Every one begins with requireAdmin(), so it is checked on the
 * server whatever the proxy did or did not do. Writes go through the signed in
 * user's session, so row level security is a second lock behind this one.
 */

/** Today's date in South Africa, which is where "checked today" has to be true. */
function todayInJohannesburg(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Johannesburg" }).format(new Date());
}

function refreshPublicSite() {
  // The public pages are statically rendered and revalidate hourly. An admin edit should show at once.
  revalidatePath("/", "layout");
}

/* ---------------------------------------------------------------- auth */

export async function signIn(_prev: FormState, fd: FormData): Promise<FormState> {
  if (!isSupabaseConfigured()) {
    return { ok: false, message: "Supabase is not configured, so nobody can sign in. Add the keys to .env.local." };
  }
  const email = String(fd.get("email") ?? "").trim().toLowerCase();
  const password = String(fd.get("password") ?? "");
  const next = String(fd.get("next") ?? "");
  if (!email || !password) return { ok: false, message: "Enter your email and password." };

  const hash = await visitorHash();
  if (rateLimited(`login:${hash}`, 10, 15 * 60_000)) {
    return { ok: false, message: "Too many attempts. Wait fifteen minutes and try again." };
  }

  const supabase = await createServerSupabase();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  // One message for every failure, so the form cannot be used to find out which emails exist.
  if (error || !data.user) return { ok: false, message: "That email and password do not match." };

  if (data.user.app_metadata?.role !== "admin") {
    await supabase.auth.signOut();
    return { ok: false, message: "That account is not an administrator." };
  }

  // Only ever send the user to a path inside /admin. Anything else is an open redirect.
  const safe = next.startsWith("/admin") && !next.startsWith("//") && !next.includes("\\") ? next : "/admin";
  redirect(safe);
}

export async function signOut() {
  const supabase = await createServerSupabase();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

/* ------------------------------------------------------------ products */

export async function markChecked(formData: FormData) {
  const { supabase } = await requireAdmin();
  const slug = String(formData.get("slug") ?? "");
  if (!slug) return;
  await supabase.from("software").update({ price_checked_at: todayInJohannesburg() }).eq("slug", slug);
  refreshPublicSite();
  revalidatePath("/admin");
}

function lines(v: FormDataEntryValue | null): string[] {
  return String(v ?? "")
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function triState(v: FormDataEntryValue | null): boolean | null {
  return v === "yes" ? true : v === "no" ? false : null;
}

function num(v: FormDataEntryValue | null): number | null {
  const s = String(v ?? "").trim().replace(/\s/g, "").replace(",", ".");
  if (s === "") return null;
  const n = Number(s);
  return Number.isFinite(n) && n >= 0 ? n : NaN;
}

function checklist(fd: FormData, checkedFlag: string, name: string, allowed: readonly string[]): string[] | null {
  if (fd.get(checkedFlag) !== "on") return null;
  return fd.getAll(name).filter((v): v is string => typeof v === "string" && allowed.includes(v));
}

export async function updateProduct(_prev: FormState, fd: FormData): Promise<FormState> {
  const { supabase } = await requireAdmin();
  const slug = String(fd.get("slug") ?? "");
  if (!slug) return { ok: false, message: "Missing product." };

  const price = num(fd.get("starting_price"));
  const founded = num(fd.get("founded"));
  if (Number.isNaN(price)) return { ok: false, message: null, errors: { starting_price: "Enter a number, or leave it empty for a price on request." } };
  if (Number.isNaN(founded) || (founded !== null && (founded < 1800 || founded > 2100))) {
    return { ok: false, message: null, errors: { founded: "Enter a year." } };
  }

  const currency = String(fd.get("price_currency") ?? "");
  const basis = String(fd.get("price_basis") ?? "");
  const checkedAt = String(fd.get("price_checked_at") ?? "");
  if (checkedAt && !/^\d{4}-\d{2}-\d{2}$/.test(checkedAt)) {
    return { ok: false, message: null, errors: { price_checked_at: "Use the form 2026-08-21." } };
  }

  const allCompliance = [...SARS_ITEMS, ...SARS_TRANSFER_ITEMS, ...LEGAL_ITEMS];

  const patch = {
    name: String(fd.get("name") ?? "").trim(),
    vendor: String(fd.get("vendor") ?? "").trim(),
    summary: String(fd.get("summary") ?? "").trim(),
    website_url: String(fd.get("website_url") ?? "").trim() || null,
    vendor_website: String(fd.get("vendor_website") ?? "").trim() || null,
    affiliate_url: String(fd.get("affiliate_url") ?? "").trim() || null,
    founded,
    starting_price: price,
    price_currency: ["ZAR", "USD", "GBP", "EUR"].includes(currency) ? currency : null,
    price_basis: ["mo", "mo_incl_vat", "mo_excl_vat", "employee_mo", "user_mo"].includes(basis) ? basis : null,
    price_checked_at: checkedAt || null,
    pricing_note: String(fd.get("pricing_note") ?? "").trim() || null,
    free_trial: triState(fd.get("free_trial")),
    free_plan: triState(fd.get("free_plan")),
    demo: triState(fd.get("demo")),
    compliance: checklist(fd, "compliance_checked", "compliance", allCompliance),
    bank_feeds: checklist(fd, "banks_checked", "bank_feeds", BANKS),
    features: lines(fd.get("features")),
    integrations: lines(fd.get("integrations")),
    assessment: String(fd.get("assessment") ?? "").trim() || null,
    status: fd.get("status") === "withdrawn" ? "withdrawn" : "active",
  };

  if (!patch.name || !patch.vendor) return { ok: false, message: "A product needs a name and a vendor." };
  for (const key of ["website_url", "affiliate_url"] as const) {
    const v = patch[key];
    if (v && !/^https:\/\//.test(v)) return { ok: false, message: null, errors: { [key]: "Use a full https address." } };
  }

  const { error } = await supabase.from("software").update(patch).eq("slug", slug);
  if (error) return { ok: false, message: `The database refused it: ${error.message}` };

  refreshPublicSite();
  revalidatePath("/admin");
  revalidatePath("/admin/products");
  return { ok: true, message: "Saved. The public pages show it now." };
}

/* ------------------------------------------------------------- reviews */

export async function moderateReview(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const decision = String(formData.get("decision") ?? "");
  if (!id) return;
  if (decision === "delete") {
    await supabase.from("reviews").delete().eq("id", id);
  } else if (decision === "approved" || decision === "rejected" || decision === "pending") {
    await supabase.from("reviews").update({ status: decision }).eq("id", id);
  }
  refreshPublicSite();
  revalidatePath("/admin/reviews");
  revalidatePath("/admin");
}

/** Saves, or clears, the reply a vendor asked to have shown beneath an approved review. Only an editor can do this. */
export async function setVendorReply(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const clear = String(formData.get("decision") ?? "") === "clear";
  const reply = String(formData.get("reply") ?? "").trim().slice(0, 1500);
  const by = String(formData.get("by") ?? "").trim().slice(0, 120);
  if (clear || reply.length < 10 || by.length < 2) {
    if (clear) await supabase.from("reviews").update({ vendor_reply: null, vendor_reply_by: null, vendor_reply_at: null }).eq("id", id);
    revalidatePath("/admin/reviews");
    return;
  }
  await supabase.from("reviews").update({ vendor_reply: reply, vendor_reply_by: by, vendor_reply_at: new Date().toISOString() }).eq("id", id);
  refreshPublicSite();
  revalidatePath("/admin/reviews");
}

/* ----------------------------------------------------------- enquiries */

export async function setEnquiryHandled(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const handled = formData.get("handled") === "true";
  if (!id) return;
  await supabase.from("enquiries").update({ handled }).eq("id", id);
  revalidatePath("/admin/enquiries");
  revalidatePath("/admin");
}

/* ------------------------------------------------------------ publishing */

export async function setPublished(formData: FormData) {
  const { supabase } = await requireAdmin();
  const table = String(formData.get("table") ?? "");
  const key = String(formData.get("key") ?? "");
  const published = formData.get("published") === "true";
  if (!key || (table !== "briefings" && table !== "comparisons")) return;
  await supabase.from(table).update({ published }).eq("slug", key);
  refreshPublicSite();
  revalidatePath(`/admin/${table}`);
  revalidatePath("/admin");
}

export async function setSubscriberStatus(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!id || !["confirmed", "unsubscribed"].includes(status)) return;
  await supabase
    .from("dispatch_subscribers")
    .update({ status, ...(status === "unsubscribed" ? { unsubscribed_at: new Date().toISOString() } : { confirmed_at: new Date().toISOString() }) })
    .eq("id", id);
  revalidatePath("/admin/dispatch");
  revalidatePath("/admin");
}
