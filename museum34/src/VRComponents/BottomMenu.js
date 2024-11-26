import React from "react";
import styled from "styled-components";
import home from "../images/icons/home.png";
import perfil from "../images/icons/perfil.png";
import config from "../images/icons/config.png";
import info from "../images/icons/info.png";

// Contenedor del menú inferior
const BottomMenuContainer = styled.div`
  position: fixed;
  bottom: 0;
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

const BottomMenu = () => {
  return (
    <FadeIn>
      <BottomMenuContainer>
        <MenuButton>
          <Icon src={home} alt="Home" />
          Inicio
        </MenuButton>
        <MenuButton>
          <Icon src={config} alt="Config" />
          Configuración
        </MenuButton>
        <MenuButton>
          <Icon src={perfil} alt="Perfil" />
          Perfil
        </MenuButton>
        <MenuButton>
          <Icon src={info} alt="Info" />
          Info
        </MenuButton>
      </BottomMenuContainer>
    </FadeIn>
  );
};

export default BottomMenu;
