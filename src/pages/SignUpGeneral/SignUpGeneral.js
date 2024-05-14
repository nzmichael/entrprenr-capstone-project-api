import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './SignUpGeneral.scss';

const SignUpGeneral = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
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
      const response = await axios.post('http://localhost:8080/users/signup', {
        name,
        email,
        password,
      });
      console.log('User signed up:', response.data);
    } catch (error) {
      console.error('Error signing up user:', error);
      setError('Error signing up user. Please try again later.');
    }
  };

  return (
    <div className="sign-up-page">
      <h2>Sign Up</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

        <button type="submit">Sign Up</button>
      </form>
      <p className="login-link">
        Already have an account? <Link to="/signin">Log in</Link>
      </p>
      <p className="mentor-signup-link">
        Are you a Mentor? <Link to="/mentors/signup">Sign up here</Link>
      </p>
    </div>
  );
};

export default SignUpGeneral;
