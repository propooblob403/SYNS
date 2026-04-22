import assert from "node:assert/strict";
import test from "node:test";

import { listScenarioSnapshots, simulateScenario } from "../lib/syns/engine";
import { emergenceScenarios, getScenarioBySlug } from "../lib/syns/scenarios";

test("listScenarioSnapshots exposes deterministic public summaries", () => {
  const snapshots = listScenarioSnapshots();

  assert.equal(snapshots.length, 3);
  assert.deepEqual(
    snapshots.map((snapshot) => ({
      slug: snapshot.slug,
      emergenceScore: snapshot.emergenceScore,
      convergenceScore: snapshot.convergenceScore,
      activeNodes: snapshot.activeNodes,
      emerged: snapshot.emerged,
      topNode: snapshot.topNode,
      topSignal: snapshot.topSignal
    })),
    [
      {
        slug: "narrative-ignition",
        emergenceScore: 1,
        convergenceScore: 1,
        activeNodes: 5,
        emerged: true,
        topNode: "Momentum Relay",
        topSignal: "lp shift"
      },
      {
        slug: "liquidity-fracture",
        emergenceScore: 0.99,
        convergenceScore: 1,
        activeNodes: 5,
        emerged: true,
        topNode: "Momentum Relay",
        topSignal: "code update"
      },
      {
        slug: "code-to-rotation",
        emergenceScore: 0.82,
        convergenceScore: 0.6,
        activeNodes: 3,
        emerged: true,
        topNode: "Narrative Surface",
        topSignal: "social burst"
      }
    ]
  );
});

test("simulateScenario stays pre-threshold when narrative ignition is truncated", () => {
  const scenario = getScenarioBySlug("narrative-ignition");

  assert.ok(scenario);

  const run = simulateScenario(scenario, { maxSignals: 2 });

  assert.equal(run.processedSignals.length, 2);
  assert.equal(run.snapshots.length, 2);
  assert.equal(run.emergenceScore, 0.53);
  assert.equal(run.convergenceScore, 0.6);
  assert.equal(run.emerged, false);
  assert.equal(run.activeNodes.length, 3);
  assert.equal(run.nodeStates[0]?.node.id, "node-social");
  assert.equal(run.signalImpacts[0]?.signal.id, "sig-002");
  assert.deepEqual(run.snapshots.at(-1), {
    step: 2,
    signal: scenario.signals[1],
    emergenceScore: 0.53,
    convergenceScore: 0.6,
    activeNodeIds: ["node-wallet", "node-social", "node-code"]
  });
});

test("full scenario runs remain deterministic across the current MVP library", () => {
  const expectations = new Map([
    [
      "narrative-ignition",
      {
        topNodeId: "node-momentum",
        topSignalId: "sig-003",
        activeNodeIds: ["node-liquidity", "node-wallet", "node-social", "node-code", "node-momentum"]
      }
    ],
    [
      "liquidity-fracture",
      {
        topNodeId: "node-momentum",
        topSignalId: "sig-103",
        activeNodeIds: ["node-liquidity", "node-wallet", "node-social", "node-code", "node-momentum"]
      }
    ],
    [
      "code-to-rotation",
      {
        topNodeId: "node-social",
        topSignalId: "sig-202",
        activeNodeIds: ["node-wallet", "node-social", "node-code"]
      }
    ]
  ]);

  for (const scenario of emergenceScenarios) {
    const run = simulateScenario(scenario);
    const expected = expectations.get(scenario.slug);

    assert.ok(expected);
    assert.equal(run.processedSignals.length, scenario.signals.length);
    assert.equal(run.snapshots.length, scenario.signals.length);
    assert.equal(run.nodeStates[0]?.node.id, expected.topNodeId);
    assert.equal(run.signalImpacts[0]?.signal.id, expected.topSignalId);
    assert.equal(run.activeNodes.length, expected.activeNodeIds.length);
    assert.deepEqual(run.snapshots.at(-1), {
      step: scenario.signals.length,
      signal: scenario.signals.at(-1),
      emergenceScore: run.emergenceScore,
      convergenceScore: run.convergenceScore,
      activeNodeIds: expected.activeNodeIds
    });
  }
});
