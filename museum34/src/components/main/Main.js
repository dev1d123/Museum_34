import Background from '../Background'
import Logo from '../Logo'
import './Main.css';
import NavMenu from '../NavMenu'
import ImgCar from './ImgCar';
import Hero from './Hero';

import FooterPage from '../FooterPage';
import MainVoice from '../MainVoice';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import React, { useState, useRef, useEffect } from "react";

function Main() {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await api.get('/usuarios/');
        console.log(response);
        setUsuarios(response.data); 
      } catch (error) {
        console.error("Error al obtener usuarios: ", error);
      }
    };

    fetchUsuarios();
  }, []); 




  const handleNavigate = () =>{
    navigate('/colecciones/museo');
  };

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
      <Hero/>

      <div className='buttonAcc'>
        <button className="button" onClick={handleNavigate}>
          <span className="hover-text" data-text="Accede al museo virtual, aqui!!!"></span>
          Accede al museo virtual, aqui!!!
        </button>

      </div>
      <FooterPage></FooterPage>
      
    </div>
    
  );
}


export default Main;
