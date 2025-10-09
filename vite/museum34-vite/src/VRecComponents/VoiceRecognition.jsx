import React, { useState, useRef } from "react";

const VoiceRecognition = () => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState("");
    const recognitionRef = useRef(null);

    // Inicializar SpeechRecognition
    if (!recognitionRef.current && 'webkitSpeechRecognition' in window) {
        recognitionRef.current = new window.webkitSpeechRecognition();
        const recognition = recognitionRef.current;

        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "es-US";

        recognition.onresult = (event) => {
            let finalTranscript = "";
            for (let i = 0; i < event.results.length; i++) {
                finalTranscript += event.results[i][0].transcript;
            }
            setTranscript(finalTranscript);
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
        };

        recognition.onend = () => {
            setIsListening(false);
        };
    }

    const startListening = () => {
        if (recognitionRef.current && !isListening) {
            alert("Empiece a hablar")
            recognitionRef.current.start();
            setIsListening(true);
        }
    };

    const stopListening = () => {
        if (recognitionRef.current && isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Reconocimiento de Voz</h1>
            <button
                onClick={isListening ? stopListening : startListening}
                style={{
                    padding: "10px 20px",
                    backgroundColor: isListening ? "#d62d20" : "#008744",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "16px",
                    margin: "10px",
                }}
            >
                {isListening ? "Detener" : "Escuchar"}
            </button>
            <div
                style={{
                    marginTop: "20px",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    width: "400px",
                    margin: "0 auto",
                    backgroundColor: "#f9f9f9",
                    color: "#333",
                }}
            >
                <h3>Texto reconocido:</h3>
                <p>{transcript || "Habla algo para que se muestre aquí..."}</p>
            </div>
        </div>
    );
};

export default VoiceRecognition;
