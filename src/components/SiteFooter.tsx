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
        Atmosphere imagery: NIH public-domain confocal neuron; GFP cortical neurons
        (CC BY-SA 4.0, ManuelSchottdorf); multicolor fluorescence cell via Wikimedia
        Commons.
      </p>
      <div className="footer-credit-row">
        <p className="footer-credit">
          Developed and designed with{" "}
          <span className="footer-heart" aria-hidden="true">
            ♥
          </span>{" "}
          by <strong>Altveen Technologies</strong>
        </p>
      </div>
    </footer>
  );
}
