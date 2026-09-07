import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/context';
import {
  FaMagnifyingGlass,
  FaFilter,
  FaStar,
  FaLock,
  FaBookmark,
  FaRegBookmark,
  FaArrowRight,
  FaUser,
  FaBolt,
  FaCheck,
  FaTag,
  FaTruckFast
} from 'react-icons/fa6';
import '../styles/Prodact.css';
import {
  buildDigitalProducts,
  DIGITAL_PRODUCTS_API,
  DIGITAL_PRODUCT_TYPES,
} from '../data/digitalProducts';

const Prodact = () => {
  const { isLoggin, login, user, toggleSaveProduct } = useContext(AuthContext);
  const navigate = useNavigate();

  const [products, setProducts] = useState(() => buildDigitalProducts());
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  // 3D Card tilt state per card index
  const [cardTilts, setCardTilts] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(DIGITAL_PRODUCTS_API);
        const data = await res.json();
        setProducts(buildDigitalProducts(data.products));
      } catch (error) {
        console.error('Error loading products API:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleMouseMove = (e, index) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -15;
    setCardTilts((prev) => ({ ...prev, [index]: { x, y } }));
  };

  const handleMouseLeave = (index) => {
    setCardTilts((prev) => ({ ...prev, [index]: { x: 0, y: 0 } }));
  };

  const filteredProducts = products.filter((product) => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    const matchesSearch =
      !normalizedSearch ||
      product.title.toLowerCase().includes(normalizedSearch) ||
      product.description.toLowerCase().includes(normalizedSearch) ||
      product.type.toLowerCase().includes(normalizedSearch);

    const matchesType = selectedType === 'All' || product.type === selectedType;

    return matchesSearch && matchesType;
  });

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

  // Protected View if user is NOT logged in
  if (!isLoggin) {
    return (
      <main className="products-page">
        <div className="locked-access-overlay">
          <div className="locked-access-card animate-fade-in">
            <div className="lock-icon-glow">
              <FaLock />
            </div>
            <span className="locked-kicker">Member Access Required</span>
            <h1>Digital Products Marketplace</h1>
            <p>
              Our complete catalog of UI design systems, API toolkits, analytics dashboards, and production templates is available exclusively to authenticated NexusCraft members.
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
                <FaBolt /> Click Here for Instant 1-Click Demo Login
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="products-page">
      <section className="products-header">
        <span className="products-kicker">Digital Products Hub</span>
        <h1>Products Built for Modern Tech Teams</h1>
        <p>
          Ready-made design systems, starter kits, and backend toolkits crafted for rapid launches, clean architecture, and seamless user experiences.
        </p>
      </section>

      <section className="products-toolbar">
        <div className="product-search-box">
          <FaMagnifyingGlass className="search-icon" />
          <input
            id="product-search"
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search products by title, technology, or type..."
          />
        </div>

        <div className="product-filters" aria-label="Filter products by type">
          <span className="filter-label">
            <FaFilter /> Categories:
          </span>
          {DIGITAL_PRODUCT_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              className={`filter-chip ${selectedType === type ? 'active' : ''}`}
              onClick={() => setSelectedType(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </section>

      <section className="products-grid" aria-busy={isLoading}>
        {filteredProducts.map((product, index) => {
          const tilt = cardTilts[index] || { x: 0, y: 0 };
          const isSaved = user?.savedProducts?.includes(product.id);

          return (
            <article
              key={product.id}
              className="product-card-3d"
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => handleMouseLeave(index)}
              style={{
                transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
                animationDelay: `${index * 0.06}s`,
              }}
            >
              <div className="product-media">
                {product.image ? (
                  <img src={product.image} alt={product.title} />
                ) : (
                  <div className="product-fallback-icon">{product.title.slice(0, 2)}</div>
                )}
                <span className="product-chip">{product.highlight}</span>
                <button
                  className={`bookmark-btn ${isSaved ? 'saved' : ''}`}
                  onClick={() => toggleSaveProduct(product.id)}
                  title={isSaved ? 'Remove Bookmark' : 'Save to Profile'}
                >
                  {isSaved ? <FaBookmark /> : <FaRegBookmark />}
                </button>
              </div>

              <div className="product-content">
                <div className="product-meta">
                  <span className="type-badge">{product.type}</span>
                  <strong className="price-tag"><FaTag /> {product.price}</strong>
                </div>

                <h3>{product.title}</h3>
                <p>{product.description}</p>

                <div className="product-tech-stack">
                  {product.stack?.slice(0, 3).map((item) => (
                    <span key={item} className="mini-tech-chip">
                      {item}
                    </span>
                  ))}
                </div>

                <div className="product-footer">
                  <span><FaTruckFast /> {product.delivery}</span>
                  <span className="rating-span">
                    <FaStar className="star-icon" /> {Number(product.rating).toFixed(1)}
                  </span>
                </div>

                <div className="product-actions-group">
                  <Link className="product-action-btn primary" to={`/contact?product=${encodeURIComponent(product.title)}`}>
                    Request Product
                  </Link>

                  <Link className="product-action-btn secondary" to={`/details/${product.id}`}>
                    Details <FaArrowRight />
                  </Link>
                </div>
              </div>
            </article>
          );
        })}

        {!filteredProducts.length && (
          <div className="products-empty">
            <h3>No products found</h3>
            <p>Try searching for another keyword or select a different category filter.</p>
          </div>
        )}
      </section>
    </main>
  );
};

export default Prodact;
