import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NotFound.css';

const NotFound = () => {
    return (
        <main className="not-found-page">
            <section className="not-found-content">
                <span className="not-found-kicker">Route missing</span>
                <h1>
                    <span>404</span>
                    Page Not Found
                </h1>
                <p>
                    Sorry, the page you are looking for does not exist or has been moved.
                </p>

                <div className="not-found-actions">
                    <Link className="not-found-primary" to="/home">
                        Go Home
                    </Link>
                    <Link className="not-found-secondary" to="/services">
                        View Services
                    </Link>
                </div>
            </section>
        </main>
    );
}

export default NotFound;
