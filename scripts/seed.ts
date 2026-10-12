/**
 * Loads the bundled dataset into Supabase. Safe to run again: every table is
 * upserted on its natural key. Run it after applying the migrations.
 *
 *   npm run seed
 *
 * It overwrites the rows it manages. If you have edited a product in the admin
 * and then re-seed, the bundled values win. Edit lib/data too, or do not re-seed.
 */
import { BRIEFINGS } from "../lib/data/briefings";
import { COMPARISONS } from "../lib/data/comparisons";
import { SECTORS } from "../lib/data/sectors";
import { SOFTWARE } from "../lib/data/software";
import { serviceClientOrExit } from "./_client";

async function main() {
  const sb = serviceClientOrExit();

  const step = async (table: string, rows: object[], onConflict: string) => {
    const { error } = await sb.from(table).upsert(rows, { onConflict });
    if (error) {
      console.error(`FAILED ${table}: ${error.message}`);
      process.exit(1);
    }
    console.log(`ok  ${table.padEnd(12)} ${rows.length} rows`);
  };

  await step("sectors", SECTORS, "slug");
  await step("software", SOFTWARE, "slug");
  await step(
    "comparisons",
    COMPARISONS.map((c) => ({ ...c, published: true })),
    "slug",
  );
  await step("briefings", BRIEFINGS, "slug");

  console.log("\nSeeded. The public site now reads from Supabase.");
}

main();
