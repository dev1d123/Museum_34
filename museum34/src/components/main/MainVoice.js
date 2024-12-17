import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import VoiceRec from "../../VRecComponents/VoiceRec";
import { useNavigate } from "react-router-dom";

import mic from '../../images/icons/mic.png';
import nomic from '../../images/icons/nomic.png';

const MainVoice = () => {
    const [transcript, setTranscript] = useState("");
    const [isListening, setIsListening] = useState(false);
    const voiceRecRef = useRef(null);
    const [previousWordsLength, setPreviousWordsLength] = useState(0);
    const navigate = useNavigate();

    const handleTranscriptUpdate = (newTranscript) => {
        setTranscript(newTranscript);
        const words = newTranscript.trim().split(" ");
        console.log(words);
        if (words.length > previousWordsLength) {
            recWord(words);
            setPreviousWordsLength(words.length);
        }
    };

    const recWord = (words) => {
        const lastWord = words[words.length - 1].toLowerCase();

        if (lastWord === "abajo") {
            window.scrollTo({
                top: window.scrollY + 130,
                behavior: 'smooth'
            });
        } else if (lastWord === "arriba") {
            window.scrollTo({
                top: window.scrollY - 130,
                behavior: 'smooth'
            });
        } else if (lastWord === "colecciones") {
            navigate("/colecciones");
        } else if (lastWord === "educación") {
            navigate("/educacion");
        } else if (lastWord === "investigación") {
            navigate("/investigacion");
        } else if (lastWord === "donaciones") {
            navigate("/donaciones");
        }
    };

    const toggleListening = async () => {
        setIsListening((prev) => !prev);

        try {
            if (voiceRecRef.current) {
                if (!isListening) {
                    // Empieza a escuchar
                    await voiceRecRef.current.startListening();
                } else {
                    // Detiene la escucha
                    await voiceRecRef.current.stopListening();
                }
            }
        } catch (error) {
            console.error("Error al cambiar el estado de escucha:", error);
        }
    };

    return (
        <div>
            <VoiceRec ref={voiceRecRef} onTranscriptUpdate={handleTranscriptUpdate} />

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
