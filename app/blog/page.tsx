import Image from "next/image";
import Link from "next/link";
import { Headphones } from "lucide-react";
import { formatDate, getBlogPosts, getNarration } from "app/lib/posts";

export const metadata = {
  title: "Tulisan",
  description: "Tulisan Yoel Andreas Manoppo tentang karier, AI, dan dunia kerja.",
};

export default function BlogPosts() {
  const sorted = getBlogPosts().sort((a, b) => {
    const dateA = a.metadata.publishedAt ? new Date(a.metadata.publishedAt) : new Date(0);
    const dateB = b.metadata.publishedAt ? new Date(b.metadata.publishedAt) : new Date(0);
    return dateA > dateB ? -1 : 1;
  });

  return (
    <>
      <header className="pageHead">
        <span className="mono">Tulisan · {sorted.length} catatan</span>
        <h1 className="pageTitle">
          Catatan dari <em>lapangan.</em>
        </h1>
        <p className="pageLead">
          Tentang karier, AI, dan dunia kerja. Sebagian besar ditulis dalam Bahasa Indonesia, dari pengalaman saya
          sendiri.
        </p>
      </header>
      <ol className="postList">
        {sorted.map((post) => {
          const narration = getNarration(post.slug);
          return (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="postLink">
                <div className="postThumb">
                  {post.metadata.image && (
                    <Image src={post.metadata.image} alt="" width={1664} height={928} sizes="(max-width: 760px) 100vw, 240px" />
                  )}
                </div>
                <div>
                  <h2>{post.metadata.title}</h2>
                  {post.metadata.summary && <p>{post.metadata.summary}</p>}
                  {narration && (
                    <span className="mono postListen">
                      <Headphones aria-hidden="true" />
                      Bisa didengar · {Math.round(narration.duration / 60)} menit
                    </span>
                  )}
                </div>
                <time dateTime={post.metadata.publishedAt}>{formatDate(post.metadata.publishedAt, false)}</time>
              </Link>
            </li>
          );
        })}
      </ol>
    </>
  );
}
