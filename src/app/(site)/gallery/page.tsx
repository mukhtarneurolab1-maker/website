import type { Metadata } from "next";
import { getGallery } from "@/lib/content";

export const metadata: Metadata = {
  title: "Gallery",
};

export default async function GalleryPage() {
  const items = await getGallery();

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="kicker">Gallery</p>
          <h1>Moments from the lab</h1>
          <p className="lead">
            The Mukhtar Lab team at work, collaboration, culture and discovery in the laboratory.
          </p>
        </div>
      </section>

      <section className="page-section">
        <div className="wrap">
          {items.length === 0 ? (
            <p className="gallery-note">Gallery photos will appear here once they are published.</p>
          ) : (
            <div className="gallery-grid">
              {items.map((item) => (
                <figure className="gallery-item" key={item.id}>
                  <img src={item.image_url} alt={item.alt || item.caption} loading="lazy" />
                  {item.caption ? <figcaption>{item.caption}</figcaption> : null}
                </figure>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
