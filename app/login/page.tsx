import { redirect } from "next/navigation";
import { headers } from "next/headers";

/**
 * /login — redirect to external auth; after login user returns to / (framework page).
 */
export default async function LoginPage() {
  const h = await headers();
  const host = h.get("host") ?? "platform.thecapitalbridge.com";
  const loginUrl = new URL("https://login.thecapitalbridge.com/login");
  loginUrl.searchParams.set("redirectTo", `https://${host}/`);
  redirect(loginUrl.toString());
}
