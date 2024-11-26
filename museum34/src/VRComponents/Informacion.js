import React from "react";
import styled from "styled-components";

const InfoContainer = styled.div`
  padding: 20px;
  color: #fff;
  background-color: #1e1f29;
  height: 100%;
`;

const Informacion = () => {
  return (
    <InfoContainer>
      <h2>Información</h2>
      <p>Esta es la sección de información.</p>
    </InfoContainer>
  );
};

export default Informacion;
