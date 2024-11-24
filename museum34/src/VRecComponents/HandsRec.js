import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import {
  HandLandmarker,
  FilesetResolver,
} from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0";
import {
  drawConnectors,
  drawLandmarks,
} from "@mediapipe/drawing_utils";

const Container = styled.div`
  font-family: "Roboto", sans-serif;
  margin: 0 auto;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw; /* Ancho completo del viewport */
  height: 100vh; /* Altura completa del viewport */
  background-color: #000; /* Fondo negro para resaltar el video */
`;

const VideoView = styled.div`
  position: relative;
  width: auto; /* Deja que el ancho se ajuste al contenido */
  height: auto; /* Deja que el alto se ajuste al contenido */
  max-width: 100%; /* Asegúrate de que no desborde el ancho del viewport */
  max-height: 100%; /* Asegúrate de que no desborde el alto del viewport */
`;

const VideoContainer = styled.div`
  position: relative;
  display: inline-block;
  width: auto; /* Ajusta automáticamente según el tamaño del video */
  height: auto; /* Ajusta automáticamente según el tamaño del video */
`;

const Video = styled.video`
  display: block;
  max-width: 100%; /* Escala para que quepa dentro del viewport */
  max-height: 100%; /* Escala para que quepa dentro del viewport */
  transform: rotateY(180deg); /* Reflejo horizontal */
`;

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  max-width: 100%; /* Asegúrate de que el canvas no sea más grande que el video */
  max-height: 100%; /* Asegúrate de que el canvas no sea más grande que el video */
  transform: rotateY(180deg); /* Reflejo horizontal */
`;


const HandsRec = () => {
  const [handLandmarker, setHandLandmarker] = useState(null);
  const webcamRunningRef = useRef(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const animationFrameIdRef = useRef(null);

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

    return () => {
      // Limpieza
      webcamRunningRef.current = false;
      cancelAnimationFrame(animationFrameIdRef.current);
      const tracks = videoRef.current?.srcObject?.getTracks();
      if (tracks) {
        tracks.forEach((track) => track.stop());
      }
      if (handLandmarker) {
        handLandmarker.close();
        console.log("HandLandmarker closed.");
      }
    };
  }, []);

  const enableWebcam = async (handLandmarkerInstance) => {
    try {
      console.log("Enabling webcam...");
      const video = videoRef.current;
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      video.srcObject = stream;

      video.addEventListener("loadeddata", () => {
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

          console.log("Landmarks drawn:", results.landmarks);
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
};

export default HandsRec;
