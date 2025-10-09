// src/components/Logo.js
import React from 'react';
import './Logo.css';
import img1 from '../images/logo.png'
function Logo() {
  const text = "Museum 34";

  return (
    <div className="logo-container">
      <img src= {img1}></img>
      <h1 className="logo">
        {text.split("").map((char, index) => (
          <span key={index} className="logo-letter">{char}</span>
        ))}
      </h1>
    </div>
  );
}

export default Logo;
