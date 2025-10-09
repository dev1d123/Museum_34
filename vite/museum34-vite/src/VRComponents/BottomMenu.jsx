import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import home from "../images/icons/home.png";
import perfil from "../images/icons/perfil.png";
import config from "../images/icons/config.png";
import info from "../images/icons/info.png";
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

// Contenedor del menú inferior
const BottomMenuContainer = styled.div`
  position: fixed;
  bottom: ${(props) => (props.isVisible ? "0" : "-100px")};
  left: 50%;
  transform: translateX(-50%);
  width: 30%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #1e1f29, #3a3b46);
  border-radius: 15px 15px 0 0;
  box-shadow: 0 -4px 15px rgba(0, 0, 0, 0.4);
  z-index: 1000;
  transition: bottom 0.3s ease;
`;

// Estilo de los botones
const MenuButton = styled.button`
  flex: 1;
  max-width: 80px;
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 12px;
  background-color: transparent;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background-color: rgba(255, 255, 255, 0.1);
  }

  &:active {
    transform: translateY(-2px);
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

// Estilo de las imágenes
const Icon = styled.img`
  width: 30px;
  height: 30px;
  margin-bottom: 5px;
  transition: transform 0.3s ease;

  ${MenuButton}:hover & {
    transform: scale(1.2);
  }
`;

// Animación inicial
const FadeIn = styled.div`
  animation: fadeIn 1s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const BottomMenu = ({ setActiveSection  }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Manejadores de eventos para mostrar/ocultar el menú
  const handleMouseEnter = () => setIsVisible(true);
  const handleMouseLeave = () => setIsVisible(false);
  const navigate = useNavigate(); 
  const handleNavigation = (path) => {
    navigate(path);
    window.location.reload(); 
  };


  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'p' || event.key === 'P') {
        setActiveSection('perfil');
      } else if (event.key === 'c' || event.key === 'C') {
        setActiveSection('config');
      } else if (event.key === 'i' || event.key === 'I') {
        setActiveSection('info');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [setActiveSection]); // Dependencia para asegurar que setActiveSection siempre esté actualizado

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ position: "fixed", width: "100%", height:"100px", bottom: 10, zIndex: 1000 }}
    >
      <FadeIn>
        <BottomMenuContainer isVisible={isVisible}>
          <MenuButton onClick={() => handleNavigation("/")}>
            <Icon src={home} alt="Home" />
            Inicio
          </MenuButton>
          
          <MenuButton onClick={() => setActiveSection("perfil")}>
          <Icon src={perfil} alt="Perfil" />
          Perfil
        </MenuButton>
        <MenuButton onClick={() => setActiveSection("config")}>
          <Icon src={config} alt="Configuración" />
          Configuración
        </MenuButton>
        <MenuButton onClick={() => setActiveSection("info")}>
          <Icon src={info} alt="Información" />
          Info
        </MenuButton>
        </BottomMenuContainer>
      </FadeIn>
    </div>
  );
};

export default BottomMenu;
