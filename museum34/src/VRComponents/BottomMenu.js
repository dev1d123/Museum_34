import React from "react";
import styled from "styled-components";

// Contenedor del menú inferior
const BottomMenuContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #282c34;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.3);
  z-index: 1000;
`;

// Estilo de los botones
const MenuButton = styled.button`
  flex: 1;
  max-width: 120px;
  height: 40px;
  margin: 0 10px;
  border: none;
  border-radius: 8px;
  background-color: #61dafb;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #21a1f1;
  }

  &:active {
    background-color: #1e90db;
  }
`;

const BottomMenu = () => {
  return (
    <BottomMenuContainer>
      <MenuButton>Modo visor</MenuButton>
      <MenuButton>Configuraciones</MenuButton>
      <MenuButton>Perfil</MenuButton>
    </BottomMenuContainer>
  );
};

export default BottomMenu;
