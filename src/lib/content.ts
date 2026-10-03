import { getServerSupabase } from "@/lib/supabase/server";
import { seedAwards, seedGallery, seedPublications, seedResearch, seedResources } from "@/lib/seed";
import type { Award, GalleryItem, Publication, ResearchItem, Resource } from "@/lib/types";

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

const researchImages: Record<string, { url: string; caption: string }> = {
  "human-brain-development": { url: "/images/lab/picture-9.jpg", caption: "Radial progenitors and cortical neurons" },
  "rna-biology": { url: "/images/lab/primary-cells.jpg", caption: "Primary cells in culture" },
  organoids: { url: "/images/lab/organoid-week-10.jpg", caption: "Week 10 cortical organoid" },
  "single-cell": { url: "/images/lab/picture-6.jpg", caption: "Disease Organoid" },
  disease: { url: "/images/lab/picture-10.jpg", caption: "Astrocytes" },
  "precision-psychiatry": { url: "/images/lab/fused-organoids.jpg", caption: "Fused organoids" },
};

/** Prefer current lab image paths so admin previews are not broken after stock images were removed. */
export function withCurrentResearchImage<T extends { slug?: string; image_url?: string | null; image_caption?: string }>(
  row: T,
): T {
  const image = row.slug ? researchImages[row.slug] : undefined;
  if (!image) return row;
  return { ...row, image_url: image.url, image_caption: image.caption };
}

export function withCurrentPublicationImage<T extends { title?: string; image_url?: string | null }>(row: T): T {
  const seeded = row.title ? seedPublications.find((item) => item.title === row.title) : undefined;
  if (!seeded?.image_url) return row;
  return { ...row, image_url: seeded.image_url };
}

export async function getResearch(): Promise<ResearchItem[]> {
  const rows = await publishedOrSeed<ResearchItem>("research_items", seedResearch, "sort_order");
  return [...rows]
    .map((row) => withCurrentResearchImage(row))
    .sort((a, b) => a.sort_order - b.sort_order);
}

export async function getPublications(): Promise<Publication[]> {
  const rows = await publishedOrSeed<Publication>("publications", seedPublications, "sort_order");
  if (rows === seedPublications) return rows;

  const byTitle = new Set(rows.map((row) => row.title));
  const withLinks = rows.map((row) => {
    const seeded = seedPublications.find((item) => item.title === row.title);
    if (!seeded) return row;
    return {
      ...row,
      image_url: seeded.image_url,
      doi_url: row.doi_url || seeded.doi_url,
    };
  });
  const added = seedPublications.filter((item) => !byTitle.has(item.title));
  return [...withLinks, ...added];
}

export async function getAwards(): Promise<Award[]> {
  const rows = await publishedOrSeed<Award>("awards", seedAwards, "sort_order");
  return rows;
}

export async function getResources(): Promise<Resource[]> {
  return publishedOrSeed<Resource>("resources", seedResources, "sort_order");
}

export async function getGallery(): Promise<GalleryItem[]> {
  return publishedOrSeed<GalleryItem>("gallery_items", seedGallery, "sort_order");
}

export function publicationsByCategory(items: Publication[], category: string) {
  return items
    .filter((item) => item.category === category)
    .sort((a, b) => a.sort_order - b.sort_order);
}
