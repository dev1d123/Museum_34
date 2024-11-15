import Background from '../Background'
import Logo from '../Logo'
import './Investigacion.css';
import NavMenu from '../NavMenu'
import FooterPage from '../FooterPage';
import MainContent from '../components/MainContent';
import Latest from '../components/Latest';
function Investigacion() {
  return (

    <div>
      
      <Background></Background>
      <div className='lgB'>
        <Logo></Logo>
        <NavMenu></NavMenu>
      </div>
      <div className='main-content'>
        <div className='container-main'>
            <Latest></Latest>
        </div>
      </div>
      <FooterPage></FooterPage>

    </div>
    
  );
}
export default Investigacion;
