import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "uairox_session";
const ADMIN_COOKIE = "uairox_admin";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const session = req.cookies.get(COOKIE_NAME)?.value;
  const adminSession = req.cookies.get(ADMIN_COOKIE)?.value;

  if (pathname.startsWith("/dashboard") || pathname.startsWith("/setup")) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    if (adminSession !== process.env.ADMIN_SECRET) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  if (pathname === "/login" && session) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/setup/:path*", "/admin/:path*", "/login"],
};
