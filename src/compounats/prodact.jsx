import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Prodact.css';
import {
    buildDigitalProducts,
    DIGITAL_PRODUCTS_API,
    DIGITAL_PRODUCT_TYPES,
} from '../data/digitalProducts';

const Prodact = () => {
    const [products, setProducts] = useState(() => buildDigitalProducts());
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('All');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(DIGITAL_PRODUCTS_API);
                const data = await res.json();
                setProducts(buildDigitalProducts(data.products));
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

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

    return (
        <main className="products-page">
            <section className="products-header">
                <span className="products-kicker">Digital products</span>
                <h1>Products built for modern digital teams</h1>
                <p>
                    Ready-made systems, templates, and tools shaped for fast launches,
                    clean interfaces, and reliable product workflows.
                </p>
            </section>

            <section className="products-toolbar">
                <label className="product-search" htmlFor="product-search">
                    <span>Search</span>
                    <input
                        id="product-search"
                        type="search"
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        placeholder="Search product, type, or feature"
                    />
                </label>

                <div className="product-filters" aria-label="Filter products by type">
                    {DIGITAL_PRODUCT_TYPES.map((type) => (
                        <button
                            key={type}
                            type="button"
                            className={selectedType === type ? 'active' : ''}
                            onClick={() => setSelectedType(type)}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </section>

            <section className="products-grid" aria-busy={isLoading}>
                {filteredProducts.map((product, index) => (
                    <article
                        key={product.id}
                        className="product-card"
                        style={{ animationDelay: `${index * 0.08}s` }}
                    >
                        <div className="product-media">
                            {product.image ? (
                                <img src={product.image} alt={product.title} />
                            ) : (
                                <div className="product-fallback-icon">{product.title.slice(0, 2)}</div>
                            )}
                            <span className="product-chip">{product.highlight}</span>
                        </div>

                        <div className="product-content">
                            <div className="product-meta">
                                <span>{product.type}</span>
                                <strong>{product.price}</strong>
                            </div>

                            <h3>{product.title}</h3>
                            <p>{product.description}</p>

                            <div className="product-footer">
                                <span>{product.delivery}</span>
                                <span>{Number(product.rating).toFixed(1)} rating</span>
                            </div>

                            <Link className="product-action" to="/contact">
                                Request product
                            </Link>

                            <Link className="product-action product-action-secondary" to={`/details/${product.id}`}>
                                Details
                            </Link>
                        </div>
                    </article>
                ))}

                {!filteredProducts.length && (
                    <div className="products-empty">
                        <h3>No products found</h3>
                        <p>Try another search word or choose a different product type.</p>
                    </div>
                )}
            </section>
        </main>
    );
}

export default Prodact;
