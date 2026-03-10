import { redirect } from "next/navigation";
import { headers } from "next/headers";

/**
 * /login: send user to the auth app, then back to this app.
 */
export default async function LoginPage() {
  const h = await headers();
  const host = h.get("host") ?? "platform.thecapitalbridge.com";
  const loginUrl = new URL("https://login.thecapitalbridge.com/login");
  loginUrl.searchParams.set("redirectTo", `https://${host}/dashboard`);
  redirect(loginUrl.toString());
}
