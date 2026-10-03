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

function inOrNearView(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const slack = window.innerHeight * 0.35;
  return rect.top < window.innerHeight + slack && rect.bottom > -slack;
}

export function ScrollReveal() {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));
    if (!targets.length) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "280px 0px 40% 0px", threshold: 0.01 }
    );

    targets.forEach((el) => {
      if (inOrNearView(el)) {
        el.classList.add("is-visible");
        return;
      }
      el.classList.add("reveal");
      obs.observe(el);
    });

    return () => obs.disconnect();
  }, []);

  return null;
}
