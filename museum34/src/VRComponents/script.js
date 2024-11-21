

console.log("script.js cargado");
/*
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const toggleButton = document.getElementById("toggleButton");
const ctx = canvas.getContext("2d");

let stream = null;
let isCameraActive = false;
let handposeModel = null;

//iniciar camara
async function setupCamera() {
    stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 }
    });
    video.srcObject = stream;
    return new Promise((resolve) => {
        video.onloadedmetadata = () => {
            resolve(video);
        };
    });
}

async function loadHandposeModel() {
    //uso de api de tensorflow
    handposeModel = await handpose.load();
    video.style.display="none";
    console.log("Modelo de HandPose cargado");
}

async function detectHands() {
    //predicciones con el video...
    const predictions = await handposeModel.estimateHands(video, { flipHorizontal: true });
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (predictions.length > 0) {
        predictions.forEach(prediction => {
            const landmarks = prediction.landmarks;
            drawHand(landmarks);
        });
    }
    //request more predictions
    if (isCameraActive) {
        requestAnimationFrame(detectHands);
    }
}
//to draw the prediction
function drawHand(landmarks) {
    console.log(landmarks);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //Tensorflow detecta 21 puntos, se crean pares para dibujar
    const fingerConnections = [
        [0, 1], [1, 2], [2, 3], [3, 4],     
        [0, 5], [5, 6], [6, 7], [7, 8],     
        [0, 9], [9, 10], [10, 11], [11, 12], 
        [0, 13], [13, 14], [14, 15], [15, 16], 
        [0, 17], [17, 18], [18, 19], [19, 20]  
    ];

    const colors = ["yellow", "orange", "red", "blue", "purple", "green"];

    ctx.strokeStyle = "white";
    ctx.lineWidth = 4;
    //dibujar conexiones
    fingerConnections.forEach(([start, end]) => {
        const [x1, y1] = landmarks[start];
        const [x2, y2] = landmarks[end];
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    });

    landmarks.forEach(([x, y], index) => {
        ctx.fillStyle = colors[index % colors.length];
        ctx.beginPath();
        ctx.arc(x, y, index === 0 ? 10 : 5, 0, 2 * Math.PI); 
        ctx.fill();
    });
}

async function toggleCamera() {
    if (isCameraActive) {
        stream.getTracks().forEach(track => track.stop());
        video.srcObject = null;
        toggleButton.textContent = "Activar Cámara";
        isCameraActive = false;
    } else {
        //prender camara
        await setupCamera();
        //cargar la api de tensorflow
        await loadHandposeModel();
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        //predecir, esta funcion es recursiva...
        detectHands(); 
        toggleButton.textContent = "Desactivar Cámara";
        isCameraActive = true;
    }
}

toggleButton.addEventListener("click", toggleCamera);

*/