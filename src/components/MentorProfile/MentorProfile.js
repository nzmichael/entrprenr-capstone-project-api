import React from 'react';
import './MentorProfile.scss';
import coverImage from '../../assets/images/coverprofilementor.jpg';
import profileImage from '../../assets/images/profileavatar.jpeg';

const MentorProfile = ({ mentor, showEmail, handleContactClick }) => {
    return (
        <div className="mentor-profile">
            <img className="mentor-cover" src={coverImage} alt="Cover" />
            <div className="avatar">
                <img className="mentor-avatar" src={profileImage} alt="Profile" />
            </div>
            <h2 className="mentor-name">{mentor.name}</h2>
            <p className="mentor-bio">{mentor.bio}</p>
            <button className="contact-button" onClick={handleContactClick}>Contact Me</button>
            {showEmail && <p className="mentor-email">Email: {mentor.email}</p>}
        </div>
    );
};

export default MentorProfile;
