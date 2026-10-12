import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ContactForm } from "@/components/forms/ContactForm";
import { Container, PageHeader } from "@/components/primitives";
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_HREF, INFORMATION_OFFICER, SITE_ADDRESS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact us",
  description: "Write to Software Register: submit a software listing, correct a price or a record, or ask a question.",
  alternates: { canonical: "/enquiries" },
};

const PREFILL: Record<string, string> = {
  listing: "Submit a listing",
  correction: "Correct a price or a record",
  update: "Update a listing",
  reply: "Reply to a review",
  press: "Press",
};

export default async function EnquiriesPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const raw = Array.isArray(sp.subject) ? sp.subject[0] : sp.subject;
  // Vendors have a page of their own for a listing.
  if (raw === "listing") redirect("/add-a-product");
  const subject = (raw && PREFILL[raw]) ?? "General";

  return (
    <>
      <PageHeader title={subject === "Submit a listing" ? "Add a product" : "Contact us"} stamp={subject === "Submit a listing" ? "Submit a listing" : "Write to us"}>
        {subject === "Submit a listing"
          ? "Vendors can ask for a product to be listed. A listing is free, it does not buy a better position, and we check the price ourselves."
          : "Corrections, listings, press and questions. A person reads every message."}
      </PageHeader>
      <Container className="pb-12 lg:pb-[72px]">
        <div className="grid gap-12 border-t border-line-firm pt-10 lg:grid-cols-[minmax(0,520px)_minmax(0,1fr)] lg:gap-20">
          <ContactForm defaultSubject={subject} />

          <aside aria-label="Direct details">
            <h2 className="stamp mb-4 text-muted">Direct</h2>
            <dl className="space-y-4 text-[15px] leading-6">
              <div>
                <dt className="stamp text-muted">Email</dt>
                <dd className="m-0">
                  <a href={`mailto:${CONTACT_EMAIL}`} className="prose-link">{CONTACT_EMAIL}</a>
                </dd>
              </div>
              <div>
                <dt className="stamp text-muted">Phone</dt>
                <dd className="m-0">
                  <a href={CONTACT_PHONE_HREF} className="prose-link">{CONTACT_PHONE}</a>
                </dd>
              </div>
              <div>
                <dt className="stamp text-muted">Address</dt>
                <dd className="m-0">{SITE_ADDRESS}</dd>
              </div>
              <div>
                <dt className="stamp text-muted">Information officer</dt>
                <dd className="m-0">{INFORMATION_OFFICER}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </Container>
    </>
  );
}
