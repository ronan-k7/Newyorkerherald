import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <section style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px', lineHeight: '1.7', color: '#333' }}>
      <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '32px', borderBottom: '3px solid #c00', paddingBottom: '10px', marginBottom: '20px' }}>
        Privacy Policy
      </h1>
      <p>
        At New Yorker Herald, we take your privacy seriously. This policy outlines how we collect, use, and protect your personal information when you visit our website, subscribe to updates, or comment on articles.
      </p>
      <h3 style={{ fontFamily: 'Georgia, serif', marginTop: '24px' }}>Information We Collect</h3>
      <p>
        We collect account information when you sign in (Name, Email) and subscription preferences. We do not sell your personal data to third parties.
      </p>
      <h3 style={{ fontFamily: 'Georgia, serif', marginTop: '24px' }}>Cookies & Analytics</h3>
      <p>
        We use standard technical cookies to preserve your login session, subscription preferences, and optimize website performance.
      </p>
    </section>
  );
}
