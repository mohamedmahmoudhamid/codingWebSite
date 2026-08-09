import React from 'react';
import '../styles/Services.css';

const services = [
    {
        icon: 'fa-solid fa-code',
        badge: 'DEV',
        title: 'Web Development',
        description: 'We build responsive and modern websites using the latest technologies.',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80',
        features: ['Custom website design', 'Responsive layouts', 'E-commerce integration', 'SEO optimization'],
    },
    {
        icon: 'fa-solid fa-mobile-screen-button',
        badge: 'APP',
        title: 'Mobile App Development',
        description: 'Develop high-performance mobile apps for iOS and Android platforms.',
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=900&q=80',
        features: ['Native app development', 'Cross-platform solutions', 'App store deployment', 'Maintenance and updates'],
    },
    {
        icon: 'fa-solid fa-palette',
        badge: 'UX',
        title: 'UI/UX Design',
        description: 'Create intuitive and engaging user interfaces and experiences.',
        image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=900&q=80',
        features: ['User research and analysis', 'Wireframing and prototyping', 'Visual design', 'Usability testing'],
    },
    {
        icon: 'fa-solid fa-database',
        badge: 'DB',
        title: 'Database Management',
        description: 'Efficient data storage and retrieval solutions for your business needs.',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80',
        features: ['Database design & architecture', 'Data optimization', 'Backup & recovery', 'Security & compliance'],
    },
    {
        icon: 'fa-solid fa-cloud',
        badge: 'CLD',
        title: 'Cloud Solutions',
        description: 'Scalable cloud infrastructure and hosting services.',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80',
        features: ['Cloud migration services', 'Serverless architecture', 'Auto-scaling infrastructure', '24/7 monitoring & support'],
    },
    {
        icon: 'fa-solid fa-shield-halved',
        badge: 'SEC',
        title: 'Security & Testing',
        description: 'Comprehensive security audits and quality assurance testing.',
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=900&q=80',
        features: ['Penetration testing', 'Automated testing', 'Security audits', 'Performance optimization'],
    },
    {
        icon: 'fa-solid fa-headset',
        badge: 'OPS',
        title: 'Support & Maintenance',
        description: 'Ongoing support and maintenance for your applications.',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
        features: ['24/7 technical support', 'Bug fixes & patches', 'Feature updates', 'Performance monitoring'],
    },
];

const Services = () => {
    return (
        <section className="services-section">
            <div className="services-header">
                <span className="services-kicker">What we do</span>
                <h1>Services built for modern digital products</h1>
                <p>From the first interface sketch to secure cloud delivery, every service has a focused team and a polished workflow.</p>
            </div>
            <div className="services-container">
                {services.map((service, index) => (
                    <div className="service-card" style={{ animationDelay: `${index * 90}ms` }} key={service.title}>
                        <div className="service-image">
                            <img src={service.image} alt={service.title} />
                            <div className="service-image-overlay"></div>
                            <div className="service-icon">
                                <i className={service.icon}></i>
                                <span>{service.badge}</span>
                            </div>
                        </div>
                        <div className="service-content">
                            <span className="service-number">{String(index + 1).padStart(2, '0')}</span>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                            <div className="service-features">
                                <ul>
                                    {service.features.map((feature) => (
                                        <li key={feature}>{feature}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Services;
