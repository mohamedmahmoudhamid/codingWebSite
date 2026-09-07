import React, { useCallback, useState } from 'react';
import CountUp from './CountUp';
import {
  FaLightbulb,
  FaCodeBranch,
  FaHandshake,
  FaRocket,
} from 'react-icons/fa6';
import { HiSparkles } from 'react-icons/hi2';
import '../styles/AboutUs.css';

const valuesData = [
  {
    title: 'Creative Product Strategy',
    text: 'We transform early concept ideas into clear technical blueprints with focused milestones and scalability in mind.',
    icon: <FaLightbulb />,
    number: '01',
  },
  {
    title: 'Precision Craftsmanship',
    text: 'Every line of code, component interface, and design token is crafted to deliver smooth 60fps experiences.',
    icon: <FaCodeBranch />,
    number: '02',
  },
  {
    title: 'Long-term Client Support',
    text: 'We partner closely after launch with continuous updates, security audits, and reliable technical guidance.',
    icon: <FaHandshake />,
    number: '03',
  },
];

const AboutUs = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((event) => {
    const { innerWidth, innerHeight } = window;
    const x = (event.clientX / innerWidth - 0.5) * 2;
    const y = (event.clientY / innerHeight - 0.5) * 2;

    setTilt({
      x: Number((y * -12).toFixed(2)),
      y: Number((x * 16).toFixed(2)),
    });
  }, []);

  return (
    <section
      className="about-page"
      style={{
        '--ice-tilt-x': `${tilt.x}deg`,
        '--ice-tilt-y': `${tilt.y}deg`,
      }}
      onMouseMove={handleMouseMove}
    >
      {/* 3D Geometric Cube Field */}
      <div className="ice-cube-field" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((cube) => (
          <div className={`ice-cube ice-cube-${cube + 1}`} key={cube}>
            <span className="ice-face ice-front" />
            <span className="ice-face ice-back" />
            <span className="ice-face ice-right" />
            <span className="ice-face ice-left" />
            <span className="ice-face ice-top" />
            <span className="ice-face ice-bottom" />
          </div>
        ))}
      </div>

      <div className="about-hero">
        <div className="about-copy">
          <span className="about-kicker">
            <HiSparkles /> About NexusCraft Studio
          </span>
          <h1>Building Digital Products That Feel Fast, Elegant, & Powerful.</h1>
          <p>
            We are a team of senior engineers, product designers, and creative strategists dedicated to shaping modern web applications, design systems, and developer toolkits.
          </p>

          <div className="about-stats">
            <div className="about-stat-card">
              <strong>
                <CountUp end={12} suffix="+" duration={1600} />
              </strong>
              <span>Digital Products</span>
            </div>
            <div className="about-stat-card">
              <strong>
                <CountUp end={99} suffix="%" duration={1800} />
              </strong>
              <span>Client Satisfaction</span>
            </div>
            <div className="about-stat-card">
              <strong>
                <CountUp end={24} suffix="/7" duration={1400} />
              </strong>
              <span>Support & Ops</span>
            </div>
          </div>
        </div>

        <div className="about-visual-3d">
          <div className="visual-image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=80"
              alt="NexusCraft product team collaborating"
            />
            <div className="about-floating-card">
              <div className="floating-card-icon">
                <FaRocket />
              </div>
              <div>
                <span>Ideas to Reality</span>
                <strong>High-Velocity Delivery</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="about-values">
        {valuesData.map((val, index) => (
          <article
            className="about-value-card-3d"
            style={{ animationDelay: `${index * 120}ms` }}
            key={val.title}
          >
            <div className="val-card-top">
              <span className="val-icon">{val.icon}</span>
              <span className="val-number">{val.number}</span>
            </div>
            <h3>{val.title}</h3>
            <p>{val.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default AboutUs;
