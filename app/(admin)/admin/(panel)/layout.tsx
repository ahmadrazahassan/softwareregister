import Link from "next/link";
import { AdminNav } from "@/components/admin/AdminNav";
import { signOut } from "@/lib/actions/admin";
import { requireAdmin } from "@/lib/admin/guard";

/**
 * The guarded panel. requireAdmin() runs here, and again in every page and
 * action inside it, because a layout does not re-run on every client navigation
 * and is not by itself a guard.
 */
export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  const { user } = await requireAdmin();

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[200px_minmax(0,1fr)]">
      <aside className="border-b border-line bg-paper lg:sticky lg:top-0 lg:h-screen lg:self-start lg:border-r lg:border-b-0">
        <div className="flex items-center justify-between px-4 py-4 lg:block">
          <div>
            <Link href="/admin" className="font-heading text-[16px] font-bold tracking-[-0.02em]">
              Software Register
            </Link>
            <p className="stamp text-muted">Admin</p>
          </div>
          <form action={signOut} className="lg:mt-3">
            <button type="submit" className="text-[13px] text-lime-text underline underline-offset-4">
              Sign out
            </button>
          </form>
        </div>
        <AdminNav />
        <p className="hidden px-4 pt-6 text-[12px] leading-4 break-all text-muted lg:block">{user.email}</p>
        <Link href="/" className="hidden px-4 pt-3 text-[12px] text-muted underline underline-offset-4 lg:block">
          View the public site
        </Link>
      </aside>
      <main id="main" className="min-w-0 px-4 py-6 lg:px-8 lg:py-8">
        {children}
      </main>
    </div>
  );
}
