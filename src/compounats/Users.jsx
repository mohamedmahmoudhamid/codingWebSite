import React, { useContext, useEffect, useRef, useState } from "react";
import Card from "./Card";
import CountUp from "./CountUp";
import "../styles/Users.css";
import { ThemeContext } from "../context/themeContext";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaUsers,
  FaChevronLeft,
  FaChevronRight,
  FaBoxOpen,
} from "react-icons/fa6";
import { HiSparkles } from "react-icons/hi2";

const teamMembers = [
  {
    id: 1,
    name: "Ahmed Hassan",
    email: "ahmed.hassan@nexuscraft.dev",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    description: "Lead Frontend Architect specializing in React 19, 3D WebGL, and design systems.",
    role: "Frontend Architect",
  },
  {
    id: 2,
    name: "Sara Ali",
    email: "sara.ali@nexuscraft.dev",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    description: "Growth & Product Marketing Strategist driving digital user acquisition and brand systems.",
    role: "Product Marketing",
  },
  {
    id: 3,
    name: "Mohamed Tarek",
    email: "mohamed.tarek@nexuscraft.dev",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    description: "Principal Backend Engineer building microservices, REST APIs, and database clusters.",
    role: "Backend Lead",
  },
  {
    id: 4,
    name: "Nour Magdy",
    email: "nour.magdy@nexuscraft.dev",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    description: "Senior UI/UX Designer creating high-fidelity interactive component libraries and design tokens.",
    role: "Lead UI/UX",
  },
  {
    id: 5,
    name: "Youssef Adel",
    email: "youssef.adel@nexuscraft.dev",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    description: "Engineering Project Manager guiding high-velocity product sprints and releases.",
    role: "Project Manager",
  },
  {
    id: 6,
    name: "Mariam Samy",
    email: "mariam.samy@nexuscraft.dev",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    description: "Technical Content Strategist documenting developer APIs and architecture guides.",
    role: "Tech Writer",
  },
  {
    id: 7,
    name: "Omar Khaled",
    email: "omar.khaled@nexuscraft.dev",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    description: "Data Analytics Engineer crafting KPI dashboards, real-time metrics, and data streams.",
    role: "Data Analyst",
  },
  {
    id: 8,
    name: "Hana Mostafa",
    email: "hana.mostafa@nexuscraft.dev",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    description: "Talent & Culture Partner recruiting top-tier software engineers and product designers.",
    role: "People & HR",
  },
  {
    id: 9,
    name: "Karim Nasser",
    email: "karim.nasser@nexuscraft.dev",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    description: "Mobile App Specialist building cross-platform React Native and Android systems.",
    role: "Mobile Engineer",
  },
];

const Users = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activePreview, setActivePreview] = useState(0);
  const [isPreviewDragging, setIsPreviewDragging] = useState(false);
  const heroRef = useRef(null);
  const previewDragStartX = useRef(null);

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = heroRef.current?.getBoundingClientRect();
      if (rect) {
        setMousePos({
          x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
          y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const stats = [
    { end: 9, suffix: '+', label: 'Senior Engineers' },
    { end: 65, suffix: '+', label: 'Products Shipped' },
    { end: 4, suffix: '+', label: 'Years Innovation' },
  ];

  const previewUser = teamMembers[activePreview];

  const showPreviousPreview = () => {
    setActivePreview((current) => (current === 0 ? teamMembers.length - 1 : current - 1));
  };

  const showNextPreview = () => {
    setActivePreview((current) => (current === teamMembers.length - 1 ? 0 : current + 1));
  };

const handlePreviewPointerDown = (event) => {
  if (event.target.closest('.preview-controls')) return; // سيب الأزرار تشتغل عادي
  previewDragStartX.current = event.clientX;
  setIsPreviewDragging(true);
  event.currentTarget.setPointerCapture?.(event.pointerId);
};

  const handlePreviewPointerUp = (event) => {
    if (previewDragStartX.current === null) return;
    const dragDistance = event.clientX - previewDragStartX.current;
    previewDragStartX.current = null;
    setIsPreviewDragging(false);

    if (Math.abs(dragDistance) < 45) return;
    if (dragDistance > 0) {
      showPreviousPreview();
    } else {
      showNextPreview();
    }
  };

  const handlePreviewPointerCancel = () => {
    previewDragStartX.current = null;
    setIsPreviewDragging(false);
  };

  return (
    <div className="home-wrapper">
      {/* Hero Section */}
      <section className="hero-section" ref={heroRef}>
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>

        {[...Array(12)].map((_, i) => (
          <div key={i} className={`particle particle-${i + 1}`}></div>
        ))}

        <div className="grid-lines">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="grid-line"></div>
          ))}
        </div>

        <div
          className={`hero-content ${isVisible ? "visible" : ""}`}
          style={{
            transform: `perspective(1000px) rotateX(${-mousePos.y * 0.04}deg) rotateY(${mousePos.x * 0.04}deg)`,
          }}
        >
          <div className="hero-badge">
            <span className="badge-dot"></span>
            <HiSparkles /> NexusCraft Digital Platform
          </div>

          <h1 className="hero-title">
            Crafting Premium
            <br />
            <span className="title-gradient"> Digital Solutions</span> &
            <br />
            <span className="title-outline">Products</span>
          </h1>

          <p className="hero-subtitle">
            An elite studio of developers and designers crafting modern web products, ready-made templates, and scalable infrastructure.
          </p>

          <div className="hero-stats">
            {stats.map((stat, i) => (
              <div key={i} className="stat-item">
                <span className="stat-value">
                  <CountUp end={stat.end} suffix={stat.suffix} duration={1800} />
                </span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>

          <div className="hero-actions">
            <button
              className="btn-glow"
              onClick={() =>
                document
                  .getElementById("team-section")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              <span>Explore Team & Products</span>
              <FaArrowRight />
            </button>
            <Link to="/products" className="btn-secondary-glow">
              <FaBoxOpen /> Products Catalog
            </Link>
          </div>
        </div>

        {/* 3D floating preview slider card */}
        <div
          className={`hero-visual ${isVisible ? "visible" : ""}`}
          style={{
            transform: `perspective(1200px) rotateY(${-mousePos.x * 0.06}deg) rotateX(${mousePos.y * 0.06}deg)`,
          }}
        >
          <div
            className={`floating-card-preview ${isPreviewDragging ? "dragging" : ""}`}
            onPointerDown={handlePreviewPointerDown}
            onPointerUp={handlePreviewPointerUp}
            onPointerCancel={handlePreviewPointerCancel}
          >
            <div className="preview-card preview-card-back"></div>
            <div className="preview-card preview-card-mid"></div>
            <div className="preview-card preview-card-front" key={previewUser.id}>
              <img
                src={previewUser.image}
                alt={previewUser.name}
                draggable="false"
              />
              <div className="preview-info">
                <div className="preview-name">{previewUser.name}</div>
                <div className="preview-role">{previewUser.role}</div>
                <p className="preview-description">{previewUser.description}</p>
                <div className="preview-bar">
                  <div
                    className="preview-fill"
                    style={{ width: `${((activePreview + 1) / teamMembers.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="preview-controls" aria-label="Team preview slider controls">
              <button
                type="button"
                className="slider-arrow-btn"
                onClick={showPreviousPreview}
                aria-label="Previous member"
              >
                <FaChevronLeft />
              </button>

              <div className="preview-dots">
                {teamMembers.map((user, index) => (
                  <button
                    key={user.id}
                    className={`preview-dot ${index === activePreview ? "active" : ""}`}
                    type="button"
                    onClick={() => setActivePreview(index)}
                    aria-label={`Show ${user.name}`}
                  ></button>
                ))}
              </div>

              <button
                type="button"
                className="slider-arrow-btn"
                onClick={showNextPreview}
                aria-label="Next member"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Team Showcase Section */}
      <section className="team-section" id="team-section">
        <div className="section-header">
          <span className="section-tag">
            <FaUsers /> The Craftsmen Behind NexusCraft
          </span>
          <h2 className="section-title">Meet Our Engineering Team</h2>
          <p className="section-subtitle">
            Every specialist brings domain expertise, technical rigor, and a passion for clean code.
          </p>
        </div>

        <div className="team-grid">
          {teamMembers.map((item, index) => (
            <div
              key={item.id}
              className="card-wrapper"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <Card
                id={item.id}
                img={item.image}
                userName={item.name}
                description={item.description}
                Email={item.email}
                role={item.role}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Users;
