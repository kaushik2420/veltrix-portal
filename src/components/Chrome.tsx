"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { VeltrixLogo } from "./Logo";
import { usePersona } from "./PersonaContext";
import { ACCOUNTS, CONTRACTS } from "../lib/org";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/knowledge", label: "Technical library" },
  { href: "/cases", label: "My cases" },
  { href: "/assets", label: "Installed base" },
  { href: "/contracts", label: "Contracts & SLA" },
  { href: "/setup", label: "Setup" },
];

export function Header() {
  const path = usePathname();
  const { persona, setPersonaId, all } = usePersona();
  const [menu, setMenu] = React.useState(false);
  const account = ACCOUNTS.find((a) => a.id === persona.accountId);
  const contract = CONTRACTS.find((c) => c.accountId === persona.accountId);

  return (
    <header className="sticky top-0 z-30 border-b border-vx-line bg-white">
      <div className="mx-auto flex max-w-[1220px] items-center gap-6 px-6 py-3">
        <Link href="/" className="shrink-0">
          <VeltrixLogo size={32} />
        </Link>

        <nav className="hidden flex-1 items-center gap-1 lg:flex">
          {NAV.map((n) => {
            const active =
              n.href === "/" ? path === "/" : path.startsWith(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`rounded-lg px-3 py-1.5 text-[13px] font-semibold transition ${
                  active
                    ? "bg-vx-mist text-vx-navy"
                    : "text-vx-steel hover:bg-vx-mist/60 hover:text-vx-navy"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          {account && (
            <span className="hidden items-center gap-2 rounded-lg bg-vx-mist px-2.5 py-1.5 md:flex">
              <span className="text-[11px] font-semibold text-vx-slate">
                {account.name}
              </span>
              <span
                className={`rounded px-1.5 py-[2px] text-[9.5px] font-bold uppercase tracking-[0.06em] ${
                  account.slaTier === "Platinum"
                    ? "bg-vx-navy text-white"
                    : account.slaTier === "Gold"
                      ? "bg-vx-amber-2 text-vx-amber"
                      : "bg-white text-vx-steel"
                }`}
              >
                {account.slaTier}
              </span>
            </span>
          )}

          <div className="relative">
            <button
              onClick={() => setMenu((m) => !m)}
              className="flex items-center gap-2 rounded-lg border border-vx-line px-2 py-1.5 transition hover:border-vx-navy"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-vx-navy text-[11px] font-bold text-white">
                {persona.initials}
              </span>
              <span className="hidden text-left sm:block">
                <span className="block text-[12px] font-bold leading-tight text-vx-navy">
                  {persona.name}
                </span>
                <span className="block text-[10px] leading-tight text-vx-slate">
                  {persona.role}
                </span>
              </span>
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-vx-slate" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {menu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setMenu(false)}
                />
                <div className="vx-in absolute right-0 z-20 mt-2 w-[320px] overflow-hidden rounded-xl border border-vx-line bg-white shadow-[0_16px_40px_rgba(14,34,51,0.18)]">
                  <div className="border-b border-vx-line bg-vx-mist px-4 py-2.5">
                    <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-vx-slate">
                      Demo — switch contact
                    </div>
                    <div className="mt-0.5 text-[11px] leading-snug text-vx-steel">
                      Same account, different job. Watch what the portal and the
                      assistant change.
                    </div>
                  </div>
                  {all.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setPersonaId(p.id);
                        setMenu(false);
                      }}
                      className={`flex w-full items-start gap-3 px-4 py-3 text-left transition hover:bg-vx-mist ${
                        p.id === persona.id ? "bg-vx-mist" : ""
                      }`}
                    >
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-vx-navy text-[11px] font-bold text-white">
                        {p.initials}
                      </span>
                      <span>
                        <span className="block text-[13px] font-bold text-vx-navy">
                          {p.name}
                        </span>
                        <span className="block text-[11px] font-semibold text-vx-orange">
                          {p.role}
                        </span>
                        <span className="mt-0.5 block text-[11px] leading-snug text-vx-slate">
                          {p.intent}
                        </span>
                      </span>
                    </button>
                  ))}
                  {contract && (
                    <div className="border-t border-vx-line px-4 py-2.5 text-[10.5px] text-vx-slate">
                      Entitlement in force: {contract.id} · {contract.slaTier} ·
                      expires {contract.endDate}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* mobile nav */}
      <div className="no-scrollbar flex gap-1 overflow-x-auto border-t border-vx-line px-4 py-2 lg:hidden">
        {NAV.map((n) => {
          const active = n.href === "/" ? path === "/" : path.startsWith(n.href);
          return (
            <Link
              key={n.href}
              href={n.href}
              className={`shrink-0 rounded-lg px-3 py-1.5 text-[12.5px] font-semibold ${
                active ? "bg-vx-mist text-vx-navy" : "text-vx-steel"
              }`}
            >
              {n.label}
            </Link>
          );
        })}
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-16 border-t border-vx-line bg-white">
      <div className="mx-auto flex max-w-[1220px] flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center">
        <VeltrixLogo size={28} />
        <div className="text-[11.5px] leading-relaxed text-vx-slate sm:ml-auto sm:text-right">
          Veltrix Industrial Systems Pvt. Ltd · Customer &amp; Partner Hub
          <br />
          A fictional company built as a Salesforce Service Cloud demo
          environment. Not a real business.
        </div>
      </div>
    </footer>
  );
}
