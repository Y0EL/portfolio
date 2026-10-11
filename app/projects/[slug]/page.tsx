import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, FileText, Folder, Globe, Lock, Unlock } from "lucide-react";
import { archive, type ArchiveWork } from "app/projects/project-data";
import { archiveStatus } from "app/components/archiveRow";
import { withLiveVisibility } from "app/lib/repoVisibility";
import { metaData } from "app/config";
import trees from "data/yoel/repoTrees.json";

type TreeItem = { path: string; dir: boolean };
type RepoTree = { items: TreeItem[]; truncated: boolean; fileCount: number };
type Node = { name: string; dir: boolean; children: Node[] };

const SUCCESSORS: Record<string, { label: string; href: string }> = {
  alto: { label: "YOTEXT", href: "https://yotext.app/" },
  yota: { label: "YOTEXT", href: "https://yotext.app/" },
};

function buildTree(items: TreeItem[]) {
  const root: Node = { name: "", dir: true, children: [] };
  for (const item of items) {
    const parts = item.path.split("/");
    let cur = root;
    parts.forEach((part, i) => {
      let next = cur.children.find((c) => c.name === part);
      if (!next) {
        next = { name: part, dir: i < parts.length - 1 || item.dir, children: [] };
        cur.children.push(next);
      }
      cur = next;
    });
  }
  const sort = (n: Node) => {
    n.children.sort((a, b) => (a.dir === b.dir ? a.name.localeCompare(b.name) : a.dir ? -1 : 1));
    n.children.forEach(sort);
  };
  sort(root);
  return root.children;
}

function TreeList({ nodes, depth }: { nodes: Node[]; depth: number }) {
  return (
    <ul>
      {nodes.map((n) =>
        n.dir ? (
          <li key={n.name}>
            <details open={depth === 0}>
              <summary>
                <Folder aria-hidden="true" />
                {n.name}
                {n.children.length === 0 && <span className="treeMore">isi tidak ditampilkan</span>}
              </summary>
              {n.children.length > 0 && <TreeList nodes={n.children} depth={depth + 1} />}
            </details>
          </li>
        ) : (
          <li key={n.name} className="treeFile">
            <FileText aria-hidden="true" />
            {n.name}
          </li>
        )
      )}
    </ul>
  );
}

function Notice({ item }: { item: ArchiveWork }) {
  const successor = SUCCESSORS[item.slug];
  if (item.visibility === "private") {
    return (
      <div className="repoNotice" data-kind="private">
        <Lock aria-hidden="true" />
        <div>
          <strong>Repository ini privat.</strong>
          <p>
            Project ini masih ada dan masih saya simpan, tapi kodenya tidak dibuka untuk publik. Yang bisa kamu lihat di
            bawah adalah susunan file dan foldernya, supaya kamu tetap punya gambaran bagaimana project ini dibangun.
          </p>
          {successor && (
            <p>
              Project ini sekarang diteruskan menjadi{" "}
              <a href={successor.href} target="_blank" rel="noopener noreferrer">
                {successor.label}
              </a>
              .
            </p>
          )}
        </div>
      </div>
    );
  }
  if (item.status === "live" && item.url) {
    return (
      <div className="repoNotice" data-kind="live">
        <Globe aria-hidden="true" />
        <div>
          <strong>Situs ini masih aktif.</strong>
          <p>Kamu bisa membukanya langsung dan mencoba sendiri.</p>
          <a href={item.url} target="_blank" rel="noopener noreferrer" className="repoButton">
            Kunjungi {item.source}
            <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </div>
    );
  }
  if (item.visibility === "public" && item.url) {
    return (
      <div className="repoNotice" data-kind="public">
        <Unlock aria-hidden="true" />
        <div>
          <strong>{item.status === "offline" ? "Situsnya sudah tidak aktif, tapi kodenya terbuka." : "Kodenya terbuka untuk publik."}</strong>
          <p>Susunan file dan foldernya ada di bawah. Kalau mau melihat kodenya langsung, silakan buka repository nya.</p>
          <a href={item.url} target="_blank" rel="noopener noreferrer" className="repoButton">
            Lihat kode di GitHub
            <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </div>
    );
  }
  return (
    <div className="repoNotice" data-kind="offline">
      <Lock aria-hidden="true" />
      <div>
        <strong>Project ini sudah tidak aktif.</strong>
        <p>
          Situsnya sudah dimatikan dan kodenya tidak dibuka untuk publik. Ceritanya tetap saya simpan di sini sebagai
          bagian dari perjalanan.
        </p>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return archive.map((item) => ({ slug: item.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata | undefined {
  const item = archive.find((a) => a.slug === params.slug);
  if (!item) return;
  return {
    title: item.title,
    description: item.summary,
    alternates: { canonical: `${metaData.baseUrl}/projects/${item.slug}` },
    openGraph: {
      title: `${item.title} | ${metaData.name}`,
      description: item.summary,
      url: `${metaData.baseUrl}/projects/${item.slug}`,
      siteName: metaData.name,
      locale: "id_ID",
      type: "website",
      images: [{ url: metaData.ogImage, width: 1200, height: 630, alt: metaData.ogAlt, type: "image/jpeg" }],
    },
  };
}

export default async function ArchiveProject({ params }: { params: { slug: string } }) {
  const found = archive.find((a) => a.slug === params.slug);
  if (!found) notFound();
  const item = await withLiveVisibility(found);
  const tree = item.repo ? (trees as Record<string, RepoTree>)[item.repo] : undefined;
  const nodes = tree ? buildTree(tree.items) : [];

  return (
    <article className="projectDetail">
      <Link href="/projects" className="backLink">
        <ArrowLeft aria-hidden="true" />
        Semua karya
      </Link>
      <span className="mono headMeta">
        {item.kind} · {item.year} · {archiveStatus(item)}
      </span>
      <h1 className="articleTitle">{item.title}</h1>
      <p className="articleSummary">{item.summary}</p>
      <ul className="stackList" aria-label="Teknologi">
        {item.stack.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>

      <Notice item={item} />

      {tree && (
        <section className="repoTree" aria-label="Susunan file dan folder">
          <header>
            <span className="mono">Susunan file dan folder</span>
            <span className="mono repoCount">
              {tree.fileCount} file{tree.truncated ? " · sebagian ditampilkan" : ""}
            </span>
          </header>
          <TreeList nodes={nodes} depth={0} />
        </section>
      )}
    </article>
  );
}
