import React from 'react';
import { Link } from 'react-router-dom';
import { FaCompass, FaHouse } from 'react-icons/fa6';
import { HiSparkles } from 'react-icons/hi2';
import '../styles/NotFound.css';

const NotFound = () => {
  return (
    <main className="not-found-page">
      <section className="not-found-content">
        <span className="not-found-kicker">
          <HiSparkles /> Error 404
        </span>
        <h1 className="not-found-title">
          <span>404</span>
          Page Not Found
        </h1>
        <p className="not-found-text">
          The requested page or resource could not be found or may have been moved.
        </p>

        <div className="not-found-actions">
          <Link className="btn-glow" to="/">
            <FaHouse /> Return Home
          </Link>
          <Link className="btn-secondary-glow" to="/services">
            <FaCompass /> Explore Services
          </Link>
        </div>
      </section>
    </main>
  );
};

export default NotFound;
