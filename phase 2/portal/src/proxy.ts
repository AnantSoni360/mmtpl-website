import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "default_secret_for_development");

export async function proxy(req: NextRequest) {
  const token = req.cookies.get("mmtpl_auth")?.value;
  const path = req.nextUrl.pathname;

  // Protect portal routes
  const isPortalRoute = path.startsWith("/admin") || path.startsWith("/employee") || path.startsWith("/client") || path.startsWith("/jobs");

  if (isPortalRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    try {
      const { payload } = await jwtVerify(token, secret);
      const role = payload.role as string;

      if (path.startsWith("/admin") && role !== "ADMIN" && role !== "SUPER_ADMIN") {
        return NextResponse.redirect(new URL("/auth/login", req.url));
      }

      if (path.startsWith("/employee") && role !== "EMPLOYEE") {
        return NextResponse.redirect(new URL("/auth/login", req.url));
      }

      if (path.startsWith("/client") && role !== "CLIENT") {
        return NextResponse.redirect(new URL("/auth/login", req.url));
      }

      if (path.startsWith("/jobs") && role !== "JOB_SEEKER") {
        return NextResponse.redirect(new URL("/auth/login", req.url));
      }
    } catch (err) {
      // Invalid token
      const response = NextResponse.redirect(new URL("/auth/login", req.url));
      response.cookies.delete("mmtpl_auth");
      return response;
    }
  }

  // Redirect from login to dashboard if already logged in
  if (path.startsWith("/auth/login") && token) {
    try {
      const { payload } = await jwtVerify(token, secret);
      const role = payload.role as string;
      
      if (role === "ADMIN" || role === "SUPER_ADMIN") return NextResponse.redirect(new URL("/admin", req.url));
      if (role === "EMPLOYEE") return NextResponse.redirect(new URL("/employee", req.url));
      if (role === "CLIENT") return NextResponse.redirect(new URL("/client", req.url));
      if (role === "JOB_SEEKER") return NextResponse.redirect(new URL("/jobs", req.url));
    } catch {
      // Ignore if token is invalid, let them stay on login page
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/employee/:path*", "/client/:path*", "/jobs/:path*", "/auth/login"],
};
