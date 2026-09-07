import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import { AuthContext } from '../context/context';
import { ThemeContext } from '../context/themeContext';
import {
  HiHome,
  HiSparkles,
  HiInformationCircle,
  HiPhone,
  HiShoppingBag,
  HiUser,
  HiArrowRightOnRectangle,
  HiUserPlus,
  HiSun,
  HiMoon,
  HiLockClosed,
  HiArrowLeftOnRectangle
} from 'react-icons/hi2';

const Navbar = () => {
  const { isLoggin, user, logout } = useContext(AuthContext);
  const { theme, setTheme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const getActiveSection = () => {
    const pathname = location.pathname;
    if (pathname === '/' || pathname === '/home') return 'home';
    if (pathname.includes('/contact')) return 'contact';
    if (pathname.includes('/services')) return 'services';
    if (pathname.includes('/products') || pathname.includes('/details')) return 'products';
    if (pathname.includes('/aboutus')) return 'about';
    if (pathname.includes('/profile')) return 'profile';
    if (pathname.includes('/login')) return 'login';
    if (pathname.includes('/signin')) return 'signin';
    return 'home';
  };

  const activeSection = getActiveSection();

  const toggleMenu = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    document.body.style.overflow = newIsOpen ? 'hidden' : '';
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
  };

  const isActive = (section) => activeSection === section;

  // Close on route change
  useEffect(() => {
    setIsOpen(false);
    document.body.style.overflow = '';
  }, [location.pathname]);

  // Close on ESC key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && isOpen) closeMenu();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isOpen && (
        <div
          className="nav-backdrop"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-brand" onClick={closeMenu}>
            <div className="logo-icon-box">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="logo-svg"
              >
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
            </div>
            <div className="navbar-logo">
              <span className="logo-text-main">Nexus</span>
              <span className="logo-text-accent">Craft</span>
            </div>
          </Link>

          <button
            className={`hamburger ${isOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul className={`navbar-menu ${isOpen ? 'active' : ''}`}>
            <li className="navbar-item">
              <Link
                to="/"
                className={`navbar-link ${isActive('home') ? 'active' : ''}`}
                onClick={closeMenu}
              >
                <HiHome className="nav-icon" />
                <span>Home</span>
              </Link>
            </li>

            <li className="navbar-item">
              <Link
                to="/services"
                className={`navbar-link ${isActive('services') ? 'active' : ''}`}
                onClick={closeMenu}
              >
                <HiSparkles className="nav-icon" />
                <span>Services</span>
              </Link>
            </li>

            <li className="navbar-item">
              <Link
                to="/aboutus"
                className={`navbar-link ${isActive('about') ? 'active' : ''}`}
                onClick={closeMenu}
              >
                <HiInformationCircle className="nav-icon" />
                <span>About</span>
              </Link>
            </li>

            <li className="navbar-item">
              <Link
                to="/contact"
                className={`navbar-link ${isActive('contact') ? 'active' : ''}`}
                onClick={closeMenu}
              >
                <HiPhone className="nav-icon" />
                <span>Contact</span>
              </Link>
            </li>

            <li className="navbar-item">
              <Link
                to="/products"
                className={`navbar-link ${isActive('products') ? 'active' : ''}`}
                onClick={closeMenu}
              >
                <HiShoppingBag className="nav-icon" />
                <span>Products</span>
                {!isLoggin && (
                  <span className="lock-pill" title="Login required to view products">
                    <HiLockClosed /> Pro
                  </span>
                )}
              </Link>
            </li>

            {/* Member Auth Block */}
            {isLoggin ? (
              <li className="navbar-item user-profile-item">
                <Link
                  to="/profile"
                  className={`navbar-link user-profile-link ${isActive('profile') ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  <img
                    src={
                      user?.avatar ||
                      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
                    }
                    alt="Avatar"
                    className="nav-avatar"
                  />
                  <span className="nav-user-name">{user?.name || 'User Profile'}</span>
                </Link>
                <button
                  className="nav-logout-btn"
                  title="Log out"
                  onClick={() => {
                    logout();
                    closeMenu();
                    navigate('/login');
                  }}
                >
                  <HiArrowLeftOnRectangle />
                </button>
              </li>
            ) : (
              <>
                <li className="navbar-item">
                  <Link
                    to="/login"
                    className={`navbar-link ${isActive('login') ? 'active' : ''}`}
                    onClick={closeMenu}
                  >
                    <HiArrowRightOnRectangle className="nav-icon" />
                    <span>Login</span>
                  </Link>
                </li>

                <li className="navbar-item">
                  <Link
                    to="/signin"
                    className="nav-btn-signup"
                    onClick={closeMenu}
                  >
                    <HiUserPlus className="nav-icon" />
                    <span>Sign Up</span>
                  </Link>
                </li>
              </>
            )}

            <li className="navbar-item theme-item">
              <button onClick={toggleTheme} className="theme-toggle-btn" aria-label="Toggle Theme">
                {theme === 'dark' ? (
                  <>
                    <HiSun className="theme-icon sun" />
                    <span>Light</span>
                  </>
                ) : (
                  <>
                    <HiMoon className="theme-icon moon" />
                    <span>Dark</span>
                  </>
                )}
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
