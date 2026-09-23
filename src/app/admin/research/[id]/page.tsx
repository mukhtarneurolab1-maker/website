import { notFound } from "next/navigation";
import { ResearchForm } from "../../forms";
import { getServerSupabase } from "@/lib/supabase/server";
import type { ResearchItem } from "@/lib/types";

export default async function EditResearch({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await getServerSupabase();
  const { data } = supabase
    ? await supabase.from("research_items").select("*").eq("id", id).maybeSingle()
    : { data: null };
  if (!data) notFound();
  return (
    <div className="admin-page">
      <h1>Edit research</h1>
      <ResearchForm item={data as ResearchItem} />
    </div>
  );
}
