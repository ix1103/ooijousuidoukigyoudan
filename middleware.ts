import { NextRequest, NextResponse } from "next/server";

const excluded = ["/", "/api", "/_next", "/content", "/favicon", "/images", "/aikun.png", "/logo-ooi.gif"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (excluded.some((prefix) => prefix === "/" ? pathname === "/" : pathname.startsWith(prefix)) || pathname.includes(".")) return NextResponse.next();
  const url = request.nextUrl.clone();
  url.pathname = `/content${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = { matcher: "/:path*" };
