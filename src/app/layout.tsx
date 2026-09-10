import type { Metadata } from "next";
import "./globals.css";
import { PersonaProvider } from "../components/PersonaContext";
import { Header, Footer } from "../components/Chrome";
import { Agent } from "../components/agent/Agent";
import { SF } from "../lib/salesforce";

export const metadata: Metadata = {
  title: {
    default: "Veltrix Customer & Partner Hub",
    template: "%s · Veltrix Industrial Systems",
  },
  description:
    "Check entitlement and warranty status, search the technical library, order spares and log a case — Veltrix Industrial Systems Pvt. Ltd.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  // The messaging client is served from the Experience Cloud site. Opening the
  // connection during HTML parse shaves the DNS/TLS handshake off a cold load.
  const eswOrigin = (() => {
    try {
      return new URL(SF.siteUrl).origin;
    } catch {
      return "";
    }
  })();

  return (
    <html lang="en" className="h-full antialiased">
      <head>
        {eswOrigin ? (
          <>
            <link rel="preconnect" href={eswOrigin} crossOrigin="anonymous" />
            <link rel="dns-prefetch" href={eswOrigin} />
          </>
        ) : null}
      </head>
      <body className="flex min-h-full flex-col">
        <PersonaProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Agent />
        </PersonaProvider>
      </body>
    </html>
  );
}
