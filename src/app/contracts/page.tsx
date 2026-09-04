"use client";

import React from "react";
import Link from "next/link";
import { Page, PageHead, Card, Badge, statusTone, KeyValue } from "../../components/ui";
import { usePersona } from "../../components/PersonaContext";
import { CONTRACTS, ACCOUNTS, ASSETS } from "../../lib/org";

const TIERS = [
  {
    tier: "Platinum",
    response: "4 hours",
    restore: "24 hours",
    window: "24 × 7",
    pm: "4 / year",
    onsite: "Included",
    spares: "22%",
    engineer: "Named account engineer",
  },
  {
    tier: "Gold",
    response: "8 hours",
    restore: "48 hours",
    window: "06:00 – 22:00, 7 days",
    pm: "2 / year",
    onsite: "Included",
    spares: "12%",
    engineer: "—",
  },
  {
    tier: "Standard",
    response: "24 hours",
    restore: "5 working days",
    window: "09:00 – 18:00, Mon–Sat",
    pm: "1 / year",
    onsite: "Chargeable",
    spares: "0%",
    engineer: "—",
  },
];

export default function ContractsPage() {
  const { persona } = usePersona();
  const account = ACCOUNTS.find((a) => a.id === persona.accountId);
  const mine = CONTRACTS.filter((c) => c.accountId === persona.accountId);

  return (
    <Page wide>
      <PageHead
        kicker="Contracts & entitlements"
        title="What you're entitled to"
        sub="Your live contracts, what each one covers, and exactly what the response and restore commitments mean in practice."
      />

      <div className="mb-9 space-y-4">
        {mine.map((c) => {
          const covered = ASSETS.filter((a) => a.contractId === c.id);
          return (
            <Card key={c.id} className="overflow-hidden">
              <div className="flex flex-wrap items-center gap-3 border-b border-vx-line bg-vx-mist px-5 py-3.5">
                <span className="font-mono text-[14px] font-bold text-vx-navy">
                  {c.id}
                </span>
                <Badge tone={c.slaTier === "Platinum" ? "navy" : c.slaTier === "Gold" ? "amber" : "grey"}>
                  {c.slaTier}
                </Badge>
                <Badge tone={statusTone(c.status)}>{c.status}</Badge>
                <span className="ml-auto text-[12px] text-vx-slate">
                  {c.startDate} → {c.endDate}
                </span>
              </div>

              <div className="grid gap-6 px-5 py-5 lg:grid-cols-[1fr_1fr]">
                <div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <KeyValue label="Type" value={c.type} />
                    <KeyValue label="Account" value={account?.name ?? "—"} />
                    <KeyValue
                      label="Response commitment"
                      value={`${c.responseHrs} hours`}
                    />
                    <KeyValue
                      label="Restore commitment"
                      value={`${c.restoreHrs} hours`}
                    />
                    <KeyValue
                      label="On-site attendance"
                      value={c.onSiteIncluded ? "Included" : "Chargeable"}
                    />
                    <KeyValue label="Spares discount" value={c.sparesDiscount} />
                  </div>

                  <div className="mt-4">
                    <div className="text-[10px] font-bold uppercase tracking-[0.1em] text-vx-slate">
                      Scope
                    </div>
                    <ul className="mt-1.5 space-y-1">
                      {c.coverage.map((x) => (
                        <li key={x} className="flex gap-2 text-[12.5px] leading-snug text-vx-steel">
                          <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-vx-orange" />
                          {x}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.1em] text-vx-slate">
                    Assets on this contract ({covered.length})
                  </div>
                  <div className="mt-2 space-y-1.5">
                    {covered.map((a) => (
                      <div
                        key={a.id}
                        className="flex flex-wrap items-center gap-2 rounded-lg border border-vx-line bg-white px-3 py-2"
                      >
                        <span className="font-mono text-[11.5px] font-semibold text-vx-navy">
                          {a.serial}
                        </span>
                        <span className="text-[11.5px] text-vx-slate">{a.model}</span>
                        <Badge tone={statusTone(a.status)}>{a.status}</Badge>
                      </div>
                    ))}
                    {covered.length === 0 && (
                      <div className="rounded-lg border border-dashed border-vx-line px-3 py-3 text-[12px] text-vx-slate">
                        No assets currently listed on this contract.
                      </div>
                    )}
                  </div>

                  {c.status === "Expiring soon" && (
                    <div className="mt-3 rounded-lg border-l-[3px] border-vx-amber bg-vx-amber-2 px-3.5 py-2.5">
                      <div className="text-[12px] font-bold text-vx-amber">
                        Renewal window is open
                      </div>
                      <div className="mt-0.5 text-[12px] leading-snug text-[#7a4d00]">
                        Contracts don&apos;t auto-renew. Your account engineer
                        will be in touch, or you can start it from here.
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <h2 className="mb-3 text-[17px] font-bold text-vx-navy">
        How the tiers compare
      </h2>
      <Card className="mb-6 overflow-x-auto">
        <table className="w-full min-w-[680px] text-[13px]">
          <thead>
            <tr className="bg-vx-mist text-left">
              <th className="px-4 py-3 font-bold text-vx-navy"></th>
              {TIERS.map((t) => (
                <th key={t.tier} className="px-4 py-3 font-bold text-vx-navy">
                  {t.tier}
                  {account?.slaTier === t.tier && (
                    <span className="ml-2 rounded-full bg-vx-green-2 px-2 py-[2px] text-[9.5px] font-bold uppercase tracking-wider text-vx-green">
                      Yours
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["Response — P1", "response"],
              ["Restore — P1", "restore"],
              ["Coverage window", "window"],
              ["Preventive visits", "pm"],
              ["On-site attendance", "onsite"],
              ["Spares discount", "spares"],
              ["Account support", "engineer"],
            ].map(([label, key]) => (
              <tr key={label} className="border-t border-vx-line">
                <td className="px-4 py-2.5 font-semibold text-vx-steel">{label}</td>
                {TIERS.map((t) => (
                  <td key={t.tier} className="px-4 py-2.5 text-[#22333f]">
                    {t[key as keyof typeof t]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            t: "How the clock is measured",
            b: "Response starts when the case is created and stops when an engineer makes substantive contact — an automated acknowledgement doesn't stop it. The clock pauses while we're waiting on you, and you'll see the case move to “Awaiting your reply” when that happens.",
            href: "/knowledge/how-sla-tiers-work",
            cta: "KB-3010",
          },
          {
            t: "What the AMC doesn't cover",
            b: "Consequential damage, operation outside the design duty, impellers and casings unless traced to a covered part, and work done by a third party since our last visit. Ask us if you're unsure rather than deferring a repair.",
            href: "/knowledge/what-your-amc-covers",
            cta: "KB-3001",
          },
          {
            t: "Renewing or adding assets",
            b: "Contracts don't auto-renew; your account engineer makes contact 90 days out. Assets can be added mid-term and are pro-rated to the existing end date. Tiers can differ per asset, so put Platinum only where downtime costs you.",
            href: "/knowledge/renewing-extending-upgrading-amc",
            cta: "KB-3033",
          },
        ].map((x) => (
          <Card key={x.t} className="flex flex-col p-5">
            <h3 className="text-[14.5px] font-bold text-vx-navy">{x.t}</h3>
            <p className="mt-1.5 flex-1 text-[12.5px] leading-[1.6] text-vx-steel">
              {x.b}
            </p>
            <Link
              href={x.href}
              className="mt-3 inline-block text-[12.5px] font-bold text-vx-orange hover:underline"
            >
              Read {x.cta} →
            </Link>
          </Card>
        ))}
      </div>
    </Page>
  );
}
