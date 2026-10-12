import Link from "next/link";
import { FooterSignup } from "@/components/forms/FooterSignup";
import { formatDateStamp } from "@/lib/format";
import { CTA, EXTRA, NAV } from "@/lib/nav";
import { getSiteStats, loadSectors } from "@/lib/queries";
import { ADDRESS_LINES, CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_HREF, INFORMATION_OFFICER, SITE_FOUNDER, SITE_NAME } from "@/lib/site";
import { Logo } from "./BrandMark";
import { ctaClass } from "./CtaButton";
import { SaFlag } from "./SaFlag";

const LEGAL = [
  { label: "Terms of use", href: "/terms" },
  { label: "Privacy policy", href: "/privacy-policy" },
  { label: "Cookie policy", href: "/cookie-policy" },
  { label: "Affiliate disclosure", href: "/affiliate-disclosure" },
  { label: "PAIA manual", href: "/paia-manual" },
  { label: "Accessibility", href: "/accessibility" },
];

function Column({ heading, links }: { heading: string; links: { label: string; href: string }[] }) {
  return (
    <nav aria-label={heading}>
      <h2 className="mb-4 font-sans text-[15px] leading-5 font-semibold text-panel-ink">{heading}</h2>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-[14px] leading-5 text-white/70 hover:text-white hover:underline hover:underline-offset-4">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/**
 * The footer, in two parts on one lime field. The top part is the closing
 * call to action: one headline, one blue action and one quiet one. The bottom
 * part is a dark rounded card that holds every link in plain columns, the
 * price alert signup, and who publishes the site. Nothing here is decoration:
 * no social icons are shown because the site has no accounts to link.
 */
export async function Footer() {
  const [stats, sectors] = await Promise.all([getSiteStats(), loadSectors()]);
  const software = sectors.map((s) => ({ label: s.name, href: `/sector/${s.slug}` }));

  return (
    <footer className="mt-20 bg-lime px-3 pt-16 pb-3 text-lime-ink sm:px-4 sm:pb-4 lg:pt-24">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="mx-auto max-w-[920px] text-center">
          <h2 className="font-heading text-[40px] leading-[42px] font-bold tracking-[-0.03em] md:text-[68px] md:leading-[68px]">Find software that fits your business.</h2>
          <p className="mx-auto mt-6 max-w-[560px] text-[17px] leading-7">
            Compare {stats.products} products on price in rand, features and SARS filing. Every price is read from the vendor and dated.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href={CTA.browse.href} className={ctaClass("blue", "min-h-12 px-7 text-[16px]")}>
              {CTA.browse.label} <span aria-hidden="true">→</span>
            </Link>
            <Link href={CTA.compare.href} className={ctaClass("quiet", "min-h-12 border-lime-ink px-7 text-[16px]")}>
              {CTA.compare.label}
            </Link>
          </div>
          <p className="mt-6 text-[12px] leading-4">Some links are affiliate links. We earn a commission when you buy, and it never changes what we publish.</p>
        </div>

        <div className="mt-14 rounded-[28px] bg-panel p-7 text-panel-ink md:p-12 lg:mt-20">
          <div className="grid gap-12 lg:grid-cols-[1.25fr_0.8fr_0.8fr_0.8fr_1.4fr]">
            <div>
              <Logo size={36} tone="light" />
              <p className="mt-5 max-w-[260px] text-[14px] leading-6 text-white/70">What business software costs in rand, and whether it files with SARS.</p>
              <p className="mt-5 flex items-center gap-2.5 text-[13px] leading-5 text-white/70">
                <SaFlag height={14} />
                Made for South African buyers
              </p>
            </div>

            <Column heading="Software" links={[{ label: NAV.software.title, href: NAV.software.href }, ...software]} />
            <Column
              heading="Resources"
              links={[
                { label: NAV.compare.title, href: NAV.compare.href },
                { label: NAV.blog.title, href: NAV.blog.href },
                { label: NAV.guides.title, href: NAV.guides.href },
                { label: NAV.write.title, href: NAV.write.href },
                { label: EXTRA.finder.label, href: EXTRA.finder.href },
                { label: EXTRA.lists.label, href: EXTRA.lists.href },
                { label: EXTRA.glossary.label, href: EXTRA.glossary.href },
                { label: EXTRA.faq.label, href: EXTRA.faq.href },
                { label: EXTRA.method.label, href: EXTRA.method.href },
                { label: EXTRA.search.label, href: EXTRA.search.href },
              ]}
            />
            <Column
              heading="Company"
              links={[
                { label: NAV.about.title, href: NAV.about.href },
                { label: NAV.contact.title, href: NAV.contact.href },
                { label: NAV.add.title, href: NAV.add.href },
                { label: EXTRA.vendors.label, href: EXTRA.vendors.href },
                { label: EXTRA.guidelines.label, href: EXTRA.guidelines.href },
                { label: EXTRA.correction.label, href: EXTRA.correction.href },
                { label: EXTRA.alerts.label, href: EXTRA.alerts.href },
              ]}
            />

            <div>
              <h2 className="mb-4 font-sans text-[15px] leading-5 font-semibold text-panel-ink">Price alerts</h2>
              <p className="mb-5 max-w-[320px] text-[14px] leading-6 text-white/70">Hear when a price changes or a product is withdrawn.</p>
              <FooterSignup tone="dark" />
            </div>
          </div>

          <div className="mt-12 border-t border-white/15 pt-8">
            <address className="grid gap-8 not-italic sm:grid-cols-3">
              <div>
                <h2 className="mb-3 font-sans text-[15px] leading-5 font-semibold text-panel-ink">Published by</h2>
                <p className="text-[14px] leading-6 font-semibold text-white">{SITE_FOUNDER}</p>
                <p className="text-[13px] leading-5 text-white/60">Founder and editor.</p>
                <p className="text-[13px] leading-5 text-white/60">Information officer: {INFORMATION_OFFICER}.</p>
              </div>
              <div>
                <h2 className="mb-3 font-sans text-[15px] leading-5 font-semibold text-panel-ink">Address</h2>
                <p className="text-[14px] leading-6 text-white/70">
                  {ADDRESS_LINES.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </div>
              <div>
                <h2 className="mb-3 font-sans text-[15px] leading-5 font-semibold text-panel-ink">Contact</h2>
                <ul className="space-y-1.5 text-[14px] leading-6">
                  <li>
                    <a href={`mailto:${CONTACT_EMAIL}`} className="text-white/70 hover:text-white hover:underline hover:underline-offset-4">
                      {CONTACT_EMAIL}
                    </a>
                  </li>
                  <li>
                    <a href={CONTACT_PHONE_HREF} className="text-white/70 hover:text-white hover:underline hover:underline-offset-4">
                      {CONTACT_PHONE}
                    </a>
                  </li>
                </ul>
              </div>
            </address>
            <div className="mt-8 flex flex-col gap-4 border-t border-white/15 pt-6 lg:flex-row lg:items-center lg:justify-between">
              <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[12px] leading-4">
                {LEGAL.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-white/70 underline underline-offset-4 hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="text-[12px] leading-4 text-white/60">
                © {new Date().getFullYear()} {SITE_NAME}. {stats.products} products{stats.lastChecked ? `, last checked ${formatDateStamp(stats.lastChecked)}` : ""}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
