"use client";

import { useMemo, useState } from "react";

import { useAccount } from "@/components/account-provider";
import { Market, Outcome } from "@/lib/types";
import { formatCents, formatCurrency, formatPercentFromPrice } from "@/lib/utils";

const QUICK_AMOUNTS = [25, 100, 250];

export function TradePanel({ market }: { market: Market }) {
  const { account, wallet, buyShares, claimWinnings, closePosition, connectWallet } = useAccount();
  const [outcome, setOutcome] = useState<Outcome>("YES");
  const [amount, setAmount] = useState("100");
  const [message, setMessage] = useState<string | null>(null);

  const numericAmount = Number(amount) || 0;
  const price = outcome === "YES" ? market.yesPrice : market.noPrice;
  const shares = numericAmount > 0 ? numericAmount / price : 0;
  const potentialPayout = shares;
  const potentialProfit = potentialPayout - numericAmount;

  const disabled = market.status !== "open";
  const positions = account.positions.filter(
    (item) => item.marketId === market.id && !item.claimed
  );

  const summary = useMemo(
    () => ({
      price: formatCents(price),
      probability: formatPercentFromPrice(price),
      shares: shares.toFixed(2),
      payout: formatCurrency(potentialPayout),
      profit: `${potentialProfit >= 0 ? "+" : ""}${formatCurrency(potentialProfit)}`
    }),
    [potentialPayout, potentialProfit, price, shares]
  );

  return (
    <aside className="trade-panel">
      <div className="trade-panel__header">
        <div>
          <span className="eyebrow">Wallet Balance</span>
          <strong>{formatCurrency(account.usdcBalance)}</strong>
        </div>
        <div>
          <span className="eyebrow">Wallet Status</span>
          <strong>{wallet.connected ? "Connected" : "Not connected"}</strong>
        </div>
      </div>

      <div className="trade-switch">
        <button
          className={outcome === "YES" ? "active active--yes" : ""}
          onClick={() => setOutcome("YES")}
          type="button"
        >
          YES {formatCents(market.yesPrice)}
        </button>
        <button
          className={outcome === "NO" ? "active active--no" : ""}
          onClick={() => setOutcome("NO")}
          type="button"
        >
          NO {formatCents(market.noPrice)}
        </button>
      </div>

      <label className="input-group">
        <span className="eyebrow">Trade Amount (USDC)</span>
        <input
          max={account.usdcBalance}
          min="0"
          onChange={(event) => setAmount(event.target.value)}
          step="1"
          type="number"
          value={amount}
        />
      </label>

      <div className="quick-actions">
        {QUICK_AMOUNTS.map((preset) => (
          <button
            className="button button--ghost button--small"
            key={preset}
            onClick={() => setAmount(String(preset))}
            type="button"
          >
            ${preset}
          </button>
        ))}
        <button
          className="button button--ghost button--small"
          onClick={() => setAmount(String(Math.floor(account.usdcBalance)))}
          type="button"
        >
          Max
        </button>
      </div>

      <div className="trade-summary">
        <div>
          <span>Entry price</span>
          <strong>{summary.price}</strong>
        </div>
        <div>
          <span>Implied probability</span>
          <strong>{summary.probability}</strong>
        </div>
        <div>
          <span>Estimated shares</span>
          <strong>{summary.shares}</strong>
        </div>
        <div>
          <span>Max payout</span>
          <strong>{summary.payout}</strong>
        </div>
        <div>
          <span>Max profit</span>
          <strong>{summary.profit}</strong>
        </div>
      </div>

      {!wallet.connected ? (
        <button className="button button--primary button--full" onClick={connectWallet} type="button">
          Connect Demo Wallet
        </button>
      ) : (
        <button
          className="button button--primary button--full"
          disabled={disabled}
          onClick={() => {
            const result = buyShares({
              marketId: market.id,
              outcome,
              amountUsd: numericAmount
            });
            setMessage(result.message);
          }}
          type="button"
        >
          {disabled ? "Trading Closed" : `Buy ${outcome}`}
        </button>
      )}

      {message ? <p className="form-message">{message}</p> : null}

      {positions.length > 0 ? (
        <div className="position-panel">
          <div className="panel-note">
            <span className="eyebrow">Your Position</span>
            <p>Manage any active exposure on this market directly from the detail page.</p>
          </div>

          <div className="stack-list">
            {positions.map((position) => (
              <div className="row-card row-card--compact" key={`${position.marketId}-${position.outcome}`}>
                <div>
                  <strong>
                    {position.outcome} / {position.shares.toFixed(2)} shares
                  </strong>
                  <p>Average entry {formatCents(position.avgPrice)}</p>
                </div>
                {position.claimable ? (
                  <button
                    className="button button--primary"
                    onClick={() => {
                      const result = claimWinnings(position.marketId);
                      setMessage(result.message);
                    }}
                    type="button"
                  >
                    Claim
                  </button>
                ) : (
                  <button
                    className="button button--ghost"
                    onClick={() => {
                      const result = closePosition(position.marketId, position.outcome);
                      setMessage(result.message);
                    }}
                    type="button"
                  >
                    Close
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div className="panel-note">
        <span className="eyebrow">Resolution Source</span>
        <p>{market.source}</p>
      </div>
    </aside>
  );
}
