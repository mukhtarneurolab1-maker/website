import Link from "next/link";
import { DeleteRow, deleteActions } from "../forms";
import { getServerSupabase } from "@/lib/supabase/server";
import type { BlogPost } from "@/lib/types";

export default async function BlogsAdmin() {
  const supabase = await getServerSupabase();
  const { data } = supabase
    ? await supabase.from("blogs").select("*").order("published_at", { ascending: false })
    : { data: [] };
  const rows = (data ?? []) as BlogPost[];

  return (
    <div className="admin-page">
      <div className="admin-head">
        <h1>Blogs</h1>
        <Link className="btn btn-accent" href="/admin/blogs/new">Add blog</Link>
      </div>
      {rows.length === 0 ? <p>No posts yet. Add the first one when you are ready.</p> : null}
      <ul className="admin-list">
        {rows.map((row) => (
          <li key={row.id}>
            <Link href={`/admin/blogs/${row.id}`}>{row.title}</Link>
            <span>{row.published ? "Published" : "Draft"}</span>
            <DeleteRow id={row.id} action={deleteActions.blogs} />
          </li>
        ))}
      </ul>
    </div>
  );
}
