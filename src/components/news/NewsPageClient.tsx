"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ArrowUpRight, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { formatPublicationDate, getReadingTime, newsCategories, type NewsArticle, type NewsCategory } from "@/data/news";

const PAGE_SIZE = 6;

function ArticleMeta({ article }: { article: NewsArticle }) {
  const readingTime = getReadingTime(article);
  return (
    <p className="news-meta">
      <span>{article.category}</span>
      <time dateTime={article.publishedAt}>{formatPublicationDate(article.publishedAt)}</time>
      {readingTime ? <small>{readingTime} min read</small> : null}
    </p>
  );
}

function ArticleCard({ article, featured = false }: { article: NewsArticle; featured?: boolean }) {
  return (
    <article className={`news-card ${featured ? "news-card--featured" : ""}`}>
      <Link href={`/news/${article.slug}`} className="news-card__image" aria-label={`Read ${article.title}`}>
        <Image src={article.coverImage} alt={article.imageAlt} fill sizes={featured ? "(max-width: 899px) 100vw, 53vw" : "(max-width: 640px) 100vw, 33vw"} />
      </Link>
      <div className="news-card__body">
        <ArticleMeta article={article} />
        <h2><Link href={`/news/${article.slug}`}>{article.title}</Link></h2>
        <p>{article.excerpt}</p>
        <Link className="news-card__link" href={`/news/${article.slug}`}>
          Read article <ArrowUpRight aria-hidden="true" size={17} />
        </Link>
      </div>
    </article>
  );
}

export function NewsPageClient({ articles }: { articles: NewsArticle[] }) {
  const rootRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<NewsCategory>("All Updates");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filteredArticles = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return articles.filter((article) => {
      const isInCategory = activeCategory === "All Updates" || article.category === activeCategory;
      const matchesSearch = !normalizedQuery || [article.title, article.excerpt, article.category]
        .join(" ")
        .toLocaleLowerCase()
        .includes(normalizedQuery);
      return isInCategory && matchesSearch;
    });
  }, [activeCategory, articles, query]);

  const featuredArticle = filteredArticles.find((article) => article.featured);
  const visibleArticles = filteredArticles.filter((article) => article.slug !== featuredArticle?.slug).slice(0, page * PAGE_SIZE);
  const hasMore = filteredArticles.filter((article) => article.slug !== featuredArticle?.slug).length > visibleArticles.length;

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger, SplitText);
    let titleSplit: SplitText | null = null;
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      const title = root.querySelector<HTMLElement>(".news-hero h1");
      const visual = root.querySelector<HTMLElement>(".news-hero__visual");
      if (title) {
        titleSplit = SplitText.create(title, { type: "words", wordsClass: "news-hero__word" });
        gsap.fromTo(titleSplit.words, { yPercent: 115, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.82, stagger: 0.055, ease: "power4.out", delay: 0.1 });
      }
      if (visual) gsap.fromTo(visual, { clipPath: "inset(0 0 100% 0)", scale: 1.04 }, { clipPath: "inset(0)", scale: 1, duration: 1.05, ease: "power4.out" });

      media.add("(min-width: 900px)", () => {
        const revealItems = gsap.utils.toArray<HTMLElement>(".news-reveal", root);
        revealItems.forEach((element) => gsap.fromTo(element, { y: 30, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 88%", once: true },
        }));
        const cards = gsap.utils.toArray<HTMLElement>(".news-card", root);
        if (cards.length) gsap.fromTo(cards, { y: 26, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: cards[0].parentElement, start: "top 88%", once: true },
        });
      });
    }, root);

    return () => {
      titleSplit?.revert();
      media.revert();
      context.revert();
    };
  }, []);

  const selectCategory = (category: NewsCategory) => {
    setActiveCategory(category);
    setPage(1);
    if (cardsRef.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.fromTo(cardsRef.current, { opacity: 0.5, y: 8 }, { opacity: 1, y: 0, duration: 0.32, ease: "power2.out", clearProps: "opacity,transform" });
    }
  };

  return (
    <main ref={rootRef} id="main-content" className="news-page">
      <section className="news-hero" aria-labelledby="news-title">
        <div className="container news-hero__grid">
          <div className="news-hero__copy">
            <p className="news-hero__label"><span>ATC</span> Editorial desk</p>
            <h1 id="news-title">Insights That Move Business Forward</h1>
            <p>Stay informed with professional perspectives, regulatory developments and business insights that matter.</p>
            <a href="#news-library" className="news-hero__jump">Explore the library <ArrowUpRight aria-hidden="true" size={17} /></a>
          </div>
          <div className="news-hero__visual" aria-hidden="true">
            <Image src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=88" alt="" fill priority sizes="(max-width: 899px) 100vw, 48vw" />
            <span>JOURNAL<br />01</span>
          </div>
        </div>
      </section>

      <section id="news-library" className="news-library section-padding" aria-labelledby="news-library-title">
        <div className="container">
          <div className="news-library__intro news-reveal">
            <div><p className="eyebrow">The publication</p><h2 id="news-library-title" className="section-heading">A considered view of the matters in front of business.</h2></div>
            <p>Only firm-approved, published material appears here. Use the filters and search to explore the available library.</p>
          </div>

          {!articles.length ? (
            <div className="news-empty news-reveal">
              <span>Editorial desk</span>
              <h2>New perspectives are being prepared.</h2>
              <p>We will publish firm-approved insights here when they are ready to share. For a current enquiry, please contact our team directly.</p>
            </div>
          ) : featuredArticle ? (
            <div className="news-feature news-reveal"><ArticleCard article={featuredArticle} featured /></div>
          ) : null}

          <div className="news-controls news-reveal" aria-label="Filter published insights">
            <div className="news-category-list" role="tablist" aria-label="News categories">
              {newsCategories.map((category) => (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === category}
                  className={activeCategory === category ? "is-active" : ""}
                  onClick={() => selectCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            <label className="news-search">
              <span className="sr-only">Search published insights</span>
              <Search aria-hidden="true" size={17} />
              <input value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} placeholder="Search insights" type="search" />
            </label>
          </div>

          <div className="news-grid" ref={cardsRef} aria-live="polite">
            {visibleArticles.map((article) => <ArticleCard key={article.slug} article={article} />)}
          </div>
          {articles.length > 0 && !visibleArticles.length ? <p className="news-results-empty">No published insights match this selection.</p> : null}
          {hasMore ? <button className="news-load-more" type="button" onClick={() => setPage((current) => current + 1)}>Load more perspectives <ArrowUpRight aria-hidden="true" size={17} /></button> : null}
        </div>
      </section>
    </main>
  );
}
