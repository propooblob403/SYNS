export default function CreatePage() {
  return (
    <section className="section page-shell">
      <div className="shell narrow-shell">
        <div className="section-heading">
          <div>
            <span className="kicker">Create</span>
            <h1 className="page-title">Propose a scenario for review</h1>
          </div>
        </div>

        <div className="content-block">
          <p>
            MVP scope keeps scenario creation moderated. This page exists to show the product path for permissioned
            signal and market intake before fully open creation.
          </p>
          <ul className="bullet-list">
            <li>Question wording must be binary and objectively resolvable.</li>
            <li>Every submission needs a primary official source.</li>
            <li>Ambiguous or purely opinion-based questions should be rejected.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
