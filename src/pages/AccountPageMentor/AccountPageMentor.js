import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './AccountPageMentor.scss';

const AccountPageMentor = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [bio, setBio] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [coverPicture, setCoverPicture] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMentorData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/mentors/${id}`); 
                const { name, email, specialty, bio, profilePicture, coverPicture } = response.data;
                setName(name);
                setEmail(email);
                setSpecialty(specialty);
                setBio(bio);
                setProfilePicture(profilePicture);
                setCoverPicture(coverPicture);
            } catch (error) {
                console.error('Error fetching mentor information:', error);
                setError('Error fetching mentor information. Please try again later.');
            }
        };
    
        fetchMentorData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('specialty', specialty);
            formData.append('bio', bio);
            formData.append('profilePicture', profilePicture);
            formData.append('coverPicture', coverPicture);

            const response = await axios.put(`http://localhost:8080/mentors/${id}`, formData);
            console.log('Mentor profile updated:', response.data);
        } catch (error) {
            console.error('Error updating mentor profile:', error);
            setError('Error updating mentor profile. Please try again later.');
        }
    };

    return (
        <div className="account-page">
            <h2>Account Settings</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />

                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                <label htmlFor="specialty">Specialty</label>
                <input type="text" id="specialty" value={specialty} onChange={(e) => setSpecialty(e.target.value)} required />

                <label htmlFor="bio">Bio</label>
                <textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} required />

                <label htmlFor="profilePicture">Profile Picture</label>
                <input type="file" id="profilePicture" onChange={(e) => setProfilePicture(e.target.files[0])} />

                <label htmlFor="coverPicture">Cover Picture</label>
                <input type="file" id="coverPicture" onChange={(e) => setCoverPicture(e.target.files[0])} />

                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default AccountPageMentor;
