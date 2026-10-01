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
  const awards = rows.filter((row) => row.category === "fellowship");
  const rewards = rows.filter((row) => row.category !== "fellowship");

  return (
    <div className="admin-page">
      <div className="admin-head">
        <h1>Awards and rewards</h1>
        <Link className="btn btn-accent" href="/admin/awards/new">Add</Link>
      </div>
      <section className="admin-group">
        <h2>Awards</h2>
        <AwardList rows={awards} empty="No awards yet." />
      </section>
      <section className="admin-group">
        <h2>Rewards</h2>
        <AwardList rows={rewards} empty="No rewards yet." />
      </section>
    </div>
  );
}

function AwardList({ rows, empty }: { rows: Award[]; empty: string }) {
  if (rows.length === 0) return <p>{empty}</p>;
  return (
    <ul className="admin-list">
      {rows.map((row) => (
        <li key={row.id}>
          <Link href={`/admin/awards/${row.id}`}>{row.title}</Link>
          <span>{row.year_label}</span>
          <Link className="admin-edit" href={`/admin/awards/${row.id}`}>Edit</Link>
          <DeleteRow id={row.id} action={deleteActions.awards} />
        </li>
      ))}
    </ul>
  );
}
