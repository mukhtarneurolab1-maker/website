import { ResourceForm } from "../../forms";
import { getServerSupabase } from "@/lib/supabase/server";
import type { Resource } from "@/lib/types";

export default async function EditResource({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await getServerSupabase();
  const { data } = supabase
    ? await supabase.from("resources").select("*").eq("id", id).maybeSingle()
    : { data: null };

  return (
    <div className="admin-page">
      <h1>Edit resource</h1>
      <ResourceForm item={(data as Resource) || { id }} />
    </div>
  );
}
