import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaCode,
  FaMobileScreenButton,
  FaPalette,
  FaDatabase,
  FaCloud,
  FaShieldHalved,
  FaHeadset,
  FaArrowRight,
  FaCheck
} from 'react-icons/fa6';
import { HiSparkles } from 'react-icons/hi2';
import '../styles/Services.css';

const servicesData = [
  {
    icon: <FaCode />,
    badge: 'DEV',
    title: 'Custom Web Engineering',
    description: 'Modern, high-performance web applications built with React 19, TypeScript, scalable APIs, and clean UX.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80',
    features: ['React & Next.js architectures', 'Responsive & accessible UI', 'State management & API wiring', 'Performance & SEO audit'],
  },
  {
    icon: <FaMobileScreenButton />,
    badge: 'APP',
    title: 'Mobile App Development',
    description: 'High-performance mobile applications for iOS and Android with smooth 60fps animations and offline capability.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=900&q=80',
    features: ['Cross-platform React Native', 'Native iOS & Android integration', 'Push notifications & Auth', 'App Store deployment'],
  },
  {
    icon: <FaPalette />,
    badge: 'UX',
    title: 'UI/UX Design Systems',
    description: 'Creating intuitive digital interfaces, component design systems, wireframes, and interactive prototypes.',
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=900&q=80',
    features: ['Figma design systems', 'Interactive 3D prototypes', 'User research & usability testing', 'Design token handoff'],
  },
  {
    icon: <FaDatabase />,
    badge: 'DB',
    title: 'Database Architecture',
    description: 'Robust SQL and NoSQL data structures, optimized query caching, automated backups, and real-time streams.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80',
    features: ['PostgreSQL & MongoDB setup', 'ORM & migration scripts', 'Data indexing & query optimization', 'Automated backup solutions'],
  },
  {
    icon: <FaCloud />,
    badge: 'CLD',
    title: 'Cloud & Infrastructure',
    description: 'Scalable cloud infrastructure, automated CI/CD pipelines, containerization, and 24/7 server monitoring.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80',
    features: ['Docker & Kubernetes containers', 'AWS / Vercel cloud deployment', 'CI/CD pipeline automation', 'Serverless microservices'],
  },
  {
    icon: <FaShieldHalved />,
    badge: 'SEC',
    title: 'Cybersecurity & Quality Audits',
    description: 'Comprehensive penetration testing, code security reviews, vulnerability patches, and compliance verification.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=900&q=80',
    features: ['Security audits & penetration tests', 'End-to-end automated testing', 'SSL/TLS & Auth hardening', 'Vulnerability mitigation'],
  },
  {
    icon: <FaHeadset />,
    badge: 'OPS',
    title: 'Support & Ongoing Operations',
    description: 'Dedicated technical support, real-time application monitoring, maintenance updates, and continuous delivery.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
    features: ['24/7 incident response', 'Bug fixing & security patches', 'Feature expansions & upgrades', 'Performance SLA guarantees'],
  },
];

const Services = () => {
  const [tilts, setTilts] = useState({});

  const handleMouseMove = (e, index) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
    setTilts((prev) => ({ ...prev, [index]: { x, y } }));
  };

  const handleMouseLeave = (index) => {
    setTilts((prev) => ({ ...prev, [index]: { x: 0, y: 0 } }));
  };

  return (
    <section className="services-section">
      <div className="services-header">
        <span className="services-kicker">
          <HiSparkles /> Core Capabilities
        </span>
        <h1>Services Built for Modern Digital Excellence</h1>
        <p>
          From initial system design to cloud delivery, our team brings focused domain expertise, high technical standards, and reliable support to every project.
        </p>
      </div>

      <div className="services-container">
        {servicesData.map((service, index) => {
          const tilt = tilts[index] || { x: 0, y: 0 };

          return (
            <div
              className="service-card-3d"
              key={service.title}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => handleMouseLeave(index)}
              style={{
                transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
                animationDelay: `${index * 0.08}s`,
              }}
            >
              <div className="service-image">
                <img src={service.image} alt={service.title} />
                <div className="service-image-overlay"></div>
                <div className="service-badge-pill">
                  <span className="service-react-icon">{service.icon}</span>
                  <span className="service-badge-text">{service.badge}</span>
                </div>
              </div>

              <div className="service-content">
                <span className="service-number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>

                <div className="service-features">
                  <ul>
                    {service.features.map((feature) => (
                      <li key={feature}>
                        <FaCheck className="feature-check-icon" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="service-card-footer">
                  <Link
                    className="btn-glow btn-sm"
                    to={`/contact?service=${encodeURIComponent(service.title)}`}
                  >
                    Request Service <FaArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Services;
