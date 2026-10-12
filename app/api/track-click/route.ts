import { outboundLink } from "@/lib/affiliates";
import { AD_CREATIVES } from "@/lib/ads";
import { hostOf } from "@/lib/format";
import { loadSoftware } from "@/lib/queries/source";
import { rateLimited, visitorHash } from "@/lib/server/visitor";
import { serviceClient } from "@/lib/supabase/admin";
import { publicClient } from "@/lib/supabase/public";

/**
 * Counts an outbound click. It stores the product, the placement, the
 * destination host and a salted hash of the visitor's connection. It never
 * stores an address. It always answers 204, so a failure here can never get in
 * the way of a reader leaving the page.
 */
export async function POST(req: Request) {
  const done = () => new Response(null, { status: 204 });
  try {
    const body = (await req.json()) as { slug?: unknown; placement?: unknown; affiliate?: unknown };
    const slug = typeof body.slug === "string" ? body.slug.slice(0, 80) : "";
    const placement = typeof body.placement === "string" ? body.placement.slice(0, 60) : "";
    if (!slug || !placement) return done();

    const hash = await visitorHash();
    if (rateLimited(`click:${hash}`, 60, 60_000)) return done();

    const software = (await loadSoftware()).find((s) => s.slug === slug);
    const ad = AD_CREATIVES.find((c) => c.id === slug);
    const link = software ? outboundLink(software)?.href : ad?.href;
    // Ignore anything that is not a product or an ad we serve, so the table cannot be filled with junk.
    if (!link) return done();

    const sb = serviceClient() ?? publicClient();
    if (!sb) return done();
    await sb.from("affiliate_clicks").insert({
      software_slug: slug,
      placement,
      host: hostOf(link),
      affiliate: Boolean(body.affiliate),
      ip_hash: hash,
    });
  } catch {
    // Swallow everything. Tracking is best effort.
  }
  return done();
}
