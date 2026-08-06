'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

interface CommentSectionProps {
  articleId: number;
}

export default function CommentSection({ articleId }: CommentSectionProps) {
  const { user, comments, addComment } = useAuth();
  const [commentText, setCommentText] = useState('');
  const [error, setError] = useState('');

  const articleComments = comments[articleId] || [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) {
      setError('Please enter a comment.');
      return;
    }
    setError('');
    addComment(articleId, commentText);
    setCommentText('');
  };

  return (
    <div
      className="article-comments-section"
      style={{
        margin: '35px 0 25px 0',
        padding: '24px',
        background: '#fff',
        border: '1px solid #e0e0e0',
        borderRadius: '6px'
      }}
    >
      <h3
        style={{
          fontFamily: 'Georgia, serif',
          fontSize: '20px',
          margin: '0 0 20px 0',
          borderBottom: '2px solid #c00',
          paddingBottom: '8px',
          display: 'inline-block'
        }}
      >
        Comments ({articleComments.length})
      </h3>

      {/* Post Comment Form */}
      {user ? (
        <form onSubmit={handleSubmit} style={{ marginBottom: '30px' }}>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ fontSize: '13px', color: '#555', display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>
              Commenting as: <span style={{ color: '#111' }}>{user.name}</span> ({user.email})
            </label>
            <textarea
              rows={4}
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              placeholder="Share your views on this article..."
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '14px',
                fontFamily: 'sans-serif',
                resize: 'vertical'
              }}
            />
          </div>
          {error && <div style={{ color: '#c00', fontSize: '13px', marginBottom: '10px' }}>{error}</div>}
          <button
            type="submit"
            style={{
              background: '#c00',
              color: '#fff',
              border: 'none',
              padding: '10px 22px',
              borderRadius: '4px',
              fontWeight: 'bold',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            Post Comment
          </button>
        </form>
      ) : (
        <div
          style={{
            background: '#f9f9f9',
            border: '1px dashed #ccc',
            padding: '16px 20px',
            borderRadius: '4px',
            marginBottom: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}
        >
          <span style={{ fontSize: '14px', color: '#555' }}>
            Only logged-in users can post comments. Please sign in to join the conversation.
          </span>
          <Link
            href="/login"
            style={{
              background: '#c00',
              color: '#fff',
              padding: '8px 16px',
              borderRadius: '4px',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '13px'
            }}
          >
            Log In to Comment
          </Link>
        </div>
      )}

      {/* List of Comments */}
      {articleComments.length === 0 ? (
        <p style={{ fontStyle: 'italic', color: '#777', fontSize: '14px' }}>
          No comments yet. Be the first to comment!
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {articleComments.map(c => (
            <div
              key={c.id}
              style={{
                borderBottom: '1px solid #f0f0f0',
                paddingBottom: '14px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <strong style={{ fontSize: '14px', color: '#111' }}>{c.userName}</strong>
                <span style={{ fontSize: '12px', color: '#888' }}>{c.createdAt}</span>
              </div>
              <p style={{ margin: 0, fontSize: '14px', color: '#333', lineHeight: '1.5' }}>
                {c.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
