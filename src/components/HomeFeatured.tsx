import { getPublications } from "@/lib/content";

export async function HomeFeatured() {
  const items = await getPublications();
  const featured = items.find((item) => item.featured) || items.find((item) => item.category === "first");
  const venues = Array.from(new Set(items.map((item) => item.venue).filter(Boolean))).slice(0, 6);

  if (!featured) return null;

  return (
    <div className="featured-inner">
      <div>
        <p className="kicker">Featured · {featured.year_label}</p>
        <h2>{featured.title}</h2>
        <p className="featured-meta">
          <em>{featured.venue}</em> · {featured.authors}
        </p>
        {featured.doi_url ? (
          <a href={featured.doi_url} className="btn btn-dark" target="_blank" rel="noopener">
            Read the paper
          </a>
        ) : null}
        <a href="/publications" className="text-link" style={{ marginLeft: "1.25rem" }}>
          All {items.length} publications →
        </a>
      </div>
      <div className="featured-side">
        <p className="featured-side-label">Also published in</p>
        <ul>
          {venues.map((venue) => (
            <li key={venue}>{venue}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
