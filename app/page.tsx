import { redirect } from "next/navigation";
import { getServerUser } from "@/lib/auth";

export default async function Page() {
  let user = null;
  try {
    user = await getServerUser();
  } catch {
    redirect("/login");
  }

  if (user) {
    redirect("/dashboard");
  }

  redirect("/login");
}
