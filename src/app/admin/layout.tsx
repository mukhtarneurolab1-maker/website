import type { Metadata } from "next";
import Link from "next/link";
import { AdminNav } from "./AdminNav";
import { SignOutButton } from "./SignOutButton";
import { getServerSupabase } from "@/lib/supabase/server";
import { supabaseEnabled } from "@/lib/supabase/config";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!supabaseEnabled) return <>{children}</>;

  const supabase = await getServerSupabase();
  const user = supabase ? (await supabase.auth.getUser()).data.user : null;
  if (!user) return <>{children}</>;

  return (
    <div className="admin-shell">
      <aside className="admin-side">
        <Link className="admin-brand" href="/admin">
          Mukhtar Lab
          <span>Admin</span>
        </Link>
        <AdminNav />
        <div className="admin-side-foot">
          <p>{user.email}</p>
          <Link href="/">View website</Link>
          <SignOutButton />
        </div>
      </aside>
      <div className="admin-main">{children}</div>
    </div>
  );
}
