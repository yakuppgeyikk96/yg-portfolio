import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const locales = ["en", "tr"];
const defaultLocale = "tr";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/studio") || pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
  }

  const segment = pathname.slice(1).split("/")[0];
  if (locales.includes(segment)) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|.*\\..*).*)"],
};
