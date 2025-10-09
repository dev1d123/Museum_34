import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

// Animación de entrada y salida
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Contenedor principal
const HelpContainer = styled.div`
  position: fixed;
  top: 64px; /* moved below the button so it never overlaps */
  right: 20px;
  max-width: 600px;
  background: linear-gradient(135deg, #78ade6, #a5d8ff);
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  color: black;
  font-family: "Arial", sans-serif;
  font-size: 14px;
  line-height: 1.6;
  animation: ${fadeIn} 0.5s ease-in-out;
  padding: 15px;
  z-index: 1000; /* stays below the button */
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 10px;
  color: black;
`;

const CloseButton = styled.button`
  background: #ff4d4f;
  border: none;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  padding: 5px 8px;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.3s ease;
  z-index: 999999999;

  &:hover {
    background: #d9363e;
  }
`;

const HelpButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #4a90e2;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background 0.3s ease;
  z-index: 2001; /* ensure the button is always on top and in the corner */

  &:hover {
    background-color: #357ab8;
  }
`;

const Content = styled.div`
  color: black;
  font-size: 13px;
  padding: 1rem;
`;

const HelpBox = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleHelp = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <HelpButton onClick={toggleHelp}>
        {isVisible ? "Cerrar Ayuda" : "Abrir Ayuda"}
      </HelpButton>

      {isVisible && (
        <HelpContainer >
          <Header>
            <span>¿Necesitas ayuda?</span>
            <CloseButton onClick={toggleHelp}>&times;</CloseButton>
          </Header>
          <Content>
            <h2>¡Bienvenido al Museo Virtual!</h2>
            <p>
                Explora una experiencia única y sumérgete en el arte como nunca antes. Aquí podrás caminar por el museo, 
                descubrir y visualizar obras de arte, y acercarte a ellas para obtener más detalles.
            </p>

            <h3>Funciones principales:</h3>
            <ul>
                <li><strong>Agregar obras a favoritas:</strong> Guarda tus obras preferidas para tenerlas siempre a mano.</li>
                <li><strong>Comentar sobre las obras:</strong> Comparte tus opiniones y deja tus comentarios sobre las piezas que te llamen la atención.</li>
                <li><strong>Configurar tu experiencia:</strong> Ajusta la configuración para personalizar tu recorrido y hacerlo aún más único.</li>
            </ul>

            <h3>Controles rápidos:</h3>
            <ul>
                <li><strong>Tecla "P":</strong> Accede a tu perfil personal.</li>
                <li><strong>Tecla "C":</strong> Abre la configuración para ajustar la experiencia.</li>
                <li><strong>Tecla "I":</strong> Obtén información sobre el museo y las obras.</li>
                <li><strong>Tecla "E":</strong> Abre un modal interactivo (solo si estás cerca de una obra).</li>
            </ul>

            <h3>Modales interactivos:</h3>
            <p>
                Cuando se abre un modal, puedes <strong>leer el contenido utilizando IA</strong> para una experiencia más 
                enriquecedora. Además, tienes la opción de <strong>controlarlo con la cámara y el movimiento de tu mano</strong> 
                para una experiencia aún más inmersiva.
            </p>

            <p>¡Disfruta de tu visita y explora todo lo que el museo tiene para ofrecer!</p>
            </Content>

        </HelpContainer>
      )}
    </>
  );
};

export default HelpBox;
