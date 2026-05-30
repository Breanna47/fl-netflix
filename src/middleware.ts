import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
const token = await getToken({
  req,
  secret: process.env.AUTH_SECRET,
});
    const pathname = req.nextUrl.pathname;

    if(!token && pathname !== "/signup" && pathname !== "/login") {
        return NextResponse.redirect(new URL("/login", req.url));
    }
      
if (token && (pathname === "/login" || pathname === "/signup")) {
  return NextResponse.redirect(new URL("/profiles", req.url));
}        
    }
    export const config = {
        matcher: ["/", "/profiles", "/login", "/signup"],
}

