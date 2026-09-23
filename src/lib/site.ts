export const site = {
  name: "Mukhtar Lab",
  tagline: "Dive into the Neuro-Magic",
  title: "Dr. Tanzila Mukhtar · Neurobiologist · Ramanujan Fellow",
  description:
    "Dr. Tanzila Mukhtar is a neurobiologist and Ramanujan Fellow investigating human brain development and disease through iPSC models, organoids, single-cell genomics and RNA biology.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  emailPrimary: "tanzila.mukhtar@ucsf.edu",
  emailSecondary: "tanzila.mukhtar@uok.edu.in",
  nav: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/research", label: "Research" },
    { href: "/publications", label: "Publications" },
    { href: "/awards", label: "Awards" },
    { href: "/blog", label: "Blog" },
    { href: "/team", label: "Team" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Contact" },
  ],
} as const;
