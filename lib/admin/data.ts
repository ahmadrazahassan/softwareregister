import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Software } from "../types";

/** Colour for a "days since checked" cell. Under 30 muted, 30 to 90 ink 600, over 90 or never alert. */
export function ageClass(days: number | null): string {
  if (days === null) return "font-semibold text-alert";
  if (days > 90) return "font-semibold text-alert";
  if (days >= 30) return "font-semibold text-ink";
  return "text-muted";
}

/** Every product, oldest check first, never checked at the very top. Admin sees withdrawn products too. */
export async function loadAdminSoftware(sb: SupabaseClient): Promise<Software[]> {
  const { data, error } = await sb
    .from("software")
    .select("*")
    .order("price_checked_at", { ascending: true, nullsFirst: true })
    .order("name", { ascending: true });
  if (error) {
    console.error("[softwareregister admin] software:", error.message);
    return [];
  }
  return (data ?? []) as Software[];
}

/** An exact row count, optionally narrowed by one equality. */
export async function countRows(
  sb: SupabaseClient,
  table: string,
  eq?: [column: string, value: string | boolean],
): Promise<number> {
  let query = sb.from(table).select("*", { count: "exact", head: true });
  if (eq) query = query.eq(eq[0], eq[1]);
  const { count } = await query;
  return count ?? 0;
}
