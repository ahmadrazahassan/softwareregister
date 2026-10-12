import { setEnquiryHandled } from "@/lib/actions/admin";
import { requireAdmin } from "@/lib/admin/guard";
import { formatDateLong } from "@/lib/format";

export const metadata = { title: "Enquiries" };

interface Enquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  handled: boolean;
  created_at: string;
}

export default async function AdminEnquiries() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("enquiries").select("*").order("handled", { ascending: true }).order("created_at", { ascending: false }).limit(200);
  const rows = (data ?? []) as Enquiry[];

  return (
    <>
      <h1 className="font-heading text-[28px] leading-8 font-bold tracking-[-0.02em]">Enquiries</h1>
      <p className="mt-1 mb-6 text-[13px] text-muted">{rows.filter((r) => !r.handled).length} open of {rows.length}.</p>
      {rows.length === 0 ? (
        <p className="text-[14px] text-muted">No enquiries yet.</p>
      ) : (
        <ul className="max-w-[860px] space-y-4">
          {rows.map((r) => (
            <li key={r.id} className={`border bg-surface p-4 ${r.handled ? "border-line" : "border-line-firm"}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="text-[15px] font-semibold">
                  {r.name} <a href={`mailto:${r.email}`} className="ml-2 text-[13px] font-normal text-lime-text underline underline-offset-4">{r.email}</a>
                </p>
                <p className="stamp text-muted">{r.subject} · {formatDateLong(r.created_at.slice(0, 10))}</p>
              </div>
              <p className="mt-2 text-[14px] leading-5 whitespace-pre-line">{r.message}</p>
              <form action={setEnquiryHandled} className="mt-3">
                <input type="hidden" name="id" value={r.id} />
                <input type="hidden" name="handled" value={String(!r.handled)} />
                <button type="submit" className="cursor-pointer border border-line-firm px-4 py-1.5 text-[13px] font-semibold hover:bg-lime-wash">
                  {r.handled ? "Reopen" : "Mark handled"}
                </button>
              </form>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
