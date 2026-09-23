"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSupabase } from "@/lib/supabase/server";

async function db() {
  const supabase = await getServerSupabase();
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data } = await supabase.auth.getUser();
  if (!data.user) throw new Error("Sign in required.");
  return supabase;
}

function text(form: FormData, key: string) {
  return String(form.get(key) ?? "").trim();
}

function flag(form: FormData, key: string) {
  return form.get(key) === "on" || form.get(key) === "true";
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

function refresh(paths: string[]) {
  for (const path of paths) revalidatePath(path);
}

export async function saveResearch(formData: FormData) {
  const supabase = await db();
  const id = text(formData, "id");
  const title = text(formData, "title");
  const row = {
    slug: text(formData, "slug") || slugify(title),
    title,
    card_title: text(formData, "card_title") || title,
    card_summary: text(formData, "card_summary"),
    subtitle: text(formData, "subtitle"),
    question: text(formData, "question"),
    body: text(formData, "body"),
    extra_line: text(formData, "extra_line"),
    image_url: text(formData, "image_url") || null,
    image_caption: text(formData, "image_caption"),
    accent: text(formData, "accent") || "cyan",
    sort_order: Number(text(formData, "sort_order") || "1"),
    published: flag(formData, "published"),
  };

  const query = id
    ? supabase.from("research_items").update(row).eq("id", id)
    : supabase.from("research_items").insert(row);
  const { error } = await query;
  if (error) throw new Error(error.message);
  refresh(["/research", "/"]);
  redirect("/admin/research");
}

export async function deleteResearch(formData: FormData) {
  const supabase = await db();
  const { error } = await supabase.from("research_items").delete().eq("id", text(formData, "id"));
  if (error) throw new Error(error.message);
  refresh(["/research", "/"]);
  redirect("/admin/research");
}

export async function savePublication(formData: FormData) {
  const supabase = await db();
  const id = text(formData, "id");
  const row = {
    authors: text(formData, "authors"),
    title: text(formData, "title"),
    venue: text(formData, "venue"),
    year_label: text(formData, "year_label"),
    note: text(formData, "note"),
    doi_url: text(formData, "doi_url") || null,
    image_url: text(formData, "image_url") || null,
    category: text(formData, "category") || "first",
    featured: flag(formData, "featured"),
    sort_order: Number(text(formData, "sort_order") || "1"),
    published: flag(formData, "published"),
  };
  const query = id
    ? supabase.from("publications").update(row).eq("id", id)
    : supabase.from("publications").insert(row);
  const { error } = await query;
  if (error) throw new Error(error.message);
  refresh(["/publications", "/"]);
  redirect("/admin/publications");
}

export async function deletePublication(formData: FormData) {
  const supabase = await db();
  const { error } = await supabase.from("publications").delete().eq("id", text(formData, "id"));
  if (error) throw new Error(error.message);
  refresh(["/publications", "/"]);
  redirect("/admin/publications");
}

export async function saveAward(formData: FormData) {
  const supabase = await db();
  const id = text(formData, "id");
  const row = {
    year_label: text(formData, "year_label"),
    title: text(formData, "title"),
    detail: text(formData, "detail"),
    category: text(formData, "category") || "fellowship",
    sort_order: Number(text(formData, "sort_order") || "1"),
    published: flag(formData, "published"),
  };
  const query = id
    ? supabase.from("awards").update(row).eq("id", id)
    : supabase.from("awards").insert(row);
  const { error } = await query;
  if (error) throw new Error(error.message);
  refresh(["/awards"]);
  redirect("/admin/awards");
}

export async function deleteAward(formData: FormData) {
  const supabase = await db();
  const { error } = await supabase.from("awards").delete().eq("id", text(formData, "id"));
  if (error) throw new Error(error.message);
  refresh(["/awards"]);
  redirect("/admin/awards");
}

export async function saveBlog(formData: FormData) {
  const supabase = await db();
  const id = text(formData, "id");
  const title = text(formData, "title");
  const row = {
    slug: text(formData, "slug") || slugify(title),
    title,
    excerpt: text(formData, "excerpt"),
    body: text(formData, "body"),
    cover_url: text(formData, "cover_url") || null,
    published: flag(formData, "published"),
    published_at: text(formData, "published_at") || new Date().toISOString().slice(0, 10),
  };
  const query = id
    ? supabase.from("blogs").update(row).eq("id", id)
    : supabase.from("blogs").insert(row);
  const { error } = await query;
  if (error) throw new Error(error.message);
  refresh(["/blog"]);
  redirect("/admin/blogs");
}

export async function deleteBlog(formData: FormData) {
  const supabase = await db();
  const { error } = await supabase.from("blogs").delete().eq("id", text(formData, "id"));
  if (error) throw new Error(error.message);
  refresh(["/blog"]);
  redirect("/admin/blogs");
}

export async function signOut() {
  const supabase = await getServerSupabase();
  if (supabase) await supabase.auth.signOut();
  redirect("/admin");
}
