import type { Metadata, Viewport } from "next";

import { AccountProvider } from "@/components/account-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

import "./globals.css";

export const metadata: Metadata = {
  title: "SYNS MVP",
  description: "Synaptic Swarm Protocol MVP for signal ingestion, adaptive weighting, and emergence simulation."
};

export const viewport: Viewport = {
  themeColor: "#06090f"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AccountProvider>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </AccountProvider>
      </body>
    </html>
  );
}
