"use client";

import { useMemo, useState } from "react";

import { MarketCard } from "@/components/market-card";
import { Market, MarketStatus } from "@/lib/types";

type MarketsBrowserProps = {
  markets: Market[];
};

const STATUS_FILTERS: Array<{ label: string; value: "all" | MarketStatus }> = [
  { label: "All", value: "all" },
  { label: "Open", value: "open" },
  { label: "Awaiting", value: "awaiting_resolution" },
  { label: "Resolved", value: "resolved" }
];

export function MarketsBrowser({ markets }: MarketsBrowserProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState<"all" | MarketStatus>("all");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(markets.map((market) => market.category)))],
    [markets]
  );

  const filteredMarkets = useMemo(() => {
    return markets.filter((market) => {
      const matchesQuery =
        query.trim().length === 0 ||
        `${market.title} ${market.subtitle} ${market.category}`
          .toLowerCase()
          .includes(query.trim().toLowerCase());
      const matchesCategory = category === "All" || market.category === category;
      const matchesStatus = status === "all" || market.status === status;

      return matchesQuery && matchesCategory && matchesStatus;
    });
  }, [category, markets, query, status]);

  return (
    <>
      <div className="filters-panel">
        <label className="input-group">
          <span className="eyebrow">Search markets</span>
          <input
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Fed, CPI, earnings, payrolls"
            type="search"
            value={query}
          />
        </label>

        <div className="filter-group">
          <span className="eyebrow">Category</span>
          <div className="filter-chips">
            {categories.map((item) => (
              <button
                className={item === category ? "chip chip--active" : "chip"}
                key={item}
                onClick={() => setCategory(item)}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <span className="eyebrow">Status</span>
          <div className="filter-chips">
            {STATUS_FILTERS.map((item) => (
              <button
                className={item.value === status ? "chip chip--active" : "chip"}
                key={item.value}
                onClick={() => setStatus(item.value)}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="results-bar">
        <span className="eyebrow">Visible markets</span>
        <strong>{filteredMarkets.length}</strong>
      </div>

      {filteredMarkets.length > 0 ? (
        <div className="market-grid">
          {filteredMarkets.map((market) => (
            <MarketCard key={market.id} market={market} />
          ))}
        </div>
      ) : (
        <div className="content-block">
          <h2>No markets match the current filters</h2>
          <p>Try a broader search term or switch category and status filters.</p>
        </div>
      )}
    </>
  );
}
