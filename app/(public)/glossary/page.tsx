import type { Metadata } from "next";
import Link from "next/link";
import { GLOSSARY, GLOSSARY_GROUPS, glossarySlug } from "@/lib/data/glossary";
import { getTokens } from "@/lib/queries";
import { fillTokens } from "@/lib/registry";
import { JsonLd, breadcrumbLd, definedTermSetLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Glossary of South African tax, payroll and software terms",
  description: "VAT201, EMP201, EMP501, IRP5, IT3(a), e@syFile, UIF, SDL, ETI, COIDA, BCEA, CCMA and POPIA in plain words, with the software terms the register uses.",
  alternates: { canonical: "/glossary" },
};

export const revalidate = 3600;

export default async function GlossaryPage() {
  const tokens = await getTokens();
  const terms = [...GLOSSARY].sort((a, b) => a.term.localeCompare(b.term, "en-ZA", { sensitivity: "base" }));
  const letters = [...new Set(terms.map((t) => t.term[0].toUpperCase()))];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([{ name: "Glossary", path: "/glossary" }]),
          definedTermSetLd("Software Register glossary", "/glossary", terms.map((t) => ({ term: t.full ? `${t.term} (${t.full})` : t.term, description: fillTokens(t.meaning, tokens) }))),
        ]}
      />
      <header className="mx-auto w-full max-w-[1120px] px-6 pt-12 lg:pt-16">
        <p className="stamp mb-4 text-muted">The glossary · {terms.length} terms</p>
        <h1 className="max-w-[900px] font-heading text-[38px] leading-[42px] font-bold tracking-[-0.03em] md:text-[64px] md:leading-[66px]">The words, in plain words.</h1>
        <p className="mt-6 max-w-[700px] text-[17px] leading-7 text-muted">
          The South African tax, payroll, labour and privacy terms a software buyer meets, and the software terms the register uses. They explain the rules and are not tax, legal or financial advice: check SARS or ask your accountant.
        </p>
        <nav aria-label="Jump to a letter" className="mt-8 flex flex-wrap gap-2">
          {letters.map((l) => (
            <a key={l} href={`#letter-${l}`} className="inline-grid h-10 w-10 place-items-center rounded-full border border-line-firm bg-surface text-[14px] font-semibold hover:bg-lime-wash">
              {l}
            </a>
          ))}
        </nav>
        <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-[13px] leading-5 text-muted">
          {GLOSSARY_GROUPS.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>
      </header>

      <div className="mx-auto mt-12 w-full max-w-[1120px] px-6 pb-12 lg:pb-[72px]">
        {letters.map((letter) => (
          <section key={letter} id={`letter-${letter}`} aria-labelledby={`h-${letter}`} className="scroll-mt-28 border-t border-line-firm py-8">
            <div className="grid gap-6 md:grid-cols-[80px_1fr]">
              <h2 id={`h-${letter}`} className="font-heading text-[44px] leading-[44px] font-bold tracking-[-0.03em]">
                {letter}
              </h2>
              <dl className="space-y-8">
                {terms
                  .filter((t) => t.term[0].toUpperCase() === letter)
                  .map((t) => (
                    <div key={t.term} id={glossarySlug(t.term)} className="scroll-mt-28">
                      <dt className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <span className="font-heading text-[24px] leading-8 font-bold tracking-[-0.02em]">{t.term}</span>
                        {t.full && <span className="text-[14px] leading-5 text-muted">{t.full}</span>}
                        <span className="rounded-full border border-line-firm px-2.5 py-0.5 text-[12px] leading-4">{t.group}</span>
                      </dt>
                      <dd className="m-0 mt-2 max-w-[72ch] text-[16px] leading-7">
                        {fillTokens(t.meaning, tokens)}
                        {t.applies && <span className="mt-2 block text-[14px] leading-6 text-muted">Applies to: {t.applies}</span>}
                        {t.links && t.links.length > 0 && (
                          <span className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[14px] leading-6">
                            {t.links.map((l) => (
                              <Link key={l.href} href={l.href} className="prose-link">
                                {l.label}
                              </Link>
                            ))}
                          </span>
                        )}
                      </dd>
                    </div>
                  ))}
              </dl>
            </div>
          </section>
        ))}
        <p className="border-t border-line-firm pt-6 text-[13px] leading-5 text-muted">
          Did we get a term wrong, or is one missing? <Link href="/suggest-a-correction" className="prose-link">Suggest a correction</Link>.
        </p>
      </div>
    </>
  );
}
