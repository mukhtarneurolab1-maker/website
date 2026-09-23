import Link from "next/link";
import { LoginForm } from "./LoginForm";
import { getServerSupabase } from "@/lib/supabase/server";
import { supabaseEnabled } from "@/lib/supabase/config";

export default async function AdminHome() {
  if (!supabaseEnabled) {
    return (
      <div className="admin-setup">
        <h1>Admin is ready once Supabase is connected</h1>
        <ol>
          <li>Create a project at supabase.com.</li>
          <li>Copy the project URL and publishable key into <code>.env.local</code>.</li>
          <li>Run <code>supabase/schema.sql</code>, then <code>supabase/seed.sql</code>.</li>
          <li>Add a user under Authentication, then sign in at /admin.</li>
        </ol>
      </div>
    );
  }

  const supabase = await getServerSupabase();
  const user = supabase ? (await supabase.auth.getUser()).data.user : null;
  if (!user) return <LoginForm />;

  const counts = await Promise.all(
    ["research_items", "publications", "awards", "blogs"].map(async (table) => {
      const { count } = await supabase!.from(table).select("*", { count: "exact", head: true });
      return count ?? 0;
    })
  );

  const cards = [
    ["Research", counts[0], "/admin/research"],
    ["Publications", counts[1], "/admin/publications"],
    ["Awards", counts[2], "/admin/awards"],
    ["Blogs", counts[3], "/admin/blogs"],
  ] as const;

  return (
    <div className="admin-page">
      <h1>Content</h1>
      <p>Add or edit research, publications, awards, and blog posts. Published items appear on the website.</p>
      <div className="admin-cards">
        {cards.map(([label, count, href]) => (
          <Link key={href} href={href} className="admin-card">
            <strong>{count}</strong>
            <span>{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
