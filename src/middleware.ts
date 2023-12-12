import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/admin"];
const authRoutes = ["/auth/login"];
const publicRoutes = ["/events", "/"];

function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;

  if (authRoutes.includes(request.nextUrl.pathname) && token)  {
    if (role === "admin") {
        return NextResponse.redirect(new URL("/admin", request.url));
      
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  
  if ((protectedRoutes.includes(request.nextUrl.pathname) || publicRoutes.includes(request.nextUrl.pathname)) && !token && !role) {
    request.cookies.delete("token");
    request.cookies.delete("role");

    const response = NextResponse.redirect(new URL("/auth/login", request.url));
    response.cookies.delete("token");

    return response;
  }
}

export default middleware;
