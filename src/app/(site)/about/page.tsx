import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function Page() {
  return (
    <>
<section className="page-hero">
      <div className="wrap">
        <p className="kicker">About</p>
        <h1>Academic journey in clear order</h1>
        <p className="lead">Biography → education → experience → expertise.</p>
      </div>
    </section>

    <section className="page-section">
      <div className="wrap">
        <div className="section-header">
          <p className="kicker">Biography</p>
          <h2>Academic journey & research philosophy</h2>
        </div>
        <div className="about-bio">
          <figure className="portrait-frame">
            <img src="/images/tanzila-mukhtar.jpg" width="675" height="1200" alt="Portrait of Dr. Tanzila Mukhtar" />
            <figcaption className="portrait-caption">Dr. Tanzila Mukhtar · Principal Investigator</figcaption>
          </figure>
          <div className="prose">
          <p>Dr. Tanzila Mukhtar is a neurobiologist whose research focuses on understanding how the human brain develops and how disruptions in developmental programs contribute to neurological and psychiatric disease.</p>
          <p>Her scientific journey began with an interdisciplinary foundation in biotechnology, chemistry and botany in India, followed by a Master's degree in Stem Cell and Regenerative Medicine at the University of Sheffield, UK. She subsequently completed her PhD in Neurobiology at the University of Basel, Switzerland, where she studied molecular mechanisms governing neural development and cell fate. She later moved to the University of California, San Francisco, where her postdoctoral research focused on human cortical development and the remarkable cellular diversity of the developing human brain.</p>
          <p>Her research has increasingly focused on developing and applying human-relevant experimental systems to answer questions that cannot be fully addressed using conventional animal models. Her work integrates patient-derived iPSCs, cortical and interneuron organoids, vascular models, single-cell genomics, spatial transcriptomics and molecular approaches to RNA regulation.</p>
          <p>A central theme of her research is understanding how molecular programs are translated into cellular identity, developmental trajectories and ultimately neural circuit function. She is particularly interested in alternative RNA splicing and isoform diversity, radial glia biology, cortical neurogenesis, interneuron development and the molecular mechanisms underlying neurodevelopmental and psychiatric disorders.</p>
          <p>Her long-term vision is to build a Centre of Excellence in Human Neural Model Systems in India, bringing together iPSC technology, organoids, assembloids, single-cell and spatial genomics, and advanced computational approaches.</p>
          <p>Beyond research, Tanzila is deeply committed to mentorship, scientific outreach and building opportunities for young scientists. She has mentored students and trainees across career stages and has worked extensively in science communication and community engagement.</p>
          </div>
        </div>
      </div>
    </section>

    <section className="page-section alt">
      <div className="wrap">
        <div className="section-header">
          <p className="kicker">Education</p>
          <h2>Academic credentials</h2>
        </div>
        <div className="timeline">
          <article className="timeline-item"><div className="timeline-marker"></div><div className="timeline-content"><p className="timeline-date">Undergraduate</p><h3>BSc in Biotechnology, Chemistry & Botany</h3><p className="timeline-meta">Mount Carmel College, Bangalore University, India</p></div></article>
          <article className="timeline-item"><div className="timeline-marker"></div><div className="timeline-content"><p className="timeline-date">Master's</p><h3>MSc in Stem Cell & Regenerative Medicine</h3><p className="timeline-meta">University of Sheffield, UK</p></div></article>
          <article className="timeline-item"><div className="timeline-marker"></div><div className="timeline-content"><p className="timeline-date">Doctorate</p><h3>PhD in Neurobiology, Summa Cum Laude</h3><p className="timeline-meta">University of Basel, Switzerland</p></div></article>
          <article className="timeline-item"><div className="timeline-marker"></div><div className="timeline-content"><p className="timeline-date">Executive education</p><h3>Women's Leadership: Leading Teams</h3><p className="timeline-meta">Yale University, School of Management, USA</p></div></article>
        </div>
      </div>
    </section>

    <section className="page-section">
      <div className="wrap">
        <div className="section-header">
          <p className="kicker">Experience</p>
          <h2>Professional positions</h2>
        </div>
        <div className="timeline">
          <article className="timeline-item"><div className="timeline-marker"></div><div className="timeline-content"><p className="timeline-date">March 2026 – Present</p><h3>Research Associate</h3><p className="timeline-meta">Department of Neurosurgery, UCSF, USA</p><p>Research in human neural and neurovascular systems, including human brain development, organoid models and translational neuroscience.</p></div></article>
          <article className="timeline-item"><div className="timeline-marker"></div><div className="timeline-content"><p className="timeline-date">November 2025 – Present</p><h3>Ramanujan Fellow</h3><p className="timeline-meta">CIRI, University of Kashmir, India</p><p>Developing an independent research program focused on human neural model systems, neurodevelopmental and neuropsychiatric disorders, and advanced genomic approaches.</p></div></article>
          <article className="timeline-item"><div className="timeline-marker"></div><div className="timeline-content"><p className="timeline-date">September 2025 – November 2025</p><h3>Specialist</h3><p className="timeline-meta">Eli and Edythe Broad Center for Regeneration Medicine and Stem Cell Research, UCSF</p></div></article>
          <article className="timeline-item"><div className="timeline-marker"></div><div className="timeline-content"><p className="timeline-date">September 2019 – August 2025</p><h3>Postdoctoral Fellow</h3><p className="timeline-meta">Laboratory of Prof. Arnold Kriegstein, UCSF, USA</p><p>Research focused on human cortical development, neural stem cells, cortical organoids, single-cell genomics and molecular mechanisms regulating human neurodevelopment.</p></div></article>
          <article className="timeline-item"><div className="timeline-marker"></div><div className="timeline-content"><p className="timeline-date">December 2018 – August 2019</p><h3>Postdoctoral Fellow</h3><p className="timeline-meta">Laboratory of Prof. Verdon Taylor, University of Basel, Switzerland</p></div></article>
          <article className="timeline-item"><div className="timeline-marker"></div><div className="timeline-content"><p className="timeline-date">March 2013 – December 2018</p><h3>PhD Researcher</h3><p className="timeline-meta">Laboratory of Prof. Verdon Taylor, University of Basel, Switzerland</p></div></article>
        </div>
      </div>
    </section>

    <section className="page-section alt">
      <div className="wrap">
        <div className="section-header">
          <p className="kicker">Expertise</p>
          <h2>Technical skills & methodologies</h2>
        </div>
        <div className="skills-grid">
          <div className="skill-group"><h3>Human Neural Models & Stem Cell Biology</h3><ul><li>Human iPSC generation, culture and characterization</li><li>iPSC-derived cortical organoids</li><li>MGE/CGE-derived interneuron organoids</li><li>Vascular organoids</li><li>Cortical–interneuron assembloids</li><li>Neurovascular models and assembloids</li><li>Primary cell culture</li><li>Organotypic brain slice culture</li><li>Neural differentiation and cell-fate analysis</li></ul></div>
          <div className="skill-group"><h3>Molecular & Cellular Biology</h3><ul><li>Molecular cloning</li><li>Lentiviral transduction</li><li>Immunofluorescence and immunohistochemistry</li><li>RNAscope</li><li>Cell proliferation and differentiation assays</li><li>Cell migration and morphology</li><li>Confocal microscopy</li><li>Light-sheet microscopy</li><li>In utero electroporation</li></ul></div>
          <div className="skill-group"><h3>Genomics & Transcriptomics</h3><ul><li>Single-cell RNA sequencing</li><li>Single-nucleus RNA sequencing</li><li>Single-cell multi-omics</li><li>Spatial transcriptomics using 10X Xenium and MERFISH</li></ul></div>
        </div>
      </div>
    </section>
    </>
  );
}
