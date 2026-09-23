import Link from "next/link";
import { DeleteRow, deleteActions } from "../forms";
import { getServerSupabase } from "@/lib/supabase/server";
import type { ResearchItem } from "@/lib/types";

export default async function ResearchAdmin() {
  const supabase = await getServerSupabase();
  const { data } = supabase
    ? await supabase.from("research_items").select("*").order("sort_order")
    : { data: [] };
  const rows = (data ?? []) as ResearchItem[];

  return (
    <div className="admin-page">
      <div className="admin-head">
        <h1>Research</h1>
        <Link className="btn btn-accent" href="/admin/research/new">Add research</Link>
      </div>
      <ul className="admin-list">
        {rows.map((row) => (
          <li key={row.id}>
            <Link href={`/admin/research/${row.id}`}>{row.title}</Link>
            <span>{row.published ? "Published" : "Draft"}</span>
            <DeleteRow id={row.id} action={deleteActions.research} />
          </li>
        ))}
      </ul>
    </div>
  );
}
