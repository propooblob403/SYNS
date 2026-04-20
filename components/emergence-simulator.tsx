"use client";

import { useEffect, useMemo, useState } from "react";

import { simulateScenario } from "@/lib/syns/engine";
import { emergenceScenarios, synapticNodes } from "@/lib/syns/scenarios";

const nodePositions: Record<string, { x: number; y: number }> = {
  "node-liquidity": { x: 86, y: 84 },
  "node-wallet": { x: 132, y: 42 },
  "node-social": { x: 248, y: 56 },
  "node-code": { x: 286, y: 122 },
  "node-momentum": { x: 180, y: 154 }
};

const nodeLinks = [
  ["node-liquidity", "node-wallet"],
  ["node-wallet", "node-social"],
  ["node-social", "node-code"],
  ["node-liquidity", "node-momentum"],
  ["node-momentum", "node-code"],
  ["node-wallet", "node-momentum"],
  ["node-social", "node-momentum"]
] as const;

type EmergenceSimulatorProps = {
  showInspector?: boolean;
};

export function EmergenceSimulator({ showInspector = true }: EmergenceSimulatorProps) {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [processedCount, setProcessedCount] = useState(1);
  const [autoplay, setAutoplay] = useState(true);

  const scenario = emergenceScenarios[scenarioIndex];
  const run = useMemo(() => simulateScenario(scenario, { maxSignals: processedCount }), [scenario, processedCount]);
  const currentSignal = run.processedSignals.at(-1) ?? scenario.signals[0];
  const topNode = run.nodeStates[0];
  const topSignal = run.signalImpacts[0];

  const phaseIndex =
    processedCount <= 1 ? 0 : processedCount < scenario.signals.length ? 1 : run.emerged ? 2 : 1;

  useEffect(() => {
    if (!autoplay) {
      return undefined;
    }

    const tick = window.setInterval(() => {
      setProcessedCount((current) => {
        if (current >= scenario.signals.length) {
          return 1;
        }

        return current + 1;
      });
    }, 1600);

    return () => window.clearInterval(tick);
  }, [autoplay, scenario.signals.length]);

  useEffect(() => {
    if (processedCount !== 1 || !autoplay) {
      return undefined;
    }

    const timeout = window.setTimeout(() => {
      setScenarioIndex((current) => (current + 1) % emergenceScenarios.length);
    }, 250);

    return () => window.clearTimeout(timeout);
  }, [autoplay, processedCount]);

  function selectScenario(nextIndex: number) {
    setScenarioIndex(nextIndex);
    setProcessedCount(1);
  }

  function stepForward() {
    setAutoplay(false);
    setProcessedCount((current) => Math.min(current + 1, scenario.signals.length));
  }

  function stepBackward() {
    setAutoplay(false);
    setProcessedCount((current) => Math.max(current - 1, 1));
  }

  function replay() {
    setProcessedCount(1);
  }

  return (
    <div className="simulator-card">
      <div className="simulator-card__top">
        <div>
          <span className="eyebrow">Live Scenario</span>
          <h3>{scenario.name}</h3>
          <p className="simulator-subtitle">{scenario.summary}</p>
        </div>
        <div className="toolbar-actions">
          <button className="button button--ghost button--small" type="button" onClick={stepBackward}>
            Step Back
          </button>
          <button className="button button--ghost button--small" type="button" onClick={stepForward}>
            Step Forward
          </button>
          <button className="button button--ghost button--small" type="button" onClick={() => setAutoplay((value) => !value)}>
            {autoplay ? "Pause Autoplay" : "Resume Autoplay"}
          </button>
          <button className="button button--primary button--small" type="button" onClick={replay}>
            Replay
          </button>
        </div>
      </div>

      <div className="simulator-scenario-tabs">
        {emergenceScenarios.map((item, index) => (
          <button
            key={item.id}
            className={index === scenarioIndex ? "chip chip--active" : "chip"}
            type="button"
            onClick={() => selectScenario(index)}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className="simulator-layout">
        <div className="simulator-panel">
          <svg viewBox="0 0 360 210" className="simulator-canvas" role="img" aria-label={`${scenario.name} emergence simulation`}>
            <defs>
              <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#f1ffff" stopOpacity="1" />
                <stop offset="55%" stopColor="#89f3ff" stopOpacity="0.65" />
                <stop offset="100%" stopColor="#89f3ff" stopOpacity="0" />
              </radialGradient>
            </defs>

            {nodeLinks.map(([from, to]) => {
              const left = nodePositions[from];
              const right = nodePositions[to];
              const active =
                run.nodeStates.find((nodeState) => nodeState.node.id === from)?.active &&
                run.nodeStates.find((nodeState) => nodeState.node.id === to)?.active;

              return (
                <line
                  key={`${from}-${to}`}
                  x1={left.x}
                  y1={left.y}
                  x2={right.x}
                  y2={right.y}
                  className={active ? "simulator-link simulator-link--active" : "simulator-link"}
                />
              );
            })}

            <circle cx="182" cy="104" r="18" fill="url(#coreGlow)" />
            <circle cx="182" cy="104" r="8" className={run.emerged ? "simulator-core simulator-core--active" : "simulator-core"} />

            {synapticNodes.map((node) => {
              const position = nodePositions[node.id];
              const state = run.nodeStates.find((item) => item.node.id === node.id);
              const active = state?.active;

              return (
                <g key={node.id}>
                  <line
                    x1={position.x}
                    y1={position.y}
                    x2="182"
                    y2="104"
                    className={active ? "simulator-link simulator-link--active" : "simulator-link"}
                  />
                  <circle
                    cx={position.x}
                    cy={position.y}
                    r={active ? 8 : 5}
                    className={active ? "simulator-node simulator-node--active" : "simulator-node"}
                  />
                </g>
              );
            })}
          </svg>

          <div className="simulator-feed">
            {scenario.signals.map((signal, index) => (
              <div key={signal.id} className={index < processedCount ? "signal-pill signal-pill--active" : "signal-pill"}>
                <span>{signal.label}</span>
                <strong>{Math.round(signal.strength * 100)}</strong>
              </div>
            ))}
          </div>

          <div className="simulator-current-signal">
            <span className="eyebrow">
              Signal {processedCount}/{scenario.signals.length}
            </span>
            <strong>{currentSignal.label}</strong>
            <p>{currentSignal.summary}</p>
          </div>
        </div>

        <div className="simulator-copy">
          <p className="simulator-thesis">{scenario.thesis}</p>

          <div className="simulator-phase-list">
            <div className={phaseIndex === 0 ? "simulator-phase simulator-phase--current" : "simulator-phase"}>
              <span className="eyebrow">01</span>
              <strong>Fragmented impulses</strong>
              <p>Signals appear as weak local events across independent market surfaces.</p>
            </div>
            <div className={phaseIndex === 1 ? "simulator-phase simulator-phase--current" : "simulator-phase"}>
              <span className="eyebrow">02</span>
              <strong>Adaptive weighting</strong>
              <p>Nodes reinforce useful patterns while irrelevant activity fades below threshold.</p>
            </div>
            <div className={phaseIndex === 2 ? "simulator-phase simulator-phase--current" : "simulator-phase"}>
              <span className="eyebrow">03</span>
              <strong>Swarm emergence</strong>
              <p>Aligned node activity condenses into an interpretable protocol-level signal.</p>
            </div>
          </div>

          <div className="simulator-stats">
            <div>
              <span className="eyebrow">Emergence Score</span>
              <strong>{Math.round(run.emergenceScore * 100)}%</strong>
            </div>
            <div>
              <span className="eyebrow">Convergence</span>
              <strong>{Math.round(run.convergenceScore * 100)}%</strong>
            </div>
            <div>
              <span className="eyebrow">Active Nodes</span>
              <strong>{run.activeNodes.length}</strong>
            </div>
          </div>

          <p className={run.emerged ? "simulator-verdict simulator-verdict--active" : "simulator-verdict"}>{run.verdict}</p>
        </div>
      </div>

      {showInspector ? (
        <div className="simulator-inspector">
          <article className="simulator-detail-card">
            <span className="eyebrow">Node Trace</span>
            <h4>{topNode?.node.name ?? "No node activity yet"}</h4>
            <p>
              {topNode
                ? `${topNode.captures.length} captures, score ${topNode.score.toFixed(2)}, threshold ${topNode.node.threshold.toFixed(2)}`
                : "Step forward to inspect node capture behavior."}
            </p>
          </article>

          <article className="simulator-detail-card">
            <span className="eyebrow">Signal Impact</span>
            <h4>{topSignal?.signal.label ?? "No signal impact yet"}</h4>
            <p>
              {topSignal
                ? `${topSignal.activeCaptures} active captures contributed ${topSignal.totalScore.toFixed(2)} score.`
                : "No signal has crossed the minimum capture threshold yet."}
            </p>
          </article>
        </div>
      ) : null}
    </div>
  );
}
