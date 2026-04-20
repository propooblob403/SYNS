import Link from "next/link";

import { Market } from "@/lib/types";
import { formatCents, formatCompactCurrency, timeFromNow } from "@/lib/utils";

export function MarketCard({ market }: { market: Market }) {
  return (
    <Link className="market-card" href={`/market/${market.slug}`}>
      <div className="market-card__top">
        <span className="pill">{market.category}</span>
        <span className={`status status--${market.status}`}>{market.status.replace("_", " ")}</span>
      </div>
      <h3>{market.title}</h3>
      <p>{market.subtitle}</p>

      <div className="market-card__prices">
        <div className="price-chip price-chip--yes">
          <span>YES</span>
          <strong>{formatCents(market.yesPrice)}</strong>
        </div>
        <div className="price-chip price-chip--no">
          <span>NO</span>
          <strong>{formatCents(market.noPrice)}</strong>
        </div>
      </div>

      <div className="market-card__meta">
        <div>
          <span className="eyebrow">Volume</span>
          <strong>{formatCompactCurrency(market.volume)}</strong>
        </div>
        <div>
          <span className="eyebrow">Resolve</span>
          <strong>{timeFromNow(market.resolveAt)}</strong>
        </div>
      </div>
    </Link>
  );
}

