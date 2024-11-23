import React, { useEffect, useImperativeHandle, useRef, useState } from "react";

const VoiceRec = React.forwardRef((props, ref) => {
    const { onTranscriptUpdate } = props; 
    const recognitionRef = useRef(null);
    const [transcript, setTranscript] = useState("");

    useImperativeHandle(ref, () => ({
        startListening: () => {
            if (recognitionRef.current) {
                recognitionRef.current.start();
            }
        },
        stopListening: () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        }
    }));

    useEffect(() => {
        if ("webkitSpeechRecognition" in window) {
            recognitionRef.current = new window.webkitSpeechRecognition();
            const recognition = recognitionRef.current;

            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = "es-PE";

            recognition.onresult = (event) => {
                let finalTranscript = "";
                for (let i = 0; i < event.results.length; i++) {
                    finalTranscript += event.results[i][0].transcript;
                }
                
                setTranscript(finalTranscript); 
                onTranscriptUpdate(finalTranscript); 
                
                
            };

            recognition.onerror = (event) => {
                console.error("Speech recognition error:", event.error);
            };

            recognition.onend = () => {
                console.log("Recognition stopped.");
            };
        } else {
            console.error("SpeechRecognition no está soportado en este navegador.");
        }

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, [onTranscriptUpdate]);

    return null;
});

export default VoiceRec;
