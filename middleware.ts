import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const legacyPaths = ["/markets", "/portfolio", "/rewards", "/rules", "/help", "/create"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (legacyPaths.includes(pathname) || pathname.startsWith("/market/")) {
    return NextResponse.redirect(new URL("/docs", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/markets", "/portfolio", "/rewards", "/rules", "/help", "/create", "/market/:path*"]
};
