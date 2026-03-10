import { createClient } from "@/lib/supabase/server";

export type Membership = {
  user_id: string;
  plan: string;
  start_date: string | null;
  end_date: string | null;
} | null;

/**
 * Returns the current user or null. Use on root page for session-only redirect.
 */
export async function getServerUser(): Promise<{ id: string; email?: string } | null> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) return null;

  const devUserId =
    process.env.NODE_ENV !== "production"
      ? process.env.NEXT_PUBLIC_DEV_USER_ID
      : undefined;
  if (devUserId) {
    return { id: devUserId, email: "dev-user@example.com" };
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user ?? null;
}

/**
 * Returns user and active membership. Use on dashboard for gating.
 */
export async function getServerUserAndMembership(): Promise<{
  user: { id: string; email?: string } | null;
  membership: Membership;
}> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) {
    return { user: null, membership: null };
  }

  const devUserId =
    process.env.NODE_ENV !== "production"
      ? process.env.NEXT_PUBLIC_DEV_USER_ID
      : undefined;

  const supabase = await createClient();

  if (devUserId) {
    const { data: membership } = await supabase
      .from("active_memberships")
      .select("user_id, plan, start_date, end_date")
      .eq("user_id", devUserId)
      .maybeSingle();
    return {
      user: { id: devUserId, email: "dev-user@example.com" },
      membership: (membership as Membership) ?? null,
    };
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { user: null, membership: null };

  const { data: membership } = await supabase
    .from("active_memberships")
    .select("user_id, plan, start_date, end_date")
    .eq("user_id", user.id)
    .maybeSingle();

  return { user, membership: (membership as Membership) ?? null };
}
