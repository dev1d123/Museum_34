import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const ThreeViewer = ({ path, handData }) => {
  const viewerRef = useRef(null);
  const cameraRef = useRef(null);

  const [initialLeftZ, setInitialLeftZ] = useState(null);

  useEffect(() => {
    if (!viewerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 5;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(viewerRef.current.clientWidth, viewerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    viewerRef.current.appendChild(renderer.domElement);

    // Luces
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Modelo 3D
    const loader = new GLTFLoader();
    let model;
    loader.load(
      path,
      (gltf) => {
        model = gltf.scene;
        model.scale.set(0.03, 0.03, 0.03);
        scene.add(model);

        // Centrar el modelo
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);
      },
      undefined,
      (error) => console.error("Error cargando modelo:", error)
    );

    // Controles para rotación y zoom
    
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (event) => {
      isDragging = true;
      previousMousePosition = { x: event.clientX, y: event.clientY };
    };

    const onMouseMove = (event) => {
      if (!isDragging || !model) return;

      const deltaMove = {
        x: event.clientX - previousMousePosition.x,
        y: event.clientY - previousMousePosition.y,
      };

      model.rotation.y += deltaMove.x * 0.01;
      model.rotation.x += deltaMove.y * 0.01;

      previousMousePosition = { x: event.clientX, y: event.clientY };
    };

    const onMouseUp = () => (isDragging = false);

    //No se descartan las funciones ya establecidas
    const onWheel = (event) => {
      event.preventDefault();
      camera.position.z = Math.max(2, Math.min(8, camera.position.z + event.deltaY * 0.01));
      console.log("asdasdasdasasd: ", camera.position.z);

    };

    renderer.domElement.addEventListener("mousedown", onMouseDown);
    renderer.domElement.addEventListener("mousemove", onMouseMove);
    renderer.domElement.addEventListener("mouseup", onMouseUp);
    renderer.domElement.addEventListener("wheel", onWheel);



    // Hacer que el renderer y la cámara se ajusten al tamaño del contenedor dinámicamente
    const onResize = () => {
      if (!viewerRef.current) return;
      const width = viewerRef.current.clientWidth;
      const height = viewerRef.current.clientHeight;

      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", onResize);

    // Render loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", onResize);
      if (viewerRef.current) {
        viewerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [path]);

  function transformNumber(num) {
    const clampedNum = Math.max(-9, Math.min(-2, num));
    const transformedNum = 10 + clampedNum;
    return transformedNum;
  }

  function scale (number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
  }
  function lerp(current, target, alpha) {
    return current * (1 - alpha) + target * alpha;
  }
  function scaleAndStabilize(number, inMin, inMax, outMin, outMax) {
    const scaledValue = (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
  
    // Redondeo para evitar fluctuaciones excesivas
    return Math.round(scaledValue * 100) / 100;  // Redondeo a 2 decimales
  }
  useEffect(() => {
    const { leftGrabbing, leftFingers, rightGrabbing, rightFingers } = handData;

    if (leftGrabbing && cameraRef.current) {
      const targetPos = scaleAndStabilize(leftFingers[0].z, -0.0000009, -0.0000002, 2, 8);
      cameraRef.current.position.z = lerp(cameraRef.current.position.z, targetPos, 0.1); // Alpha controla la suavidad
      console.log("Nueva posición suavizada:", cameraRef.current.position.z);
    }
    if (handData.leftGrabbing === true) {
      console.log("Mano izquierda");
      console.log("Profundidad:", handData.leftFingers[0].z);
    } 
    if (handData.rightGrabbing === true) {
      console.log("Mano derecha");
      console.log("EjeXasdasdasdas:", handData.rightFingers[0].x);
      console.log("EjeYasdasdasdas:", handData.rightFingers[0].y);

    } 
  }, [JSON.stringify(handData)]);
  


  return (
    <div
      ref={viewerRef}
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    />
  );
};

export default ThreeViewer;
