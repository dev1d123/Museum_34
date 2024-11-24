import React, { useState } from "react";
import {Entity, Scene} from 'aframe-react'
import BottomMenu from './BottomMenu.js';

import audio1 from './audio/アドリブ-_instrumental_.ogg';
import skyTexture from './textures/sky_sphere.jpg';
import floor from './models/floor.obj';
import floorTexture from './textures/floor.jpg';
import floorNormalTexture from './textures/floor_normal.jpg';
import mainMuseum from './models/main-museum.glb';
import models from './models/';

import main from './main.js';

import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';


import "aframe";
import CamPos from "./CamPos.js";


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
            <a-asset-item id="furina" src={models.furina}></a-asset-item>
            <a-asset-item id="volcan" src={models.volcan}></a-asset-item>
            <a-asset-item id="catedral" src={models.catedral}></a-asset-item>
            <a-asset-item id="donkey_sillar_polycam" src={models.donkey_sillar_polycam}></a-asset-item>
            <a-asset-item id="eagle_sillar_polycam" src={models.eagle_sillar_polycam}></a-asset-item>
            
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
            


          </a-assets>
          <a-sky src="#sky_sphere-texture"></a-sky>
          
          <Entity gltf-model="#main-museum" position="0 0 0" rotation="0 0 0" scale="1 1 1" static-body ></Entity>
          <Entity gltf-model="#furina" position="0 0 0" rotation="0 0 0" scale="1 1 1" static-body></Entity>
          <Entity gltf-model="#volcan" position="-6.5 0 -11" rotation="0 0 0" scale="0.05 0.05 0.05" static-body></Entity>
          <Entity gltf-model="#catedral" position="10 1.8 -5" rotation="0 180 0" scale="3 3 3"static-body></Entity>
          <Entity gltf-model="#donkey_sillar_polycam" position="9 1.18 7" rotation="0 0 0" scale="3 3 3" static-body></Entity>
          <Entity gltf-model="#eagle_sillar_polycam" position="9.7 1.2 4" rotation="0 0 0" scale="2 2 2" static-body></Entity>

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
          <Entity obj-model="obj: #recuadro-obj" material="src: #moonlight-texture" position="-7.2 0 0" rotation="0 0 0" scale="1 1 1" static-body></Entity>
          <Entity obj-model="obj: #recuadro-obj" material="src: #plazaPhoto" position="-6.2 -0.2  0" rotation="0 0 0" scale="0.7 1.1 1" static-body></Entity>
          <Entity obj-model="obj: #recuadro-obj" material="src: #rocotoPhoto" position="18.8 -0.2 0" rotation="0 0 0" scale="1.21 1.1 1" static-body></Entity>
          <Entity obj-model="obj: #recuadro-obj" material="src: #sillarPhoto" position="1 0 12" rotation="0 0 0" scale="1 1 1" static-body></Entity>
          <Entity obj-model="obj: #recuadro-obj" material="src: #volcanPhoto2" position="3.3 0 12" rotation="0 0 0" scale="1 1 1" static-body></Entity>
          <Entity obj-model="obj: #recuadro-obj" material="src: #catedralPhoto" position="5.6 0 12" rotation="0 0 0" scale="1 1 1" static-body></Entity>
          <Entity obj-model="obj: #recuadro-obj" material="src: #volcanPhoto" position="7.9 0 12" rotation="0 0 0" scale="1 1 1" static-body></Entity>
          <Entity obj-model="obj: #recuadro-obj" material="src: #miradorPhoto" position="10.2 0 12" rotation="0 0 0" scale="1 1 1" static-body></Entity>

          <Entity
            light="type: directional; color: #FFF; intensity: 0.5"
            position="2 20 0"
          ></Entity>
          <Entity light="type: ambient; color: #FFF"></Entity>

          {/* <a-box position="0 1 -5" color="red"></a-box> */}

          <a-light
            type="directional"
            position="2 4 -3"
            color="#FFF"
            intensity="1"
          ></a-light>

          {/* modelos */}
          

          <a-entity id="player" camera look-controls="pointerLockEnabled: true" wasd-controls="acceleration: 35" run-controls jump-controls position="0 1.6 0"></a-entity>


        </Scene>
      )}
    </div>
  );
};

export default MuseumVirtual;
