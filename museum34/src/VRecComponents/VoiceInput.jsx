import React, { useState } from "react";
import useVoiceSpeech from "./useVoiceSpeech";

const VoiceInput = () => {
    const [textInput, setTextInput] = useState('');
    const { isListening, transcript, startListening, stopListening } = useVoiceSpeech({
        continuous: true,
    });

    const toggleListening = () => {
        isListening ? stopListening() : startListening();
    };

    const handleStopListening = () => {
        if (transcript.trim()) {
            setTextInput((prevVal) => (prevVal ? `${prevVal} ${transcript}` : transcript));
        }
        stopListening();
    };

    return (
        <div
            style={{
                display: 'block',
                margin: '0 auto',
                width: '400px',
                textAlign: 'center',
                marginTop: '200px',
            }}
        >
            <p>Reconocimiento de voz!!!</p>
            <button
                onClick={toggleListening}
                style={{
                    backgroundColor: isListening ? '#d62d20' : '#008744',
                    color: 'white',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                }}
            >
                {isListening ? 'Stop Listening' : 'Speak'}
            </button>
            <textarea
                style={{
                    marginTop: '20px',
                    width: '100%',
                    height: '150px',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    transition: 'border-color 0.3s ease',
                    resize: 'none',
                    backgroundColor: '#f8f8f8',
                    color: '#333',
                }}
                disabled={isListening}
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                onBlur={handleStopListening}
            />
        </div>
    );
};

export default VoiceInput;
