import Link from "next/link";
import { DeleteRow, deleteActions } from "../forms";
import { getServerSupabase } from "@/lib/supabase/server";
import type { Publication } from "@/lib/types";

export default async function PublicationsAdmin() {
  const supabase = await getServerSupabase();
  const { data } = supabase
    ? await supabase.from("publications").select("*").order("sort_order")
    : { data: [] };
  const rows = (data ?? []) as Publication[];

  return (
    <div className="admin-page">
      <div className="admin-head">
        <h1>Publications</h1>
        <Link className="btn btn-accent" href="/admin/publications/new">Add publication</Link>
      </div>
      <ul className="admin-list">
        {rows.map((row) => (
          <li key={row.id}>
            <Link href={`/admin/publications/${row.id}`}>{row.title}</Link>
            <span>{row.category}</span>
            <DeleteRow id={row.id} action={deleteActions.publications} />
          </li>
        ))}
      </ul>
    </div>
  );
}
