import React from 'react';
import styled from 'styled-components';

import ImgAqp from '../../images/image/AqpImage.jpg';
import ImgSistemas from '../../images/image/UNSAImage.jpg';
import DisImage from '../..//images/image/DisImage.jpg';
import ImnImage from '../../images/image/ImnImage.jpg';
import UniImage from '../../images/image/UniImage.jpg'
import MunImage from '../../images/image/MunImage.jpg';
import BG from './images/extra/bg.jpg'


// Estilos principales
const ServiceSwipe = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.7)
    ),
  url(${BG});
  background-size: cover;
  background-attachment: fixed;
  padding: 100px 0;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 50px;
  color: #fff;
  margin-bottom: 40px;
`;
const Container = styled.div`

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 40px;
  `;
const CardLink = styled.a`
  padding: 0;
  margin: 40px 10px;
  text-decoration: none;
`;

const SCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  width: 500px;
  height: 200px;
  background: rgba(0, 0, 0, 0.6);
  box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.05),
    0 0 50px rgba(0, 0, 0, 0.8);
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  transition: transform 0.5s, box-shadow 0.5s;

  &:hover {
    box-shadow: 0 0 50px rgba(255, 255, 255, 0.8);
    transform: translateY(-10px);
  }
`;

const CardImage = styled.img`
  width: 400px;
  max-height: 150px;
`;

const CardText = styled.p`
  color: #f2f2f2;
  font-size: 1.2em;
  font-family: 'Open Sans', sans-serif;
`;

// Componente principal
const ServicesSection = () => {
  const services = [
    {
      href: '#',
      imgSrc: ImgAqp,
      text: "Museo virtual de Arequipa",
    },
    {
      href: '#',
      imgSrc: ImgSistemas,
      text: "Infraestructura de la EPIS",
    },
    {
      href: '#',
      imgSrc: DisImage,
      text: "Diseños innovadores",
    },
    {
      href: '#',
      imgSrc: ImnImage,
      text: "Experiencias inmersivas",
    },
    {
      href: '#',
      imgSrc: UniImage,
      text: "Museo de arte universal",
    },
    {
      href: '#',
      imgSrc: MunImage,
      text: "Plaza de armas",
    },

  ];

  return (
    <ServiceSwipe id="services_section">
      <SectionTitle>Servicios</SectionTitle>
      <Container>
        {services.map((service, index) => (
          <CardLink href={service.href} key={index}>
            <SCard>
              <CardImage src={service.imgSrc} alt={service.text} />
              <CardText>{service.text}</CardText>
            </SCard>
          </CardLink>
        ))}
      </Container>
    </ServiceSwipe>
  );
};

export default ServicesSection;
