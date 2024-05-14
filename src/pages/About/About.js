import React from 'react';
import './About.scss';
import { Link } from 'react-router-dom';

const About = () => {
  const values = [
    'Innovation: Embrace new ideas and approaches to drive innovation and creativity.',
    'Collaboration: Foster a collaborative environment where entrepreneurs and mentors work together towards common goals.',
    'Integrity: Uphold the highest standards of honesty, transparency, and ethical behavior.',
    'Empowerment: Empower entrepreneurs to take control of their own success and growth.',
    'Diversity: Embrace diversity in all its forms, including backgrounds, experiences, and perspectives.',
    'Excellence: Strive for excellence in everything we do, from the quality of mentorship to the user experience.',
    'Continuous Learning: Foster a culture of continuous learning and improvement for both mentors and mentees.',
    'Community: Build a supportive and inclusive community that nurtures growth and development.',
    'Impact: Focus on creating a positive impact on the startup ecosystem and society as a whole.',
    'Adaptability: Be adaptable and flexible in responding to the changing needs of entrepreneurs and the market.'
  ];

  return (
    <div className="about-page">
      <h2 className="about-title">About Us</h2>
      <div className="section">
        <h3 className="section-title">Vision</h3>
        <p className="section-content">To empower early-stage startups with the knowledge, skills, and support they need to succeed.</p>
      </div>
      <div className="section">
        <h3 className="section-title">Mission</h3>
        <p className="section-content">To provide a platform where entrepreneurs can connect with experienced mentors and access resources that will help them build successful businesses.</p>
      </div>
      <div className="section">
        <h3 className="section-title">Values</h3>
        <ul className="values-list">
          {values.map((value, index) => (
            <li key={index} className="value-item">{value}</li>
          ))}
        </ul>
      </div>
      <div className="about">
          <Link to="/" className="about-link">Home</Link>
            <Link to="/about" className="about-link">About</Link>
            <Link to="/community" className="about-community">Community</Link>
            <Link to="/article" className="about-article">Article</Link>
            <Link to="/ressources" className="about-link">Ressources</Link>
        </div>
    </div>
  );
};

export default About;
