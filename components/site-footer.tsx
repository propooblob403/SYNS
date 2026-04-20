import Link from "next/link";

import { ProtocolLogo } from "@/components/protocol-logo";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell site-footer__grid">
        <div>
          <div className="brand brand--footer">
            <ProtocolLogo />
          </div>
          <p className="footer-copy">
            A neuromorphic swarm intelligence MVP for onchain markets, built to make signal formation legible before the
            full protocol network is live.
          </p>
        </div>

        <div>
          <h4>Surface</h4>
          <Link href="/">Overview</Link>
          <Link href="/lab">Emergence Lab</Link>
          <Link href="/docs">Protocol Docs</Link>
        </div>

        <div>
          <h4>Developer</h4>
          <Link href="/api/scenarios">Scenarios API</Link>
          <Link href="/api/simulate?scenario=narrative-ignition">Simulation API</Link>
          <Link href="/docs">Architecture Notes</Link>
        </div>

        <div>
          <h4>Status</h4>
          <p>Current phase</p>
          <strong>MVP / Primordial Soup</strong>
        </div>
      </div>
    </footer>
  );
}
