import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isRoot = pathname === "/";
  const isUserArea = pathname.startsWith("/user");
  const isAdminArea = pathname.startsWith("/admin");

  let user: any = null;
  try {
    const cookie = request.headers.get("cookie") ?? "";
    const origin = request.nextUrl.origin;
    const res = await fetch(`${origin}/api/auth/me`, {
      headers: cookie ? { cookie } : undefined,
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      user = data?.user ?? data ?? null;
    }
  } catch {
    user = null;
  }

  if (isRoot && user) {
    console.log("Redirecting authenticated user from root to their dashboard");
    const role = (user.role || "").toLowerCase();
    const target = role === "admin" ? "/admin/dashboard" : "/user/home";
    return NextResponse.redirect(new URL(target, request.url));
  }

  if ((isUserArea || isAdminArea) && !user) {
    return NextResponse.redirect(new URL("/403", request.url));
  }

  if (isAdminArea && user && String(user.role).toLowerCase() !== "admin") {
    return NextResponse.redirect(new URL("/403", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/user/:path*", "/admin/:path*"],
};
