import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './SignUpPage.scss';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [bio, setBio] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/mentors/signup', {
        name,
        email,
        specialty,
        bio,
        password,
      });
      console.log('Mentor signed up:', response.data);
    } catch (error) {
      console.error('Error signing up mentor:', error);
      setError('Error signing up mentor. Please try again later.');
    }
  };

  return (
    <div className="sign-up-page">
      <h2>Sign Up as a Mentor</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label htmlFor="specialty">Specialty</label>
        <input type="text" id="specialty" value={specialty} onChange={(e) => setSpecialty(e.target.value)} required />

        <label htmlFor="bio" placeholder="write something about you do">Bio</label>
        <textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} required />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

        <button type="submit">Sign Up</button>
      </form>
      <p className="login-link">
        Already have an account? <Link to="/signin">Log in</Link>
      </p>

      <p className="user-signup-link">
          Not a Mentor? <Link to="/users/signup">Sign up as an Entrepreneur?</Link>
        </p>
    </div>
  );
};

export default SignUpPage;
