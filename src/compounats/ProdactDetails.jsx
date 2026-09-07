import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../context/context';
import {
  FaArrowLeft,
  FaStar,
  FaTag,
  FaTruckFast,
  FaCheck,
  FaLock,
  FaBookmark,
  FaRegBookmark,
  FaUser,
  FaBolt,
  FaPaperPlane
} from 'react-icons/fa6';
import {
  buildDigitalProducts,
  DIGITAL_PRODUCTS_API,
} from '../data/digitalProducts';
import '../styles/Prodact.css';

const ProdactDetails = () => {
  const { id } = useParams();
  const { isLoggin, login, user, toggleSaveProduct } = useContext(AuthContext);

  const [products, setProducts] = useState(() => buildDigitalProducts());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(DIGITAL_PRODUCTS_API);
        const data = await res.json();
        setProducts(buildDigitalProducts(data.products));
      } catch (error) {
        console.error('Error fetching details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDemoLogin = () => {
    login({
      name: 'Alex Johnson',
      email: 'alex.johnson@nexuscraft.dev',
      role: 'Senior Full-Stack Engineer',
      phone: '+1 (555) 234-5678',
      location: 'Cairo, Egypt',
      bio: 'Passionate developer building high-performance web applications, 3D interactive UIs, and cloud products.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      joinedDate: 'January 2025',
      techStack: ['React 19', 'Node.js', 'TypeScript', 'Three.js', 'CSS Grid'],
      savedProducts: [1, 3, 5],
    });
  };

  if (!isLoggin) {
    return (
      <main className="product-details-page">
        <div className="locked-access-overlay">
          <div className="locked-access-card animate-fade-in">
            <div className="lock-icon-glow">
              <FaLock />
            </div>
            <span className="locked-kicker">Member Access Required</span>
            <h1>Product Specifications Locked</h1>
            <p>
              Please log in to view detailed technical specifications, architecture blueprints, feature breakdowns, and access request links.
            </p>
            <div className="locked-access-actions">
              <Link to="/login" className="btn-glow">
                <FaUser /> Log In to Access
              </Link>
              <Link to="/signin" className="btn-secondary-glow">
                Create Free Account
              </Link>
            </div>
            <div className="locked-demo-box">
              <button onClick={handleDemoLogin} className="demo-unlock-btn">
                <FaBolt /> Instant 1-Click Demo Unlock
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const product = products.find((item) => item.id === Number(id));
  const isSaved = user?.savedProducts?.includes(product?.id);

  if (!product && !isLoading) {
    return (
      <main className="product-details-page">
        <section className="product-details-empty">
          <span className="products-kicker">Product Details</span>
          <h1>Product Not Found</h1>
          <p>This product may have been moved or updated in our catalog.</p>
          <Link className="btn-glow" to="/products">
            <FaArrowLeft /> Back to Products Catalog
          </Link>
        </section>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="product-details-page">
        <section className="product-details-empty">
          <span className="products-kicker">NexusCraft Catalog</span>
          <h1>Loading Product Details...</h1>
        </section>
      </main>
    );
  }

  return (
    <main className="product-details-page">
      <div className="product-details-container">
        <Link to="/products" className="back-link-btn">
          <FaArrowLeft /> Back to Marketplace
        </Link>

        <section className="product-details-shell">
          <div className="product-details-media">
            {product.image ? (
              <img src={product.image} alt={product.title} />
            ) : (
              <div className="product-fallback-icon">{product.title.slice(0, 2)}</div>
            )}
            <span className="product-chip">{product.highlight}</span>
            <button
              className={`details-bookmark-btn ${isSaved ? 'saved' : ''}`}
              onClick={() => toggleSaveProduct(product.id)}
            >
              {isSaved ? <FaBookmark /> : <FaRegBookmark />}{' '}
              {isSaved ? 'Bookmarked' : 'Save to Profile'}
            </button>
          </div>

          <div className="product-details-content">
            <span className="details-type-kicker">{product.type}</span>
            <h1>{product.title}</h1>
            <p className="details-description">{product.description}</p>

            <div className="product-details-stats">
              <div className="stat-box">
                <span>Price</span>
                <strong>
                  <FaTag /> {product.price}
                </strong>
              </div>
              <div className="stat-box">
                <span>Rating</span>
                <strong>
                  <FaStar className="star-icon" /> {Number(product.rating).toFixed(1)} / 5.0
                </strong>
              </div>
              <div className="stat-box">
                <span>Delivery</span>
                <strong>
                  <FaTruckFast /> {product.delivery}
                </strong>
              </div>
            </div>

            <div className="product-details-block">
              <h2>Included Core Features</h2>
              <ul className="features-list">
                {product.features.map((feature) => (
                  <li key={feature}>
                    <FaCheck className="check-icon" /> {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="product-stack-section">
              <h2>Technologies & Frameworks</h2>
              <div className="product-stack">
                {product.stack.map((item) => (
                  <span key={item} className="stack-badge">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="product-details-actions">
              <Link
                className="btn-glow"
                to={`/contact?product=${encodeURIComponent(product.title)}`}
              >
                <FaPaperPlane /> Request Product & License
              </Link>
              <Link className="btn-secondary-glow" to="/products">
                Back to Products
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProdactDetails;
