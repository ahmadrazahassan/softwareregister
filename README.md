# Software Register

A South African register of what business software costs in rand and whether it files with SARS, at softwareregister.co.za.
Built from `NEW-SITE-BUILD.md`. Next.js 16.3.8 App Router, React 19, TypeScript strict, Tailwind CSS 4, Supabase.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000, runs on the bundled dataset, no keys needed
npm run verify       # checks the dataset, the copy rules and the blog against the figures read from the vendors
npm run build && npm start
node scripts/smoke.mjs http://localhost:3000   # requests every URL, the redirects and the admin guard
```

The public site works with **no Supabase keys at all**: it serves the dataset in `lib/data`.
The admin area needs Supabase and fails closed without it.

## Connect Supabase

1. Create a project at supabase.com.
2. In the SQL editor run `supabase/migrations/0001_schema.sql`, then `0002_rls.sql`, then `0003_drop_ratings.sql`, then `0004_review_details.sql` (the extra fields on a reader review), then `0005_function_hardening.sql` (pins the search path of the two helper functions so Supabase's security linter is clean). The site still reads and accepts reviews if 0004 has not been run; the new details are simply not stored until it is. Then `0006_guide_topics.sql` (adds the Buying topic to guides) and `0007_vendor_replies.sql` (the columns that hold a vendor's reply beneath a reader review).
3. Copy `.env.example` to `.env.local` and fill the three Supabase values (Project settings, API).
   Set `IP_HASH_SALT` to a long random string.
4. Load the data and make yourself an admin:

```bash
npm run seed
ADMIN_EMAIL=you@example.com ADMIN_PASSWORD='a long passphrase' npm run create-admin
```

5. Sign in at `/admin/login`.

Once Supabase is configured and seeded, it is the source of truth. If it errors or is empty the site falls back to `lib/data`, so the public pages never go blank.

## Deploy on Cloudflare Workers

The site runs as one Cloudflare Worker named `softwareregister` through the OpenNext adapter (`@opennextjs/cloudflare`). Live address: `https://softwareregister.70148590.workers.dev`. The production domain is `softwareregister.co.za`.

```bash
npx opennextjs-cloudflare build    # builds Next, then the Worker in .open-next
npx wrangler deploy                # uploads it (wrangler must be logged in: npx wrangler login)
```

- `wrangler.jsonc`: Worker name, static assets, the `WORKER_SELF_REFERENCE` service binding, the Images binding, `nodejs_compat`. `open-next.config.ts`: the incremental cache. `public/_headers`: long cache headers for static files.
- The Worker bundle is about 2.0 MiB gzip. The Free plan allows 3 MiB, so keep an eye on it (`npx wrangler deploy --dry-run` prints it). The admin guard is `middleware.ts` (edge) and not `proxy.ts`: the Node.js middleware path bundles Next twice and is only experimental in the adapter.
- Public build values (`NEXT_PUBLIC_*`) come from the committed `.env.production`. Secrets are Worker secrets and never go in a file in the repo: `npx wrangler secret put SUPABASE_SERVICE_ROLE_KEY`, `IP_HASH_SALT`, and later `RESEND_API_KEY` plus the `DISPATCH_FROM` variable once the sending domain is verified. Without `RESEND_API_KEY`, Dispatch subscriptions are recorded as confirmed at consent.
- **Workers plan: the Free plan is not enough.** Free allows 10 ms of CPU per request. Pages that are rendered on request (category pages, the register with filters, comparisons, reviews, the finder, search, forms) need roughly 15 to 30 ms, so under load about one request in six fails with Cloudflare error 1102 (HTTP 503). Pages that are prerendered at build time are served from assets and are fine. The Workers Paid plan ($5 a month) allows up to 5 minutes of CPU and removes the failures with no code change. Check with a burst: `for i in $(seq 1 24); do curl -s -o /dev/null -w "%{http_code}\n" "https://<worker>/sector/accounting?x=$i" & done`.
- Never keep a Supabase client (or any object that holds pending promises) in a module variable: on Workers a request that reuses another request's promise can hang. `lib/supabase/public.ts` makes a new client per call for that reason.
- Build from a clean env: OpenNext embeds every `.env*` file it finds into the bundle, so move `.env.local` away while building (the local service role key must not end up in the Worker code). OpenNext warns that Windows is not fully supported; a build on Windows worked here, and a Linux CI build is the safer long term route.
- The incremental cache is read only (Workers static assets), so pages with `revalidate = 3600` update on the next deploy, not hourly. For an hourly refresh without a redeploy, create a KV namespace, bind it as `NEXT_INC_CACHE_KV` in `wrangler.jsonc`, and switch `open-next.config.ts` to `kv-incremental-cache` with `memory-queue` (see the comment in that file). That needs `wrangler login` to be refreshed with the KV scope.
- Custom domain: add `softwareregister.co.za` to the same Cloudflare account, then Workers & Pages, `softwareregister`, Settings, Domains & Routes, Add, Custom domain.

## Security

- `middleware.ts` (edge middleware; it is not `proxy.ts` because the Cloudflare adapter supports Node.js middleware only experimentally) checks a verified Supabase session with `getUser()` for every `/admin` path.
- It is **not the only check**. Every admin page, server action and route handler calls `requireAdmin()` itself.
- The admin role lives in `app_metadata`, which only the service role key can write. A user cannot grant it to themselves.
- Row level security is on for every table. Readers can read published content and approved reviews, and can only insert pending reviews, enquiries, subscriptions and clicks.
- No raw IP address is ever stored (POPIA). A salted SHA-256 is.
- The service role key is server only (`lib/supabase/admin.ts` imports `server-only`).
- Next is pinned to **16.3.8**. 16.3.1, the version in the spec, has a critical advisory fixed in 16.3.8.

## What is real and what is not yet

The dataset is **37 products read from the vendors' own pages on 5 and 11 October 2026**: the list price in rand (or the vendor's own dollar, pound or euro figure, converted at the day's rate), the VAT basis, every plan with what it adds, features, trials and free plans, and the SARS returns and bank feeds a vendor's page states. A product whose vendor gives its price only on request shows **Price on request** and carries no date. A fact a vendor's page does not state is left out of the site: there is no "Unchecked" label anywhere, and nothing is ticked or crossed on a guess.

Every product has a real logo, taken from the vendor's own site (`public/logos`). Payroll Online and HR Companion were removed because no vendor site could be found to read them from.

**No ratings, no review counts, no ranking.** On 2026-10-11 all of them were removed from the site: the per product rating and review count, the weighted score and rank, the sub ratings, the `/reviews` hub, the long form written reviews with their pros and cons, and the `aggregateRating` structured data. The register is listed alphabetically and can be sorted by price or by the date a price was read, and a comparison states facts (price, features, SARS filing) without naming a winner. The originals are kept, inert, in `archive/removed-reviews/` (see its README.txt). What stays: anyone can write a review of any product (`/register/[slug]/reviews/new`), an editor approves it in `/admin/reviews`, and approved reviews show on the product's reviews page. Nothing is averaged or counted from them.

`DATA-RESEARCH.md` records where each price and fact came from and what a vendor did not publish.

## Layout

```
app/(public)/      the site: /, /register, /sectors, /versus, /briefings, /lists, /finder, /shortlist, /glossary, /faq, /vendors, /review-guidelines, /suggest-a-correction, /lookup, /masthead, /method, /enquiries, /dispatch, legal
app/(admin)/admin  dashboard, products, reviews, enquiries, dispatch, analytics, settings
components/        Header, Footer, RegisterTable, FilterPanel, forms
lib/data/          the bundled dataset
lib/data/profiles/ the in depth review of each product (words, extra figures, FAQs, sources)
lib/calc.ts        the numbers behind a review: plan ladder, team costs, peers, calculator settings
lib/registry.ts    pure logic: alphabetical order, filters, comparison summaries. No framework imports.
lib/queries/       Supabase first, bundled data as fallback
supabase/          migrations
scripts/           seed, create-admin, verify-dataset, smoke
```

## Logos, flags and screenshots

Everything in `public/` is used or deliberately left alone.

```bash
npm run assets
```

reads `public/logos`, `public/integrations` and `public/screenshots`, and writes:

- `public/brand/logos/*`: one cleaned logo per product. The edge background is removed, the margin trimmed, small bitmaps smoothed up, and vector logos cropped to the artwork. **Your originals are never changed.**
- `lib/data/assets.generated.ts`: the manifest the site reads (logo sizes, and which products have screenshots).

All 37 products have a logo. The site never invents one: a product with no logo on file shows its initials. To add or replace one, save it as `public/logos/{slug}.svg` (or `.png`) and run `npm run assets`.

`public/flags/za.svg` is the flag of South Africa, used beside products sold in South Africa and in the header and footer. `public/screenshots` feeds the screenshot strip on the product pages that have one. `public/avatars` and `public/integrations` (as partner logos) are not used: there is no recorded data saying which product integrates with which, so showing those logos would imply connections the register has not read.

## The brand

The Software Register mark is a square cut S built from straight bars, like the rules of a ledger page. Its middle bar is a double rule, the double underline an accountant draws under a grand total, one rule in ink and one in lime. It has no background. `node scripts/make-brand.mjs` writes the favicon (`app/icon.svg`, which turns paper white in a dark browser theme), the touch icon (`app/apple-icon.png`, the one file with a ground, because iOS needs one) and the two loose files in `public/brand` (`softwareregister-mark.svg` and the light one). `components/BrandMark.tsx` draws the same shapes inline, with the ink following the text colour so it turns white on a dark block.

## Navigation and pages

Defined once in `lib/nav.ts`. The header is a full width B2B bar: a strip saying who the site is for, then the logo, three menus that open into wide panels (**Software**, **Compare**, **Resources**), a search field, **Write a review** and **Add a product**. The panels open on hover for a mouse and on click or the keyboard for everyone else. About and Contact are in the footer. The footer is one lime block with the closing call to action and a dark rounded card of links, the price alert signup and a Published by, Address and Contact block. The publisher's name, address, phone and the structured data all read from `lib/site.ts` (`SITE_FOUNDER`, `INFORMATION_OFFICER`, `ADDRESS_PARTS`, `CONTRIBUTORS`); the About page (`/masthead`) shows the same facts and lists contributors only if there are any. The name, address and phone must match the Impact application.

- `/briefings` and `/briefings/[slug]` (the Guides): 20 guides for South African buyers in three topics, Pricing, Buying and Compliance, laid out like the blog: a lead guide and picture cards, a picture, a contents box, a body that supports numbered steps, notes, tables (links work inside a cell) and keep reading cards. The guides are in `lib/data/briefings.ts` (the first eight), `lib/data/briefings-more.ts` (eight buying and compliance guides), `lib/data/briefings-sectors.ts` (the buyer's guides for ERP, HR, CRM and project management) and `lib/data/briefings-depth.ts` (extra sections placed before a named heading). Reading time is worked out from the words (`lib/read-time.ts`). Pictures and the editorial order are in `lib/data/guide-heroes.ts`, which also maps each sector to the guides its reviews link to. Run `npm run seed` after changing a guide, because the site reads guides from Supabase once it is connected. Migration `0006_guide_topics.sql` adds the Buying topic.
- `/blog` and `/blog/[slug]`: dated posts in `lib/data/blog.ts`, each with a picture drawn from the register (`components/BlogHero.tsx`: price bars, product logos, one large figure, or the mark) instead of stock photography. Guides (`/briefings`) stay the evergreen explainers. The old site's guide slugs under `/blog/` still redirect to `/briefings/`.
- `/versus`: the compare tool (`components/CompareHub.tsx`), which shows each product's price as soon as it is picked, then the 15 written up pairs. Each pair page opens with both products, then pricing cards, a side by side table, our notes and a compare another pair tool.
- `/register/[slug]/reviews`: the in depth review of a product. At a glance figures, then pricing in rand with charts (plans, what a team pays by size, add ons, payroll bands, pay monthly against yearly, price against the other products in the category), a cost calculator (`components/CostCalculator.tsx`), plan cards with a button to the vendor's pricing page (`components/VendorCta.tsx`; Sage products carry the affiliate link and its disclosure), a sticky bar with the starting price and the vendor button (`components/StickyCta.tsx`), call to action bands after the prices, the verdict and at the foot, more charts (a segmented gauge for what paying yearly takes off, area and line charts for how the bill grows with the team and what monthly against yearly costs over three years, a donut for where a bill goes, a price range chart across the category, vendor age bars; all flat colours, all with their figures written out), the vendor's own YouTube videos (`lib/data/videos.ts`, `components/VideoGallery.tsx`: a still and a lime play button, the player loads from the no cookie address only on press; 36 products, up to three each, every one from a channel listed as official for that product, `npm run verify` refuses any other), the written sections, strengths and limits, who it suits, FAQs, sources and the reader reviews. It shows facts only: **no score, no rating, no rank**. Prices, plans and charts come from the live record in `lib/data/software.ts`; `lib/data/profiles/` holds the hand written words and the few extra figures (add ons, payroll bands, monthly against yearly prices, seat limits). All 37 products have a profile, Sage written in the most depth (`SAGE-RESEARCH-NOTES.md` has the research). A product without a profile would still get a page built from its record. `npm run verify` checks every profile for dashes, hyphens, banned words, foreign currency figures and sane numbers.
- `/write-a-review` and `/register/[slug]/reviews/new`: a product picker with search, then a four step review form: the experience (one rating for this review only, a headline, the reader's own words), what it does well and where it falls short, how they use it (time used, plan, what for, what they used before, up to three other products they looked at, up to four reasons they chose it), then who they are. The choices live in `lib/review-options.ts`, the same list the form, the server action and migration 0004 use, and `npm run verify` checks they agree. A review shows these details under it. None is averaged, counted or used to rank.
- `/add-a-product`: the vendor page and listing form. A request goes to the enquiries inbox under the subject Submit a listing. `/enquiries?subject=listing` redirects here.

### Finding, comparing and trust pages

- `/lists` and `/lists/[slug]` (`lib/lists.ts`): about 33 landing pages generated from register filters, for example free accounting software, payroll software that prepares the EMP501, accounting software with a Capitec bank feed. A list exists only where at least two products qualify (one for the SARS and bank lists), so no page is empty. Each is alphabetical, says the rule it applies, and carries questions to ask, related guides, an FAQ and structured data. `npm run verify` has a Lists section.
- `/finder` (`lib/finder.ts`): five questions (sector, size, VAT, bank, budget) that filter the register and price each product for the chosen team size from its own plan rules. Nothing is stored; the answers sit in the address. Products priced on request are listed apart, and a disclosure says why each other product is not shown. Alphabetical or cheapest first, never ranked.
- `/shortlist` (`lib/shortlist.ts`, `components/ShortlistButton.tsx`, `components/ShortlistManager.tsx`): up to eight products saved in the browser, shareable as `/shortlist?s=a,b,c`, shown side by side and opened as a full comparison.
- `/glossary` (`lib/data/glossary.ts`) and `/faq` (`lib/data/faq.ts`): VAT201, EMP201, EMP501, IRP5, UIF, SDL, ETI, COIDA, BCEA, POPIA, CCMA, e@syFile and more, with DefinedTermSet and FAQPage structured data.
- `/vendors`, `/review-guidelines` and `/suggest-a-correction` (`components/forms/CorrectionForm.tsx`, `submitCorrection` in `lib/actions/forms.ts`): how a vendor gets listed and keeps a listing right, how reviews are moderated, and a correction form linked from every product. A correction lands in the enquiries inbox. A vendor reply to a review is requested through the contact form and saved by an admin in `/admin/reviews` (migration 0007); it shows labelled beneath the review.
- Forms keep what a reader typed when one field fails validation (`components/forms/keep-form.ts`; React 19 would otherwise clear the form), and still submit without JavaScript.

To check a production build while a dev server is running, build into another folder: `NEXT_DIST_DIR=.next-verify npx next build`, then `NEXT_DIST_DIR=.next-verify npx next start`.

## Prices in rand

Every price on the site is shown in rand. Where a vendor lists in dollars, pounds or euros, the price is converted at the European Central Bank reference rate and the rate and its date are printed under each price list (`components/FxNote.tsx`, `lib/fx.ts`, `lib/format.ts` `priceLabel`). The register never describes a product as billed in a foreign currency.

* `lib/queries/fx.ts` asks Frankfurter for today's rates (cached for 12 hours, 4 second timeout) and falls back to `lib/data/fx.ts` if the feed is down.
* `npm run fx` refreshes that saved snapshot.
* The price band filters and the price sort use the converted rand figure, so a dollar product lands in the right band.
* `priceText` still returns the vendor's own currency, because structured data and `npm run verify` should state what the vendor lists.
* Text inside plan notes and blog posts that quotes a foreign price gives it in rand and marks it "about", at the 2 October 2026 rate.

## Cards and comparisons

* `components/SoftwareCard.tsx` is the product card (home, `/register`, sector pages), with every plan as a tile (`components/PlanGrid.tsx`) so a buyer sees what the paid plans cost without opening the product. `/register` shows cards by default with sort chips, and `?view=table` keeps the table.
* `components/ProductActions.tsx` is the shared button pair: a lime outbound button and a blue "View details" button. **No button on the site is black.** A product with no vendor site gets "View details" as the primary.
* The home page has a Browse all products directory (`components/ProductDirectory.tsx`) with one chip per category.
* `lib/data/editorial/` holds a detailed comparison for each of the 15 curated pairs, written from the vendors' own pages, with prices checked against the register on 11 October 2026. `npm run verify` checks coverage and the copy rules on them.
* `lib/data/availability.ts` says, product by product, whether it is sold and supported in South Africa (a lime Sold in South Africa pill for local products, and a note on what the vendor's page shows for the rest). Every Sage product is Sold in South Africa, and `npm run verify` fails if one is not. The site never says a product is unsupported or not built for South Africa.

## Design rules

No gradients. No box shadows. Tabular numerals. Copy has no hyphens or dashes, and none of the banned marketing words (`npm run verify` checks briefings, comparisons, blog posts and notes). Prices always carry their basis. A null price is Price on request, a zero price is Free.

Lime is the brand colour and carries ink text. Blue (`--azure`) is the second action colour. Buttons are lime, blue or outlined, never black. Icons are plain and few, and there are no sparkles or lightning bolts.
