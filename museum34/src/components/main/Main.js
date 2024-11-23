import Background from '../Background'
import Logo from '../Logo'
import './Main.css';
import NavMenu from '../NavMenu'
import ImgCar from './ImgCar';
import FooterPage from '../FooterPage';
function Main() {
  return (

    <div>
      
      <Background></Background>
      <div className='lgB'>
        <Logo></Logo>
        <NavMenu></NavMenu>
      </div>
      
      <ImgCar></ImgCar>
      <FooterPage></FooterPage>
      
      {/* Aqui va ir el test para que salga el modal  */}

    </div>
    
  );
}


export default Main;
