import { EmergenceSimulator } from "@/components/emergence-simulator";
import { listScenarioSnapshots, simulateScenario } from "@/lib/syns/engine";
import { emergenceScenarios } from "@/lib/syns/scenarios";

const scenarioSnapshots = listScenarioSnapshots();
const diagnosticRun = simulateScenario(emergenceScenarios[0]);

export default function LabPage() {
  return (
    <div className="page-shell">
      <section className="section section--compact">
        <div className="shell">
          <span className="kicker">Emergence Lab</span>
          <h1 className="page-title">A protocol-facing surface for signal replay, weighting, and swarm convergence.</h1>
          <p className="lead lead--wide">
            This page is the MVP proof that SYNS is more than a brand story. Each scenario replays a structured signal sequence
            against typed nodes and exposes the resulting convergence score.
          </p>
        </div>
      </section>

      <section className="section section--dark">
        <div className="shell">
          <EmergenceSimulator />
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-heading section-heading--stacked">
            <div>
              <span className="kicker">Scenario Coverage</span>
              <h2>The current MVP runs on deterministic scenario snapshots.</h2>
            </div>
          </div>

          <div className="feature-grid feature-grid--syns">
            {scenarioSnapshots.map((scenario) => (
              <article className="feature-card feature-card--syns" key={scenario.id}>
                <h3>{scenario.name}</h3>
                <p>{scenario.thesis}</p>
                <div className="lab-stat-row">
                  <span>
                    {scenario.activeNodes} active nodes / {Math.round(scenario.convergenceScore * 100)}% convergence
                  </span>
                  <strong>{Math.round(scenario.emergenceScore * 100)}%</strong>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="shell two-column two-column--syns">
          <article className="content-block">
            <span className="kicker">Traceability</span>
            <h2>Top node states from the current reference run</h2>
            <div className="stack-list stack-list--table">
              {diagnosticRun.nodeStates.map((nodeState) => (
                <div key={nodeState.node.id} className="trace-row">
                  <div>
                    <strong>{nodeState.node.name}</strong>
                    <p>{nodeState.node.focus.join(", ")}</p>
                  </div>
                  <div className="trace-row__meta">
                    <span>{nodeState.active ? "active" : "waiting"}</span>
                    <strong>{nodeState.score.toFixed(2)}</strong>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="content-block">
            <span className="kicker">Impact Ranking</span>
            <h2>Signals are ordered by score contribution, not by narrative preference</h2>
            <div className="stack-list stack-list--table">
              {diagnosticRun.signalImpacts.map((impact) => (
                <div key={impact.signal.id} className="trace-row">
                  <div>
                    <strong>{impact.signal.label}</strong>
                    <p>{impact.signal.summary}</p>
                  </div>
                  <div className="trace-row__meta">
                    <span>{impact.activeCaptures} captures</span>
                    <strong>{impact.totalScore.toFixed(2)}</strong>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
