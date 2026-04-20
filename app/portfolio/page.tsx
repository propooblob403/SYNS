"use client";

import { useMemo } from "react";

import { useAccount } from "@/components/account-provider";
import { getMarketById } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

export default function PortfolioPage() {
  const { account, wallet, claimWinnings, closePosition, connectWallet, disconnectWallet, resetDemoAccount } =
    useAccount();

  const openPositions = account.positions.filter((position) => !position.claimed && !position.claimable);
  const claimablePositions = account.positions.filter((position) => position.claimable && !position.claimed);

  const portfolioValue = useMemo(() => {
    const positionsValue = openPositions.reduce((total, position) => {
      const market = getMarketById(position.marketId);
      if (!market) return total;
      const mark = position.outcome === "YES" ? market.yesPrice : market.noPrice;
      return total + position.shares * mark;
    }, 0);

    return account.usdcBalance + positionsValue;
  }, [account.usdcBalance, openPositions]);

  return (
    <section className="section page-shell">
      <div className="shell">
        <div className="section-heading">
          <div>
            <span className="kicker">Portfolio</span>
            <h1 className="page-title">Track positions, claims, and account momentum</h1>
          </div>
          <div className="toolbar-actions">
            {wallet.connected ? (
              <button className="button button--ghost" onClick={disconnectWallet} type="button">
                Disconnect
              </button>
            ) : (
              <button className="button button--primary" onClick={connectWallet} type="button">
                Connect Wallet
              </button>
            )}
            <button className="button button--ghost" onClick={resetDemoAccount} type="button">
              Reset Demo
            </button>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <span className="eyebrow">Portfolio value</span>
            <strong>{formatCurrency(portfolioValue)}</strong>
          </div>
          <div className="stat-card">
            <span className="eyebrow">USDC balance</span>
            <strong>{formatCurrency(account.usdcBalance)}</strong>
          </div>
          <div className="stat-card">
            <span className="eyebrow">SYNS balance</span>
            <strong>{account.synsBalance.toLocaleString()}</strong>
          </div>
          <div className="stat-card">
            <span className="eyebrow">Reward points</span>
            <strong>{account.points.toLocaleString()}</strong>
          </div>
          <div className="stat-card">
            <span className="eyebrow">Wallet status</span>
            <strong>{wallet.connected ? "Connected" : "Offline"}</strong>
          </div>
        </div>

        <div className="two-column">
          <div className="content-block">
            <h2>Open positions</h2>
            <div className="stack-list">
              {openPositions.map((position) => {
                const market = getMarketById(position.marketId);
                if (!market) return null;
                return (
                  <div className="row-card" key={`${position.marketId}-${position.outcome}`}>
                    <div>
                      <strong>{market.title}</strong>
                      <p>
                        {position.outcome} / {position.shares.toFixed(2)} shares / Avg{" "}
                        {Math.round(position.avgPrice * 100)}c
                      </p>
                    </div>
                    <button
                      className="button button--ghost"
                      onClick={() => closePosition(position.marketId, position.outcome)}
                      type="button"
                    >
                      Close
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="content-block">
            <h2>Claimable winnings</h2>
            <div className="stack-list">
              {claimablePositions.length === 0 ? (
                <p className="empty-state">No claimable markets yet.</p>
              ) : (
                claimablePositions.map((position) => {
                  const market = getMarketById(position.marketId);
                  if (!market) return null;
                  return (
                    <div className="row-card" key={position.marketId}>
                      <div>
                        <strong>{market.title}</strong>
                        <p>{position.shares.toFixed(2)} winning shares / Resolution {market.resolution}</p>
                      </div>
                      <button
                        className="button button--primary"
                        onClick={() => claimWinnings(position.marketId)}
                        type="button"
                      >
                        Claim
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        <div className="content-block">
          <h2>Recent activity</h2>
          <div className="stack-list">
            {account.activity.map((item) => (
              <div className="row-card" key={item.id}>
                <div>
                  <strong>{item.label}</strong>
                  <p>{item.detail}</p>
                </div>
                <div className="row-card__meta">
                  <strong>{item.amount}</strong>
                  <span>{new Date(item.timestamp).toLocaleString("en-US")}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
