import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getNewsBySlug, getLatestNews } from '@/lib/data';
import CommentSection from '@/components/CommentSection';
import SubscriptionBox from '@/components/SubscriptionBox';

interface DetailPageProps {
  params: Promise<{
    categorySlug: string;
    encodedTitle: string;
  }> | {
    categorySlug: string;
    encodedTitle: string;
  };
}

export default async function ArticleDetailPage({ params }: DetailPageProps) {
  const resolvedParams = await params;
  const news = getNewsBySlug(resolvedParams.categorySlug, resolvedParams.encodedTitle);

  if (!news) {
    notFound();
  }

  const relatedNews = getLatestNews()
    .filter(n => n.category_id === news.category_id && n.news_id !== news.news_id)
    .slice(0, 4);

  const hotSidebarNews = getLatestNews()
    .filter(n => n.news_id !== news.news_id)
    .slice(0, 3);

  return (
    <section className="detail-wrap-area">
      <div className="detail-layout-container">
        {/* LEFT ARTICLE CONTAINER */}
        <div className="detail-left-area">
          {/* Breadcrumb */}
          <div className="detail-breadcrumb-card">
            <Link href="/" title="New Yorker Herald Home">Home</Link>
            &nbsp;&raquo;&nbsp;
            <Link href={`/category/${news.category?.slug}`} title={`${news.category?.category_name || 'News'} News`}>
              {news.category?.category_name || 'News'}
            </Link>
            &nbsp;&raquo;&nbsp; {news.news_title.slice(0, 60)}
          </div>

          {/* ARTICLE BODY */}
          <div className="detail-article-card">
            <span className="detail-cat-label">
              {news.category?.category_name || 'NEWS'}
            </span>

            <h1 className="detail-main-title">
              {news.news_title}
            </h1>

            <div className="detail-meta-row">
              {news.author ? (
                <>
                  <img
                    src={`/uploads/authors/${news.author.image}`}
                    className="author-mini-pic"
                    alt={`Author ${news.author.name}`}
                  />
                  <Link href={`/author/${news.author.slug}`} title={`Articles by ${news.author.name}`} className="detail-author-link">
                    {news.author.name}
                  </Link>
                </>
              ) : (
                <>
                  <img src="/images/human.avif" className="author-mini-pic" alt="Admin author" />
                  <span>Admin</span>
                </>
              )}
              <span className="detail-date">
                <img src="/images/clock.webp" alt="Published on" style={{ width: '13px', height: '13px', verticalAlign: 'middle', opacity: 0.6 }} />
                {news.news_date}
              </span>
            </div>

            <div className="detail-main-image">
              <img
                src={news.photo ? `/uploads/news/${news.photo}` : '/images/default-news.jpg'}
                alt={news.news_title}
              />
            </div>

            <div
              className="detail-content-text"
              dangerouslySetInnerHTML={{ __html: news.news_content }}
            />
          </div>

          {/* COMMENT SECTION - PLACED JUST BELOW ARTICLE CONTENT */}
          <CommentSection articleId={news.news_id} />

          {/* INLINE SUBSCRIPTION WIDGET */}
          <SubscriptionBox />

          {/* RELATED NEWS */}
          <div className="related-card-wrapper">
            <h2 className="related-card-heading">Related News</h2>
            <div className="related-card-grid">
              {relatedNews.map(item => (
                <div key={item.news_id} className="related-card-item">
                  <div className="related-card-image">
                    <img
                      src={item.photo ? `/uploads/news/${item.photo}` : '/images/default-news.jpg'}
                      alt={item.news_title}
                    />
                  </div>
                  <div className="related-card-content">
                    <h3 className="related-card-title">
                      <Link href={`/${item.category?.slug}/${item.encode_title}`} title={item.news_title} className="text-dark text-decoration-none">
                        {item.news_title}
                      </Link>
                    </h3>
                    <div className="related-card-meta">
                      {item.author ? (
                        <>
                          <img src={`/uploads/authors/${item.author.image}`} className="author-mini-pic" alt={item.author.name} />
                          {item.author.name}
                        </>
                      ) : (
                        <>
                          <img src="/images/human.avif" className="author-mini-pic" alt="Admin" />
                          Admin
                        </>
                      )}
                      <span>{item.news_date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <aside className="detail-right-area">
          <h2 className="news-title">Find Me On</h2>
          <div className="sidebar-box">
            <div className="sidebar-social">
              <a href="https://www.instagram.com/newyorker_herald/" target="_blank" rel="noopener noreferrer" title="Follow New Yorker Herald on Instagram">
                <img src="/images/footer-instagram.webp" alt="Instagram" />
              </a>
              <a href="https://x.com/NewYorkerHerald" target="_blank" rel="noopener noreferrer" title="Follow New Yorker Herald on Twitter">
                <img src="/images/footer-twitter.webp" alt="Twitter" />
              </a>
            </div>
          </div>

          <div className="sidebar-box">
            <a href="https://latamchronicle.com/" target="_blank" rel="noopener noreferrer">
              <img src="/images/Group97.svg" className="sidebar-ad" alt="Advertisement" width="300" height="400" loading="lazy" />
            </a>
          </div>

          <h2 className="news-title">Latest News</h2>
          <div className="sidebar-box">
            {hotSidebarNews.map(hot => (
              <div key={hot.news_id} className="sidebar-card">
                <div className="sidebar-card-img">
                  <img
                    src={hot.photo ? `/uploads/news/${hot.photo}` : '/images/default-news.jpg'}
                    alt={hot.news_title}
                  />
                  <span className="sidebar-tag">
                    {hot.category?.category_name || 'News'}
                  </span>
                </div>
                <h3 className="sidebar-card-title">
                  <Link href={`/${hot.category?.slug}/${hot.encode_title}`} title={hot.news_title} className="text-dark text-decoration-none">
                    {hot.news_title}
                  </Link>
                </h3>
                <div className="sidebar-card-date">
                  {hot.news_date}
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
