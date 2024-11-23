import React, { useState } from "react";
import "./ModalInformation.css";

const Modal3D = () => {
  // Definimos el estado interno para activar/desactivar el modal
  const [isOpen, setIsOpen] = useState(false);

  // Valores por defecto para el título, descripción y modelo 3D
  const defaultTitle = "B33 - Pollinator Robot";
  const defaultDescription =
    "This is a test for the B33 Pollinator Robot model. It's designed for interaction and visualization purposes.";
  const defaultModelSrc =
    "https://sketchfab.com/models/9112fdb300ac471dac8c221e89103147/embed";

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {/* Botón para abrir el modal */}
      <button
        onClick={() => setIsOpen(true)}
        style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
      >
        Open 3D Modal
      </button>

      {/* Si el modal está abierto, se muestra */}
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              ×
            </button>
            <div className="modal-content">
              {/* Modelo 3D en el lado izquierdo */}
              <div className="model-viewer">
                <iframe
                  title={defaultTitle}
                  frameBorder="0"
                  allow="autoplay; fullscreen; xr-spatial-tracking"
                  mozallowfullscreen="true"
                  webkitallowfullscreen="true"
                  src={defaultModelSrc}
                  style={{ width: "100%", height: "100%" }}
                ></iframe>
              </div>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal3D;
