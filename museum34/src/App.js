import './App.css';
import Main from './components/main/Main';
import Colecciones from './components/colecciones/Colecciones';
import Learn from './components/learn/Learn';
import Investigacion from './components/investigacion/Investigacion';
import MuseumVirtual from './VRComponents/MuseumVirtual.js';
import VoiceRecognition from './VRecComponents/VoiceRecognition.js';
import LoginSignUp from './components/learn/LoginSignUp.js';
import ViewerModel  from './components/modalViewer/ViewerModel.js';

import Hands from './VRecComponents/HandsRec.js';


import Prueba from './VRComponents/TransitionAnimation.js';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// test para ver el modal
import Modal3D from './components/DataModels/ModalInformation.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main></Main>}></Route>
        <Route path="/loginsignup" element={<LoginSignUp></LoginSignUp>}></Route>
        <Route path='/colecciones' element={<Colecciones></Colecciones>}></Route>
        <Route path='/colecciones/museo' element={<MuseumVirtual></MuseumVirtual>}></Route>

        <Route path='/educacion' element={<Learn></Learn>}></Route>
        <Route path='/investigacion' element={<Investigacion></Investigacion>}></Route>
        {/*<Route path='/donaciones' element={<Donacion></Donacion>}></Route>*/}

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
      </Routes>
    </Router>
      
  );
}   


export default App;
