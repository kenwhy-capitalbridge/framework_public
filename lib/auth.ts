import "server-only";
import { createClient } from "@/lib/supabase/server";

/**
 * Returns the current user from Supabase auth, or null if not signed in.
 * Returns null on any error (e.g. missing env) so the app can redirect to login.
 */
export async function getServerUser(): Promise<{
  id: string;
  email?: string;
} | null> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user ? { id: user.id, email: user.email } : null;
  } catch {
    return null;
  }
}
