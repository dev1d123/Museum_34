import React from 'react';
import styled from 'styled-components';
import Background from '../Background';
import Logo from '../Logo';
import NavMenu from '../NavMenu';
import FooterPage from '../FooterPage';
import MainVoice from '../MainVoice';
import qrImagen from '../../images/image/imagen.jpg';
// Styled components
const MainContent = styled.div`
  text-align: center;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  margin: 20px auto;
  max-width: 800px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 20px;
  font-family: 'Arial', sans-serif;
`;

const QRSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const QRImage = styled.img`
  width: 350px;
  height: auto;
  margin-bottom: 10px;
  border: 5px solid #ddd;
  border-radius: 15px;
`;

const DonateText = styled.p`
  font-size: 1.2rem;
  color: #555;
  margin-top: 10px;
`;

function Donaciones() {
  return (
    <div>
      <div
        className="buttonVoice"
        style={{ position: 'sticky', top: '10px', margin: '10px' }}
      >
        <MainVoice />
      </div>
      <Background />
      <div className="lgB">
        <Logo />
        <NavMenu />
      </div>
      <MainContent>
        <Title>Donaciones</Title>
        <p>Tu apoyo es muy importante para nosotros. ¡Gracias por colaborar!</p>
        <QRSection>
          <QRImage
            src={qrImagen}
            alt="Código QR para donaciones"
          />
          <DonateText>Escanea el código QR para realizar una donación.</DonateText>
        </QRSection>
      </MainContent>
      <FooterPage />
    </div>
  );
}

export default Donaciones;