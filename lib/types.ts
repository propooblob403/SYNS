export type MarketStatus = "open" | "awaiting_resolution" | "resolved";

export type Outcome = "YES" | "NO";

export type Market = {
  id: string;
  slug: string;
  category: string;
  title: string;
  subtitle: string;
  status: MarketStatus;
  yesPrice: number;
  noPrice: number;
  volume: number;
  openInterest: number;
  traders: number;
  resolveAt: string;
  closeAt: string;
  source: string;
  rule: string;
  fallback: string;
  resolution?: Outcome;
  highlights: string[];
};

export type Position = {
  marketId: string;
  outcome: Outcome;
  shares: number;
  avgPrice: number;
  claimable?: boolean;
  claimed?: boolean;
};

export type ActivityItem = {
  id: string;
  label: string;
  detail: string;
  amount: string;
  timestamp: string;
};

export type AccountState = {
  usdcBalance: number;
  synsBalance: number;
  points: number;
  positions: Position[];
  activity: ActivityItem[];
};

export type WalletState = {
  connected: boolean;
  address: string | null;
  label: string;
};

export type DemoSession = {
  account: AccountState;
  wallet: WalletState;
};
