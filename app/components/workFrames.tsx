import Image from "next/image";
import type { ShowcaseWork } from "app/projects/project-data";
import { EvidnceShot } from "./evidnceShot";

const codedShots = {
  evidnce: EvidnceShot,
};

export function BrowserFrame({
  work,
  className,
  hint = true,
  priority = false,
}: {
  work: ShowcaseWork;
  className?: string;
  hint?: boolean;
  priority?: boolean;
}) {
  const Coded = work.coded ? codedShots[work.coded] : undefined;
  return (
    <div
      className={["browserFrame", Coded ? "codedFrame" : null, className].filter(Boolean).join(" ")}
      aria-hidden="true"
    >
      <div className="browserBar">
        <span className="browserDots">
          <i />
          <i />
          <i />
        </span>
        <span className="browserUrl">{work.domain}</span>
        {hint && !Coded && <span className="browserHint">Arahkan kursor untuk menggulir</span>}
      </div>
      <div className="browserView">
        {Coded ? (
          <Coded />
        ) : (
          work.shots && (
            <Image
              src={work.shots.long}
              alt=""
              width={1440}
              height={work.shots.longHeight}
              sizes="(max-width: 650px) 92vw, (max-width: 1100px) 60vw, 820px"
              className="scrollShot"
              priority={priority}
            />
          )
        )}
      </div>
    </div>
  );
}

export function PhoneFrame({ work, className }: { work: ShowcaseWork; className?: string }) {
  if (!work.shots) return null;
  return (
    <div className={["phoneFrame", className].filter(Boolean).join(" ")} aria-hidden="true">
      <Image src={work.shots.mobile} alt="" width={390} height={844} sizes="200px" />
    </div>
  );
}

export const toneClass: Record<ShowcaseWork["tone"], string> = {
  piranusa: "tonePiranusa",
  yotext: "toneYotext",
  polimerindo: "tonePolimerindo",
  scanner: "toneScanner",
  evidnce: "toneEvidnce",
};
