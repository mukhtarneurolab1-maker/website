import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team",
};

export default function Page() {
  return (
    <>
<section className="page-hero"><div className="wrap"><p className="kicker">The Team</p><h1>Meet the Mukhtar Lab</h1><p className="lead">Researchers, scholars and the occasional four-legged quality-control officer, all working toward understanding the human brain.</p></div></section>

    <section className="page-section">
      <div className="wrap">
        <div className="section-header"><p className="kicker">Principal Investigator</p><h2>Dr. Tanzila Mukhtar</h2></div>
        <div className="team-member-feature">
          <div className="member-avatar member-avatar--lg">
            <img src="/images/tanzila-mukhtar-avatar.jpg" width="220" height="220" alt="Dr. Tanzila Mukhtar" />
          </div>
          <div className="prose"><p className="member-role">Ramanujan Fellow, CIRI, University of Kashmir · Research Associate, UCSF</p><p>Dr. Tanzila Mukhtar is a neurobiologist whose research focuses on understanding how the human brain develops and how disruptions in developmental programs contribute to neurological and psychiatric disease. She leads the Mukhtar Laboratory at CIRI, University of Kashmir.</p><p><a href="/about" className="text-link">Read full biography →</a></p></div>
        </div>
      </div>
    </section>

    <section className="page-section alt">
      <div className="wrap">
        <div className="section-header"><p className="kicker">Lab Members</p><h2>The research team</h2></div>
        <div className="team-grid">
          <article className="team-card"><div className="member-avatar"><img src="/images/team/mehwish-choudhary.jpg" width="160" height="160" alt="Ms. Mehwish Ali Choudhary" /></div><h3>Ms. Mehwish Ali Choudhary</h3><p className="member-role">Junior Research Fellow</p><p className="member-affiliation">Mukhtar Lab, CIRI, University of Kashmir · MSc Biosciences & Bioengineering, IIT Roorkee · Joined July 2026</p><div className="member-bio"><p>My research focuses on understanding the role of extracellular matrix (ECM) biology in cortical development and diseases, essentially, how the brain builds itself during early development, and what goes wrong in that process.</p><p>I'm a quiet observer at heart, so in my free time I love exploring new places and capturing random moments along the way. I have a soft spot for books, particularly admire Khaled Hosseini's work.</p></div></article>

          <article className="team-card"><div className="member-avatar"><img src="/images/team/aqsa-ellahi.jpg" width="160" height="160" alt="Ms. Aqsa Ellahi" /></div><h3>Ms. Aqsa Ellahi</h3><p className="member-role">Researcher</p><p className="member-affiliation">Mukhtar Lab, CIRI, University of Kashmir · Biotechnology Postgraduate, University of Kashmir</p><div className="member-bio"><p>A molecular and cellular neuroscience researcher with a fascination for understanding how genes, proteins, and cells work. My journey has taken me from CRISPR/Cas9 genome editing in Drosophila S2 cells to investigating tau uptake and aggregation at the Centre for Brain Research, IISc.</p><p>Outside the lab, I'm a photography and travel enthusiast. In short, I love science, stories, photographs, new places, good people, and asking questions.</p></div></article>

          <article className="team-card"><div className="member-avatar"><img src="/images/team/aanisa-mohammad.jpg" width="160" height="160" alt="Ms. Aanisa Mohammad" /></div><h3>Ms. Aanisa Mohammad</h3><p className="member-role">Research Intern</p><p className="member-affiliation">Mukhtar Lab, CIRI, University of Kashmir · PG Biochemistry, Cluster University, Srinagar · Joined July 2026</p><div className="member-bio"><p>I am exploring the fascinating world of RNA-binding proteins and their role in brain development. I am particularly fascinated by post-transcriptional regulation of RNA and how changes in RNA processing can influence the decisions that cells make during development.</p><p>Beyond academics, I love travelling, trekking, and hiking. I am excited to continue learning and growing as a young scientist!</p></div></article>

          <article className="team-card">
            <div className="member-avatar"><img src="/images/team/saba-feroz.jpg" width="160" height="160" alt="Ms. Saba Feroz" /></div>
            <h3>Ms. Saba Feroz</h3>
            <p className="member-role">Researcher</p>
            <p className="member-affiliation">Mukhtar Lab, CIRI, University of Kashmir · MSc Clinical Biochemistry, University of Kashmir</p>
            <div className="member-bio">
              <p>I hold an MSc in Clinical Biochemistry from the University of Kashmir, with research experience spanning <em>C. elegans</em>, mouse cerebellum, and CAR-T cell engineering, including a Graduate Trainee stint at NCBS-TIFR.</p>
              <p>Beyond the bench, I care deeply about science communication and outreach. Off the clock, I cook, garden, collect books, and am thoroughly devoted to the local feline community.</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section className="page-section">
      <div className="wrap">
        <div className="section-header"><p className="kicker">The Furry Team</p><h2>Unofficial lab members</h2></div>
        <div className="team-grid team-grid--furry">
          <article className="team-card team-card--furry"><div className="member-avatar"><img src="/images/team/renee-turkee.jpg" width="200" height="200" alt="Renee Turkee" /></div><h3>Renee Turkee</h3><p className="member-role">Red Fox Labrador · Chief Enthusiasm Officer</p><div className="member-bio"><p>The enthusiastic, optimistic and highly motivated member of the team. Expertise in grant writing, laboratory supervision, food science and recreational ball research.</p><p>Three major priorities: food, my ball, and the park. I take all three extremely seriously.</p><p className="furry-motto"><em>Work hard, stay curious, collaborate generously, and never say no to food.</em></p></div></article>

          <article className="team-card team-card--furry"><div className="member-avatar"><img src="/images/team/tyson-turkee.jpg" width="200" height="200" alt="Tyson Turkee" /></div><h3>Tyson Turkee</h3><p className="member-role">German Shepherd · Quality Control Officer & Skeptic-in-Chief</p><div className="member-bio"><p>Naturally suspicious of almost everything. Protocol: Step 1: Sniff. Step 2: Investigate. Step 3: Verify. Step 4: Validate. Step 5: Carefully accept the treat. Step 6: Repeat if necessary.</p><p className="furry-motto"><em>Science requires curiosity. Science also requires skepticism. I provide both, mostly the skepticism.</em></p></div></article>
        </div>

        <div className="furry-together"><h3>Together, They Make the Perfect Team</h3><p>Renee brings the enthusiasm. Tyson brings the skepticism.<br />Renee asks: "Can we do it?" Tyson asks: "But have we validated it?"</p><p><strong>Curiosity + Critical Thinking = Discovery</strong></p></div>
      </div>
    </section>
    </>
  );
}
