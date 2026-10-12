import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { readMinutes, type BlogPost } from "@/lib/data/blog";
import { formatDateStamp } from "@/lib/format";
import type { Registry } from "@/lib/registry";
import { BlogHero } from "./BlogHero";

/** A post as a card: its picture, category and date, the title and two lines of the standfirst. The whole card is the link. */
export function BlogCard({ post, reg }: { post: BlogPost; reg: Registry }) {
  return (
    <article className="group relative flex h-full flex-col">
      <BlogHero hero={post.hero} reg={reg} compact />
      <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="rounded-full border border-line-firm px-2.5 py-1 text-[12px] leading-4 font-semibold">{post.category}</span>
        <span className="stamp text-muted">{formatDateStamp(post.published_at)}</span>
        <span className="stamp text-muted">{readMinutes(post)} min read</span>
      </div>
      <h3 className="mt-3 font-heading text-[22px] leading-7 font-bold tracking-[-0.02em]">
        <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0 group-hover:underline group-hover:underline-offset-4">
          {post.title}
        </Link>
      </h3>
      <p className="mt-2 line-clamp-2 text-[14px] leading-6 text-muted">{post.standfirst}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-[14px] leading-5 font-semibold text-lime-text">
        Read the post
        <ChevronRight size={16} strokeWidth={1.5} aria-hidden="true" />
      </span>
    </article>
  );
}
