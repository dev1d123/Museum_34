import Background from '../Background'
import Logo from '../Logo'
import './Colecciones.css';
import NavMenu from '../NavMenu'
import FooterPage from '../FooterPage';
import MainContent from '../components/MainContent';
function Colecciones() {
  return (

    <div>
      
      <Background></Background>
      <div className='lgB'>
        <Logo></Logo>
        <NavMenu></NavMenu>
      </div>
      <div className='main-content'>
        <div className='container-main'>
            <MainContent></MainContent>
        </div>
      </div>
      <FooterPage></FooterPage>

    </div>
    
  );
}
export default Colecciones;
