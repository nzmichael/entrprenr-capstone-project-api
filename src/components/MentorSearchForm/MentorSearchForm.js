import React, { useState } from 'react';
import './MentorSearchForm.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MentorSearchForm = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!searchQuery) {
      console.error('Search query cannot be empty');
      return;
    }

    try {
      let url = `http://localhost:8080/mentors/search`;
      const params = {};
      if (selectedFilter === 'name') {
        params.name = searchQuery;
      } else if (selectedFilter === 'specialty') {
        params.specialty = searchQuery;
      } else if (selectedFilter === 'industries') {
        params.industries = searchQuery;
      }
      const response = await axios.get(url, { params });
      console.log(response.data); 
      onSearch(response.data);
      setSearchQuery('');
      navigate('/mentors/search');
    } catch (error) {
      console.error('Error searching for mentors:', error);
    }
  };

  return (
    <form className="mentor-search-form" onSubmit={handleSearchSubmit}>
      <input
        type="text"
        placeholder="Search Mentors"
        value={searchQuery}
        onChange={handleInputChange}
        className="mentor-search-form__input"
      />
      <select
        value={selectedFilter}
        onChange={handleFilterChange}
        className="mentor-search-form__select"
      >
        <option value="">Filter By</option>
        <option value="name">Name</option>
        <option value="specialty">Specialty</option>
        <option value="industries">Industries</option>
      </select>
      <button type="submit" className="mentor-search-form__submit">Search</button>
    </form>
  );
};

export default MentorSearchForm;
