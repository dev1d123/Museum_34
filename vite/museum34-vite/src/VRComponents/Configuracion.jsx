import React, { useEffect, useState } from "react";
import api from "../api/axios";
import styled from "styled-components";

const ConfigContainer = styled.div`
  padding: 1px;
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
  bottom: 2px;
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
const EspecialGroup = styled.div`
  margin-left: 500px;
`;

const Label = styled.label`
  display: block;
  font-size: 18px;
  font-weight: 600;
  color: #ddd;
`;

const SliderValue = styled.div`
  font-size: 16px;
  color: #00cc66;
  text-align: center;
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
const Checklist = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
`;

const ChecklistItem = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  color: #ddd;

  input {
    accent-color: #00cc66;
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
`;

const Configuracion = ({
  brillo: initialBrillo,
  volumen: initialVolumen,
  velocidad: initialVelocidad,
  sensibilidad: initialSensibilidad,
  configID,
  userID,
  onConfigChange,
  onConfigIdChange, // NEW: inform parent about config id changes
}) => {
  const [brillo, setBrillo] = useState(initialBrillo);
  const [volumen, setVolumen] = useState(initialVolumen);
  const [velocidad, setVelocidad] = useState(initialVelocidad);
  const [sensibilidad, setSensibilidad] = useState(initialSensibilidad);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setBrillo(initialBrillo);
    setVolumen(initialVolumen);
    setVelocidad(initialVelocidad);
    setSensibilidad(initialSensibilidad);
  }, [initialBrillo, initialVolumen, initialVelocidad, initialSensibilidad]);

  const handleSave = async () => {
    try {
      if (userID) {
        let userResponse = await api.get(`/usuarios/${userID}`);
        const userData = userResponse.data;

        const updatedUserData = {
          ...userData,
          configuracion: configID,
        };

        if (configID) {
          await api.put(`/configuraciones/${configID}/`, {
            brillo,
            volumen,
            velocidad_movimiento: velocidad,
            sensibilidad,
            rutas: false,
          });
          onConfigIdChange && onConfigIdChange(configID);
        } else {
          const response = await api.post(`/configuraciones/`, {
            brillo,
            volumen,
            velocidad_movimiento: velocidad,
            sensibilidad,
            rutas: false,
          });
          const idConfig = response.data.id;
          updatedUserData.configuracion = idConfig;
          onConfigIdChange && onConfigIdChange(idConfig);
        }

        await api.put(`/usuarios/${userID}/`, updatedUserData);

        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        console.warn("No se puede guardar la configuración sin un usuario.");
      }
    } catch (error) {
      console.error("Error al guardar la configuración:", error);
    }
  };

  const handleBrilloChange = (e) => {
    const newValue = Number(e.target.value);
    setBrillo(newValue);
    onConfigChange({ brillo: newValue });
  };

  const handleVolumenChange = (e) => {
    const newValue = Number(e.target.value);
    setVolumen(newValue);
    onConfigChange({ volumen: newValue });
  };

  const handleVelocidadChange = (e) => {
    const newValue = Number(e.target.value);
    setVelocidad(newValue);
    onConfigChange({ velocidad: newValue });
  };

  const handleSensibilidadChange = (e) => {
    const newValue = Number(e.target.value);
    setSensibilidad(newValue);
    onConfigChange({ sensibilidad: newValue });
  };

  return (
    <ConfigContainer>
      <Title>Configuración</Title>

      <ControlGroup>
        <Label>Brillo</Label>
        <SliderValue>{brillo}</SliderValue>
        <Slider
          type="range"
          min="0"
          max="100"
          value={brillo}
          onChange={handleBrilloChange}
        />
      </ControlGroup>

      <ControlGroup>
        <Label>Volumen</Label>
        <SliderValue>{volumen}</SliderValue>
        <Slider
          type="range"
          min="0"
          max="100"
          value={volumen}
          onChange={handleVolumenChange}
        />
      </ControlGroup>

      <ControlGroup>
        <Label>Velocidad de movimiento</Label>
        <SliderValue>{velocidad}</SliderValue>
        <Slider
          type="range"
          min="1"
          max="100"
          value={velocidad}
          onChange={handleVelocidadChange}
        />
      </ControlGroup>

      <ControlGroup>
        <Label>Distancia FOV</Label>
        <SliderValue>{sensibilidad}</SliderValue>
        <Slider
          type="range"
          min="1"
          max="100"
          value={sensibilidad}
          onChange={handleSensibilidadChange}
        />
      </ControlGroup>

      {userID && (
        <SaveButtonContainer>
          <SaveButton onClick={handleSave}>Guardar</SaveButton>
          {saved && <SaveMessage>Configuraciones guardadas</SaveMessage>}
        </SaveButtonContainer>
      )}
    </ConfigContainer>
  );
};

export default Configuracion;
