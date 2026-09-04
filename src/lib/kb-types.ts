export type ArticleType =
  | "Troubleshooting"
  | "How-To"
  | "Reference"
  | "FAQ"
  | "Policy"
  | "Safety";

export type Article = {
  id: string;
  title: string;
  slug: string;
  category: string;
  productLine:
    | "Centrifugal Pumps"
    | "Motors & Drives"
    | "Control Panels"
    | "Commercial"
    | "All products";
  type: ArticleType;
  summary: string;
  keywords: string[];
  models: string[];
  updated: string;
  views: number;
  helpful: number;
  related: string[];
  /** trusted, authored HTML — rendered inside .vx-prose */
  body: string;
};
