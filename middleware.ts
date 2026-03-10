import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function middleware(req: NextRequest) {
  let res = NextResponse.next({ request: req });
  const url = req.nextUrl.clone();
  const isProtectedRoute =
    url.pathname === "/" || url.pathname.startsWith("/dashboard");

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

  // If Supabase env vars are not configured for this Vercel project, skip
  // auth in middleware instead of throwing a runtime error.
  if (!supabaseUrl || !supabaseAnonKey) {
    return res;
  }

  try {
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            res.cookies.set(name, value, options);
          });
        },
      },
    });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (isProtectedRoute && !user) {
      const loginUrl = new URL("https://login.thecapitalbridge.com/login");
      loginUrl.searchParams.set("redirectTo", req.nextUrl.toString());
      return NextResponse.redirect(loginUrl);
    }

    return res;
  } catch {
    // If anything goes wrong talking to Supabase in middleware, fall back to
    // letting the request through. The server component will still enforce
    // access and show the payment gate as needed.
    return res;
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|assets|public).*)"],
};

