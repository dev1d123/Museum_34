// src/components/SubmitModel.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

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

const FileInput = styled.input`
  margin: 20px 0;
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

const SubmitModel = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
      if (fileExtension !== 'glb') {
        alert('Por favor, sube un archivo con extensión .glb');
        setFile(null);
      } else {
        setFile(selectedFile);
        alert('Archivo .glb seleccionado correctamente.');
      }
    }
  };

  const handleSubmit = () => {
    if (!file) {
      alert('Por favor, selecciona un archivo .glb antes de continuar.');
      return;
    }
    // Aquí podrías manejar la lógica de subida del archivo
    alert('Modelo subido correctamente.');
  };

  const handleView = () => {
    if (!file) {
      alert('Por favor, sube un archivo .glb antes de ver.');
      return;
    }
    // Navegar al componente ViewerModel
    navigate('/viewer', { state: { file } });
  };

  return (
    <Container>
      <Title>¡Bienvenido! Por favor, sube tu modelo 3D (.glb)</Title>
      <FileInput type="file" accept=".glb" onChange={handleFileChange} />
      <Button onClick={handleSubmit}>Subir</Button>
      <Button onClick={handleView} style={{ marginTop: '10px', backgroundColor: '#28a745' }}>
        Ver
      </Button>
    </Container>
  );
};

export default SubmitModel;
