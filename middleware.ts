import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const url = req.nextUrl.clone();
  const isProtectedRoute =
    url.pathname === "/" || url.pathname.startsWith("/dashboard");

  // Skip auth redirect on localhost so you can develop; production login
  // cookies (login.thecapitalbridge.com) are not sent to localhost (cross-origin).
  const host = req.headers.get("host") ?? "";
  const hostname = url.hostname ?? "";
  const isLocalDev =
    host.startsWith("localhost") ||
    host.startsWith("127.0.0.1") ||
    host.startsWith("0.0.0.0") ||
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "0.0.0.0";
  if (isLocalDev) {
    return res;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If Supabase env vars are missing, fall back to simple redirect behaviour
  if (!supabaseUrl || !supabaseAnonKey) {
    if (isProtectedRoute) {
      const loginUrl = new URL("https://login.thecapitalbridge.com/login");
      loginUrl.searchParams.set("redirectTo", req.nextUrl.toString());
      return NextResponse.redirect(loginUrl);
    }
    return res;
  }

  const supabase = createMiddlewareClient({
    req,
    res,
    supabaseUrl,
    supabaseKey: supabaseAnonKey,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (isProtectedRoute && !session) {
    const loginUrl = new URL("https://login.thecapitalbridge.com/login");
    loginUrl.searchParams.set("redirectTo", req.nextUrl.toString());
    return NextResponse.redirect(loginUrl);
  }

  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|assets|public).*)"],
};

