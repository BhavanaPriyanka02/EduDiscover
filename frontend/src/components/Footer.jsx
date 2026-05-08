import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Mail, MessageSquare, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: 'var(--secondary-color)', color: 'white', paddingTop: '4rem', paddingBottom: '2rem', marginTop: 'auto' }}>
      <div className="container">
        <div className="grid grid-cols-4" style={{ marginBottom: '3rem' }}>
          <div style={{ gridColumn: 'span 1' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: 'bold' }}>
              <GraduationCap size={32} color="var(--primary-color)" />
              <span>EduDiscover</span>
            </Link>
            <p style={{ color: 'var(--text-tertiary)', marginBottom: '1.5rem' }}>
              Your ultimate destination to discover, compare, and connect with top colleges and universities across the country.
            </p>
            <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-tertiary)' }}>
              <Globe className="social-icon" style={{ cursor: 'pointer' }} />
              <MessageSquare className="social-icon" style={{ cursor: 'pointer' }} />
              <Mail className="social-icon" style={{ cursor: 'pointer' }} />
            </div>
          </div>
          
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1.5rem' }}>Quick Links</h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'var(--text-tertiary)' }}>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/compare">Compare Colleges</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Sign Up</Link></li>
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1.5rem' }}>Top Locations</h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'var(--text-tertiary)' }}>
              <li>Delhi</li>
              <li>Mumbai</li>
              <li>Bangalore</li>
              <li>Chennai</li>
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1.5rem' }}>Contact</h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'var(--text-tertiary)' }}>
              <li>Email: info@edudiscover.com</li>
              <li>Phone: +91 123 456 7890</li>
              <li>Address: Tech Park, Bangalore</li>
            </ul>
          </div>
        </div>
        
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '0.875rem' }}>
          &copy; {new Date().getFullYear()} EduDiscover Platform. All rights reserved. Built for College Discovery.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
