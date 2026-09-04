"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Page, Card, Badge, statusTone, SectionTitle } from "../components/ui";
import { usePersona } from "../components/PersonaContext";
import { ACCOUNTS, CONTRACTS, ASSETS, CASES } from "../lib/org";
import { popularArticles, searchArticles } from "../lib/kb";

export default function Home() {
  const router = useRouter();
  const { persona } = usePersona();
  const [q, setQ] = React.useState("");

  const account = ACCOUNTS.find((a) => a.id === persona.accountId);
  const contract = CONTRACTS.find((c) => c.accountId === persona.accountId);
  const assets = ASSETS.filter((a) => a.accountId === persona.accountId);
  const openCases = CASES.filter(
    (c) => c.accountId === persona.accountId && c.status !== "Closed",
  );
  const suggestions = q.length > 1 ? searchArticles(q, 5) : [];
  const popular = popularArticles(6);

  return (
    <>
      {/* hero */}
      <section className="border-b border-vx-line bg-vx-navy">
        <div className="mx-auto grid max-w-[1100px] gap-10 px-6 py-11 lg:grid-cols-[1fr_300px]">
          <div>
          <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-vx-orange">
            Customer &amp; Partner Hub
          </div>
          <h1 className="mt-2 max-w-[720px] text-[34px] font-bold leading-[1.15] tracking-[-0.02em] text-white">
            Good morning, {persona.name.split(" ")[0]}.
          </h1>
          <p className="mt-2 max-w-[640px] text-[15px] leading-[1.55] text-white/70">
            Check what&apos;s covered, find the right part, search the technical
            library, or raise a case — without picking up the phone.
          </p>

          {/* search */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              router.push(`/knowledge?q=${encodeURIComponent(q)}`);
            }}
            className="relative mt-6 max-w-[640px]"
          >
            <div className="flex items-center gap-2 rounded-xl bg-white p-1.5 shadow-[0_8px_28px_rgba(0,0,0,0.2)]">
              <svg viewBox="0 0 24 24" className="ml-2.5 h-4.5 w-4.5 shrink-0 text-vx-slate" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" />
              </svg>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search a serial number, a fault, a part number…"
                className="min-w-0 flex-1 bg-transparent px-1 py-2 text-[14px] outline-none"
              />
              <button
                type="submit"
                className="shrink-0 rounded-lg bg-vx-navy px-4 py-2 text-[13px] font-bold text-white transition hover:bg-vx-navy-2"
              >
                Search
              </button>
            </div>

            {suggestions.length > 0 && (
              <div className="vx-in absolute z-20 mt-1.5 w-full overflow-hidden rounded-xl border border-vx-line bg-white shadow-[0_16px_40px_rgba(0,0,0,0.22)]">
                {suggestions.map((a) => (
                  <Link
                    key={a.id}
                    href={`/knowledge/${a.slug}`}
                    className="block border-b border-vx-line px-4 py-2.5 last:border-0 hover:bg-vx-mist"
                  >
                    <div className="text-[9.5px] font-bold uppercase tracking-[0.1em] text-vx-orange">
                      {a.id} · {a.type}
                    </div>
                    <div className="text-[13px] font-semibold text-vx-navy">
                      {a.title}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </form>

          <div className="mt-4 flex flex-wrap gap-2">
            {[
              "VX-450 seal leaking",
              "CP-100 E14",
              "What does our AMC cover?",
              "Spare part lead times",
            ].map((s) => (
              <Link
                key={s}
                href={`/knowledge?q=${encodeURIComponent(s)}`}
                className="rounded-full border border-white/20 px-3 py-1 text-[12px] font-medium text-white/75 transition hover:border-white/60 hover:text-white"
              >
                {s}
              </Link>
            ))}
          </div>
          </div>

          {/* at-a-glance */}
          <div className="hidden self-end rounded-xl bg-white/[0.07] p-5 ring-1 ring-white/10 lg:block">
            <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-vx-orange">
              At a glance
            </div>
            <div className="mt-3 space-y-3.5">
              {[
                {
                  v: String(openCases.length),
                  l: "open cases",
                  s: openCases.some((c) => c.priority.startsWith("P1"))
                    ? "One is P1 — line down"
                    : "None critical",
                },
                {
                  v: String(assets.length),
                  l: "assets under cover",
                  s: `${assets.filter((a) => a.status !== "Operational").length} needing attention`,
                },
                {
                  v: contract ? `${contract.responseHrs} hr` : "—",
                  l: "response commitment",
                  s: contract ? `${contract.slaTier} · 24×7` : "",
                },
              ].map((x) => (
                <div key={x.l} className="flex items-baseline gap-2.5">
                  <span className="text-[26px] font-bold leading-none text-white">
                    {x.v}
                  </span>
                  <span>
                    <span className="block text-[12px] font-semibold leading-tight text-white/85">
                      {x.l}
                    </span>
                    <span className="block text-[11px] leading-tight text-white/50">
                      {x.s}
                    </span>
                  </span>
                </div>
              ))}
            </div>
            <Link
              href="/cases"
              className="mt-4 block rounded-lg bg-white/10 px-3 py-2 text-center text-[12.5px] font-bold text-white transition hover:bg-white/20"
            >
              Open my cases
            </Link>
          </div>
        </div>
      </section>

      <Page>
        {/* entitlement strip */}
        {account && contract && (
          <Card className="mb-7 overflow-hidden">
            <div className="grid gap-px bg-vx-line sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  l: "Account",
                  v: account.name,
                  s: `${account.city}, ${account.state}`,
                },
                {
                  l: "Entitlement",
                  v: `${contract.id}`,
                  s: `${contract.type} · expires ${contract.endDate}`,
                  badge: contract.slaTier,
                },
                {
                  l: "Response / restore",
                  v: `${contract.responseHrs} hr / ${contract.restoreHrs} hr`,
                  s: contract.onSiteIncluded
                    ? "On-site attendance included"
                    : "On-site chargeable",
                },
                {
                  l: "Spares discount",
                  v: contract.sparesDiscount,
                  s: "Applied automatically to quotes",
                },
              ].map((x) => (
                <div key={x.l} className="bg-white px-4 py-3.5">
                  <div className="text-[10px] font-bold uppercase tracking-[0.1em] text-vx-slate">
                    {x.l}
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-[15px] font-bold leading-tight text-vx-navy">
                      {x.v}
                    </span>
                    {x.badge && (
                      <Badge tone={x.badge === "Platinum" ? "navy" : "amber"}>
                        {x.badge}
                      </Badge>
                    )}
                  </div>
                  <div className="mt-0.5 text-[11.5px] text-vx-slate">{x.s}</div>
                </div>
              ))}
            </div>
          </Card>
        )}

        <div className="grid gap-7 lg:grid-cols-[1.35fr_1fr]">
          <div>
            {/* quick actions */}
            <SectionTitle>What would you like to do?</SectionTitle>
            <div className="mb-7 grid gap-3 sm:grid-cols-2">
              {[
                {
                  href: "/cases/new",
                  t: "Log a case",
                  d: "Pre-filled with your account, contract and entitlement.",
                  primary: true,
                },
                {
                  href: "/assets",
                  t: "Check what's covered",
                  d: "Every serial number, its contract and its history.",
                },
                {
                  href: "/knowledge",
                  t: "Technical library",
                  d: "Procedures, trip codes, tolerances and part numbers.",
                },
                {
                  href: "/contracts",
                  t: "Contracts & SLA",
                  d: "What your tier commits us to, and what's excluded.",
                },
              ].map((a) => (
                <Link
                  key={a.href}
                  href={a.href}
                  className={`group rounded-xl border p-4 transition ${
                    a.primary
                      ? "border-vx-orange bg-vx-orange-2/50 hover:bg-vx-orange-2"
                      : "border-vx-line bg-white hover:border-vx-navy"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[15px] font-bold text-vx-navy">
                      {a.t}
                    </span>
                    <svg viewBox="0 0 24 24" className="h-4 w-4 text-vx-orange transition group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h13M13 6l6 6-6 6" />
                    </svg>
                  </div>
                  <div className="mt-1 text-[12.5px] leading-snug text-vx-steel">
                    {a.d}
                  </div>
                </Link>
              ))}
            </div>

            {/* open cases */}
            <SectionTitle
              action={
                <Link
                  href="/cases"
                  className="text-[12.5px] font-semibold text-vx-orange hover:underline"
                >
                  All cases
                </Link>
              }
            >
              Open cases
            </SectionTitle>
            <div className="space-y-2.5">
              {openCases.map((c) => (
                <Link key={c.id} href={`/cases#${c.number}`} className="block">
                  <Card className="p-4 transition hover:border-vx-navy">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[12px] font-bold text-vx-orange">
                        {c.number}
                      </span>
                      <Badge tone={statusTone(c.status)}>{c.status}</Badge>
                      <Badge tone={c.priority.startsWith("P1") ? "red" : "grey"}>
                        {c.priority.split(" ")[0]}
                      </Badge>
                      <span className="ml-auto text-[11px] text-vx-slate">
                        {c.origin} · opened {c.opened}
                      </span>
                    </div>
                    <div className="mt-1.5 text-[14px] font-bold text-vx-navy">
                      {c.subject}
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11.5px] text-vx-slate">
                      <span>{c.milestone}</span>
                      {c.assetSerial && (
                        <span className="font-mono">{c.assetSerial}</span>
                      )}
                      <span>{c.owner}</span>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <SectionTitle
              action={
                <Link
                  href="/knowledge"
                  className="text-[12.5px] font-semibold text-vx-orange hover:underline"
                >
                  Browse all
                </Link>
              }
            >
              Most read this month
            </SectionTitle>
            <Card className="mb-7 divide-y divide-vx-line">
              {popular.map((a) => (
                <Link
                  key={a.id}
                  href={`/knowledge/${a.slug}`}
                  className="block px-4 py-3 transition hover:bg-vx-mist"
                >
                  <div className="text-[9.5px] font-bold uppercase tracking-[0.1em] text-vx-orange">
                    {a.id} · {a.type}
                  </div>
                  <div className="mt-0.5 text-[13px] font-semibold leading-snug text-vx-navy">
                    {a.title}
                  </div>
                  <div className="mt-0.5 text-[11px] text-vx-slate">
                    {a.views.toLocaleString("en-IN")} views · {a.helpful}% found
                    this helpful
                  </div>
                </Link>
              ))}
            </Card>

            <SectionTitle
              action={
                <Link
                  href="/assets"
                  className="text-[12.5px] font-semibold text-vx-orange hover:underline"
                >
                  All assets
                </Link>
              }
            >
              Your equipment
            </SectionTitle>
            <Card className="divide-y divide-vx-line">
              {assets.slice(0, 5).map((a) => (
                <div key={a.id} className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11.5px] font-semibold text-vx-navy">
                      {a.serial}
                    </span>
                    <Badge tone={statusTone(a.status)}>{a.status}</Badge>
                  </div>
                  <div className="mt-0.5 text-[12px] text-vx-steel">
                    {a.model} · {a.location}
                  </div>
                </div>
              ))}
            </Card>
          </div>
        </div>
      </Page>
    </>
  );
}
