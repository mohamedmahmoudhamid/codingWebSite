import React, { useEffect, useRef, useState } from "react";
import Card from "./Card";
import CountUp from "./CountUp";
import "../styles/Users.css";

const Users = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activePreview, setActivePreview] = useState(0);
  const [isPreviewDragging, setIsPreviewDragging] = useState(false);
  const heroRef = useRef(null);
  const previewDragStartX = useRef(null);

  const users = [
    {
      id: 1,
      name: "Ahmed Hassan",
      email: "ahmed.hassan@example.com",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      description: "Frontend developer who enjoys building user interfaces.",
      role: "Frontend Dev",
    },
    {
      id: 2,
      name: "Sara Ali",
      email: "sara.ali@example.com",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
      description: "Marketing specialist focused on digital campaigns.",
      role: "Marketing",
    },
    {
      id: 3,
      name: "Mohamed Tarek",
      email: "mohamed.tarek@example.com",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
      description: "Backend engineer with experience in APIs.",
      role: "Backend Dev",
    },
    {
      id: 4,
      name: "Nour Magdy",
      email: "nour.magdy@example.com",
      image: "https://randomuser.me/api/portraits/women/4.jpg",
      description: "Graphic designer who creates brand visuals.",
      role: "Designer",
    },
    {
      id: 5,
      name: "Youssef Adel",
      email: "youssef.adel@example.com",
      image: "https://randomuser.me/api/portraits/men/5.jpg",
      description: "Project manager leading software teams.",
      role: "PM",
    },
    {
      id: 6,
      name: "Mariam Samy",
      email: "mariam.samy@example.com",
      image: "https://randomuser.me/api/portraits/women/6.jpg",
      description: "Content writer focused on tech topics.",
      role: "Content",
    },
    {
      id: 7,
      name: "Omar Khaled",
      email: "omar.khaled@example.com",
      image: "https://randomuser.me/api/portraits/men/7.jpg",
      description: "Data analyst who works with dashboards.",
      role: "Data Analyst",
    },
    {
      id: 8,
      name: "Hana Mostafa",
      email: "hana.mostafa@example.com",
      image: "https://randomuser.me/api/portraits/women/8.jpg",
      description: "HR specialist managing recruitment tasks.",
      role: "HR Specialist",
    },
    {
      id: 9,
      name: "Karim Nasser",
      email: "karim.nasser@example.com",
      image: "https://randomuser.me/api/portraits/men/9.jpg",
      description: "Mobile developer building Android apps.",
      role: "Mobile Dev",
    },
  ];

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
    { end: 9,  suffix: '+', label: 'Team Members'  },
    { end: 50, suffix: '+', label: 'Projects Done'  },
    { end: 3,  suffix: '+', label: 'Years Active'   },
  ];

  const previewUser = users[activePreview];

  const showPreviousPreview = () => {
    setActivePreview((current) => (current === 0 ? users.length - 1 : current - 1));
  };

  const showNextPreview = () => {
    setActivePreview((current) => (current === users.length - 1 ? 0 : current + 1));
  };

  const handlePreviewPointerDown = (event) => {
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
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section" ref={heroRef}>
        {/* Animated background orbs */}
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>

        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <div key={i} className={`particle particle-${i + 1}`}></div>
        ))}

        {/* 3D Grid lines */}
        <div className="grid-lines">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="grid-line"></div>
          ))}
        </div>

        <div
          className={`hero-content ${isVisible ? "visible" : ""}`}
          style={{
            transform: `perspective(1000px) rotateX(${-mousePos.y * 0.05}deg) rotateY(${mousePos.x * 0.05}deg)`,
          }}
        >
          <div className="hero-badge">
            <span className="badge-dot"></span>
            Welcome to Dome
          </div>

          <h1 className="hero-title">
            Meet Our
            <span className="title-gradient"> Brilliant</span>
            <br />
            <span className="title-outline">Team</span>
          </h1>

          <p className="hero-subtitle">
            Talented professionals united by passion, creativity, and a drive to
            build exceptional digital experiences.
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
              className="btn-primary"
              onClick={() =>
                document
                  .getElementById("team-section")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              <span>Meet the Team</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 17L17 7M17 7H7M17 7V17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button className="btn-secondary">
              <span>Learn More</span>
            </button>
          </div>
        </div>

        {/* 3D floating card preview */}
        <div
          className={`hero-visual ${isVisible ? "visible" : ""}`}
          style={{
            transform: `perspective(1200px) rotateY(${-mousePos.x * 0.08}deg) rotateX(${mousePos.y * 0.08}deg)`,
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
                    style={{ width: `${((activePreview + 1) / users.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="preview-controls" aria-label="Team preview slider controls">
              <div className="preview-dots">
                {users.map((user, index) => (
                  <button
                    key={user.id}
                    className={`preview-dot ${index === activePreview ? "active" : ""}`}
                    type="button"
                    onClick={() => setActivePreview(index)}
                    aria-label={`Show ${user.name}`}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator">
          <div className="scroll-mouse">
            <div className="scroll-wheel"></div>
          </div>
          <span>Scroll down</span>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section" id="team-section">
        <div className="section-header">
          <span className="section-tag">Our People</span>
          <h2 className="section-title">The Dream Team</h2>
          <p className="section-subtitle">
            Each member brings a unique superpower to the table
          </p>
        </div>

        <div className="team-grid">
          {users.map((item, index) => (
            <div
              key={item.id}
              className="card-wrapper"
              style={{ animationDelay: `${index * 0.1}s` }}
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
