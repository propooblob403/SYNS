"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

import { getMarketById, initialAccount, initialDemoSession } from "@/lib/mock-data";
import { AccountState, DemoSession, Outcome, WalletState } from "@/lib/types";

type TradeInput = {
  marketId: string;
  outcome: Outcome;
  amountUsd: number;
};

type AccountContextValue = {
  account: AccountState;
  wallet: WalletState;
  connectWallet: () => void;
  disconnectWallet: () => void;
  resetDemoAccount: () => void;
  buyShares: (input: TradeInput) => { ok: boolean; message: string };
  closePosition: (marketId: string, outcome: Outcome) => { ok: boolean; message: string };
  claimWinnings: (marketId: string) => { ok: boolean; message: string };
};

const STORAGE_KEY = "syns-mvp-account";

const AccountContext = createContext<AccountContextValue | null>(null);

function pushActivity(account: AccountState, label: string, detail: string, amount: string): AccountState {
  return {
    ...account,
    activity: [
      {
        id: `${label}-${Date.now()}`,
        label,
        detail,
        amount,
        timestamp: new Date().toISOString()
      },
      ...account.activity
    ].slice(0, 10)
  };
}

function createMockWalletState(): WalletState {
  return {
    connected: true,
    address: "SYN5x3P9qLm2Aa8YtV6pK1cN4sR8uW2",
    label: "Demo wallet connected"
  };
}

export function AccountProvider({ children }: { children: React.ReactNode }) {
  const [account, setAccount] = useState<AccountState>(initialAccount);
  const [wallet, setWallet] = useState<WalletState>(initialDemoSession.wallet);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as DemoSession | AccountState;

        if ("account" in parsed && "wallet" in parsed) {
          setAccount(parsed.account);
          setWallet(parsed.wallet);
          return;
        }

        setAccount(parsed as AccountState);
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    const session: DemoSession = {
      account,
      wallet
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  }, [account, wallet]);

  const value = useMemo<AccountContextValue>(
    () => ({
      account,
      wallet,
      connectWallet: () => {
        setWallet(createMockWalletState());
      },
      disconnectWallet: () => {
        setWallet(initialDemoSession.wallet);
      },
      resetDemoAccount: () => {
        setAccount(initialDemoSession.account);
        setWallet(initialDemoSession.wallet);
      },
      buyShares: ({ marketId, outcome, amountUsd }) => {
        if (!wallet.connected) {
          return { ok: false, message: "Connect a wallet before placing a trade." };
        }

        const market = getMarketById(marketId);
        if (!market || market.status !== "open") {
          return { ok: false, message: "This market is not open for trading." };
        }

        if (amountUsd <= 0) {
          return { ok: false, message: "Enter a valid trade amount." };
        }

        if (amountUsd > account.usdcBalance) {
          return { ok: false, message: "Insufficient USDC balance." };
        }

        const price = outcome === "YES" ? market.yesPrice : market.noPrice;
        const shares = amountUsd / price;

        setAccount((current) => {
          const positions = [...current.positions];
          const positionIndex = positions.findIndex(
            (item) => item.marketId === marketId && item.outcome === outcome && !item.claimed
          );

          if (positionIndex >= 0) {
            const existing = positions[positionIndex];
            const totalCost = existing.avgPrice * existing.shares + amountUsd;
            const totalShares = existing.shares + shares;
            positions[positionIndex] = {
              ...existing,
              shares: totalShares,
              avgPrice: totalCost / totalShares
            };
          } else {
            positions.push({
              marketId,
              outcome,
              shares,
              avgPrice: price
            });
          }

          const updated = {
            ...current,
            usdcBalance: current.usdcBalance - amountUsd,
            points: current.points + Math.round(amountUsd * 4),
            positions
          };

          return pushActivity(
            updated,
            `Bought ${outcome}`,
            market.title,
            `-${new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD"
            }).format(amountUsd)}`
          );
        });

        return { ok: true, message: `Bought ${outcome} shares successfully.` };
      },
      closePosition: (marketId, outcome) => {
        if (!wallet.connected) {
          return { ok: false, message: "Connect a wallet before managing positions." };
        }

        const market = getMarketById(marketId);
        const position = account.positions.find(
          (item) => item.marketId === marketId && item.outcome === outcome && !item.claimed
        );

        if (!market || !position) {
          return { ok: false, message: "Position not found." };
        }

        if (market.status !== "open") {
          return { ok: false, message: "Only open markets can be closed in the MVP." };
        }

        const price = outcome === "YES" ? market.yesPrice : market.noPrice;
        const proceeds = price * position.shares;

        setAccount((current) => {
          const positions = current.positions.filter(
            (item) => !(item.marketId === marketId && item.outcome === outcome && !item.claimed)
          );
          const updated = {
            ...current,
            usdcBalance: current.usdcBalance + proceeds,
            positions
          };

          return pushActivity(
            updated,
            `Closed ${outcome}`,
            market.title,
            `+${new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD"
            }).format(proceeds)}`
          );
        });

        return { ok: true, message: "Position closed." };
      },
      claimWinnings: (marketId) => {
        if (!wallet.connected) {
          return { ok: false, message: "Connect a wallet before claiming winnings." };
        }

        const market = getMarketById(marketId);
        const position = account.positions.find(
          (item) => item.marketId === marketId && item.claimable && !item.claimed
        );

        if (!market || !position || market.status !== "resolved" || market.resolution !== position.outcome) {
          return { ok: false, message: "No claimable winnings found." };
        }

        const payout = position.shares;

        setAccount((current) => {
          const positions = current.positions.map((item) =>
            item.marketId === marketId && item.outcome === position.outcome
              ? { ...item, claimed: true, claimable: false }
              : item
          );
          const updated = {
            ...current,
            usdcBalance: current.usdcBalance + payout,
            positions
          };

          return pushActivity(
            updated,
            "Claimed winnings",
            market.title,
            `+${new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD"
            }).format(payout)}`
          );
        });

        return { ok: true, message: "Winnings claimed." };
      }
    }),
    [account, wallet]
  );

  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
}

export function useAccount() {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useAccount must be used inside AccountProvider");
  }

  return context;
}
