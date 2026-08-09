import React, { useState } from 'react';
import '../styles/Card.css';

const Card = ({ id, img, userName, description, Email, role }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => setIsHovered(true);

  return (
    <div
      className={`card-3d-wrapper ${isHovered ? 'hovered' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(800px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
      }}
    >
      {/* Glow effect */}
      <div className="card-glow"></div>

      {/* Card body */}
      <div className="card-body p-3">
        {/* Top accent line */}
        <div className="card-accent-line"></div>

        {/* Header */}
        <div className="card-header ">
          <div className="card-avatar-wrapper">
            <img src={img} alt={userName} className="card-avatar" />
            <div className="card-avatar-ring"></div>
            <div className="card-status-dot"></div>
          </div>

          <div className="card-badge-id">#{id}</div>
        </div>

        {/* Info */}
        <div className="card-info">
          <div className="card-role mt-1">{role}</div>
          <h3 className="card-name">{userName}</h3>
          <p className="card-desc">{description}</p>
        </div>

        {/* Divider */}
        <div className="card-divider"></div>

        {/* Footer */}
        <div className="card-footer">
          <div className="card-email-block">
            <div className="email-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M4.75 7.75A2.75 2.75 0 0 1 7.5 5h9a2.75 2.75 0 0 1 2.75 2.75v8.5A2.75 2.75 0 0 1 16.5 19h-9a2.75 2.75 0 0 1-2.75-2.75v-8.5Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="m6.25 8.25 4.2 3.35a2.5 2.5 0 0 0 3.1 0l4.2-3.35"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="card-email-text">{Email}</span>
          </div>
          <button
            className="card-btn"
            onClick={() => alert(`Connecting with ${userName}...`)}
          >
            <span>Connect</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
