import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Page, Card, Badge } from "../../../components/ui";
import { ARTICLES, getArticle, getById } from "../../../lib/kb";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/knowledge/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return { title: "Article not found" };
  return { title: `${a.id} — ${a.title}`, description: a.summary };
}

export default async function ArticlePage({
  params,
}: PageProps<"/knowledge/[slug]">) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();

  const related = a.related
    .map((id) => getById(id))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  return (
    <Page>
      <nav className="mb-5 flex flex-wrap items-center gap-1.5 text-[12px] text-vx-slate">
        <Link href="/knowledge" className="font-semibold text-vx-orange hover:underline">
          Technical library
        </Link>
        <span>/</span>
        <Link
          href={`/knowledge?q=${encodeURIComponent(a.category)}`}
          className="hover:underline"
        >
          {a.category}
        </Link>
        <span>/</span>
        <span className="font-mono">{a.id}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1fr_270px]">
        <article>
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="font-mono text-[12px] font-bold text-vx-orange">
              {a.id}
            </span>
            <Badge tone="grey">{a.type}</Badge>
            <Badge tone="grey">{a.productLine}</Badge>
          </div>

          <h1 className="text-[29px] font-bold leading-[1.18] tracking-[-0.02em] text-vx-navy">
            {a.title}
          </h1>
          <p className="mt-2.5 text-[15px] leading-[1.6] text-vx-steel">
            {a.summary}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1.5 border-y border-vx-line py-2.5 text-[11.5px] text-vx-slate">
            <span>
              Applies to <strong className="text-vx-navy">{a.models.join(", ")}</strong>
            </span>
            <span>Last updated {a.updated}</span>
            <span>{a.views.toLocaleString("en-IN")} views</span>
            <span>{a.helpful}% found this helpful</span>
          </div>

          <div
            className="vx-prose mt-6"
            dangerouslySetInnerHTML={{ __html: a.body }}
          />

          <Card className="mt-10 p-5">
            <div className="text-[14px] font-bold text-vx-navy">
              Did this solve it?
            </div>
            <p className="mt-1 text-[13px] leading-snug text-vx-steel">
              If not, raise a case and we&apos;ll pick it up against your
              entitlement. Quote this article number — it tells the engineer what
              you have already tried.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link
                href={`/cases/new?article=${a.id}`}
                className="rounded-lg bg-vx-orange px-4 py-2 text-[13px] font-bold text-white transition hover:bg-[#dd5b13]"
              >
                Raise a case about {a.id}
              </Link>
              <Link
                href="/knowledge"
                className="rounded-lg border border-vx-line px-4 py-2 text-[13px] font-bold text-vx-steel transition hover:border-vx-navy hover:text-vx-navy"
              >
                Back to the library
              </Link>
            </div>
          </Card>
        </article>

        <aside className="space-y-5">
          <Card className="p-4">
            <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-vx-slate">
              Related articles
            </div>
            <div className="mt-2.5 space-y-2.5">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/knowledge/${r.slug}`}
                  className="block rounded-lg border border-vx-line px-3 py-2 transition hover:border-vx-navy"
                >
                  <div className="text-[9.5px] font-bold uppercase tracking-[0.1em] text-vx-orange">
                    {r.id}
                  </div>
                  <div className="mt-0.5 text-[12.5px] font-semibold leading-snug text-vx-navy">
                    {r.title}
                  </div>
                </Link>
              ))}
            </div>
          </Card>

          <Card className="p-4">
            <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-vx-slate">
              Keywords
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {a.keywords.map((k) => (
                <Link
                  key={k}
                  href={`/knowledge?q=${encodeURIComponent(k)}`}
                  className="rounded-md bg-vx-mist px-2 py-[3px] text-[11px] font-medium text-vx-steel transition hover:bg-vx-navy hover:text-white"
                >
                  {k}
                </Link>
              ))}
            </div>
          </Card>

          <div className="rounded-xl bg-vx-navy p-4 text-white">
            <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/60">
              Not sure it&apos;s covered?
            </div>
            <p className="mt-1.5 text-[12.5px] leading-snug text-white/85">
              Ask the assistant with your serial number and it will tell you the
              contract, the tier and the expiry before you raise anything.
            </p>
            <Link
              href="/assets"
              className="mt-3 inline-block rounded-lg bg-vx-orange px-3 py-1.5 text-[12.5px] font-bold text-white transition hover:bg-[#dd5b13]"
            >
              Check installed base
            </Link>
          </div>
        </aside>
      </div>
    </Page>
  );
}
