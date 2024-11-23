import React, { useState } from "react";
import {Entity, Scene} from 'aframe-react'
import BottomMenu from './BottomMenu.js';

import audio1 from './audio/アドリブ-_instrumental_.ogg';
import skyTexture from './textures/sky_sphere.jpg';
import floor from './models/floor.obj';
import floorTexture from './textures/floor.jpg';
import floorNormalTexture from './textures/floor_normal.jpg';
import mainMuseum from './models/main-museum.glb';
import main from './main.js';

import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';


import "aframe";
import CamPos from "./CamPos.js";
import { div } from "@tensorflow/tfjs";

const MuseumVirtual = () => {
  const [isLoaded, setIsLoaded] = useState(false); // Estado para controlar si se cargan los recursos

  const handleLoadScene = () => {
    setIsLoaded(true);
  };

  return (
    <div style={{ height: "100vh", width: "100vw", overflow: "hidden" }}>
      {isLoaded && <BottomMenu />} {}
      {isLoaded && <CamPos />} {}

      {!isLoaded ? (
        // Pantalla inicial con botón para cargar la escena

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
        // La escena se carga después de hacer clic
        
        <Scene>
          <a-assets>
            <a-mixin id="checkpoint"></a-mixin>
            <a-mixin id="checkpoint-hovered" color="#6CEEB5"></a-mixin>

            <img id="sky_sphere-texture" src={skyTexture}></img>

            <a-sound
              src={audio1}
              autoplay="true"
              loop="true"
              position="1 1 0"
              volume="0.3"
            ></a-sound>

            <a-asset-item id="floor-obj" src={floor}></a-asset-item>
            <img id="floor-texture" src={floorTexture}></img>
            <img id="floor_normal-texture" src={floorNormalTexture}></img>

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

          <Entity
            light="type: directional; color: #FFF; intensity: 0.5"
            position="2 20 0"
          ></Entity>
          <Entity light="type: ambient; color: #FFF"></Entity>

          <a-box position="0 1 -5" color="red"></a-box>
          <a-light
            type="directional"
            position="2 4 -3"
            color="#FFF"
            intensity="1"
          ></a-light>

          <a-entity id="player" camera look-controls wasd-controls="acceleration: 35" run-controls jump-controls position="0 1.6 0"></a-entity>

        </Scene>
      )}
    </div>
  );
};

export default MuseumVirtual;
