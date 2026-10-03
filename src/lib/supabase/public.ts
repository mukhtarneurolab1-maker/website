import { createClient } from "@supabase/supabase-js";
import { SUPABASE_ANON_KEY, SUPABASE_URL, supabaseEnabled } from "./config";

/** Cookie-free client for published public pages, so the homepage is not blocked by auth cookies. */
export function getPublicSupabase() {
  if (!supabaseEnabled) return null;
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
