import Background from '../Background'
import Logo from '../Logo'
import './Investigacion.css';
import NavMenu from '../NavMenu'
import FooterPage from '../FooterPage';
import MainContent from '../components/MainContent';
import MainVoice from '../MainVoice';
import Latest from '../components/Latest';
function Investigacion() {
  return (

    <div>
        <div className="buttonVoice" style={{ position: 'sticky', top: '10px', margin: '10px' }}>
          <MainVoice />
        </div>
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
