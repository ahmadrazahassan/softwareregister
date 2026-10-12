"use server";

import { randomBytes } from "node:crypto";
import { NEWSLETTER_INTERESTS, CONTACT_EMAIL, SITE_URL } from "../site";
import { serviceClient } from "../supabase/admin";
import { publicClient } from "../supabase/public";
import { mailConfigured, sendMail } from "../server/mail";
import { rateLimited, visitorHash } from "../server/visitor";
import { COMPANY_SIZES, INDUSTRIES } from "../queries/reviews";
import { MAX_ALTERNATIVES, MAX_REASONS, REASONS, REVIEW_LIMITS, TIME_USED } from "../review-options";
import { loadSoftware } from "../queries/source";
import type { FormState } from "./state";

/**
 * Visitor submissions. Everything is validated here on the server, because a
 * client side check is a courtesy and not a guard. Each form carries a hidden
 * honeypot field that a person never sees and a bot fills in.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function text(fd: FormData, name: string, max: number): string {
  const v = fd.get(name);
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

function isBot(fd: FormData): boolean {
  return text(fd, "website_url", 200) !== "";
}

const NOT_CONFIGURED =
  "This form is not switched on in this environment yet. Write to us at " + CONTACT_EMAIL + " instead.";

function client() {
  return serviceClient() ?? publicClient();
}

/* ------------------------------------------------------------ The Dispatch */

export async function subscribeDispatch(_prev: FormState, fd: FormData): Promise<FormState> {
  if (isBot(fd)) return { ok: true, message: "You are on the list." };

  const email = text(fd, "email", 254).toLowerCase();
  if (!EMAIL_RE.test(email)) return { ok: false, message: null, errors: { email: "Enter a valid email address." } };

  const valid = new Set<string>(NEWSLETTER_INTERESTS.map((i) => i.value));
  const interests = fd.getAll("interests").filter((v): v is string => typeof v === "string" && valid.has(v));

  const hash = await visitorHash();
  if (rateLimited(`dispatch:${hash}`, 5, 3_600_000)) {
    return { ok: false, message: "Too many attempts from this connection. Try again in an hour." };
  }

  const sb = client();
  if (!sb) return { ok: false, message: NOT_CONFIGURED };

  const needsConfirmation = mailConfigured() && Boolean(serviceClient());
  const token = randomBytes(24).toString("hex");
  const now = new Date().toISOString();

  const { error } = await sb.from("dispatch_subscribers").insert({
    email,
    interests,
    status: needsConfirmation ? "pending" : "confirmed",
    token,
    consented_at: now,
    confirmed_at: needsConfirmation ? null : now,
    ip_hash: hash,
  });

  // 23505 is a unique violation: the address is already on the list. Say so without leaking its status.
  if (error && error.code !== "23505") {
    console.error("[softwareregister] subscribe failed:", error.message);
    return { ok: false, message: "Something went wrong on our side. Try again in a moment." };
  }

  if (needsConfirmation && !error) {
    await sendMail(
      email,
      "Confirm your subscription to The Dispatch",
      `Confirm your address to receive The Dispatch from Software Register.\n\n${SITE_URL}/api/dispatch/confirm?token=${token}\n\nIf you did not ask for this, ignore this email and nothing will be sent.`,
    );
    return { ok: true, message: "Check your inbox. We sent a link to confirm your address." };
  }
  return { ok: true, message: "You are on the list. We write when a price changes or a product is withdrawn." };
}

export async function unsubscribeDispatch(_prev: FormState, fd: FormData): Promise<FormState> {
  const email = text(fd, "email", 254).toLowerCase();
  const token = text(fd, "token", 100);
  if (!token && !EMAIL_RE.test(email)) return { ok: false, message: null, errors: { email: "Enter the address you subscribed with." } };

  const sb = serviceClient();
  if (!sb) return { ok: false, message: NOT_CONFIGURED };

  let q = sb.from("dispatch_subscribers").update({ status: "unsubscribed", unsubscribed_at: new Date().toISOString() });
  q = token ? q.eq("token", token) : q.eq("email", email);
  const { error } = await q;
  if (error) return { ok: false, message: "Something went wrong on our side. Try again in a moment." };
  return { ok: true, message: "Removed. You will not hear from us again." };
}

/* --------------------------------------------------------------- Enquiries */

const SUBJECTS = ["General", "Submit a listing", "Correct a price or a record", "Update a listing", "Reply to a review", "Press", "Other"] as const;

export async function submitEnquiry(_prev: FormState, fd: FormData): Promise<FormState> {
  if (isBot(fd)) return { ok: true, message: "Sent." };

  const name = text(fd, "name", 120);
  const email = text(fd, "email", 254).toLowerCase();
  const subject = text(fd, "subject", 80);
  const message = text(fd, "message", 4000);

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Tell us your name.";
  if (!EMAIL_RE.test(email)) errors.email = "Enter a valid email address.";
  if (!(SUBJECTS as readonly string[]).includes(subject)) errors.subject = "Choose a subject.";
  if (message.length < 10) errors.message = "Write at least a sentence.";
  if (Object.keys(errors).length) return { ok: false, message: null, errors };

  const hash = await visitorHash();
  if (rateLimited(`enquiry:${hash}`, 5, 3_600_000)) {
    return { ok: false, message: "Too many messages from this connection. Try again in an hour." };
  }

  const sb = client();
  if (!sb) return { ok: false, message: NOT_CONFIGURED };

  const { error } = await sb.from("enquiries").insert({ name, email, subject, message, ip_hash: hash });
  if (error) {
    console.error("[softwareregister] enquiry failed:", error.message);
    return { ok: false, message: "Something went wrong on our side. Try again in a moment." };
  }
  return { ok: true, message: "Received. We read every enquiry." };
}

/* ------------------------------------------------------------- Corrections */

/**
 * A correction to a price or a record, sent from a product's page. It lands in the
 * same inbox as any enquiry, with the product and the vendor's page that shows the
 * right figure written at the top, so an editor can check it against the source.
 */
export async function submitCorrection(_prev: FormState, fd: FormData): Promise<FormState> {
  if (isBot(fd)) return { ok: true, message: "Sent." };

  const slug = text(fd, "product", 80);
  const what = text(fd, "what", 3000);
  const sourceRaw = text(fd, "source", 300);
  const name = text(fd, "name", 120);
  const email = text(fd, "email", 254).toLowerCase();

  const errors: Record<string, string> = {};
  const product = slug ? (await loadSoftware()).find((s) => s.slug === slug) : undefined;
  if (slug && !product) errors.product = "That product is not on the register.";
  if (what.length < 10) errors.what = "Say what is wrong, in at least a sentence.";
  const source = sourceRaw ? webAddress(sourceRaw) : null;
  if (sourceRaw && !source) errors.source = "Enter the address of the vendor's page, such as https://vendor.co.za/pricing.";
  if (name.length < 2) errors.name = "Tell us your name.";
  if (!EMAIL_RE.test(email)) errors.email = "Enter a valid email address.";
  if (Object.keys(errors).length) return { ok: false, message: null, errors };

  const hash = await visitorHash();
  if (rateLimited(`correction:${hash}`, 5, 3_600_000)) {
    return { ok: false, message: "Too many messages from this connection. Try again in an hour." };
  }

  const sb = client();
  if (!sb) return { ok: false, message: NOT_CONFIGURED };

  const message = [product ? `Product: ${product.name} (/register/${product.slug})` : "Product: not about one product", source ? `Vendor page that shows it: ${source}` : "Vendor page: none given", "", what].join("\n");
  const { error } = await sb.from("enquiries").insert({ name, email, subject: "Correct a price or a record", message, ip_hash: hash });
  if (error) {
    console.error("[softwareregister] correction failed:", error.message);
    return { ok: false, message: "Something went wrong on our side. Try again in a moment." };
  }
  return { ok: true, message: "Received. An editor reads it, checks it against the vendor's page and corrects the register where the page supports it." };
}

/* ---------------------------------------------------------------- Listings */

const LISTING_CATEGORIES = ["Accounting", "ERP", "Payroll", "HR", "CRM", "Project management", "Something else"] as const;

/** A website address as a vendor types it: with or without the scheme. Returns a clean https or http URL, or null. */
function webAddress(raw: string): string | null {
  if (!raw) return null;
  const withScheme = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    const u = new URL(withScheme);
    return u.hostname.includes(".") ? u.toString() : null;
  } catch {
    return null;
  }
}

/** A vendor asks for a product to be listed. It lands in the enquiries inbox under the listing subject. */
export async function submitListing(_prev: FormState, fd: FormData): Promise<FormState> {
  if (isBot(fd)) return { ok: true, message: "Received." };

  const name = text(fd, "name", 120);
  const email = text(fd, "email", 254).toLowerCase();
  const company = text(fd, "company", 160);
  const product = text(fd, "product", 160);
  const website = webAddress(text(fd, "website", 300));
  const pricingRaw = text(fd, "pricing_url", 300);
  const pricing = pricingRaw ? webAddress(pricingRaw) : "";
  const category = text(fd, "category", 40);
  const notes = text(fd, "notes", 1500);

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Tell us your name.";
  if (!EMAIL_RE.test(email)) errors.email = "Enter a valid work email address.";
  if (company.length < 2) errors.company = "Tell us the company that sells it.";
  if (product.length < 2) errors.product = "Tell us the name of the product.";
  if (!website) errors.website = "Enter the product's website, for example example.co.za.";
  if (pricingRaw && !pricing) errors.pricing_url = "Enter a web address for the pricing page, or leave it empty.";
  if (!(LISTING_CATEGORIES as readonly string[]).includes(category)) errors.category = "Choose the closest category.";
  if (Object.keys(errors).length) return { ok: false, message: null, errors };

  const hash = await visitorHash();
  if (rateLimited(`listing:${hash}`, 5, 3_600_000)) {
    return { ok: false, message: "Too many submissions from this connection. Try again in an hour." };
  }

  const sb = client();
  if (!sb) return { ok: false, message: NOT_CONFIGURED };

  const message = [
    `Product: ${product}`,
    `Company: ${company}`,
    `Website: ${website}`,
    `Pricing page: ${pricing || "not given"}`,
    `Category: ${category}`,
    notes ? `Notes: ${notes}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const { error } = await sb.from("enquiries").insert({ name, email, subject: "Submit a listing", message, ip_hash: hash });
  if (error) {
    console.error("[softwareregister] listing failed:", error.message);
    return { ok: false, message: "Something went wrong on our side. Try again in a moment." };
  }
  return { ok: true, message: "Received. We will read your pricing page and write to you at the address you gave." };
}

/* ----------------------------------------------------------------- Reviews */

function rating(fd: FormData, name: string): number | null {
  const n = Number(fd.get(name));
  return Number.isInteger(n) && n >= 1 && n <= 5 ? n : null;
}

export async function submitReview(_prev: FormState, fd: FormData): Promise<FormState> {
  if (isBot(fd)) return { ok: true, message: "Queued for moderation." };

  const slug = text(fd, "software_slug", 80);
  const title = text(fd, "title", 140);
  const body = text(fd, "body", 4000);
  const author_name = text(fd, "author_name", 100);
  const author_role = text(fd, "author_role", 100) || null;
  const company_size = text(fd, "company_size", 30) || null;
  const industry = text(fd, "industry", 60) || null;
  const overall = rating(fd, "rating");
  const pros = text(fd, "pros", REVIEW_LIMITS.pros) || null;
  const cons = text(fd, "cons", REVIEW_LIMITS.cons) || null;
  const time_used = text(fd, "time_used", 40) || null;
  const plan_used = text(fd, "plan_used", REVIEW_LIMITS.plan_used) || null;
  const used_for = text(fd, "used_for", REVIEW_LIMITS.used_for) || null;
  const switched_from = text(fd, "switched_from", REVIEW_LIMITS.switched_from) || null;
  const reasons = [...new Set(fd.getAll("reasons").filter((v): v is string => typeof v === "string" && (REASONS as readonly string[]).includes(v)))].slice(0, MAX_REASONS);

  const errors: Record<string, string> = {};
  const software = await loadSoftware();
  const exists = software.some((s) => s.slug === slug);
  const known = new Set(software.map((s) => s.slug));
  const alternatives = [...new Set(fd.getAll("alternatives").filter((v): v is string => typeof v === "string" && known.has(v) && v !== slug))].slice(0, MAX_ALTERNATIVES);
  if (!exists) errors.software_slug = "That product is not on the register.";
  if (time_used && !(TIME_USED as readonly string[]).includes(time_used)) errors.time_used = "Choose how long you have used it from the list.";
  if (overall === null) errors.rating = "Give an overall rating from one to five.";
  if (title.length < 4) errors.title = "Give the review a short title.";
  if (body.length < 30) errors.body = "Write at least a couple of sentences.";
  if (author_name.length < 2) errors.author_name = "Tell us your name.";
  if (company_size && !(COMPANY_SIZES as readonly string[]).includes(company_size)) errors.company_size = "Choose a company size from the list.";
  if (industry && !(INDUSTRIES as readonly string[]).includes(industry)) errors.industry = "Choose an industry from the list.";
  if (Object.keys(errors).length) return { ok: false, message: null, errors };

  const hash = await visitorHash();
  if (rateLimited(`review:${hash}`, 3, 3_600_000)) {
    return { ok: false, message: "Too many reviews from this connection. Try again in an hour." };
  }

  const sb = client();
  if (!sb) return { ok: false, message: NOT_CONFIGURED };

  const row = {
    software_slug: slug,
    rating: overall,
    sub_ease: rating(fd, "sub_ease"),
    sub_value: rating(fd, "sub_value"),
    sub_support: rating(fd, "sub_support"),
    sub_functionality: rating(fd, "sub_functionality"),
    title,
    body,
    author_name,
    author_role,
    company_size,
    industry,
    status: "pending",
    ip_hash: hash,
  };
  const details = { pros, cons, time_used, plan_used, used_for, switched_from, alternatives_considered: alternatives.length ? alternatives : null, reasons: reasons.length ? reasons : null };
  let { error } = await sb.from("reviews").insert({ ...row, ...details });
  if (error && (error.code === "42703" || error.code === "PGRST204" || /column/i.test(error.message))) {
    // The database has not run migration 0004 yet. Keep what the reader wrote by adding it to the review text.
    console.warn("[softwareregister] review details columns are missing: run supabase/migrations/0004_review_details.sql");
    const extra = [pros && `What it does well: ${pros}`, cons && `Where it falls short: ${cons}`, used_for && `Used for: ${used_for}`, plan_used && `Plan: ${plan_used}`, time_used && `Time using it: ${time_used}`, switched_from && `Used before: ${switched_from}`]
      .filter(Boolean)
      .join("\n");
    ({ error } = await sb.from("reviews").insert({ ...row, body: extra ? `${body}\n\n${extra}`.slice(0, 4000) : body }));
  }
  if (error) {
    console.error("[softwareregister] review failed:", error.message);
    return { ok: false, message: "Something went wrong on our side. Try again in a moment." };
  }
  return { ok: true, message: "Queued for moderation. It appears once an editor has read it." };
}
