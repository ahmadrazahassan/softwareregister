import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductForm } from "@/components/admin/ProductForm";
import { requireAdmin } from "@/lib/admin/guard";
import type { Software } from "@/lib/types";

export const metadata = { title: "Edit product" };

export default async function AdminProduct({ params }: { params: Promise<{ slug: string }> }) {
  const { supabase } = await requireAdmin();
  const { slug } = await params;
  const { data } = await supabase.from("software").select("*").eq("slug", slug).maybeSingle();
  if (!data) notFound();
  const s = data as Software;

  return (
    <>
      <p className="stamp mb-2 text-muted">
        <Link href="/admin/products" className="hover:text-ink">Products</Link> / {s.slug}
      </p>
      <h1 className="mb-8 font-heading text-[28px] leading-8 font-bold tracking-[-0.02em]">{s.name}</h1>
      <ProductForm s={s} />
      <p className="mt-8 text-[13px]">
        <Link href={`/register/${s.slug}`} className="text-lime-text underline underline-offset-4">
          View the public record
        </Link>
      </p>
    </>
  );
}
