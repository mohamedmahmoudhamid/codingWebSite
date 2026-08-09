import React from "react";
import { Link } from "react-router-dom";
import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const scrollToPageTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">

          {/* Brand */}
          <div className="footer-section footer-brand">
            <div className="footer-logo">
              <span className="footer-logo-icon">&lt;/&gt;</span>
              <span className="footer-logo-text">Dome</span>
            </div>
            <p className="footer-text">
              Building exceptional digital experiences with modern technologies and a passionate team.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/" onClick={scrollToPageTop}>Home</Link></li>
              <li><Link to="/services" onClick={scrollToPageTop}>Services</Link></li>
              <li><Link to="/aboutus" onClick={scrollToPageTop}>About Us</Link></li>
              <li><Link to="/contact" onClick={scrollToPageTop}>Contact</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div className="footer-section">
            <h4 className="footer-title">Follow Us</h4>
            <div className="social-links">
              <a href="#" className="social-icon" aria-label="Facebook">f</a>
              <a href="#" className="social-icon" aria-label="Twitter">x</a>
              <a href="#" className="social-icon" aria-label="LinkedIn">in</a>
              <a href="#" className="social-icon" aria-label="Instagram">ig</a>
            </div>
          </div>

        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <p className="copyright">
            &copy; {currentYear} Dome. All rights reserved.
          </p>
          <div className="footer-legal">
            <a href="#privacy">Privacy Policy</a>
            <span className="divider">/</span>
            <a href="#terms">Terms &amp; Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
