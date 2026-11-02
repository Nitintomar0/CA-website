import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { NewsArticleClient } from "@/components/news/NewsArticleClient";
import { getPublishedArticle, getPublishedArticles } from "@/data/news";

type Props = { params: Promise<{ slug: string }> };

// Articles are deliberately added only after approval. Until then this dynamic
// route must resolve the requested slug before it can return its honest 404.
export const instant = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getPublishedArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/news/${article.slug}` },
    openGraph: { title: article.title, description: article.excerpt, images: [{ url: article.coverImage, alt: article.imageAlt }] },
  };
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getPublishedArticle(slug);
  if (!article) notFound();
  const relatedArticles = getPublishedArticles().filter((candidate) => candidate.slug !== slug && candidate.category === article.category).slice(0, 3);
  return <><Header /><NewsArticleClient article={article} relatedArticles={relatedArticles} /><Footer /></>;
}
