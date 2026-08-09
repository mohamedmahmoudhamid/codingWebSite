import React, { useState ,} from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
// useEffect(() => {
//     document.body.style.overflow = isOpen ? "hidden" : "unset";
    
//     // Cleanup لما الكومبوننت يتمسح
//     return () => {
//         document.body.style.overflow = "unset";
//     };
// }, [isOpen]);


    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const getActiveSection = () => {
        const pathname = location.pathname;
        if (pathname === '/') {
            return 'home';
        } else if (pathname.includes('/contact')) {
            return 'contact';
        } else if (pathname.includes('/services')) {
            return 'services';
        } else if (pathname.includes('/aboutus')) {
            return 'about';
        }
        return 'home';
    };

    const activeSection = getActiveSection();

    const toggleMenu = () => {
         const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    document.body.style.overflow = newIsOpen ? "hidden" : "unset";
        
    };

    const closeMenu = () => {
      
    setIsOpen(false);
    document.body.style.overflow = "unset";
    };

    const isActive = (section) => activeSection === section;

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-brand">
                    <span className="logo-icon">&lt;/&gt;</span>
                    <div className="navbar-logo">
                        {/* <Link to="/" > */}
                        <span className="logo-text">Dome</span>
                        {/* </Link> */}
                    </div>
                </div>

                <button 
                    className={`hamburger ${isOpen ? 'active' : ''}`} 
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
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
                            Home
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link 
                            to="/contact" 
                            className={`navbar-link ${isActive('contact') ? 'active' : ''}`} 
                            onClick={closeMenu}
                        >
                            Contact Us
                        </Link>
                    </li>
                    <li className="navbar-item dropdown">
                        <Link 
                            to="/services" 
                            className={`navbar-link ${isActive('services') ? 'active' : ''}`} 
                            onClick={closeMenu}
                        >
                            Services
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link 
                            to="/aboutus" 
                            className={`navbar-link ${isActive('about') ? 'active' : ''}`} 
                            onClick={closeMenu}
                        >
                            About
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
