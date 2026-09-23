import type { Metadata } from "next";
import { getPublications, publicationsByCategory } from "@/lib/content";
import type { Publication } from "@/lib/types";

export const metadata: Metadata = { title: "Publications" };

function PubList({ items, chapter = false }: { items: Publication[]; chapter?: boolean }) {
  return (
    <ol className="pub-list">
      {items.map((item) => (
        <li className="pub-item" key={item.id}>
          <div className="pub-thumb" aria-hidden="true">
            {item.image_url ? <img src={item.image_url} alt="" /> : null}
          </div>
          <div className="pub-body">
            <p className="pub-authors">{item.authors}</p>
            <p className="pub-title">{item.title}</p>
            <p className="pub-meta">
              {chapter ? "In: " : null}
              <em>{item.venue}</em>
              {item.year_label ? `, ${item.year_label}` : ""}
              {item.note ? ` · ${item.note}` : ""}
              {item.doi_url ? (
                <>
                  {" "}
                  <a href={item.doi_url} target="_blank" rel="noopener">DOI</a>
                </>
              ) : null}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export default async function PublicationsPage() {
  const items = await getPublications();
  const first = publicationsByCategory(items, "first");
  const collaborative = publicationsByCategory(items, "collaborative");
  const chapters = publicationsByCategory(items, "chapter");

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="kicker">Publications</p>
          <h1>Complete publication record</h1>
          <p className="lead">Grouped by role, then newest first: first & co-first author, collaborative work, then book chapter.</p>
        </div>
      </section>
      <section className="page-section">
        <div className="wrap">
          <div className="section-header"><p className="kicker">First & co-first author</p><h2>Primary research</h2></div>
          <PubList items={first} />
        </div>
      </section>
      <section className="page-section alt">
        <div className="wrap">
          <div className="section-header"><p className="kicker">Selected collaborative publications</p><h2>Collaborative research</h2></div>
          <PubList items={collaborative} />
        </div>
      </section>
      <section className="page-section">
        <div className="wrap">
          <div className="section-header"><p className="kicker">Book Chapter</p><h2>Textbook contributions</h2></div>
          <PubList items={chapters} chapter />
        </div>
      </section>
    </>
  );
}
