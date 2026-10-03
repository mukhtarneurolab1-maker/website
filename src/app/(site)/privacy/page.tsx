import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  const email = site.emailPrimary;

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="kicker">Privacy</p>
          <h1>Privacy notice</h1>
          <p className="lead">What this website collects, why, and how to reach us about it.</p>
        </div>
      </section>

      <section className="page-section">
        <div className="wrap">
          <div className="prose legal">
            <p className="legal-updated">Last updated: 3 October 2026</p>

            <h2>Who we are</h2>
            <p>
              This website belongs to the Mukhtar Laboratory, led by Dr. Tanzila Mukhtar at CIRI, University of
              Kashmir. For any privacy question, email <a href={`mailto:${email}`}>{email}</a>.
            </p>

            <h2>What we collect</h2>
            <ul>
              <li>
                <strong>Contact form:</strong> your name, email address, affiliation (optional), subject and message,
                only when you choose to send them.
              </li>
              <li>
                <strong>Nothing else:</strong> we don&apos;t use analytics, advertising or tracking cookies, and we
                don&apos;t build visitor profiles.
              </li>
            </ul>

            <h2>How we use it</h2>
            <p>
              Only to read and reply to your message. We don&apos;t sell it, share it for marketing, or add you to a
              mailing list.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
