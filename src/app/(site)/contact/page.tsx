import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Connect with Dr. Tanzila Mukhtar and the Mukhtar Laboratory.",
};

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="kicker">Contact</p>
          <h1>Let&apos;s connect</h1>
          <p className="lead">
            I am always interested in connecting with researchers, students, clinicians,
            institutions, patient communities and organizations interested in human brain
            development, stem cell biology, neuroscience, neuropsychiatric disease, mentorship
            and scientific outreach.
          </p>
        </div>
      </section>

      <section className="page-section">
        <div className="wrap">
          <div className="contact-grid">
            <div className="contact-info">
              <div className="contact-block">
                <p className="cl-label">Email</p>
                <a href={`mailto:${site.emailPrimary}`} className="contact-link">
                  {site.emailPrimary}
                </a>
                <a href={`mailto:${site.emailSecondary}`} className="contact-link">
                  {site.emailSecondary}
                </a>
              </div>
              <div className="contact-block">
                <p className="cl-label">Academic Profiles</p>
                <a
                  href="https://orcid.org/0000-0001-9646-8940"
                  target="_blank"
                  rel="noopener"
                  className="contact-link"
                >
                  ORCID: 0000-0001-9646-8940
                </a>
                <a
                  href="https://scholar.google.com/citations?user=ioivinwAAAAJ&hl=en"
                  target="_blank"
                  rel="noopener"
                  className="contact-link"
                >
                  Google Scholar
                </a>
              </div>
              <div className="contact-block">
                <p className="cl-label">Social</p>
                <a
                  href="https://www.linkedin.com/in/tanzila-mukhtar-phd-42261733/"
                  target="_blank"
                  rel="noopener"
                  className="contact-link"
                >
                  LinkedIn
                </a>
                <a
                  href="https://x.com/tmturkee"
                  target="_blank"
                  rel="noopener"
                  className="contact-link"
                >
                  X / Twitter · @tmturkee
                </a>
              </div>
              <div className="contact-block">
                <p className="cl-label">Affiliations</p>
                <p>University of California, San Francisco, USA</p>
                <p>
                  Centre for Interdisciplinary Research and Innovations (CIRI), University of
                  Kashmir, India
                </p>
              </div>
            </div>

            <div className="contact-form-wrap">
              <h2>Send a message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
