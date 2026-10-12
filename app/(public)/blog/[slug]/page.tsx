import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogCard } from "@/components/BlogCard";
import { BlogHero } from "@/components/BlogHero";
import { BrandMark } from "@/components/BrandMark";
import { BriefingBody } from "@/components/BriefingBody";
import { ctaClass } from "@/components/CtaButton";
import { RegisterTable } from "@/components/RegisterTable";
import { BLOG_POSTS, getBlogPost, getBlogPosts, readMinutes } from "@/lib/data/blog";
import { formatDateLong } from "@/lib/format";
import { getRegistry, getTokens } from "@/lib/queries";
import { JsonLd, blogPostLd, breadcrumbLd } from "@/lib/seo";

export const revalidate = 3600;
export const dynamicParams = true;

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = getBlogPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.standfirst,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", publishedTime: post.published_at, authors: [post.author] },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const [reg, tokens] = await Promise.all([getRegistry(), getTokens()]);
  const named = post.product_slugs.map((s) => reg.bySlug.get(s)).filter((s): s is NonNullable<typeof s> => Boolean(s));
  const more = [...getBlogPosts().filter((p) => p.slug !== post.slug && p.category === post.category), ...getBlogPosts().filter((p) => p.slug !== post.slug && p.category !== post.category)].slice(0, 3);

  return (
    <>
      <JsonLd data={[blogPostLd(post), breadcrumbLd([{ name: "Blog", path: "/blog" }, { name: post.title, path: `/blog/${post.slug}` }])]} />

      <article>
        <header className="mx-auto w-full max-w-[1100px] px-6 pt-10 lg:pt-14">
          <Link href="/blog" className="inline-flex items-center gap-2 text-[14px] leading-5 font-medium text-muted hover:text-ink">
            <ArrowLeft size={16} strokeWidth={1.5} aria-hidden="true" />
            Back to the blog
          </Link>

          <h1 className="mt-8 max-w-[820px] font-heading text-[34px] leading-[38px] font-bold tracking-[-0.03em] md:text-[56px] md:leading-[58px]">{post.title}</h1>
          <p className="mt-6 max-w-[720px] text-[18px] leading-8 text-muted">{post.standfirst}</p>

          <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-5 border-y border-line py-5 sm:grid-cols-4">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 flex-none place-items-center rounded-full border border-line-firm bg-surface">
                <BrandMark size={22} className="text-ink" />
              </span>
              <div>
                <dt className="sr-only">Author</dt>
                <dd className="m-0 text-[14px] leading-5 font-semibold">{post.author}</dd>
              </div>
            </div>
            <div>
              <dt className="stamp text-muted">Category</dt>
              <dd className="m-0 mt-0.5 text-[14px] leading-5 font-semibold">{post.category}</dd>
            </div>
            <div>
              <dt className="stamp text-muted">Date</dt>
              <dd className="m-0 mt-0.5 text-[14px] leading-5 font-semibold">{formatDateLong(post.published_at)}</dd>
            </div>
            <div>
              <dt className="stamp text-muted">Reading time</dt>
              <dd className="m-0 mt-0.5 text-[14px] leading-5 font-semibold">{readMinutes(post)} minutes</dd>
            </div>
          </dl>
        </header>

        <div className="mx-auto mt-10 w-full max-w-[1100px] px-6">
          <BlogHero hero={post.hero} reg={reg} />
        </div>

        <div className="mx-auto mt-12 w-full max-w-[720px] px-6">
          <BriefingBody blocks={post.body} reg={reg} tokens={tokens} />

          <div className="mt-12 flex flex-col gap-4 rounded-[20px] bg-lime-wash p-7 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-heading text-[22px] leading-7 font-bold tracking-[-0.02em]">Know when a price moves.</p>
              <p className="mt-1 text-[14px] leading-5 text-muted">One short email when a price changes or a product is withdrawn.</p>
            </div>
            <Link href="/dispatch" className={ctaClass("primary", "flex-none")}>
              Get price alerts
            </Link>
          </div>
        </div>
      </article>

      {named.length > 0 && (
        <section aria-labelledby="named-title" className="mx-auto mt-16 w-full max-w-[1100px] px-6">
          <h2 id="named-title" className="mb-6 font-heading text-[26px] leading-8 font-bold tracking-[-0.02em]">
            Products named in this post
          </h2>
          <RegisterTable items={named} caption="Products named in this post" />
        </section>
      )}

      {more.length > 0 && (
        <section aria-labelledby="more-title" className="mx-auto mt-20 w-full max-w-[1280px] px-6">
          <div className="mb-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-line-firm pt-12">
            <h2 id="more-title" className="font-heading text-[30px] leading-9 font-bold tracking-[-0.02em]">
              Keep reading
            </h2>
            <Link href="/blog" className="text-[14px] text-lime-text underline underline-offset-4">
              All posts
            </Link>
          </div>
          <ul className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {more.map((p) => (
              <li key={p.slug}>
                <BlogCard post={p} reg={reg} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
