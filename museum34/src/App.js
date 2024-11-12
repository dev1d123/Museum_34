import './App.css';
import Main from './components/main/Main';
import Colecciones from './components/colecciones/Colecciones';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main></Main>}></Route>
        <Route path='/colecciones' element={<Colecciones></Colecciones>}></Route>

      </Routes>
    </Router>
      
  );
}


export default App;
