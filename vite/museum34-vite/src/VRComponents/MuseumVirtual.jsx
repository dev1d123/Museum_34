import React, { useState, useEffect, useRef } from "react";
import { Entity, Scene } from "aframe-react";
import BottomMenu from "./BottomMenu.jsx";
import stepSound from "./audio/step-sound.ogg";
import clickSound from "./audio/click-sound.ogg";
import audio1 from "./audio/アドリブ-_instrumental_.ogg";

import Perfil from "./Perfil.jsx";
import Configuracion from "./Configuracion.jsx";
import Informacion from "./Informacion.jsx";

import models from '../models/index.js';

import styled from "styled-components";

import AFrameControls from "./AFrameControls.jsx";
import "aframe";
import ModalInformation from "../components/DataModels/ModalInformation.jsx";

import TransitionAnimation from "./TransitionAnimation.jsx";
import api from "../api/axios.js";
import HelpBox from "./HelpBox.jsx";

const ModalContainer = styled.div`
  position: absolute;
  z-index: 9999;
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
const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  color: #ff6666;
  font-size: 24px;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #ff3333;
  }
`;
const MuseumVirtual = () => {
  const [isLoaded, setIsLoaded] = useState(false); // Estado para controlar si se cargan los recursos
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado del modal
  const [contentDisplay, setContentDisplay] = useState("none");
  const [buttonText, setButtonText] = useState("Abrir Modal"); // Texto inicial
  const [idModal, setIdModal] = useState(0); // Texto inicial
  const [museumTime, setMuseumTime] = useState(0);

  const [brillo, setBrillo] = useState(50);
  const [volumen, setVolumen] = useState(50);
  const [movimiento, setMovimiento] = useState(50);
  const [sensibilidad, setSensibilidad] = useState(50);

  const [userID, setUserID] = useState(null);
  const [conID, setConID] = useState(null);

  useEffect(() => {
    const storedUserID = localStorage.getItem("loggedIn");
    if (storedUserID) {
      setUserID(storedUserID);
      const fetchUsuario = async () => {
        try {
          const response = await api.get(`/usuarios/${storedUserID}`);
          console.log("la configuracion es: ", response.data.configuracion);
          const configID = response.data.configuracion;
          setConID(configID);
          if (configID === null) {
            setBrillo(50);
            setVolumen(50);
            setMovimiento(50);
            setSensibilidad(50);
          } else {
            const configResponse = await api.get(`/configuraciones/${configID}`);
            const { brillo, volumen, velocidad_movimiento, sensibilidad } = configResponse.data;
            setBrillo(brillo ?? 50);
            setVolumen(volumen ?? 50);
            setMovimiento(velocidad_movimiento ?? 50);
            setSensibilidad(sensibilidad ?? 50);
          }
        } catch (error) {
          console.error("Error al obtener el usuario:", error);
        }
      };
      fetchUsuario();
    }
  }, []);

  const aceleracion = 10 + (movimiento / 100) * 90;

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.setAttribute("wasd-controls", `acceleration: ${aceleracion}`);
    }
  }, [aceleracion]);

  const playerRef = useRef(null);
  const [inModel, setInModel] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setMuseumTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const waitForPlayerRef = async () => {
      while (!playerRef.current) {
        await new Promise((resolve) => setTimeout(resolve, 50));
      }

      const playerEl = playerRef.current;

      const handlePositionUpdate = (event) => {
        const { x, y, z } = event.detail;
        if (x >= -5 && x <= -3 && z >= -14 && z <= -12) {
          setButtonText("Abrir modal: Imagen del Cañon del Colca");
          setIdModal(1);
          setInModel(true);
        } else if (x >= -2.4 && x <= -0.7 && z >= -14 && z <= -12) {
          setButtonText("Abrir modal: Imagen de la plaza de armas");
          setIdModal(2);
          setInModel(true);
        } else if (x >= -0.2 && x <= 1.7 && z >= -14 && z <= -12) {
          setButtonText("Abrir modal: Imagen de la campiña y Misti");
          setIdModal(3);
          setInModel(true);
        } else if (x >= 1.8 && x <= 3.9 && z >= -14 && z <= -12) {
          setButtonText("Abrir modal: Imagen alternativa de la plaza");
          setInModel(true);
          setIdModal(4);
        } else if (x >= 3.6 && x <= 5.5 && z >= 12.4 && z <= 14) {
          setButtonText("Abrir modal: Imagen del mirador");
          setIdModal(5);
          setInModel(true);
        } else if (x >= 1.5 && x <= 3.3 && z >= 12.4 && z <= 14) {
          setButtonText("Abrir modal: Imagen del volcán Misti");
          setIdModal(6);
          setInModel(true);
        } else if (x >= -0.7 && x <= 1.0 && z >= 12.4 && z <= 14) {
          setButtonText("Abrir modal: Imagen de la catedral");
          setIdModal(7);
          setInModel(true);
        } else if (x >= -3.18 && x <= 0.1 && z >= 12.4 && z <= 14) {
          setButtonText("Abrir modal: Imagen de la campiña");
          setIdModal(8);
          setInModel(true);
        } else if (x >= -5.8 && x <= -3.5 && z >= 12.4 && z <= 14) {
          setButtonText("Abrir modal: Imagen de las canteras de sillar");
          setIdModal(9);
          setInModel(true);
        } else if (x >= 10.6 && x <= 13.4 && z >= 0.5 && z <= 1.75) {
          setButtonText("Abrir modal: Imagen del rocoto relleno");
          setIdModal(10);
          setInModel(true);
        } else if (x >= -10.87 && x <= -9.2 && z >= 0.5 && z <= 1.75) {
          setButtonText("Abrir modal: Imagen lateral de las canteras de sillar");
          setIdModal(11);
          setInModel(true);
        } else if (x >= -14 && x <= -11.5 && z >= 0.5 && z <= 1.75) {
          setButtonText("Abrir modal: Imagen lateral de la cantera");
          setIdModal(12);
          setInModel(true);
        } else if (x >= 7 && x <= 8 && z >= -6.5 && z <= -3) {
          setButtonText("Abrir modal: Modelo 3D de la catedral");
          setIdModal(13);
          setInModel(true);
        } else if (x >= 7 && x <= 8 && z >= 2.5 && z <= 5) {
          setButtonText("Abrir modal: Modelo 3D del águila");
          setIdModal(14);
          setInModel(true);
        } else if (x >= 7 && x <= 8 && z >= 6 && z <= 8) {
          setButtonText("Abrir modal: Modelo 3D del burro");
          setIdModal(15);
          setInModel(true);
        } else if (x >= 7 && x <= 8 && z >= 8.1 && z <= 10.1) {
          setButtonText("Abrir modal: Modelo 3D de la mujer");
          setIdModal(16);
          setInModel(true);
        } else if (x >= 7 && x <= 8 && z >= 10.5 && z <= 13) {
          setButtonText("Abrir modal: Modelo 3D del hombre");
          setIdModal(17);
          setInModel(true);
        } else if (x >= -8.8 && x <= -7.8 && z >= 9 && z <= 12) {
          setButtonText("Abrir modal: Modelo 3D del portal");
          setIdModal(18);
          setInModel(true);
        } else if (x >= -8.8 && x <= -7.8 && z >= -10 && z <= -8) {
          setButtonText("Abrir modal: Modelo 3D de Furina");
          setIdModal(19);
          setInModel(true);
        } else if (x >= -8.8 && x <= -7.8 && z >= -13 && z <= -11) {
          setButtonText("Abrir modal: Modelo 3D del Misti");
          setIdModal(20);
          setInModel(true);
        } else {
          setIdModal(0);
          setInModel(false);
        }
      };

      const attachListener = () => {
        playerEl.addEventListener("position-updated", handlePositionUpdate);
      };

      if (playerEl.hasLoaded) {
        attachListener();
      } else {
        playerEl.addEventListener("loaded", attachListener);
      }

      return () => {
        playerEl.removeEventListener("loaded", attachListener);
        playerEl.removeEventListener("position-updated", handlePositionUpdate);
      };
    };

    waitForPlayerRef();
  }, []);

  const volumenNormalizado = volumen / 100;

  useEffect(() => {
    let isMoving = false;
    const audio = new Audio(stepSound);
    audio.volume = volumenNormalizado / 2;
    audio.loop = true;
    let keysPressed = new Set();
    let jumpTimeout;

    const startSound = () => {
      if (audio.paused) {
        audio.play().catch((error) => console.error("Error playing sound:", error));
      }
    };

    const stopSound = () => {
      if (!audio.paused) {
        audio.pause();
        audio.currentTime = 0;
      }
    };

    const adjustPlaybackRate = (rate) => {
      audio.playbackRate = rate;
    };

    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase();

      if (['w', 'a', 's', 'd'].includes(key)) {
        keysPressed.add(key);
        if (keysPressed.size > 0 && !isMoving) {
          startSound();
          isMoving = true;
        }
      }

      if (key === " ") {
        stopSound();
        clearTimeout(jumpTimeout);
        jumpTimeout = setTimeout(() => {
          if (keysPressed.size > 0) {
            startSound();
          }
        }, 1000);
      }

      if (key === "shift") {
        adjustPlaybackRate(1.5);
      }
    };

    const handleKeyUp = (event) => {
      const key = event.key.toLowerCase();

      if (['w', 'a', 's', 'd'].includes(key)) {
        keysPressed.delete(key);
        if (keysPressed.size === 0) {
          isMoving = false;
          stopSound();
        }
      }

      if (key === "shift") {
        adjustPlaybackRate(1.0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      clearTimeout(jumpTimeout);
    };
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  const handleLoadScene = () => {
    const clickAudio = new Audio(clickSound);
    clickAudio.volume = volumenNormalizado / 2;
    clickAudio.play().catch((error) => console.error("Error playing click sound:", error));
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsLoaded(true);

      setContentDisplay("block");
    }, 3500);
  };

  const toggleModal = () => {
    const clickAudio = new Audio(clickSound);
    clickAudio.volume = volumenNormalizado / 2;
    clickAudio.play().catch((error) => console.error("Error playing click sound:", error));

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

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (inModel && (event.key === 'e' || event.key === 'E')) {
        if (!isModalOpen) {
          const clickAudio = new Audio(clickSound);
          clickAudio.volume = volumenNormalizado / 2;
          clickAudio.play().catch((error) =>
            console.error("Error playing click sound:", error)
          );
          setIsModalOpen(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [inModel, isModalOpen, volumenNormalizado]);

  const brilloCSS = 0.5 + (brillo / 100);

  const handleConfigChange = (newConfig) => {
    if (newConfig.brillo !== undefined) setBrillo(newConfig.brillo);
    if (newConfig.volumen !== undefined) setVolumen(newConfig.volumen);
    if (newConfig.velocidad !== undefined) setMovimiento(newConfig.velocidad);
    if (newConfig.sensibilidad !== undefined) setSensibilidad(newConfig.sensibilidad);
  };

  return (
    <div style={{ height: "100vh", width: "100vw", overflow: "hidden", filter: `brightness(${brilloCSS})` }}>
      <AFrameControls />
      <HelpBox />

      {isLoaded && (
        <div>
          <BottomMenu
            setActiveSection={(section) => {
              closeAllSections();
              if (section === "perfil") setIsPerfilOpen(true);
              if (section === "config") setIsConfigOpen(true);
              if (section === "info") setIsInfoOpen(true);
            }}
          />
        </div>
      )}

      {isModalOpen && (
        <ModalInformation
          isOpen={isModalOpen}
          id={idModal}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {isPerfilOpen && (
        <ModalContainer>
          <Perfil museumTime={museumTime} onClose={closeAllSections} />
          <CloseButton onClick={closeAllSections}>✖</CloseButton>
        </ModalContainer>
      )}

      {isConfigOpen && (
        <ModalContainer>
          <Configuracion
            brillo={brillo}
            volumen={volumen}
            velocidad={movimiento}
            sensibilidad={sensibilidad}
            configID={conID}
            userID={userID}
            onConfigChange={handleConfigChange}
            onConfigIdChange={setConID}
          />
          <CloseButton onClick={closeAllSections}>✖</CloseButton>
        </ModalContainer>
      )}

      {isInfoOpen && (
        <ModalContainer>
          <Informacion />
          <CloseButton onClick={closeAllSections}>✖</CloseButton>
        </ModalContainer>
      )}

      {isLoaded && inModel && (
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
            {isModalOpen ? "Cerrar Modal" : buttonText}
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

      {isLoading && <TransitionAnimation></TransitionAnimation>}

      {isLoaded && (
        <div>
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

              <a-sound
                src={audio1}
                autoplay="true"
                loop="true"
                position="1 1 0"
                volume={volumenNormalizado}
              ></a-sound>

              <a-asset-item id="floor-obj" src={models.floor}></a-asset-item>
              <img id="floor-texture" src={models.floorTexture} alt="" />
              <img id="floor_normal-texture" src={models.floorNormalTexture} alt="" />
              <a-asset-item id="main_museum" src={models.main_museum}></a-asset-item>
            </a-assets>

            <a-sky src="#sky_sphere-texture"></a-sky>

            <Entity
              gltf-model="#main_museum"
              position="00 0 0"
              rotation="0 0 0"
              scale="1 1 1"
              static-body
            ></Entity>

            <Entity gltf-model="#furina" position="-10 0.7 -9" rotation="0 90 0" scale="1.3 1.3 1.3" static-body></Entity>
            <Entity gltf-model="#volcan" position="-10.2 0.6 -12" rotation="0 0 0" scale="0.015 0.015 0.015" static-body></Entity>
            <Entity gltf-model="#catedral" position="10 1.8 -5" rotation="0 180 0" scale="3 3 3" static-body></Entity>
            <Entity gltf-model="#donkey_sillar_polycam" position="9.2 0.99 7" rotation="0 0 0" scale="2 2 2" static-body></Entity>
            <Entity gltf-model="#eagle_sillar_polycam" position="9.7 1.2 4" rotation="0 0 0" scale="2 2 2" static-body></Entity>
            <Entity gltf-model="#barroco_andino" position="-9.7 1.7 10" rotation="0 270 0" scale="0.6 0.6 0.6" static-body></Entity>
            <Entity gltf-model="#sillar_plycam_1" position="9.5 1.6 11" rotation="0 180 0" scale="4 4 4" static-body></Entity>

            <Entity obj-model="obj: #podiums-obj" material="src: #podiums-texture" position="13 0 12.1" rotation="0 0 0" static-body></Entity>
            <Entity obj-model="obj: #podiums-obj" material="src: #podiums-texture" position="10 0 12.1" rotation="0 0 0" static-body></Entity>
            <Entity obj-model="obj: #podiums-obj" material="src: #podiums-texture" position="-13 0 12.1" rotation="0 0 0" static-body></Entity>
            <Entity obj-model="obj: #podiums-obj" material="src: #podiums-texture" position="-10 0 12.1" rotation="0 0 0" static-body></Entity>
            <Entity obj-model="obj: #podiums-obj" material="src: #podiums-texture" position="-5 0 6" rotation="0 0 0" static-body></Entity>
            <Entity obj-model="obj: #podiums-obj" material="src: #podiums-texture" position="-5 0 10" rotation="0 0 0" static-body></Entity>
            <Entity obj-model="obj: #podiums-obj" material="src: #podiums-texture" position="0 0 6" rotation="0 0 0" static-body></Entity>
            <Entity obj-model="obj: #podiums-obj" material="src: #podiums-texture" position="0 0 10" rotation="0 0 0" static-body></Entity>
            <Entity obj-model="obj: #podiums-obj" material="src: #podiums-texture" position="5 0 6" rotation="0 0 0" static-body></Entity>
            <Entity obj-model="obj: #podiums-obj" material="src: #podiums-texture" position="5 0 10" rotation="0 0 0" static-body></Entity>

            <Entity obj-model="obj: #lamps-obj" material="src: #lamps-texture" position="12 0 -12" rotation="0 0 0" scale="1 1 1" static-body></Entity>
            <Entity obj-model="obj: #lamps-obj" material="src: #lamps-texture" position="0 0 0" rotation="0 0 0" scale="1 1 1" static-body></Entity>
            <Entity obj-model="obj: #lamps-obj" material="src: #lamps-texture" position="-12.7 0 -12" rotation="0 0 0" scale="1 1 1" static-body></Entity>
            <Entity obj-model="obj: #lamps-obj" material="src: #lamps-texture" position="-10 0 -12" rotation="0 0 0" scale="1 1 1" static-body></Entity>

            <Entity obj-model="obj: #recuadro-obj" material="src: #sillarPhoto3" position="-7.2 0 0" rotation="0 0 0" scale="1 1 1" static-body></Entity>
            <Entity obj-model="obj: #recuadro-obj" material="src: #sillarPhoto2" position="-6.2 -0.2  0" rotation="0 0 0" scale="0.7 1.1 1" static-body></Entity>
            <Entity obj-model="obj: #recuadro-obj" material="src: #rocotoPhoto" position="18.8 -0.2 0" rotation="0 0 0" scale="1.21 1.1 1" static-body></Entity>
            <Entity obj-model="obj: #recuadro-obj" material="src: #sillarPhoto" position="1 0 12" rotation="0 0 0" scale="1 1 1" static-body></Entity>
            <Entity obj-model="obj: #recuadro-obj" material="src: #volcanPhoto2" position="3.3 0 12" rotation="0 0 0" scale="1 1 1" static-body></Entity>
            <Entity obj-model="obj: #recuadro-obj" material="src: #catedralPhoto" position="5.6 0 12" rotation="0 0 0" scale="1 1 1" static-body></Entity>
            <Entity obj-model="obj: #recuadro-obj" material="src: #volcanPhoto" position="7.9 0 12" rotation="0 0 0" scale="1 1 1" static-body></Entity>
            <Entity obj-model="obj: #recuadro-obj" material="src: #miradorPhoto" position="10.2 0 12" rotation="0 0 0" scale="1 1 1" static-body></Entity>

            <Entity obj-model="obj: #recuadro-obj" material="src: #moonlight-texture" position="-7.2 0 -12" rotation="0 180 0" scale="1 1 1" static-body></Entity>
            <Entity obj-model="obj: #recuadro-obj" material="src: #vallePhoto" position="-4.9 0 -12" rotation="0 180 0" scale="1 1 1" static-body></Entity>
            <Entity obj-model="obj: #recuadro-obj" material="src: #vallePhoto2" position="-9.5 0 -12" rotation="0 180 0" scale="1 1 1" static-body></Entity>
            <Entity obj-model="obj: #recuadro-obj" material="src: #plazaPhoto2" position="-2.6 0 -12" rotation="0 180 0" scale="1 1 1" static-body></Entity>

            <Entity light="type: directional; color: #FFF; intensity: 0.5" position="2 20 0"></Entity>
            <Entity light="type: ambient; color: #FFF"></Entity>

            <a-light
              type="directional"
              position="2 4 -3"
              color="#FFF"
              intensity="1"
            ></a-light>

            <a-entity
              id="player"
              ref={playerRef}
              camera={`fov: ${sensibilidad}`}
              look-controls="pointerLockEnabled: true;"
              wasd-controls="acceleration: 35"
              run-controls={`normalSpeed: ${aceleracion}; runSpeed: ${aceleracion * 1.5}`}
              jump-controls
              position="0 1.6 0"
              dynamic-body
              log-position
            ></a-entity>
          </Scene>
        </div>
      )}
    </div>
  );
};

export default MuseumVirtual;
