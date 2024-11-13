import './App.css';
import Main from './components/main/Main';
import Colecciones from './components/colecciones/Colecciones';
import LoginSignUp from './components/learn/LoginSignUp';


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main></Main>}></Route>
        <Route path='/colecciones' element={<Colecciones></Colecciones>}></Route>
        <Route path='/prueba' element={<LoginSignUp></LoginSignUp>}></Route>
      </Routes>
    </Router>
      
  );
}


export default App;
