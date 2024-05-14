import React, { useState }  from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Header from './components/Header/Header';
import SignInPage from './pages/SignInPage/SignInPage';
import HomePage from './pages/HomePage/HomePage';
import MentorProfilePage from './pages/MentorProfilePage/MentorProfilePage';
import SignUp from './pages/SignUpPage/SignUpPage';
import SignUpGen from './pages/SignUpGeneral/SignUpGeneral';
import About from './pages/About/About';
import Community from './pages/CommunityPage/CommunityPage';
import Ressource from './pages/Ressource/Ressource';
import MentorSearchForm from './components/MentorSearchForm/MentorSearchForm';
import SearchResultsPage from './pages/SearchResultsPage/SearchResultsPage';
import Article from './components/Article/Article';
import AccountPageUsers from './components/AccountPageUser/AccountPageUsers';
import AccountPageMentor from './pages/AccountPageMentor/AccountPageMentor';


function App() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (searchResults) => {
    try {
      // const response = await axios.get(`http://localhost:8080/mentors/search?name=${searchQuery}`);
      setSearchResults(searchResults);
      console.log('Search for:', searchResults);
      // console.log(response.data);
    } catch (error) {
      console.error('Cannot search for mentors:', error);
    }
  };

  return (
    <Router>
      <Header onSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/mentors/:id" element={<MentorProfilePage />} />
        <Route path="/mentors/signup" element={<SignUp />} />
        <Route path="/users/signup" element={<SignUpGen />} />
        <Route path="/about" element={<About />} />
        <Route path="/community" element={<Community  />} />
        <Route path="/mentors/search" element={<SearchResultsPage searchResults={searchResults} />} />
        <Route path="/article" element={<Article />} />
        <Route path="/users/:id" element={<AccountPageUsers />} />
        <Route path="/mentors/:id" element={<AccountPageMentor />} />
        {/* <Route path="/ressources" element={<Ressource />} /> */}
      </Routes>
    </Router>
  );
}

export default App;