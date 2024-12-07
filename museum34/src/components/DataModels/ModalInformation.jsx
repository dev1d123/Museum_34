import React, { useEffect, useState, useRef} from "react";
import "./ModalInformation.css";
import data from "./data.json";
import ThreeViewer from "./ThreeViewer";
import HandsRec from "../../VRecComponents/HandsRec";
import IASpeak from "./IASpeak";

const ModalInformation = ({ isOpen = true, id = 0, onClose = () => {} }) => {

  const [isHandsOpen, setIsHandsOpen] = useState(false);
  const handsRecRef = useRef(null); // Referencia para HandsRec
  const [scale_, setScale] = useState({ x: 2, y: 2, z: 2 }); //escala predeterminada

  const [comments, setComments] = useState([
    { userName: "DemoUser", text: "¡Este modelo está increíble!" },
  ]); 
  const [newComment, setNewComment] = useState(""); 
  const isLogin = localStorage.getItem("loggedIn"); 
  const userName = localStorage.getItem("userName"); 

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, { userName, text: newComment }]);
      setNewComment(""); 
    }
  };


  useEffect(() => {
    if (id === 0) {
      setScale({ x: 0.05, y: 0.05, z: 0.05 });
    } else if(id === 13) {
      setScale({ x: 5, y: 5, z: 5});
    }else{
      setScale({ x: 5, y: 5, z: 5 });
    }
    console.log(scale_)
  }, [scale_]);

  const toggleHands = () => {
    if (isHandsOpen && handsRecRef.current) {
      // Llamar a disableWebCam si se está desactivando la cámara
      handsRecRef.current.disableWebCam();
      
    }
    setIsHandsOpen((prev) => !prev);
    console.log(isHandsOpen ? "Desactivando cámara..." : "Activando cámara...");
  };


  const [modelData, setModelData] = useState({
    title: "Default Model",
    description: "Default description for the model.",
    path: "https://example.com/default_model",
  });

  const [handData, setHandData] = useState({
    leftGrabbing: false,
    rightGrabbing: false,
    leftFingers: [],
    rightFingers: [],
  });
  const handDataRef = useRef({
    leftGrabbing: false,
    rightGrabbing: false,
    leftFingers: [],
    rightFingers: [],
  });
  

  const handleFingerData = (data) => {
    if (data) {
      // Actualizamos los valores de las manos detectadas
      handDataRef.current = {
        leftGrabbing: data.leftGrabbing,
        rightGrabbing: data.rightGrabbing,
        leftFingers: data.leftFingers,
        rightFingers: data.rightFingers,
      };
  
      // También actualizamos el estado
      setHandData({
        leftGrabbing: data.leftGrabbing,
        rightGrabbing: data.rightGrabbing,
        leftFingers: data.leftFingers,
        rightFingers: data.rightFingers,
      });
    }
  };
  const checkDataUpdates = () => {
    /*
    console.log("Revisando datos de las manos...");
    console.log("Mano izquierda está agarrando?: ", handDataRef.current.leftGrabbing);
    console.log("Mano derecha está agarrando?: ", handDataRef.current.rightGrabbing);
    console.log("Dedos de la mano izquierda: ", handDataRef.current.leftFingers);
    console.log("Dedos de la mano derecha: ", handDataRef.current.rightFingers);
    */
  };
  
  useEffect(() => {
    let intervalId;

    if (isHandsOpen) {
      intervalId = setInterval(checkDataUpdates, 100); // Comprobar cada 100 ms mientras esté abierto
    }

    // Limpiar intervalo si se desactiva la cámara
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isHandsOpen]); // Este efecto depende de isHandsOpen

  useEffect(() => {
    // Busca el modelo basado en el ID recibido o usa valores por defecto
    const foundModel = data.find((item) => item.id === id);
    setModelData(foundModel || modelData);
  }, [id]);

  useEffect(() => {
    console.log("Modal abierto:", isOpen); // Confirmar estado del modal
  }, [isOpen]);


  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <div className="modal-content">
          {/* Modelo 3D en el lado izquierdo */}
          <div className="model-viewer">
            <ThreeViewer model={modelData} path={modelData.path} handData={handData} scale_={scale_}/>
          </div>
          <div className="model-description">
            <div>
              <h2>{modelData.title}</h2>
              <p>{modelData.description}</p>
            </div>
            <IASpeak className="btn-leer" title={modelData.title} description={modelData.description}/>

            <div className="camera-space">
              {isHandsOpen && <HandsRec onData={handleFingerData} />}
            </div>
            

            <button onClick={toggleHands}>
              {isHandsOpen ? "Desactivar cámara" : "Activar cámara"}
            </button>
            
            {/* Sección de Comentarios */}
            <div className="comment-section">
              <h3>Comentarios</h3>
              {isLogin ? (
                <div className="comment-form">
                  <textarea
                    placeholder="Escribe tu comentario..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <button onClick={handleAddComment} disabled={!newComment.trim()}>
                    Comentar
                  </button>
                </div>
              ) : (
                <p className="login-prompt">
                  Debes estar registrado para comentar. <a href="/login">Inicia sesión aquí</a>.
                </p>
              )}
              <div className="comment-list">
                {comments.map((comment, index) => (
                  <div key={index} className="comment-item">
                    <strong>{comment.userName}</strong>
                    <p>{comment.text}</p>
                  </div>
                ))}
              </div>
            </div>



          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalInformation;
