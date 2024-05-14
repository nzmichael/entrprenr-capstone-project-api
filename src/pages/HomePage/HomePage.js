import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/Header/Header'; 
import { Link } from 'react-router-dom';
import heroImage from '../../assets/images/mentorhero.jpg';
import mentorMentee from '../../assets/images/mentorandmentee.jpg'; 
import './HomePage.scss';
import textImage from '../../assets/images/textimages.jpg';
import testimonialImage from '../../assets/images/boyd.jpg';

const HomePage = () => {
  const [featuredMentors, setFeaturedMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedMentors = async () => {
      try {
        const response = await axios.get('http://localhost:8080/mentors/featured'); 
        setFeaturedMentors(response.data);
        console.log('Featured mentors:', response.data);
      } catch (error) {
        console.error('Error getting featured mentors:', error);
        setError('Error getting featured mentors. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedMentors();
  }, []);

  return (
    <div className="home-page">
      {/* <Header /> */}
      <div className="hero">
        <img src={heroImage} alt="Hero" />
        <div className="hero-text">
          <h1 className="hero-heading">Starting a business?</h1>
          <Link className="hero-link" to="/mentors/search"><p className="hero-title">You're in the right place!</p></Link>
        </div>
      </div>
      <section className="home-section">
        <div className="home-section__image">
          <img className="home-section__img" src={textImage} alt="Placeholder Image" />
        </div>
        <div className="home-section__text">
          <h2 className="home-section__title">What can mentoring do for you</h2>
          <p className="home-section__description">Mentoring can provide invaluable support and guidance as you navigate your professional or personal journey. A mentor can offer insights, share experiences, and provide advice to help you grow and achieve your goals. Whether you're seeking career advancement, personal development, or simply looking for someone to offer perspective and encouragement, a mentor can be a trusted ally on your path to success.</p>
          <Link to="/article" ><button className="home-section__button">Learn More</button></Link>
        </div>
      </section>
      <section className="home-section">
        <div className="home-section__text">
          <h2 className="home-section__title">The Transformative Impact of Mentorship</h2>
          <p className="home-section__testimonial">"My mentors have been instrumental in shaping my journey, offering invaluable insights that have become the bedrock of my professional advancement. Their guidance has not only enriched my career but has also painted a broader canvas for my life, a gift I consider truly priceless. Additionally, they've influenced the way I present myself, leading to a transformation that extends beyond professional realms."</p>
          <p className="home-section__testimonial">- Boyd Garnett, CEO of Flexposture.com</p>
          <Link to="/mentors/search"><button className="home-section__button">Find Your Mentor Today</button></Link>
        </div>
        <div className="home-section__image">
          <img className="home-section__img" src={testimonialImage} alt="Placeholder Image" />
        </div>
      </section>
      <div className="mentor-section">
        <h2>Featured Mentors</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : featuredMentors.length === 0 ? (
          <p>No featured mentors found</p>
        ) : (
          <div className="mentor-list">
            {featuredMentors.map(mentor => (
              <div key={mentor.id} className="mentor-card">
                <Link to={`/mentors/${mentor.id}`} className="mentor-link">
                  <h3 className="mentor-name">{mentor.name}</h3>
                </Link>
                <p className="mentor-specialty">{mentor.specialty}</p>
              </div>
            ))}
          </div>
        )}
        <Link to="/signup" className="sign-up-button">Sign Up to Find a Mentor</Link>
        </div>
        <div className="about-section">
            <h3 className="about__title">Ad.</h3>
            <p className="about-description">Transform Your Startup Journey With Expert Mentorship </p>
            <img className="about-adphoto" src={mentorMentee} alt="mentor and mentee photo"/>
            {/* <h3 className="about-text">Our Mission</h3> */}
            <p className="about-description">Our experienced mentors are here to guide you through every step of your startup journey. Whether you need help with business planning, marketing strategies, or simply need advice from someone who's been there, our mentors are here to help.</p>
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

export default HomePage;
