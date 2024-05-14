import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './AccountPageUsers.scss';

const AccountPageUsers = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/users/${id}`);
                const { name, email, bio, profilePicture } = response.data;
                setName(name);
                setEmail(email);
                setBio(bio);
                setProfilePicture(profilePicture);
            } catch (error) {
                console.error('Error fetching user information:', error);
                setError('Error fetching user information. Please try again later.');
            }
        };

        fetchUserData();
    }, [id]);

    return (
        <div className="account-page">
            <h2>User Profile</h2>
            {error && <p className="error-message">{error}</p>}
            <p>Name: {name}</p>
            <p>Email: {email}</p>
            <p>Bio: {bio}</p>
            <img src={profilePicture} alt="Profile" />
        </div>
    );
};

export default AccountPageUsers;
