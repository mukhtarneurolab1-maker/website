import Link from "next/link";
import { getResearch } from "@/lib/content";

const accents = ["rc-cyan", "rc-magenta", "rc-amber"];

export async function HomeResearch() {
  const items = await getResearch();
  return (
    <div className="research-grid">
      {items.map((item, index) => (
        <Link href={`/research#${item.slug}`} className={`research-card ${accents[index % 3]}`} key={item.id}>
          <div
            className="rc-visual rc-visual--photo"
            aria-hidden="true"
            style={{ backgroundImage: item.image_url ? `url('${item.image_url}')` : undefined }}
          />
          <span className="rc-num">{String(index + 1).padStart(2, "0")}</span>
          <h3>{item.card_title || item.title}</h3>
          <p>{item.card_summary}</p>
          <span className="rc-arrow">→</span>
        </Link>
      ))}
    </div>
  );
}
