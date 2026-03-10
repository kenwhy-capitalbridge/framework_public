import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware does not use Supabase (avoids Edge runtime issues on Vercel).
 * Auth and redirect-to-login are handled in the server component (app/page.tsx).
 */
export async function middleware(_req: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|assets|public).*)"],
};
