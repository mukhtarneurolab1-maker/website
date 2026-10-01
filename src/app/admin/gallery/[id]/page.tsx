import { GalleryForm } from "../../forms";
import { getServerSupabase } from "@/lib/supabase/server";
import type { GalleryItem } from "@/lib/types";

export default async function EditGalleryItem({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await getServerSupabase();
  const { data } = supabase
    ? await supabase.from("gallery_items").select("*").eq("id", id).maybeSingle()
    : { data: null };

  return (
    <div className="admin-page">
      <h1>Edit gallery photo</h1>
      <GalleryForm item={(data as GalleryItem) || { id }} />
    </div>
  );
}
