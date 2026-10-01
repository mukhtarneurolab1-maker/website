import Link from "next/link";
import { DeleteRow, deleteActions } from "../forms";
import { importSeedResources } from "../actions";
import { getServerSupabase } from "@/lib/supabase/server";
import type { Resource } from "@/lib/types";

export default async function ResourcesAdmin() {
  const supabase = await getServerSupabase();
  const result = supabase
    ? await supabase.from("resources").select("*").order("sort_order")
    : { data: [] as Resource[], error: null };
  const rows = (result.data ?? []) as Resource[];
  const tableMissing = Boolean(result.error?.message?.toLowerCase().includes("could not find the table")
    || result.error?.code === "42P01"
    || result.error?.message?.includes("schema cache"));

  return (
    <div className="admin-page">
      <div className="admin-head">
        <h1>Resources</h1>
        <Link className="btn btn-accent" href="/admin/resources/new">Add resource</Link>
      </div>

      {tableMissing ? (
        <p className="admin-error">
          The <code>resources</code> table is missing. In Supabase → SQL Editor, run{" "}
          <code>supabase/migration-resources-gallery.sql</code>, then refresh this page.
        </p>
      ) : null}

      {result.error && !tableMissing ? (
        <p className="admin-error">Could not load resources: {result.error.message}</p>
      ) : null}

      <ul className="admin-list">
        {rows.map((row) => (
          <li key={row.id}>
            <Link href={`/admin/resources/${row.id}`}>{row.title}</Link>
            <span>{row.published ? "Published" : "Draft"}</span>
            <Link className="admin-edit" href={`/admin/resources/${row.id}`}>Edit</Link>
            <DeleteRow id={row.id} action={deleteActions.resources} />
          </li>
        ))}
      </ul>

      {!tableMissing && rows.length === 0 ? (
        <div className="admin-empty">
          <p>
            The resources table is empty. The public site still shows built-in content.
            Import that content here so you can edit it, or add a new resource.
          </p>
          <form action={importSeedResources}>
            <button className="btn btn-accent" type="submit">
              Import built-in resources
            </button>
          </form>
          <p className="admin-hint">
            Or run <code>supabase/seed-resources-gallery.sql</code> in the Supabase SQL editor.
          </p>
        </div>
      ) : null}
    </div>
  );
}
