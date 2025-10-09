import React, { useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import VoiceRec from "../VRecComponents/VoiceRec.jsx";
import { useNavigate } from "react-router-dom";

import mic from '../images/icons/mic.png';
import nomic from '../images/icons/nomic.png';

const MainVoice = () => {
    const [transcript, setTranscript] = useState("");
    const [isListening, setIsListening] = useState(false);
    const voiceRecRef = useRef(null);
    const [previousWordsLength, setPreviousWordsLength] = useState(0);
    const navigate = useNavigate();

    const handleTranscriptUpdate = (newTranscript) => {
        setTranscript(newTranscript);
        const words = newTranscript.trim().split(/\s+/).filter(Boolean);
        if (words.length > previousWordsLength) {
            recWord(words);
            setPreviousWordsLength(words.length);
        }
    };

    const normalize = (s) =>
        s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    const recWord = (words) => {
        const raw = words[words.length - 1] || "";
        const lastWord = normalize(raw);

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
        } else if (lastWord === "educacion") {
            navigate("/educacion");
        } else if (lastWord === "investigacion") {
            navigate("/investigacion");
        } else if (lastWord === "donaciones") {
            navigate("/donaciones");
        } else if (lastWord === "casa") {
            navigate("/");
        }
    };

    const toggleListening = () => {
        setIsListening((prev) => {
            const next = !prev;
            if (voiceRecRef.current) {
                if (next) {
                    voiceRecRef.current.startListening();
                } else {
                    voiceRecRef.current.stopListening();
                }
            }
            if (!next) {
                setPreviousWordsLength(0);
                setTranscript("");
            }
            return next;
        });
    };

    return (
        <div>
            <VoiceRec ref={voiceRecRef} onTranscriptUpdate={handleTranscriptUpdate} />
            {isListening && (
                <SpeechBubble aria-live="polite" aria-atomic="true">
                    {transcript || "Escuchando..."}
                </SpeechBubble>
            )}
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

const SpeechBubble = styled.div`
  position: fixed;
  bottom: 28px;
  right: 80px; /* espacio a la izquierda del botón */
  max-width: 60vw;
  background: #1f2937;
  color: #fff;
  padding: 8px 12px;
  border-radius: 12px;
  font-size: 14px;
  line-height: 1.2;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
