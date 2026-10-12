import { NextResponse, type NextRequest } from "next/server";
import { readSession } from "@/lib/supabase/proxy";

/**
 * The admin guard, first line of defence. (Next 16 renamed middleware to proxy.)
 *
 * Every /admin path requires a verified Supabase session whose app_metadata.role
 * is "admin". Anything else is redirected to /admin/login, except the login page
 * itself. The session is checked with getUser(), which asks the Supabase Auth
 * server to validate the token, and not getSession(), which only decodes a
 * cookie that a caller could have forged.
 *
 * This is NOT the only check. Every admin page, server action and route handler
 * calls requireAdmin() itself (lib/admin/guard.ts), because a proxy matcher can
 * be edited by mistake and a client side check is not a guard at all.
 *
 * With no Supabase keys configured this fails closed: nobody gets in.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { response, isAdmin, signedIn, configured } = await readSession(request);

  const isLogin = pathname === "/admin/login";

  // A signed in admin has no business on the login page.
  if (isLogin && isAdmin) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }
  if (isLogin) return response;

  if (!configured) {
    const url = new URL("/admin/login", request.url);
    url.searchParams.set("reason", "unconfigured");
    return NextResponse.redirect(url);
  }

  if (!isAdmin) {
    const url = new URL("/admin/login", request.url);
    if (signedIn) url.searchParams.set("reason", "forbidden");
    else if (pathname !== "/admin") url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  // Admin pages are never cached by a shared cache.
  response.headers.set("Cache-Control", "private, no-store");
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
