import type { Metadata } from "next";
import { LEGAL_UPDATED, LegalPage } from "@/components/LegalPage";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = { title: "Accessibility", alternates: { canonical: "/accessibility" } };

export default function AccessibilityPage() {
  return (
    <LegalPage title="Accessibility" updated={LEGAL_UPDATED}>
      <p>
        We aim for the Web Content Accessibility Guidelines 2.2 at level AA. A register is only useful if every reader can use it, including readers who navigate by keyboard or screen reader.
      </p>

      <h2>What we have done</h2>
      <ul>
        <li>Every colour pair was measured with the WCAG relative luminance formula, not estimated. Body text on the page background is 18.00 to 1, secondary text is 6.08 to 1, green text is 6.83 to 1, and the alert red is 6.35 to 1.</li>
        <li>Text on the lime fill is always near black, which measures 14.14 to 1. White text never sits on lime.</li>
        <li>A visible focus ring on every control, in a dark green that shows on the page background.</li>
        <li>A skip link to the main content, and a keyboard order that runs from the header to the content to the footer.</li>
        <li>Tables carry captions and header scopes, and a whole row is a link with a single stop for the keyboard.</li>
        <li>Nothing moves. There is no animation, parallax, carousel on a timer or autoplay, and the few colour transitions switch off when your device asks for reduced motion.</li>
        <li>Prices use tabular figures so columns align.</li>
        <li>Status is never carried by colour alone: a fact the vendor lists is shown with a tick and a word, and a price carries the date it was read.</li>
      </ul>

      <h2>Known gaps</h2>
      <p>
        We have not had an independent accessibility audit. The product screenshot strip, where a product has one, scrolls sideways.
      </p>

      <h2>Tell us</h2>
      <p>
        If something does not work for you, write to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and say which page and what you use. We will fix what we can and tell you what we cannot.
      </p>
    </LegalPage>
  );
}
