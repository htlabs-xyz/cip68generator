import { NextResponse } from "next/server";

// Auth is handled client-side via wallet connection state
// and server-side via JWT Bearer token in API routes.
// Middleware is a no-op passthrough.
export function middleware() {
  return NextResponse.next();
}

export const config = {
  matcher: "/dashboard/:path*",
};
