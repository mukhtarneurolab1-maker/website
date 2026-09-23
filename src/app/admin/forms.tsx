import { ImageUpload } from "./ImageUpload";
import {
  deleteAward,
  deleteBlog,
  deletePublication,
  deleteResearch,
  saveAward,
  saveBlog,
  savePublication,
  saveResearch,
} from "./actions";
import type { Award, BlogPost, Publication, ResearchItem } from "@/lib/types";

function Published({ checked = true }: { checked?: boolean }) {
  return (
    <label className="admin-check">
      <input type="checkbox" name="published" defaultChecked={checked} />
      Published on the website
    </label>
  );
}

export function ResearchForm({ item }: { item?: Partial<ResearchItem> }) {
  return (
    <form className="admin-form" action={saveResearch}>
      {item?.id ? <input type="hidden" name="id" value={item.id} /> : null}
      <label>Title<input name="title" required defaultValue={item?.title || ""} /></label>
      <label>Slug<input name="slug" defaultValue={item?.slug || ""} placeholder="auto from title" /></label>
      <label>Card title<input name="card_title" defaultValue={item?.card_title || ""} /></label>
      <label>Card summary<input name="card_summary" defaultValue={item?.card_summary || ""} /></label>
      <label>Subtitle<input name="subtitle" defaultValue={item?.subtitle || ""} /></label>
      <label>Question<textarea name="question" rows={2} defaultValue={item?.question || ""} /></label>
      <label>Body<textarea name="body" rows={6} required defaultValue={item?.body || ""} /></label>
      <label>Extra line<textarea name="extra_line" rows={2} defaultValue={item?.extra_line || ""} /></label>
      <label>Image caption<input name="image_caption" defaultValue={item?.image_caption || ""} /></label>
      <ImageUpload name="image_url" label="Image" defaultValue={item?.image_url || ""} />
      <label>
        Accent
        <select name="accent" defaultValue={item?.accent || "cyan"}>
          <option value="cyan">Teal</option>
          <option value="magenta">Magenta</option>
          <option value="amber">Amber</option>
        </select>
      </label>
      <label>Order<input name="sort_order" type="number" defaultValue={item?.sort_order ?? 1} /></label>
      <Published checked={item?.published !== false} />
      <button className="btn btn-accent" type="submit">Save research</button>
    </form>
  );
}

export function PublicationForm({ item }: { item?: Partial<Publication> }) {
  return (
    <form className="admin-form" action={savePublication}>
      {item?.id ? <input type="hidden" name="id" value={item.id} /> : null}
      <label>Title<textarea name="title" rows={2} required defaultValue={item?.title || ""} /></label>
      <label>Authors<textarea name="authors" rows={2} defaultValue={item?.authors || ""} /></label>
      <label>Journal / venue<input name="venue" defaultValue={item?.venue || ""} /></label>
      <label>Year<input name="year_label" defaultValue={item?.year_label || ""} /></label>
      <label>Note<input name="note" defaultValue={item?.note || ""} placeholder="In revision, Book chapter" /></label>
      <label>DOI URL<input name="doi_url" defaultValue={item?.doi_url || ""} /></label>
      <ImageUpload name="image_url" label="Thumbnail" defaultValue={item?.image_url || ""} />
      <label>
        Category
        <select name="category" defaultValue={item?.category || "first"}>
          <option value="first">First & co-first author</option>
          <option value="collaborative">Collaborative</option>
          <option value="chapter">Book chapter</option>
        </select>
      </label>
      <label>Order<input name="sort_order" type="number" defaultValue={item?.sort_order ?? 1} /></label>
      <label className="admin-check">
        <input type="checkbox" name="featured" defaultChecked={Boolean(item?.featured)} />
        Feature on the homepage
      </label>
      <Published checked={item?.published !== false} />
      <button className="btn btn-accent" type="submit">Save publication</button>
    </form>
  );
}

export function AwardForm({ item }: { item?: Partial<Award> }) {
  return (
    <form className="admin-form" action={saveAward}>
      {item?.id ? <input type="hidden" name="id" value={item.id} /> : null}
      <label>Title<input name="title" required defaultValue={item?.title || ""} /></label>
      <label>Year<input name="year_label" defaultValue={item?.year_label || ""} /></label>
      <label>Detail<input name="detail" defaultValue={item?.detail || ""} /></label>
      <label>
        Category
        <select name="category" defaultValue={item?.category || "fellowship"}>
          <option value="fellowship">Fellowship / award</option>
          <option value="recognition">Recognition / membership</option>
        </select>
      </label>
      <label>Order<input name="sort_order" type="number" defaultValue={item?.sort_order ?? 1} /></label>
      <Published checked={item?.published !== false} />
      <button className="btn btn-accent" type="submit">Save award</button>
    </form>
  );
}

export function BlogForm({ item }: { item?: Partial<BlogPost> }) {
  return (
    <form className="admin-form" action={saveBlog}>
      {item?.id ? <input type="hidden" name="id" value={item.id} /> : null}
      <label>Title<input name="title" required defaultValue={item?.title || ""} /></label>
      <label>Slug<input name="slug" defaultValue={item?.slug || ""} placeholder="auto from title" /></label>
      <label>Excerpt<textarea name="excerpt" rows={2} defaultValue={item?.excerpt || ""} /></label>
      <label>Body<textarea name="body" rows={10} required defaultValue={item?.body || ""} /></label>
      <label>Date<input name="published_at" type="date" defaultValue={item?.published_at?.slice(0, 10) || ""} /></label>
      <ImageUpload name="cover_url" label="Cover image" defaultValue={item?.cover_url || ""} />
      <Published checked={Boolean(item?.published)} />
      <button className="btn btn-accent" type="submit">Save blog</button>
    </form>
  );
}

export function DeleteRow({
  id,
  action,
}: {
  id: string;
  action: (formData: FormData) => Promise<void>;
}) {
  return (
    <form action={action}>
      <input type="hidden" name="id" value={id} />
      <button className="admin-delete" type="submit">
        Delete
      </button>
    </form>
  );
}

export const deleteActions = {
  research: deleteResearch,
  publications: deletePublication,
  awards: deleteAward,
  blogs: deleteBlog,
};
