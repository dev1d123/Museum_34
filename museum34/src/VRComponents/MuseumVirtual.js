import React, { useState, useEffect } from "react";
import { Entity, Scene } from "aframe-react";
import BottomMenu from "./BottomMenu.js";
import stepSound from "./audio/step-sound.ogg";
import clickSound from "./audio/click-sound.ogg";
import audio1 from "./audio/アドリブ-_instrumental_.ogg";

import Perfil from "./Perfil.js";
import Configuracion  from "./Configuracion.js";
import Informacion from "./Informacion.js";

import models from 'museum34/public/models/';
import styled from "styled-components";



import main from "./main.js";
import "aframe";
import ModalInformation from "../components/DataModels/ModalInformation.jsx";

import TransitionAnimation from "./TransitionAnimation.js";

const ModalContainer = styled.div`
  position: absolute;
  z-index: 99999;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 70%;
  background: #1e1f29;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
`;

const MuseumVirtual = () => {
  const [isLoaded, setIsLoaded] = useState(false); // Estado para controlar si se cargan los recursos
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado del modal
  const [contentDisplay, setContentDisplay] = useState("none");

  useEffect(() => {
    let isMoving = false; // Controla si se está moviendo
    const audio = new Audio(stepSound); // Cargar el sonido
    audio.volume = 0.5;
    audio.loop = true; // El sonido se repetirá
    let keysPressed = new Set(); // Usaremos un Set para almacenar las teclas presionadas
    let jumpTimeout; // Controlará el tiempo en que se pausa el sonido tras un salto
  
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
  
    // Función para ajustar la velocidad del sonido
    const adjustPlaybackRate = (rate) => {
      audio.playbackRate = rate;
    };
  
    // Manejadores de eventos para teclas de movimiento y correr
    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase();
  
      // Movimiento con WASD
      if (['w', 'a', 's', 'd'].includes(key)) {
        keysPressed.add(key);
        if (keysPressed.size > 0 && !isMoving) {
          startSound();
          isMoving = true;
        }
      }
  
      // Salto con barra espaciadora
      if (key === " ") {
        stopSound(); // Detenemos el sonido inmediatamente
        clearTimeout(jumpTimeout); // Limpiamos cualquier timeout previo
        jumpTimeout = setTimeout(() => {
          // Reanudar el sonido si se siguen moviendo teclas de WASD
          if (keysPressed.size > 0) {
            startSound();
          }
        }, 1000); // Pausa de 1 segundo
      }
  
      // Correr con Shift
      if (key === "shift") {
        adjustPlaybackRate(1.5); // Aumenta la velocidad del sonido
      }
    };
  
    const handleKeyUp = (event) => {
      const key = event.key.toLowerCase();
  
      // Movimiento con WASD
      if (['w', 'a', 's', 'd'].includes(key)) {
        keysPressed.delete(key);
        if (keysPressed.size === 0) {
          isMoving = false;
          stopSound();
        }
      }
  
      // Dejar de correr al soltar Shift
      if (key === "shift") {
        adjustPlaybackRate(1.0); // Vuelve a la velocidad normal
      }
    };
  
    // Registrar eventos de teclado
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
  
    // Cleanup al desmontar el componente
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      clearTimeout(jumpTimeout);
    };
  }, []);
  
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadScene = () => {
    // Reproducir el sonido de clic
    const clickAudio = new Audio(clickSound);
    clickAudio.volume = 0.5;
    clickAudio.play().catch((error) => console.error("Error playing click sound:", error));
    setIsLoading(true); 

    setTimeout(() => {
      setIsLoading(false); 
      setIsLoaded(true); 

      setContentDisplay("block"); 
    }, 3500);
  };
  


  const toggleModal = () => {
    // Reproducir el sonido de clic
    const clickAudio = new Audio(clickSound);
    clickAudio.volume = 0.5;
    clickAudio.play().catch((error) => console.error("Error playing click sound:", error));
  
    // Alternar el estado del modal
    setIsModalOpen((prev) => !prev);
  };

  const [isPerfilOpen, setIsPerfilOpen] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const closeAllSections = () => {
    setIsPerfilOpen(false);
    setIsConfigOpen(false);
    setIsInfoOpen(false);
  };


  return (
    <div style={{ height: "100vh", width: "100vw", overflow: "hidden" }}>

      {isLoaded && (
        <BottomMenu
          setActiveSection={(section) => {
            closeAllSections(); 
            if (section === "perfil") setIsPerfilOpen(true);
            if (section === "config") setIsConfigOpen(true);
            if (section === "info") setIsInfoOpen(true);
          }}
        />
      )}

      {/* Modal para mostrar información */}
      {isModalOpen && (
          <ModalInformation
            isOpen={isModalOpen}
            id={4}
            onClose={() => setIsModalOpen(false)}
          />
        )}
          {/* Modal dinámico para cada sección */}
      {isPerfilOpen && (
        <ModalContainer>
          <Perfil />
          <button onClick={closeAllSections}>Cerrar</button>
        </ModalContainer>
      )}

      {isConfigOpen && (
        <ModalContainer>
          <Configuracion />
          <button onClick={closeAllSections}>Cerrar</button>
        </ModalContainer>
      )}

      {isInfoOpen && (
        <ModalContainer>
          <Informacion />
          <button onClick={closeAllSections}>Cerrar</button>
        </ModalContainer>
      )}
{isLoaded && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: 1000,
            backgroundColor: "#fff",
            padding: "10px",
            borderRadius: "5px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <button
            onClick={toggleModal}
            style={{
              padding: "10px 20px",
              fontSize: "14px",
              backgroundColor: isModalOpen ? "#FF5C5C" : "#6CEEB5",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {isModalOpen ? "Cerrar Modal" : "Abrir Modal"}
          </button>
        </div>
      )}
      {!isLoaded && !isLoading && (
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
      )}
      {isLoading && (
        <TransitionAnimation></TransitionAnimation>
      )}
      {isLoaded && (
        <Scene style={{ display: contentDisplay }}>

          <a-assets>
            <a-mixin id="checkpoint"></a-mixin>
            <a-mixin id="checkpoint-hovered" color="#6CEEB5"></a-mixin>

            <img id="sky_sphere-texture" src={models.sky_sphere}></img>

            <a-asset-item id="furina" src={models.furina}></a-asset-item>
            <a-asset-item id="volcan" src={models.volcan}></a-asset-item>
            <a-asset-item id="catedral" src={models.catedral}></a-asset-item>
            <a-asset-item id="donkey_sillar_polycam" src={models.donkey_sillar_polycam}></a-asset-item>
            <a-asset-item id="eagle_sillar_polycam" src={models.eagle_sillar_polycam}></a-asset-item>
            <a-asset-item id="barroco_andino" src={models.barroco_andino}></a-asset-item>
            <a-asset-item id="sillar_plycam_1" src={models.sillar_plycam_1}></a-asset-item>
            
            
            <a-asset-item id="podiums-obj" src={models.podiumsModel}></a-asset-item>
            <img id="podiums-texture" src={models.podiumsTexture}></img>

            <a-asset-item id="lamps-obj" src={models.lampsModel}></a-asset-item>
            <img id="lamps-texture" src={models.lampsTexture}></img>

            <a-asset-item id="recuadro-obj" src={models.recuadroModel}></a-asset-item>
            <img id="moonlight-texture" src={models.moonlightTexture}></img>
            <img id="catedralPhoto" src={models.catedralPhoto}></img>
            <img id="volcanPhoto" src={models.volcanPhoto}></img>
            <img id="miradorPhoto" src={models.miradorPhoto}></img>
            <img id="volcanPhoto2" src={models.volcanPhoto2}></img>
            <img id="plazaPhoto" src={models.plazaPhoto}></img>
            <img id="sillarPhoto" src={models.sillarPhoto}></img>
            <img id="rocotoPhoto" src={models.rocotoPhoto}></img>
            <img id="plazaPhoto2" src={models.plazaPhoto2}></img>
            <img id="sillarPhoto2" src={models.sillarPhoto2}></img>
            <img id="sillarPhoto3" src={models.sillarPhoto3}></img>
            <img id="vallePhoto" src={models.vallePhoto}></img>
            <img id="vallePhoto2" src={models.vallePhoto2}></img>
            <img id="plazaPhoto2" src={models.plazaPhoto2}></img>
            
            <a-sound
              src={audio1}
              autoplay="true"
              loop="true"
              position="1 1 0"
              volume="0.3"
            ></a-sound>

            <a-asset-item id="floor-obj" src={models.floor}></a-asset-item>
            <img id="floor-texture" src={models.floorTexture} alt="" />
            <img id="floor_normal-texture" src={models.floorNormalTexture} alt="" />
            <a-asset-item id="main_museum" src={models.main_museum}></a-asset-item>
          </a-assets>

          <a-sky color="#EEEEFF" material="src: #sky_sphere-texture"></a-sky>

          <Entity
            gltf-model="#main_museum"
            position="00 0 0"
            rotation="0 0 0"
            scale="1 1 1"
            static-body
          ></Entity>

          <a-sky src="#sky_sphere-texture"></a-sky>

          <Entity gltf-model="#furina" position="-10 0.7 -9" rotation="0 90 0" scale="1.3 1.3 1.3" static-body></Entity>
          <Entity gltf-model="#volcan" position="-10.2 0.6 -12" rotation="0 0 0" scale="0.015 0.015 0.015" static-body></Entity>
          <Entity gltf-model="#catedral" position="10 1.8 -5" rotation="0 180 0" scale="3 3 3"static-body></Entity>
          <Entity gltf-model="#donkey_sillar_polycam" position="9.2 0.99 7" rotation="0 0 0" scale="2 2 2" static-body></Entity>
          <Entity gltf-model="#eagle_sillar_polycam" position="9.7 1.2 4" rotation="0 0 0" scale="2 2 2" static-body></Entity>
          <Entity gltf-model="#barroco_andino" position="-9.7 1.7 10" rotation="0 270 0" scale="0.6 0.6 0.6" static-body></Entity>
          <Entity gltf-model="#sillar_plycam_1" position="9.5 1.6 11" rotation="0 180 0" scale="4 4 4" static-body></Entity>

          {/* podiums */}
          <Entity obj-model="obj: #podiums-obj" material="src: #podiums-texture" position="13 0 12.1" rotation="0 0 0" static-body></Entity>
          <Entity obj-model="obj: #podiums-obj" material="src: #podiums-texture" position="10 0 12.1" rotation="0 0 0" static-body></Entity>
          <Entity obj-model="obj: #podiums-obj" material="src: #podiums-texture" position="-13 0 12.1" rotation="0 0 0" static-body></Entity>
          <Entity obj-model="obj: #podiums-obj" material="src: #podiums-texture" position="-10 0 12.1" rotation="0 0 0" static-body></Entity>


          {/* lamparas */}
          <Entity obj-model="obj: #lamps-obj" material="src: #lamps-texture" position="12 0 -12" rotation="0 0 0" scale="1 1 1" static-body></Entity>
          <Entity obj-model="obj: #lamps-obj" material="src: #lamps-texture" position="0 0 0" rotation="0 0 0" scale="1 1 1" static-body></Entity>
          <Entity obj-model="obj: #lamps-obj" material="src: #lamps-texture" position="-12.7 0 -12" rotation="0 0 0" scale="1 1 1" static-body></Entity>
          <Entity obj-model="obj: #lamps-obj" material="src: #lamps-texture" position="-10 0 -12" rotation="0 0 0" scale="1 1 1" static-body></Entity>

          {/* cuadros */}
          <Entity obj-model="obj: #recuadro-obj" material="src: #sillarPhoto3" position="-7.2 0 0" rotation="0 0 0" scale="1 1 1" static-body></Entity>
          <Entity obj-model="obj: #recuadro-obj" material="src: #sillarPhoto2" position="-6.2 -0.2  0" rotation="0 0 0" scale="0.7 1.1 1" static-body></Entity>
          <Entity obj-model="obj: #recuadro-obj" material="src: #rocotoPhoto" position="18.8 -0.2 0" rotation="0 0 0" scale="1.21 1.1 1" static-body></Entity>
          <Entity obj-model="obj: #recuadro-obj" material="src: #sillarPhoto" position="1 0 12" rotation="0 0 0" scale="1 1 1" static-body></Entity>
          <Entity obj-model="obj: #recuadro-obj" material="src: #volcanPhoto2" position="3.3 0 12" rotation="0 0 0" scale="1 1 1" static-body></Entity>
          <Entity obj-model="obj: #recuadro-obj" material="src: #catedralPhoto" position="5.6 0 12" rotation="0 0 0" scale="1 1 1" static-body></Entity>
          <Entity obj-model="obj: #recuadro-obj" material="src: #volcanPhoto" position="7.9 0 12" rotation="0 0 0" scale="1 1 1" static-body></Entity>
          <Entity obj-model="obj: #recuadro-obj" material="src: #miradorPhoto" position="10.2 0 12" rotation="0 0 0" scale="1 1 1" static-body></Entity>

          <Entity obj-model="obj: #recuadro-obj" material="src: #plazaPhoto2" position="-7.2 0 -12" rotation="0 180 0" scale="1 1 1" static-body></Entity>
          <Entity obj-model="obj: #recuadro-obj" material="src: #vallePhoto" position="-4.9 0 -12" rotation="0 180 0" scale="1 1 1" static-body></Entity>
          <Entity obj-model="obj: #recuadro-obj" material="src: #vallePhoto2" position="-9.5 0 -12" rotation="0 180 0" scale="1 1 1" static-body></Entity>
          <Entity obj-model="obj: #recuadro-obj" material="src: #plazaPhoto2" position="-2.6 0 -12" rotation="0 180 0" scale="1 1 1" static-body></Entity>




          <Entity light="type: directional; color: #FFF; intensity: 0.5" position="2 20 0"></Entity>
          <Entity light="type: ambient; color: #FFF"></Entity>

          {/* <a-box position="0 1 -5" color="red" dynamic-body></a-box> */}
          <a-light
            type="directional"
            position="2 4 -3"
            color="#FFF"
            intensity="1"
          ></a-light>

          <a-entity
            id="player"
            camera
            look-controls="pointerLockEnabled: true"
            wasd-controls="acceleration: 35"
            run-controls
            jump-controls
            position="0 1.6 0"
            dynamic-body
            step-sound
            log-position
          ></a-entity>
        </Scene>
      )}
    </div>
  );
};

export default MuseumVirtual;
