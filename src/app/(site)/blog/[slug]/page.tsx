import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlog, getBlogs } from "@/lib/content";

export async function generateStaticParams() {
  const posts = await getBlogs();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlog(slug);
  return { title: post?.title || "Blog" };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlog(slug);
  if (!post) notFound();
  const paragraphs = post.body.split(/\n\s*\n/).filter(Boolean);

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="kicker">{post.published_at}</p>
          <h1>{post.title}</h1>
          {post.excerpt ? <p className="lead">{post.excerpt}</p> : null}
        </div>
      </section>
      <section className="page-section">
        <div className="wrap prose blog-body">
          {post.cover_url ? <img src={post.cover_url} alt="" /> : null}
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
      </section>
    </>
  );
}
