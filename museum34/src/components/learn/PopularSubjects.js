import React from 'react';
import styled from 'styled-components';

import t1 from './images/courses/t1.jpg';
import t2 from './images/courses/t2.jpg';
import t3 from './images/courses/t3.jpg';
import t4 from './images/courses/t4.jpg';
import t5 from './images/courses/t5.jpg';
import t6 from './images/courses/t6.jpg';
import t7 from './images/courses/t7.jpg';

const Wrapper = styled.div`
  padding: 20px;
  text-align: center;
  font-family: 'Arial', sans-serif;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;

  span {
    color: #ff6b6b;
  }
`;

const CBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
`;

const Det = styled.div`
  width: 300px;
  text-align: center;

  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 16px;
    border-radius: 10px;
    border: 1px solid #fa4b37;
    text-decoration: none;
    color: #272529;
    font-family: 'Cursive', sans-serif;
    font-size: 1rem;
    transition: all 0.3s ease-in-out;
    background: #fff;

    &:hover {
      background: linear-gradient(to right, #fa4b37, #df2771);
      color: white;

      img {
        filter: brightness(1.2);
      }
    }

    img {
      width: 100%;
      min-width: 260px;
      margin-bottom: 10px;
      transition: filter 0.3s ease-in-out;
    }
  }
`;

const PopularSubjects = () => {
  return (
    <Wrapper>
      <Title>
        <span>Temas Populares en el Museo Virtual</span>
      </Title>
      <CBox>
        <Det>
          <a href="https://es.wikipedia.org/wiki/Historia_universal" target="_blank">
            <img src={t1} alt="Historia Universal" />
            Historia Universal
          </a>
        </Det>
        <Det>
          <a href="https://www.elledecor.com/es/arte/a39595095/cuadros-famosos-historia-obras-arte/" target="_blank">
            <img src={t2} alt="Grandes Obras de Arte" />
            Grandes Obras de Arte
          </a>
        </Det>
        <Det>
          <a href="https://es.wikipedia.org/wiki/Arqueolog%C3%ADa" target="_blank">
            <img src={t3} alt="Arqueología y Tesoros" />
            Arqueología y Tesoros
          </a>
        </Det>
        <Det>
          <a href="https://www.tboxplanet.com/web/culturas/index.html" target="_blank">
            <img src={t4} alt="Culturas del Mundo" />
            Culturas del Mundo
          </a>
        </Det>
        <Det>
          <a href="https://es.wikipedia.org/wiki/Historia_del_Per%C3%BA" target="_blank">
            <img src={t5} alt="Historia del Perú" />
            Historia del Perú
          </a>
        </Det>
        <Det>
          <a href="https://es.wikipedia.org/wiki/Artes_visuales" target="_blank">
            <img src={t6} alt="Artes Visuales" />
            Artes Visuales
          </a>
        </Det>
        <Det>
          <a href="https://es.wikipedia.org/wiki/Historia_de_la_m%C3%BAsica" target="_blank">
            <img src={t7} alt="Historia de la Música" />
            Historia de la Música
          </a>
        </Det>
      </CBox>
    </Wrapper>
  );
};

export default PopularSubjects;
