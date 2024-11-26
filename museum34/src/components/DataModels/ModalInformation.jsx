import React, { useEffect, useState, useRef} from "react";
import "./ModalInformation.css";
import data from "./data.json";
import ThreeViewer from "./ThreeViewer";
import HandsRec from "../../VRecComponents/HandsRec";

const ModalInformation = ({ isOpen = true, id = 0, onClose = () => {} }) => {
  const [isHandsOpen, setIsHandsOpen] = useState(false);
  const handsRecRef = useRef(null); // Referencia para HandsRec

  const toggleHands = () => {
    if (isHandsOpen && handsRecRef.current) {
      // Llamar a disableWebCam si se está desactivando la cámara
      handsRecRef.current.disableWebCam();
      
    }
    setIsHandsOpen((prev) => !prev);
    console.log(isHandsOpen ? "Desactivando cámara..." : "Activando cámara...");
  };


  const [modelData, setModelData] = useState({
    title: "Default Model",
    description: "Default description for the model.",
    path: "https://example.com/default_model",
  });
  const handleFingerData = (data) => {
    if (data && data.fingers) {
      console.log("Mano: ", data.handSide);
      console.log("Esta agarrando?: ", data.isGrabbing);

      data.fingers.forEach((finger, index) => {
        //console.log(`Dedo ${index}: X=${finger.x}, Y=${finger.y}, Z=${finger.z}`);
      
        //primer paso, determinar si es mano derecha o izquierda.

      
      
      
      
      });
    }
  };

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
          <div className="model-description">
            <div>
              <h2>{modelData.title}</h2>
              <p>{modelData.description}</p>
            </div>

            <div className="camera-space">

              {isHandsOpen && <HandsRec onData={handleFingerData} />}
              
            </div>

            <button onClick={toggleHands}>
              {isHandsOpen ? "Desactivar cámara" : "Activar cámara"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalInformation;
