import Background from '../Background'
import Logo from '../Logo'
import NavMenu from '../NavMenu'
import FooterPage from '../FooterPage';
import MainVoice from '../MainVoice';
function Donaciones() {
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
        <p>DOONNAACCIIOONNEESS</p>
      </div>
      <FooterPage></FooterPage>

    </div>
    
  );
}
export default Donaciones;
