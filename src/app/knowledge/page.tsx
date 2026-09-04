"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Page, PageHead, Card, Badge, Empty } from "../../components/ui";
import { ARTICLES, searchArticles, CATEGORIES, TYPES } from "../../lib/kb";
import type { Article } from "../../lib/kb-types";

const LINES = [
  "Centrifugal Pumps",
  "Motors & Drives",
  "Control Panels",
  "Commercial",
  "All products",
];

function typeTone(t: string) {
  switch (t) {
    case "Troubleshooting":
      return "orange" as const;
    case "How-To":
      return "navy" as const;
    case "Safety":
      return "red" as const;
    case "Policy":
      return "amber" as const;
    default:
      return "grey" as const;
  }
}

function ArticleRow({ a }: { a: Article }) {
  return (
    <Link href={`/knowledge/${a.slug}`} className="block">
      <Card className="p-4 transition hover:border-vx-navy">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[11.5px] font-bold text-vx-orange">
            {a.id}
          </span>
          <Badge tone={typeTone(a.type)}>{a.type}</Badge>
          <span className="text-[11px] text-vx-slate">{a.category}</span>
          <span className="ml-auto text-[11px] text-vx-slate">
            Updated {a.updated}
          </span>
        </div>
        <h3 className="mt-1.5 text-[15.5px] font-bold leading-snug text-vx-navy">
          {a.title}
        </h3>
        <p className="mt-1 text-[13px] leading-[1.55] text-vx-steel">
          {a.summary}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-vx-slate">
          <span>{a.models.join(", ")}</span>
          <span>{a.views.toLocaleString("en-IN")} views</span>
          <span>{a.helpful}% helpful</span>
        </div>
      </Card>
    </Link>
  );
}

function KnowledgeInner() {
  const params = useSearchParams();
  const initial = params.get("q") ?? "";
  const [q, setQ] = React.useState(initial);
  const [line, setLine] = React.useState<string>("");
  const [type, setType] = React.useState<string>("");
  const [cat, setCat] = React.useState<string>("");

  React.useEffect(() => setQ(initial), [initial]);

  const results = React.useMemo(() => {
    let list = q.trim() ? searchArticles(q, 50) : ARTICLES;
    if (line) list = list.filter((a) => a.productLine === line);
    if (type) list = list.filter((a) => a.type === type);
    if (cat) list = list.filter((a) => a.category === cat);
    return list;
  }, [q, line, type, cat]);

  const grouped = React.useMemo(() => {
    const map = new Map<string, Article[]>();
    for (const a of results) {
      const k = a.category;
      map.set(k, [...(map.get(k) ?? []), a]);
    }
    return Array.from(map.entries()).sort((x, y) => x[0].localeCompare(y[0]));
  }, [results]);

  const filtered = Boolean(q.trim() || line || type || cat);

  return (
    <Page wide>
      <PageHead
        kicker="Technical library"
        title="Knowledge base"
        sub={`${ARTICLES.length} articles covering VX-series pumps, VM-series motors, CP-100 control panels, contracts and entitlements, spare parts and commissioning.`}
      />

      {/* search + filters */}
      <Card className="mb-6 p-4">
        <div className="flex items-center gap-2 rounded-lg border border-vx-line px-3 py-2">
          <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-vx-slate" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search titles, keywords, model numbers and article bodies…"
            className="min-w-0 flex-1 bg-transparent text-[14px] outline-none"
          />
          {q && (
            <button
              onClick={() => setQ("")}
              className="shrink-0 text-[12px] font-semibold text-vx-slate hover:text-vx-navy"
            >
              Clear
            </button>
          )}
        </div>

        <div className="mt-3 flex flex-wrap gap-4">
          <Filter label="Product line" value={line} onChange={setLine} options={LINES} />
          <Filter label="Article type" value={type} onChange={setType} options={TYPES} />
          <Filter label="Category" value={cat} onChange={setCat} options={CATEGORIES} />
          {filtered && (
            <button
              onClick={() => {
                setQ("");
                setLine("");
                setType("");
                setCat("");
              }}
              className="self-end rounded-lg border border-vx-line px-3 py-1.5 text-[12px] font-semibold text-vx-steel transition hover:border-vx-navy hover:text-vx-navy"
            >
              Reset filters
            </button>
          )}
        </div>
      </Card>

      <div className="mb-3 text-[12.5px] font-semibold text-vx-slate">
        {results.length} article{results.length === 1 ? "" : "s"}
        {q.trim() && ` matching “${q.trim()}”`}
      </div>

      {results.length === 0 ? (
        <Empty>
          Nothing matched that. Try a model number (VX-450), a trip code (E14),
          or a symptom (leaking, vibration, hot). Or{" "}
          <Link href="/cases/new" className="font-semibold text-vx-orange underline">
            raise a case
          </Link>{" "}
          and we&apos;ll answer it.
        </Empty>
      ) : q.trim() ? (
        <div className="space-y-3">
          {results.map((a) => (
            <ArticleRow key={a.id} a={a} />
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          {grouped.map(([category, list]) => (
            <section key={category}>
              <h2 className="mb-3 border-b border-vx-line pb-2 text-[13px] font-bold uppercase tracking-[0.1em] text-vx-slate">
                {category}
              </h2>
              <div className="space-y-3">
                {list.map((a) => (
                  <ArticleRow key={a.id} a={a} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </Page>
  );
}

function Filter({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="block text-[10px] font-bold uppercase tracking-[0.1em] text-vx-slate">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 rounded-lg border border-vx-line bg-white px-2.5 py-1.5 text-[12.5px] font-medium text-vx-navy outline-none focus:border-vx-navy"
      >
        <option value="">All</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function KnowledgePage() {
  return (
    <Suspense fallback={<Page wide><div className="py-20 text-center text-vx-slate">Loading…</div></Page>}>
      <KnowledgeInner />
    </Suspense>
  );
}
