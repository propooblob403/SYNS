const faqs = [
  {
    question: "What does the MVP actually simulate?",
    answer:
      "This repository models signal ingestion, node weighting, emergence scoring, and a lightweight market sandbox using local mock state. It is built to demonstrate protocol behavior before live data ingestion and distributed execution."
  },
  {
    question: "Does this repo include on-chain settlement?",
    answer:
      "Not yet. The MVP is intentionally front-end first, so the next layer would be wallet hooks, backend services, and Solana program integration."
  },
  {
    question: "How does SYNS fit into the MVP?",
    answer:
      "SYNS acts as the protocol utility and coordination token in the current prototype. The market sandbox still uses USDC as a simple quote asset so signal flows and reward logic remain easy to inspect."
  }
];

export default function HelpPage() {
  return (
    <section className="section page-shell">
      <div className="shell">
        <div className="section-heading">
          <div>
            <span className="kicker">Help</span>
            <h1 className="page-title">Questions a launch-day user is likely to ask</h1>
          </div>
        </div>

        <div className="stack-list">
          {faqs.map((faq) => (
            <article className="content-block" key={faq.question}>
              <h2>{faq.question}</h2>
              <p>{faq.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
