import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import donations from '../images/icons/donations.png'
import education from '../images/icons/education.png'
import investigation from '../images/icons/investigation.png'
import museum from '../images/icons/museum.png'

import './NavMenu.css';

const NavMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();
  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    // Obtener datos del usuario desde localStorage
    const name = localStorage.getItem('userName');
    setUserName(name);

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const handleLogout = () => {
    // Limpiar datos del usuario de localStorage
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    setUserName(null);

    // Redirigir a la página principal u otra página
    navigate('/');
  };



  return (
    <nav className="nav-menu">
      <div className="nav-header">
        <button className="menu-toggle" onClick={toggleMenu}>
          &#9776; {/* Icono de hamburguesa */}
        </button>
      </div>

      <ul className={`nav-links ${isOpen ? 'show' : ''}`}>
        <li>
            <Link to="/colecciones">
                <img className = "iconImg" src={museum}></img> <br></br>
                Colecciones
            </Link>
        </li>
        <li>
            <Link to="/investigacion">
                <img className = "iconImg" src={investigation}></img> <br></br>
                Investigación
            </Link>
        </li>


        <li>
            <Link to="/donaciones">
                <img className = "iconImg" src={donations}></img> <br></br>
                Donaciones
            </Link>

        </li>

        {userName ? (
          <>
            <li>
              <span className="user-name">¡Hola, {userName}!</span>
            </li>
            <li>
              <button className="logout-button" onClick={handleLogout} >
                Cerrar sesión
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/iniciar-sesion" className="login-link">
                Iniciar sesión
              </Link>
            </li>
            <li>
              <Link to="/registrarse" className="register-link">
                Registrarse
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavMenu;
