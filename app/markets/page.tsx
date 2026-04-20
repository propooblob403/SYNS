import { MarketsBrowser } from "@/components/markets-browser";
import { markets } from "@/lib/mock-data";

export default function MarketsPage() {
  return (
    <section className="section page-shell">
      <div className="shell">
        <div className="section-heading">
          <div>
            <span className="kicker">Markets</span>
            <h1 className="page-title">Browse launch-ready prediction markets</h1>
          </div>
        </div>

        <MarketsBrowser markets={markets} />
      </div>
    </section>
  );
}
