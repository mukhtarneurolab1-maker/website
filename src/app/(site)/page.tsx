import { HomeFeatured } from "@/components/HomeFeatured";
import { HomeResearch } from "@/components/HomeResearch";
import { LabParticles } from "@/components/LabParticles";

export default function HomePage() {
  return (
    <>
{/* 1. WHO */}
    <section className="hero lab-entry">
      <div className="hero-photo" aria-hidden="true">
        <img src="/images/lab/gfp-neurons.jpg" alt="" className="hero-photo-img" width="1600" height="1376" />
        <div className="hero-photo-tint"></div>
        <div className="hero-photo-vignette"></div>
      </div>
      <LabParticles />

      <div className="hero-stage">
        <div className="hero-content">
          <p className="hero-eyebrow">Mukhtar Laboratory · Human Neural Models</p>
          <h1>Dr. Tanzila Mukhtar</h1>
          <p className="hero-tagline">From molecules to minds, decoding human brain development and disease.</p>
          <p className="hero-roles">Ramanujan Fellow, CIRI, University of Kashmir · Research Associate, UCSF Neurosurgery</p>
          <div className="hero-actions">
            <a className="btn btn-accent" href="#research">Explore the Research</a>
            <a className="btn btn-outline-light" href="/about">About the Scientist</a>
          </div>
        </div>

        <div className="scope-eye" aria-hidden="true">
          <div className="scope-eye-ring"></div>
          <div className="scope-eye-glass">
            <img src="/images/lab/neuron-confocal.jpg" alt="" />
          </div>
          <div className="scope-hud">
            <span>Confocal</span>
            <span>40×</span>
            <span className="scope-live">● Live field</span>
          </div>
        </div>
      </div>
    </section>

    {/* 2. ABOUT THE SCIENTIST */}
    <section className="intro" id="about-lab">
      <div className="wrap">
        <div className="section-header">
          <p className="kicker">01 · The Scientist</p>
          <h2>A neurobiologist building human models of the human brain</h2>
          <p className="section-lead">Clear focus: how the brain develops, and how those programs fail in disease.</p>
        </div>

        <div className="intro-grid">
          <div className="intro-visual">
            <div className="scope-frame scope-frame--photo">
              <img src="/images/tanzila-mukhtar.jpg" alt="Dr. Tanzila Mukhtar" className="scope-photo" width="675" height="1200" style={{aspectRatio: "4 / 5", objectPosition: "center top"}} />
              <p className="scope-caption">Principal Investigator · Mukhtar Laboratory</p>
            </div>
          </div>
          <div className="intro-text">
            <p>Dr. Tanzila Mukhtar investigates human brain development at the molecular, cellular and circuit levels, and how these programs are rewritten in neurodevelopmental and neuropsychiatric disease.</p>
            <p>Her laboratory integrates patient-derived iPSCs, cerebral organoids, single-cell and spatial genomics, and RNA biology to ask questions that animal models alone cannot fully answer.</p>
            <div className="intro-chips">
              <span>iPSC organoids</span>
              <span>RNA isoforms</span>
              <span>Single-cell atlases</span>
              <span>Precision psychiatry</span>
            </div>
            <a href="/about" className="text-link">Full biography, education & experience →</a>
          </div>
        </div>

        <div className="intro-stats">
          <div className="stat-card"><span className="stat-num">14</span><span className="stat-desc">Peer-reviewed papers</span></div>
          <div className="stat-card"><span className="stat-num">4</span><span className="stat-desc">Countries of training & research</span></div>
          <div className="stat-card accent"><span className="stat-num">2025</span><span className="stat-desc">Ramanujan Fellow</span></div>
          <div className="stat-card accent"><span className="stat-num">2026</span><span className="stat-desc">PM Early Career Grant</span></div>
        </div>
      </div>
    </section>

    {/* 3. HOW THE LAB WORKS */}
    <section className="pipeline" id="approach" aria-label="Research approach">
      <div className="wrap">
        <div className="section-header" style={{marginBottom: "1.75rem"}}>
          <p className="kicker">02 · Approach</p>
          <h2 style={{fontSize: "clamp(1.6rem, 3vw, 2.1rem)"}}>From human cells to disease insight</h2>
        </div>
        <div className="pipeline-track">
          <div className="pipe-step"><span className="pipe-num">01</span><strong>Human iPSCs</strong><em>Patient-derived models</em></div>
          <div className="pipe-arrow" aria-hidden="true"></div>
          <div className="pipe-step"><span className="pipe-num">02</span><strong>Organoids</strong><em>Cortical · Interneuron · Vascular</em></div>
          <div className="pipe-arrow" aria-hidden="true"></div>
          <div className="pipe-step"><span className="pipe-num">03</span><strong>Single-cell</strong><em>Multi-omics · Spatial maps</em></div>
          <div className="pipe-arrow" aria-hidden="true"></div>
          <div className="pipe-step"><span className="pipe-num">04</span><strong>Disease</strong><em>Mechanisms · Precision psychiatry</em></div>
        </div>
      </div>
    </section>

    {/* 4. WHAT SHE STUDIES */}
    <section className="research-home" id="research">
      <div className="wrap">
        <div className="section-header">
          <p className="kicker">03 · Research Themes</p>
          <h2>Six questions, one coherent program</h2>
          <p className="section-lead">Ordered from fundamental development → tools & models → disease → translation.</p>
        </div>
        <HomeResearch />
        <p style={{marginTop: "1.75rem"}}><a href="/research" className="text-link">Read full research descriptions →</a></p>
      </div>
    </section>

    {/* 5. EVIDENCE */}
    <section className="featured-pub" id="publications">
      <div className="wrap">
        <div className="section-header">
          <p className="kicker">04 · Selected Work</p>
          <h2>Published science that defines the questions</h2>
          <p className="section-lead">Flagship paper first, then the journals where the broader program appears.</p>
        </div>
        <HomeFeatured />
      </div>
    </section>

    {/* 6. LAB & RECOGNITION */}
    <section className="highlights" id="explore">
      <div className="wrap">
        <div className="section-header">
          <p className="kicker">05 · Lab & Recognition</p>
          <h2>Where to go next</h2>
          <p className="section-lead">Awards, people and the full publication record, in one place.</p>
        </div>
        <div className="hl-grid">
          <a href="/awards" className="hl-card">
            <p className="kicker">Awards</p>
            <h3>Fellowships & honors</h3>
            <p>Ramanujan Fellow, PM Early Career Grant, Chevening Scholar, Goldman Sachs Global Leadership.</p>
            <span className="hl-arrow">→</span>
          </a>
          <a href="/team" className="hl-card">
            <p className="kicker">Team</p>
            <h3>Meet the Mukhtar Lab</h3>
            <p>Fellows, researchers, interns, and the lab’s unofficial furry members.</p>
            <span className="hl-arrow">→</span>
          </a>
          <a href="/publications" className="hl-card">
            <p className="kicker">Publications</p>
            <h3>Full paper list</h3>
            <p>First-author, collaborative studies and book chapter, ordered by category.</p>
            <span className="hl-arrow">→</span>
          </a>
        </div>
      </div>
    </section>

    {/* 7. VISION */}
    <section className="quote-banner quote-banner--photo">
      <div className="quote-field" aria-hidden="true">
        <img src="/images/lab/gfp-neurons.jpg" alt="" />
      </div>
      <div className="wrap">
        <blockquote>
          <p>Build better human models, ask deeper biological questions, and translate discovery into meaningful impact.</p>
          <cite>Dr. Tanzila Mukhtar</cite>
        </blockquote>
      </div>
    </section>

    {/* 8. CONNECT */}
    <section className="connect" id="connect">
      <div className="wrap">
        <div className="section-header">
          <p className="kicker">06 · Connect</p>
          <h2>Continue the conversation</h2>
        </div>
        <div className="connect-grid">
          <div className="connect-copy">
            <p>Open to researchers, students, clinicians and institutions interested in human brain development, neuroscience, mentorship and scientific outreach.</p>
            <a href="/contact" className="btn btn-accent">Contact Page</a>
          </div>
          <div className="connect-links">
            <div className="cl-group">
              <p className="cl-label">Email</p>
              <a href="mailto:tanzila.mukhtar@ucsf.edu">tanzila.mukhtar@ucsf.edu</a>
              <a href="mailto:tanzila.mukhtar@uok.edu.in">tanzila.mukhtar@uok.edu.in</a>
            </div>
            <div className="cl-group">
              <p className="cl-label">Profiles</p>
              <a href="https://orcid.org/0000-0001-9646-8940" target="_blank" rel="noopener">ORCID</a>
              <a href="https://scholar.google.com/citations?user=ioivinwAAAAJ&hl=en" target="_blank" rel="noopener">Google Scholar</a>
              <a href="https://www.linkedin.com/in/tanzila-mukhtar-phd-42261733/" target="_blank" rel="noopener">LinkedIn</a>
              <a href="https://x.com/tmturkee" target="_blank" rel="noopener">X / Twitter</a>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
