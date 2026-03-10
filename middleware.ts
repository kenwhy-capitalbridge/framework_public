import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const url = req.nextUrl.clone();
  const isProtectedRoute =
    url.pathname === "/" || url.pathname.startsWith("/dashboard");

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

