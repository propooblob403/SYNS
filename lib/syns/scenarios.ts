import { EmergenceScenario, SynapticNode } from "@/lib/syns/types";

export const synapticNodes: SynapticNode[] = [
  {
    id: "node-liquidity",
    name: "Liquidity Sentinel",
    focus: ["liquidity", "momentum"],
    sensitivity: 1.15,
    threshold: 0.95,
    color: "#89f3ff"
  },
  {
    id: "node-wallet",
    name: "Wallet Drift Monitor",
    focus: ["wallets", "narrative"],
    sensitivity: 1.05,
    threshold: 0.88,
    color: "#d9fbff"
  },
  {
    id: "node-social",
    name: "Narrative Surface",
    focus: ["social", "narrative"],
    sensitivity: 1.1,
    threshold: 0.82,
    color: "#7ad9ff"
  },
  {
    id: "node-code",
    name: "Mutation Watch",
    focus: ["code", "narrative"],
    sensitivity: 0.96,
    threshold: 0.74,
    color: "#b8f7ff"
  },
  {
    id: "node-momentum",
    name: "Momentum Relay",
    focus: ["momentum", "liquidity"],
    sensitivity: 1.2,
    threshold: 1.02,
    color: "#99eeff"
  }
];

export const emergenceScenarios: EmergenceScenario[] = [
  {
    id: "scenario-narrative-ignition",
    slug: "narrative-ignition",
    name: "Narrative Ignition",
    thesis: "A cluster of weak but aligned market events condenses into a coherent meme-cycle signal.",
    summary:
      "This scenario shows how social acceleration, wallet rotation, and liquidity migration can reinforce one another before a narrative is obvious to a human operator.",
    tags: ["social", "wallets", "liquidity"],
    signals: [
      {
        id: "sig-001",
        timestamp: "2026-04-19T10:02:00.000Z",
        kind: "social_burst",
        source: "social",
        label: "social burst",
        summary: "A new phrase spreads across three Solana meme clusters within six minutes.",
        strength: 0.52,
        tags: ["meme", "velocity", "narrative"]
      },
      {
        id: "sig-002",
        timestamp: "2026-04-19T10:04:00.000Z",
        kind: "wallet_move",
        source: "onchain",
        label: "wallet move",
        summary: "A familiar early-rotation wallet fans into four fresh addresses.",
        strength: 0.67,
        tags: ["wallet", "rotation", "cluster"]
      },
      {
        id: "sig-003",
        timestamp: "2026-04-19T10:06:00.000Z",
        kind: "lp_shift",
        source: "onchain",
        label: "lp shift",
        summary: "Fresh liquidity appears in a narrow set of newly formed pools.",
        strength: 0.79,
        tags: ["liquidity", "pool", "migration"]
      },
      {
        id: "sig-004",
        timestamp: "2026-04-19T10:08:00.000Z",
        kind: "trade",
        source: "market",
        label: "trade",
        summary: "Buy pressure remains thin but persistent across the same cluster.",
        strength: 0.61,
        tags: ["momentum", "repeat", "pressure"]
      },
      {
        id: "sig-005",
        timestamp: "2026-04-19T10:09:00.000Z",
        kind: "volatility_spike",
        source: "market",
        label: "volatility spike",
        summary: "Volatility widens after alignment across social, wallet, and LP channels.",
        strength: 0.7,
        tags: ["threshold", "momentum", "convergence"]
      }
    ]
  },
  {
    id: "scenario-liquidity-fracture",
    slug: "liquidity-fracture",
    name: "Liquidity Fracture",
    thesis: "Distributed local disturbances escalate into a structural risk warning.",
    summary:
      "This scenario demonstrates how SYNS can interpret liquidity stress, wallet exits, and code mutation as one convergence pattern instead of unrelated anomalies.",
    tags: ["risk", "liquidity", "code"],
    signals: [
      {
        id: "sig-101",
        timestamp: "2026-04-19T11:00:00.000Z",
        kind: "lp_shift",
        source: "onchain",
        label: "lp shift",
        summary: "A primary pool loses depth while mirror pools remain unchanged.",
        strength: 0.76,
        tags: ["liquidity", "imbalance", "stress"]
      },
      {
        id: "sig-102",
        timestamp: "2026-04-19T11:02:00.000Z",
        kind: "wallet_move",
        source: "onchain",
        label: "wallet move",
        summary: "Three mid-size wallets exit along nearly identical timing bands.",
        strength: 0.63,
        tags: ["wallet", "exit", "coordination"]
      },
      {
        id: "sig-103",
        timestamp: "2026-04-19T11:05:00.000Z",
        kind: "code_update",
        source: "code",
        label: "code update",
        summary: "A deployment artifact changes fee routing logic without public explanation.",
        strength: 0.71,
        tags: ["mutation", "routing", "risk"]
      },
      {
        id: "sig-104",
        timestamp: "2026-04-19T11:07:00.000Z",
        kind: "trade",
        source: "market",
        label: "trade",
        summary: "Sell-side slippage increases despite moderate visible volume.",
        strength: 0.58,
        tags: ["slippage", "market", "pressure"]
      }
    ]
  },
  {
    id: "scenario-code-to-rotation",
    slug: "code-to-rotation",
    name: "Code-to-Rotation",
    thesis: "A quiet code mutation becomes the seed of a broader onchain rotation.",
    summary:
      "This scenario is useful for demoing that SYNS is not just a price watcher. Small code changes can propagate into behavioral and narrative shifts.",
    tags: ["code", "narrative", "rotation"],
    signals: [
      {
        id: "sig-201",
        timestamp: "2026-04-19T12:14:00.000Z",
        kind: "code_update",
        source: "code",
        label: "code update",
        summary: "A repository pushes a minor release touching referral and launch parameters.",
        strength: 0.49,
        tags: ["code", "release", "parameters"]
      },
      {
        id: "sig-202",
        timestamp: "2026-04-19T12:17:00.000Z",
        kind: "social_burst",
        source: "social",
        label: "social burst",
        summary: "Core community accounts begin framing the release as a broader unlock.",
        strength: 0.66,
        tags: ["social", "framing", "narrative"]
      },
      {
        id: "sig-203",
        timestamp: "2026-04-19T12:21:00.000Z",
        kind: "wallet_move",
        source: "onchain",
        label: "wallet move",
        summary: "Two strategy wallets re-enter pools tied to the same launch cluster.",
        strength: 0.62,
        tags: ["wallet", "return", "cluster"]
      },
      {
        id: "sig-204",
        timestamp: "2026-04-19T12:24:00.000Z",
        kind: "trade",
        source: "market",
        label: "trade",
        summary: "Price action remains shallow but starts to align with the same thesis.",
        strength: 0.55,
        tags: ["trade", "alignment", "momentum"]
      }
    ]
  }
];

export function getScenarioBySlug(slug: string) {
  return emergenceScenarios.find((scenario) => scenario.slug === slug);
}
