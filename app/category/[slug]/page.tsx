import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCategoryBySlug, getNewsByCategory, getLatestNews } from '@/lib/data';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }> | {
    slug: string;
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  const category = getCategoryBySlug(resolvedParams.slug);

  if (!category) {
    notFound();
  }

  const categoryArticles = getNewsByCategory(category.category_id);
  const latestNews = getLatestNews().slice(0, 4);
  const hotNews = getLatestNews().slice(4, 5)[0] || latestNews[0];

  return (
    <section className="triple-news-section">
      <div className="triple-news-container">
        {/* LEFT COLUMN */}
        <div className="triple-left">
          <div className="detail-breadcrumb-card">
            <Link href="/" title="Home - New Yorker Herald">Home</Link> »{' '}
            <Link href={`/category/${category.slug}`} title={`${category.category_name} News - New Yorker Herald`}>
              {category.category_name}
            </Link>
          </div>
          <br />

          <h1 className="news-title">
            {category.category_name} News – New Yorker Herald
          </h1>
          <br />
          <p className="category-intro">
            Welcome to the New Yorker Herald&apos;s {category.category_name} section. Stay informed with the latest {category.category_name} news, in-depth analysis, and breaking stories — all curated by the New Yorker Herald newsroom.
          </p>
          <br />

          {categoryArticles.length === 0 ? (
            <div className="triple-post">
              <div className="triple-content">
                <h2>No posts available in this category.</h2>
              </div>
            </div>
          ) : (
            categoryArticles.map(item => (
              <div key={item.news_id} className="triple-post">
                <div className="triple-thumb">
                  <Link href={`/${category.slug}/${item.encode_title}`} title={`${item.news_title} - New Yorker Herald`}>
                    <img
                      src={item.photo ? `/uploads/news/${item.photo}` : '/images/default-news.jpg'}
                      alt={item.news_title}
                      width="160"
                      height="160"
                      loading="lazy"
                    />
                  </Link>
                  <span className="triple-tag">{item.category?.category_name || 'News'}</span>
                </div>

                <div className="triple-content">
                  <h2>
                    <Link href={`/${category.slug}/${item.encode_title}`} title={`${item.news_title} - New Yorker Herald`} className="text-dark text-decoration-none">
                      {item.news_title}
                    </Link>
                  </h2>

                  <div className="triple-meta">
                    {item.author ? (
                      <>
                        <img src={`/uploads/authors/${item.author.image}`} className="author-mini-pic" alt={item.author.name} />
                        <Link href={`/author/${item.author.slug}`} title={`${item.author.name} - Author at New Yorker Herald`} className="text-dark text-decoration-none">
                          {item.author.name}
                        </Link>
                      </>
                    ) : (
                      <>
                        <img src="/images/human.avif" className="author-mini-pic" alt="Admin - New Yorker Herald" />
                        Admin
                      </>
                    )}
                    <span className="triple-meta-dot">•</span>
                    {item.news_date}
                  </div>

                  <p>
                    {item.news_content_short ? item.news_content_short.slice(0, 120) + '...' : ''}
                  </p>

                  <Link href={`/${category.slug}/${item.encode_title}`} title={`Read More: ${item.news_title}`} className="read-more-btn">
                    Read More
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>

        {/* MIDDLE COLUMN */}
        <div className="triple-middle">
          <h2 className="news-title">Latest News</h2>
          <br />
          {latestNews.map(item => (
            <React.Fragment key={item.news_id}>
              <div className="featured-card">
                <div className="featured-image">
                  <Link href={`/${item.category?.slug}/${item.encode_title}`} title={`${item.news_title} - New Yorker Herald`}>
                    <img
                      src={item.photo ? `/uploads/news/${item.photo}` : '/images/default-news.jpg'}
                      alt={item.news_title}
                      width="300"
                      height="200"
                      loading="lazy"
                    />
                  </Link>
                </div>
                <div className="featured-content">
                  <div className="featured-category">{item.category?.category_name || 'News'}</div>
                  <h3 className="featured-title">
                    <Link href={`/${item.category?.slug}/${item.encode_title}`} title={`${item.news_title} - New Yorker Herald`} className="text-dark text-decoration-none">
                      {item.news_title}
                    </Link>
                  </h3>
                  <div className="featured-meta" style={{ marginTop: '6px' }}>
                    {item.author ? (
                      <span className="featured-author">
                        <img src={`/uploads/authors/${item.author.image}`} className="author-mini-pic" alt={item.author.name} />
                        <Link href={`/author/${item.author.slug}`} title={`${item.author.name} - Author at New Yorker Herald`} className="text-dark text-decoration-none">
                          {item.author.name}
                        </Link>
                      </span>
                    ) : (
                      <span className="featured-author">
                        <img src="/images/human.avif" className="author-mini-pic" alt="Admin" />
                        <span>Admin</span>
                      </span>
                    )}
                    <span className="featured-date">{item.news_date}</span>
                  </div>
                </div>
              </div>
              <br />
            </React.Fragment>
          ))}
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="triple-sidebar">
          <h2 className="news-title">Find Me On</h2>
          <br />
          <div className="sidebar-box">
            <div className="sidebar-social">
              <a href="https://www.instagram.com/newyorker_herald/" target="_blank" rel="noopener noreferrer" title="Follow New Yorker Herald on Instagram">
                <img src="/images/footer-instagram.webp" alt="Instagram - New Yorker Herald" />
              </a>
              <a href="https://x.com/NewYorkerHerald" target="_blank" rel="noopener noreferrer" title="Follow New Yorker Herald on Twitter">
                <img src="/images/footer-twitter.webp" alt="Twitter - New Yorker Herald" />
              </a>
            </div>
          </div>

          <div className="sidebar-box">
            <a href="https://latamchronicle.com/" target="_blank" rel="noopener noreferrer">
              <img src="/images/Group97.svg" className="sidebar-ad" alt="Advertisement" width="300" height="250" loading="lazy" />
            </a>
          </div>

          {hotNews && (
            <div>
              <h2 className="news-title">Hot News</h2>
              <br />
              <div className="sidebar-box">
                <div className="sidebar-card">
                  <div className="sidebar-card-img">
                    <Link href={`/${hotNews.category?.slug}/${hotNews.encode_title}`} title={`${hotNews.news_title} - New Yorker Herald`}>
                      <img src={hotNews.photo ? `/uploads/news/${hotNews.photo}` : '/images/default-news.jpg'} alt={hotNews.news_title} width="300" height="200" />
                    </Link>
                    <span className="sidebar-tag">{hotNews.category?.category_name || 'News'}</span>
                  </div>
                  <h3 className="sidebar-card-title">
                    <Link href={`/${hotNews.category?.slug}/${hotNews.encode_title}`} title={`${hotNews.news_title} - New Yorker Herald`} className="text-dark text-decoration-none">
                      {hotNews.news_title}
                    </Link>
                  </h3>
                  <div className="sidebar-card-date">{hotNews.news_date}</div>
                  {hotNews.author && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px', fontSize: '13px', color: '#555' }}>
                      <img src={`/uploads/authors/${hotNews.author.image}`} className="author-mini-pic" alt={hotNews.author.name} />
                      <Link href={`/author/${hotNews.author.slug}`} title={`${hotNews.author.name} - Author at New Yorker Herald`} className="text-dark text-decoration-none">
                        {hotNews.author.name}
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
