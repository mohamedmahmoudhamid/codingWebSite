import React, { useContext, useState, useRef } from 'react';
import { AuthContext } from '../context/context';
import { ThemeContext } from '../context/themeContext';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLocationDot,
  FaBriefcase,
  FaCalendarDays,
  FaPenToSquare,
  FaBookmark,
  FaShieldHalved,
  FaRightFromBracket,
  FaCheck,
  FaCircleCheck,
  FaCode,
  FaXmark,
  FaLock,
  FaSun,
  FaMoon,
  FaCamera,
  FaImage
} from 'react-icons/fa6';
import { HiSparkles } from 'react-icons/hi2';
import { buildDigitalProducts } from '../data/digitalProducts';
import '../styles/UserProfile.css';

const UserProfile = () => {
  const { isLoggin, logout, user, setUser, toggleSaveProduct } = useContext(AuthContext);
  const { theme, setTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const modalFileInputRef = useRef(null);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || '',
    phone: user?.phone || '',
    location: user?.location || '',
    bio: user?.bio || '',
    avatar: user?.avatar || '',
    techStack: user?.techStack ? user.techStack.join(', ') : '',
  });

  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [saveSuccess, setSaveSuccess] = useState(false);

  /* ---- 3D Card tilt ---- */
  const handleCardMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -15;
    setTilt({ x, y });
  };

  const handleCardMouseLeave = () => setTilt({ x: 0, y: 0 });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ---- Avatar upload — بس جوه المودال دلوقتي ---- */
  const processAvatarFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setFormData((prev) => ({ ...prev, avatar: e.target.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleModalAvatarChange = (e) => {
    processAvatarFile(e.target.files[0]);
  };

  const handleModalAvatarDrop = (e) => {
    e.preventDefault();
    processAvatarFile(e.dataTransfer.files[0]);
  };

  /* ---- Edit form submit ---- */
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedUser = {
      ...user,
      name: formData.name,
      email: formData.email,
      role: formData.role,
      phone: formData.phone,
      location: formData.location,
      bio: formData.bio,
      avatar: formData.avatar || user.avatar,
      techStack: formData.techStack
        ? formData.techStack.split(',').map((s) => s.trim()).filter(Boolean)
        : user.techStack,
    };

    setUser(updatedUser);
    localStorage.setItem('nexuscraft_user', JSON.stringify(updatedUser));
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const allProducts = buildDigitalProducts();
  const savedProductItems = allProducts.filter((p) =>
    user?.savedProducts?.includes(p.id)
  );

  /* ---- Not Logged In ---- */
  if (!isLoggin) {
    return (
      <main className="profile-page">
        <section className="profile-locked-card">
          <div className="locked-icon-wrapper">
            <FaLock />
          </div>
          <h2>Authentication Required</h2>
          <p>Please log in or create an account to view your user dashboard.</p>
          <div className="locked-actions">
            <Link to="/login" className="btn-glow">
              <FaUser /> Log In Now
            </Link>
            <Link to="/signin" className="btn-secondary-glow">
              Create Account
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="profile-page">
      <div className="profile-container">
        {/* Banner Hero */}
        <div className="profile-banner">
          <div className="banner-glow banner-glow-1"></div>
          <div className="banner-glow banner-glow-2"></div>
          <div className="banner-badge">
            <HiSparkles /> Active Member Workspace
          </div>
        </div>

        {/* User Card 3D Grid */}
        <div className="profile-grid">
          {/* Main 3D Card */}
          <div
            className="profile-main-card"
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            style={{
              transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
            }}
          >
            <div className="card-glass-shine"></div>

            <div className="profile-header-content">
              {/* Avatar — عرض فقط، مفيش رفع صورة من هنا */}
              <div className="avatar-wrapper">
                <img
                  src={
                    user?.avatar ||
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
                  }
                  alt={user?.name}
                  className="profile-avatar"
                />
                <span className="online-badge" title="Online now"></span>
              </div>

              <div className="profile-identity">
                <div className="identity-top">
                  <h1>{user?.name || 'User Profile'}</h1>
                  <span className="role-tag">
                    <FaBriefcase /> {user?.role || 'Member'}
                  </span>
                </div>
                <p className="user-bio">{user?.bio || 'No bio provided yet.'}</p>
              </div>

              <button
                className="edit-profile-btn"
                onClick={() => {
                  setFormData({
                    name: user?.name || '',
                    email: user?.email || '',
                    role: user?.role || '',
                    phone: user?.phone || '',
                    location: user?.location || '',
                    bio: user?.bio || '',
                    avatar: user?.avatar || '',
                    techStack: user?.techStack ? user.techStack.join(', ') : '',
                  });
                  setIsEditing(true);
                }}
              >
                <FaPenToSquare /> Edit Profile
              </button>
            </div>

            {saveSuccess && (
              <div className="profile-alert-success">
                <FaCircleCheck /> Profile updated successfully!
              </div>
            )}

            <hr className="profile-divider" />

            {/* Info Grid */}
            <div className="info-details-grid">
              <div className="info-item">
                <div className="info-icon"><FaEnvelope /></div>
                <div>
                  <label>Email Address</label>
                  <strong>{user?.email || 'N/A'}</strong>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon"><FaPhone /></div>
                <div>
                  <label>Phone Number</label>
                  <strong>{user?.phone || 'Not specified'}</strong>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon"><FaLocationDot /></div>
                <div>
                  <label>Location</label>
                  <strong>{user?.location || 'Not specified'}</strong>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon"><FaCalendarDays /></div>
                <div>
                  <label>Member Since</label>
                  <strong>{user?.joinedDate || 'January 2025'}</strong>
                </div>
              </div>
            </div>

            {/* Tech Stack */}
            {user?.techStack && user.techStack.length > 0 && (
              <div className="tech-stack-section">
                <h3><FaCode /> Tech Stack &amp; Skills</h3>
                <div className="tech-chips">
                  {user.techStack.map((tech, idx) => (
                    <span key={idx} className="tech-chip">{tech}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Action Footer */}
            <div className="profile-footer-actions">
              <button
                className="theme-switch-btn"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                {theme === 'dark' ? <FaSun /> : <FaMoon />}
                Toggle {theme === 'dark' ? 'Light' : 'Dark'} Mode
              </button>

              <button
                className="logout-btn"
                onClick={() => { logout(); navigate('/login'); }}
              >
                <FaRightFromBracket /> Log Out
              </button>
            </div>
          </div>

          {/* Side Column */}
          <div className="profile-side-column ">
            {/* Stats Widget */}
            <div className="side-widget stats-widget">
              <h3><FaShieldHalved /> Account Overview</h3>
              <div className="widget-stats-list">
                <div className="widget-stat-card">
                  <span>Saved Products</span>
                  <strong>{user?.savedProducts?.length || 0}</strong>
                </div>
                <div className="widget-stat-card">
                  <span>Account Status</span>
                  <strong className="status-verified">Verified Pro</strong>
                </div>
                <div className="widget-stat-card">
                  <span>Access Level</span>
                  <strong>Full Catalog</strong>
                </div>
              </div>
            </div>

            {/* Saved Products Widget */}
            <div className="side-widget saved-products-widget">
              <div className="widget-header">
                <h3><FaBookmark /> Bookmarked Products</h3>
                <Link to="/products" className="view-all-link">Browse All</Link>
              </div>

              {savedProductItems.length > 0 ? (
                <div className="saved-products-list">
                  {savedProductItems.map((prod) => (
                    <div key={prod.id} className="saved-product-item">
                      <div className="saved-item-info">
                        <strong>{prod.title}</strong>
                        <small>{prod.type} • {prod.price}</small>
                      </div>
                      <div className="saved-item-actions">
                        <Link to={`/details/${prod.id}`} className="mini-btn">View</Link>
                        <button
                          className="remove-saved-btn"
                          title="Remove bookmark"
                          onClick={() => toggleSaveProduct(prod.id)}
                        >
                          <FaXmark />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-saved-box">
                  <p>You haven't saved any products yet.</p>
                  <Link to="/products" className="btn-glow btn-sm">
                    Explore Products Marketplace
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================
          Edit Profile Modal
      ========================================= */}
      {isEditing && (
        <div className="profile-modal-overlay" onClick={() => setIsEditing(false)}>
          <div
            className="profile-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2><FaPenToSquare /> Update Your Details</h2>
              <button className="close-modal-btn" onClick={() => setIsEditing(false)}>
                <FaXmark />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="modal-form">

              {/* ---- Avatar upload — بس هنا جوه المودال ---- */}
              <div
                className="modal-avatar-section"
                onDrop={handleModalAvatarDrop}
                onDragOver={(e) => e.preventDefault()}
              >
                <div
                  className="modal-avatar-preview"
                  onClick={() => modalFileInputRef.current?.click()}
                  title="Click to upload new photo"
                >
                  <input
                    ref={modalFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleModalAvatarChange}
                    style={{ display: 'none' }}
                  />
                  <img
                    src={formData.avatar || user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                    alt="Avatar preview"
                    className="modal-avatar-img"
                  />
                  <div className="modal-avatar-overlay">
                    <FaCamera />
                    <span>Upload Photo</span>
                  </div>
                </div>
                <div className="modal-avatar-info">
                  <p className="modal-avatar-hint">
                    <FaImage /> Click the photo to upload a new image, or drag &amp; drop it.
                  </p>
                  <p className="modal-avatar-formats">PNG, JPG, WEBP · max 5MB</p>
                </div>
              </div>

              <div className="form-group-row">
                <div className="form-group">
                  <label htmlFor="edit-name">Full Name</label>
                  <input type="text" id="edit-name" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="edit-email">Email Address</label>
                  <input type="email" id="edit-email" name="email" value={formData.email} onChange={handleInputChange} required />
                </div>
              </div>

              <div className="form-group-row">
                <div className="form-group">
                  <label htmlFor="edit-role">Job Title / Role</label>
                  <input type="text" id="edit-role" name="role" value={formData.role} onChange={handleInputChange} placeholder="e.g. Frontend Developer" />
                </div>
                <div className="form-group">
                  <label htmlFor="edit-phone">Phone Number</label>
                  <input type="text" id="edit-phone" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+1 (555) 000-0000" />
                </div>
              </div>

              <div className="form-group-row">
                <div className="form-group">
                  <label htmlFor="edit-location">Location</label>
                  <input type="text" id="edit-location" name="location" value={formData.location} onChange={handleInputChange} placeholder="City, Country" />
                </div>
                <div className="form-group">
                  <label htmlFor="edit-techStack">Tech Stack (comma-separated)</label>
                  <input type="text" id="edit-techStack" name="techStack" value={formData.techStack} onChange={handleInputChange} placeholder="React, Node.js, Python" />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="edit-bio">Bio / About You</label>
                <textarea id="edit-bio" name="bio" rows="3" value={formData.bio} onChange={handleInputChange} placeholder="Share a short bio about yourself..."></textarea>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary-glow" onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-glow">
                  <FaCheck /> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default UserProfile;