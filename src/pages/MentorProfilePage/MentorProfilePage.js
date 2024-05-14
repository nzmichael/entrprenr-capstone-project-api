import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MentorProfile from '../../components/MentorProfile/MentorProfile';

const MentorProfilePage = () => {
    const { id } = useParams();
    const [mentor, setMentor] = useState({});
    const [coverImage, setCoverImage] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [showEmail, setShowEmail] = useState(false);
    const [bio, setBio] = useState('');

    useEffect(() => {
        const fetchMentor = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/mentors/${id}`);
                console.log(response.data); 
                const { name, bio, email, coverImage, profileImage } = response.data;
                setMentor({ name, bio, email });
                setBio(bio);
                setCoverImage(coverImage);
                setProfileImage(profileImage);
            } catch (error) {
                console.error('Invalid mentor:', error);
            }
        };

        fetchMentor();
    }, [id]);

    const handleContactClick = () => {
        setShowEmail(true);
    };

    console.log(mentor); 

    if (!mentor) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <MentorProfile
                mentor={mentor}
                coverImage={coverImage}
                profileImage={profileImage}
                bio={bio}
                showEmail={showEmail}
                handleContactClick={handleContactClick}
            />
        </div>
    );
};

export default MentorProfilePage;
