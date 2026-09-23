export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";

export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "";

/** True once Supabase keys are present in the environment. */
export const supabaseEnabled = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
