import React from 'react';
import type { Metadata } from 'next';
import { AuthProvider } from '@/context/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getCategories } from '@/lib/data';

export const metadata: Metadata = {
  title: 'New Yorker Herald - Latest World News, Politics, Business & Science',
  description: 'New Yorker Herald delivers breaking news, world news, politics, science, technology, and business updates from around the globe.',
  keywords: ['world news', 'US news', 'politics', 'science', 'business', 'technology', 'breaking news', 'New Yorker Herald'],
  icons: {
    icon: '/images/logo_faviconn.png',
    apple: '/images/logo_faviconn.png'
  },
  verification: {
    google: '9KIyIylEdWO-tSAwTxG_XzyPo9VATx8TFc_7P-HdaCw',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = getCategories();

  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="9KIyIylEdWO-tSAwTxG_XzyPo9VATx8TFc_7P-HdaCw" />
        <link rel="stylesheet" href="/css/style.css" />
      </head>
      <body>
        <AuthProvider>
          <Header categories={categories} />
          <main>{children}</main>
          <Footer categories={categories} />
        </AuthProvider>
      </body>
    </html>
  );
}
