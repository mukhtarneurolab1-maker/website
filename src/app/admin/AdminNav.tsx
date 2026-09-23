"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/research", label: "Research" },
  { href: "/admin/publications", label: "Publications" },
  { href: "/admin/awards", label: "Awards" },
  { href: "/admin/blogs", label: "Blogs" },
];

export function AdminNav() {
  const pathname = usePathname();
  return (
    <nav className="admin-nav" aria-label="Admin">
      {links.map((link) => {
        const active = link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);
        return (
          <Link key={link.href} href={link.href} className={active ? "is-active" : undefined}>
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
