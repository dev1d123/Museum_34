import './App.css';
import Main from './components/main/Main';
import Colecciones from './components/colecciones/Colecciones';
import Learn from './components/learn/Learn';
import Investigacion from './components/investigacion/Investigacion';
import MuseumVirtual from './VRComponents/MuseumVirtual.js';
import VoiceRecognition from './VRecComponents/VoiceRecognition.js';

import Hands from './VRecComponents/HandsRec.js';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main></Main>}></Route>
        <Route path='/colecciones' element={<Colecciones></Colecciones>}></Route>
        <Route path='/educacion' element={<Learn></Learn>}></Route>
        <Route path='/investigacion' element={<Investigacion></Investigacion>}></Route>
        {/*<Route path='/donaciones' element={<Donacion></Donacion>}></Route>*/}

        <Route path='/test' element={<MuseumVirtual></MuseumVirtual>}></Route>
        <Route path='/voice' element={<VoiceRecognition></VoiceRecognition>}></Route>
        <Route
          path="/hands"
          element={<Hands></Hands>}
        />
      </Routes>
    </Router>
      
  );
}   


export default App;
