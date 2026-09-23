import { getServerSupabase } from "@/lib/supabase/server";
import { seedAwards, seedBlogs, seedPublications, seedResearch } from "@/lib/seed";
import type { Award, BlogPost, Publication, ResearchItem } from "@/lib/types";

async function publishedOrSeed<T>(table: string, seed: T[], order: string): Promise<T[]> {
  const supabase = await getServerSupabase();
  if (!supabase) return seed;

  const { data, error } = await supabase
    .from(table)
    .select("*")
    .eq("published", true)
    .order(order, { ascending: true });

  if (error || !data || data.length === 0) return seed;
  return data as T[];
}

export async function getResearch(): Promise<ResearchItem[]> {
  const rows = await publishedOrSeed<ResearchItem>("research_items", seedResearch, "sort_order");
  return [...rows].sort((a, b) => a.sort_order - b.sort_order);
}

export async function getPublications(): Promise<Publication[]> {
  const rows = await publishedOrSeed<Publication>("publications", seedPublications, "sort_order");
  return rows;
}

export async function getAwards(): Promise<Award[]> {
  const rows = await publishedOrSeed<Award>("awards", seedAwards, "sort_order");
  return rows;
}

export async function getBlogs(): Promise<BlogPost[]> {
  const supabase = await getServerSupabase();
  if (!supabase) return seedBlogs;
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });
  if (error || !data) return seedBlogs;
  return data as BlogPost[];
}

export async function getBlog(slug: string): Promise<BlogPost | null> {
  const posts = await getBlogs();
  return posts.find((post) => post.slug === slug) ?? null;
}

export function publicationsByCategory(items: Publication[], category: string) {
  return items
    .filter((item) => item.category === category)
    .sort((a, b) => a.sort_order - b.sort_order);
}
