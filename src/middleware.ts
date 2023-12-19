import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/admin"];
const authRoutes = ["/auth/login"];
const publicRoutes = ["/events", "/"];

function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;

  if (["/auth/login", "/auth/signup"].includes(request.nextUrl.pathname) && token)  {
    if (role === "admin") {
      return NextResponse.redirect(new URL("/admin", request.url));
      
    } else if (role === "user") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  
  if (["/admin", "/events", "/"].includes(request.nextUrl.pathname) && !token && !role) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/admin") &&  token && role === "user") {
    return NextResponse.redirect(new URL("/", request.url))
  }
  if (['/'].includes(request.nextUrl.pathname) && token && role === "admin") {
    return NextResponse.redirect(new URL("/admin", request.url))
  }
  if (request.nextUrl.pathname.startsWith('/events') && token && role === "admin") {
    return NextResponse.redirect(new URL("/admin", request.url))
  }
}

export default middleware;
