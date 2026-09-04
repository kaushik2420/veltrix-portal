import type { Metadata } from "next";
import "./globals.css";
import { PersonaProvider } from "../components/PersonaContext";
import { Header, Footer } from "../components/Chrome";
import { Agent } from "../components/agent/Agent";

export const metadata: Metadata = {
  title: {
    default: "Veltrix Customer & Partner Hub",
    template: "%s · Veltrix Industrial Systems",
  },
  description:
    "Check entitlement and warranty status, search the technical library, order spares and log a case — Veltrix Industrial Systems Pvt. Ltd.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
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
