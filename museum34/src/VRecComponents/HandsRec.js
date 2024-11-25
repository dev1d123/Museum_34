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

const HandsRec = forwardRef((props, ref) => {
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


  const disableWebCam = async () =>{
    webcamRunningRef.current = false;
  }

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
      console.log("Es la mano derecha.");
      return "derecha";
    } else if (isLeftHand) {
      console.log("Es la mano izquierda.");
      return "izquierda";
    } else {
      console.log("No se pudo determinar la mano.");
      return "desconocida";
    }
  };

  const processHandGestures = (landmarks) => {
    var handSide = determineHandSide(landmarks);
    
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
    const threshold = 0.4; //umbral de distancia

    const calculateDistance = (x1, y1, x2, y2) => {
      return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    };

    const distances = {
      thumb: calculateDistance(landmarks[0].x, landmarks[0].y, landmarks[4].x, landmarks[4].y),
      index: calculateDistance(landmarks[0].x, landmarks[0].y, landmarks[8].x, landmarks[8].y),
      middle: calculateDistance(landmarks[0].x, landmarks[0].y, landmarks[12].x, landmarks[12].y),
      ring: calculateDistance(landmarks[0].x, landmarks[0].y, landmarks[16].x, landmarks[16].y),
      pinky: calculateDistance(landmarks[0].x, landmarks[0].y, landmarks[20].x, landmarks[20].y),
    };

    const isGrabbing =
      distances.thumb < threshold &&
      distances.index < threshold &&
      distances.middle < threshold &&
      distances.ring < threshold &&
      distances.pinky < threshold;

    if (isGrabbing) {
      console.log("Gesto detectado: AGARRE (puño cerrado)");
    } else {
      console.log("La mano no está en posición de agarre.");
    }

    console.log("Distancias de los dedos a la muñeca:", distances);
      
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
            drawConnectors(ctx, landmarks, HAND_CONNECTIONS, {
              color: "black",
              lineWidth: 5,
            });
            drawLandmarks(ctx, landmarks, { color: "#FF0000", lineWidth: 2 });
          });

          if (results.landmarks.length > 0) {
            console.log("imprimiendo!!!");
            console.log("res: ", results.landmarks[0][8]);
            processHandGestures(results.landmarks[0]);
          }else{
            console.log("no hay nada");
          }
          //console.clear()
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
