"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowUpRight, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import { formatPublicationDate, getReadingTime, type NewsArticle } from "@/data/news";

function ShareArticle({ title }: { title: string }) {
  const [message, setMessage] = useState("");
  const share = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title, url: window.location.href });
        return;
      }
      await navigator.clipboard?.writeText(window.location.href);
      setMessage("Article link copied to your clipboard.");
    } catch {
      setMessage("Sharing was cancelled or is not available in this browser.");
    }
  };
  return <div className="article-share"><button type="button" onClick={share}><Share2 aria-hidden="true" size={16} /> Share article</button><span aria-live="polite">{message}</span></div>;
}

export function NewsArticleClient({ article, relatedArticles }: { article: NewsArticle; relatedArticles: NewsArticle[] }) {
  const rootRef = useRef<HTMLElement>(null);
  const readingTime = getReadingTime(article);
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      const heroImage = root.querySelector<HTMLElement>(".article-hero__image");
      if (heroImage) gsap.fromTo(heroImage, { clipPath: "inset(0 0 100% 0)", scale: 1.03 }, { clipPath: "inset(0)", scale: 1, duration: 1, ease: "power4.out" });
      media.add("(min-width: 900px)", () => {
        gsap.utils.toArray<HTMLElement>(".article-reveal", root).forEach((element) => gsap.fromTo(element, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 88%", once: true } }));
      });
    }, root);
    return () => { media.revert(); context.revert(); };
  }, []);

  return (
    <main ref={rootRef} id="main-content" className="article-page">
      <article>
        <header className="article-hero">
          <div className="container article-hero__copy">
            <nav aria-label="Breadcrumb"><Link href="/news"><ArrowLeft aria-hidden="true" size={15} /> News & insights</Link><span>/</span><span>{article.category}</span></nav>
            <p className="eyebrow eyebrow--light">{article.category}</p>
            <h1>{article.title}</h1>
            <p>{article.excerpt}</p>
            <div className="article-hero__meta"><time dateTime={article.publishedAt}>{formatPublicationDate(article.publishedAt)}</time>{readingTime ? <span>{readingTime} min read</span> : null}</div>
          </div>
        </header>
        <div className="container article-hero__image"><Image src={article.coverImage} alt={article.imageAlt} fill priority sizes="(max-width: 899px) 100vw, 82vw" /></div>
        <div className="container article-layout">
          <div className="article-layout__rail article-reveal"><ShareArticle title={article.title} /></div>
          <div className="article-content">
            {article.content.map((block, index) => {
              if (block.type === "heading") return block.level === 2 ? <h2 className="article-reveal" key={`${block.text}-${index}`}>{block.text}</h2> : <h3 className="article-reveal" key={`${block.text}-${index}`}>{block.text}</h3>;
              if (block.type === "list") return <ul className="article-reveal" key={`list-${index}`}>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>;
              if (block.type === "callout") return <aside className="article-callout article-reveal" key={`${block.title}-${index}`}><strong>{block.title}</strong><p>{block.text}</p></aside>;
              return <p className="article-reveal" key={`${block.text}-${index}`}>{block.text}</p>;
            })}
            {article.sources?.length ? <section className="article-sources article-reveal"><h2>Sources</h2><ul>{article.sources.map((source) => <li key={source.href}><a href={source.href} target="_blank" rel="noreferrer">{source.label} <ArrowUpRight aria-hidden="true" size={14} /></a></li>)}</ul></section> : null}
          </div>
        </div>
      </article>
      <section className="article-cta"><div className="container article-cta__inner"><p className="eyebrow eyebrow--light">A considered conversation</p><h2>Put the right context around your next decision.</h2><Link className="button button--gold" href="/contact">Speak with our team <ArrowUpRight aria-hidden="true" size={17} /></Link></div></section>
      {relatedArticles.length ? <section className="article-related section-padding"><div className="container"><div className="article-related__heading"><p className="eyebrow">Continue reading</p><h2 className="section-heading">Related perspectives</h2></div><div className="article-related__grid">{relatedArticles.map((related) => <Link href={`/news/${related.slug}`} key={related.slug}><span>{related.category}</span><h3>{related.title}</h3><ArrowUpRight aria-hidden="true" size={17} /></Link>)}</div></div></section> : null}
    </main>
  );
}
