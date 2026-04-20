export type SignalKind =
  | "trade"
  | "wallet_move"
  | "lp_shift"
  | "social_burst"
  | "code_update"
  | "volatility_spike";

export type SignalSource = "onchain" | "social" | "code" | "market";

export type NodeFocus =
  | "liquidity"
  | "wallets"
  | "social"
  | "code"
  | "momentum"
  | "narrative";

export type SignalEvent = {
  id: string;
  timestamp: string;
  kind: SignalKind;
  source: SignalSource;
  label: string;
  summary: string;
  strength: number;
  tags: string[];
};

export type SynapticNode = {
  id: string;
  name: string;
  focus: NodeFocus[];
  sensitivity: number;
  threshold: number;
  color: string;
};

export type CaptureEvent = {
  signalId: string;
  nodeId: string;
  score: number;
  matchScore: number;
};

export type NodeState = {
  node: SynapticNode;
  score: number;
  captures: CaptureEvent[];
  active: boolean;
};

export type SignalImpact = {
  signal: SignalEvent;
  totalScore: number;
  activeCaptures: number;
};

export type EmergenceSnapshot = {
  step: number;
  signal: SignalEvent;
  emergenceScore: number;
  convergenceScore: number;
  activeNodeIds: string[];
};

export type EmergenceScenario = {
  id: string;
  slug: string;
  name: string;
  thesis: string;
  summary: string;
  tags: string[];
  signals: SignalEvent[];
};

export type EmergenceRun = {
  scenario: EmergenceScenario;
  processedSignals: SignalEvent[];
  nodeStates: NodeState[];
  activeNodes: SynapticNode[];
  signalImpacts: SignalImpact[];
  snapshots: EmergenceSnapshot[];
  emergenceScore: number;
  convergenceScore: number;
  emerged: boolean;
  verdict: string;
};
