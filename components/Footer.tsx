import React from 'react';
import Link from 'next/link';
import { Category } from '@/lib/data';

interface FooterProps {
  categories: Category[];
}

export default function Footer({ categories }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-dark">
      <div className="footer-top">
        <div className="footer-wrapper">
          {/* About Us */}
          <div className="footer-box">
            <h3>About Us</h3>
            <div className="footer-card list-card">
              <ul>
                <li><Link href="/about-us" title="About New Yorker Herald">About New Yorker Herald</Link></li>
                <li><Link href="/contact" title="Contact Us">Contact Us</Link></li>
              </ul>
            </div>
          </div>

          {/* Categories */}
          <div className="footer-box">
            <h3>Top Categories</h3>
            <div className="footer-card list-card">
              <ul>
                {categories.slice(0, 3).map(category => (
                  <li key={category.category_id}>
                    <Link href={`/category/${category.slug}`} title={`${category.category_name} News`}>
                      {category.category_name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsroom */}
          <div className="footer-box">
            <h3>Newsroom</h3>
            <div className="footer-card list-card">
              <ul>
                <li><Link href="/corrections-policy" title="Corrections Policy">Corrections Policy</Link></li>
                <li><Link href="/advertising-policy" title="Advertising Policy">Advertising Policy</Link></li>
              </ul>
            </div>
          </div>

          {/* Standards */}
          <div className="footer-box">
            <h3>Standards</h3>
            <div className="footer-card list-card">
              <ul>
                <li><Link href="/privacy-policy" title="Privacy Policy">Privacy Policy</Link></li>
                <li><Link href="/cookie-policy" title="Cookie Policy">Cookie Policy</Link></li>
                <li><Link href="/terms-and-conditions" title="Terms & Conditions">Terms &amp; Conditions</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom-area">
        <div className="footer-social">
          <a href="https://www.instagram.com/newyorker_herald/" target="_blank" rel="noopener noreferrer">
            <img src="/images/footer-instagram.webp" alt="Follow us on Instagram" width="28" height="28" loading="lazy" />
          </a>
          <a href="https://x.com/NewYorkerHerald" target="_blank" rel="noopener noreferrer">
            <img src="/images/footer-twitter.webp" alt="Follow us on Twitter" width="28" height="28" loading="lazy" />
          </a>
        </div>
        <div className="footer-bottom-row">
          <div className="footer-copy">
            © {currentYear} <strong>New Yorker Herald</strong>. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
