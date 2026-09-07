import React, { useState } from 'react';
import { FaEnvelope, FaArrowRight, FaConnectdevelop } from 'react-icons/fa6';
import '../styles/Card.css';

const Card = ({ id, img, userName, description, Email, role }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -18;
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
      <div className="card-glow"></div>

      <div className="card-body p-3">
        <div className="card-accent-line"></div>

        <div className="card-header">
          <div className="card-avatar-wrapper">
            <img src={img} alt={userName} className="card-avatar" />
            <div className="card-avatar-ring"></div>
            <div className="card-status-dot"></div>
          </div>

          <div className="card-badge-id">#{id}</div>
        </div>

        <div className="card-info">
          <div className="card-role mt-1">{role}</div>
          <h3 className="card-name">{userName}</h3>
          <p className="card-desc">{description}</p>
        </div>

        <div className="card-divider"></div>

        <div className="card-footer">
          <div className="card-email-block">
            <div className="email-icon" aria-hidden="true">
              <FaEnvelope />
            </div>
            <span className="card-email-text">{Email}</span>
          </div>

          <button
            className="card-btn"
            onClick={() => alert(`Connecting with ${userName} (${Email})...`)}
          >
            <span>Connect</span>
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
