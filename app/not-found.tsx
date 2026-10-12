import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="mx-auto w-full max-w-[640px] px-6 py-24">
      <p className="stamp mb-3 text-muted">404</p>
      <h1 className="font-heading text-[32px] leading-9 font-bold tracking-[-0.02em] md:text-[44px] md:leading-[46px]">That page is not on the register.</h1>
      <p className="mt-5 text-[15px] leading-6 text-muted">
        The address may have changed, or the product may have been withdrawn. Browse the software list, or search for something.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/register" className="inline-flex min-h-11 items-center justify-center rounded-[10px] border border-lime bg-lime px-5 text-[15px] font-semibold text-lime-ink hover:border-lime-deep hover:bg-lime-deep hover:text-panel-ink">
          Browse all software
        </Link>
        <Link href="/lookup" className="inline-flex min-h-11 items-center justify-center rounded-[10px] border border-line-firm px-5 text-[15px] font-semibold hover:bg-lime-wash">
          Search
        </Link>
      </div>
    </main>
  );
}
