import Link from "next/link";

import { EmergenceSimulator } from "@/components/emergence-simulator";
import { listScenarioSnapshots } from "@/lib/syns/engine";

const systemModules = [
  {
    title: "Signal ingest",
    copy: "Typed signal events model fragmented onchain, social, and code activity as protocol-readable impulses."
  },
  {
    title: "Adaptive weighting",
    copy: "A compact reinforcement loop reweights nodes according to overlap, sensitivity, and threshold behavior."
  },
  {
    title: "Swarm emergence",
    copy: "Convergence scores and node activation turn scattered events into a visible, testable protocol outcome."
  }
];

const repoModules = [
  "Typed protocol primitives under lib/syns",
  "Scenario library with reproducible signal sequences",
  "Simulation engine for node activation and convergence",
  "Public demo API routes for scenarios and emergence runs",
  "Interactive lab page for protocol-facing demos"
];

const scenarioSnapshots = listScenarioSnapshots();

export default function HomePage() {
  return (
    <div className="page-shell">
      <section className="hero hero--syns">
        <div className="shell hero-syns__grid">
          <div className="hero-syns__copy">
            <span className="hero-kicker">From Commands to Emergence</span>
            <h1>Build the smallest credible swarm intelligence protocol before the full network exists.</h1>
            <p>
              SYNS MVP turns the protocol thesis into working code: typed signal events, synaptic nodes, adaptive weighting, a
              scenario library, public demo APIs, and an interactive emergence lab that shows how coordinated activity becomes
              signal.
            </p>

            <div className="hero__actions">
              <Link className="button button--primary" href="/lab">
                Open Emergence Lab
              </Link>
              <Link className="button button--ghost" href="/docs">
                Read Protocol Docs
              </Link>
            </div>

            <div className="stats-grid stats-grid--syns">
              <div className="stat-card">
                <span className="eyebrow">Scenarios</span>
                <strong>{scenarioSnapshots.length}</strong>
              </div>
              <div className="stat-card">
                <span className="eyebrow">Synaptic Nodes</span>
                <strong>5</strong>
              </div>
              <div className="stat-card">
                <span className="eyebrow">Public APIs</span>
                <strong>3</strong>
              </div>
            </div>
          </div>

          <div className="hero-syns__panel">
            <div className="hero-syns__panel-card">
              <span className="pill">MVP Surface</span>
              <h2>Protocol-facing code, not just protocol language.</h2>
              <ul className="stack-list">
                {repoModules.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="shell">
          <div className="section-heading section-heading--stacked">
            <div>
              <span className="kicker">First Principles</span>
              <h2>The MVP starts with the minimum irreducible system.</h2>
            </div>
            <p className="lead">
              Intelligence is only believable when the repo can express the transformation from signal to emergence in code,
              not only in copy.
            </p>
          </div>

          <div className="feature-grid feature-grid--syns">
            {systemModules.map((item) => (
              <article className="feature-card feature-card--syns" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-heading section-heading--stacked">
            <div>
              <span className="kicker">Interactive Core</span>
              <h2>How emergence becomes signal</h2>
            </div>
            <p className="lead">
              The lab below is the protocol in miniature: fragmented events are captured, reweighted, and eventually pushed across
              threshold.
            </p>
          </div>

          <EmergenceSimulator />
        </div>
      </section>

      <section className="section section--dark">
        <div className="shell">
          <div className="section-heading">
            <div>
              <span className="kicker">Scenario Library</span>
              <h2>Reproducible signal stories for demos, docs, and GitHub review.</h2>
            </div>
            <Link className="section-link" href="/api/scenarios">
              View JSON
            </Link>
          </div>

          <div className="market-grid market-grid--syns">
            {scenarioSnapshots.map((scenario) => (
              <article className="market-card market-card--syns" key={scenario.id}>
                <div className="market-card__top">
                  <span className="pill">{scenario.emerged ? "Threshold crossed" : "Pre-threshold"}</span>
                  <span className="eyebrow">{scenario.activeNodes} active nodes</span>
                </div>
                <h3>{scenario.name}</h3>
                <p>{scenario.thesis}</p>
                <div className="market-card__meta">
                  <span>Emergence score</span>
                  <strong>{Math.round(scenario.emergenceScore * 100)}%</strong>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell cta-panel cta-panel--syns">
          <div>
            <span className="kicker">Ship to GitHub</span>
            <h2>This repo now has a protocol narrative, a typed model, a working engine, and a visible lab surface.</h2>
          </div>
          <div className="toolbar-actions">
            <Link className="button button--primary" href="/docs">
              Open Docs
            </Link>
            <Link className="button button--ghost" href="/api/simulate">
              Explore API
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
