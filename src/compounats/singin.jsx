import React, { useContext, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/context';
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaBriefcase,
  FaPhone,
  FaLocationDot,
  FaUserPlus,
  FaArrowRight,
  FaEye,
  FaEyeSlash,
  FaCamera,
  FaImage,
  FaCircleCheck
} from 'react-icons/fa6';
import { HiSparkles } from 'react-icons/hi2';
import '../styles/SignIn.css';

const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';

const SignIn = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Full-Stack Developer',
    phone: '',
    location: 'Cairo, Egypt',
    bio: '',
    avatar: DEFAULT_AVATAR,
  });

  const [avatarPreview, setAvatarPreview] = useState(DEFAULT_AVATAR);
  const [avatarSource, setAvatarSource] = useState('default'); // 'default' | 'uploaded'
  const [showPassword, setShowPassword] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [dragOver, setDragOver] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleCardMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    setTilt({ x, y });
  };

  const handleCardMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const processImageFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      setAvatarPreview(dataUrl);
      setFormData((prev) => ({ ...prev, avatar: dataUrl }));
      setAvatarSource('uploaded');
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 2500);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => {
    processImageFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    processImageFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      alert('Please fill in all required fields (Name, Email, Password)');
      return;
    }

    const newUser = {
      name: formData.name,
      email: formData.email,
      role: formData.role || 'Member',
      phone: formData.phone || '+1 (555) 000-1234',
      location: formData.location || 'Cairo, Egypt',
      bio: formData.bio || 'Product enthusiast and technology builder.',
      avatar: formData.avatar,
      joinedDate: 'Just Joined',
      techStack: ['React', 'CSS3', 'Node.js'],
      savedProducts: [1, 2],
    };

    login(newUser);
    navigate('/profile');
  };

  return (
    <main className="auth-page">
      <div className="auth-glow-orb orb-a"></div>
      <div className="auth-glow-orb orb-b"></div>

      <div
        className="auth-card-3d"
        onMouseMove={handleCardMouseMove}
        onMouseLeave={handleCardMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        }}
      >
        <div className="auth-card-header">
          <div className="auth-badge">
            <HiSparkles /> NexusCraft Registration
          </div>
          <h1>Create Account</h1>
          <p>Join NexusCraft Studio to unlock member-only digital products &amp; resources.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">

          {/* ===== AVATAR UPLOAD SECTION ===== */}
          <div className="avatar-upload-section">
            <label className="avatar-upload-label">Profile Picture</label>
            <div className="avatar-upload-layout">

              {/* Preview */}
              <div className="avatar-preview-wrap">
                <img
                  src={avatarPreview}
                  alt="Profile preview"
                  className="avatar-preview-img"
                />
                {avatarSource === 'uploaded' && (
                  <span className="avatar-uploaded-badge">
                    <FaCircleCheck /> Uploaded
                  </span>
                )}
              </div>

              {/* Drop Zone */}
              <div
                className={`avatar-dropzone ${dragOver ? 'drag-over' : ''}`}
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                  id="avatar-file-input"
                />

                {uploadSuccess ? (
                  <div className="dropzone-success">
                    <FaCircleCheck className="success-icon" />
                    <span>Photo uploaded!</span>
                  </div>
                ) : (
                  <>
                    <div className="dropzone-icon-wrap">
                      <FaCamera className="dropzone-icon" />
                    </div>
                    <p className="dropzone-title">Upload your photo</p>
                    <p className="dropzone-hint">
                      <FaImage /> Drag &amp; drop or <span className="dropzone-browse">browse</span>
                    </p>
                    <p className="dropzone-formats">PNG, JPG, WEBP · max 5MB</p>
                  </>
                )}
              </div>
            </div>
          </div>
          {/* ================================= */}

          <div className="form-row-2">
            <div className="input-group-custom">
              <label htmlFor="name">
                <FaUser /> Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Mohamed Mahmoud"
                required
              />
            </div>

            <div className="input-group-custom">
              <label htmlFor="email">
                <FaEnvelope /> Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="mohamed@example.com"
                required
              />
            </div>
          </div>

          <div className="form-row-2">
            <div className="input-group-custom">
              <label htmlFor="password">
                <FaLock /> Password *
              </label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
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

            <div className="input-group-custom">
              <label htmlFor="role">
                <FaBriefcase /> Role / Specialty
              </label>
              <input
                type="text"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="e.g. UI Designer, Developer"
              />
            </div>
          </div>

          <div className="form-row-2">
            <div className="input-group-custom">
              <label htmlFor="phone">
                <FaPhone /> Phone Number
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+20 128 053 8625"
              />
            </div>

            <div className="input-group-custom">
              <label htmlFor="location">
                <FaLocationDot /> Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Sohag, Egypt"
              />
            </div>
          </div>

          <div className="input-group-custom">
            <label htmlFor="bio">About / Bio</label>
            <textarea
              id="bio"
              name="bio"
              rows="2"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us a little bit about what you build..."
            ></textarea>
          </div>

          <button type="submit" className="btn-glow btn-full">
            <FaUserPlus /> Complete Registration <FaArrowRight />
          </button>
        </form>

        <div className="auth-card-footer">
          <p>
            Already have an account? <Link to="/login">Sign In Here</Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default SignIn;
