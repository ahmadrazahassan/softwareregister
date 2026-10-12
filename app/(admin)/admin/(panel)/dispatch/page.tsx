import { setSubscriberStatus } from "@/lib/actions/admin";
import { requireAdmin } from "@/lib/admin/guard";
import { formatDateStamp } from "@/lib/format";

export const metadata = { title: "Dispatch" };

interface Subscriber {
  id: string;
  email: string;
  interests: string[];
  status: "pending" | "confirmed" | "unsubscribed";
  consented_at: string;
  confirmed_at: string | null;
}

export default async function AdminDispatch() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("dispatch_subscribers").select("id, email, interests, status, consented_at, confirmed_at").order("created_at", { ascending: false }).limit(500);
  const rows = (data ?? []) as Subscriber[];
  const count = (s: Subscriber["status"]) => rows.filter((r) => r.status === s).length;

  return (
    <>
      <h1 className="font-heading text-[28px] leading-8 font-bold tracking-[-0.02em]">The Dispatch</h1>
      <p className="mt-1 mb-6 text-[13px] text-muted">
        {count("confirmed")} confirmed, {count("pending")} pending, {count("unsubscribed")} unsubscribed.
      </p>
      <a href="/admin/dispatch/export" className="mb-6 inline-flex min-h-10 items-center border border-line-firm px-4 text-[14px] font-semibold hover:bg-lime-wash">
        Export confirmed subscribers as CSV
      </a>
      <div className="overflow-x-auto border border-line">
        <table className="register register-dense">
          <caption className="sr-only">Subscribers</caption>
          <thead>
            <tr>
              <th scope="col">Email</th>
              <th scope="col">Status</th>
              <th scope="col">Interests</th>
              <th scope="col">Consented</th>
              <th scope="col"><span className="sr-only">Action</span></th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="text-muted">No subscribers yet.</td>
              </tr>
            )}
            {rows.map((r) => (
              <tr key={r.id}>
                <td className="font-semibold">{r.email}</td>
                <td className={r.status === "confirmed" ? "" : r.status === "pending" ? "text-muted" : "text-alert"}>{r.status}</td>
                <td className="text-[12px] text-muted">{r.interests.join(", ") || "None chosen"}</td>
                <td>{formatDateStamp(r.consented_at.slice(0, 10))}</td>
                <td>
                  <form action={setSubscriberStatus}>
                    <input type="hidden" name="id" value={r.id} />
                    {r.status === "unsubscribed" ? null : (
                      <button name="status" value="unsubscribed" className="cursor-pointer border border-line-firm px-3 py-1 text-[13px] hover:bg-lime-wash">
                        Remove
                      </button>
                    )}
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
