// src/App.jsx
import React from 'react';
import 'aframe';

const Test = () => {
  return (
    <a-scene>
      {/* Un cubo girando */}
      <a-box 
        position="0 1 -5" 
        rotation="0 45 45" 
        color="#4CC3D9" 
        animation="property: rotation; to: 0 360 0; loop: true; dur: 4000">
      </a-box>

      {/* Un plano */}
      <a-plane position="0 0 -5" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>

      {/* Una luz */}
      <a-light type="point" position="2 4 2"></a-light>

      {/* Una cámara */}
      <a-camera position="0 1.6 0">
        <a-cursor color="red"></a-cursor>
      </a-camera>
    </a-scene>
  );
};

export default Test;
