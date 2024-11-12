import Background from '../Background'
import Logo from '../Logo'
import './Colecciones.css';
import NavMenu from '../NavMenu'
import FooterPage from '../FooterPage';
function Colecciones() {
  return (

    <div>
      
      <Background></Background>
      <div className='lgB'>
        <Logo></Logo>
        <NavMenu></NavMenu>
      </div>
      <div>
        Esta es la seccion de colecciones!!!
      </div>
      <FooterPage></FooterPage>

    </div>
    
  );
}
export default Colecciones;
