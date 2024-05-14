import React from 'react';
import './Section.scss'; 

const Section = ({ title, content }) => {
  return (
    <div className="section">
      <h2 className="section-title">{title}</h2>
      <p className="section-content">{content}</p>
    </div>
  );
};

export default Section;
