import type { Metadata } from "next";
import Link from "next/link";
import { LEGAL_UPDATED, LegalPage } from "@/components/LegalPage";
import { getRegistry } from "@/lib/queries";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = { title: "Affiliate disclosure", alternates: { canonical: "/affiliate-disclosure" } };

export default async function AffiliateDisclosurePage() {
  const reg = await getRegistry();
  const affiliated = reg.items.filter((s) => s.affiliate_url);

  return (
    <LegalPage title="Affiliate disclosure" updated={LEGAL_UPDATED}>
      <p>
        Some links on this site are affiliate links. We earn a commission when a reader buys. It does not change what we publish.
      </p>

      <h2>What that means</h2>
      <p>
        An affiliate link carries a tracking code. If you follow it and buy, the vendor or the affiliate network pays us a commission. It costs you nothing extra. Affiliate links are marked rel=&quot;sponsored&quot; in the page code, and the button that carries one is followed by a line saying so.
      </p>

      <h2>Who pays us today</h2>
      <p>
        One programme is live: Sage South Africa, through the Impact network. The products that currently carry its link are {affiliated.map((s) => s.name).join(", ")}. We have applied to Xero, FreshBooks, ClickUp and PartnerStack. None has produced a link, so none appears on the site.
      </p>

      <h2>What it does not do</h2>
      <ul>
        <li>It does not change the order products are listed in. The register is alphabetical and carries no ranking.</li>
        <li>It does not change a comparison. A comparison is built from the same data as the table beside it.</li>
        <li>A vendor cannot pay to be listed higher, to be written up more kindly or to have a record changed.</li>
      </ul>

      <h2>Sponsored units</h2>
      <p>
        A paid placement is labelled Sponsored above the unit, and the label stays visible. A sponsored unit is never mixed into the register.
      </p>

      <h2>What we record when you click</h2>
      <p>
        We record the product, the placement on the page and a salted hash of your connection, never your address. Read the <Link href="/privacy-policy">privacy policy</Link>.
      </p>

      <h2>Questions</h2>
      <p>
        Write to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </LegalPage>
  );
}
