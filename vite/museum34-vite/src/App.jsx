import './App.css';
import Main from './components/main/Main.jsx';
import Colecciones from './components/colecciones/Colecciones.jsx';
import Investigacion from './components/investigacion/Investigacion.jsx';
import MuseumVirtual from './VRComponents/MuseumVirtual.jsx';
import VoiceRecognition from './VRecComponents/VoiceRecognition.jsx';
import LoginSignUp from './components/learn/LoginSignUp.jsx';
import ViewerModel  from './components/modalViewer/ViewerModel.jsx';
import Donacion from './components/donaciones/Donaciones.jsx';

import Hands from './VRecComponents/HandsRec.jsx';


import Prueba from './VRComponents/TransitionAnimation.jsx';

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// test para ver el modal
import Modal3D from './components/DataModels/ModalInformation.jsx';

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Main></Main>}></Route>
        <Route path="/iniciar-sesion" element={<LoginSignUp isLogin={true} />} />
        <Route path="/registrarse" element={<LoginSignUp isLogin={false} />} />

        <Route path='/colecciones' element={<Colecciones></Colecciones>}></Route>
        <Route path='/colecciones/museo' element={<MuseumVirtual></MuseumVirtual>}></Route>

        <Route path='/investigacion' element={<Investigacion></Investigacion>}></Route>
        <Route path='/donaciones' element={<Donacion></Donacion>}></Route>

        <Route path='/test' element={<MuseumVirtual></MuseumVirtual>}></Route>

        <Route path='/voice' element={<VoiceRecognition></VoiceRecognition>}></Route>
                                     
                                     


        {/* Ruta para ver el modal */}
        <Route path='/modal' element={<Modal3D></Modal3D>}> </Route>

        <Route
          path="/hands"
          element={<Hands></Hands>}
        />

        <Route
          path="/viewer"
          element={<ViewerModel></ViewerModel>}
        />

        <Route
          path="/pr"
          element = {<Prueba></Prueba>}
        ></Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
      
  );
}   


export default App;
