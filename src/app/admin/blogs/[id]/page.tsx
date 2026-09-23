import { notFound } from "next/navigation";
import { BlogForm } from "../../forms";
import { getServerSupabase } from "@/lib/supabase/server";
import type { BlogPost } from "@/lib/types";

export default async function EditBlog({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await getServerSupabase();
  const { data } = supabase
    ? await supabase.from("blogs").select("*").eq("id", id).maybeSingle()
    : { data: null };
  if (!data) notFound();
  return (
    <div className="admin-page">
      <h1>Edit blog</h1>
      <BlogForm item={data as BlogPost} />
    </div>
  );
}
