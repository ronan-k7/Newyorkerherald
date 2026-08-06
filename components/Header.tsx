'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Category } from '@/lib/data';

interface HeaderProps {
  categories: Category[];
}

export default function Header({ categories }: HeaderProps) {
  const pathname = usePathname();
  const { user, logout, subscribe, cancelSubscription } = useAuth();
  const [time, setTime] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [subscribeModalOpen, setSubscribeModalOpen] = useState(false);
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toTimeString().split(' ')[0]);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubscribeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    subscribe();
    setSubscribeSuccess(true);
    setTimeout(() => {
      setSubscribeSuccess(false);
      setSubscribeModalOpen(false);
    }, 2000);
  };

  const formattedDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: '2-digit',
    year: 'numeric'
  });

  return (
    <>
      {/* Top Bar */}
      <div className="top-bar">
        <div className="top-left">
          <img src="/images/clock.webp" className="clock-icon" alt="Current time" width="16" height="16" />
          <span id="time" style={{ marginRight: '8px' }}>{time || '14:30:05'}</span>
          <span>{formattedDate}</span>
        </div>
        <div className="top-right" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <a href="https://www.instagram.com/newyorker_herald/" target="_blank" rel="noopener noreferrer">
            <img src="/images/footer-instagram.webp" alt="Follow us on Instagram" width="25" height="22" />
          </a>
          <a href="https://x.com/NewYorkerHerald" target="_blank" rel="noopener noreferrer">
            <img src="/images/footer-twitter.webp" alt="Follow us on Twitter" width="22" height="22" />
          </a>

          {/* User Auth Info in Top Bar */}
          {user ? (
            <div className="user-top-info" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '10px' }}>
              <span style={{ fontSize: '13px', color: '#fff', fontWeight: 600 }}>
                Hi, {user.name}
              </span>
              <button
                onClick={() => setSubscribeModalOpen(true)}
                style={{
                  background: user.isSubscribed ? '#2e7d32' : '#c00',
                  color: '#fff',
                  border: 'none',
                  padding: '3px 8px',
                  borderRadius: '3px',
                  fontSize: '11px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                {user.isSubscribed ? 'Subscribed ✓' : 'Subscribe'}
              </button>
              <button
                onClick={logout}
                style={{
                  background: 'transparent',
                  color: '#aaa',
                  border: '1px solid #555',
                  padding: '2px 6px',
                  borderRadius: '3px',
                  fontSize: '11px',
                  cursor: 'pointer'
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              style={{
                background: '#c00',
                color: '#fff',
                textDecoration: 'none',
                padding: '3px 10px',
                borderRadius: '3px',
                fontSize: '12px',
                fontWeight: 'bold',
                marginLeft: '10px'
              }}
            >
              Sign In
            </Link>
          )}
        </div>
      </div>

      {/* Main Header */}
      <header className="main-header">
        <div className="logo">
          <Link href="/" title="New Yorker Herald - Home">
            <img src="/images/logo_newyorker.webp" alt="New Yorker Herald" width="120" height="40" />
          </Link>
        </div>

        <nav className="desktop-nav" aria-label="Main navigation">
          <ul>
            <li className={pathname === '/' ? 'active' : ''}>
              <Link href="/" title="New Yorker Herald Home">Home</Link>
            </li>
            {categories.map(category => (
              <li key={category.category_id} className={pathname === `/category/${category.slug}` ? 'active' : ''}>
                <Link href={`/category/${category.slug}`} title={`${category.category_name} News`}>
                  {category.category_name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mobile-bar">
          <div className="mobile-menu" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <img src="/images/menu.webp" alt="Open menu" width="24" height="24" />
            <span>MENU</span>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="dropdown-menu" style={{ display: 'block' }}>
          <ul>
            <li className={pathname === '/' ? 'active' : ''}>
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            </li>
            {categories.map(category => (
              <li key={category.category_id} className={pathname === `/category/${category.slug}` ? 'active' : ''}>
                <Link href={`/category/${category.slug}`} onClick={() => setMobileMenuOpen(false)}>
                  {category.category_name}
                </Link>
              </li>
            ))}
            {!user ? (
              <li>
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
              </li>
            ) : (
              <li>
                <button onClick={logout} style={{ background: 'none', border: 'none', color: '#111', padding: '10px', width: '100%', textAlign: 'left', fontWeight: 'bold' }}>
                  Logout ({user.name})
                </button>
              </li>
            )}
          </ul>
        </nav>
      )}

      {/* Header Subscription Modal */}
      {subscribeModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.6)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setSubscribeModalOpen(false)}
        >
          <div
            style={{
              background: '#fff',
              padding: '30px',
              borderRadius: '8px',
              maxWidth: '450px',
              width: '100%',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              position: 'relative'
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSubscribeModalOpen(false)}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                border: 'none',
                background: 'none',
                fontSize: '20px',
                cursor: 'pointer',
                color: '#666'
              }}
            >
              ×
            </button>

            {!user ? (
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ margin: '0 0 10px', fontSize: '20px' }}>Member Subscription</h3>
                <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px' }}>
                  You must be logged in to subscribe to New Yorker Herald premium newsletters and updates.
                </p>
                <Link
                  href="/login"
                  onClick={() => setSubscribeModalOpen(false)}
                  style={{
                    display: 'inline-block',
                    background: '#c00',
                    color: '#fff',
                    padding: '10px 24px',
                    textDecoration: 'none',
                    borderRadius: '4px',
                    fontWeight: 'bold'
                  }}
                >
                  Log In to Subscribe
                </Link>
              </div>
            ) : user.isSubscribed ? (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '40px', color: '#2e7d32', marginBottom: '10px' }}>✓</div>
                <h3 style={{ margin: '0 0 10px', fontSize: '20px', color: '#2e7d32' }}>You are Subscribed!</h3>
                <p style={{ color: '#555', fontSize: '14px', marginBottom: '20px' }}>
                  Hello <strong>{user.name}</strong>, you are currently receiving full access to New Yorker Herald digital updates ({user.email}).
                </p>
                <button
                  onClick={() => {
                    cancelSubscription();
                    setSubscribeModalOpen(false);
                  }}
                  style={{
                    background: '#d32f2f',
                    color: '#fff',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '4px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  Cancel Subscription
                </button>
              </div>
            ) : (
              <div>
                <h3 style={{ margin: '0 0 10px', fontSize: '20px' }}>Subscribe to New Yorker Herald</h3>
                <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px' }}>
                  Get daily breaking headlines and political updates sent directly to your inbox.
                </p>
                {subscribeSuccess ? (
                  <div style={{ background: '#e8f5e9', color: '#2e7d32', padding: '12px', borderRadius: '4px', textAlign: 'center', fontWeight: 'bold' }}>
                    Subscription successful!
                  </div>
                ) : (
                  <form onSubmit={handleSubscribeSubmit}>
                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '5px' }}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={user.email}
                        disabled
                        style={{
                          width: '100%',
                          padding: '10px',
                          border: '1px solid #ccc',
                          borderRadius: '4px',
                          background: '#f9f9f9'
                        }}
                      />
                    </div>
                    <button
                      type="submit"
                      style={{
                        width: '100%',
                        background: '#c00',
                        color: '#fff',
                        border: 'none',
                        padding: '12px',
                        borderRadius: '4px',
                        fontWeight: 'bold',
                        fontSize: '15px',
                        cursor: 'pointer'
                      }}
                    >
                      Confirm Subscription
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
