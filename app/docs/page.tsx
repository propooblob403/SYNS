import Link from "next/link";

const docsSections = [
  {
    title: "Signal model",
    copy: "Signal events are small typed observations. They do not claim truth on their own; they only carry local evidence."
  },
  {
    title: "Synaptic nodes",
    copy: "Nodes own narrow sensitivities. Each one responds to a limited region of the problem space rather than pretending to be a complete agent."
  },
  {
    title: "Adaptive weighting",
    copy: "Nodes accumulate score through repeated overlap between sensitivity and incoming signals. Weak overlap fades; stronger overlap survives."
  },
  {
    title: "Swarm emergence",
    copy: "The network crosses threshold when enough node-level activity aligns. The resulting signal is protocol-level, not single-source."
  }
];

const endpoints = [
  "GET /api/nodes",
  "GET /api/scenarios",
  "GET /api/scenarios/[slug]",
  "GET /api/simulate?scenario=<slug>&maxSignals=<n>"
];

export default function DocsPage() {
  return (
    <div className="page-shell">
      <section className="section section--compact">
        <div className="shell narrow-shell">
          <span className="kicker">Protocol Docs</span>
          <h1 className="page-title">The GitHub-facing MVP is organized around a small, legible protocol core.</h1>
          <p className="lead lead--wide">
            Instead of pretending to ship a full autonomous swarm on day one, SYNS starts with typed events, narrow nodes, deterministic
            scenarios, and public simulations. That is the smallest credible base layer.
          </p>
        </div>
      </section>

      <section className="section section--dark">
        <div className="shell">
          <div className="feature-grid feature-grid--syns">
            {docsSections.map((section) => (
              <article className="feature-card feature-card--syns" key={section.title}>
                <h3>{section.title}</h3>
                <p>{section.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell two-column two-column--syns">
          <article className="content-block">
            <span className="kicker">Repository Layout</span>
            <h2>What matters in this MVP</h2>
            <ul className="bullet-list">
              <li>
                <strong>`lib/syns/types.ts`</strong> defines protocol primitives.
              </li>
              <li>
                <strong>`lib/syns/scenarios.ts`</strong> holds reproducible signal sequences and synaptic nodes.
              </li>
              <li>
                <strong>`lib/syns/engine.ts`</strong> turns fragmented events into convergence and emergence outputs.
              </li>
              <li>
                <strong>`app/lab/page.tsx`</strong> exposes the engine through a visible lab interface.
              </li>
            </ul>
          </article>

          <article className="content-block">
            <span className="kicker">Public Surface</span>
            <h2>Developer endpoints</h2>
            <div className="stack-list">
              {endpoints.map((item) => (
                <code key={item}>{item}</code>
              ))}
            </div>
            <div className="toolbar-actions toolbar-actions--docs">
              <Link className="button button--ghost button--small" href="/api/scenarios">
                Open scenarios
              </Link>
              <Link className="button button--primary button--small" href="/lab">
                Open lab
              </Link>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
