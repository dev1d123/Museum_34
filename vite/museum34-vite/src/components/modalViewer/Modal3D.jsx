import React, { useEffect } from "react";
import styled from "styled-components";
import ThreeViewer from "./ThreeViewer.jsx"; // Añade extensión para claridad en Vite

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  height: 500px;
  max-width: 800px;
`;

const CloseButton = styled.button`
  background: #f00;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #c00;
  }
`;

const Modal3D = ({ isOpen, filePath, onClose }) => {
  console.log("Path recibido:", filePath);

  useEffect(() => {
    return () => {
      if (filePath) URL.revokeObjectURL(filePath);
    };
  }, [filePath]);

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContainer>
        <CloseButton onClick={onClose} autoFocus>
          ×
        </CloseButton>
        <div>
          <h2>Vista Previa del Modelo</h2>
          <ThreeViewer path={filePath} />
        </div>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal3D;
