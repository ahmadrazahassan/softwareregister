import { requireAdmin } from "@/lib/admin/guard";

export const metadata = { title: "Sectors" };

export default async function AdminSectors() {
  const { supabase } = await requireAdmin();
  const [{ data: sectors }, { data: software }] = await Promise.all([
    supabase.from("sectors").select("*").order("sort"),
    supabase.from("software").select("sector, status"),
  ]);

  return (
    <>
      <h1 className="font-heading text-[28px] leading-8 font-bold tracking-[-0.02em]">Sectors</h1>
      <p className="mt-1 mb-6 text-[13px] text-muted">The six sectors are fixed in lib/data/sectors.ts and seeded into the database.</p>
      <div className="max-w-[760px] overflow-x-auto border border-line">
        <table className="register">
          <caption className="sr-only">Sectors</caption>
          <thead>
            <tr>
              <th scope="col">Sector</th>
              <th scope="col">Slug</th>
              <th scope="col" className="num">Active products</th>
            </tr>
          </thead>
          <tbody>
            {(sectors ?? []).map((s) => (
              <tr key={s.slug as string}>
                <td className="font-semibold">{s.label as string}</td>
                <td className="text-muted">{s.slug as string}</td>
                <td className="num">{(software ?? []).filter((x) => x.sector === s.slug && x.status === "active").length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
