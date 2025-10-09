import React, { useState } from "react";
import "./IASpeak.css";

export default function IASpeak({ title, description }) {
  const [isSpeaking, setIsSpeaking] = useState(false); 
  const handleSpeakToggle = () => {
    if (!isSpeaking) {
      const utterance = new SpeechSynthesisUtterance();
      utterance.text = `${title}. ${description}`;
      utterance.onend = () => setIsSpeaking(false); 
      speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    } else {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <button className="btn-leer" onClick={handleSpeakToggle}>
      <span className="material-symbols-outlined">
        volume_up
      </span>
    </button>
  );
}
