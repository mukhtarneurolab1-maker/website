import { notFound } from "next/navigation";
import { PublicationForm } from "../../forms";
import { getServerSupabase } from "@/lib/supabase/server";
import type { Publication } from "@/lib/types";

export default async function EditPublication({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await getServerSupabase();
  const { data } = supabase
    ? await supabase.from("publications").select("*").eq("id", id).maybeSingle()
    : { data: null };
  if (!data) notFound();
  return (
    <div className="admin-page">
      <h1>Edit publication</h1>
      <PublicationForm item={data as Publication} />
    </div>
  );
}
