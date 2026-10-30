import Carousel, { Placeholder } from './components/Carousel';
import { CoffeeIcon, GitHubIcon, GlobeIcon } from './components/Icons';
import { hostedSites, repos, showcase } from './data/projects';
import { BMC_IS_PLACEHOLDER, BMC_URL, BRAND, GITHUB_HANDLE, GITHUB_URL } from './config';

function CoffeeButton({ big = false }: { big?: boolean }) {
  return (
    <a
      className={`btn btn-coffee ${big ? 'btn-big' : ''}`}
      href={BMC_URL}
      target="_blank"
      rel="noopener noreferrer"
      data-placeholder={BMC_IS_PLACEHOLDER || undefined}
    >
      <CoffeeIcon className="ico" /> Buy me a coffee
      <span className="sr-only"> (opens in new tab)</span>
    </a>
  );
}

export default function App() {
  const year = new Date().getFullYear();
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="bg-layer" aria-hidden="true" />

      <header className="site-header">
        <a href="#top" className="logo" aria-label={`${BRAND} home`}>
          <span className="logo-mark" aria-hidden="true">IW</span>
          <span className="logo-text">Icha<span>Works</span></span>
        </a>
        <nav aria-label="Primary">
          <ul>
            <li><a href="#works">Works</a></li>
            <li><a href="#sites">Live sites</a></li>
            <li><a href="#github">GitHub</a></li>
            <li><a href="#support">Support</a></li>
          </ul>
        </nav>
      </header>

      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <p className="eyebrow"><span className="blink-dot" aria-hidden="true" /> Status: online · building things</p>
          <h1 id="hero-title">
            <span className="metal">Icha<span className="metal-b">Works</span></span>
          </h1>
          <p className="lede">
            Web apps, raid tools, WoW addons and game mods, all made with too much
            care and a lot of late-night playlists.
          </p>
          <div className="btn-row center">
            <a className="btn btn-primary btn-big" href="#works">See the works</a>
            <a className="btn btn-ghost btn-big btn-handle" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              <GitHubIcon className="ico" /> @{GITHUB_HANDLE}<span className="sr-only"> on GitHub (opens in new tab)</span>
            </a>
          </div>
          <ul className="stat-row" aria-label="At a glance">
            <li><strong>{new Set(hostedSites.map((s) => new URL(s.url).hostname)).size}</strong> live sites</li>
            <li><strong>{repos.length}</strong> projects</li>
            <li><strong>∞</strong> coffee</li>
          </ul>
        </section>

        <section id="works" className="section" aria-labelledby="works-title">
          <div className="section-head">
            <h2 id="works-title"><span className="kicker">01</span> Featured works</h2>
            <p>Swipe, use the arrows, or press ← → keys.</p>
          </div>
          <Carousel slides={showcase} />
        </section>

        <section id="sites" className="section" aria-labelledby="sites-title">
          <div className="section-head">
            <h2 id="sites-title"><span className="kicker">02</span> Live on the web</h2>
            <p>Sites that are up and running right now.</p>
          </div>
          <ul className="site-grid">
            {hostedSites.map((s) => (
              <li key={s.id} className={`card site-card accent-${s.accent}`}>
                <div className="thumb">
                  {s.image
                    ? <img src={s.image} alt="" width={1440} height={900} loading="lazy" decoding="async" />
                    : <Placeholder title={s.name} note="Screenshot unavailable" accent={s.accent} />}
                </div>
                <div className="card-body">
                  <h3>{s.name}</h3>
                  <p>{s.blurb}</p>
                  <div className="btn-row">
                    <a className="btn btn-primary btn-sm" href={s.url} target="_blank" rel="noopener noreferrer">
                      <GlobeIcon className="ico" /> Visit<span className="sr-only"> {s.name} (opens in new tab)</span>
                    </a>
                    {s.repo && (
                      <a className="btn btn-ghost btn-sm" href={s.repo} target="_blank" rel="noopener noreferrer">
                        <GitHubIcon className="ico" /> Code<span className="sr-only"> for {s.name} on GitHub (opens in new tab)</span>
                      </a>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section id="github" className="section" aria-labelledby="gh-title">
          <div className="section-head">
            <h2 id="gh-title"><span className="kicker">03</span> On GitHub</h2>
            <p>
              Open-source bits at{' '}
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">github.com/{GITHUB_HANDLE}</a>.
            </p>
          </div>
          <ul className="repo-grid">
            {repos.map((r) => {
              const inner = (
                <>
                  <div className="repo-top">
                    <GitHubIcon className="ico repo-ico" />
                    {r.badge && <span className="badge">{r.badge}</span>}
                  </div>
                  <h3>{r.name}</h3>
                  <p>{r.description}</p>
                  <div className="repo-foot">
                    {r.language && <span className="lang"><i aria-hidden="true" />{r.language}</span>}
                    {r.url ? <span className="go" aria-hidden="true">View repo →</span> : <span className="go muted">No public link</span>}
                  </div>
                </>
              );
              return (
                <li key={r.name} className={`card repo-card accent-${r.accent} ${r.url ? '' : 'is-private'}`}>
                  {r.url ? (
                    <a className="card-link" href={r.url} target="_blank" rel="noopener noreferrer" aria-label={`${r.name} on GitHub (opens in new tab)`}>
                      {inner}
                    </a>
                  ) : (
                    <div className="card-link">{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </section>

        <section id="support" className="section support" aria-labelledby="support-title">
          <div className="support-card card accent-gold">
            <h2 id="support-title">Enjoying the tools?</h2>
            <p>Everything here is built in spare time. If something saved your raid night, a coffee keeps the next one coming.</p>
            <CoffeeButton big />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>© {year} {BRAND} · made with caffeine</p>
        <p>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">@{GITHUB_HANDLE}</a>
        </p>
      </footer>
    </>
  );
}
