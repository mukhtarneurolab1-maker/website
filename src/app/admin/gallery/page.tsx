import Link from "next/link";
import { DeleteRow, deleteActions } from "../forms";
import { importSeedGallery } from "../actions";
import { getServerSupabase } from "@/lib/supabase/server";
import type { GalleryItem } from "@/lib/types";

export default async function GalleryAdmin() {
  const supabase = await getServerSupabase();
  const result = supabase
    ? await supabase.from("gallery_items").select("*").order("sort_order")
    : { data: [] as GalleryItem[], error: null };
  const rows = (result.data ?? []) as GalleryItem[];
  const tableMissing = Boolean(result.error?.message?.toLowerCase().includes("could not find the table")
    || result.error?.code === "42P01"
    || result.error?.message?.includes("schema cache"));

  return (
    <div className="admin-page">
      <div className="admin-head">
        <h1>Gallery</h1>
        <Link className="btn btn-accent" href="/admin/gallery/new">Add photo</Link>
      </div>

      {tableMissing ? (
        <p className="admin-error">
          The <code>gallery_items</code> table is missing. In Supabase → SQL Editor, run{" "}
          <code>supabase/migration-resources-gallery.sql</code>, then refresh this page.
        </p>
      ) : null}

      {result.error && !tableMissing ? (
        <p className="admin-error">Could not load gallery: {result.error.message}</p>
      ) : null}

      <ul className="admin-list">
        {rows.map((row) => (
          <li key={row.id}>
            <Link href={`/admin/gallery/${row.id}`}>{row.caption || row.alt || "Untitled photo"}</Link>
            <span>{row.published ? "Published" : "Draft"}</span>
            <Link className="admin-edit" href={`/admin/gallery/${row.id}`}>Edit</Link>
            <DeleteRow id={row.id} action={deleteActions.gallery} />
          </li>
        ))}
      </ul>

      {!tableMissing && rows.length === 0 ? (
        <div className="admin-empty">
          <p>
            The gallery table is empty. The public site still shows built-in photos.
            Import them here so you can edit captions, reorder, or delete.
          </p>
          <form action={importSeedGallery}>
            <button className="btn btn-accent" type="submit">
              Import built-in gallery photos
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
