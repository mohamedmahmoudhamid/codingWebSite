import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
    buildDigitalProducts,
    DIGITAL_PRODUCTS_API,
} from '../data/digitalProducts';
import '../styles/Prodact.css';

const ProdactDetails = () => {
    const { id } = useParams();
    const [products, setProducts] = useState(() => buildDigitalProducts());
    const [isLoading, setIsLoading] = useState(true);

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

    const product = products.find((item) => item.id === Number(id));

    if (!product && !isLoading) {
        return (
            <main className="product-details-page">
                <section className="product-details-empty">
                    <span className="products-kicker">Product details</span>
                    <h1>Product not found</h1>
                    <p>This product may have been moved or removed from the catalog.</p>
                    <Link className="product-action" to="/products">Back to products</Link>
                </section>
            </main>
        );
    }

    if (!product) {
        return (
            <main className="product-details-page">
                <section className="product-details-empty">
                    <span className="products-kicker">Loading</span>
                    <h1>Preparing product details</h1>
                </section>
            </main>
        );
    }

    return (
        <main className="product-details-page">
            <section className="product-details-shell">
                <div className="product-details-media">
                    {product.image ? (
                        <img src={product.image} alt={product.title} />
                    ) : (
                        <div className="product-fallback-icon">{product.title.slice(0, 2)}</div>
                    )}
                    <span className="product-chip">{product.highlight}</span>
                </div>

                <div className="product-details-content">
                    <span className="products-kicker">{product.type}</span>
                    <h1>{product.title}</h1>
                    <p>{product.description}</p>

                    <div className="product-details-stats">
                        <div>
                            <span>Price</span>
                            <strong>{product.price}</strong>
                        </div>
                        <div>
                            <span>Rating</span>
                            <strong>{Number(product.rating).toFixed(1)}</strong>
                        </div>
                        <div>
                            <span>Delivery</span>
                            <strong>{product.delivery}</strong>
                        </div>
                    </div>

                    <div className="product-details-block">
                        <h2>Included features</h2>
                        <ul>
                            {product.features.map((feature) => (
                                <li key={feature}>{feature}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="product-stack">
                        {product.stack.map((item) => (
                            <span key={item}>{item}</span>
                        ))}
                    </div>

                    <div className="product-details-actions">
                        <Link className="product-action" to="/contact">
                            Request product
                        </Link>
                        <Link className="product-action product-action-secondary" to="/products">
                            Back to products
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default ProdactDetails;
