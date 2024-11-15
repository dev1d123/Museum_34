import './App.css';
import Main from './components/main/Main';
import Colecciones from './components/colecciones/Colecciones';
import Learn from './components/learn/Learn';
import Investigacion from './components/investigacion/Investigacion';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main></Main>}></Route>
        <Route path='/colecciones' element={<Colecciones></Colecciones>}></Route>
        <Route path='/prueba' element={<Learn></Learn>}></Route>
        <Route path='/investigacion' element={<Investigacion></Investigacion>}></Route>
      </Routes>
    </Router>
      
  );
}   


export default App;
