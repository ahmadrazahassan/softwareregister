import Link from "next/link";
import { moderateReview, setVendorReply } from "@/lib/actions/admin";
import { requireAdmin } from "@/lib/admin/guard";
import { formatDateLong } from "@/lib/format";
import type { Review } from "@/lib/types";

export const metadata = { title: "Reviews" };

const TABS = ["pending", "approved", "rejected"] as const;

/** The small print of a review, for the editor: the details a reader chose to add. */
function detailLine(r: Review): string {
  return [
    r.time_used,
    r.plan_used && `plan ${r.plan_used}`,
    r.used_for && `for ${r.used_for}`,
    r.switched_from && `before: ${r.switched_from}`,
    r.alternatives_considered?.length ? `also looked at ${r.alternatives_considered.join(", ")}` : null,
    r.reasons?.length ? `chose it for ${r.reasons.join(", ").toLowerCase()}` : null,
  ]
    .filter(Boolean)
    .join(" · ");
}

export default async function AdminReviews({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { supabase } = await requireAdmin();
  const raw = (await searchParams).status;
  const status = (TABS as readonly string[]).includes(String(raw)) ? String(raw) : "pending";

  const { data } = await supabase.from("reviews").select("*").eq("status", status).order("created_at", { ascending: false }).limit(100);
  const rows = (data ?? []) as (Review & { status: string })[];

  return (
    <>
      <h1 className="font-heading text-[28px] leading-8 font-bold tracking-[-0.02em]">Reviews</h1>
      <nav aria-label="Status" className="mt-4 mb-6 flex gap-6 border-b border-line text-[14px]">
        {TABS.map((t) => (
          <Link key={t} href={`/admin/reviews?status=${t}`} className={`pb-2 capitalize ${t === status ? "border-b-2 border-lime font-semibold" : "text-muted"}`}>
            {t}
          </Link>
        ))}
      </nav>

      {rows.length === 0 ? (
        <p className="text-[14px] text-muted">No {status} reviews.</p>
      ) : (
        <ul className="max-w-[860px] space-y-4">
          {rows.map((r) => (
            <li key={r.id} className="border border-line bg-surface p-4">
              <div className="flex items-baseline justify-between gap-4">
                <p className="text-[15px] font-semibold">
                  {r.title} <span className="ml-2 font-heading text-[20px] font-bold">{r.rating}.0</span>
                </p>
                <p className="stamp text-muted">{r.software_slug}</p>
              </div>
              <p className="mt-2 text-[14px] leading-5 whitespace-pre-line">{r.body}</p>
              {(r.pros || r.cons) && (
                <div className="mt-3 grid gap-3 text-[13px] leading-5 sm:grid-cols-2">
                  {r.pros && (
                    <p>
                      <span className="font-semibold">Does well: </span>
                      {r.pros}
                    </p>
                  )}
                  {r.cons && (
                    <p>
                      <span className="font-semibold">Falls short: </span>
                      {r.cons}
                    </p>
                  )}
                </div>
              )}
              {detailLine(r) && <p className="mt-2 text-[12px] leading-4 text-muted">{detailLine(r)}</p>}
              <p className="mt-2 text-[12px] text-muted">
                {[r.author_name, r.author_role, r.industry, r.company_size && `${r.company_size} employees`].filter(Boolean).join(" · ")} · {formatDateLong(r.created_at.slice(0, 10))}
              </p>
              {status === "approved" && (
                <form action={setVendorReply} className="mt-4 space-y-2 border-t border-line pt-4">
                  <input type="hidden" name="id" value={r.id} />
                  <p className="stamp text-muted">Vendor reply, saved only on the vendor&apos;s request</p>
                  <input name="by" defaultValue={r.vendor_reply_by ?? ""} placeholder="Name, role and company of the person replying" maxLength={120} className="field" aria-label="Who is replying" />
                  <textarea name="reply" defaultValue={r.vendor_reply ?? ""} placeholder="The reply, 10 to 1 500 characters" maxLength={1500} rows={3} className="field" aria-label="The reply" />
                  <div className="flex gap-2">
                    <button name="decision" value="save" className="cursor-pointer border border-lime bg-lime px-4 py-1.5 text-[13px] font-semibold text-lime-ink hover:bg-lime-deep hover:text-panel-ink">
                      Save reply
                    </button>
                    {r.vendor_reply && (
                      <button name="decision" value="clear" className="cursor-pointer border border-line-firm px-4 py-1.5 text-[13px] font-semibold hover:bg-lime-wash">
                        Remove reply
                      </button>
                    )}
                  </div>
                </form>
              )}
              <form action={moderateReview} className="mt-4 flex flex-wrap gap-2">
                <input type="hidden" name="id" value={r.id} />
                {status !== "approved" && (
                  <button name="decision" value="approved" className="cursor-pointer border border-lime bg-lime px-4 py-1.5 text-[13px] font-semibold text-lime-ink hover:bg-lime-deep hover:text-panel-ink">
                    Approve
                  </button>
                )}
                {status !== "rejected" && (
                  <button name="decision" value="rejected" className="cursor-pointer border border-line-firm px-4 py-1.5 text-[13px] font-semibold hover:bg-lime-wash">
                    Reject
                  </button>
                )}
                <button name="decision" value="delete" className="cursor-pointer border border-line-firm px-4 py-1.5 text-[13px] font-semibold text-alert hover:bg-lime-wash">
                  Delete
                </button>
              </form>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
