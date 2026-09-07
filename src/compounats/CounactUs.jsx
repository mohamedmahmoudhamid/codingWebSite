import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  FaLocationDot,
  FaPhone,
  FaEnvelope,
  FaPaperPlane,
  FaClock,
  FaCircleCheck,
  FaUser,
  FaCommentDots
} from 'react-icons/fa6';
import { HiSparkles } from 'react-icons/hi2';
import '../styles/ContactUs.css';

const CounactUs = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const product = params.get('product');
    const service = params.get('service');

    if (product) {
      setFormData((prev) => ({
        ...prev,
        subject: `Product Request: ${product}`,
        message: `Hello NexusCraft team,\n\nI would like to inquire about licensing and details for: ${product}.`,
      }));
    } else if (service) {
      setFormData((prev) => ({
        ...prev,
        subject: `Service Request: ${service}`,
        message: `Hello NexusCraft team,\n\nI am interested in scheduling a consultation for your service: ${service}.`,
      }));
    }
  }, [location.search]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <section className="contact-section">
      <div className="contact-header">
        <span className="contact-kicker">
          <HiSparkles /> Get in Touch
        </span>
        <h2>Let&apos;s Build Something Extraordinary Together</h2>
        <p>
          Have a project request, technical question, or partnership idea? Reach out to our team and we'll reply within 24 hours.
        </p>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <div className="contact-info-card">
            <div className="contact-icon">
              <FaLocationDot />
            </div>
            <div>
              <small>Office Address</small>
              <strong>Sohag, Akhmim 123 Tech Street, Egypt</strong>
            </div>
          </div>

          <div className="contact-info-card">
            <div className="contact-icon">
              <FaPhone />
            </div>
            <div>
              <small>Direct Call / WhatsApp</small>
              <strong>+20 128 053 8625</strong>
            </div>
          </div>

          <div className="contact-info-card">
            <div className="contact-icon">
              <FaEnvelope />
            </div>
            <div>
              <small>Email Inquiries</small>
              <strong>support@nexuscraft.dev</strong>
            </div>
          </div>

          <div className="contact-info-card">
            <div className="contact-icon">
              <FaClock />
            </div>
            <div>
              <small>Support Hours</small>
              <strong>Mon - Sat: 9:00 AM - 8:00 PM (EET)</strong>
            </div>
          </div>
        </div>

        <div className="contact-form-wrapper">
          {submitted ? (
            <div className="contact-success-banner animate-fade-in">
              <FaCircleCheck className="success-icon" />
              <h3>Message Sent Successfully!</h3>
              <p>
                Thank you for contacting NexusCraft. Our engineering team has received your message and will respond shortly.
              </p>
            </div>
          ) : (
            <form id="contactForm" onSubmit={handleSubmit} className="contact-form">
              <div className="form-row-group">
                <div className="form-group-contact">
                  <label htmlFor="name">
                    <FaUser /> Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Mohamed Mahmoud"
                    required
                  />
                </div>

                <div className="form-group-contact">
                  <label htmlFor="email">
                    <FaEnvelope /> Your Email *
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

              <div className="form-group-contact">
                <label htmlFor="subject">
                  <FaCommentDots /> Subject / Project Title *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Web Application Development"
                  required
                />
              </div>

              <div className="form-group-contact">
                <label htmlFor="message">Message Details *</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your project goals, timelines, or questions..."
                  required
                />
              </div>

              <button type="submit" className="btn-glow btn-full">
                <FaPaperPlane /> Send Message Now
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default CounactUs;
