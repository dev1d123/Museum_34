import React, { useState } from "react";
import styled from "styled-components";
import Modal3D from "./Modal3D";

// Estilos usando styled-components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
`;

const Title = styled.h1`
  color: #333;
`;

const FileInputWrapper = styled.div`
  margin: 20px 0;
`;

const FileInputLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
`;

const FileInput = styled.input`
  margin: 10px 0;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #0056b3;
  }
`;

const FileInfo = styled.div`
  margin: 20px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #f9f9f9;
  width: 80%;
  text-align: center;
`;

const ViewerModel = () => {
  const [file, setFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileURL, setFileURL] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileExtension = selectedFile.name.split(".").pop().toLowerCase();
      if (fileExtension !== "glb") {
        alert("Por favor, sube un archivo con extensión .glb");
        setFile(null);
        setFileURL(null);
      } else {
        setFile(selectedFile);
        setFileURL(URL.createObjectURL(selectedFile));
        alert("Archivo .glb seleccionado correctamente.");
      }
    }
  };

  const handleVerify = () => {
    if (file && fileURL) {
      setIsModalOpen(true);
    } else {
      alert("Por favor, sube un modelo válido antes de continuar.");
    }
  };

  return (
    <Container>
      <Title>Gestor y Visualizador de Modelos 3D (.glb)</Title>
      <FileInputWrapper>
        <FileInputLabel htmlFor="file-upload">Selecciona un archivo:</FileInputLabel>
        <FileInput
          id="file-upload"
          type="file"
          accept=".glb"
          onChange={handleFileChange}
        />
      </FileInputWrapper>
      {file && (
        <FileInfo>
          <p>Archivo seleccionado: {file.name}</p>
          <Button onClick={handleVerify} style={{ backgroundColor: "#28a745" }}>
            Verificar Modelo
          </Button>
        </FileInfo>
      )}
      {isModalOpen && (
        <Modal3D
          isOpen={isModalOpen}
          filePath={fileURL}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </Container>
  );
};

export default ViewerModel;
