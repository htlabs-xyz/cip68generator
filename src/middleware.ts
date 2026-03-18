// Auth is handled client-side via wallet connection state
// and server-side via x-wallet-address header in API routes.
// Middleware is not needed for auth enforcement.

export const config = {
  matcher: "/dashboard/:path*",
};
