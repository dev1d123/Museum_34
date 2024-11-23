import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import VoiceRecognition from "../../VRecComponents/VoiceRecognition";

import mic from '../../images/icons/mic.png';
import nomic from '../../images/icons/nomic.png';

const MainVoice = () => {
  const [isListening, setIsListening] = useState(false);

  // Cambiar el estado del botón
  const toggleListening = () => {
    setIsListening(!isListening);
  };

  return (
    <div>


        <Button
        className={isListening ? "listening" : "stopped"}
        onClick={toggleListening}
        >
        <img src={isListening ? nomic : mic} alt="Mic Icon" />
        </Button>
    </div>
  );
};

export default MainVoice;
// Animaciones
const listenAnimation = keyframes`
  0% {
    box-shadow: 0 0 10px rgba(76, 175, 80, 0.5);
  }
  50% {
    box-shadow: 0 0 20px rgba(76, 175, 80, 0.7);
  }
  100% {
    box-shadow: 0 0 10px rgba(76, 175, 80, 0.5);
  }
`;

const stopListenAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(15deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;
const Button = styled.button`
  position: sticky;
  bottom: 20px;
  right: 20px;
  z-index: 1000;

  background-color: ${(props) => (props.className === "listening" ? "#f44336" : "#4CAF50")};
  border: none;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, background-color 0.3s ease;

  /* Animaciones dinámicas */
  animation: ${(props) =>
    props.className === "listening" ? listenAnimation : stopListenAnimation}
    ${(props) => (props.className === "listening" ? "1s" : "0.5s")} infinite ease-in-out;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(1);
  }

  img {
    width: 30px;
    height: 30px;
  }
`;