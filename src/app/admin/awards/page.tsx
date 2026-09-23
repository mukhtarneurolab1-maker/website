import Link from "next/link";
import { DeleteRow, deleteActions } from "../forms";
import { getServerSupabase } from "@/lib/supabase/server";
import type { Award } from "@/lib/types";

export default async function AwardsAdmin() {
  const supabase = await getServerSupabase();
  const { data } = supabase
    ? await supabase.from("awards").select("*").order("sort_order")
    : { data: [] };
  const rows = (data ?? []) as Award[];

  return (
    <div className="admin-page">
      <div className="admin-head">
        <h1>Awards</h1>
        <Link className="btn btn-accent" href="/admin/awards/new">Add award</Link>
      </div>
      <ul className="admin-list">
        {rows.map((row) => (
          <li key={row.id}>
            <Link href={`/admin/awards/${row.id}`}>{row.title}</Link>
            <span>{row.category}</span>
            <DeleteRow id={row.id} action={deleteActions.awards} />
          </li>
        ))}
      </ul>
    </div>
  );
}
