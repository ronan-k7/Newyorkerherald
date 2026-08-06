import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAuthorBySlug, getNewsByAuthor, getLatestNews } from '@/lib/data';

interface AuthorPageProps {
  params: Promise<{
    slug: string;
  }> | {
    slug: string;
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const resolvedParams = await params;
  const author = getAuthorBySlug(resolvedParams.slug);

  if (!author) {
    notFound();
  }

  const authorArticles = getNewsByAuthor(author.author_id);
  const latestNews = getLatestNews().slice(0, 5);

  return (
    <section className="triple-news-section">
      <div className="triple-news-container">
        {/* LEFT COLUMN */}
        <div className="triple-left">
          <div className="detail-breadcrumb-card">
            <Link href="/" title="Home - New Yorker Herald">Home</Link> » Author » {author.name}
          </div>
          <br />

          <div style={{ display: 'flex', gap: '20px', background: '#fff', border: '1px solid #e0e0e0', padding: '20px', borderRadius: '6px', marginBottom: '30px' }}>
            <img
              src={`/uploads/authors/${author.image}`}
              alt={author.name}
              style={{ width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <div>
              <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '24px', margin: '0 0 4px 0' }}>
                {author.name}
              </h1>
              <div style={{ color: '#c00', fontWeight: 'bold', fontSize: '13px', marginBottom: '8px' }}>
                {author.designation}
              </div>
              <p style={{ color: '#555', fontSize: '13px', margin: 0, lineHeight: '1.5' }}>
                {author.bio}
              </p>
            </div>
          </div>

          <h2 className="news-title">Articles by {author.name}</h2>
          <br />

          {authorArticles.length === 0 ? (
            <p>No articles found for this author.</p>
          ) : (
            authorArticles.map(item => (
              <div key={item.news_id} className="triple-post">
                <div className="triple-thumb">
                  <Link href={`/${item.category?.slug}/${item.encode_title}`}>
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
                    <Link href={`/${item.category?.slug}/${item.encode_title}`} className="text-dark text-decoration-none">
                      {item.news_title}
                    </Link>
                  </h2>
                  <div className="triple-meta">
                    {item.news_date}
                  </div>
                  <p>
                    {item.news_content_short ? item.news_content_short.slice(0, 120) + '...' : ''}
                  </p>
                  <Link href={`/${item.category?.slug}/${item.encode_title}`} className="read-more-btn">
                    Read More
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="triple-sidebar">
          <h2 className="news-title">Latest Headlines</h2>
          <br />
          <div className="sidebar-box">
            {latestNews.map(item => (
              <div key={item.news_id} style={{ marginBottom: '14px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                <span style={{ fontSize: '11px', color: '#c00', fontWeight: 'bold' }}>{item.category?.category_name}</span>
                <h4 style={{ fontSize: '14px', fontFamily: 'Georgia, serif', margin: '4px 0' }}>
                  <Link href={`/${item.category?.slug}/${item.encode_title}`} style={{ color: '#111', textDecoration: 'none' }}>
                    {item.news_title}
                  </Link>
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
