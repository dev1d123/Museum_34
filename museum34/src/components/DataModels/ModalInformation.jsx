import React, { useEffect, useState } from "react";
import "./ModalInformation.css";
import data from "./data.json";
import { EditCalendar } from "@mui/icons-material";
import ThreeViewer from "./ThreeViewer";


const Modal3D = ({ isOpen = true, id = 0, onClose = () => {} }) => {
  const [isHandsOpen, setIsHandsOpen] = useState(false); // Estado del modal

  const toggleHands = () => {
    setIsHandsOpen(!isHandsOpen);
    console.log("activar camara!");
  };


  const [modelData, setModelData] = useState({
    title: "Default Model",
    description: "Default description for the model.",
    path: "https://example.com/default_model",
  });

  useEffect(() => {
    // Busca el modelo basado en el ID recibido o usa valores por defecto
    const foundModel = data.find((item) => item.id === id);
    setModelData(foundModel || modelData);
  }, [id]);

  if (!isOpen) return null; 

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <div className="modal-content">
          {/* Modelo 3D en el lado izquierdo */}
          <div className="model-viewer">
            <ThreeViewer path={modelData.path} />
            
          </div>
          {/* Descripción en el lado derecho */}
          <div className="model-description">
            <div>
              <h2>{modelData.title}</h2>
              <p>{modelData.description}</p>
            </div>
            <div className="camera-space">
              Espacio para la cámara
            </div>
            <button onClick={toggleHands}
            >Activar camara!</button>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default Modal3D;
