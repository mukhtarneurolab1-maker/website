import Image from "next/image";
import type { Metadata } from "next";
import { getPublications, publicationsByCategory } from "@/lib/content";
import type { Publication } from "@/lib/types";
import { PHONE_3X } from "@/lib/image-sizes";

export const metadata: Metadata = { title: "Publications" };

function PubList({ items, chapter = false }: { items: Publication[]; chapter?: boolean }) {
  return (
    <ol className="pub-list">
      {items.map((item) => {
        const customImage =
          item.image_url && !item.image_url.startsWith("/images/lab/") ? item.image_url : null;
        return (
          <li className="pub-item" key={item.id}>
            <div className={`pub-thumb${customImage ? " pub-thumb--photo" : ""}`} aria-hidden="true">
              {customImage ? (
                <Image
                  src={customImage}
                  alt=""
                  width={280}
                  height={220}
                  sizes={`${PHONE_3X}, (max-width: 720px) 100vw, 140px`}
                  unoptimized={customImage.endsWith(".svg")}
                />
              ) : (
                <svg className="pub-thumb-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              )}
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
        );
      })}
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
