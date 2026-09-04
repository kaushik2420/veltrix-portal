"use client";

import React from "react";
import Link from "next/link";
import { Page, PageHead, Card, Badge, statusTone, KeyValue } from "../../components/ui";
import { usePersona } from "../../components/PersonaContext";
import { CASES, ACCOUNTS, PERSONAS } from "../../lib/org";

export default function CasesPage() {
  const { persona } = usePersona();
  const [filter, setFilter] = React.useState<"open" | "all">("open");
  const [expanded, setExpanded] = React.useState<string | null>("CS-1");

  const all = CASES.filter((c) => c.accountId === persona.accountId);
  const list = filter === "open" ? all.filter((c) => c.status !== "Closed") : all;

  return (
    <Page wide>
      <PageHead
        kicker="Support"
        title="My cases"
        sub="Everything raised against your account, whichever channel it came through — phone, email, portal or chat."
        right={
          <Link
            href="/cases/new"
            className="rounded-lg bg-vx-orange px-4 py-2.5 text-[13.5px] font-bold text-white transition hover:bg-[#dd5b13]"
          >
            Log a case
          </Link>
        }
      />

      <div className="mb-5 flex gap-1.5">
        {(["open", "all"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-lg px-3.5 py-1.5 text-[12.5px] font-semibold transition ${
              filter === f
                ? "bg-vx-navy text-white"
                : "border border-vx-line bg-white text-vx-steel hover:border-vx-navy"
            }`}
          >
            {f === "open" ? "Open" : "All"} (
            {f === "open" ? all.filter((c) => c.status !== "Closed").length : all.length})
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {list.map((c) => {
          const open = expanded === c.id;
          const contact = PERSONAS.find((p) => p.id === c.contactId);
          const account = ACCOUNTS.find((a) => a.id === c.accountId);
          return (
            <Card key={c.id} className="overflow-hidden">
              <button
                id={c.number}
                onClick={() => setExpanded(open ? null : c.id)}
                className="w-full px-5 py-4 text-left transition hover:bg-vx-mist/50"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[12px] font-bold text-vx-orange">
                    {c.number}
                  </span>
                  <Badge tone={statusTone(c.status)}>{c.status}</Badge>
                  <Badge tone={c.priority.startsWith("P1") ? "red" : "grey"}>
                    {c.priority}
                  </Badge>
                  <Badge tone={c.slaTier === "Platinum" ? "navy" : "amber"}>
                    {c.slaTier}
                  </Badge>
                  <span className="ml-auto flex items-center gap-2 text-[11.5px] text-vx-slate">
                    {c.origin} · {c.opened}
                    <svg
                      viewBox="0 0 24 24"
                      className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </div>
                <div className="mt-2 text-[16px] font-bold leading-snug text-vx-navy">
                  {c.subject}
                </div>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11.5px]">
                  <span
                    className={`font-semibold ${
                      c.milestoneState === "Breached"
                        ? "text-vx-red"
                        : c.milestoneState === "At risk"
                          ? "text-vx-amber"
                          : "text-vx-green"
                    }`}
                  >
                    {c.milestone}
                  </span>
                  {c.assetSerial && (
                    <span className="font-mono text-vx-slate">{c.assetSerial}</span>
                  )}
                  <span className="text-vx-slate">{c.owner}</span>
                </div>
              </button>

              {open && (
                <div className="border-t border-vx-line bg-vx-mist/40 px-5 py-4">
                  <p className="mb-4 max-w-[760px] text-[13.5px] leading-[1.6] text-vx-steel">
                    {c.summary}
                  </p>

                  <div className="mb-5 grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
                    <KeyValue label="Account" value={account?.name ?? "—"} />
                    <KeyValue label="Contact" value={contact?.name ?? "—"} />
                    <KeyValue label="Product line" value={c.productLine} />
                    <KeyValue label="Failure type" value={c.failureType} />
                    <KeyValue label="Owner" value={c.owner} />
                  </div>

                  <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-vx-slate">
                    Timeline
                  </div>
                  <div className="mt-2 space-y-0">
                    {c.timeline.map((t, i) => (
                      <div key={i} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-vx-orange" />
                          {i < c.timeline.length - 1 && (
                            <span className="w-px flex-1 bg-vx-line" />
                          )}
                        </div>
                        <div className="pb-3.5">
                          <div className="flex flex-wrap items-baseline gap-2">
                            <span className="text-[11.5px] font-bold text-vx-navy">
                              {t.who}
                            </span>
                            <span className="font-mono text-[10.5px] text-vx-slate">
                              {t.at}
                            </span>
                          </div>
                          <div className="text-[12.5px] leading-snug text-vx-steel">
                            {t.text}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </Page>
  );
}
