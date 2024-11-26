import Background from '../Background'
import Logo from '../Logo'
import './Main.css';
import NavMenu from '../NavMenu'
import ImgCar from './ImgCar';
import FooterPage from '../FooterPage';
import MainVoice from '../MainVoice';
function Main() {
  return (

    <div>
      
      <Background></Background>

      <div className='lgB'>
        <Logo></Logo>
        <NavMenu></NavMenu>
      </div>
      
      <div className="buttonVoice" style={{ position: 'sticky', top: '10px', margin: '10px' }}>
        <MainVoice />
      </div>
      <ImgCar></ImgCar>
      <FooterPage></FooterPage>
      
    </div>
    
  );
}


export default Main;
