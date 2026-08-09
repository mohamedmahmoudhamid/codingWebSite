import React from 'react';
import '../styles/ContactUs.css';

const CounactUs = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        alert('Your message is ready to send. Thank you for contacting us!');
        event.currentTarget.reset();
    };

    return (
        <section className="contact-section">
            <div className="contact-header">
                <span className="contact-kicker">Contact us</span>
                <h2>Let&apos;s talk about your next idea</h2>
                <p>Send us a message and we will reply by email as soon as possible.</p>
            </div>

            <div className="contact-container">
                <div className="contact-info">
                    <div className="contact-info-card">
                        <span className="contact-icon"><i className="fa-solid fa-location-dot"></i>AD</span>
                        <div>
                            <small>Address</small>
                            <strong>Sohag, Akhmim 123 Street</strong>
                        </div>
                    </div>
                    <div className="contact-info-card">
                        <span className="contact-icon"><i className="fa-solid fa-phone"></i>PH</span>
                        <div>
                            <small>Call us</small>
                            <strong>+12 80 53 86 25</strong>
                        </div>
                    </div>
                    <div className="contact-info-card">
                        <span className="contact-icon"><i className="fa-solid fa-envelope"></i>EM</span>
                        <div>
                            <small>Email</small>
                            <strong>mohamed@example.com</strong>
                        </div>
                    </div>
                </div>

                <div className="contact-form">
                    <form id="contactForm" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <label htmlFor="name">Your Name</label>
                            <input type="text" list="test" id="name" placeholder="Mohamed Ali" required />
                            <datalist id="test">
                                <option value="Mohamed" />
                                <option value="Mahmoud" />
                                <option value="Hamid" />
                                <option value="Tawfig" />
                            </datalist>
                        </div>
                        <div className="form-row">
                            <label htmlFor="email">Your Email</label>
                            <input type="email" id="email" placeholder="name@example.com" required />
                        </div>
                        <div className="form-row">
                            <label htmlFor="subject">Subject</label>
                            <input type="text" id="subject" placeholder="Project request" required />
                        </div>
                        <div className="form-row">
                            <label htmlFor="message">Message</label>
                            <textarea id="message" rows={5} placeholder="Tell us what you need..." required />
                        </div>
                        <button type="submit">
                            <i className="fa-solid fa-paper-plane"></i>
                            <span>Send Message</span>
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default CounactUs;
