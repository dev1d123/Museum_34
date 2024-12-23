import React, { useEffect, useState, useRef} from "react";
import "./ModalInformation.css";
import data from "./data.js";
import ThreeViewer from "./ThreeViewer";
import HandsRec from "../../VRecComponents/HandsRec";
import IASpeak from "./IASpeak";
import api from "../../api/axios";
const ModalInformation = ({ isOpen = true, id = 0, onClose = () => {} }) => {

  const [isFavorite, setIsFavorite] = useState(false); 
  const [favoriteMessage, setFavoriteMessage] = useState("");
    
  const [isHandsOpen, setIsHandsOpen] = useState(false);
  const handsRecRef = useRef(null); // Referencia para HandsRec
  const [scale_, setScale] = useState({ x: 2, y: 2, z: 2 }); //escala predeterminada
  const [bright, setBright] = useState(100); // Brillo predeterminado

  const [comments, setComments] = useState([
    { commentID: 1, userName: "DemoUser", text: "¡Este modelo está increíble!", userID: 0, fecha: null, deleteable: false },
  ]); 
  const [newComment, setNewComment] = useState(""); 
  const isLogin = localStorage.getItem("loggedIn"); 
  const userName = localStorage.getItem("userName"); 
  const uID = localStorage.getItem("loggedIn"); 

  const handleDeleteComment = async (commentID) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este comentario?")) {
      try {
        await api.delete(`/comentarios/${commentID}/`);
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.commentID !== commentID)
        );
        } catch (error) {
          alert("Error al eliminar el comentario:", commentID);
        }
    }
  };
  
  const fetchUserName = async (userID) => {
    try {
      const response = await api.get(`/usuarios/${userID}`); 
      return response.data.nombre; 
    } catch (error) {
      console.error(`Error al obtener el nombre del usuario con ID ${userID}:`, error);
      return "Usuario desconocido"; 
    }
  };
  useEffect(() => {
    const fetchComentarios = async () => {
      try {
        const response = await api.get("/comentarios/");
        const filteredComments = await Promise.all(
          response.data
            .filter((comment) => comment.modelo === id)
            .map(async (comment) => {
              const userName = await fetchUserName(comment.usuario);
              return {
                userName, 
                text: comment.texto,
                userID: comment.usuario,
                fecha: comment.fecha,
                deleteable: parseInt(uID) === comment.usuario, // Compara como número
                commentID: comment.id,
              };
            })
        );

        setComments(filteredComments);
      } catch (error) {
        console.error("Error al cargar comentarios desde la base de datos:", error);
      }
    };

    fetchComentarios();
  }, [id, uID]); 

  const handleAddComment = async () => {
    if (newComment.trim()) {
      const commentPayload = {
        modelo: id, // ID del modelo relacionado con el comentario
        texto: newComment, // Texto del comentario
        usuario: uID, // ID del usuario que comentó
        fecha: new Date().toISOString(), // Fecha actual en formato ISO
      };
  
      try {
        // Enviar el comentario al servidor
        const response = await api.post("/comentarios/", commentPayload);
  
        // Si la solicitud fue exitosa, agregar el comentario al estado
        const addedComment = {
          commentID: response.data.id, // ID generado por el servidor
          userName, // Nombre del usuario
          text: newComment, // Texto del comentario
          userID: parseInt(uID), // ID del usuario como número
          fecha: new Date().toLocaleString(), // Fecha formateada para mostrar
          deleteable: true, // Solo el usuario actual puede eliminar su comentario
        };
  
        setComments((prevComments) => [...prevComments, addedComment]); 
        setNewComment(""); 
      } catch (error) {
        console.error("Error al agregar el comentario:", error);
        alert("Hubo un problema al agregar tu comentario. Inténtalo de nuevo.");
      }
    }
  };


  const handleAddFavorite = async () => {
    if (!isLogin) {
      setFavoriteMessage("Debes iniciar sesión para agregar a favoritos.");
      setTimeout(() => setFavoriteMessage(""), 3000); 
      return;
    }
  
    try {
      const response = await api.get("/favoritos/");
      const userFavorites = response.data.filter((fav) => fav.usuario === parseInt(uID));
      const alreadyFavorite = userFavorites.some((fav) => fav.modelo === id);
  
      if (alreadyFavorite) {
        setFavoriteMessage("Este modelo ya está en tus favoritos.");
      } else {
        const payload = {
          usuario: parseInt(uID), 
          modelo: id, 
          fecha_agregado: new Date().toISOString(),
        };
        await api.post("/favoritos/", payload);
        setFavoriteMessage("¡Modelo agregado a favoritos!");
        setIsFavorite(true); 
      }
    } catch (error) {
      console.error("Error al agregar a favoritos:", error);
      setFavoriteMessage("Hubo un error al agregar a favoritos. Inténtalo de nuevo.");
    }
  
    setTimeout(() => setFavoriteMessage(""), 3000); 
  };
  useEffect(() => {
    const checkIfFavorite = async () => {
      try {
        const response = await api.get("/favoritos/");

        const userFavorites = response.data.filter((fav) => fav.usuario === parseInt(uID));
        const isFav = userFavorites.some((fav) => fav.modelo === id);
        setIsFavorite(isFav); 

      } catch (error) {
        console.error("Error al verificar si el modelo es favorito:", error);
      }
    };
  
    if (isLogin) {
      checkIfFavorite();
    }
  }, [id, uID, isLogin]);
  


  useEffect(() => {
    if (id === 0) {
      setScale({ x: 0.05, y: 0.05, z: 0.05 });
    } else if (id <= 12) {
      setScale({ x: 0.1, y: 0.1, z: 0.1 });
      setBright(300); 
    } else if (id === 13) {
      setScale({ x: 5, y: 5, z: 5 });
      setBright(100); 
    } else if (id === 18) {
      setScale({ x: 2, y: 2, z: 2 });
      setBright(100); 
    } else if (id === 19) {
      setScale({ x: 2, y: 2, z: 2 });
      setBright(100);
    } else if (id === 20) {
      setScale({ x: 0.05, y: 0.05, z: 0.05 });
      setBright(100);
    } else {
      setScale({ x: 5, y: 5, z: 5 });
      setBright(100);
    }
  }, [id]); 

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
          
        <div className="favorite-section">
          {isLogin ? (
            <button onClick={handleAddFavorite} disabled={isFavorite}>
              {isFavorite ? "Ya está en tus favoritos" : "Agregar a favoritos"}
            </button>
          ) : (
            <p className="login-prompt">
              Debes estar registrado para agregar a favoritos. <a href="/login">Inicia sesión aquí</a>.
            </p>
          )}
          {favoriteMessage && <p className="favorite-message">{favoriteMessage}</p>}
        </div>
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
                      <small className="comment-date">
                        {comment.fecha
                          ? new Date(comment.fecha).toLocaleString() 
                          : "Fecha no disponible"}
                      </small>
                      {comment.deleteable && (
                        <button
                          className="delete-btn"
                          onClick={() => handleDeleteComment(comment.commentID)}
                        >
                          Eliminar comentario
                        </button>
                      )}
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
