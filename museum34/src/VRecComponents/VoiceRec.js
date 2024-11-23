import React, { useEffect, useImperativeHandle, useRef } from "react";

const VoiceRec = React.forwardRef((props, ref) => {
    const recognitionRef = useRef(null);

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
            recognition.lang = "es-US";

            recognition.onresult = (event) => {
                let finalTranscript = "";
                for (let i = 0; i < event.results.length; i++) {
                    finalTranscript += event.results[i][0].transcript;
                }
                console.log(finalTranscript);
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
    }, []);

    return null; // Sin interfaz visible
});

export default VoiceRec;
