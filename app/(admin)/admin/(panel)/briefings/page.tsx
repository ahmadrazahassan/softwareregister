import Link from "next/link";
import { setPublished } from "@/lib/actions/admin";
import { requireAdmin } from "@/lib/admin/guard";
import { formatDateStamp } from "@/lib/format";

export const metadata = { title: "Briefings" };

export default async function AdminBriefings() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("briefings").select("slug, title, topic, published_at, published").order("published_at", { ascending: false });
  const rows = (data ?? []) as { slug: string; title: string; topic: string; published_at: string; published: boolean }[];

  return (
    <>
      <h1 className="font-heading text-[28px] leading-8 font-bold tracking-[-0.02em]">Briefings</h1>
      <p className="mt-1 mb-6 text-[13px] text-muted">
        {rows.filter((r) => r.published).length} published of {rows.length}. Briefing text lives in lib/data/briefings.ts and is seeded into the database. Edit it there and run <code>npm run seed</code>.
      </p>
      <div className="overflow-x-auto border border-line">
        <table className="register">
          <caption className="sr-only">Briefings</caption>
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Topic</th>
              <th scope="col">Published</th>
              <th scope="col">Status</th>
              <th scope="col"><span className="sr-only">Action</span></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.slug}>
                <td>
                  <Link href={`/briefings/${r.slug}`} className="font-semibold hover:underline">
                    {r.title}
                  </Link>
                </td>
                <td className="text-muted">{r.topic}</td>
                <td>{formatDateStamp(r.published_at)}</td>
                <td className={r.published ? "" : "text-muted"}>{r.published ? "Published" : "Draft"}</td>
                <td>
                  <form action={setPublished}>
                    <input type="hidden" name="table" value="briefings" />
                    <input type="hidden" name="key" value={r.slug} />
                    <input type="hidden" name="published" value={String(!r.published)} />
                    <button type="submit" className="cursor-pointer border border-line-firm px-3 py-1 text-[13px] font-semibold hover:bg-lime-wash">
                      {r.published ? "Unpublish" : "Publish"}
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
