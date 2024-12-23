import React from "react";
import styled from "styled-components";
import infoImg from "../images/image/AqpImage.jpg";

// Contenedor principal
const InfoContainer = styled.div`
  position: relative;
  padding: 30px;
  color: #fff;
  background-color: #1e1f29;
  height: 100%;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  max-width: 600px;  /* Max width para la caja */
  margin: auto; /* Centrar en la pantalla */
`;

// Botón para cerrar
const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  color: #ff6666;
  font-size: 24px;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #ff3333;
  }
`;

// Título de la sección
const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #00cc66;
`;

// Descripción del contenido
const Description = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #ddd;
  text-align: justify;
`;

// Imagen dentro del contenedor
const Image = styled.img`
  margin-top: 20px;
  width: 50%;  /* Se adapta al tamaño del contenedor */
  max-width: 500px;  /* Máximo tamaño de la imagen */
  max-height: 300px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`;

const Informacion = ({ onClose }) => {
  return (
    <InfoContainer>


      {/* Título */}
      <Title>Información</Title>

      {/* Descripción amigable */}
      <Description>
        Bienvenido al Museum34, un lugar donde la historia, la cultura
        y la riqueza natural de esta increíble región cobran vida. Explora la
        majestuosidad del volcán Misti, descubre la arquitectura única de
        sillar y sumérgete en la fascinante historia de esta ciudad reconocida
        como Patrimonio Cultural de la Humanidad. Nuestro museo ofrece una
        experiencia interactiva que conecta el pasado con el presente,
        proporcionando una ventana al alma de Arequipa. ¡Te invitamos a
        explorar y aprender!
      </Description>

      {/* Imagen temática */}
      <Image src={infoImg} alt="Imagen representativa del museo" />
    </InfoContainer>
  );
};

export default Informacion;
