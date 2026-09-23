import type { Metadata } from "next";
import { getAwards } from "@/lib/content";

export const metadata: Metadata = { title: "Awards" };

export default async function AwardsPage() {
  const awards = await getAwards();
  const fellowships = awards.filter((item) => item.category === "fellowship").sort((a, b) => a.sort_order - b.sort_order);
  const recognition = awards.filter((item) => item.category !== "fellowship").sort((a, b) => a.sort_order - b.sort_order);

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="kicker">Awards & Achievements</p>
          <h1>Fellowships, awards and service</h1>
          <p className="lead">International recognition spanning India, Switzerland, the United Kingdom and the United States.</p>
        </div>
      </section>
      <section className="page-section">
        <div className="wrap">
          <div className="section-header"><p className="kicker">Major fellowships & research awards</p><h2>Research funding & fellowships</h2></div>
          <div className="award-grid">
            {fellowships.map((item) => (
              <article key={item.id}>
                {item.year_label ? <p className="award-year">{item.year_label}</p> : null}
                <h3>{item.title}</h3>
                {item.detail ? <p>{item.detail}</p> : null}
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="page-section alt">
        <div className="wrap">
          <div className="section-header"><p className="kicker">Other recognition & memberships</p><h2>Service, leadership & affiliations</h2></div>
          <ul className="recognition-list">
            {recognition.map((item) => (
              <li key={item.id}>
                <h3>{item.title}</h3>
                <p>{item.detail || item.year_label}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
