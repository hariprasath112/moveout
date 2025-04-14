import React from 'react';
import '../style.css';

function Box({ onClick, image, text }) {
  return (
    <div className="box" onClick={onClick} style={{ cursor: 'pointer' }}>
      <div className="image-container">
        <img src={image} alt={text} className="boxImage" />
      </div>
      <p className="boxText">{text}</p>
    </div>
  );
}

export default Box;

