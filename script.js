const video = document.getElementById("video");
const toggleButton = document.getElementById("toggleButton");

let stream = null; 
let isCameraActive = false; 


function toggleCamera() {
    if (isCameraActive) {
        stream.getTracks().forEach(track => track.stop()); 
        video.srcObject = null;
        toggleButton.textContent = "Activar Cámara"; 
    } else {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((mediaStream) => {
                stream = mediaStream; 
                video.srcObject = stream; 
                toggleButton.textContent = "Desactivar Cámara"; 
            })
            .catch((error) => {
                console.error("Error al acceder a la cámara", error);
            });
    }
    isCameraActive = !isCameraActive; 
}

toggleButton.addEventListener("click", toggleCamera);
