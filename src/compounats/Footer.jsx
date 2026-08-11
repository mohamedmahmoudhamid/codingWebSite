import React from "react";
import { Link } from "react-router-dom";
import '../styles/Footer.css';
import { FaFacebookF, FaWhatsapp, FaLinkedinIn, FaInstagram } from "react-icons/fa";
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
    <a href="https://www.facebook.com/share/1D6ykS94A7/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
      <FaFacebookF />
    </a>
    <a href="https://wa.me/201280538625" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="WhatsApp">
      <FaWhatsapp />
    </a>
    <a href="https://www.linkedin.com/in/mohamed-mahmoud-hamid-2b1b44313?utm_source=share_via&utm_content=profile&utm_medium=member_ios" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
      <FaLinkedinIn />
    </a>
    <a href="https://www.instagram.com/xx_karizma1_xx?igsh=MWQ2eTUyN2VkMHl3YQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
      <FaInstagram />
    </a>
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
