import type { Metadata } from "next";
import { existsSync } from "fs";
import path from "path";
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

function postOgImage(slug: string) {
  let file = `/og/blog/${slug}.jpg`;
  return existsSync(path.join(process.cwd(), "public", file)) ? file : metaData.ogImage;
}

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
  } = post.metadata;
  let ogImage = postOgImage(post.slug);
  let ogImages = [{ url: ogImage, width: 1200, height: 630, alt: title, type: "image/jpeg" }];

  return {
    title,
    description,
    alternates: {
      canonical: `${metaData.baseUrl}/blog/${post.slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${metaData.baseUrl}/blog/${post.slug}`,
      authors: [metaData.name],
      siteName: metaData.name,
      locale: "id_ID",
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImages,
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
            image: `${metaData.baseUrl}${postOgImage(post.slug)}`,
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
