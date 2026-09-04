"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Page, PageHead, Card, Badge, KeyValue } from "../../../components/ui";
import { usePersona } from "../../../components/PersonaContext";
import { ACCOUNTS, CONTRACTS, ASSETS } from "../../../lib/org";
import { searchArticles, getById } from "../../../lib/kb";

function NewCaseInner() {
  const params = useSearchParams();
  const fromArticle = params.get("article");
  const { persona } = usePersona();

  const account = ACCOUNTS.find((a) => a.id === persona.accountId);
  const contract = CONTRACTS.find((c) => c.accountId === persona.accountId);
  const assets = ASSETS.filter((a) => a.accountId === persona.accountId);

  const [serial, setSerial] = React.useState(assets[0]?.serial ?? "");
  const [subject, setSubject] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [impact, setImpact] = React.useState("Degraded — running with a workaround");
  const [submitted, setSubmitted] = React.useState(false);
  const [deflected, setDeflected] = React.useState(false);

  const asset = assets.find((a) => a.serial === serial);
  const assetContract = asset
    ? CONTRACTS.find((c) => c.id === asset.contractId)
    : contract;

  const priority = impact.startsWith("Production stopped")
    ? "P1 — Production down"
    : impact.startsWith("Degraded")
      ? "P2 — Degraded"
      : "P3 — Question";

  const suggestions = React.useMemo(() => {
    const seed = fromArticle
      ? [getById(fromArticle)].filter((x): x is NonNullable<typeof x> => Boolean(x))
      : [];
    const q = `${subject} ${description}`.trim();
    const found = q.length > 3 ? searchArticles(q, 3) : [];
    const merged = [...seed, ...found.filter((f) => !seed.some((s) => s.id === f.id))];
    return merged.slice(0, 3);
  }, [subject, description, fromArticle]);

  if (deflected) {
    return (
      <Page>
        <Card className="p-8 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-vx-green-2">
            <svg viewBox="0 0 24 24" className="h-6 w-6 text-vx-green" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12l5 5L20 6" />
            </svg>
          </div>
          <h2 className="text-[22px] font-bold text-vx-navy">
            Glad that sorted it.
          </h2>
          <p className="mx-auto mt-2 max-w-[520px] text-[14px] leading-relaxed text-vx-steel">
            Nothing was raised, so nothing sits in a queue. We log which article
            resolved it so we can see what the library is actually preventing.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <Link href="/knowledge" className="rounded-lg bg-vx-navy px-4 py-2 text-[13px] font-bold text-white">
              Back to the library
            </Link>
            <button
              onClick={() => setDeflected(false)}
              className="rounded-lg border border-vx-line px-4 py-2 text-[13px] font-bold text-vx-steel hover:border-vx-navy hover:text-vx-navy"
            >
              Actually, I still need help
            </button>
          </div>
        </Card>
      </Page>
    );
  }

  if (submitted) {
    return (
      <Page>
        <Card className="overflow-hidden">
          <div className="bg-vx-navy px-8 py-7 text-white">
            <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-vx-orange">
              Case created
            </div>
            <h2 className="mt-1.5 text-[26px] font-bold leading-tight">
              Case 00042Y21 is with our service team.
            </h2>
            <p className="mt-2 max-w-[620px] text-[14px] leading-relaxed text-white/75">
              Your entitlement resolved automatically — nobody had to look it up.
              The clock is running and you can watch it on the case.
            </p>
          </div>
          <div className="grid gap-5 px-8 py-6 sm:grid-cols-2 lg:grid-cols-4">
            <KeyValue label="Priority" value={priority} />
            <KeyValue
              label="Entitlement"
              value={`${assetContract?.id ?? "—"} · ${assetContract?.slaTier ?? "—"}`}
            />
            <KeyValue
              label="Response commitment"
              value={`${assetContract?.responseHrs ?? "—"} hours`}
            />
            <KeyValue
              label="Restore commitment"
              value={`${assetContract?.restoreHrs ?? "—"} hours`}
            />
            <KeyValue label="Asset" value={serial || "Not specified"} mono />
            <KeyValue label="Raised by" value={`${persona.name} · ${persona.role}`} />
            <KeyValue label="Account" value={account?.name ?? "—"} />
            <KeyValue label="Channel" value="Partner Portal" />
          </div>
          <div className="flex flex-wrap gap-2 border-t border-vx-line bg-vx-mist px-8 py-4">
            <Link href="/cases" className="rounded-lg bg-vx-orange px-4 py-2 text-[13px] font-bold text-white">
              Track my cases
            </Link>
            <button
              onClick={() => {
                setSubmitted(false);
                setSubject("");
                setDescription("");
              }}
              className="rounded-lg border border-vx-line bg-white px-4 py-2 text-[13px] font-bold text-vx-steel hover:border-vx-navy hover:text-vx-navy"
            >
              Log another
            </button>
          </div>
        </Card>
        <p className="mt-4 text-center text-[11.5px] text-vx-slate">
          Demo environment — no case was actually created. Wire this form to
          Salesforce with a Web-to-Case endpoint or the REST API when you&apos;re
          ready.
        </p>
      </Page>
    );
  }

  return (
    <Page>
      <PageHead
        kicker="Support"
        title="Log a case"
        sub="We already know who you are, which plant you're at and what you're entitled to — so this only asks for what we don't have."
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          <Card className="p-6">
            <Field label="Which equipment?">
              <select
                value={serial}
                onChange={(e) => setSerial(e.target.value)}
                className="w-full rounded-lg border border-vx-line px-3 py-2.5 text-[14px] outline-none focus:border-vx-navy"
              >
                <option value="">Not equipment-specific</option>
                {assets.map((a) => (
                  <option key={a.id} value={a.serial}>
                    {a.serial} — {a.model}, {a.location}
                  </option>
                ))}
              </select>
              {asset && assetContract && (
                <div className="mt-2 flex flex-wrap items-center gap-2 rounded-lg bg-vx-green-2 px-3 py-2">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-vx-green" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 12l5 5L20 6" />
                  </svg>
                  <span className="text-[12.5px] font-semibold text-vx-green">
                    Covered under {assetContract.id} · {assetContract.slaTier} ·
                    until {assetContract.endDate}
                  </span>
                </div>
              )}
            </Field>

            <Field label="What's the problem?">
              <input
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Mechanical seal leaking on the Line 3 cooling water pump"
                className="w-full rounded-lg border border-vx-line px-3 py-2.5 text-[14px] outline-none focus:border-vx-navy"
              />
            </Field>

            <Field
              label="Tell us more"
              hint="What changed, when it started, what you've already tried, and any readings you have."
            >
              <textarea
                required
                rows={6}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Steady drip from the seal chamber since about 06:00, getting worse. Line taken offline at 06:20. This is the second seal on this unit in 14 months."
                className="w-full resize-y rounded-lg border border-vx-line px-3 py-2.5 text-[14px] leading-relaxed outline-none focus:border-vx-navy"
              />
            </Field>

            <Field label="What's the impact right now?">
              <div className="space-y-2">
                {[
                  "Production stopped — the line is down",
                  "Degraded — running with a workaround",
                  "No impact — this is a question or a planned request",
                ].map((o) => (
                  <label
                    key={o}
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border px-3.5 py-2.5 transition ${
                      impact === o
                        ? "border-vx-navy bg-vx-mist"
                        : "border-vx-line hover:border-vx-slate"
                    }`}
                  >
                    <input
                      type="radio"
                      name="impact"
                      checked={impact === o}
                      onChange={() => setImpact(o)}
                      className="accent-vx-navy"
                    />
                    <span className="text-[13.5px] text-[#22333f]">{o}</span>
                  </label>
                ))}
              </div>
              <div className="mt-2 text-[11.5px] text-vx-slate">
                This sets the priority to{" "}
                <strong className="text-vx-navy">{priority}</strong>. Priority is
                derived from stated impact, not from who is asking.
              </div>
            </Field>

            <button
              type="submit"
              className="mt-2 w-full rounded-lg bg-vx-orange px-4 py-3 text-[14px] font-bold text-white transition hover:bg-[#dd5b13]"
            >
              Submit case
            </button>
          </Card>
        </form>

        <aside className="space-y-5">
          {suggestions.length > 0 && (
            <Card className="overflow-hidden">
              <div className="bg-vx-amber-2 px-4 py-2.5">
                <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-vx-amber">
                  Before you submit
                </div>
                <div className="mt-0.5 text-[12px] leading-snug text-[#7a4d00]">
                  These look relevant. If one of them answers it, you&apos;ll get
                  a fix now rather than a queue position.
                </div>
              </div>
              <div className="divide-y divide-vx-line">
                {suggestions.map((s) => (
                  <Link
                    key={s.id}
                    href={`/knowledge/${s.slug}`}
                    className="block px-4 py-3 transition hover:bg-vx-mist"
                  >
                    <div className="text-[9.5px] font-bold uppercase tracking-[0.1em] text-vx-orange">
                      {s.id} · {s.type}
                    </div>
                    <div className="mt-0.5 text-[12.5px] font-semibold leading-snug text-vx-navy">
                      {s.title}
                    </div>
                  </Link>
                ))}
              </div>
              <button
                onClick={() => setDeflected(true)}
                className="w-full border-t border-vx-line bg-vx-green-2 px-4 py-2.5 text-[12.5px] font-bold text-vx-green transition hover:bg-[#cdeeda]"
              >
                One of these solved it — don&apos;t raise a case
              </button>
            </Card>
          )}

          <Card className="p-4">
            <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-vx-slate">
              We already have
            </div>
            <div className="mt-2.5 space-y-3">
              <KeyValue label="Contact" value={`${persona.name} · ${persona.role}`} />
              <KeyValue label="Account" value={account?.name ?? "—"} />
              <KeyValue
                label="Entitlement"
                value={
                  <span className="flex items-center gap-2">
                    {assetContract?.id ?? "—"}
                    {assetContract && (
                      <Badge tone={assetContract.slaTier === "Platinum" ? "navy" : "amber"}>
                        {assetContract.slaTier}
                      </Badge>
                    )}
                  </span>
                }
              />
              <KeyValue
                label="Commitment"
                value={
                  assetContract
                    ? `${assetContract.responseHrs} hr response · ${assetContract.restoreHrs} hr restore`
                    : "—"
                }
              />
              <KeyValue label="Site" value={asset?.location ?? account?.city ?? "—"} />
            </div>
            <p className="mt-3 border-t border-vx-line pt-3 text-[11.5px] leading-snug text-vx-slate">
              None of this is retyped by you or looked up by an agent. It comes
              from the contract and installed-base records against your account.
            </p>
          </Card>
        </aside>
      </div>
    </Page>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5">
      <label className="mb-1.5 block text-[13px] font-bold text-vx-navy">
        {label}
      </label>
      {hint && (
        <div className="mb-1.5 text-[12px] leading-snug text-vx-slate">{hint}</div>
      )}
      {children}
    </div>
  );
}

export default function NewCasePage() {
  return (
    <Suspense fallback={<Page><div className="py-20 text-center text-vx-slate">Loading…</div></Page>}>
      <NewCaseInner />
    </Suspense>
  );
}
