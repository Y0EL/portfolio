import { ArrowUpRight } from "lucide-react";
import type { ArchiveWork } from "app/projects/project-data";

const statusLabel: Record<ArchiveWork["status"], string> = {
  live: "Situs aktif",
  code: "Kode di GitHub",
  offline: "Sudah tidak aktif",
};

export function ArchiveRow({ item }: { item: ArchiveWork }) {
  const body = (
    <>
      <time>{item.year}</time>
      <h3>
        {item.title}
        <span>{item.kind}</span>
      </h3>
      <p>
        {item.summary}
        <span className="archiveStack">{item.stack.join(" · ")}</span>
      </p>
      <span className="statusTag" data-status={item.status} title={item.source}>
        {statusLabel[item.status]}
      </span>
      <span className="archiveArrow" aria-hidden="true">
        {item.url ? <ArrowUpRight /> : null}
      </span>
    </>
  );

  if (!item.url) {
    return <div className="archiveRow">{body}</div>;
  }

  return (
    <a href={item.url} target="_blank" rel="noopener noreferrer" className="archiveRow">
      {body}
    </a>
  );
}
