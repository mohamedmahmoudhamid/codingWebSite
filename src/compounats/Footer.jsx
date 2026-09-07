import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";
import { FaFacebookF, FaWhatsapp, FaLinkedinIn, FaInstagram } from "react-icons/fa6";
import { HiSparkles } from "react-icons/hi2";
import { AuthContext } from "../context/context";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { isLoggin } = useContext(AuthContext);

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
              <div className="footer-logo-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="footer-logo-svg"
                >
                  <polygon points="12 2 2 7 12 12 22 7 12 2" />
                  <polyline points="2 17 12 22 22 17" />
                  <polyline points="2 12 12 17 22 12" />
                </svg>
              </div>
              <span className="footer-logo-text">Nexus<span className="accent">Craft</span></span>
            </div>
            <p className="footer-text">
              Building exceptional digital solutions, high-performance web applications, ready-made UI design systems, and developer toolkits.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-title">Navigation</h4>
            <ul className="footer-links">
              <li><Link to="/" onClick={scrollToPageTop}>Home & Team</Link></li>
              <li><Link to="/services" onClick={scrollToPageTop}>Services</Link></li>
              <li><Link to="/aboutus" onClick={scrollToPageTop}>About NexusCraft</Link></li>
              <li><Link to="/products" onClick={scrollToPageTop}>Products Catalog</Link></li>
              {isLoggin ? (
                <li><Link to="/profile" onClick={scrollToPageTop}>User Profile Dashboard</Link></li>
              ) : (
                <li><Link to="/login" onClick={scrollToPageTop}>Member Login</Link></li>
              )}
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="footer-section">
            <h4 className="footer-title">Connect With Us</h4>
            <div className="social-links">
              <a
                href="https://www.facebook.com/share/1D6ykS94A7/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://wa.me/201280538625"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </a>
              <a
                href="https://www.linkedin.com/in/mohamed-mahmoud-hamid-2b1b44313?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://www.instagram.com/xx_karizma1_xx?igsh=MWQ2eTUyN2VkMHl3YQ%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
            </div>
            <p className="footer-email-note">
              Email: support@nexuscraft.dev
            </p>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <p className="copyright">
            &copy; {currentYear} NexusCraft Studio. All rights reserved.
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
