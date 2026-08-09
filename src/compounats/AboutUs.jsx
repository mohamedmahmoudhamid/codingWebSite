import React, { useCallback, useState } from 'react';
import CountUp from './CountUp';
import '../styles/AboutUs.css';

const values = [
    {
        title: 'Creative Strategy',
        text: 'We turn early ideas into clear product plans with focused goals and practical milestones.',
        icon: '01',
    },
    {
        title: 'Clean Execution',
        text: 'Every interface, feature, and handoff is built with care so the final experience feels smooth.',
        icon: '02',
    },
    {
        title: 'Long-term Support',
        text: 'We stay close after launch with updates, improvements, and reliable technical guidance.',
        icon: '03',
    },
];

const AboutUs = () => {
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    const handleMouseMove = useCallback((event) => {
        const { innerWidth, innerHeight } = window;
        const x = ((event.clientX / innerWidth) - 0.5) * 2;
        const y = ((event.clientY / innerHeight) - 0.5) * 2;

        setTilt({
            x: Number((y * -14).toFixed(2)),
            y: Number((x * 18).toFixed(2)),
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
                    <span className="about-kicker">About our team</span>
                    <h1>We build digital work that feels useful, clear, and ready to grow.</h1>
                    <p>
                        Welcome to our company. We are a team of designers, developers, and problem-solvers dedicated to creating polished web experiences and dependable technical solutions.
                    </p>
                    <div className="about-stats">
                        <div>
                            <strong><CountUp end={7} suffix="+" duration={1600} /></strong>
                            <span>Core services</span>
                        </div>
                        <div>
                            <strong><CountUp end={24} suffix="/7" duration={1400} /></strong>
                            <span>Support mindset</span>
                        </div>
                        <div>
                            <strong><CountUp end={100} suffix="%" duration={2000} /></strong>
                            <span>Client focus</span>
                        </div>
                    </div>
                </div>
                <div className="about-visual">
                    <img
                        src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=80"
                        alt="Team planning a digital project"
                    />
                    <div className="about-floating-card">
                        <span>Working together</span>
                        <strong>Ideas into products</strong>
                    </div>
                </div>
            </div>

            <div className="about-values">
                {values.map((value, index) => (
                    <article className="about-value-card" style={{ animationDelay: `${index * 120}ms` }} key={value.title}>
                        <span>{value.icon}</span>
                        <h3>{value.title}</h3>
                        <p>{value.text}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default AboutUs;
