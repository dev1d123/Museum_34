import styled from "styled-components";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
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

const Perfil = ({ onClose, museumTime }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userID, setUserID] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const hours = Math.floor(museumTime / 3600);
  const minutes = Math.floor((museumTime % 3600) / 60);
  const seconds = museumTime % 60;
  const navigate = useNavigate(); 

  useEffect(() => {
    const storedLogin = localStorage.getItem("loggedIn");
    console.log("El usuario es: ", storedLogin);
    setIsLogin(!!storedLogin);

    if(storedLogin){
      const fetchUserInfo = async() =>{
        try{
          const response = await api.get(`/usuarios/${storedLogin}`);
          setUserID(storedLogin);
          setUserInfo(response.data);
        }catch(error){
          console.error("Error al obtener la información del usuario:", error);
        }
        
      };
      fetchUserInfo();
    }else{
      console.log("Por favor, inicie sesión para ver su perfil.");
    }
    
  }, []);
  const handleLoginRedirect = () => {
    navigate("/iniciar-sesion");
    window.location.reload(); 
  };

  return (
    <PerfilContainer>
      {/* Botón de cerrar */}
      <CloseButton onClick={onClose}>✖</CloseButton>

      <Title>Perfil</Title>

      {/* Sección izquierda */}
      <LeftSection>
      {isLogin ? (
        <Label>Modelos favoritos</Label>
        ) : (
          <div style={{ textAlign: "center", color: "#ff6666" }}>
            <p>Debes iniciar sesión para ver esta área.</p>
            <button
              onClick={handleLoginRedirect}
              style={{
                backgroundColor: "#ff6666",
                color: "#fff",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
                marginTop: "10px",
              }}
            >
              Iniciar Sesión
            </button>
          </div>
        )}
      </LeftSection>

      {/* Sección derecha */}
      <RightSection>
        <InfoItem>
          <label>Usuario:</label>
          <span>{userInfo.nombre || "No disponible"}</span>
        </InfoItem>
        <InfoItem>
          <label>Email:</label>
          <span>{userInfo.email || "No disponible"}</span>
        </InfoItem>
        <InfoItem>
          <label>Tiempo en el museo:</label>
          <span>{hours} horas, {minutes} minutos, {seconds} segundos</span>
        </InfoItem>

        {/* Botón Aprender */}
        <LearnButton>Aprender</LearnButton>
      </RightSection>
    </PerfilContainer>
  );
};

export default Perfil;