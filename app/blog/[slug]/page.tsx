import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CustomMDX } from "app/components/mdx";
import { formatDate, getBlogPosts } from "app/lib/posts";
import { metaData } from "app/config";

export async function generateStaticParams() {
  let posts = getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata | undefined> {
  let post = getBlogPosts().find((p) => p.slug === params.slug);
  if (!post) return;

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  let ogImage = image
    ? image
    : `${metaData.baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${metaData.baseUrl}/blog/${post.slug}`,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function Blog({ params }: { params: { slug: string } }) {
  let post = getBlogPosts().find((p) => p.slug === params.slug);
  if (!post) notFound();

  return (
    <article className="max-w-[1180px] mx-auto px-6 lg:px-10 py-16 lg:py-24">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${metaData.baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${metaData.baseUrl}/blog/${post.slug}`,
            author: { "@type": "Person", name: metaData.name },
          }),
        }}
      />

      {/* Header */}
      <header className="max-w-[820px] mx-auto">
        <Link
          href="/blog"
          className="kicker text-ash hover:text-ember inline-flex items-center gap-2 transition-colors"
        >
          <span aria-hidden="true">←</span> Back to The Wire
        </Link>

        <div className="flex items-center gap-3 mt-8 mb-5">
          <span className="signal-dot" aria-hidden="true" />
          <span className="kicker">
            Dispatch · {formatDate(post.metadata.publishedAt, false)}
          </span>
        </div>

        <h1 className="display-roman text-4xl md:text-6xl leading-[1.05]">
          {post.metadata.title}
          <span className="text-ember">.</span>
        </h1>

        {post.metadata.summary && (
          <p className="font-display italic text-2xl md:text-3xl text-bone mt-6 leading-snug">
            {post.metadata.summary}
          </p>
        )}

        <div className="rule-line mt-10" />
      </header>

      {/* Body */}
      <div className="max-w-[820px] mx-auto mt-10">
        <div
          className="prose prose-invert prose-quoteless max-w-none
            prose-headings:font-display prose-headings:font-normal prose-headings:tracking-tight prose-headings:text-paper
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:leading-[1.15]
            prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-3
            prose-p:text-bone prose-p:text-[17px] prose-p:leading-[1.75]
            prose-strong:text-paper
            prose-a:text-paper prose-a:no-underline prose-a:border-b prose-a:border-ember/40 hover:prose-a:text-ember hover:prose-a:border-ember
            prose-blockquote:border-l-2 prose-blockquote:border-ember prose-blockquote:not-italic prose-blockquote:text-paper prose-blockquote:font-display prose-blockquote:text-2xl
            prose-code:text-ember-soft prose-code:bg-ink-2 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-code:text-[0.9em]
            prose-pre:bg-ink-2 prose-pre:border prose-pre:border-[color:var(--rule)] prose-pre:rounded-card
            prose-li:text-bone prose-li:marker:text-ember
            prose-hr:border-[color:var(--rule)] prose-hr:my-12"
        >
          <CustomMDX source={post.content} />
        </div>
      </div>

      {/* Endnote */}
      <footer className="max-w-[820px] mx-auto mt-20">
        <div className="rule-line mb-6" />
        <p className="kicker text-ash">/ end of dispatch №{post.slug.slice(0, 4)} /</p>
        <Link
          href="/blog"
          className="font-display italic text-3xl text-paper hover:text-ember transition-colors duration-500 inline-block mt-4"
        >
          Read another →
        </Link>
      </footer>
    </article>
  );
}
