import React from 'react';

export default function AboutUsPage() {
  return (
    <section style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
      <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '32px', borderBottom: '3px solid #c00', paddingBottom: '10px', marginBottom: '20px' }}>
        About New Yorker Herald
      </h1>
      <div style={{ fontSize: '16px', lineHeight: '1.8', color: '#333' }}>
        <p>
          New Yorker Herald is an independent digital news organization dedicated to delivering high-integrity journalism,
          breaking world news, political analysis, and cultural reporting from around the globe.
        </p>
        <p>
          Founded on principles of truthfulness, accountability, and clarity, our newsroom reports on critical issues shaping global affairs,
          economics, environmental policies, and regional communities.
        </p>
        <h3 style={{ fontFamily: 'Georgia, serif', marginTop: '30px' }}>Our Mission</h3>
        <p>
          To empower readers everywhere with accurate facts, objective perspectives, and transparent coverage that informs public discourse and fosters international understanding.
        </p>
      </div>
    </section>
  );
}
