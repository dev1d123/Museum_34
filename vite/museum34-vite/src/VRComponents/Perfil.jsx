import styled from "styled-components";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import modelsFavorite from '../textures/favorite/modelsFavorite';

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
const FavoriteSection = styled.div`
  height: 370px;
  overflow: auto;
  padding: 15px;
  background-color: #1c1d27;
  border-radius: 10px;
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.1);
  scrollbar-width: thin; /* Para navegadores modernos */
  scrollbar-color: #5a5b66 transparent;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #5a5b66;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #787a86;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

const FavoriteList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: none;
  border: none;
  color: #ff6666;
  font-size: 16px;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #ff3333;
  }
`;

const FavoriteItem = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(145deg, #292a34, #1e1f29);
  border: 1px solid #2f303a;
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;

  &:hover {
    background: linear-gradient(145deg, #32333d, #252631);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
  }
`;

const ModelImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  margin-bottom: 10px;
  border: 3px solid #00cc66;
  box-shadow: 0 4px 10px rgba(0, 204, 102, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: rotate(5deg) scale(1.05);
    box-shadow: 0 6px 15px rgba(0, 204, 102, 0.5);
  }
`;

const ModelName = styled.span`
  font-size: 16px;
  color: #ddd;
  font-weight: 600;
  margin-top: 8px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
  transition: color 0.3s ease;

  &:hover {
    color: #00cc66;
  }
`;


const Perfil = ({ onClose, museumTime }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userID, setUserID] = useState(null);
  const [userInfo, setUserInfo] = useState({});

  const hours = Math.floor(museumTime / 3600);
  const minutes = Math.floor((museumTime % 3600) / 60);
  const seconds = museumTime % 60;

  const [favoriteModels, setFavoriteModels] = useState([]);

  const navigate = useNavigate(); 

  useEffect(() => {
    const storedLogin = localStorage.getItem("loggedIn");
    console.log("El usuario es: ", storedLogin);
    setIsLogin(!!storedLogin);

    if (storedLogin) {
      const fetchUserInfo = async () => {
        try {
          const response = await api.get(`/usuarios/${storedLogin}`);
          setUserID(storedLogin);
          setUserInfo(response.data);
        } catch (error) {
          console.error("Error al obtener la información del usuario:", error);
        }
      };
      fetchUserInfo();
    } else {
      console.log("Por favor, inicie sesión para ver su perfil.");
    }
  }, []);

  useEffect(() => {
    if (!userID) return;

    const fetchFavoriteModels = async (uid) => {
      try {
        const response = await api.get("/favoritos/");
        const userFavorites = response.data.filter((fav) => fav.usuario === parseInt(uid));
        const favoriteModelIds = userFavorites.map((fav) => ({
          modelId: fav.modelo,
          favoriteId: fav.id,
        }));
        const modelResponse = await api.get("/modelos/");
        const favoriteModelDetails = modelResponse.data
          .filter((model) => favoriteModelIds.some((fav) => fav.modelId === model.id))
          .map((model) => ({
            ...model,
            favoriteId: favoriteModelIds.find((fav) => fav.modelId === model.id).favoriteId,
          }));

        setFavoriteModels(favoriteModelDetails);
      } catch (error) {
        console.error("Error al obtener los modelos favoritos del usuario:", error);
      }
    };

    fetchFavoriteModels(userID);
  }, [userID]);

  const handleLoginRedirect = () => {
    navigate("/iniciar-sesion");
    window.location.reload(); 
  };

  const handleDeleteFavourite = async(favoriteId) =>{
    try{
      await api.delete(`/favoritos/${favoriteId}/`);
      setFavoriteModels((prevModels) =>
        prevModels.filter((model) => model.favoriteId !== favoriteId )
      );
      
    }catch(error){
      console.log("Error al eliminar: ", error);
    }
  }
  return (
    <PerfilContainer>
      {/* Botón de cerrar */}

      <Title>Perfil</Title>

      {/* Sección izquierda */}
      <LeftSection>
      {isLogin ? (
        <FavoriteSection>
          <Label>Modelos favoritos</Label>
          {/* Atencion, esto es un poco dificil...segun el modelsFavorite hay imagenes para cada id de los modelos...
          muestra esas imagenes aqui, en el li!, has los estilos tmb*/}
          <FavoriteList>
            {favoriteModels.map((model) => (
              <FavoriteItem key={model.id}>
            <DeleteButton
              title="Eliminar de favoritos"
              onClick={() => handleDeleteFavourite(model.favoriteId)} 
            >
              ✖
            </DeleteButton>
            <ModelImage src={modelsFavorite[`img${model.id}`]} alt={model.nombre} />
            <ModelName>{model.nombre}</ModelName>
          </FavoriteItem>
                
            ))}
             
          </FavoriteList>
          
        </FavoriteSection>
        
        




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