import React from "react";
import styled from "styled-components";

const PerfilContainer = styled.div`
  position: relative;
  display: flex;
  padding: 20px;
  color: #fff;
  background-color: #1e1f29;
  height: 100%;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`;

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

const LeftSection = styled.div`
  flex: 1;
  padding: 20px;
  border-right: 1px solid #3a3b46;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RightSection = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Label = styled.h3`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  color: #ddd;
`;

const InfoItem = styled.div`
  margin-bottom: 15px;
  text-align: center;

  & > label {
    font-size: 14px;
    font-weight: bold;
    color: #bbb;
  }

  & > span {
    display: block;
    font-size: 16px;
    color: #fff;
    margin-top: 5px;
  }
`;

const LearnButton = styled.button`
  background-color: #00cc66;
  border: none;
  color: #fff;
  font-size: 16px;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #009e4c;
  }
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #00cc66;
`;

const Perfil = ({ onClose }) => {
  return (
    <PerfilContainer>
      {/* Botón de cerrar */}
      <CloseButton onClick={onClose}>✖</CloseButton>

      <Title>Perfil</Title>

      {/* Sección izquierda */}
      <LeftSection>
        <Label>Modelos favoritos</Label>
      </LeftSection>

      {/* Sección derecha */}
      <RightSection>
        <InfoItem>
          <label>Nickname:</label>
          <span>Usuario123</span>
        </InfoItem>
        <InfoItem>
          <label>Email:</label>
          <span>usuario123@example.com</span>
        </InfoItem>
        <InfoItem>
          <label>Tiempo en el museo:</label>
          <span>20 minutos</span>
        </InfoItem>

        {/* Botón Aprender */}
        <LearnButton>Aprender</LearnButton>
      </RightSection>
    </PerfilContainer>
  );
};

export default Perfil;