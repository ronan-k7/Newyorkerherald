'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login, user } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Verification logic
    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password || password.length < 4) {
      setError('Password must be at least 4 characters long.');
      return;
    }

    setError('');
    const ok = login(name.trim(), email.trim());
    if (ok) {
      setSuccess(true);
      setTimeout(() => {
        router.push('/');
      }, 1000);
    } else {
      setError('Failed to log in. Please check your credentials.');
    }
  };

  return (
    <div style={{ background: '#f5f5f5', padding: '60px 20px', minHeight: 'calc(100vh - 200px)' }}>
      <div
        style={{
          maxWidth: '420px',
          margin: '0 auto',
          background: '#fff',
          padding: '36px',
          borderRadius: '8px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
          border: '1px solid #e0e0e0'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <img src="/images/logo_newyorker.webp" alt="New Yorker Herald" width="140" height="46" style={{ marginBottom: '12px' }} />
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '22px', margin: '0 0 6px 0', color: '#111' }}>
            Account Sign In
          </h2>
          <p style={{ fontSize: '13px', color: '#666', margin: 0 }}>
            Sign in to subscribe, comment, and access full coverage.
          </p>
        </div>

        {user && !success && (
          <div style={{ background: '#e8f5e9', color: '#2e7d32', padding: '12px', borderRadius: '4px', marginBottom: '20px', textAlign: 'center', fontSize: '14px' }}>
            You are currently logged in as <strong>{user.name}</strong>.
          </div>
        )}

        {success ? (
          <div style={{ background: '#e8f5e9', color: '#2e7d32', padding: '16px', borderRadius: '4px', textAlign: 'center', fontWeight: 'bold' }}>
            ✓ Verified successfully! Redirecting...
          </div>
        ) : (
          <form onSubmit={handleLogin}>
            {error && (
              <div style={{ background: '#ffebee', color: '#c00', padding: '10px 14px', borderRadius: '4px', fontSize: '13px', marginBottom: '16px' }}>
                {error}
              </div>
            )}

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '6px', color: '#333' }}>
                Full Name
              </label>
              <input
                type="text"
                placeholder="e.g. Jane Doe"
                value={name}
                onChange={e => setName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '6px', color: '#333' }}>
                Email Address
              </label>
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '6px', color: '#333' }}>
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  fontSize: '14px'
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
              Verify & Sign In
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
