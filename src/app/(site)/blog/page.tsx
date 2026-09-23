import type { Metadata } from "next";
import Link from "next/link";
import { getBlogs } from "@/lib/content";

export const metadata: Metadata = { title: "Blog" };

export default async function BlogPage() {
  const posts = await getBlogs();
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="kicker">Blog</p>
          <h1>Notes from the lab</h1>
          <p className="lead">Essays, updates and stories from the Mukhtar Laboratory.</p>
        </div>
      </section>
      <section className="page-section">
        <div className="wrap">
          {posts.length === 0 ? (
            <p className="lead">Posts will appear here once they are published from the admin panel.</p>
          ) : (
            <div className="blog-list">
              {posts.map((post) => (
                <article className="blog-card" key={post.id}>
                  {post.cover_url ? <img src={post.cover_url} alt="" /> : null}
                  <div>
                    <p className="kicker">{post.published_at}</p>
                    <h2><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2>
                    {post.excerpt ? <p>{post.excerpt}</p> : null}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
