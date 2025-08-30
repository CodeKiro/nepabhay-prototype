import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName:
      process.env.NODE_ENV === "production"
        ? "__Secure-next-auth.session-token"
        : "next-auth.session-token",
  });

  const { pathname } = request.nextUrl;

  // Protected admin routes - both frontend and API
  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }

    if (token.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Protected admin API routes
  if (pathname.startsWith("/api/admin")) {
    if (!token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    if (token.role !== "admin") {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }
  }

  // Protected post management endpoints (only admins can create, update, delete)
  if (pathname.startsWith("/api/posts")) {
    const isModifyingRequest =
      request.method === "POST" ||
      request.method === "PUT" ||
      request.method === "DELETE";

    if (isModifyingRequest) {
      if (!token) {
        return NextResponse.json(
          { error: "Authentication required" },
          { status: 401 }
        );
      }

      if (token.role !== "admin") {
        return NextResponse.json(
          { error: "Admin access required" },
          { status: 403 }
        );
      }
    }
  }

  // Protected user routes (for commenting, profile)
  if (
    pathname.startsWith("/api/comments") ||
    pathname.startsWith("/api/feedback") ||
    pathname.startsWith("/api/profile")
  ) {
    if (request.method === "POST" && !token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }
    if ((request.method === "PUT" || request.method === "DELETE") && !token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }
  }

  // Protected profile frontend routes
  if (pathname.startsWith("/profile")) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }
  }

  // Redirect authenticated users away from auth pages (except forgot-password and reset-password)
  if (pathname.startsWith("/auth/") && token) {
    // Allow authenticated users to access forgot-password and reset-password pages
    const allowedAuthPages = ["/auth/forgot-password", "/auth/reset-password"];
    const isAllowedPage = allowedAuthPages.some((page) =>
      pathname.startsWith(page)
    );

    if (!isAllowedPage) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/auth/:path*",
    "/profile/:path*",
    "/api/admin/:path*",
    "/api/posts/:path*",
    "/api/comments/:path*",
    "/api/feedback/:path*",
    "/api/profile/:path*",
  ],
};
