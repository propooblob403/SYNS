import Link from "next/link";
import { notFound } from "next/navigation";

import { TradePanel } from "@/components/trade-panel";
import { getMarketBySlug } from "@/lib/mock-data";
import { formatCompactCurrency, formatDate, formatPercentFromPrice, timeFromNow } from "@/lib/utils";

export default async function MarketDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const market = getMarketBySlug(slug);

  if (!market) {
    notFound();
  }

  return (
    <section className="section page-shell">
      <div className="shell market-detail">
        <div className="market-detail__main">
          <Link className="back-link" href="/markets">
            &lt;- All markets
          </Link>
          <span className="pill">{market.category}</span>
          <h1 className="page-title">{market.title}</h1>
          <p className="lead">{market.subtitle}</p>

          <div className="detail-prices">
            <div className="detail-price detail-price--yes">
              <span className="eyebrow">YES</span>
              <strong>{Math.round(market.yesPrice * 100)}c</strong>
              <small>{formatPercentFromPrice(market.yesPrice)} implied probability</small>
            </div>
            <div className="detail-price detail-price--no">
              <span className="eyebrow">NO</span>
              <strong>{Math.round(market.noPrice * 100)}c</strong>
              <small>{formatPercentFromPrice(market.noPrice)} implied probability</small>
            </div>
          </div>

          <div className="detail-stats">
            <div>
              <span className="eyebrow">Volume</span>
              <strong>{formatCompactCurrency(market.volume)}</strong>
            </div>
            <div>
              <span className="eyebrow">Open interest</span>
              <strong>{formatCompactCurrency(market.openInterest)}</strong>
            </div>
            <div>
              <span className="eyebrow">Traders</span>
              <strong>{market.traders.toLocaleString()}</strong>
            </div>
            <div>
              <span className="eyebrow">Resolve</span>
              <strong>{timeFromNow(market.resolveAt)}</strong>
            </div>
          </div>

          <div className="content-block">
            <h2>Resolution framework</h2>
            <p>{market.rule}</p>
            <dl className="rule-list">
              <div>
                <dt>Primary source</dt>
                <dd>{market.source}</dd>
              </div>
              <div>
                <dt>Trading closes</dt>
                <dd>{formatDate(market.closeAt)}</dd>
              </div>
              <div>
                <dt>Expected resolution</dt>
                <dd>{formatDate(market.resolveAt)}</dd>
              </div>
              <div>
                <dt>Fallback</dt>
                <dd>{market.fallback}</dd>
              </div>
            </dl>
          </div>

          <div className="content-block">
            <h2>Why traders care</h2>
            <ul className="bullet-list">
              {market.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <TradePanel market={market} />
      </div>
    </section>
  );
}
