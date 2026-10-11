import type { ArchiveWork } from "app/projects/project-data";

const OWNER = "Y0EL";
const HOUR = 60 * 60;

async function checkRepo(repo: string): Promise<"private" | "public" | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${OWNER}/${repo}`, {
      headers: { Accept: "application/vnd.github+json", "User-Agent": "yoel.online" },
      next: { revalidate: process.env.NODE_ENV === "development" ? 0 : HOUR },
    });
    if (res.status === 200) return "public";
    if (res.status === 404) return "private";
    return null;
  } catch {
    return null;
  }
}

export async function withLiveVisibility(item: ArchiveWork): Promise<ArchiveWork> {
  if (!item.repo) return item;
  const visibility = (await checkRepo(item.repo)) ?? item.visibility;
  if (visibility === "private") {
    return {
      ...item,
      visibility,
      url: item.status === "live" ? item.url : undefined,
      source: "Repository privat",
    };
  }
  return {
    ...item,
    visibility,
    url: item.url ?? `https://github.com/${OWNER}/${item.repo}`,
    source: item.status === "code" ? `github.com/${OWNER}/${item.repo}` : item.source,
  };
}

export function withLiveVisibilityAll(items: ArchiveWork[]) {
  return Promise.all(items.map(withLiveVisibility));
}
