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
});

export default HandsRec;
