"use client";

import React from "react";
import Link from "next/link";
import { Page, PageHead, Card, Badge, statusTone, KeyValue, Empty } from "../../components/ui";
import { usePersona } from "../../components/PersonaContext";
import { ASSETS, CONTRACTS, CASES, ACCOUNTS } from "../../lib/org";

const SPARES: Record<string, { part: string; number: string; stock: string }[]> = {
  "VX-450": [
    { part: "Cartridge seal kit", number: "SK-450-M", stock: "Pune depot" },
    { part: "Bearing set (DE + NDE)", number: "BS-450-02", stock: "Pune depot" },
    { part: "Wear ring set", number: "WR-450-A", stock: "Regional · 2–3 days" },
    { part: "Casing gasket", number: "GK-450-02", stock: "Pune depot" },
    { part: "Shaft sleeve", number: "SL-450-06", stock: "Regional · 2–4 days" },
  ],
  "VX-600": [
    { part: "Wear ring set", number: "WR-600-B", stock: "Regional · 2–3 days" },
    { part: "Casing gasket set", number: "GK-600-04", stock: "Pune depot" },
    { part: "Cartridge seal kit", number: "SK-600-M", stock: "Regional · 2–4 days" },
  ],
  "VX-220": [
    { part: "Cartridge seal kit", number: "SK-220-M", stock: "Pune depot" },
    { part: "Wear ring set", number: "WR-220-A", stock: "Regional · 2–3 days" },
  ],
  "VM-090": [
    { part: "Bearing set", number: "BS-VM090-01", stock: "Pune depot" },
    { part: "Cooling fan and cowl", number: "FN-VM090-02", stock: "Regional" },
  ],
  "CP-100": [
    { part: "Feeder module (≤45 kW)", number: "FM-100-A", stock: "Regional · 2–3 days" },
    { part: "Feeder module (55–160 kW)", number: "FM-100-B", stock: "Regional · 2–3 days" },
    { part: "Filter mat, standard", number: "FLT-100-S", stock: "Pune depot" },
  ],
};

export default function AssetsPage() {
  const { persona } = usePersona();
  const [q, setQ] = React.useState("");
  const [open, setOpen] = React.useState<string | null>("AST-3001");

  const account = ACCOUNTS.find((a) => a.id === persona.accountId);
  const mine = ASSETS.filter((a) => a.accountId === persona.accountId);
  const list = q.trim()
    ? mine.filter((a) =>
        `${a.serial} ${a.model} ${a.description} ${a.location} ${a.productLine}`
          .toLowerCase()
          .includes(q.toLowerCase()),
      )
    : mine;

  return (
    <Page wide>
      <PageHead
        kicker="Installed base"
        title="Your Veltrix equipment"
        sub={`Every unit at ${account?.name ?? "your site"} by serial number — what covers it, when that expires, what it has failed with before, and which spares fit.`}
      />

      <Card className="mb-6 p-3">
        <div className="flex items-center gap-2 rounded-lg border border-vx-line px-3 py-2">
          <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-vx-slate" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search a serial number, model or location…"
            className="min-w-0 flex-1 bg-transparent text-[14px] outline-none"
          />
        </div>
      </Card>

      {list.length === 0 ? (
        <Empty>No equipment matched that.</Empty>
      ) : (
        <div className="space-y-3">
          {list.map((a) => {
            const c = CONTRACTS.find((x) => x.id === a.contractId);
            const history = CASES.filter((x) => x.assetSerial === a.serial);
            const isOpen = open === a.id;
            const spares = SPARES[a.model] ?? [];
            return (
              <Card key={a.id} className="overflow-hidden">
                <button
                  onClick={() => setOpen(isOpen ? null : a.id)}
                  className="w-full px-5 py-4 text-left transition hover:bg-vx-mist/50"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[13px] font-bold text-vx-navy">
                      {a.serial}
                    </span>
                    <Badge tone={statusTone(a.status)}>{a.status}</Badge>
                    {c && (
                      <Badge tone={c.slaTier === "Platinum" ? "navy" : "amber"}>
                        {c.slaTier}
                      </Badge>
                    )}
                    <span className="ml-auto flex items-center gap-2 text-[11.5px] text-vx-slate">
                      {a.productLine}
                      <svg
                        viewBox="0 0 24 24"
                        className={`h-4 w-4 transition ${isOpen ? "rotate-180" : ""}`}
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
                  <div className="mt-1.5 text-[15px] font-bold text-vx-navy">
                    {a.description}
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11.5px] text-vx-slate">
                    <span>{a.location}</span>
                    <span>Commissioned {a.commissioned}</span>
                    <span>
                      {a.historicCases} historic case
                      {a.historicCases === 1 ? "" : "s"} · {a.openCases} open
                    </span>
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t border-vx-line bg-vx-mist/40 px-5 py-5">
                    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
                      <div>
                        <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.12em] text-vx-slate">
                          Coverage
                        </div>
                        {c ? (
                          <div className="rounded-lg border border-vx-line bg-white p-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                              <KeyValue label="Contract" value={c.id} />
                              <KeyValue label="Type / tier" value={`${c.type} · ${c.slaTier}`} />
                              <KeyValue label="Expires" value={c.endDate} />
                              <KeyValue
                                label="Commitment"
                                value={`${c.responseHrs} hr response · ${c.restoreHrs} hr restore`}
                              />
                              <KeyValue
                                label="On-site"
                                value={c.onSiteIncluded ? "Included" : "Chargeable"}
                              />
                              <KeyValue label="Spares discount" value={c.sparesDiscount} />
                            </div>
                            <div className="mt-3 border-t border-vx-line pt-3">
                              <div className="text-[10px] font-bold uppercase tracking-[0.1em] text-vx-slate">
                                What this contract covers
                              </div>
                              <ul className="mt-1.5 space-y-1">
                                {c.coverage.map((x) => (
                                  <li key={x} className="flex gap-2 text-[12.5px] text-vx-steel">
                                    <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-vx-orange" />
                                    {x}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        ) : (
                          <Empty>No contract found for this asset.</Empty>
                        )}

                        <div className="mb-3 mt-5 text-[10px] font-bold uppercase tracking-[0.12em] text-vx-slate">
                          Case history for this serial
                        </div>
                        {history.length ? (
                          <div className="space-y-2">
                            {history.map((h) => (
                              <div
                                key={h.id}
                                className="rounded-lg border border-vx-line bg-white px-3.5 py-2.5"
                              >
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="font-mono text-[11px] font-bold text-vx-orange">
                                    {h.number}
                                  </span>
                                  <Badge tone={statusTone(h.status)}>{h.status}</Badge>
                                  <span className="ml-auto text-[10.5px] text-vx-slate">
                                    {h.opened}
                                  </span>
                                </div>
                                <div className="mt-1 text-[12.5px] font-semibold text-vx-navy">
                                  {h.subject}
                                </div>
                                <div className="text-[11.5px] text-vx-slate">
                                  {h.failureType}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="rounded-lg border border-dashed border-vx-line px-3.5 py-4 text-[12.5px] text-vx-slate">
                            No cases recorded against this serial number.
                          </div>
                        )}
                      </div>

                      <div>
                        <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.12em] text-vx-slate">
                          Spare parts that fit this unit
                        </div>
                        <div className="overflow-hidden rounded-lg border border-vx-line bg-white">
                          <table className="w-full text-[12.5px]">
                            <thead>
                              <tr className="bg-vx-mist text-left">
                                <th className="px-3 py-2 font-bold text-vx-navy">Part</th>
                                <th className="px-3 py-2 font-bold text-vx-navy">Number</th>
                                <th className="px-3 py-2 font-bold text-vx-navy">Availability</th>
                              </tr>
                            </thead>
                            <tbody>
                              {spares.map((s) => (
                                <tr key={s.number} className="border-t border-vx-line">
                                  <td className="px-3 py-2 text-vx-steel">{s.part}</td>
                                  <td className="px-3 py-2 font-mono text-[11.5px] font-semibold text-vx-navy">
                                    {s.number}
                                  </td>
                                  <td className="px-3 py-2 text-vx-slate">{s.stock}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <p className="mt-2 text-[11.5px] leading-snug text-vx-slate">
                          These come from the as-built bill of materials for this
                          serial number, not from the catalogue — which is why
                          they&apos;re right for the unit you actually own. Prices
                          include your contract discount.
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">
                          <Link
                            href="/cases/new"
                            className="rounded-lg bg-vx-orange px-3.5 py-2 text-[12.5px] font-bold text-white transition hover:bg-[#dd5b13]"
                          >
                            Raise a case for this asset
                          </Link>
                          <Link
                            href={`/knowledge?q=${encodeURIComponent(a.model)}`}
                            className="rounded-lg border border-vx-line bg-white px-3.5 py-2 text-[12.5px] font-bold text-vx-steel transition hover:border-vx-navy hover:text-vx-navy"
                          >
                            {a.model} articles
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </Page>
  );
}
