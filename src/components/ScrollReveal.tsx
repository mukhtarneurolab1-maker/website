"use client";

import { useEffect } from "react";

const SELECTOR = [
  ".section-header",
  ".intro-text",
  ".intro-visual",
  ".stat-card",
  ".research-card",
  ".hl-card",
  ".timeline-item",
  ".skill-group",
  ".team-card",
  ".team-member-feature",
  ".research-block",
  ".award-grid article",
  ".recognition-list li",
  ".contact-block",
  ".contact-form-wrap",
  ".furry-together",
  ".gallery-item",
  ".quote-banner blockquote",
  ".connect-copy",
  ".connect-links",
  ".pub-list li",
  ".journals-list",
  ".intro-stats",
  ".pipeline-track",
  ".featured-inner",
  ".pipe-step",
  ".scope-frame",
].join(", ");

export function ScrollReveal() {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));
    if (!targets.length) return;

    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    targets.forEach((el, i) => {
      el.classList.add("reveal");
      el.style.transitionDelay = `${(i % 6) * 80}ms`;
    });

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 }
    );

    targets.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return null;
}
