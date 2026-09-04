import type { Article } from "./kb-types";
import { PUMP_ARTICLES } from "./kb-pumps";
import { GENERAL_ARTICLES } from "./kb-general";

export type { Article, ArticleType } from "./kb-types";

export const ARTICLES: Article[] = [...PUMP_ARTICLES, ...GENERAL_ARTICLES];

export const CATEGORIES = Array.from(
  new Set(ARTICLES.map((a) => a.category)),
).sort();

export const PRODUCT_LINES = Array.from(
  new Set(ARTICLES.map((a) => a.productLine)),
);

export const TYPES = Array.from(new Set(ARTICLES.map((a) => a.type)));

export const getArticle = (slug: string) =>
  ARTICLES.find((a) => a.slug === slug);

export const getById = (id: string) => ARTICLES.find((a) => a.id === id);

/** naive but effective relevance search across title, summary and keywords */
export function searchArticles(q: string, limit = 20): Article[] {
  const query = q.trim().toLowerCase();
  if (!query) return [];
  const terms = query.split(/\s+/).filter((t) => t.length > 1);
  if (!terms.length) return [];

  const scored = ARTICLES.map((a) => {
    const title = a.title.toLowerCase();
    const summary = a.summary.toLowerCase();
    const kw = a.keywords.join(" ").toLowerCase();
    const models = a.models.join(" ").toLowerCase();
    const id = a.id.toLowerCase();
    let score = 0;

    if (id === query || title === query) score += 100;
    if (id.includes(query)) score += 60;
    if (title.includes(query)) score += 40;

    for (const t of terms) {
      if (title.includes(t)) score += 12;
      if (kw.includes(t)) score += 9;
      if (models.includes(t)) score += 7;
      if (summary.includes(t)) score += 4;
      if (a.body.toLowerCase().includes(t)) score += 1;
    }
    // popularity nudge so ties resolve sensibly
    score += Math.min(a.views / 2000, 3);
    return { a, score };
  })
    .filter((s) => s.score > 3)
    .sort((x, y) => y.score - x.score)
    .slice(0, limit);

  return scored.map((s) => s.a);
}

export const popularArticles = (n = 6) =>
  [...ARTICLES].sort((a, b) => b.views - a.views).slice(0, n);
