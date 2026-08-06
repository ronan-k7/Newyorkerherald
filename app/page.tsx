import React from 'react';
import Link from 'next/link';
import { getHomePageData, getLatestNews } from '@/lib/data';
import SubscriptionBox from '@/components/SubscriptionBox';

export const revalidate = 60;

export default function HomePage() {
  const {
    mainNews,
    relatedNews,
    latestNews,
    headlineNews,
    popularNews,
    featuredNews,
    techNews,
    postMainNews,
    postListNews,
    postGridNews,
    tripleLatestNews,
    hotNews
  } = getHomePageData();

  const allArticles = getLatestNews();
  const topStories = allArticles.slice(0, 4);

  return (
    <div style={{ background: '#eee', color: '#111', fontFamily: 'Arial, sans-serif' }}>
      <h1 className="visually-hidden">New Yorker Herald – Breaking World News, Politics, Business &amp; Science</h1>

      {/* ==========================================
          SECTION 1 - HEADLINES TICKER & 3-COLUMN HERO
         ========================================== */}
      <section className="headline-panel-section" style={{ background: '#eee', padding: '20px 40px 10px' }}>
        <div className="headline-panel" style={{ background: '#fff', padding: '12px 15px', borderRadius: '2px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ background: '#ff4d00', color: '#fff', padding: '4px 10px', fontWeight: 'bold', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              HEADLINES
            </span>
            <div className="headline-panel-wrapper" style={{ flex: 1, overflow: 'hidden' }}>
              <div className="headline-panel-track" style={{ display: 'flex', gap: '30px' }}>
                {headlineNews.map((item) => (
                  <div key={item.news_id} style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: '340px' }}>
                    <img
                      src={item.photo ? `/uploads/news/${item.photo}` : '/images/default-news.jpg'}
                      alt={item.news_title}
                      style={{ width: '60px', height: '45px', objectFit: 'cover', borderRadius: '3px' }}
                    />
                    <div>
                      <div style={{ fontSize: '11px', color: '#888' }}>{item.news_date}</div>
                      <Link href={`/${item.category?.slug}/${item.encode_title}`} style={{ fontSize: '13px', fontWeight: '600', color: '#111', textDecoration: 'none', lineHeight: '1.2' }}>
                        {item.news_title.slice(0, 50)}...
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: '1320px', margin: '0 auto', padding: '10px 40px 30px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '25px' }}>
          
          {/* LEFT: Latest News (3 stacked overlay cards) */}
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '700', margin: '0 0 15px 0', borderBottom: '2px solid #ddd', paddingBottom: '6px', position: 'relative' }}>
              <span style={{ borderBottom: '2px solid #ff4d00', paddingBottom: '6px' }}>Latest News</span>
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {latestNews.slice(0, 3).map((item) => (
                <div key={item.news_id} style={{ position: 'relative', height: '150px', borderRadius: '2px', overflow: 'hidden' }}>
                  <img
                    src={item.photo ? `/uploads/news/${item.photo}` : '/images/default-news.jpg'}
                    alt={item.news_title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)', padding: '12px', display: 'flex', alignItems: 'flex-end' }}>
                    <Link href={`/${item.category?.slug}/${item.encode_title}`} style={{ color: '#fff', fontWeight: '700', fontSize: '13px', textDecoration: 'none', lineHeight: '1.3' }}>
                      {item.news_title}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CENTER: Main Featured Hero Article */}
          <div>
            {mainNews && (
              <div style={{ position: 'relative', height: '480px', borderRadius: '2px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <img
                  src={mainNews.photo ? `/uploads/news/${mainNews.photo}` : '/images/default-news.jpg'}
                  alt={mainNews.news_title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 55%, transparent 100%)', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', color: '#fff' }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ background: '#222', color: '#fff', padding: '3px 8px', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase' }}>
                      {mainNews.category?.category_name || 'FASHION'}
                    </span>
                    <span style={{ fontSize: '12px', opacity: 0.8 }}>{mainNews.news_date}</span>
                  </div>
                  <h2 style={{ fontSize: '26px', fontFamily: 'Georgia, serif', fontWeight: '700', margin: '0 0 10px 0', lineHeight: '1.3' }}>
                    <Link href={`/${mainNews.category?.slug}/${mainNews.encode_title}`} style={{ color: '#fff', textDecoration: 'none' }}>
                      {mainNews.news_title}
                    </Link>
                  </h2>
                  <p style={{ fontSize: '13px', opacity: 0.85, margin: '0 0 14px 0', lineHeight: '1.4' }}>
                    {mainNews.news_content_short ? mainNews.news_content_short.slice(0, 140) + '...' : ''}
                  </p>
                  
                  {/* Bullet list of related links */}
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '10px' }}>
                    {relatedNews.slice(0, 3).map((rel) => (
                      <li key={rel.news_id} style={{ marginBottom: '4px', fontSize: '12px' }}>
                        <Link href={`/${rel.category?.slug}/${rel.encode_title}`} style={{ color: '#fff', textDecoration: 'none', opacity: 0.9 }}>
                          • {rel.news_title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Popular News */}
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '700', margin: '0 0 15px 0', borderBottom: '2px solid #ddd', paddingBottom: '6px', position: 'relative' }}>
              <span style={{ borderBottom: '2px solid #ff4d00', paddingBottom: '6px' }}>Popular News</span>
            </h2>
            {popularNews[0] && (
              <div style={{ position: 'relative', height: '160px', borderRadius: '2px', overflow: 'hidden', marginBottom: '14px' }}>
                <img
                  src={popularNews[0].photo ? `/uploads/news/${popularNews[0].photo}` : '/images/default-news.jpg'}
                  alt={popularNews[0].news_title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)', padding: '12px', display: 'flex', alignItems: 'flex-end' }}>
                  <Link href={`/${popularNews[0].category?.slug}/${popularNews[0].encode_title}`} style={{ color: '#fff', fontWeight: '700', fontSize: '13px', textDecoration: 'none' }}>
                    {popularNews[0].news_title}
                  </Link>
                </div>
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {popularNews.slice(1, 4).map((item) => (
                <div key={item.news_id} style={{ background: '#fff', padding: '12px', borderRadius: '2px', border: '1px solid #e0e0e0' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: '700', margin: 0, lineHeight: '1.3' }}>
                    <Link href={`/${item.category?.slug}/${item.encode_title}`} style={{ color: '#111', textDecoration: 'none' }}>
                      {item.news_title}
                    </Link>
                  </h3>
                  <div style={{ fontSize: '11px', color: '#777', marginTop: '6px' }}>
                    🕒 {item.author?.name || 'Blaze'} • {item.news_date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 2 - FEATURED POSTS & AD BANNER
         ========================================== */}
      <section style={{ maxWidth: '1320px', margin: '10px auto 30px', padding: '0 40px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '700', margin: '0 0 20px 0', borderBottom: '2px solid #ddd', paddingBottom: '8px', position: 'relative' }}>
          <span style={{ borderBottom: '3px solid #ff4d00', paddingBottom: '8px' }}>Featured Posts</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          {featuredNews.slice(0, 4).map((item) => (
            <div key={item.news_id} style={{ background: '#fff', borderRadius: '2px', border: '1px solid #e0e0e0', overflow: 'hidden' }}>
              <img
                src={item.photo ? `/uploads/news/${item.photo}` : '/images/default-news.jpg'}
                alt={item.news_title}
                style={{ width: '100%', height: '180px', objectFit: 'cover' }}
              />
              <div style={{ padding: '16px' }}>
                <div style={{ fontSize: '11px', color: '#777', fontWeight: '700', textTransform: 'uppercase', marginBottom: '6px' }}>
                  {item.category?.category_name || 'FASHION • POLITICS'}
                </div>
                <h3 style={{ fontSize: '15px', fontWeight: '700', margin: '0 0 8px 0', lineHeight: '1.3' }}>
                  <Link href={`/${item.category?.slug}/${item.encode_title}`} style={{ color: '#111', textDecoration: 'none' }}>
                    {item.news_title}
                  </Link>
                </h3>
                <div style={{ fontSize: '11px', color: '#888', marginBottom: '8px' }}>
                  🕒 {item.author?.name || 'Blaze'} • {item.news_date}
                </div>
                <p style={{ fontSize: '12px', color: '#555', lineHeight: '1.4', margin: 0 }}>
                  {item.news_content_short ? item.news_content_short.slice(0, 80) + '...' : ''}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Ad Banner */}
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <a href="https://latamchronicle.com/" target="_blank" rel="noopener noreferrer">
            <img src="/images/Group99.svg" alt="Digital Newspaper WordPress Theme" style={{ maxWidth: '100%', height: 'auto', borderRadius: '2px' }} />
          </a>
        </div>
      </section>

      {/* ==========================================
          SECTION 3 - LATEST POSTS & LATEST NEWS (2x2 GRID)
         ========================================== */}
      <section style={{ maxWidth: '1320px', margin: '10px auto 30px', padding: '0 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2.3fr 1fr', gap: '25px' }}>
          
          {/* LEFT: Latest Posts */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #ddd', paddingBottom: '8px', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: '700', margin: 0, position: 'relative' }}>
                <span style={{ borderBottom: '3px solid #ff4d00', paddingBottom: '8px' }}>Latest Posts</span>
              </h2>
              <div style={{ display: 'flex', gap: '15px', fontSize: '13px', color: '#666' }}>
                <span style={{ color: '#ff4d00', fontWeight: '700', cursor: 'pointer' }}>All</span>
                <span style={{ cursor: 'pointer' }}>Technology</span>
                <span style={{ cursor: 'pointer' }}>Science</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '16px' }}>
              {/* Big Post Card */}
              {postMainNews && (
                <div style={{ background: '#fff', borderRadius: '2px', border: '1px solid #e0e0e0', padding: '14px' }}>
                  <img
                    src={postMainNews.photo ? `/uploads/news/${postMainNews.photo}` : '/images/default-news.jpg'}
                    alt={postMainNews.news_title}
                    style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '2px', marginBottom: '12px' }}
                  />
                  <h3 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 8px 0', lineHeight: '1.3' }}>
                    <Link href={`/${postMainNews.category?.slug}/${postMainNews.encode_title}`} style={{ color: '#111', textDecoration: 'none' }}>
                      {postMainNews.news_title}
                    </Link>
                  </h3>
                  <div style={{ fontSize: '11px', color: '#888', marginBottom: '8px' }}>
                    🕒 {postMainNews.news_date} • 0
                  </div>
                  <p style={{ fontSize: '12px', color: '#555', lineHeight: '1.4', margin: 0 }}>
                    {postMainNews.news_content_short ? postMainNews.news_content_short.slice(0, 110) + '...' : ''}
                  </p>
                </div>
              )}

              {/* Side 4 List Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {postListNews.slice(0, 4).map((item) => (
                  <div key={item.news_id} style={{ display: 'flex', gap: '10px', background: '#fff', padding: '10px', borderRadius: '2px', border: '1px solid #e0e0e0' }}>
                    <img
                      src={item.photo ? `/uploads/news/${item.photo}` : '/images/default-news.jpg'}
                      alt={item.news_title}
                      style={{ width: '85px', height: '65px', objectFit: 'cover', borderRadius: '2px', flexShrink: 0 }}
                    />
                    <div>
                      <h4 style={{ fontSize: '12px', fontWeight: '700', margin: '0 0 4px 0', lineHeight: '1.3' }}>
                        <Link href={`/${item.category?.slug}/${item.encode_title}`} style={{ color: '#111', textDecoration: 'none' }}>
                          {item.news_title.slice(0, 42)}...
                        </Link>
                      </h4>
                      <div style={{ fontSize: '10px', color: '#888' }}>
                        🕒 {item.news_date} • 0
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Latest News (2x2 Grid) */}
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: '700', margin: '0 0 20px 0', borderBottom: '2px solid #ddd', paddingBottom: '8px', position: 'relative' }}>
              <span style={{ borderBottom: '3px solid #ff4d00', paddingBottom: '8px' }}>Latest News</span>
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {postGridNews.slice(0, 4).map((item) => (
                <div key={item.news_id} style={{ background: '#fff', borderRadius: '2px', border: '1px solid #e0e0e0', overflow: 'hidden' }}>
                  <div style={{ position: 'relative', height: '110px' }}>
                    <img
                      src={item.photo ? `/uploads/news/${item.photo}` : '/images/default-news.jpg'}
                      alt={item.news_title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <span style={{ position: 'absolute', bottom: '6px', left: '6px', background: '#222', color: '#fff', padding: '2px 6px', fontSize: '9px', fontWeight: '700', textTransform: 'uppercase' }}>
                      {item.category?.category_name || 'Fashion'}
                    </span>
                  </div>
                  <div style={{ padding: '8px' }}>
                    <h4 style={{ fontSize: '11px', fontWeight: '700', margin: 0, lineHeight: '1.3' }}>
                      <Link href={`/${item.category?.slug}/${item.encode_title}`} style={{ color: '#111', textDecoration: 'none' }}>
                        {item.news_title.slice(0, 38)}...
                      </Link>
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 4 - LOWER TRIPLE SECTION
         ========================================== */}
      <section style={{ maxWidth: '1320px', margin: '10px auto 30px', padding: '0 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '25px' }}>
          
          {/* LEFT: Horizontal Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {techNews.slice(0, 4).map((item) => (
              <div key={item.news_id} style={{ display: 'flex', gap: '16px', background: '#fff', padding: '14px', borderRadius: '2px', border: '1px solid #e0e0e0' }}>
                <div style={{ position: 'relative', width: '180px', height: '120px', flexShrink: 0 }}>
                  <img
                    src={item.photo ? `/uploads/news/${item.photo}` : '/images/default-news.jpg'}
                    alt={item.news_title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '2px' }}
                  />
                  <span style={{ position: 'absolute', bottom: '6px', left: '6px', background: '#222', color: '#fff', padding: '2px 6px', fontSize: '10px', fontWeight: '700' }}>
                    {item.category?.category_name || 'Science'}
                  </span>
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', margin: '0 0 6px 0', lineHeight: '1.3' }}>
                    <Link href={`/${item.category?.slug}/${item.encode_title}`} style={{ color: '#111', textDecoration: 'none' }}>
                      {item.news_title}
                    </Link>
                  </h3>
                  <div style={{ fontSize: '11px', color: '#888', marginBottom: '6px' }}>
                    {item.author?.name || 'Blaze'} • {item.news_date} • 1 min
                  </div>
                  <p style={{ fontSize: '12px', color: '#555', margin: '0 0 8px 0', lineHeight: '1.4' }}>
                    {item.news_content_short ? item.news_content_short.slice(0, 110) + '...' : ''}
                  </p>
                  <Link href={`/${item.category?.slug}/${item.encode_title}`} style={{ color: '#ff4d00', fontSize: '12px', fontWeight: '700', textDecoration: 'none' }}>
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* MIDDLE: Latest News Cards */}
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '700', margin: '0 0 16px 0', borderBottom: '2px solid #ddd', paddingBottom: '6px', position: 'relative' }}>
              <span style={{ borderBottom: '2px solid #ff4d00', paddingBottom: '6px' }}>Latest News</span>
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {tripleLatestNews.slice(0, 3).map((item) => (
                <div key={item.news_id} style={{ background: '#fff', borderRadius: '2px', border: '1px solid #e0e0e0', overflow: 'hidden' }}>
                  <img
                    src={item.photo ? `/uploads/news/${item.photo}` : '/images/default-news.jpg'}
                    alt={item.news_title}
                    style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                  />
                  <div style={{ padding: '12px' }}>
                    <span style={{ fontSize: '10px', color: '#777', fontWeight: '700', textTransform: 'uppercase' }}>
                      {item.category?.category_name || 'FASHION • POLITICS'}
                    </span>
                    <h4 style={{ fontSize: '14px', fontWeight: '700', margin: '4px 0 0 0', lineHeight: '1.3' }}>
                      <Link href={`/${item.category?.slug}/${item.encode_title}`} style={{ color: '#111', textDecoration: 'none' }}>
                        {item.news_title}
                      </Link>
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Find Me On + Ad Widget */}
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '700', margin: '0 0 16px 0', borderBottom: '2px solid #ddd', paddingBottom: '6px', position: 'relative' }}>
              <span style={{ borderBottom: '2px solid #ff4d00', paddingBottom: '6px' }}>Find Me On</span>
            </h2>
            <div style={{ background: '#fff', padding: '16px', borderRadius: '2px', border: '1px solid #e0e0e0', marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'center' }}>
              <a href="https://www.instagram.com/newyorker_herald/" target="_blank" rel="noopener noreferrer">
                <img src="/images/footer-instagram.webp" alt="Instagram" style={{ width: '32px', height: '32px' }} />
              </a>
              <a href="https://x.com/NewYorkerHerald" target="_blank" rel="noopener noreferrer">
                <img src="/images/footer-twitter.webp" alt="Twitter" style={{ width: '32px', height: '32px' }} />
              </a>
            </div>

            <div style={{ background: '#fff', padding: '10px', borderRadius: '2px', border: '1px solid #e0e0e0', marginBottom: '20px' }}>
              <a href="https://latamchronicle.com/" target="_blank" rel="noopener noreferrer">
                <img src="/images/Group97.svg" alt="Advertisement" style={{ width: '100%', height: 'auto', borderRadius: '2px' }} />
              </a>
            </div>

            {hotNews && (
              <div style={{ background: '#fff', borderRadius: '2px', border: '1px solid #e0e0e0', overflow: 'hidden' }}>
                <div style={{ position: 'relative', height: '160px' }}>
                  <img
                    src={hotNews.photo ? `/uploads/news/${hotNews.photo}` : '/images/default-news.jpg'}
                    alt={hotNews.news_title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <span style={{ position: 'absolute', bottom: '6px', left: '6px', background: '#222', color: '#fff', padding: '2px 6px', fontSize: '9px', fontWeight: '700', textTransform: 'uppercase' }}>
                    {hotNews.category?.category_name || 'News'}
                  </span>
                </div>
                <div style={{ padding: '12px' }}>
                  <h4 style={{ fontSize: '13px', fontWeight: '700', margin: '0 0 6px 0', lineHeight: '1.3' }}>
                    <Link href={`/${hotNews.category?.slug}/${hotNews.encode_title}`} style={{ color: '#111', textDecoration: 'none' }}>
                      {hotNews.news_title}
                    </Link>
                  </h4>
                  <div style={{ fontSize: '11px', color: '#888' }}>{hotNews.news_date}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 5 - TOP STORIES
         ========================================== */}
      <section style={{ maxWidth: '1320px', margin: '10px auto 40px', padding: '0 40px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '700', margin: '0 0 20px 0', borderBottom: '2px solid #ddd', paddingBottom: '8px', position: 'relative' }}>
          <span style={{ borderBottom: '3px solid #ff4d00', paddingBottom: '8px' }}>Top Stories</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {topStories.map((item) => (
            <div key={item.news_id} style={{ position: 'relative', height: '230px', borderRadius: '2px', overflow: 'hidden', boxShadow: '0 2px 6px rgba(0,0,0,0.15)' }}>
              <img
                src={item.photo ? `/uploads/news/${item.photo}` : '/images/default-news.jpg'}
                alt={item.news_title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.92), rgba(0,0,0,0.25))', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: '#fff' }}>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ background: 'rgba(0,0,0,0.6)', color: '#fff', padding: '3px 8px', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', borderRadius: '2px' }}>
                    {item.category?.category_name || 'TECHNOLOGY'}
                  </span>
                </div>
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: '700', margin: '0 0 8px 0', lineHeight: '1.3', textAlign: 'center' }}>
                    <Link href={`/${item.category?.slug}/${item.encode_title}`} style={{ color: '#fff', textDecoration: 'none' }}>
                      {item.news_title}
                    </Link>
                  </h3>
                  <div style={{ fontSize: '11px', opacity: 0.8, textAlign: 'center' }}>
                    🕒 {item.author?.name || 'Blaze'} • {item.news_date}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SUBSCRIPTION BOX */}
      <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 40px 40px' }}>
        <SubscriptionBox />
      </div>
    </div>
  );
}
