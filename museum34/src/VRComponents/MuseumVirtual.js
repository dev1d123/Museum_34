import React, { useState, useEffect } from "react";
import { Entity, Scene } from "aframe-react";
import BottomMenu from "./BottomMenu.js";
import stepSound from "./audio/step-sound.ogg";
import audio1 from "./audio/アドリブ-_instrumental_.ogg";
import skyTexture from "./textures/sky_sphere.jpg";
import floor from "./models/floor.obj";
import floorTexture from "./textures/floor.jpg";
import floorNormalTexture from "./textures/floor_normal.jpg";
import mainMuseum from "./models/main-museum.glb";
import Modal3D from "../components/DataModels/ModalInformation.jsx";
import "aframe";



const MuseumVirtual = () => {
  const [isLoaded, setIsLoaded] = useState(false); // Estado para controlar si se cargan los recursos
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado del modal

  useEffect(() => {
    let isMoving = false; // Controla si se está moviendo
    const audio = new Audio(stepSound); // Cargar el sonido
    audio.volume = 0.5;
    audio.loop = true; // El sonido se repetirá
    let keysPressed = new Set(); // Usaremos un Set para almacenar las teclas presionadas
  
    // Función para iniciar el sonido
    const startSound = () => {
      if (audio.paused) {
        audio.play().catch((error) => console.error("Error playing sound:", error));
      }
    };
  
    // Función para detener el sonido
    const stopSound = () => {
      if (!audio.paused) {
        audio.pause();
        audio.currentTime = 0; // Reiniciar el sonido para la próxima vez
      }
    };
  
    // Manejadores de eventos para teclas de movimiento
    const handleKeyDown = (event) => {
      if (['w', 'a', 's', 'd'].includes(event.key.toLowerCase())) {
        keysPressed.add(event.key.toLowerCase());
        if (keysPressed.size > 0 && !isMoving) {
          startSound();
          isMoving = true;
        }
      }
    };
  
    const handleKeyUp = (event) => {
      if (['w', 'a', 's', 'd'].includes(event.key.toLowerCase())) {
        keysPressed.delete(event.key.toLowerCase());
        if (keysPressed.size === 0) {
          isMoving = false;
          stopSound();
        }
      }
    };
  
    // Registrar eventos de teclado
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
  
    // Cleanup al desmontar el componente
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);
  

  const handleLoadScene = () => {
    setIsLoaded(true);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div style={{ height: "100vh", width: "100vw", overflow: "hidden" }}>
      {isLoaded && <BottomMenu />}

      {/* Modal para mostrar información */}
      <Modal3D
        isOpen={isModalOpen}
        id={0} // Eliminé el uso de selectedModelId porque no se está usando
        onClose={() => setIsModalOpen(false)}
      />

      {!isLoaded ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            backgroundColor: "#000",
            color: "#fff",
            textAlign: "center",
          }}
        >
          <h1>Museo Virtual</h1>
          <button
            onClick={handleLoadScene}
            style={{
              padding: "10px 20px",
              fontSize: "18px",
              backgroundColor: "#6CEEB5",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Iniciar Experiencia
          </button>
        </div>
      ) : (
        <Scene>
          <a-assets>
            <a-mixin id="checkpoint"></a-mixin>
            <a-mixin id="checkpoint-hovered" color="#6CEEB5"></a-mixin>

            <img id="sky_sphere-texture" src={skyTexture} alt="" />
            
            <a-sound
              src={audio1}
              autoplay="true"
              loop="true"
              position="1 1 0"
              volume="0.3"
            ></a-sound>
            
            <a-asset-item id="floor-obj" src={floor}></a-asset-item>
            <img id="floor-texture" src={floorTexture} alt="" />
            <img id="floor_normal-texture" src={floorNormalTexture} alt="" />
            <a-asset-item id="main-museum" src={mainMuseum}></a-asset-item>
          </a-assets>

          <a-sky color="#EEEEFF" material="src: #sky_sphere-texture"></a-sky>

          <Entity
            gltf-model="#main-museum"
            position="00 0 0"
            rotation="0 0 0"
            scale="1 1 1"
            static-body
          ></Entity>

          <Entity light="type: directional; color: #FFF; intensity: 0.5" position="2 20 0"></Entity>
          <Entity light="type: ambient; color: #FFF"></Entity>

          <a-box position="0 1 -5" color="red"></a-box>
          <a-light
            type="directional"
            position="2 4 -3"
            color="#FFF"
            intensity="1"
          ></a-light>

          {/* Entidad del jugador que dispara el sonido al moverse */}
          <a-entity
            id="player"
            camera
            look-controls
            wasd-controls="acceleration: 35"
            run-controls
            jump-controls
            position="0 1.6 0"
            step-sound
          ></a-entity>
        </Scene>
      )}
    </div>
  );
};

export default MuseumVirtual;
