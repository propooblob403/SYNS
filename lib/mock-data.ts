import { AccountState, DemoSession, Market } from "@/lib/types";

export const markets: Market[] = [
  {
    id: "fed-apr-2026",
    slug: "fed-holds-rates-april-2026",
    category: "Macro",
    title: "Will the Fed hold rates steady on April 29, 2026?",
    subtitle:
      "Resolves YES if the Federal Reserve keeps the target range at 3.50%-3.75% after the April meeting.",
    status: "open",
    yesPrice: 0.72,
    noPrice: 0.28,
    volume: 1800000,
    openInterest: 456000,
    traders: 4219,
    resolveAt: "2026-04-29T18:00:00.000Z",
    closeAt: "2026-04-29T17:55:00.000Z",
    source: "Federal Reserve FOMC statement",
    rule:
      "This market resolves YES if the FOMC statement published on April 29, 2026 shows the federal funds target range remains 3.50%-3.75%. Otherwise, it resolves NO.",
    fallback:
      "If the statement is delayed, the first formal statement published on the official Federal Reserve website will be used.",
    highlights: ["Hot macro event", "Tight spread", "Clear official source"]
  },
  {
    id: "ecb-apr-2026",
    slug: "ecb-keeps-rates-april-2026",
    category: "Macro",
    title: "Will the ECB keep rates unchanged on April 30, 2026?",
    subtitle:
      "Resolves YES if all three ECB key policy rates remain unchanged after the April decision.",
    status: "open",
    yesPrice: 0.64,
    noPrice: 0.36,
    volume: 940000,
    openInterest: 281000,
    traders: 2104,
    resolveAt: "2026-04-30T12:15:00.000Z",
    closeAt: "2026-04-30T12:10:00.000Z",
    source: "ECB monetary policy decision",
    rule:
      "This market resolves YES if the ECB leaves the main refinancing rate, marginal lending rate, and deposit facility rate unchanged on April 30, 2026. Any change to any of the three rates resolves NO.",
    fallback:
      "If the primary ECB press release is unavailable, the ECB website's official rate publication will be used.",
    highlights: ["Official rate decision", "Low ambiguity", "Macro traders active"]
  },
  {
    id: "gdp-q1-2026",
    slug: "us-q1-gdp-above-1-percent",
    category: "Macro",
    title: "Will U.S. Q1 2026 GDP growth come in above 1.0%?",
    subtitle:
      "Resolves YES if the BEA advance estimate for Q1 2026 real GDP growth is greater than 1.0%.",
    status: "open",
    yesPrice: 0.41,
    noPrice: 0.59,
    volume: 630000,
    openInterest: 179000,
    traders: 1587,
    resolveAt: "2026-04-30T12:30:00.000Z",
    closeAt: "2026-04-30T12:25:00.000Z",
    source: "BEA Gross Domestic Product, Advance Estimate",
    rule:
      "This market resolves YES if the BEA advance estimate for real GDP growth in Q1 2026 is greater than 1.0%. A published value of exactly 1.0% resolves NO.",
    fallback:
      "Only the first BEA advance estimate counts. Revisions are ignored unless the advance release is formally corrected by BEA.",
    highlights: ["Growth-sensitive", "GDP release", "High volatility"]
  },
  {
    id: "core-pce-mar-2026",
    slug: "march-2026-core-pce-above-3-percent",
    category: "Inflation",
    title: "Will March 2026 core PCE exceed 3.0%?",
    subtitle:
      "Resolves YES if annual core PCE inflation published on April 30, 2026 is above 3.0%.",
    status: "open",
    yesPrice: 0.53,
    noPrice: 0.47,
    volume: 710000,
    openInterest: 204000,
    traders: 1934,
    resolveAt: "2026-04-30T12:30:00.000Z",
    closeAt: "2026-04-30T12:25:00.000Z",
    source: "BEA Personal Income and Outlays",
    rule:
      "This market resolves YES if the March 2026 year-over-year Core PCE reading published by BEA is greater than 3.0%. A reading of exactly 3.0% resolves NO.",
    fallback:
      "If the release is inaccessible, BEA's mirrored release pages or PDFs may be used. If the figure is unavailable, the market is invalid.",
    highlights: ["Inflation-sensitive", "Rate-cut implications", "Strong trader interest"]
  },
  {
    id: "msft-q3-2026",
    slug: "microsoft-revenue-above-82b-april-2026",
    category: "Earnings",
    title: "Will Microsoft revenue top $82B on April 29, 2026?",
    subtitle:
      "Resolves YES if Microsoft reports quarterly revenue above $82.0 billion in its earnings release.",
    status: "open",
    yesPrice: 0.57,
    noPrice: 0.43,
    volume: 820000,
    openInterest: 231000,
    traders: 2488,
    resolveAt: "2026-04-29T20:05:00.000Z",
    closeAt: "2026-04-29T19:59:00.000Z",
    source: "Microsoft Investor Relations earnings release",
    rule:
      "This market resolves YES if Microsoft's reported quarterly revenue exceeds $82.0 billion on April 29, 2026. A reported value of exactly $82.0 billion resolves NO.",
    fallback:
      "Only Microsoft's official earnings materials count. If revenue is materially restated within the same release package, the headline reported figure is used.",
    highlights: ["Large-cap earnings", "AI narrative", "Clear threshold"]
  },
  {
    id: "meta-q1-2026",
    slug: "meta-revenue-above-55b-april-2026",
    category: "Earnings",
    title: "Will Meta revenue top $55B on April 29, 2026?",
    subtitle:
      "Resolves YES if Meta reports quarterly revenue above $55.0 billion in its official earnings release.",
    status: "open",
    yesPrice: 0.49,
    noPrice: 0.51,
    volume: 540000,
    openInterest: 167000,
    traders: 1722,
    resolveAt: "2026-04-29T20:10:00.000Z",
    closeAt: "2026-04-29T19:59:00.000Z",
    source: "Meta Investor Relations earnings release",
    rule:
      "This market resolves YES if Meta reports quarterly revenue greater than $55.0 billion in the April 29, 2026 earnings release. A reported value of exactly $55.0 billion resolves NO.",
    fallback:
      "Only Meta's official investor relations materials count. If no clear revenue figure is published, the market is invalid.",
    highlights: ["Guidance watch", "Ad market proxy", "Fast resolution"]
  },
  {
    id: "nfp-apr-2026",
    slug: "april-2026-nonfarm-payrolls-above-150k",
    category: "Jobs",
    title: "Will U.S. April 2026 payrolls beat 150K?",
    subtitle:
      "Resolves YES if nonfarm payroll growth published on May 8, 2026 is above 150,000.",
    status: "open",
    yesPrice: 0.55,
    noPrice: 0.45,
    volume: 690000,
    openInterest: 186000,
    traders: 1461,
    resolveAt: "2026-05-08T12:30:00.000Z",
    closeAt: "2026-05-08T12:25:00.000Z",
    source: "BLS Employment Situation",
    rule:
      "This market resolves YES if the headline nonfarm payrolls figure for April 2026 published by BLS is greater than 150,000. A figure of exactly 150,000 resolves NO.",
    fallback:
      "Only the first official BLS release counts. Revisions do not alter resolution unless the original release is formally corrected.",
    highlights: ["Payrolls day", "High volume", "Macro momentum"]
  },
  {
    id: "cpi-apr-2026",
    slug: "april-2026-cpi-above-3-percent",
    category: "Inflation",
    title: "Will April 2026 CPI exceed 3.0%?",
    subtitle:
      "Resolves YES if annual CPI inflation published on May 12, 2026 is above 3.0%.",
    status: "open",
    yesPrice: 0.44,
    noPrice: 0.56,
    volume: 510000,
    openInterest: 142000,
    traders: 1302,
    resolveAt: "2026-05-12T12:30:00.000Z",
    closeAt: "2026-05-12T12:25:00.000Z",
    source: "BLS Consumer Price Index",
    rule:
      "This market resolves YES if the year-over-year CPI reading for April 2026 is greater than 3.0%. A reading of exactly 3.0% resolves NO.",
    fallback:
      "Only the official BLS CPI release counts. If the release is inaccessible and no official mirrored publication is available, the market is invalid.",
    highlights: ["Inflation print", "Rates sensitivity", "Binary setup"]
  },
  {
    id: "sol-300",
    slug: "sol-above-300-by-june-2026",
    category: "Crypto",
    title: "Did SOL close above $300 by June 30, 2026?",
    subtitle:
      "Resolves YES if the official settlement source records a closing price above $300.00 on June 30, 2026 UTC.",
    status: "resolved",
    yesPrice: 1,
    noPrice: 0,
    volume: 2200000,
    openInterest: 0,
    traders: 6128,
    resolveAt: "2026-06-30T23:59:00.000Z",
    closeAt: "2026-06-30T23:55:00.000Z",
    source: "Protocol-approved SOL/USD closing reference",
    rule:
      "This market resolves YES if SOL/USD closes above $300.00 on June 30, 2026 UTC according to the protocol-approved settlement source.",
    fallback:
      "If the primary source is unavailable, the fallback source specified in the market rules applies.",
    resolution: "YES",
    highlights: ["Resolved market", "Claimable example", "Demonstrates payout flow"]
  },
  {
    id: "amzn-post-earnings",
    slug: "amazon-closes-higher-april-30-2026",
    category: "Earnings",
    title: "Will Amazon close higher on April 30, 2026 after earnings?",
    subtitle:
      "Resolves YES if AMZN closes above its April 29, 2026 official regular-session close.",
    status: "awaiting_resolution",
    yesPrice: 0.61,
    noPrice: 0.39,
    volume: 470000,
    openInterest: 154000,
    traders: 1188,
    resolveAt: "2026-04-30T20:00:00.000Z",
    closeAt: "2026-04-30T13:30:00.000Z",
    source: "NASDAQ official market data",
    rule:
      "This market resolves YES if Amazon's April 30, 2026 regular-session closing price is greater than its April 29, 2026 regular-session closing price. If it is equal or lower, the market resolves NO.",
    fallback:
      "Only the official closing data from the designated primary exchange or its official market data source will be used.",
    highlights: ["Awaiting resolution", "Post-earnings move", "Price-based settlement"]
  }
];

export const initialAccount: AccountState = {
  usdcBalance: 4200,
  synsBalance: 12500,
  points: 8420,
  positions: [
    {
      marketId: "fed-apr-2026",
      outcome: "YES",
      shares: 425,
      avgPrice: 0.68
    },
    {
      marketId: "msft-q3-2026",
      outcome: "NO",
      shares: 210,
      avgPrice: 0.4
    },
    {
      marketId: "sol-300",
      outcome: "YES",
      shares: 180,
      avgPrice: 0.62,
      claimable: true,
      claimed: false
    }
  ],
  activity: [
    {
      id: "a1",
      label: "Bought YES",
      detail: "Fed Holds Rates in April",
      amount: "-$289.00",
      timestamp: "2026-04-18T06:42:00.000Z"
    },
    {
      id: "a2",
      label: "Reward update",
      detail: "SYNS weekly signal incentive",
      amount: "+420 SYNS",
      timestamp: "2026-04-17T14:12:00.000Z"
    },
    {
      id: "a3",
      label: "Claim available",
      detail: "SOL above $300 by June 30, 2026",
      amount: "180 shares",
      timestamp: "2026-04-17T10:20:00.000Z"
    }
  ]
};

export const featuredMarkets = markets.filter((market) => market.status === "open").slice(0, 6);

export const initialDemoSession: DemoSession = {
  account: initialAccount,
  wallet: {
    connected: false,
    address: null,
    label: "Not connected"
  }
};

export function getMarketBySlug(slug: string) {
  return markets.find((market) => market.slug === slug);
}

export function getMarketById(id: string) {
  return markets.find((market) => market.id === id);
}
