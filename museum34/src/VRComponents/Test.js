import React, { useEffect } from 'react';
import './style.css'; // Assuming you have a CSS file

const Test = () => {
  useEffect(() => {
    // Load external scripts
    const scripts = [
      'https://aframe.io/releases/1.2.0/aframe.min.js',
      'js/aframe-extras.min.js',
      'js/lzma.js',
      'js/ctm.js',
      'js/CTMLoader.js',
      'js/aframe-teleport-controls.min.js',
      'js/spheres_anim.js',
      'js/anim_1.js',
      'js/anim_2.js',
      'js/mocap.js',
      'js/envMapMaterial.js',
      'js/ctm_component.js',
      'js/mobile_component.js',
      'main.js' // Assuming this is your main script
    ];

    scripts.forEach(src => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
    });

    return () => {
      // Cleanup scripts if necessary
      scripts.forEach(src => {
        const script = document.querySelector(`script[src="${src}"]`);
        if (script) {
          document.body.removeChild(script);
        }
      });
    };
  }, []);

  return (
    <div>
      <a-scene>
        <a-entity mobile></a-entity>
        <a-entity gltf-model="#main-museum" position="30 0 0" rotation="0 0 0" scale="1 1 1" static-body></a-entity>
        <a-entity light="type: directional; color: #FFF; intensity: 0.5" position="2 20 0"></a-entity>
        <a-entity light="type: ambient; color: #FFF"></a-entity>
        <a-entity spheres material="shader: envMapMaterial; src:textures/cube/hall/; "></a-entity>
        <a-entity anim_1></a-entity>
        <a-entity anim_2></a-entity>

        <a-assets>
          <a-mixin id="checkpoint"></a-mixin>
          <a-mixin id="checkpoint-hovered" color="#6CEEB5"></a-mixin>
          <img id="sky_sphere-texture" src="textures/sky_sphere.jpg" />
          <a-sound src="audio/アドリブ-_instrumental_.ogg" autoplay="true" loop="true" position="1 1 0" volume="0.3"></a-sound>
          <a-sound src="audio/84529__cmusounddesign__02-museum.ogg" autoplay="true" loop="true" position="1 1 0"></a-sound>
          <a-sound src="audio/219462__cediez__musee-victoria-londres-grand-escalier.ogg" autoplay="true" loop="true" position="1 1 10"></a-sound>
          {/* Add all asset items here */}
          <a-asset-item id="main-museum" src="models/main-museum.glb"></a-asset-item>
          {/* Other assets */}
        </a-assets>

        <a-sky color="#EEEEFF" material="src: #sky_sphere-texture"></a-sky>
        {/* Add all model entities here */}
        <a-entity id="player" camera look-controls wasd-controls="acceleration: 65" run-controls jump-controls position="0 1.6 0"></a-entity>
      </a-scene>

      <div id="bottom-menu">
        <button id="visor-button">Modo visor</button>
        <button onClick={() => alert('Mas información')}>Mas información</button>
        <button onClick={() => alert('Ajustes')}>Ajustes</button>
      </div>

      <div id="camPos">
        <div className="containerCam">
          <video id="video" autoPlay playsInline></video>
          <canvas id="canvas"></canvas>
          <button id="toggleButton">Activar Cámara</button>
          {/* TensorFlow scripts can be loaded here if needed */}
        </div>
      </div>

      <div id="main-menu">
        <h1>Bienvenido al Museo de Arequipa</h1>
        <button id="start_experience">Iniciar Experiencia</button>
        <button id="exit">Salir</button>
      </div>
    </div>
  );
};

export default Test;