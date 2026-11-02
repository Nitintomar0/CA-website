export const newsCategories = [
  "All Updates",
  "Taxation",
  "GST",
  "Audit & Assurance",
  "Corporate Law",
  "Business Advisory",
  "Industry Updates",
] as const;

export type NewsCategory = (typeof newsCategories)[number];

export type NewsBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string; level: 2 | 3 }
  | { type: "list"; items: string[] }
  | { type: "callout"; title: string; text: string };

export type NewsArticle = {
  slug: string;
  title: string;
  category: Exclude<NewsCategory, "All Updates">;
  publishedAt?: string;
  excerpt: string;
  content: NewsBlock[];
  coverImage: string;
  imageAlt: string;
  readingTime?: number;
  featured?: boolean;
  isPublished: boolean;
  sources?: { label: string; href: string }[];
};

/*
 * Only approved, published editorial content belongs in this list. It is
 * deliberately empty until firm-authored content and publication information
 * are supplied. Drafts may use `isPublished: false`; public views consume the
 * filtered helpers below and will never display them.
 */
export const newsArticles: NewsArticle[] = [];

export function getPublishedArticles() {
  return newsArticles.filter((article) => article.isPublished);
}

export function getPublishedArticle(slug: string) {
  return getPublishedArticles().find((article) => article.slug === slug);
}

export function formatPublicationDate(value?: string) {
  if (!value) return "Publication date to be confirmed";
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}

export function getReadingTime(article: NewsArticle) {
  const words = article.content.flatMap((block) => {
    if (block.type === "list") return block.items;
    if (block.type === "callout") return [block.title, block.text];
    return [block.text];
  }).join(" ").trim().split(/\s+/).filter(Boolean).length;

  return words ? Math.max(1, Math.ceil(words / 220)) : undefined;
}
