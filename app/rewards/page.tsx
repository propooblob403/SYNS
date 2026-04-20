"use client";

import { useAccount } from "@/components/account-provider";

const rewardModules = [
  {
    title: "Trading boosts",
    copy: "SYNS holders earn stronger weighting across active protocol experiments and signal cycles."
  },
  {
    title: "Market making multipliers",
    copy: "Depth, tighter pricing, and disciplined participation earn boosted protocol rewards."
  },
  {
    title: "Tiered status",
    copy: "Higher SYNS balances unlock more access, recognition, and premium experiments."
  }
];

export default function RewardsPage() {
  const { account } = useAccount();

  return (
    <section className="section page-shell">
      <div className="shell">
        <div className="section-heading">
          <div>
            <span className="kicker">Rewards</span>
            <h1 className="page-title">Token utility and incentives in one operating view</h1>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <span className="eyebrow">SYNS balance</span>
            <strong>{account.synsBalance.toLocaleString()}</strong>
          </div>
          <div className="stat-card">
            <span className="eyebrow">Points earned</span>
            <strong>{account.points.toLocaleString()}</strong>
          </div>
          <div className="stat-card">
            <span className="eyebrow">Current tier</span>
            <strong>Signal II</strong>
          </div>
          <div className="stat-card">
            <span className="eyebrow">Weekly pool</span>
            <strong>250,000 SYNS</strong>
          </div>
        </div>

        <div className="feature-grid">
          {rewardModules.map((item) => (
            <article className="feature-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>

        <div className="content-block">
          <h2>Five-layer holder model</h2>
          <ul className="bullet-list">
            <li>Trading Benefits: lower fees, higher limits, and faster access to new markets.</li>
            <li>Reward Boosts: multipliers on trader campaigns, maker rewards, and seasonal missions.</li>
            <li>Protocol Incentives: structured programs tied to long-term protocol growth.</li>
            <li>Governance Access: influence market direction, reward programs, and operating parameters.</li>
            <li>Status &amp; Access: tiered identity, gated campaigns, and premium recognition.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
