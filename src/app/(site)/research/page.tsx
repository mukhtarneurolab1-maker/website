import type { Metadata } from "next";
import { getResearch } from "@/lib/content";

export const metadata: Metadata = { title: "Research" };

export default async function ResearchPage() {
  const items = await getResearch();
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="kicker">Research</p>
          <h1>Six questions, one coherent program</h1>
          <p className="lead">
            Ordered from fundamental development to tools, disease mechanisms and translation, how molecular programs become cellular identity, circuits and clinical insight.
          </p>
        </div>
      </section>
      <section className="page-section">
        <div className="wrap">
          {items.map((item, index) => (
            <article className="research-block" id={item.slug} key={item.id}>
              <div className="research-block-layout">
                <figure className={`research-block-visual${item.image_url?.includes("theme-rna") || item.image_url?.includes("theme-brain") ? " research-block-visual--contain" : ""}`}>
                  {item.image_url ? <img src={item.image_url} alt="" /> : null}
                  {item.image_caption ? <figcaption>{item.image_caption}</figcaption> : null}
                </figure>
                <div className="research-block-body">
                  <div className="research-block-header">
                    <span className="rc-num">{String(index + 1).padStart(2, "0")}</span>
                    <h2>{item.title}</h2>
                    {item.subtitle ? <p className="theme-sub">{item.subtitle}</p> : null}
                  </div>
                  <div className="prose">
                    {item.question ? <p className="research-question">{item.question}</p> : null}
                    <p>{item.body}</p>
                    {item.extra_line ? <p className="research-chain">{item.extra_line}</p> : null}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
