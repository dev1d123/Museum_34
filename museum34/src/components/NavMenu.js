import React, { useState, useEffect } from 'react';
import donations from '../images/icons/donations.png'
import education from '../images/icons/education.png'
import investigation from '../images/icons/investigation.png'
import museum from '../images/icons/museum.png'

import './NavMenu.css';

const NavMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="nav-menu">
      <div className="nav-header">
        <button className="menu-toggle" onClick={toggleMenu}>
          &#9776; {/* Icono de hamburguesa */}
        </button>
      </div>
      <ul className={`nav-links ${isOpen ? 'show' : ''}`}>
        <li>
            <a href="#colecciones">
                <img className = "iconImg" src={museum}></img> <br></br>
                Colecciones Destacadas
            </a>
        </li>
        <li>
            <a href="#educacion">
                <img className = "iconImg"  src={education}></img>  <br></br>
                Educación
            </a>
            
        </li>
        <li>
            <a href="#investigacion">
                <img className = "iconImg"  src={investigation}></img>  <br></br>
                Investigación
            </a>
        </li>


        <li>
            <a href="#donaciones">
                <img className = "iconImg"  src={donations}></img>  <br></br>
                Donaciones
            </a>
        </li>
        {/*
        <li>
          <button onClick={toggleDarkMode}>
            {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
          </button>
        </li>
        */}
        <li><a href="#iniciar-sesion" className="login-link">Iniciar sesión</a></li>
        <li><a href="#registrarse" className="register-link">Registrarse</a></li>
      </ul>
    </nav>
  );
};

export default NavMenu;
