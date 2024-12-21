import React from "react";
import styled, { keyframes, css } from "styled-components";
import loading from "../images/image/loading.jpg";

const Background = styled.div`
  background-image: url(${loading});
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const background = "#222";
const leftFace = "#4CAF50"; 
const rightFace = "#81C784";
const topFace = "#388E3C";  
const scale = 1.1;
const duration = "2s";
const timingFunction = "ease-in";

const move = keyframes`
  0% {
    left: 0;
    opacity: 0;
  }
  35% {
    left: 41%;
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    opacity: 1;
  }
  65% {
    left: 59%;
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    opacity: 1;
  }
  100% {
    left: 100%;
    -moz-transform: rotate(-180deg);
    -webkit-transform: rotate(-180deg);
    -o-transform: rotate(-180deg);
    transform: rotate(-180deg);
    opacity: 0;
  }
`;

const LoadingText = styled.div`
  position: absolute;
  width: 600px;
  height: 36px;
  left: 50%;
  top: 40%;
  margin-left: -300px;
  overflow: visible;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: default;

  div {
    position: absolute;
    width: 50px;
    height: 70px;
    opacity: 0;
    font-family: Helvetica, Arial, sans-serif;
    animation: ${move} 2s linear infinite;
    -o-animation: ${move} 2s linear infinite;
    -moz-animation: ${move} 2s linear infinite;
    -webkit-animation: ${move} 2s linear infinite;
    transform: rotate(180deg);
    -o-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
    color: black;
    font-size: 2.5rem;
    font-weight: 900;
  }

  div:nth-child(2) {
    animation-delay: 0.2s;
    -o-animation-delay: 0.2s;
    -moz-animation-delay: 0.2s;
    -webkit-animation-delay: 0.2s;
  }

  div:nth-child(3) {
    animation-delay: 0.4s;
    -o-animation-delay: 0.4s;
    -moz-animation-delay: 0.4s;
    -webkit-animation-delay: 0.4s;
  }

  div:nth-child(4) {
    animation-delay: 0.6s;
    -o-animation-delay: 0.6s;
    -moz-animation-delay: 0.6s;
    -webkit-animation-delay: 0.6s;
  }

  div:nth-child(5) {
    animation-delay: 0.8s;
    -o-animation-delay: 0.8s;
    -moz-animation-delay: 0.8s;
    -webkit-animation-delay: 0.8s;
  }

  div:nth-child(6) {
    animation-delay: 1s;
    -o-animation-delay: 1s;
    -moz-animation-delay: 1s;
    -webkit-animation-delay: 1s;
  }

  div:nth-child(7) {
    animation-delay: 1.2s;
    -o-animation-delay: 1.2s;
    -moz-animation-delay: 1.2s;
    -webkit-animation-delay: 1.2s;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CubeContainer = styled.div`
  position: relative;
  bottom: 15rem;
  height: 100px;
  width: 86px;
  transform: scale(${scale * 0.5});
`;

const Cube = styled.div`
  position: absolute;
  width: 86px;
  height: 100px;
`;

const Face = styled.div`
  height: 50px;
  width: 50px;
  position: absolute;
  transform-origin: 0 0;

  ${(props) =>
    props.type === "right" &&
    css`
      background: ${rightFace};
      transform: rotate(-30deg) skewX(-30deg) translate(49px, 65px) scaleY(0.86);
    `}

  ${(props) =>
    props.type === "left" &&
    css`
      background: ${leftFace};
      transform: rotate(90deg) skewX(-30deg) scaleY(0.86) translate(25px, -50px);
    `}

  ${(props) =>
    props.type === "top" &&
    css`
      background: ${topFace};
      transform: rotate(210deg) skew(-30deg) translate(-75px, -22px) scaleY(0.86);
      z-index: 2;
    `}
`;

const createKeyframes = (h, w, l) => keyframes`
  0% {
    transform: translate(${w * -50 - 50 + l * 50 + 50}px, ${h * 50 - 200 + w * 25 - 25 + l * 25 + 25}px);
  }
  14% {
    transform: translate(${w * -50 - 50 + l * 100 - 50}px, ${h * 50 - 200 + w * 25 - 25 + l * 50 - 25}px);
  }
  28% {
    transform: translate(${w * -100 + 50 + l * 100 - 50}px, ${h * 50 - 200 + w * 50 - 75 + l * 50 - 25}px);
  }
  43% {
    transform: translate(${w * -100 - 100 + l * 100 + 100}px, ${h * 100 - 400 + w * 50 - 50 + l * 50 + 50}px);
  }
  57% {
    transform: translate(${w * -100 - 100 + l * 50 + 200}px, ${h * 100 - 400 + w * 50 - 50 + l * 25 + 100}px);
  }
  71% {
    transform: translate(${w * -50 - 200 + l * 50 + 200}px, ${h * 100 - 375 + w * 25 - 25 + l * 25 + 100}px);
  }
  85% {
    transform: translate(${w * -50 - 50 + l * 50 + 50}px, ${h * 50 - 200 + w * 25 - 25 + l * 25 + 25}px);
  }
  100% {
    transform: translate(${w * -50 - 50 + l * 50 + 50}px, ${h * 50 - 200 + w * 25 - 25 + l * 25 + 25}px);
  }
`;

const AnimatedCube = styled(Cube)`
  z-index: ${(props) => -props.h};
  animation: ${(props) => createKeyframes(props.h, props.w, props.l)} ${duration}
    ${timingFunction} infinite;
`;

const Cubes = () => {
  const renderCubes = (h, w, l) => (
    <AnimatedCube key={`${h}-${w}-${l}`} h={h} w={w} l={l}>
      <Face type="top" />
      <Face type="left" />
      <Face type="right" />
    </AnimatedCube>
  );

  const cubes = [];
  for (let h = 1; h <= 3; h++) {
    for (let w = 1; w <= 3; w++) {
      for (let l = 1; l <= 3; l++) {
        cubes.push(renderCubes(h, w, l));
      }
    }
  }

  return cubes;
};

const TransitionAnimation = () => {
  return (
    <Background>
      <LoadingText>
        <div>G</div>
        <div>N</div>
        <div>I</div>
        <div>D</div>
        <div>A</div>
        <div>O</div>
        <div>L</div>
      </LoadingText>

      <Container>
        <CubeContainer>
            <Cubes />
        </CubeContainer>
       </Container>
    
    </Background>
  );
};

export default TransitionAnimation;
