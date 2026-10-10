import { ArrowUpRight } from "lucide-react";
import type { ShowcaseWork } from "app/projects/project-data";
import { BrowserFrame, PhoneFrame, toneClass } from "./workFrames";

export function CaseList({ works, label }: { works: ShowcaseWork[]; label: string }) {
  return (
    <section className="cases" aria-label={label}>
      {works.map((work) => (
        <article key={work.slug} className="caseRow" id={work.slug}>
          <a
            href={work.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`stage caseStage ${toneClass[work.tone]}`}
            aria-label={`Buka ${work.domain} di tab baru`}
          >
            <span className="stageLabel mono">
              <span>{work.domain}</span>
              <span>{work.year}</span>
            </span>
            <BrowserFrame work={work} hint={false} />
            <PhoneFrame work={work} />
          </a>
          <div className="caseCopy">
            <span className="mono headMeta">{work.kind}</span>
            <h3>{work.title}</h3>
            <p>{work.story}</p>
            <ul>
              {work.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <a href={work.url} target="_blank" rel="noopener noreferrer" className="textCta">
              Kunjungi {work.domain}
              <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </article>
      ))}
    </section>
  );
}
