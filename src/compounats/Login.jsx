import React, { useContext, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/context';
import {
  FaEnvelope,
  FaLock,
  FaRightToBracket,
  FaEye,
  FaEyeSlash,
  FaBolt,
  FaUserPlus
} from 'react-icons/fa6';
import { HiSparkles } from 'react-icons/hi2';
import '../styles/SignIn.css';

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, isLoggin } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleCardMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    setTilt({ x, y });
  };

  const handleCardMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;

    if (!email) {
      alert('Please enter a valid email address.');
      return;
    }

    login({
      name: email.split('@')[0].toUpperCase(),
      email: email,
      role: 'NexusCraft Member',
      phone: '+1 (555) 987-6543',
      location: 'Cairo, Egypt',
      bio: 'Digital craftsman exploring modern web tech and tools.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      joinedDate: 'Joined Today',
      techStack: ['React 19', 'Vite', 'CSS3', 'Node.js'],
      savedProducts: [1, 2, 3],
    });

    navigate('/profile');
  };

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

    navigate('/profile');
  };

  return (
    <main className="auth-page">
      <div className="auth-glow-orb orb-a"></div>
      <div className="auth-glow-orb orb-b"></div>

      <div
        className="auth-card-3d"
        style={{
          maxWidth: '520px',
          transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        }}
        onMouseMove={handleCardMouseMove}
        onMouseLeave={handleCardMouseLeave}
      >
        <div className="auth-card-header">
          <div className="auth-badge">
            <HiSparkles /> NexusCraft Member Portal
          </div>
          <h1>Welcome Back</h1>
          <p>
            {isLoggin
              ? 'You are currently logged in! Access your profile below.'
              : 'Log in to access digital products, downloads, and developer tools.'}
          </p>
        </div>

        {isLoggin ? (
          <div className="text-center py-4">
            <p className="mb-4">Logged in as member!</p>
            <Link to="/profile" className="btn-glow">
              Go to Profile Dashboard
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="auth-form">
            <button
              type="button"
              className="btn-secondary-glow btn-full"
              onClick={handleDemoLogin}
              style={{
                borderColor: 'var(--accent-primary)',
                background: 'rgba(99, 102, 241, 0.08)',
              }}
            >
              <FaBolt style={{ color: 'var(--accent-primary)' }} /> Quick Demo Account Sign-In
            </button>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                color: 'var(--text-muted)',
                fontSize: '0.85rem',
              }}
            >
              <hr style={{ flex: 1, borderColor: 'var(--border-color)' }} />
              OR LOGIN WITH EMAIL
              <hr style={{ flex: 1, borderColor: 'var(--border-color)' }} />
            </div>

            <div className="input-group-custom">
              <label htmlFor="emailInput">
                <FaEnvelope /> Email Address
              </label>
              <input
                type="email"
                ref={emailRef}
                id="emailInput"
                placeholder="name@example.com"
                required
              />
            </div>

            <div className="input-group-custom">
              <label htmlFor="passwordInput">
                <FaLock /> Password
              </label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  ref={passwordRef}
                  id="passwordInput"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn-glow btn-full">
              <FaRightToBracket /> Log In to NexusCraft
            </button>
          </form>
        )}

        <div className="auth-card-footer">
          <p>
            Don't have an account yet?{' '}
            <Link to="/signin">
              <FaUserPlus /> Sign Up Free
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;