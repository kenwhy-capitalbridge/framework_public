import { redirect } from "next/navigation";
import { getServerUser } from "@/lib/auth";

/**
 * Root route: session-based redirect only.
 * - Has session → /dashboard
 * - No session → /login
 */
export default async function RootPage() {
  const user = await getServerUser();
  if (user) {
    redirect("/dashboard");
  }
  redirect("/login");
}
