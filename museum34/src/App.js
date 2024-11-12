import './App.css';
import Main from './components/main/Main';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Main></Main>}></Route>
      </Routes>
    </Router>
      
  );
}


export default App;
