// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPages = ["/", "/playlist", "/library"];

export function middleware(request: NextRequest) {
  if (protectedPages.find((page) => page === request.nextUrl.pathname)) {
    const token = request.cookies.get("TRAX_ACCESS_TOKEN");
    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = "/signin";
      return NextResponse.redirect(url);
    }
  }
}
