import Link from "next/link";

import { ProtocolLogo } from "@/components/protocol-logo";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell site-header__inner">
        <Link className="brand brand--protocol" href="/">
          <ProtocolLogo />
        </Link>

        <nav className="site-nav">
          <Link href="/">Overview</Link>
          <Link href="/lab">Lab</Link>
          <Link href="/docs">Docs</Link>
          <Link href="/api/scenarios">API</Link>
        </nav>

        <div className="site-header__actions">
          <Link className="button button--ghost button--small" href="/docs">
            Protocol Notes
          </Link>
          <Link className="button button--primary" href="/lab">
            Open Lab
          </Link>
        </div>
      </div>
    </header>
  );
}
