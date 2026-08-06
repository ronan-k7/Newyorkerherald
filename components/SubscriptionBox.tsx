'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function SubscriptionBox() {
  const { user, subscribe, cancelSubscription } = useAuth();
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      subscribe();
      setSuccess(true);
    }
  };

  return (
    <div
      className="subscription-box-widget"
      style={{
        background: '#f8f9fa',
        border: '1px solid #e2e8f0',
        padding: '24px',
        borderRadius: '8px',
        margin: '25px 0'
      }}
    >
      <h3 style={{ margin: '0 0 8px', fontSize: '18px', fontFamily: 'Georgia, serif', color: '#111' }}>
        Stay Updated with New Yorker Herald
      </h3>

      {!user ? (
        <div>
          <p style={{ fontSize: '14px', color: '#555', marginBottom: '16px', lineHeight: '1.5' }}>
            Log in to your account to subscribe to our daily news briefing and exclusive updates.
          </p>
          <Link
            href="/login"
            style={{
              display: 'inline-block',
              background: '#c00',
              color: '#fff',
              padding: '10px 20px',
              textDecoration: 'none',
              borderRadius: '4px',
              fontWeight: 'bold',
              fontSize: '14px'
            }}
          >
            Log In to Subscribe
          </Link>
        </div>
      ) : user.isSubscribed ? (
        <div style={{ background: '#e8f5e9', border: '1px solid #c8e6c9', padding: '16px', borderRadius: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{ color: '#2e7d32', fontWeight: 'bold', fontSize: '18px' }}>✓</span>
            <strong style={{ color: '#2e7d32', fontSize: '16px' }}>You are subscribed</strong>
          </div>
          <p style={{ margin: 0, fontSize: '13px', color: '#388e3c' }}>
            Thank you, {user.name} ({user.email}). You are receiving all latest news alerts. Manage or cancel your subscription anytime via the header subscribe option.
          </p>
        </div>
      ) : (
        <div>
          <p style={{ fontSize: '14px', color: '#555', marginBottom: '16px', lineHeight: '1.5' }}>
            Subscribe to our newsletter to receive breaking headlines delivered straight to your inbox.
          </p>

          {success ? (
            <div style={{ color: '#2e7d32', fontWeight: 'bold', fontSize: '14px' }}>
              ✓ Thank you! You are now subscribed.
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <input
                type="email"
                value={user.email}
                disabled
                style={{
                  flex: 1,
                  minWidth: '200px',
                  padding: '10px 14px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  fontSize: '14px',
                  background: '#fff'
                }}
              />
              <button
                type="submit"
                style={{
                  background: '#c00',
                  color: '#fff',
                  border: 'none',
                  padding: '10px 24px',
                  borderRadius: '4px',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                Subscribe Now
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
