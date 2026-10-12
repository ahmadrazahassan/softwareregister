import { NextResponse, type NextRequest } from "next/server";
import { SITE_URL } from "@/lib/site";
import { serviceClient } from "@/lib/supabase/admin";

/** Double opt in. The link in the confirmation email lands here and flips the subscriber to confirmed. */
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token")?.slice(0, 100) ?? "";
  const sb = serviceClient();
  if (token && sb) {
    await sb
      .from("dispatch_subscribers")
      .update({ status: "confirmed", confirmed_at: new Date().toISOString() })
      .eq("token", token)
      .eq("status", "pending");
  }
  return NextResponse.redirect(new URL("/dispatch?confirmed=1", SITE_URL || req.url));
}
