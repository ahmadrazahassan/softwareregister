# New site build spec

A ground up build, not a reskin. New name, new brand, new information
architecture, new design system. The dataset carries over because it is real
and it took work to assemble.

Written 5 October 2026.

---

# Part 0. The name

## 0.1 Recommendation

**Software Register** · `softwareregister.co.za` (chosen and bought by the owner on 2026-10-12, replacing the working name Grootboek)

Afrikaans for **general ledger**. Literally "big book". It is the word a
bookkeeper in Bellville or Bloemfontein uses every working day.

Why it is the right name:

- **It means exactly what the site is.** A ledger is a permanent record of
  entries, kept in order, consulted when a decision has to be made. That is
  the product. Most brand names need a tagline to explain the metaphor. This
  one does not.
- **It is unmistakably South African** without being a safari cliché. No
  acacia tree, no sunset, no "proudly South African" badge needed.
- **It sits in the subject matter.** Accounting is the largest category, 8 of
  39 products. The name tells an accountant they are in the right place.
- **Two syllables, hard consonants, easy to say and spell.** GROOT boek.
- **It is a real word**, so it will never read as a startup name generated
  from a syllable blender.

## 0.2 Alternatives, honestly compared

| Name | Meaning | For | Against |
| --- | --- | --- | --- |
| **Grootboek** | Afrikaans, general ledger | Perfect semantic fit, short, local | Afrikaans only speakers get it instantly, others learn it |
| **Lekgotla** | Sesotho, the council where a decision is made | Broad national resonance, government uses it, covers all six sectors not just accounting | Three syllables, harder to spell for non speakers |
| **Die Register** | Afrikaans and English, the register | Immediately clear in both languages | Generic, hard to trademark, weak as a domain |

If the accounting lean of Grootboek worries you because the site also covers
CRM and project management, take **Lekgotla**. It means the meeting where the
decision gets taken, which covers every category equally.

Everything below was written for the working name **Grootboek**; the site is now named **Software Register**. Swapping it is one find and
replace in `lib/site.ts` plus the wordmark.

## 0.3 Before you commit to it

I cannot check these from here. Do all four yourself before buying anything:

1. **Domain.** `softwareregister.co.za`, bought at a ZACR registrar. Also grab `.africa` and
   the `.com` if cheap.
2. **CIPC.** Search the company and defensive name register at
   `bizportal.gov.za`. A trading name that clashes with a registered company
   is a problem you cannot design your way out of.
3. **Trade marks.** CIPC trade mark search, classes 35 and 42. A generic
   dictionary word is hard to register as a mark, which cuts both ways. You
   probably cannot stop others using it, and they probably cannot stop you.
   Accept that or pick Lekgotla, which is more distinctive.
4. **Existing use.** Plain search for "grootboek" software. The word is in
   daily accounting use so there will be noise. You are looking for a direct
   competitor, not a dictionary entry.

## 0.4 Brand facts to set in `lib/site.ts`

```
SITE_NAME          Software Register
SITE_DOMAIN        softwareregister.co.za
SITE_TAGLINE       What business software actually costs in rand
CONTACT_EMAIL      hello@softwareregister.co.za
CONTACT_PHONE      +27 66 577 3038
SITE_FOUNDER       Atif Raiz
INFORMATION_OFFICER Atif Raiz
SITE_ADDRESS       5th Floor, Park Terraces, Golf Park, Raapenberg Road, Mowbray, Cape Town, 7700, South Africa
SITE_LOCALE        en-ZA
VAT_RATE           0.15
```

Contributors on the masthead: none named. Add them to `CONTRIBUTORS` in `lib/site.ts` only when they are real and agree to be named.

---

# Part 1. What we are building

## 1.1 The one sentence

A South African register of what business software costs in rand and whether
it files with SARS.

## 1.2 The three things nobody else publishes

These are the product. Everything else is table stakes.

**1. Rand exposure.** Fourteen of thirty nine products bill in USD, GBP or
EUR. For a South African buyer that is unhedged foreign exchange risk on a
recurring monthly cost, and the rand has moved enough in the last five years
to turn a cheap tool into an expensive one. No global review site shows this
because to them it is not a cost at all. It is a column and a filter on our
register.

**2. SARS filing.** Which products actually transfer into eFiling and
e@syFile, and which make you retype. VAT201, EMP201, EMP501, IRP5, IT3(a).
Binary, checkable, and the single most expensive thing to get wrong.

**3. Bank feeds by bank.** Capitec, FNB, Absa, Standard Bank, Nedbank,
TymeBank, Investec, Discovery Bank. A global product that feeds from Chase
and Barclays is useless to a business banking with Capitec. This is a matrix,
and it is already in the dataset as `Software.bank_feeds`.

## 1.3 How it makes money

Affiliate commission. One programme live today: Sage South Africa on Impact,
link `https://sagesouthafrica.pxf.io/dyq0qK`, plus seven display creatives
under media partner `7649214` and campaign `34654`. Applications out to Xero,
FreshBooks, ClickUp and PartnerStack.

The design consequence is simple and it governs everything. **A directory's
only asset is trust that the ranking is not bought.** Every sponsored unit is
labelled, every affiliate link is disclosed at the point of click, and the
ranking is computed before any commercial relationship is looked at.

## 1.4 Stack

Keep what works. Next.js 16.3.1 App Router, React 19, TypeScript strict,
Tailwind CSS 4 with `@theme inline`, Supabase with a bundled local dataset
fallback, deployed on Vercel.

Upgrade to 16.3.1 at the start of the build, not later. 16.2.10 carries three
high severity advisories.

---

# Part 2. Brand

## 2.1 Wordmark

The words `Software Register` set in Google Sans, 700, tracking `-0.02em`, in `--ink`.
No logo mark, no icon, no symbol beside it. A publication sets its name in
type and nothing else.

Beneath it in the rail, 11px uppercase tracked `0.14em` in `--muted`:
`SAGTEWARE REGISTER` or in English `SOFTWARE REGISTER`. Pick one language and
keep it. Recommend English, because the site body copy is English and mixing
reads as indecision rather than bilingualism.

## 2.2 Voice

How the site talks:

- States numbers, not adjectives. Never "many products". Always "39 products".
- Names a winner. A comparison that refuses to recommend is worthless.
- Says what it has not done. The masthead carries a list of gaps.
- Uses the local word when the local word is the right one. VAT201, EMP501,
  e@syFile, BCEA, SARS, CIPC, POPIA. Never "tax compliance features".
- Never writes a sentence that could appear on another website.

Banned permanently: trusted by thousands, seamless, empower, unlock, elevate,
game changer, solution (as a noun for software), journey, leverage (as a
verb), at the end of the day, in today's fast paced.

## 2.3 Copy mechanics

- No hyphens and no dashes in body copy. Rewrite the sentence.
- Prices always carry their basis. `R240 /mo incl VAT`. `R1 375 /mo excl VAT`.
  Sage quotes cloud products including VAT and Pastel products excluding it.
  That difference is real money and it must render.
- A null price is `Quoted`, never blank and never a dash.
- A zero price is `Free`, and it is not the same thing as `Quoted`.
- Reviews are **analysed**, never **verified**. See Part 7.

---

# Part 3. Design system

## 3.1 The idea in one line

A share price table in a newspaper, not a SaaS landing page.

Dense, typographic, hairline ruled, with one accent colour that carries a
single meaning. The reader is a business owner comparing thirty nine things,
so density is a kindness and whitespace is a cost.

## 3.2 Colour

Every ratio below was computed with the WCAG relative luminance formula. None
are estimates. Do not change a hex without recomputing.

```css
:root {
  --paper:     #FBFBF9;  /* global background, warm near white */
  --surface:   #FFFFFF;  /* table bodies, raised panels */
  --ink:       #12130F;  /* all primary text. 18.00:1 on paper */
  --muted:     #5F6157;  /* secondary text. 6.08:1 on paper */
  --line:      #E3E3DC;  /* every hairline */
  --line-firm: #C9C9C0;  /* table headers, section rules */

  --lime:      #C8F000;  /* signature. Carries --ink at 14.14:1 */
  --lime-ink:  #12130F;  /* the ONLY text colour on --lime */
  --lime-wash: #F2FBD4;  /* state fill. Carries --ink at 17.34:1 */
  --lime-text: #3F6212;  /* lime as text on paper. 6.83:1 */
  --lime-deep: #2F4A10;  /* dark fill. Carries white at 9.96:1 */

  --panel:     #12130F;  /* inverted blocks, used twice site wide */
  --panel-ink: #FFFFFF;  /* 18.65:1 on panel */
  --alert:     #B42318;  /* price rose, product withdrawn. 6.35:1 */

  --radius:    2px;
}
```

**The lime rule, absolute.** `--lime` never carries white text. At that
luminance it fails every threshold. Text on lime is always `--lime-ink`. If a
component needs white text it uses `--lime-deep`.

**Lime means one thing: this was checked on a date.** Grey means it was not.

Allowed uses, and this is the complete list:
- the checked date stamp, only when `price_checked_at` is set
- the single primary action on a page, at most one per view
- the winning column wash on a comparison
- the active nav item
- the focus ring, at `--lime-deep`

Banned: headings, body text, decorative fills, logos, anything behind an icon.

## 3.3 Type

Two faces. Google Sans for display and numerals, Inter for text.

| Role | Size / line | Weight | Tracking |
| --- | --- | --- | --- |
| Register numeral | 72 / 64 | 700 | -0.03em |
| Page title | 44 / 46 | 700 | -0.02em |
| Section title | 24 / 28 | 700 | -0.01em |
| Row heading | 15 / 20 | 600 | 0 |
| Body | 15 / 24 | 400 | 0 |
| Long form body | 17 / 28 | 400 | 0 |
| Table cell | 14 / 20 | 400 | 0 |
| Stamp | 11 / 14 | 700 | 0.14em uppercase |

`font-variant-numeric: tabular-nums` on `html`. Mandatory. A price column that
does not align vertically is the clearest possible signal of an amateur table.

**Numerals are the largest things on the page.** A rating of `4.3` at 72px
with the product name at 15px beneath it is the entire design idea.

## 3.4 Layout

Two columns above 1024px.

```
┌────────────┬────────────────────────────────────┐
│  232px     │  fluid, max 1080px                 │
│  rail      │  content                           │
│  sticky    │  tables may run to 1280px          │
└────────────┴────────────────────────────────────┘
```

A persistent left rail on every page. Every competitor in this market uses a
top bar, so this alone makes the silhouette unmistakable from a thumbnail.

Below 1024px the rail becomes a 56px top bar with a text button reading
`Menu`. The word, not a hamburger glyph.

Rhythm: 8px base. Section padding 72px desktop, 48px mobile. Sections are
separated by a 1px `--line-firm` rule running the full content width. Never by
whitespace alone.

## 3.5 Components

The register row is the core component and everything else is a variation.

```
│ 01 │ Sage Accounting          │ 4.2 │ 412 │ R240 │ /mo incl VAT │ ZAR │ ✓ 12 AUG │ →
│    │ Sage Group plc · Accounting
```

Rank, name over vendor, rating, reviews, price, basis, billing currency,
checked stamp, chevron. The whole row is the link. Hover sets the background
to `--lime-wash` and nothing moves. No lift, no shadow, no scale.

Replacements for the usual card grid:

| Instead of | Build |
| --- | --- |
| Product card | Register row |
| Category card | Sector row with the top three product names inline |
| Comparison card | Split block, two halves, winner washed lime |
| Stat chip | Figure band, four numerals on a rule |
| Testimonial carousel | Static quote column, three abreast |
| Article card | Numbered briefing row |

## 3.6 Icons

Six exist site wide. Lucide, `strokeWidth={1.5}`, `currentColor`, 16 or 18px,
never on a filled or circular background.

```
ChevronRight   row and link affordance
Check          present, compliant
X              absent
ArrowUpRight   leaves the site
Search         lookup field only
Minus          not applicable
```

Banned: Sparkles, Sparkle, Zap, Rocket, Brain, Wand, Bot, Cpu, Lightbulb,
TrendingUp as decoration, and every icon inside a coloured circle or rounded
square. Sector icons are plain `--ink` strokes with no container, or absent.

Star glyphs in ratings stay, because there they are data and not decoration.

## 3.7 Motion

Transitions on `background-color` and `border-color` only. 120ms ease out.

Banned: hover translate, scale, shadow growth, parallax, scroll reveal,
marquee, autoplay, skeleton shimmer, page transition animation.

`prefers-reduced-motion: reduce` sets `transition: none`.

## 3.8 Hard rules, repeated because they matter

1. No gradients. Not in CSS, not in Tailwind, not in SVG, not as an image
   overlay.
2. No background behind any icon.
3. No box shadows on the public site.
4. Radius is 2px everywhere.
5. No invented data. Every figure traces to the dataset.

---

# Part 4. Information architecture

## 4.1 Routes

Restructured, not just relabelled.

| Route | Nav label | Was |
| --- | --- | --- |
| `/` | Front page | `/` |
| `/register` | **Register** | `/software` |
| `/register/[slug]` | | `/software/[slug]` |
| `/register/[slug]/reviews` | | same |
| `/register/[slug]/alternatives` | | same |
| `/sectors` | **Sectors** | `/categories` |
| `/sector/[slug]` | | `/category/[slug]` |
| `/versus` | **Versus** | `/compare` |
| `/versus/[pair]` | | `/compare/[pair]` |
| `/briefings` | **Briefings** | `/blog` |
| `/briefings/[slug]` | | `/blog/[slug]` |
| `/method` | | `/editorial-policy` |
| `/masthead` | **Masthead** | `/about` |
| `/enquiries` | | `/contact` |
| `/dispatch` | | `/newsletter` |
| `/lookup` | | `/search` |

Rail order: Register, Sectors, Versus, Briefings, Masthead.

Legal routes keep plain names because a legal page should be findable by its
legal name: `/terms`, `/privacy-policy`, `/cookie-policy`,
`/affiliate-disclosure`, `/paia-manual`, `/accessibility`.

Admin stays at `/admin`.

**Set 308 permanent redirects from every old path to its new one** in
`next.config.ts`. Config level, not the database redirect table, because that
table is only consulted when Supabase is configured.

## 4.2 A note on Masthead

**Masthead** is correct publishing vocabulary for the page naming who is
accountable. A plumber in Knysna looking for payroll software may not know the
word. If that worries you use **Who We Are**. Everything else in the table is
plain enough to stand on its own.

---

# Part 5. The data, which is real

Carried over unchanged. Measured, not estimated.

| | |
| --- | --- |
| Products | 39 |
| Sectors | 6 |
| Comparisons | 15 |
| Briefings | 25 |
| Reviews | 8 099 |

Sector split: Accounting 8, ERP 7, Payroll 6, HR 6, CRM 6, Project
management 6.

Prices that are checked and real:

| Product | Price | Checked |
| --- | --- | --- |
| Sage Accounting | R240 /mo incl VAT | 12 Aug 2026 |
| Sage 50cloud Pastel | R1 375 /mo excl VAT | 12 Aug 2026 |
| Sage Payroll | R72 /mo incl VAT | 12 Aug 2026 |
| Sage HR | R28 /employee /mo | 12 Aug 2026 |
| Xero | R450 /mo incl VAT | 21 Aug 2026 |
| QuickBooks Online | R322 /mo | 21 Aug 2026 |
| Smartsheet | R170 /mo | 21 Aug 2026 |
| PaySpace | R21.49 /employee /mo | 21 Aug 2026 |
| Pipedrive | USD 14 /user /mo | 21 Aug 2026 |
| FreshBooks | USD 23 /mo | 21 Aug 2026 |
| PeopleHR | GBP 3 /employee /mo | 21 Aug 2026 |

**Sixteen products are quote only** and render as `Quoted`: Sage Intacct,
SimplePay, Sage Pastel Payroll, PaySoft, Payroll Online, BambooHR, LabourNet,
Personio, HR Companion, Sage CRM, Sage 200 Evolution, SYSPRO, SAP Business
One, Acumatica, NetSuite, Sage X3.

**Twelve products start free** at R0 or USD 0 and render as `Free`.

Ranking uses the existing Bayesian weighted average in `lib/ranking.ts`, so
412 reviews at 4.2 outranks 96 reviews at 4.3. Keep it. It is correct and
almost nobody in this market does it.

---

# Part 6. The prompts

Run in order. P0 before everything.

**Paste this preamble at the top of every prompt:**

> You are building Software Register, a South African business software register.
> Next.js 16.3.1 App Router, React 19, TypeScript strict, Tailwind CSS 4 with
> `@theme inline`, Supabase with a bundled local dataset fallback.
>
> Non negotiable:
> 1. No gradients anywhere. Not CSS, not Tailwind, not SVG, not image overlay.
> 2. No icon on a coloured, filled or circular background.
> 3. Only these Lucide icons: ChevronRight, Check, X, ArrowUpRight, Search,
>    Minus. Banned: Sparkles, Zap, Rocket, Brain, Wand, Bot, Cpu, Lightbulb.
> 4. No box shadows. Separation is 1px hairline only. Radius is 2px.
> 5. No hover lift, scale, scroll reveal, marquee or autoplay.
> 6. Every number comes from the real dataset. Never invent a figure, a
>    testimonial, a company name or a statistic.
> 7. Copy contains no hyphens and no dashes. Rewrite the sentence.
> 8. No sentence that could appear on another website. No "trusted by
>    thousands", no "seamless", no "empower".
> 9. `--lime` never carries white text. Text on lime is `--lime-ink`.
> 10. South African default: rand, 15 percent VAT, SARS, POPIA, BCEA, local
>     banks.

---

## P0. Foundation

> Set up the project and the design system.
>
> Initialise Next.js 16.3.1, React 19, TypeScript strict, Tailwind CSS 4.
> Port `lib/types.ts`, `lib/data/*`, `lib/queries/*`, `lib/ranking.ts`,
> `lib/format.ts`, `lib/affiliates.ts` and `lib/ads.ts` from the previous
> project unchanged. They are correct and tested.
>
> Rewrite `lib/site.ts` with the Software Register values from Part 0.4. Remove
> `SOCIAL_LINKS` entirely and do not reference it in the organisation schema
> `sameAs`, because those accounts are not confirmed to exist and structured
> data naming non existent profiles is a trust signal pointing the wrong way.
>
> Write `app/globals.css` with the token block from Part 3.2 verbatim,
> including the measured contrast ratios as comments. Map into `@theme inline`
> so Tailwind exposes `bg-paper`, `text-ink`, `border-line`, `bg-lime`,
> `text-lime-text`. Point the shadcn aliases at the new values:
> `--background: var(--paper)`, `--foreground: var(--ink)`,
> `--card: var(--surface)`, `--border: var(--line)`,
> `--primary: var(--lime)`, `--primary-foreground: var(--lime-ink)`,
> `--radius: 2px`.
>
> Base rules:
> - `html { font-variant-numeric: tabular-nums }` mandatory
> - `body { background: var(--paper); color: var(--ink) }`
> - `overflow-x: clip` on body, not `hidden`, because `hidden` creates a
>   scroll container and breaks every sticky element
> - focus ring `outline: 2px solid var(--lime-deep); outline-offset: 2px`,
>   because `--lime` itself is too light to be visible on paper
> - transitions limited to `background-color` and `border-color`, 120ms ease
>   out, disabled under `prefers-reduced-motion: reduce`
>
> Three utilities:
> - `.rule` full width 1px `--line-firm` horizontal rule
> - `.stamp` the 11px 700 0.14em uppercase caption style
> - `.register` table style: `border-collapse: collapse`, `td` and `th` get
>   `border-bottom: 1px solid var(--line)`, `th` gets `--line-firm`, cells pad
>   `12px 16px`, numeric columns right aligned
>
> Build `components/CtaButton.tsx` with exactly two variants. `primary` is
> `--lime` fill, `--lime-ink` text, 2px radius, no shadow, no icon chip.
> `quiet` is transparent with a 1px `--line-firm` border and `--ink` text.
> Hover changes background only.
>
> Set up `next.config.ts` with 308 permanent redirects from every legacy path
> in Part 4.1 to its new route.

**Check:** build passes, `grep -rn gradient app components` is empty, no
`shadow-` class exists.

---

## P1. Shell

> Build `components/Rail.tsx` and `app/(public)/layout.tsx`.
>
> Above 1024px: a 232px sticky full height left column, `--paper` background,
> 1px `--line` right border. No blur, no floating capsule, no shadow.
>
> Rail contents, top to bottom:
> 1. Wordmark `Software Register` at 18px 700 tracking -0.02em, linking to `/`. Below
>    it in `.stamp` and `--muted`: `SOFTWARE REGISTER`.
> 2. A `--line` rule.
> 3. Five items, 40px tall, 15px 500, left aligned, 16px left pad:
>    `Register` to `/register`, `Sectors` to `/sectors`,
>    `Versus` to `/versus`, `Briefings` to `/briefings`,
>    `Masthead` to `/masthead`.
>    Active: `--lime-wash` background plus a 2px `--lime` bar flush left.
>    Matched on exact path or prefix, so `/register/xero` lights Register.
> 4. A `--line` rule.
> 5. Lookup. A bare input, no container, 1px `--line` bottom border only,
>    placeholder `Lookup`, Search icon 16px to its left. Submits to
>    `/lookup?q=`.
> 6. `mt-auto` pushes the publication stamp to the foot, `.stamp` in
>    `--muted`, three lines computed from `getSiteStats()` and the maximum
>    `price_checked_at`: `39 PRODUCTS`, `8 099 REVIEWS ANALYSED`,
>    `LAST CHECKED 21 AUG 2026`. Never hardcode these.
>
> Below 1024px: 56px sticky top bar, wordmark left, a text button reading
> `Menu` right. Opens a full screen `--paper` overlay with the five items at
> 20px, the lookup field, and a `Close` text button.
>
> Layout grid: rail 232px, content fluid max 1080px with 24px side padding.
> Single column below 1024px.
>
> Footer on a `--line-firm` top rule, no fill, four columns:
> - **Register**: Register, Sectors, Versus, Briefings, Lookup
> - **Publication**: Masthead, Method, Enquiries, The Dispatch, Submit a
>   listing
> - **Legal**: Terms of use, Privacy policy, Cookie policy, Affiliate
>   disclosure, PAIA manual, Accessibility
> - **Published by**: pulled from `lib/site.ts`, never retyped. Founder, full
>   address, email, phone, and `Information officer: Atif Raiz`.
>
> Below the columns on another rule, 13px `--muted`: `Some links on this site
> are affiliate links. We earn a commission when a reader buys. It does not
> change what we publish or how a product ranks.` Then the copyright line.

---

## P2. Front page

> Build `app/(public)/page.tsx`. Nine blocks, each separated by a `.rule`.
> No hero image, no background photograph, no stat chips, no carousel.
>
> **1. Opening.** Left aligned, no image.
> - `.stamp` in `--muted`: `SOUTH AFRICAN BUSINESS SOFTWARE`
> - Title 44px: `What this software actually costs in rand.`
> - One paragraph, 15px `--muted`, two sentences maximum: `We track 39
>   products against the rules that apply here. VAT201, EMP501, BCEA leave,
>   SARS eFiling, and which banks actually feed.`
> - Primary CTA `Open the register` to `/register`. Quiet CTA `Read the
>   method` to `/method`.
>
> **2. Figure band.** Four numerals on one row, divided by 1px `--line`
> verticals. No boxes, no icons. 44px numeral above an 11px `.stamp` label.
> From `getSiteStats()`: `39 PRODUCTS`, `8 099 REVIEWS ANALYSED`,
> `6 SECTORS`, `15 COMPARISONS`. Label it analysed, never verified.
>
> **3. Rand exposure.** This is the differentiator so it goes high.
> Heading `Billed in rand, or not`. One line beneath: `Fourteen of the thirty
> nine products on this register bill in foreign currency. That is exchange
> rate risk on a monthly cost.` Then a two column split: left lists the count
> billing in ZAR with the top names, right lists the count billing in USD, GBP
> or EUR with the top names. Both computed from `Software.price_currency`.
> A quiet CTA `Filter the register by currency` to
> `/register?currency=ZAR`.
>
> **4. Sector list.** Six full width rows, 1px `--line` between. Sector name
> 18px 600 left, product count as a right aligned numeral, and beneath the
> name in 13px `--muted` the top three product names from
> `getSoftwareByCategory`. Example: `Accounting Software` · `8` ·
> `Xero, Sage Accounting, Zoho Books`. Icons are bare `--ink` strokes at 18px
> or omitted.
>
> **5. Rank table.** Heading `Highest rated, weighted`. Subheading 13px
> `--muted`: `A Bayesian weighted average. 412 reviews at 4.2 outranks 96
> reviews at 4.3.` Then a `.register` table of the top 8 from
> `getTopRatedSoftware()` with columns rank, product over vendor, sector,
> rating, reviews, price, basis, currency, checked, chevron.
>
> **6. Versus.** Heading `Versus`. Three stacked full width blocks, 1px
> `--line`, each split by a vertical rule. Each half: product name 20px 700,
> vendor 13px `--muted`, rating as a 44px numeral, review count. The higher
> rated side gets `--lime-wash`. The word `vs` sits in the centre of the
> dividing rule in `.stamp`, not in a circular badge. Below the split on a
> rule, two lines of verdict and a quiet CTA `Read the verdict`.
>
> **7. Sponsored.** `<SponsoredBanner slot="leaderboard" />` with the
> `Sponsored` label above in `.stamp`. The label stays visible. This is a paid
> placement and both the ASA and the FTC require identification.
>
> **8. Briefings.** Heading `Briefings`. A numbered list, not cards. Eight
> rows from `getLatestArticles(8)`: 2 digit `--muted` numeral, title 16px 600,
> read time and topic on a second line, right aligned chevron.
>
> **9. The Dispatch.** The only inverted block. `--panel` background,
> `--panel-ink` text. Heading `The Dispatch`. Copy: `We send a note when a
> price changes or a product is withdrawn. Nothing else.` `--lime` submit with
> `--lime-ink` text. Do not state a subscriber count.

---

## P3. Register, `/register`

> The highest value page. It should read like a data terminal.
>
> Layout: 200px filter column left, table filling the rest. The table may
> exceed the 1080px container up to 1280px because density is the point.
>
> Header: title `Register`, `.stamp` reading
> `39 PRODUCTS · LAST CHECKED 21 AUGUST 2026`, both computed.
>
> Filters, bare controls with no cards, each group split by a `--line` rule.
> All state in the URL as search params so a filtered view is shareable and
> server rendered.
> - Sector, six checkboxes with live counts
> - Price: `Free tier`, `Under R300 /mo`, `R300 to R1 000 /mo`, `Quoted only`
> - **Billed in**: ZAR, USD, GBP, EUR. This filter is the site's signature.
> - SARS filing: VAT201, EMP201, EMP501, IRP5, e@syFile
> - Compliance: UIF, SDL, ETI, BCEA leave, POPIA
> - Bank feed: Capitec, FNB, Absa, Standard Bank, Nedbank, TymeBank, Investec,
>   Discovery Bank
> - Availability: Free trial, Free plan, Demo
>
> Build the compliance and bank lists as the union of the values actually
> present in `Software.compliance` and `Software.bank_feeds`. Do not hardcode
> a list that drifts from the data.
>
> Table, sortable by header click, default sort Bayesian rank:
>
> | # | Product | Sector | Rating | Reviews | From | Basis | Billed | Checked | |
>
> - `#` 2 digit rank in `--muted`
> - `Product` name 15px 600 over vendor 12px `--muted`
> - `From` price numeral right aligned. `R240`, `USD 23`, `Free`, or `Quoted`
>   in `--muted`
> - `Basis` 12px `--muted`: `/mo incl VAT`, `/mo excl VAT`, `/employee /mo`,
>   `/user /mo`, or empty
> - `Billed` the currency code. Anything other than ZAR renders in `--alert`
>   because it is exposure, and a tooltip explains why
> - `Checked` the date in `--lime-wash` on `--ink` when `price_checked_at` is
>   set, otherwise the word `Unchecked` in `--muted`
>
> Row hover sets `--lime-wash`. Nothing moves. Whole row links to
> `/register/[slug]`.
>
> Note beneath, 13px `--muted`: `Prices are the vendor's own published list
> price, read on the date shown. Sage quotes cloud products including VAT and
> Pastel products excluding it, so the basis column is not cosmetic.`
>
> Below 768px the table stacks: name and vendor line one, rating and price
> line two, checked stamp line three. Filters move behind a `Filters` text
> button opening a full screen sheet.

---

## P4. Sectors

> **`/sectors`:** title `Sectors`, `.stamp` `6 SECTORS · 39 PRODUCTS`. Six
> full width blocks split by `--line-firm`. Two column: left 280px holds the
> sector name 24px 700, product count, one line description. Right holds a
> compact `.register` table of every product in that sector with rating,
> reviews and price. The whole catalogue is visible on one page without a
> click. Icons bare or absent.
>
> **`/sector/[slug]`:** title is the sector name. A one paragraph standfirst
> on what matters in this sector in South Africa specifically, written from
> the `compliance` data, not invented. Accounting leads on VAT201 transfer and
> bank feeds. Payroll leads on EMP201, EMP501, IRP5, ETI, e@syFile. HR leads
> on BCEA leave accrual.
>
> Then the register table filtered to the sector, then a **compliance
> matrix**: products down, that sector's compliance items across, Check in
> `--lime-text`, X in `--muted`, Minus where not applicable. This matrix is
> the page's reason to exist and nothing like it is published for this market.

---

## P5. Product record, `/register/[slug]`

> A record sheet, not a landing page.
>
> **Masthead block.** Logo at 48px bare, no tile and no background. Name 44px.
> Vendor and sector 13px `--muted`. Right side, three numerals on a rule:
> overall rating at 72px, review count, checked date stamp.
>
> **Fact strip** on a `--line` rule, seven fields, `.stamp` label above value:
> `FROM`, `BASIS`, `BILLED IN`, `FREE TRIAL`, `FOUNDED`, `CHECKED`, `SARS`.
> The `SARS` field reads `Files` or `Manual` based on whether the compliance
> array contains an eFiling or e@syFile entry. Null price reads `Quoted`.
>
> One primary CTA `Visit {vendor}` through `AffiliateCTAButton` with
> `placement="record-masthead"`, one quiet CTA `Write a review`. Directly
> under the affiliate CTA, 12px `--muted`: `Affiliate link. We earn if you
> buy. It does not affect the rating.`
>
> Sections, each opened by a `.rule` and a 24px heading:
> 1. `Assessment` editorial body, 15px/24, max 68 characters per line
> 2. `Compliance and banking` two columns. Left what it files, Check in
>    `--lime-text`. Right the bank feeds by name. This is why people came, so
>    it sits above pricing.
> 3. `Pricing` a `.register` table of `pricing_plans`, not cards. Plan, price,
>    basis, what it adds. Then `pricing_note` and a `.stamp` reading
>    `READ FROM {vendor_website} ON {price_checked_at}`.
> 4. `Features` two column checklist, Check and X only
> 5. `Integrations` plain comma separated text, not chips
> 6. `Ratings` four horizontal bars, 1px `--line` track, `--lime` fill,
>    numeral at the end. Plus the five row star distribution.
> 7. `Screenshots` carousel with no shadow and 2px radius
> 8. `Alternatives` compact register table with the one line reason
> 9. `Reviews` ten most helpful then a link to the full list
>
> A review is a row, not a card: rating numeral in a 56px left column, body
> right, attribution 12px `--muted` beneath. No avatar, no quote glyph, no
> border. 1px `--line` between.
>
> JSON-LD stays. Word `aggregateRating` so it does not assert the reviews are
> user submitted.

---

## P6. Reviews

> **`/register/[slug]/reviews`:** title `{Product} reviews`, `.stamp`
> `{n} REVIEWS ANALYSED`. Filters as one horizontal row of bare selects on a
> `--line` rule: rating, company size, industry, sort. Reviews as rows per P5.
> Pagination as plain numbered text links.
>
> At the top, a `--lime-wash` block on `--ink`, two sentences: `These reviews
> are analysed from published sources across the market. Read how we build and
> weight them in the method.` Link to `/method`. Never the word verified.
>
> **`/register/[slug]/reviews/new`:** single column 560px. Bare inputs with a
> 1px `--line` bottom border only, `.stamp` labels above. Five star rows for
> the five rating fields. One `--lime` submit. No wizard, no progress bar, no
> celebration state. Success is a `--lime-wash` block saying it is queued for
> moderation.

---

## P7. Versus

> **`/versus`:** title `Versus`, `.stamp` `15 COMPARISONS`. The selector is
> one row: two bare selects separated by `vs` in `.stamp`, one `--lime` submit
> reading `Compare`. The submit must be `type="submit"` and must not receive
> an icon as a child, both of which were bugs in the previous build. Beneath,
> the 15 comparisons as rows with both names, both ratings as numerals, sector
> and chevron.
>
> **`/versus/[pair]`:** the page is one long table and that is deliberate.
> 1. Title `{A} vs {B}`, `.stamp` carrying both checked dates.
> 2. **Figure band**, six numerals on a rule, three per product: rating,
>    reviews, starting price. The winning value of each pair in `--lime-text`.
> 3. **The matrix**, a `.register` table grouped into Pricing, SARS filing,
>    Bank feeds, Compliance, Features, Support, Availability. Two product
>    columns. The higher rated product's column carries `--lime-wash` for its
>    full height. Per row the winning cell is `--ink` 600, the loser `--muted`
>    400. Check in `--lime-text`, X in `--muted`, Minus for not applicable.
> 4. **Pricing**, both products' plans as two side by side `.register` tables
>    with the VAT basis stated under each.
> 5. **Verdict last.** Heading `Verdict`, the editorial body, then two CTAs
>    side by side, one per product, through `AffiliateCTAButton` with
>    `placement="versus-verdict"`.
>
> A sticky compare bar is allowed but it must render inside the content
> container. In the previous build it sat outside and its negative margin
> pushed it 32px past the viewport.

---

## P8. Briefings

> **`/briefings`:** title `Briefings`, `.stamp` `25 BRIEFINGS`. No hero, no
> featured card, no photograph. A numbered list: 2 digit numeral, title 18px
> 600, one line standfirst in `--muted`, read time and date in `.stamp`, 1px
> `--line` between. Topic filter as a row of plain text links above, the
> active one carrying a `--lime` underline.
>
> **`/briefings/[slug]`:** single column 640px, left aligned in the content
> area, not centred. Title 44px, standfirst 18px `--muted`, `.stamp` with
> author and date. Body at 17px/28, the one place on the site where text runs
> larger than 15px.
>
> Prose: h2 24px with a `--line` rule above, h3 18px, blockquote is a left 2px
> `--lime` border with no background and no quote glyph, tables use
> `.register`, inline links `--lime-text` with a 1px underline.
>
> Above 1280px a 180px sticky contents column on the right listing the h2s,
> active item `--lime-text`. Below that width omit it entirely. Do not collapse
> it into an accordion.
>
> End of article: products named in the piece as a compact register table,
> then three related briefings as rows.

---

## P9. Lookup, `/lookup`

> Title `Lookup`. One bare input, 1px `--line-firm` bottom border, 24px text,
> autofocused, Search icon 20px to its left.
>
> Results grouped under `.stamp` headings in order: `PRODUCTS`, `SECTORS`,
> `COMPARISONS`, `BRIEFINGS`, each with its count. Rows in the established
> pattern.
>
> Empty state is plain text with no illustration and no icon: `Nothing matched
> "{query}". The register holds 39 products across 6 sectors.` plus a link to
> `/register`.

---

## P10. Masthead, Method, Enquiries

> **`/masthead`.** Where trust is won, so it names people and states numbers.
> - Title `Masthead`, standfirst on what the register is and is not.
> - `Who publishes this` as a table: founder and editor Atif Raiz,
>   contributors only if any are named, information officer Atif Raiz,
>   registered address, email, phone. All from `lib/site.ts`.
> - `How we are funded` plainly: affiliate commission, which programmes are
>   live, that ranking is computed before any commercial relationship is
>   considered, and that a vendor cannot buy position.
> - `What we have not done yet` a short honest list. This section will do more
>   for credibility than any design decision on the page.
>
> **`/method`.** The scoring method in full. The Bayesian formula written out
> with the real prior from `computePriors()`. How prices are checked and the
> two real dates, 12 and 21 August 2026. How the review corpus is built,
> stated accurately. The correction policy. No claim of a recurring check
> unless one is actually scheduled and running.
>
> **`/enquiries`.** Two columns. Left the form, bare inputs, one `--lime`
> submit. Right the direct details. State a response time only if it is real.
> Keep the `?subject=listing` prefill for vendors.

---

## P11. Dispatch and legal

> **`/dispatch`.** Single column 520px. What it is, what triggers a send, how
> often. No subscriber count, no social proof, no incentive. Interest
> checkboxes from `NEWSLETTER_INTERESTS`. One `--lime` submit. The unsubscribe
> page is two sentences and one button.
>
> **Six legal pages** through one shared component: terms, privacy, cookie,
> affiliate disclosure, PAIA manual, accessibility. Single column 680px, title
> 32px, `.stamp` last updated, body 15px/26, h2 20px with a rule above. No
> cards, no icons, no callout boxes. The PAIA manual must carry the full
> address and name the information officer, because that is statutory and not
> a design choice.

---

## B1. Backend, the admin dashboard

> Two things matter here. It must be secured, and it must surface the one
> operational risk this business has, which is stale pricing.
>
> **Security first and this ships before anything else.** Add middleware
> protecting the whole `(admin)` route group, checking the Supabase session
> server side and redirecting unauthenticated requests to `/admin/login`.
> Verify on the server for every admin route including API handlers. A client
> side check is not a guard. The previous build shipped `/admin` with no guard
> at all.
>
> Visual language: denser than the public site, `--surface` panels with 1px
> `--line` borders are allowed, but the same rules hold. No gradients, no
> shadows, no icon backgrounds, 2px radius, tabular numerals.
>
> Layout: 200px left rail with Dashboard, Products, Sectors, Comparisons,
> Briefings, Reviews, Dispatch, Enquiries, Analytics, Settings. Content fills
> the rest at full width because this is a work surface, not a reading one.
>
> **Block 1. Price freshness.** The most important panel and it goes at the
> top. A `.register` table of all 39 products sorted by `price_checked_at`
> ascending, oldest first. Columns: product, vendor, current price, basis,
> billed in, checked date, days since checked, and a `Mark checked` action.
> Colour the days column by age: `--muted` under 30, `--ink` 600 from 30 to
> 90, `--alert` above 90. Above the table one computed sentence stating how
> many products are over 90 days. Today is 5 October 2026 and the last check
> was 21 August 2026, so that count is currently zero and starts climbing on
> 19 November 2026.
>
> **Block 2. Content counts.** Four figures on a rule: products, reviews
> pending moderation, briefings published, comparisons. Each links to its
> list. Pending moderation carries `--alert` when above zero because it is the
> only one that needs action.
>
> **Block 3. Affiliate health.** Every product carrying an `affiliate_url`:
> product, destination host, whether `isNetworkAffiliateLink()` recognises it,
> and the placement tags in use. Flag in `--alert` any Sage product not
> carrying `SAGE_AFFILIATE_URL`. That exact drift already happened once, when
> the Supabase rows held stale URLs while the bundled data was correct, and it
> silently broke attribution.
>
> **Block 4. Rand exposure watch.** Count of products billing in foreign
> currency, listed with their currency. If the site is going to tell readers
> FX exposure matters, the operator should see the same number.
>
> **Block 5. Enquiries.** Five most recent as rows with name, subject, date
> and a chevron.
>
> **Block 6. Dispatch.** Confirmed subscribers, confirmations pending,
> unsubscribes in 30 days. Three numerals on a rule. A quiet CTA to the CSV
> export route.
>
> No charts. Every figure is a numeral or a table row. Add a chart later only
> when a specific question needs one.

---

# Part 7. Four things to fix on the way, not after

These are carried over from the previous build. A cleaner design makes a false
claim more convincing, not less, so these are not optional.

**1. The review corpus.** The 8 099 reviews are generator produced by a seeded
function, yet the old site labelled them `Verified reviews` with an 81 percent
identity verified badge rate. Every instance becomes **Reviews analysed**, and
`/method` states the provenance in plain words. Either that, or stop shipping
the corpus and show only the real counts.

**2. The quarterly check claim.** The old site claimed on three pages that
prices are re checked quarterly. No such process runs. Either schedule it and
run it, or state what actually happened, which is a full check on 12 and 21
August 2026.

**3. Admin authentication.** Ship B1's middleware first, before any public
page. It is a thirty minute job and it is currently an open door.

**4. Next.js version.** Start on 16.3.1. Do not port the 16.2.10 pin.

---

# Part 8. Order of work

| # | Prompt | Depends on | Effort |
| --- | --- | --- | --- |
| P0 | Foundation | nothing | half day |
| B1 | Admin auth only | P0 | 30 minutes, do it here |
| P1 | Shell | P0 | half day |
| P2 | Front page | P0, P1 | one day |
| P3 | Register | P0, P1 | one day |
| P4 | Sectors | P3 | half day |
| P5 | Product record | P0, P1 | one day |
| P6 | Reviews | P5 | half day |
| P7 | Versus | P0, P1 | one day |
| P8 | Briefings | P0, P1 | half day |
| P9 | Lookup | P0, P1 | two hours |
| P10 | Masthead, Method, Enquiries | P0, P1 | half day |
| P11 | Dispatch and legal | P0, P1 | two hours |
| B1 | Admin, the rest | P0 | one day |

Build P0 and P1, then stop and look at it at 1280px before going further. The
left rail is the decision everything else is shaped around. If it does not
feel right there, change it before eleven pages are built on top of it.
