/**
 * The site's own frequently asked questions. Every answer describes something the
 * site does today, and points to the page that explains it in full. If a process
 * is not running, it is not described here.
 *
 * Copy contains no hyphens and no dashes. Rewrite the sentence instead.
 */

export interface Faq {
  q: string;
  a: string;
  link?: { label: string; href: string };
}

export interface FaqGroup {
  heading: string;
  items: Faq[];
}

export const FAQ_GROUPS: FaqGroup[] = [
  {
    heading: "About Software Register",
    items: [
      {
        q: "What is Software Register?",
        a: "A register of business software for South African buyers. It records each product's price in rand with the date it was read, the SARS returns and bank feeds the vendor's own page states, and whether the product is sold in South Africa. It publishes no ratings and no rankings.",
        link: { label: "How the register works", href: "/method" },
      },
      {
        q: "Who is it for?",
        a: "South African business owners, bookkeepers, accountants and finance managers choosing accounting, payroll, HR, CRM, ERP or project management software.",
      },
      {
        q: "How does Software Register make money?",
        a: "Some links to vendors are affiliate links, and we earn a commission if you buy. That does not change what we publish or the order of the register, which is alphabetical. Any sponsored banner is labelled as one.",
        link: { label: "Affiliate disclosure", href: "/affiliate-disclosure" },
      },
      {
        q: "Is what I read here tax, legal or financial advice?",
        a: "No. The guides explain rules in plain words and the register records what vendors state. Neither has been reviewed by a registered tax practitioner or an attorney. Check SARS, the Department of Employment and Labour or the Information Regulator, or ask your accountant.",
        link: { label: "The guides", href: "/briefings" },
      },
    ],
  },
  {
    heading: "Prices",
    items: [
      {
        q: "Where do the prices come from?",
        a: "From the vendor's own pricing page. A price on the register is the vendor's published list price for South Africa, recorded with its amount, its basis and the date it was read.",
        link: { label: "How prices are read", href: "/method" },
      },
      {
        q: "How up to date are they?",
        a: "Each price shows the date it was read. The register does not promise a recurring check, so look at the vendor's page on the day you buy. If you sign up for price alerts we email you when we record a change or a product is withdrawn.",
        link: { label: "Price alerts", href: "/dispatch" },
      },
      {
        q: "Why are the prices in rand, and how are dollar prices converted?",
        a: "The register is written for South African buyers, so every price is shown in rand. Where a vendor lists in dollars, pounds or euros, the register converts the figure at the European Central Bank reference rate and says so under the price.",
      },
      {
        q: "Does a price include VAT?",
        a: "Each price prints its basis: including VAT, excluding VAT, per user or per employee. Where a vendor does not say, the register shows the plain figure and does not guess. A business registered for VAT claims the VAT back, so the price excluding VAT is its real cost.",
        link: { label: "Including and excluding VAT", href: "/briefings/including-and-excluding-vat" },
      },
      {
        q: "What does Price on request mean, and how is it different from Free?",
        a: "Price on request means the vendor gives its price only after you contact it, and the register does not estimate one. Free means the starting price is zero. They are different facts.",
        link: { label: "How to ask for a quote", href: "/briefings/how-to-ask-for-a-quote" },
      },
      {
        q: "What does Sold in South Africa mean?",
        a: "The vendor's own pages show a South African site, rand pricing, a local phone line or South African origin. Other products are available to South African businesses online, with the price shown in rand.",
      },
    ],
  },
  {
    heading: "Finding software",
    items: [
      {
        q: "Why is there no best software or rating?",
        a: "Because the best product depends on your business, and a score hides that. The register lists products alphabetically, shows facts and lets you filter, so you can compare on what matters to you.",
        link: { label: "Why Software Register has no ratings and no rankings", href: "/blog/why-software-register-has-no-ratings-and-no-rankings" },
      },
      {
        q: "How does the shortlist finder work?",
        a: "You answer five questions: what you need, how many people, whether you are registered for VAT, your bank and your budget. It lists every product whose own pages meet the answers, with the price worked out for your size, and tells you which products it left out and why. Your answers sit in the address of the page and are not stored.",
        link: { label: "Build a shortlist", href: "/finder" },
      },
      {
        q: "Where is my shortlist kept?",
        a: "In your own browser. Nothing is sent to us. You can share it as a link, since the shortlist page carries the products in its address.",
        link: { label: "Your shortlist", href: "/shortlist" },
      },
      {
        q: "What are the lists?",
        a: "Pages such as Free accounting software or Payroll software with e@syFile. Each is a filter of the register written out as a page, and changes when the register does.",
        link: { label: "All lists", href: "/lists" },
      },
      {
        q: "A product is not on a list but I think it does the thing. Why?",
        a: "The register records a fact only where the vendor's own page states it. A product missing from a list may still do it. Ask the vendor and ask to see it work.",
      },
      {
        q: "What is the difference between a guide and a blog post?",
        a: "A guide explains a rule or a decision and stays true for years. A blog post is dated: what a price looked like on a day, or what a vendor changed.",
      },
    ],
  },
  {
    heading: "Reviews",
    items: [
      {
        q: "Can I write a review?",
        a: "Yes, of any product. An editor reads it before it appears and it is published as written, if it follows the guidelines. Reviews are never averaged or counted into a score.",
        link: { label: "Write a review", href: "/write-a-review" },
      },
      {
        q: "Do you check that reviewers are customers?",
        a: "No. We do not check purchase records, and we do not mark any review as checked. An editor reads each one, and the guidelines say what is not accepted. Weigh a review as one person's account.",
        link: { label: "Review guidelines", href: "/review-guidelines" },
      },
      {
        q: "Can a vendor remove or change a review?",
        a: "No. A vendor cannot pay to change or remove a review. If a review states something about a product that is wrong, the vendor can say so, and a reply from the vendor can be shown beneath it.",
        link: { label: "For vendors", href: "/vendors" },
      },
    ],
  },
  {
    heading: "Vendors and corrections",
    items: [
      {
        q: "How do I add my product?",
        a: "Use the listing form. A listing is free and does not buy a better position. We read the price from your own pages and date it.",
        link: { label: "Add a product", href: "/add-a-product" },
      },
      {
        q: "Can I pay to be listed higher?",
        a: "No. The register is in alphabetical order and no payment, affiliate link or sponsorship changes it.",
      },
      {
        q: "How do I report a mistake?",
        a: "Use the Suggest a correction form, with a link to the vendor's page that shows the right figure. A confirmed error is corrected and the date updated. Corrections are never sold.",
        link: { label: "Suggest a correction", href: "/suggest-a-correction" },
      },
    ],
  },
  {
    heading: "Your information",
    items: [
      {
        q: "What do you store about me?",
        a: "Only what you give us in a form, such as a review, an enquiry or an email address for price alerts, plus a salted hash of your connection to limit abuse, never your address. Your shortlist stays in your browser.",
        link: { label: "Privacy policy", href: "/privacy-policy" },
      },
    ],
  },
];

export const ALL_FAQS: Faq[] = FAQ_GROUPS.flatMap((g) => g.items);
