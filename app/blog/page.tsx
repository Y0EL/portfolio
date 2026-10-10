import Link from "next/link";
import { formatDate, getBlogPosts } from "app/lib/posts";

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
        {sorted.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="postLink">
              <div>
                <h2>{post.metadata.title}</h2>
                {post.metadata.summary && <p>{post.metadata.summary}</p>}
              </div>
              <time dateTime={post.metadata.publishedAt}>{formatDate(post.metadata.publishedAt, false)}</time>
            </Link>
          </li>
        ))}
      </ol>
    </>
  );
}
