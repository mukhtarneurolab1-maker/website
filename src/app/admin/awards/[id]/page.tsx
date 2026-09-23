import { notFound } from "next/navigation";
import { AwardForm } from "../../forms";
import { getServerSupabase } from "@/lib/supabase/server";
import type { Award } from "@/lib/types";

export default async function EditAward({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await getServerSupabase();
  const { data } = supabase
    ? await supabase.from("awards").select("*").eq("id", id).maybeSingle()
    : { data: null };
  if (!data) notFound();
  return (
    <div className="admin-page">
      <h1>Edit award</h1>
      <AwardForm item={data as Award} />
    </div>
  );
}
