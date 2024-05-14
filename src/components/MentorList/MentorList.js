import React from 'react';

const MentorList = ({ mentors }) => {
  return (
    <div>
      <h2>Mentors</h2>
      <ul>
        {mentors.map((mentor) => (
          <li key={mentor.id}>{mentor.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default MentorList;
