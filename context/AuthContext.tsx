'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  name: string;
  email: string;
  isSubscribed: boolean;
}

export interface CommentItem {
  id: string;
  articleId: number;
  userName: string;
  userEmail: string;
  content: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  login: (name: string, email: string) => boolean;
  logout: () => void;
  subscribe: () => void;
  cancelSubscription: () => void;
  comments: Record<number, CommentItem[]>;
  addComment: (articleId: number, content: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const INITIAL_COMMENTS: Record<number, CommentItem[]> = {
  1: [
    {
      id: 'c1',
      articleId: 1,
      userName: 'Carlos Rivera',
      userEmail: 'carlos@example.com',
      content: 'Great tournament overview! Impressive performance by Chandler Blanchet.',
      createdAt: 'March 07, 2026 at 10:15 AM'
    }
  ],
  5: [
    {
      id: 'c2',
      articleId: 5,
      userName: 'Elena Morales',
      userEmail: 'elena@example.com',
      content: 'Crucial law enforcement action. Protecting the coast is vital for regional stability.',
      createdAt: 'March 24, 2026 at 02:40 PM'
    }
  ]
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [comments, setComments] = useState<Record<number, CommentItem[]>>(INITIAL_COMMENTS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('nyh_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      const savedComments = localStorage.getItem('nyh_comments');
      if (savedComments) {
        setComments(JSON.parse(savedComments));
      }
    } catch (e) {
      console.error('Error loading auth state from localStorage:', e);
    }
    setIsLoaded(true);
  }, []);

  const login = (name: string, email: string): boolean => {
    if (!name || !email) return false;
    const newUser: User = {
      name,
      email,
      isSubscribed: false
    };
    setUser(newUser);
    localStorage.setItem('nyh_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('nyh_user');
  };

  const subscribe = () => {
    if (!user) return;
    const updatedUser = { ...user, isSubscribed: true };
    setUser(updatedUser);
    localStorage.setItem('nyh_user', JSON.stringify(updatedUser));
  };

  const cancelSubscription = () => {
    if (!user) return;
    const updatedUser = { ...user, isSubscribed: false };
    setUser(updatedUser);
    localStorage.setItem('nyh_user', JSON.stringify(updatedUser));
  };

  const addComment = (articleId: number, content: string) => {
    if (!user || !content.trim()) return;
    const newComment: CommentItem = {
      id: Date.now().toString(),
      articleId,
      userName: user.name,
      userEmail: user.email,
      content: content.trim(),
      createdAt: new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    setComments(prev => {
      const existing = prev[articleId] || [];
      const updated = { ...prev, [articleId]: [newComment, ...existing] };
      localStorage.setItem('nyh_comments', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        subscribe,
        cancelSubscription,
        comments,
        addComment
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
