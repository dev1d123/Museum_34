import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import styled from "styled-components";
import {
  HandLandmarker,
  FilesetResolver,
} from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0";
import {
  drawConnectors,
  drawLandmarks,
} from "@mediapipe/drawing_utils";
import { counter } from "@fortawesome/fontawesome-svg-core";

const Container = styled.div`
  font-family: "Roboto", sans-serif;
  margin: 0 auto;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #000; 
`;

const VideoView = styled.div`
  position: relative;
  width: auto;
  height: auto; 
  max-width: 100%; 
  max-height: 100%;
`;

const VideoContainer = styled.div`
  position: relative;
  display: inline-block;
  width: auto;
  height: auto; 
`;

const Video = styled.video`
  display: block;
  max-width: 100%; 
  max-height: 100%; 
  transform: rotateY(180deg); 
`;

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  max-width: 100%; 
  max-height: 100%;
  transform: rotateY(180deg); 
`;

const HandsRec = forwardRef(({onData}, ref) => {
  const [handLandmarker, setHandLandmarker] = useState(null);
  const webcamRunningRef = useRef(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const animationFrameIdRef = useRef(null);
  const tracksRef = useRef([]);

  const cleanUpResources = () => {
    console.log("Cleaning!", videoRef);
    console.log("info: ", videoRef);
    console.log("Tracks almacenados en tracksRef:", tracksRef.current);
    tracksRef.current.forEach((track) => {
      console.log("Deteniendo pista:", track);
      track.stop();
    });
    
    
    webcamRunningRef.current = false;
    cancelAnimationFrame(animationFrameIdRef.current);

    if (handLandmarker) {
      handLandmarker.close();
      console.log("HandLandmarker closed.");
    }
  };
  useImperativeHandle(ref, () => ({
    disableWebCam: () => {
      cleanUpResources();
    },
  }));
  useEffect(() => {
    // Inicializa HandLandmarker
    const createHandLandmarker = async () => {
      try {
        console.log("Initializing HandLandmarker...");
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
        );

        const handLandmarkerInstance = await HandLandmarker.createFromOptions(
          vision,
          {
            baseOptions: {
              modelAssetPath:
                "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
              delegate: "GPU",
            },
            runningMode: "VIDEO",
            numHands: 2,
          }
        );

        setHandLandmarker(handLandmarkerInstance);
        console.log("HandLandmarker initialized successfully!");
        enableWebcam(handLandmarkerInstance); // Inicia la webcam
      } catch (error) {
        console.error("Error initializing HandLandmarker:", error);
      }
    };

    createHandLandmarker();

    // Destructor para limpiar cuando el componente se desmonte
    return () => {
      console.log("Componente desmontado, limpiando recursos...");

      cleanUpResources();
    };
  }, []);



  const enableWebcam = async (handLandmarkerInstance) => {
    try {
      console.log("Enabling webcam...");
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      
      videoRef.current.srcObject = stream;  // Asignar la transmisión al video
      
   
      tracksRef.current = stream.getTracks();

      videoRef.current.addEventListener("loadeddata", () => {
        console.log("Webcam loaded. Starting detection...");
        webcamRunningRef.current = true;
        predictWebcam(handLandmarkerInstance);

      });
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };

  const generateHandConnections = () => [
    [0, 1], [1, 2], [2, 3], [3, 4], // Pulgar
    [0, 5], [5, 6], [6, 7], [7, 8], // Índice
    [5, 9], [9, 10], [10, 11], [11, 12], // Medio
    [9, 13], [13, 14], [14, 15], [15, 16], // Anular
    [13, 17], [17, 18], [18, 19], [19, 20], // Meñique
    [0, 17], // Muñeca
  ];

  const determineHandSide = (landmarks) => {
    if (!landmarks || landmarks.length === 0) {
      console.log("No landmarks detected.");
      return;
    }
  
    const wrist = landmarks[0];
    const thumbTip = landmarks[4];
  
    // Determinar mano según la posición del pulgar
    const isRightHand = thumbTip.x > wrist.x;
    const isLeftHand = thumbTip.x < wrist.x;
  
    if (isRightHand) {
      return "derecha";
    } else if (isLeftHand) {
      return "izquierda";
    } else {
      return "desconocida";
    }
  };

      /*
    Muñeca
      0: Muñeca (Wrist)
    Pulgar
      1: Base del pulgar (CMC - carpometacarpiana)
      2: Primera articulación (MCP - metacarpofalángica)
      3: Segunda articulación (IP - interfalángica)
      4: Punta del dedo (Tip)
    Índice
      5: Base del índice (MCP - metacarpofalángica)
      6: Primera articulación (PIP - proximal interfalángica)
      7: Segunda articulación (DIP - distal interfalángica)
      8: Punta del dedo (Tip)
    Dedo medio
      9: Base del dedo medio (MCP - metacarpofalángica)
      10: Primera articulación (PIP - proximal interfalángica)
      11: Segunda articulación (DIP - distal interfalángica)
      12: Punta del dedo (Tip)
    Anular
      13: Base del anular (MCP - metacarpofalángica)
      14: Primera articulación (PIP - proximal interfalángica)
      15: Segunda articulación (DIP - distal interfalángica)
      16: Punta del dedo (Tip)
    Meñique
      17: Base del meñique (MCP - metacarpofalángica)
      18: Primera articulación (PIP - proximal interfalángica)
      19: Segunda articulación (DIP - distal interfalángica)
      20: Punta del dedo (Tip)

    */

  //retorna 2 arreglos (uno por la mano izquierda y otro por la mano derecha, ademas
  //retorna handSide y leftGrabbing y rightGrabbing)
  const processHandGestures = (results, landmarks) => {
    const threshold = 0.3; // Umbral de distancia para determinar si la mano está cerrada
    const calculateDistance = (x1, y1, x2, y2) => Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  
    // Función para calcular si una mano está cerrada y obtener los dedos
    const getHandData = (handLandmarks) => {
      const distances = {
        thumb: calculateDistance(handLandmarks[0].x, handLandmarks[0].y, handLandmarks[4].x, handLandmarks[4].y),
        index: calculateDistance(handLandmarks[0].x, handLandmarks[0].y, handLandmarks[8].x, handLandmarks[8].y),
        middle: calculateDistance(handLandmarks[0].x, handLandmarks[0].y, handLandmarks[12].x, handLandmarks[12].y),
        ring: calculateDistance(handLandmarks[0].x, handLandmarks[0].y, handLandmarks[16].x, handLandmarks[16].y),
        pinky: calculateDistance(handLandmarks[0].x, handLandmarks[0].y, handLandmarks[20].x, handLandmarks[20].y),
      };
  
      const isGrabbing =
        distances.thumb < threshold &&
        distances.index < threshold &&
        distances.middle < threshold &&
        distances.ring < threshold &&
        distances.pinky < threshold;
  
      // Mapear las posiciones de los dedos
      const fingers = handLandmarks.map((point) => ({ x: point.x, y: point.y, z: point.z }));
  
      return { isGrabbing, fingers };
    };
  
    // Preparar los datos para la mano izquierda y derecha
    let leftGrabbing = false;
    let rightGrabbing = false;
    let leftFingers = [];
    let rightFingers = [];
  
    const leftLandmarks = results.landmarks.filter((landmark) => determineHandSide(landmark) === 'izquierda');
    const rightLandmarks = results.landmarks.filter((landmark) => determineHandSide(landmark) === 'derecha');
  
    if (leftLandmarks.length > 0) {
      const leftData = getHandData(leftLandmarks[0]);
      leftGrabbing = leftData.isGrabbing;
      leftFingers = leftData.fingers;
    }
  
    if (rightLandmarks.length > 0) {
      const rightData = getHandData(rightLandmarks[0]);
      rightGrabbing = rightData.isGrabbing;
      rightFingers = rightData.fingers;
    }
  
    // Determina si hay dos manos detectadas
    const isTwoHands = leftLandmarks.length > 0 && rightLandmarks.length > 0;
  
    // Estructura de los datos para enviar
    const data = {
      leftGrabbing,
      rightGrabbing,
      leftFingers,
      rightFingers,
    };
  
    // Llamar a onData con los datos de ambas manos
    if (onData) {
      onData(data);
    }
  };
  const predictWebcam = (handLandmarkerInstance) => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const processFrame = async () => {
      if (video.readyState === 4 && webcamRunningRef.current) {
        const startTimeMs = performance.now();

        const results = handLandmarkerInstance.detectForVideo(
          video,
          startTimeMs
        );

        // Actualiza el tamaño del canvas y limpia
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Dibuja los resultados
        if (results.landmarks) {
          const HAND_CONNECTIONS = generateHandConnections();
          results.landmarks.forEach((landmarks) => {
            const handSide = determineHandSide(landmarks);

            drawConnectors(ctx, landmarks, HAND_CONNECTIONS, {
              color: "black",
              lineWidth: 5,
            });
            drawLandmarks(ctx, landmarks, { color: "#FF0000", lineWidth: 2 });
            processHandGestures(results, landmarks, handSide);

          });
          /*
          if (results.landmarks.length > 0) {
            console.log("imprimiendo!!!");
            console.log("res: ", results.landmarks[0][8]);
            processHandGestures(results.landmarks[0]);

            if (results.landmarks.length > 1) {
              processHandGestures(results.landmarks[1]);
            }
          }else{
            console.log("no hay nada");
          }
          */
        }
      }

      animationFrameIdRef.current = requestAnimationFrame(processFrame);
    };

    processFrame();
  };

  return (
    <Container>
      <VideoView>
        <VideoContainer>
          <Video ref={videoRef} autoPlay playsInline muted />
          <Canvas ref={canvasRef} />
        </VideoContainer>
      </VideoView>
    </Container>
  );
});

export default HandsRec;
