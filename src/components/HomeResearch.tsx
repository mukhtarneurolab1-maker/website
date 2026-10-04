import Image from "next/image";
import Link from "next/link";
import { getResearch } from "@/lib/content";
import { PHONE_3X } from "@/lib/image-sizes";

const accents = ["rc-cyan", "rc-magenta", "rc-amber"];

export async function HomeResearch() {
  const items = await getResearch();
  return (
    <div className="research-grid">
      {items.map((item, index) => (
        <Link href={`/research#${item.slug}`} prefetch={false} className={`research-card ${accents[index % 3]}`} key={item.id}>
          <div className="rc-visual rc-visual--photo" aria-hidden="true">
            {item.image_url ? (
              <Image
                src={item.image_url}
                alt=""
                fill
                sizes={`${PHONE_3X}, (max-width: 720px) 100vw, (max-width: 1024px) 50vw, 380px`}
                unoptimized={item.image_url.endsWith(".svg")}
              />
            ) : null}
          </div>
          <span className="rc-num">{String(index + 1).padStart(2, "0")}</span>
          <h3>{item.card_title || item.title}</h3>
          <p>{item.card_summary}</p>
          <span className="rc-arrow">→</span>
        </Link>
      ))}
    </div>
  );
}
