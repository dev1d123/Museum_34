import logo from './logo.svg';
import './App.css';
import Logo from './components/Logo';
import NavMenu from './components/NavMenu';
import ImgCar from './components/ImgCar';
import FooterPage from './components/FooterPage';
import Blog from './components/Blog';

import Background from './components/Background';
function App() {
  return (

    <div>
      <Logo/>
      <NavMenu/>
      <br></br>
      <ImgCar/>

      <br></br>
      <Background></Background>

      <br></br>
      <Blog/>
      <FooterPage/>
    </div>
    
  );
}


export default App;
