function Mark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="87 136 232 232" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="18" strokeLinecap="square" strokeLinejoin="miter">
        <path d="M118 154 L118 350" />
        <path d="M118 154 L288 154" />
        <path d="M118 186 L282 186" />
        <path d="M118 350 L266 350" />
      </g>
    </svg>
  );
}

function IconProduct() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M24 5l17 8v20l-17 9-17-9V13z" fill="#e8c06a" stroke="#8a5f17" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M7 13l17 9 17-9" fill="none" stroke="#8a5f17" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M24 22v20" stroke="#8a5f17" strokeWidth="1.4" />
      <path d="M7 13l17-8 17 8-17 9z" fill="#f6dc96" stroke="#8a5f17" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function IconBlog() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M10 6h22l7 7v29H10z" fill="#ffffff" stroke="#6b7c93" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M32 6v7h7" fill="#dbe6f2" stroke="#6b7c93" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M15 19h19M15 24h19M15 29h19M15 34h12" stroke="#7aa7d6" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

function IconPricing() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M6 24L24 6h16v16L22 40z" fill="#5cc26e" stroke="#2a7a3a" strokeWidth="1.4" strokeLinejoin="round" />
      <circle cx="33" cy="15" r="3.2" fill="#ffffff" stroke="#2a7a3a" strokeWidth="1.4" />
    </svg>
  );
}

function IconSignIn() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="17" cy="20" r="10" fill="#f2c94c" stroke="#8a6a12" strokeWidth="1.4" />
      <circle cx="14" cy="17" r="3" fill="#fff4cc" stroke="#8a6a12" strokeWidth="1" />
      <path d="M24 26l16 16M33 35l4-4M37 39l3-3" stroke="#8a6a12" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

const DESKTOP_ICONS = [
  { label: "Home", art: <Mark className="evidnceDeskMark" /> },
  { label: "Product", art: <IconProduct /> },
  { label: "Blog", art: <IconBlog /> },
  { label: "Pricing", art: <IconPricing /> },
  { label: "Sign in", art: <IconSignIn /> },
];

const ROWS = [
  { company: "PT Contoh Teknologi", status: "Confirmed", tone: "isConfirmed" },
  { company: "Contoh Solusi", status: "Claimed", tone: "isClaimed" },
  { company: "Delta Contoh", status: "Possible", tone: "isPossible" },
];

const CARDS = [
  { legend: "Verified, not guessed", body: "Every relationship carries a status and the exact excerpt that supports it." },
  { legend: "Shared knowledge", body: "What one team learns about public companies answers the next question without a new search." },
  { legend: "Exhibition history", body: "Shows from company pages and organizer exhibitor lists, merged into one timeline." },
];

export function EvidnceShot() {
  return (
    <div className="evidnceShot" aria-hidden="true">
      <div className="evidnceDesk">
        <div className="evidnceIcons">
          {DESKTOP_ICONS.map((icon) => (
            <span key={icon.label} className="evidnceIcon">
              {icon.art}
              <em>{icon.label}</em>
            </span>
          ))}
        </div>

        <div className="evidnceWindow">
          <div className="evidnceTitleBar">
            <Mark className="evidnceTitleMark" />
            <span>EVIDNCE, Home</span>
            <span className="evidnceControls">
              <i />
              <i />
              <i className="isClose" />
            </span>
          </div>

          <div className="evidnceBody">
            <div className="evidnceToolbar">
              <span className="evidnceBrand">
                <Mark className="evidnceBrandMark" />
                evidnce.
              </span>
              <span className="evidnceActions">
                <b>Sign in</b>
                <b className="isDefault">Start free</b>
              </span>
            </div>

            <div className="evidnceTabs">
              <span className="isActive">Home</span>
              <span>Product</span>
              <span>Blog</span>
              <span>Pricing</span>
            </div>

            <div className="evidnceHero">
              <div className="evidnceHeroCopy">
                <strong>Find companies. Keep the receipts.</strong>
                <p>
                  EVIDNCE researches companies for you, checks who really distributes, supplies or exhibits, and keeps
                  the source behind every claim.
                </p>
                <span className="evidnceActions">
                  <b className="isDefault">Start free</b>
                  <b>See how it works</b>
                </span>
              </div>

              <div className="evidncePane">
                <div className="evidncePaneBar">
                  <span>Research: Distributor ZWCAD di Indonesia</span>
                  <i />
                </div>
                <div className="evidncePaneBody">
                  <span className="evidnceRun">Reading partner pages and company sites...</span>
                  <span className="evidnceMarquee">
                    <i />
                  </span>
                  <table className="evidnceTable">
                    <thead>
                      <tr>
                        <th>Company</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ROWS.map((row) => (
                        <tr key={row.company}>
                          <td>{row.company}</td>
                          <td className={row.tone}>{row.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="evidnceCards">
              {CARDS.map((card) => (
                <span key={card.legend} className="evidnceCard">
                  <em>{card.legend}</em>
                  <p>{card.body}</p>
                </span>
              ))}
            </div>
          </div>

          <div className="evidnceStatusBar">
            <span>Done</span>
            <span>Home</span>
            <span>Not signed in</span>
          </div>
        </div>
      </div>

      <div className="evidnceTaskbar">
        <span className="evidnceStart">
          <Mark className="evidnceStartMark" />
        </span>
        <span className="evidnceTask">EVIDNCE, Home</span>
        <span className="evidnceClock">09:41</span>
      </div>
    </div>
  );
}
