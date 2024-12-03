import React from "react";
import styled from "styled-components";

const ConfigContainer = styled.div`
  padding: 20px;
  color: #fff;
  background-color: #1e1f29;
  height: 100%;
`;

const Configuracion = () => {
  return (
    <ConfigContainer>
      <h2>Configuración</h2>
      <p>Esta es la sección de configuración.</p>
    </ConfigContainer>
  );
};

export default Configuracion;
