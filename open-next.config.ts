import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

/**
 * How the site runs on Cloudflare Workers.
 *
 * Every page that sets `revalidate = 3600` is rendered at build time and served
 * from the Worker's static assets. That cache is read only, so a change in
 * Supabase (a price, an approved review) reaches those pages on the next
 * deploy, not on a timer. Forms, the admin area and the search page are server
 * rendered on every request and always read live data.
 *
 * To make the hourly refresh work without a redeploy, switch the incremental
 * cache to a KV namespace (overrides/incremental-cache/kv-incremental-cache,
 * binding NEXT_INC_CACHE_KV) and the queue to overrides/queue/memory-queue.
 * That needs a KV namespace on the account. R2 and Durable Objects are not used.
 */
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
