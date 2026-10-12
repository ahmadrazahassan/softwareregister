import { setPublished } from "@/lib/actions/admin";
import { requireAdmin } from "@/lib/admin/guard";

export const metadata = { title: "Comparisons" };

export default async function AdminComparisons() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("comparisons").select("slug, a, b, published").order("slug");
  const rows = (data ?? []) as { slug: string; a: string; b: string; published: boolean }[];

  return (
    <>
      <h1 className="font-heading text-[28px] leading-8 font-bold tracking-[-0.02em]">Comparisons</h1>
      <p className="mt-1 mb-6 text-[13px] text-muted">
        {rows.filter((r) => r.published).length} published of {rows.length}. Any pair of products can still be compared through the selector, whether or not it is listed here.
      </p>
      <div className="max-w-[860px] overflow-x-auto border border-line">
        <table className="register">
          <caption className="sr-only">Comparisons</caption>
          <thead>
            <tr>
              <th scope="col">Pair</th>
              <th scope="col">Status</th>
              <th scope="col"><span className="sr-only">Action</span></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.slug}>
                <td className="font-semibold">{r.slug}</td>
                <td className={r.published ? "" : "text-muted"}>{r.published ? "Published" : "Hidden"}</td>
                <td>
                  <form action={setPublished}>
                    <input type="hidden" name="table" value="comparisons" />
                    <input type="hidden" name="key" value={r.slug} />
                    <input type="hidden" name="published" value={String(!r.published)} />
                    <button type="submit" className="cursor-pointer border border-line-firm px-3 py-1 text-[13px] font-semibold hover:bg-lime-wash">
                      {r.published ? "Hide" : "Publish"}
                    </button>
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
