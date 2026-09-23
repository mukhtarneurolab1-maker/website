import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
};

export default function Page() {
  return (
    <>
<section className="page-hero"><div className="wrap"><p className="kicker">Gallery</p><h1>Moments from the lab</h1><p className="lead">The Mukhtar Lab team at work, collaboration, culture and discovery in the laboratory.</p></div></section>

    <section className="page-section">
      <div className="wrap">
        <div className="gallery-grid">
          <figure className="gallery-item">
            <img src="/images/gallery/lab-team.jpg" width="959" height="1280" alt="Mukhtar Lab team members together in the laboratory" loading="lazy" />
            <figcaption>The team · Lab members together</figcaption>
          </figure>
          <figure className="gallery-item">
            <img src="/images/gallery/lab-duo.jpg" width="768" height="1024" alt="Two Mukhtar Lab members smiling in the laboratory, one giving a thumbs up" loading="lazy" />
            <figcaption>Lab mates · In the workspace</figcaption>
          </figure>
          <figure className="gallery-item">
            <img src="/images/gallery/lab-work-bsc.jpg" width="1600" height="900" alt="Two researchers collaborating at a biosafety cabinet" loading="lazy" />
            <figcaption>Collaboration · Biosafety cabinet</figcaption>
          </figure>
          <figure className="gallery-item">
            <img src="/images/gallery/lab-culture-work.jpg" width="1600" height="900" alt="Researchers performing cell culture work at a laminar flow hood" loading="lazy" />
            <figcaption>Cell culture · Sterile technique</figcaption>
          </figure>
          <figure className="gallery-item">
            <img src="/images/gallery/lab-hood-collab.jpg" width="1024" height="576" alt="Two researchers collaborating at a laminar flow hood with culture dishes and pipettes" loading="lazy" />
            <figcaption>At the hood · Mentorship in action</figcaption>
          </figure>
          <figure className="gallery-item">
            <img src="/images/gallery/lab-team-three.jpg" width="767" height="1024" alt="Three Mukhtar Lab members posing together in the laboratory" loading="lazy" />
            <figcaption>Team spirit · Together in the lab</figcaption>
          </figure>
          <figure className="gallery-item">
            <img src="/images/gallery/lab-bench-work.jpg" width="1600" height="900" alt="Researcher working at a sterile laboratory workstation with culture dishes and pipettes" loading="lazy" />
            <figcaption>At the bench · Culture and preparation</figcaption>
          </figure>
        </div>
      </div>
    </section>
    </>
  );
}
