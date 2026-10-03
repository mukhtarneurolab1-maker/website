import type { Metadata } from "next";
import { getResources } from "@/lib/content";

export const metadata: Metadata = { title: "Resources" };

export const revalidate = 60;

export default async function ResourcesPage() {
  const items = await getResources();

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="kicker">Resources</p>
          <h1>Data, tools and mentorship</h1>
          <p className="lead">
            Open research resources from the lab, plus mentorship and outreach initiatives.
          </p>
        </div>
      </section>

      <section className="page-section">
        <div className="wrap">
          <div className="resource-list">
            {items.map((item) => (
              <article className="resource-card" key={item.id}>
                <h2>{item.title}</h2>
                {item.summary ? <p className="resource-summary">{item.summary}</p> : null}
                {item.body ? <p className="resource-body">{item.body}</p> : null}
                {item.citation ? <p className="resource-citation">{item.citation}</p> : null}
                {item.url ? (
                  <p className="resource-link">
                    <a href={item.url} target="_blank" rel="noopener">
                      {item.link_label || "Open resource"} →
                    </a>
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
