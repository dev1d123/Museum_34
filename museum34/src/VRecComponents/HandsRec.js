import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import {
  HandLandmarker,
  FilesetResolver,
} from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0";
import {
    drawConnectors,
    drawLandmarks,
    HAND_CONNECTIONS,
  } from "@mediapipe/drawing_utils";

const Container = styled.div`
  font-family: "Roboto", sans-serif;
  margin: 2em;
  color: #3d3d3d;
`;

const Title = styled.h1`
  color: #007f8b;
`;

const Section = styled.section`
  opacity: 1;
  transition: opacity 500ms ease-in-out;

  &.invisible {
    opacity: 0.2;
  }
`;

const Subtitle = styled.h2`
  clear: both;
`;

const Paragraph = styled.p`
  font-style: italic;
  font-size: 1.3em;
`;

const VideoView = styled.div`
  position: relative;
  float: left;
  width: 48%;
  margin: 2% 1%;
`;

const WebcamButton = styled.button`
  background: #007f8b;
  color: #f1f3f4;
  padding: 0.5em 1em;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  font-weight: bold;

  &:hover {
    background: #005f6b;
  }
`;

const VideoContainer = styled.div`
  position: relative;
`;

const Video = styled.video`
  display: block;
  transform: rotateY(180deg);
`;

const Canvas = styled.canvas`
  position: absolute;
  left: 0;
  top: 0;
  transform: rotateY(180deg);
`;

const HandsRec = () => {
  const [handLandmarker, setHandLandmarker] = useState(null);
  const webcamRunningRef = useRef(false); // Referencia para el estado de la cámara
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const animationFrameIdRef = useRef(null);

  // Inicializa HandLandmarker
  useEffect(() => {
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
      } catch (error) {
        console.error("Error initializing HandLandmarker:", error);
      }
    };

    createHandLandmarker();

    return () => {
      if (handLandmarker) {
        handLandmarker.close();
        console.log("HandLandmarker closed.");
      }
    };
  }, []);

  const enableCam = async () => {
    if (!handLandmarker) {
      alert("HandLandmarker is not initialized yet!");
      console.error("HandLandmarker not ready.");
      return;
    }

    try {
      console.log("Enabling webcam...");
      const video = videoRef.current;
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      video.srcObject = stream;

      video.addEventListener("loadeddata", () => {
        alert("Webcam loaded. Starting detection!");
        webcamRunningRef.current = true; // Actualiza la referencia
        predictWebcam();
      });
    } catch (error) {
      console.error("Error accessing webcam:", error);
      alert("Error accessing webcam. Check permissions.");
    }
  };
  const generateHandConnections = () => [
    [0, 1], [1, 2], [2, 3], [3, 4], // Pulgar
    [0, 5], [5, 6], [6, 7], [7, 8], // Indice
    [5, 9], [9, 10], [10, 11], [11, 12], // Medio
    [9, 13], [13, 14], [14, 15], [15, 16], // Anular
    [13, 17], [17, 18], [18, 19], [19, 20], // Meñique
    [0, 17], //muñeca
  ];
  
  const predictWebcam = async () => {
    if (!handLandmarker) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const processFrame = async () => {
      if (video.readyState === 4 && webcamRunningRef.current) {
        const startTimeMs = performance.now();

        const results = handLandmarker.detectForVideo(video, startTimeMs);

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
            console.log(HAND_CONNECTIONS);
            drawLandmarks(ctx, landmarks, { color: "#FF0000", lineWidth: 2 });
          });
          
          console.log("Landmarks drawn:", results.landmarks);
        }
      }

      animationFrameIdRef.current = requestAnimationFrame(processFrame);
    };

    processFrame();
  };

  useEffect(() => {
    return () => {
      webcamRunningRef.current = false; // Detener cuando el componente se desmonte
      cancelAnimationFrame(animationFrameIdRef.current);
      const tracks = videoRef.current?.srcObject?.getTracks();
      if (tracks) {
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <Container>
      <Title>Hand Landmark Detection using MediaPipe</Title>
      <Section>
        <Subtitle>Webcam Continuous Hand Landmark Detection</Subtitle>
        <Paragraph>
          Hold your hand in front of your webcam to see real-time hand landmark
          detection. Click <b>Enable Webcam</b> below and grant access if
          prompted.
        </Paragraph>
        <VideoView>
          <WebcamButton onClick={enableCam}>ENABLE WEBCAM</WebcamButton>
          <VideoContainer>
            <Video ref={videoRef} autoPlay playsInline muted />
            <Canvas ref={canvasRef} />
          </VideoContainer>
        </VideoView>
      </Section>
    </Container>
  );
};

export default HandsRec;
