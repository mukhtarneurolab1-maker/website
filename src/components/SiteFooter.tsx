import Image from "next/image";
import { site } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <div>
          <div className="footer-brand">
            <Image
              className="footer-logo"
              src="/images/mukhtar-lab-mark.jpg"
              width={52}
              height={52}
              alt="Mukhtar Lab"
            />
            <div>
              <p className="footer-name">{site.name}</p>
              <p className="footer-tagline">{site.tagline}</p>
            </div>
          </div>
          <p>
            &copy; {year} Dr. Tanzila Mukhtar · Mukhtar Laboratory
          </p>
        </div>
        <p>CIRI, University of Kashmir · Department of Neurosurgery, UCSF</p>
      </div>
      <p className="image-credit">
        Microscopy images from the Mukhtar Laboratory.
      </p>
      <div className="footer-credit-row">
        <p className="footer-credit">
          Developed and designed with{" "}
          <span className="footer-heart" aria-hidden="true">
            ♥
          </span>{" "}
          by{" "}
          <a href="https://altveentechnologies.com" target="_blank" rel="noopener noreferrer">
            <strong>Altveen Technologies</strong>
          </a>
        </p>
      </div>
    </footer>
  );
}
