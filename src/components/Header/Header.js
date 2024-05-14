import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Header.scss';
import AuthService from '../Authorization/AuthService';
import logo from '../../assets/logo/logo.png';
import searchIcon from '../../assets/images/search.svg';
import accountIcon from '../../assets/images/account.png';
import MentorSearchForm from '../MentorSearchForm/MentorSearchForm';

const Header = ({ onSearch }) => {
  const [activeFilter, setActiveFilter] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const toggleSearch = (filter) => {
    setActiveFilter(filter === activeFilter ? '' : filter);
  };

  const user = AuthService.isLoggedIn() ? AuthService.getUserInfo() : null;

  const handleLogout = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = AuthService.getToken();
      await axios.post('http://localhost:8080/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error('Error logging out:', error);
      setError('Error logging out. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img className="logo-image" src={logo} alt="Logo" />
        </Link>
      </div>
      <div className="search__bar">
        <img
          src={searchIcon}
          alt="search icon"
          className="search__icon"
          onClick={() => toggleSearch('name')}
        />
        {activeFilter === 'name' && <MentorSearchForm onSearch={onSearch} />}
        <img
          src={searchIcon}
          alt="search icon"
          className="search__icon"
          onClick={() => toggleSearch('specialty')}
        />
        {activeFilter === 'specialty' && <MentorSearchForm onSearch={onSearch} />}
        <img
          src={searchIcon}
          alt="search icon"
          className="search__icon"
          onClick={() => toggleSearch('industries')}
        />
        {activeFilter === 'industries' && <MentorSearchForm onSearch={onSearch} />}
      </div>
      <div className="header__buttons">
        <Link to="/users/signup">
          <img className="header__account" src={accountIcon} />
        </Link>
        {user && <span className="header__username">Welcome, {user.name}</span>}
        {user && (
          <button onClick={handleLogout} disabled={loading}>
            {loading ? 'Logging out...' : 'Logout'}
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
