import React from 'react';

export default function ContactPage() {
  return (
    <section style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
      <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '32px', borderBottom: '3px solid #c00', paddingBottom: '10px', marginBottom: '20px' }}>
        Contact Us
      </h1>
      <p style={{ fontSize: '15px', color: '#555', marginBottom: '30px' }}>
        Have a news tip, feedback, or editorial inquiry? Get in touch with the New Yorker Herald newsroom team.
      </p>

      <form style={{ background: '#fff', border: '1px solid #e0e0e0', padding: '30px', borderRadius: '8px' }}>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '6px' }}>
            Your Name
          </label>
          <input type="text" placeholder="Full name" style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '6px' }}>
            Email Address
          </label>
          <input type="email" placeholder="name@example.com" style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '6px' }}>
            Message / Tip
          </label>
          <textarea rows={5} placeholder="Write your message here..." style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}></textarea>
        </div>

        <button type="button" style={{ background: '#c00', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
          Send Message
        </button>
      </form>
    </section>
  );
}
