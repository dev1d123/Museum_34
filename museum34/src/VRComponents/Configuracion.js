import React, { useState } from "react";
import styled from "styled-components";

const ConfigContainer = styled.div`
  padding: 30px;
  color: #fff;
  background-color: #1e1f29;
  height: 100%;
  position: relative;
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

const SaveButtonContainer = styled.div`
  position: absolute;
  bottom: 15px;
  left: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SaveButton = styled.button`
  background: none;
  border: 2px solid #ff6666;
  color: #ff6666;
  font-size: 16px;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #ff6666;
    color: #fff;
  }
`;

const SaveMessage = styled.span`
  font-size: 14px;
  color: #00cc66;
`;

const ControlGroup = styled.div`
  margin: 20px 0;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: 600;
  color: #ddd;
`;

const Slider = styled.input`
  width: 100%;
  height: 8px;
  background: linear-gradient(
    to right,
    #00cc66 ${(props) => props.value}%,
    #3a3b46 ${(props) => props.value}%
  );
  border-radius: 5px;
  -webkit-appearance: none;
  outline: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background-color: #00cc66;
    cursor: pointer;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Button = styled.button`
  background-color: #3a3b46;
  color: #00cc66;
  border: none;
  padding: 12px 24px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #50515f;
  }
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #00cc66;
`;

const Configuracion = ({ onClose }) => {
  const [brillo, setBrillo] = useState(70);
  const [volumen, setVolumen] = useState(80);
  const [velocidad, setVelocidad] = useState(80);
  const [sensibilidad, setSensibilidad] = useState(60);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000); // El mensaje desaparece después de 3 segundos
  };

  return (
    <ConfigContainer>
      <CloseButton onClick={onClose}>✖</CloseButton>

      <Title>Configuración</Title>

      <ControlGroup>
        <Label>Brillo</Label>
        <Slider
          type="range"
          min="0"
          max="100"
          value={brillo}
          onChange={(e) => setBrillo(e.target.value)}
        />
      </ControlGroup>

      <ControlGroup>
        <Label>Volumen</Label>
        <Slider
          type="range"
          min="0"
          max="100"
          value={volumen}
          onChange={(e) => setVolumen(e.target.value)}
        />
      </ControlGroup>

      <ControlGroup>
        <Label>Velocidad de movimiento</Label>
        <Slider
          type="range"
          min="1"
          max="100"
          value={velocidad}
          onChange={(e) => setVelocidad(e.target.value)}
        />
      </ControlGroup>

      <ControlGroup>
        <Label>Sensibilidad del mouse</Label>
        <Slider
          type="range"
          min="1"
          max="100"
          value={sensibilidad}
          onChange={(e) => setSensibilidad(e.target.value)}
        />
      </ControlGroup>

      <ButtonGroup>
        <Label>Mostrar rutas</Label>
        <Button>Sí</Button>
        <Button>No</Button>
      </ButtonGroup>

      <SaveButtonContainer>
        <SaveButton onClick={handleSave}>Guardar</SaveButton>
        {saved && <SaveMessage>Configuraciones guardadas</SaveMessage>}
      </SaveButtonContainer>
    </ConfigContainer>
  );
};

export default Configuracion;