import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // Forward cookies to the internal `/api/me` route to validate the session
  const cookie = req.headers.get("cookie") || "";
  const pathname = req.nextUrl.pathname;
  console.error("[middleware] checking path:", pathname);

  // Allow the public root page `/` without authentication
  if (pathname === "/") {
    const res = NextResponse.next();
    res.headers.set('x-middleware-debug', 'root-allowed');
    console.error('[middleware] root allowed', { pathname });
    return res;
  }

  // Skip middleware for internal Next and API routes and static files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/api')
  ) {
    const res = NextResponse.next();
    res.headers.set('x-middleware-debug', 'skipped');
    console.error('[middleware] skipped path', { pathname });
    return res;
  }

  try {
    const meRes = await fetch(`${req.nextUrl.origin}/api/me`, {
      headers: { cookie },
      cache: "no-store",
    });

    if (!meRes.ok) {
      const redirectRes = NextResponse.redirect(new URL("/", req.url));
      redirectRes.headers.set('x-middleware-debug', 'me-failed');
      console.error('[middleware] /api/me returned not ok', { status: meRes.status, pathname });
      return redirectRes;
    }

    let parsed: any;
    try {
      parsed = await meRes.json();
    } catch (e) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // backend might return { user: {...} } or the user object directly
    const user = parsed?.user ?? parsed ?? null;
    const role = (user?.role || "").toString().toLowerCase();

    if (pathname.startsWith("/admin")) {
      // only allow explicit 'admin' role
      if (role !== "admin") {
        const redirectRes = NextResponse.redirect(new URL("/403", req.url));
        redirectRes.headers.set('x-middleware-debug', 'not-admin');
        console.error('[middleware] blocked non-admin', { role, pathname });
        return redirectRes;
      }
    }

    const okRes = NextResponse.next();
    okRes.headers.set('x-middleware-debug', 'allowed');
    console.error('[middleware] allowed', { role, pathname });
    return okRes;
  } catch (err) {
    const redirectRes = NextResponse.redirect(new URL("/", req.url));
    redirectRes.headers.set('x-middleware-debug', 'error');
    console.error('[middleware] error', err);
    return redirectRes;
  }
}

export const config = {
  matcher: [
    // Dashboard and account areas
    "/dashboard/:path*",
    "/user/:path*",
    "/profile/:path*",
    "/settings/:path*",
    // Admin area (admin-only)
    "/admin/:path*",
    "/admin",
  ],
};
