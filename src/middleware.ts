import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const pathname = req.nextUrl.pathname;

  if (req.auth && (pathname === "/login" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/profiles", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/login", "/signup"],
};
