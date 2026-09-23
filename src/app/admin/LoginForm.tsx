"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { getBrowserSupabase } from "@/lib/supabase/browser";

function LoginFields() {
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const supabase = getBrowserSupabase();
    if (!supabase) return;
    setBusy(true);
    setError(null);
    const form = new FormData(event.currentTarget);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: String(form.get("email")),
      password: String(form.get("password")),
    });
    setBusy(false);
    if (signInError) {
      setError("That email and password did not match.");
      return;
    }
    const next = params.get("next");
    router.replace(next && next.startsWith("/admin") ? next : "/admin");
    router.refresh();
  }

  return (
    <form className="admin-login" onSubmit={onSubmit}>
      <h1>Mukhtar Lab admin</h1>
      <label htmlFor="email">Email</label>
      <input id="email" name="email" type="email" required autoComplete="email" />
      <label htmlFor="password">Password</label>
      <input id="password" name="password" type="password" required autoComplete="current-password" />
      <button className="btn btn-accent" type="submit" disabled={busy}>
        {busy ? "Signing in…" : "Sign in"}
      </button>
      {error ? <p className="admin-error">{error}</p> : null}
      <Link href="/">Back to the website</Link>
    </form>
  );
}

export function LoginForm() {
  return (
    <div className="admin-login-wrap">
      <Suspense>
        <LoginFields />
      </Suspense>
    </div>
  );
}
