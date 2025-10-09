import React from 'react';
import styled from 'styled-components';

// Estilos principales
const DiffSection = styled.div`
  padding: 100px 0;
  background: #f9f9f9;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 50px;
  margin-bottom: 60px;
`;

const TotalCard = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 50px;
  margin-bottom: 50px;
`;

const Card = styled.div`
  width: 300px;
  background: #fff;
  border-radius: 10px;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.4), 0 0 10px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.3s ease;

  &:nth-child(1) {
    border-top: 5px solid green;
    &:hover {
      box-shadow: inset 0px 0px 10px rgba(0, 255, 0, 0.5),
        1px 1px 30px rgba(0, 255, 0, 0.5);
    }
  }

  &:nth-child(2) {
    border-top: 5px solid blue;
    &:hover {
      box-shadow: inset 0px 0px 10px rgba(0, 0, 255, 0.5),
        1px 1px 30px rgba(0, 0, 255, 0.5);
    }
  }
  &:nth-child(3) {
    border-top: 5px solid red;
    &:hover {
      box-shadow: inset 0px 0px 10px rgba(255, 0, 0, 0.5),
        1px 1px 30px rgba(255, 0, 0, 0.5);
    }
  }
  &:nth-child(4) {
    border-top: 5px solid yellow;
    &:hover {
      box-shadow: inset 0px 0px 10px rgba(255, 255, 0, 0.5),
        1px 1px 30px rgba(255, 255, 0, 0.5);
    }
  }
`;

const CardImage = styled.img`
  width: 100px;
  height: 100px;
  margin: 20px auto;
  border-radius: 50%;
  transition: transform 0.8s, border-radius 0.8s, box-shadow 0.8s;
  cursor: pointer;

  &:hover {
    transform: scale(3.5);
    border-radius: 0;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  }
`;

const CardTitle = styled.h3`
  text-align: center;
  font-size: 17px;
  color: #343a40;
  padding: 20px;
  font-weight: 700;
`;

const CardDetail = styled.div`
  text-align: center;
  font-size: 15px;
  line-height: 25px;
  font-variant: small-caps;
  margin: 0 25px;

  p {
    margin: 25px 0;
  }

  a {
    text-decoration: none;
  }
`;

const Button = styled.button`
  outline: none;
  border-radius: 10px;
  border: 1px solid black;
  padding: 9px 25px;
  cursor: pointer;
  transition: background 0.4s;

  margin-bottom: 30px;
  &:hover {
    background: ${(props) => props.hoverColor || 'rgba(0, 0, 0, 0.2)'};
    color: #fff;
  }
`;

// Componente principal
const TeamSection = () => {
  return (
    <DiffSection id="team_section">
      <SectionTitle>Sobre nosotros</SectionTitle>
      <TotalCard>

        <Card>
          <CardImage src="images/creator/roshan1.jpeg" alt="Alfredo Huamaní" />
          <CardTitle>Alfredo Huamaní</CardTitle>
          <CardDetail>
            <p>
              “ You can teach a student a lesson for a day; but if you can teach
              him to learn by creating curiosity, he will continue the learning
              process as long as he lives “
            </p>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button hoverColor="rgba(0,255,0,0.7)">Follow +</Button>
            </a>
          </CardDetail>
        </Card>
        <Card>
          <CardImage src="images/creator/roshan2.jpeg" alt="Marco Quispe" />
          <CardTitle>Marco Quispe</CardTitle>
          <CardDetail>
            <p>
              “ Real education should consist of drawing the goodness and the
              best out of our own students. What better books can there be than
              the book of humanity “
            </p>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button hoverColor="rgba(0,0,255,0.5)">Follow +</Button>
            </a>
          </CardDetail>
        </Card>
        <Card>
          <CardImage src="images/creator/roshan1.jpeg" alt="William Choquehuanca" />
          <CardTitle>William Choquehuanca</CardTitle>
          <CardDetail>
            <p>
              “ You can teach a student a lesson for a day; but if you can teach
              him to learn by creating curiosity, he will continue the learning
              process as long as he lives “
            </p>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button hoverColor="rgba(0,255,0,0.7)">Follow +</Button>
            </a>
          </CardDetail>
        </Card>
        <Card>
          <CardImage src="images/creator/roshan1.jpeg" alt="Wilson Carlos" />
          <CardTitle>Wilson Carlos</CardTitle>
          <CardDetail>
            <p>
              “ You can teach a student a lesson for a day; but if you can teach
              him to learn by creating curiosity, he will continue the learning
              process as long as he lives “
            </p>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button hoverColor="rgba(0,255,0,0.7)">Follow +</Button>
            </a>
          </CardDetail>
        </Card>
        <Card>
          <CardImage src="images/creator/roshan1.jpeg" alt="Julio Chura" />
          <CardTitle>Julio Chura</CardTitle>
          <CardDetail>
            <p>
              “ Ya p Julio! “
            </p>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button hoverColor="rgba(0,255,0,0.7)">Follow +</Button>
            </a>
          </CardDetail>
        </Card>
      </TotalCard>
    </DiffSection>
  );
};

export default TeamSection;
