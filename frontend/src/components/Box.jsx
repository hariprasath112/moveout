import React from 'react';
import '../style.css';

function Box({ image, text }) {
  return (
    <div className="box">
      <div className="image-container">
        <img src={image} alt={text} className="boxImage" />
      </div>
      <p className="boxText">{text}</p>
    </div>
  );
}

export default Box;
