import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CustomMDX } from "app/components/mdx";
import { CassettePlayer } from "app/components/cassettePlayer";
import { ListenEnd } from "app/components/listenEnd";
import { whatsappHref } from "app/components/footer";
import { formatDate, getBlogPosts, getNarration } from "app/lib/posts";
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
    alternates: {
      canonical: `https://yoel.online/blog/${post.slug}`,
    },
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
  let narration = getNarration(post.slug);
  let picks = getBlogPosts()
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => (Number(!!getNarration(b.slug)) - Number(!!getNarration(a.slug))) || b.metadata.publishedAt.localeCompare(a.metadata.publishedAt))
    .slice(0, 2)
    .map((p) => ({ slug: p.slug, title: p.metadata.title }));

  return (
    <article className="article">
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

      <header className="articleHead">
        <Link href="/blog" className="backLink">
          <ArrowLeft aria-hidden="true" />
          Semua tulisan
        </Link>
        <span className="mono headMeta">
          <time dateTime={post.metadata.publishedAt}>{formatDate(post.metadata.publishedAt, false)}</time>
        </span>
        <h1 className="articleTitle">{post.metadata.title}</h1>
        {post.metadata.summary && <p className="articleSummary">{post.metadata.summary}</p>}
        {post.metadata.image && (
          <figure className="articleCover">
            <Image src={post.metadata.image} alt={`Ilustrasi ${post.metadata.title}`} width={1664} height={928} priority sizes="(max-width: 860px) 100vw, 820px" />
          </figure>
        )}
        {narration && <CassettePlayer track={narration} title={post.metadata.title} cover={post.metadata.image} />}
      </header>

      <div className="articleBody">
        <CustomMDX source={post.content} />
      </div>

      {narration && <ListenEnd picks={picks} whatsapp={whatsappHref} />}

      <footer className="articleFoot">
        <Link href="/blog" className="articleNext">
          Baca tulisan lain
          <ArrowRight aria-hidden="true" />
        </Link>
      </footer>
    </article>
  );
}
