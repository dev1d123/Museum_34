import React from "react";
import styled from "styled-components";

const PerfilContainer = styled.div`
  padding: 20px;
  color: #fff;
  background-color: #1e1f29;
  height: 100%;
`;

const Perfil = () => {
  return (
    <PerfilContainer>
      <h2>Perfil</h2>
      <p>Esta es la sección de perfil.</p>
    </PerfilContainer>
  );
};

export default Perfil;
