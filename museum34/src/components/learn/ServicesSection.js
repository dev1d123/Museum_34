import React from 'react';
import styled from 'styled-components';

// Estilos principales
const ServiceSwipe = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.7)
    ),
    url("images/extra/b3.jpg");
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

const CardLink = styled.a`
  padding: 0;
  margin: 40px 10px;
  text-decoration: none;
`;

const SCard = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  width: 350px;
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
  width: 100px;
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
      href: "subjects/computer_courses.html",
      imgSrc: "images/icon/computer-courses.png",
      text: "Free Online Computer Courses",
    },
    {
      href: "subjects/jee.html",
      imgSrc: "images/icon/brainbooster.png",
      text: "Building Concepts for Competitive Exams",
    },
    {
      href: "#",
      imgSrc: "images/icon/online-tutorials.png",
      text: "Online Video Lectures",
    },
    {
      href: "subjects/jee.html#sample_papers",
      imgSrc: "images/icon/papers.jpg",
      text: "Sample Papers of Various Competitive Exams",
    },
    {
      href: "#",
      imgSrc: "images/icon/p3.png",
      text: "Performance and Ranking Report",
    },
    {
      href: "#contactus_section",
      imgSrc: "images/icon/discussion.png",
      text: "Discussion with Our Tutors & Mentors",
    },
    {
      href: "subjects/quiz.html",
      imgSrc: "images/icon/q1.png",
      text: "Daily Brain Teasing Questions to Improve IQ",
    },
    {
      href: "#contactus_section",
      imgSrc: "images/icon/help.png",
      text: "24x7 Online Support",
    },
  ];

  return (
    <ServiceSwipe id="services_section">
      <SectionTitle>Services</SectionTitle>
      {services.map((service, index) => (
        <CardLink href={service.href} key={index}>
          <SCard>
            <CardImage src={service.imgSrc} alt={service.text} />
            <CardText>{service.text}</CardText>
          </SCard>
        </CardLink>
      ))}
    </ServiceSwipe>
  );
};

export default ServicesSection;
