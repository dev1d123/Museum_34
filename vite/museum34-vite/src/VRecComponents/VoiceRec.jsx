import React, { useEffect, useImperativeHandle, useRef, useState } from "react";

const VoiceRec = React.forwardRef((props, ref) => {
    const { onTranscriptUpdate } = props; 
    const recognitionRef = useRef(null);
    const callbackRef = useRef(onTranscriptUpdate);
    const [transcript, setTranscript] = useState("");

    // Mantener siempre el callback más reciente sin re-instanciar el reconocimiento
    useEffect(() => {
        callbackRef.current = onTranscriptUpdate;
    }, [onTranscriptUpdate]);

    useImperativeHandle(ref, () => ({
        startListening: () => {
            if (recognitionRef.current) {
                try {
                    recognitionRef.current.start();
                } catch {}
            }
        },
        stopListening: () => {
            if (recognitionRef.current) {
                try {
                    recognitionRef.current.stop();
                } catch {}
            }
        }
    }));

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            const recognition = recognitionRef.current;

            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = "es-PE";

            recognition.onresult = (event) => {
                let interim = "";
                let final = "";
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const res = event.results[i];
                    if (res.isFinal) final += res[0].transcript;
                    else interim += res[0].transcript;
                }

                if (final) {
                    setTranscript((prev) => {
                        const next = (prev + " " + final).trim();
                        // Notificar con el texto consolidado (solo cuando hay final)
                        callbackRef.current(next);
                        return next;
                    });
                } else if (interim) {
                    // Notificar parcial (interim) sin consolidarlo aún en el estado
                    callbackRef.current((transcript + " " + interim).trim());
                }
            };

            recognition.onerror = (event) => {
                console.error("Speech recognition error:", event.error);
            };

            recognition.onend = () => {
                // Opcional: puedes reiniciar automáticamente si lo necesitas
                // console.log("Recognition stopped.");
            };
        } else {
            console.error("SpeechRecognition no está soportado en este navegador.");
        }

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.onresult = null;
                recognitionRef.current.onerror = null;
                recognitionRef.current.onend = null;
                try {
                    recognitionRef.current.stop();
                } catch {}
                recognitionRef.current = null;
            }
        };
    }, []); // Se crea una sola vez

    return null;
});

export default VoiceRec;
