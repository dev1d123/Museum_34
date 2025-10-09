// LoginSignUp.js
import React, { useState } from 'react';
import styled from 'styled-components';
import FbImg from './images/icon/fb2.png';
import InsImg from './images/icon/insta2.png';
import tt2Img from './images/icon/tt2.png';
import user from './images/icon/user.png';
import password from "./images/icon/password.png";
import google from "./images/icon/google.png";
import Logo from '../Logo.jsx';
import backgroundWallpaper from './images/extra/backwallpaper.jpg';
import api from '../../api/axios.js';
import { useNavigate } from 'react-router-dom';

// Otros imports
const Popup = ({ message, onClose }) => {
  return (
    <PopupContainer>
      <PopupContent>
        <p>{message}</p>
        <button onClick={onClose}>Cerrar</button>
      </PopupContent>
    </PopupContainer>
  );
};

const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const PopupContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  p {
    margin-bottom: 10px;
    font-size: 18px;
    color: #333;
  }

  button {
    padding: 10px 20px;
    background: linear-gradient(to right, #43A047, #2E7D32);
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
`;

const LoginSignUp = ({ isLogin: initialIsLogin }) => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(initialIsLogin);
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const nombre = formData.get('nombre');
    const email = formData.get('email'); 
    const clave = formData.get('password');
    const clave2 = formData.get('confirm_password');

    if (!isLogin) {
      if (clave !== clave2) {
        setPopupMessage('Las contraseñas son distintas.');
        setShowPopup(true);
        return;
      }
      try {
        const response = await api.post('/usuarios/', {
          nombre: nombre,
          email: email,
          clave: clave,
        });
        setPopupMessage(`Usuario creado con éxito: ${response.data.nombre}`);
        setShowPopup(true);
        
        localStorage.setItem('loggedIn', response.data.id);
        localStorage.setItem('userName', response.data.nombre);
        localStorage.setItem('userEmail', response.data.email);
        navigate('/');

        //redirigir a la pagina principal logueado!
        
      } catch (error) {
        setPopupMessage('Error al registrar el usuario. Por favor, inténtalo de nuevo.');
        setShowPopup(true);
      }
    } else {
      // Lógica para iniciar sesión
      const loginEmail = formData.get('email');
      const loginClave = formData.get('password');
      try {
        const response = await api.get('/usuarios');
        const usuario = response.data.find(
          (user) => user.email === loginEmail && user.clave === loginClave
        );
      
        if (usuario) {
          setPopupMessage(`¡Bienvenido, ${usuario.nombre}!`);
        } else {
          setPopupMessage('Usuario no encontrado. Verifica tus credenciales.');
        }
        setShowPopup(true);

        //redirigir a la pagina principal logeado
        localStorage.setItem('loggedIn', usuario.id);
        localStorage.setItem('userName', usuario.nombre);
        localStorage.setItem('userEmail', usuario.email);
        navigate('/');

      } catch (error) {
        setPopupMessage('Error al iniciar sesión. Verifica tus credenciales.');
        setShowPopup(true);
      }
    }
  };

  return (
    <Container>
      <Logo />
      <FormBox>
        <ButtonBox>
          <ToggleBtn onClick={() => setIsLogin(true)} active={isLogin}>
            Iniciar sesión
          </ToggleBtn>
          <ToggleBtn onClick={() => setIsLogin(false)} active={!isLogin}>
            Registrarse
          </ToggleBtn>
          <BtnBackground active={isLogin} />
        </ButtonBox>
        <SocialIcons>
          <img src={FbImg} alt="Facebook" />
          <img src={InsImg} alt="Instagram" />
          <img src={tt2Img} alt="Twitter" />
        </SocialIcons>

        {isLogin && (
          <Form onSubmit={handleSubmit}>
            <Input name="email" type="email" placeholder="Correo electrónico" required />
            <Input name="password" type="password" placeholder="Contraseña" required />
            <InlineDiv>
              <CheckBox type="checkbox" /> Recordar contraseña
            </InlineDiv>
            <SubmitButton type="submit">Iniciar sesión</SubmitButton>
          </Form>
        )}

        {!isLogin && (
          <Form onSubmit={handleSubmit}>
            <Input name="nombre" type="text" placeholder="Nombre completo" required />
            <Input name="email" type="email" placeholder="Correo electrónico" required />
            <Input name="password" type="password" placeholder="Crear contraseña" required />
            <Input name="confirm_password" type="password" placeholder="Confirmar contraseña" required />
            <InlineDiv>
              <CheckBox name="terms" type="checkbox" required /> Acepto los términos y condiciones
            </InlineDiv>
            <SubmitButton type="submit">Registrarse</SubmitButton>
          </Form>
        )}

        {showPopup && <Popup message={popupMessage} onClose={handlePopupClose} />}
      </FormBox>
    </Container>
  );
};

export default LoginSignUp;

// Styled components

const InlineDiv = styled.div`
  display: flex; 
  justify-content: center;
  text-align: center;
  align-items: center;
  gap: 30px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  background-image: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5)), url(${backgroundWallpaper});
  background-size: cover;
  background-attachment: fixed;
  height: 100vh;
`;

const FormBox = styled.div`
  width: 380px;
  background: rgba(255, 255, 255, 0.5);
  padding: 5px;
  border-radius: 5px;
  margin: 6% auto;
  box-shadow: 0px 0px 100px rgba(0,0,0,0.4);
  position: relative;
`;

const ButtonBox = styled.div`
  width: 220px;
  margin: 35px auto;
  display: flex;
  position: relative;
  border-radius: 30px;
  overflow: hidden;
  box-shadow: 0 0 20px 9px rgba(0,0,0,.1);
`;

const ToggleBtn = styled.button`
  flex: 1;
  padding: 10px 30px;
  cursor: pointer;
  border: none;
  background: transparent;
  color: ${({ active }) => (active ? '#fff' : '#000')};
  border-radius: 30px;
  z-index: 1;
`;

const BtnBackground = styled.div`
  position: absolute;
  width: 50%;
  height: 100%;
  background: linear-gradient(to right, #43A047, #2E7D32);
  left: ${({ active }) => (active ? '0' : '50%')};
  transition: 0.5s;
`;

const SocialIcons = styled.div`
  margin: 30px auto;
  text-align: center;

  img {
    width: 40px;
    margin: 0 7px;
    cursor: pointer;
    opacity: 0.85;
  }
`;

const Form = styled.form`
  position: relative;
  width: 280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
    ::placeholder {
    color: #3c3c3c;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0;

  img {
    width: 20px;
    padding-right: 10px;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: none;
  outline: none;
  background: transparent;
  border-bottom: 1px solid rgba(0,0,0,0.4);

  ::placeholder {
    color: black;
  }
`;

const CheckBox = styled.input`
  margin: 20px 0;
  cursor: pointer;
`;

const SubmitButton = styled.button`
  width: 85%;
  margin: auto;
  padding: 10px 30px;
  cursor: pointer;
  background: linear-gradient(to right, #43A047, #2E7D32);
  color: #fff;
  border: none;
  outline: none;
  border-radius: 30px;
`;

const Other = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const Separator = styled.h3`
  display: flex;
  align-items: center;
  text-align: center;
  color: rgba(0,0,0,0.6);
  margin: 10px 0;

  &::before, &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(0,0,0,0.5);
    margin: 0 10px;
  }
`;

const ConnectButton = styled.button`
  display: flex;
  align-items: center;
  padding: 5px 20px;
  cursor: pointer;
  border: 1px solid lightgray;
  background: transparent;
  outline: none;

  img {
    width: 25px;
    margin-right: 10px;
  }

  span {
    font-size: 15px;
  }
`;
