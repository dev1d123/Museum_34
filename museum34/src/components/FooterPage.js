// src/components/FooterPage.js
import React from 'react';
import './FooterPage.css'; // Crea un archivo CSS separado para estilos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const FooterPage = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        
        <div className="social-section">
          <h2 className="logoA">Museum34</h2>
          <div className="social-icons">
            <a href="#" aria-label="Facebook">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="#" aria-label="Twitter">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="#" aria-label="Instagram">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="#" aria-label="LinkedIn">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
          </div>
        </div>

        <div className="about-section">
          <p>
            Hi, I'm <strong>Alfredo</strong>, a <em>passionate</em> developer focused on creating amazing web experiences.
            Let's build something great together!
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 Museum34. All rights reserved. | Built with ❤️ and React</p>
      </div>
    </footer>
  );
};

export default FooterPage;
