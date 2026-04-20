import { emergenceScenarios, synapticNodes } from "@/lib/syns/scenarios";
import {
  CaptureEvent,
  EmergenceRun,
  EmergenceScenario,
  EmergenceSnapshot,
  NodeState,
  SignalEvent,
  SignalImpact,
  SynapticNode
} from "@/lib/syns/types";

const focusMap: Record<string, string[]> = {
  trade: ["momentum", "liquidity"],
  wallet_move: ["wallets", "narrative"],
  lp_shift: ["liquidity", "momentum"],
  social_burst: ["social", "narrative"],
  code_update: ["code", "narrative"],
  volatility_spike: ["momentum", "liquidity"]
};

function round(value: number) {
  return Math.round(value * 100) / 100;
}

function getSignalMatch(node: SynapticNode, signal: SignalEvent) {
  const focuses = focusMap[signal.kind] ?? [];
  const overlap = node.focus.filter((item) => focuses.includes(item)).length;
  const overlapScore = overlap === 0 ? 0.18 : 0.72 + overlap * 0.2;
  const narrativeBonus = signal.tags.includes("narrative") && node.focus.includes("narrative") ? 0.12 : 0;

  return overlapScore + narrativeBonus;
}

function createNodeState(node: SynapticNode): NodeState {
  return {
    node,
    score: 0,
    captures: [],
    active: false
  };
}

function projectNodeStates(states: Map<string, NodeState>) {
  return Array.from(states.values()).map((state) => ({
    ...state,
    score: round(state.score),
    active: round(state.score) >= state.node.threshold
  }));
}

function summarizeSnapshots(
  states: Map<string, NodeState>,
  signal: SignalEvent,
  step: number,
  nodeCount: number
): EmergenceSnapshot {
  const projected = projectNodeStates(states);
  const activeNodeIds = projected.filter((state) => state.active).map((state) => state.node.id);
  const nodeScore = projected.reduce((sum, state) => sum + state.score, 0);
  const convergenceScore = round(activeNodeIds.length / nodeCount);
  const emergenceScore = round(Math.min(1, nodeScore / (nodeCount * 1.55)) * 0.7 + convergenceScore * 0.3);

  return {
    step,
    signal,
    emergenceScore,
    convergenceScore,
    activeNodeIds
  };
}

export function simulateScenario(
  scenario: EmergenceScenario,
  options?: {
    maxSignals?: number;
    nodes?: SynapticNode[];
  }
): EmergenceRun {
  const nodes = options?.nodes ?? synapticNodes;
  const processedSignals =
    typeof options?.maxSignals === "number" ? scenario.signals.slice(0, options.maxSignals) : scenario.signals;

  const nodeStates = new Map<string, NodeState>(nodes.map((node) => [node.id, createNodeState(node)]));
  const signalImpacts = new Map<string, SignalImpact>();
  const snapshots: EmergenceSnapshot[] = [];

  processedSignals.forEach((signal, index) => {
    signalImpacts.set(signal.id, {
      signal,
      totalScore: 0,
      activeCaptures: 0
    });

    nodes.forEach((node) => {
      const state = nodeStates.get(node.id);
      const impact = signalImpacts.get(signal.id);

      if (!state || !impact) {
        return;
      }

      const matchScore = getSignalMatch(node, signal);
      const score = signal.strength * node.sensitivity * matchScore;

      if (score < 0.35) {
        return;
      }

      const capture: CaptureEvent = {
        signalId: signal.id,
        nodeId: node.id,
        score: round(score),
        matchScore: round(matchScore)
      };

      state.score = round(state.score + score);
      state.captures.push(capture);
      impact.totalScore = round(impact.totalScore + score);
      impact.activeCaptures += 1;
    });

    snapshots.push(summarizeSnapshots(nodeStates, signal, index + 1, nodes.length));
  });

  const orderedNodeStates = projectNodeStates(nodeStates).sort((left, right) => right.score - left.score);
  const activeNodes = orderedNodeStates.filter((state) => state.active).map((state) => state.node);
  const latestSnapshot = snapshots.at(-1);
  const convergenceScore = latestSnapshot?.convergenceScore ?? 0;
  const emergenceScore = latestSnapshot?.emergenceScore ?? 0;
  const emerged = emergenceScore >= 0.68 && activeNodes.length >= 3;

  const verdict = emerged
    ? "Emergent signal detected through aligned multi-node activity."
    : "Signal field remains pre-threshold; more aligned evidence is required.";

  return {
    scenario,
    processedSignals,
    nodeStates: orderedNodeStates,
    activeNodes,
    signalImpacts: Array.from(signalImpacts.values()).sort((left, right) => right.totalScore - left.totalScore),
    snapshots,
    emergenceScore,
    convergenceScore,
    emerged,
    verdict
  };
}

export function listScenarioSnapshots() {
  return emergenceScenarios.map((scenario) => {
    const run = simulateScenario(scenario);

    return {
      id: scenario.id,
      slug: scenario.slug,
      name: scenario.name,
      thesis: scenario.thesis,
      tags: scenario.tags,
      emergenceScore: run.emergenceScore,
      convergenceScore: run.convergenceScore,
      activeNodes: run.activeNodes.length,
      emerged: run.emerged,
      topNode: run.nodeStates[0]?.node.name ?? null,
      topSignal: run.signalImpacts[0]?.signal.label ?? null
    };
  });
}
