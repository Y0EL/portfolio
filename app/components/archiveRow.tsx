import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ArchiveWork } from "app/projects/project-data";

export function archiveStatus(item: ArchiveWork) {
  if (item.status === "live") return "Situs aktif";
  if (item.status === "offline") return "Sudah tidak aktif";
  return item.visibility === "private" ? "Kode privat" : "Kode terbuka";
}

export function ArchiveRow({ item }: { item: ArchiveWork }) {
  return (
    <Link href={`/projects/${item.slug}`} className="archiveRow">
      <time>{item.year}</time>
      <h3>
        {item.title}
        <span>{item.kind}</span>
      </h3>
      <p>
        {item.summary}
        <span className="archiveStack">{item.stack.join(" · ")}</span>
      </p>
      <span className="statusTag" data-status={item.status}>
        {archiveStatus(item)}
      </span>
      <span className="archiveArrow" aria-hidden="true">
        <ArrowRight />
      </span>
    </Link>
  );
}
