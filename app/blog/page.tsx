import Link from "next/link";
import { formatDate, getBlogPosts } from "app/lib/posts";

export const metadata = {
  title: "Wire · Field Notes",
  description: "Tulisan-tulisan dari Yoel · karir, AI, musik, dan lainnya.",
};

export default function BlogPosts() {
  const allBlogs = getBlogPosts();
  const sorted = allBlogs.sort((a, b) => {
    const dateA = a.metadata.publishedAt ? new Date(a.metadata.publishedAt) : new Date(0);
    const dateB = b.metadata.publishedAt ? new Date(b.metadata.publishedAt) : new Date(0);
    return dateA > dateB ? -1 : 1;
  });

  return (
    <section className="max-w-[1180px] mx-auto px-6 lg:px-10 py-16 lg:py-24">
      {/* Section header */}
      <header className="max-w-3xl">
        <div className="flex items-center gap-3 mb-5">
          <span className="signal-dot" aria-hidden="true" />
          <span className="kicker">The Wire · Field Notes</span>
        </div>
        <h1 className="display-roman text-6xl md:text-8xl leading-[0.95]">
          Things <span className="display-italic text-ember">I wrote</span>
          <span className="text-ember">.</span>
        </h1>
        <p className="font-sans text-bone text-lg leading-relaxed mt-6 max-w-[58ch]">
          Catatan kerja, opini, dan transmisi pribadi. Sebagian besar dalam Bahasa Indonesia,
          ditulis dari Jakarta · kadang panas, kadang reflektif, selalu jujur.
        </p>
        <p className="kicker mt-6 text-ash">
          {sorted.length} dispatch · arsip diurutkan terbaru di atas
        </p>
      </header>

      {/* Posts list */}
      <ol className="mt-16 border-t border-[color:var(--rule)]">
        {sorted.map((post, i) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group flex flex-col md:flex-row md:items-baseline gap-3 md:gap-8 border-b border-[color:var(--rule)] py-7 md:py-9 hover:bg-ink-2 px-2 md:px-6 -mx-2 md:-mx-6 transition-colors duration-500"
            >
              <span className="font-display italic text-3xl md:text-4xl text-ash group-hover:text-ember transition-colors duration-500 w-16 shrink-0">
                №{String(sorted.length - i).padStart(2, "0")}
              </span>
              <div className="flex-1">
                <h2 className="font-display text-2xl md:text-3xl leading-tight text-paper group-hover:text-ember transition-colors duration-500">
                  {post.metadata.title}
                </h2>
                {post.metadata.summary && (
                  <p className="font-sans text-bone mt-2 text-[15px] leading-relaxed line-clamp-2 max-w-[68ch]">
                    {post.metadata.summary}
                  </p>
                )}
              </div>
              <time className="kicker text-ash md:text-right shrink-0">
                {formatDate(post.metadata.publishedAt, false)}
              </time>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
