const rules = [
  {
    title: "Resolution rules come first",
    copy:
      "Every market needs an explicit YES condition, a named official source, a close time, and an invalid-market fallback before it should be listed."
  },
  {
    title: "Primary sources must be official",
    copy:
      "Use central bank statements, government releases, or company investor relations materials. Third-party summaries should never be the first settlement source."
  },
  {
    title: "Threshold logic must be explicit",
    copy:
      "Exact-threshold behavior must be stated in advance. For example, 'above 3.0%' means a published value of exactly 3.0% resolves NO."
  },
  {
    title: "Invalid markets need a policy",
    copy:
      "If the source fails to publish a clear answer, the wording becomes unresolvable, or official methodology changes break comparability, the market can be invalidated."
  }
];

export default function RulesPage() {
  return (
    <section className="section page-shell">
      <div className="shell">
        <div className="section-heading">
          <div>
            <span className="kicker">Rules</span>
            <h1 className="page-title">The trust layer for demo markets</h1>
          </div>
        </div>

        <div className="feature-grid">
          {rules.map((rule) => (
            <article className="feature-card" key={rule.title}>
              <h3>{rule.title}</h3>
              <p>{rule.copy}</p>
            </article>
          ))}
        </div>

        <div className="content-block">
          <h2>Standard invalid-market clause</h2>
          <p>
            If the primary resolution source fails to publish a clear result, the event becomes objectively
            unresolvable, or the market wording prevents a clean binary outcome, the market may be settled as
            invalid according to platform rules.
          </p>
        </div>
      </div>
    </section>
  );
}
