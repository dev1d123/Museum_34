// LoginSignUp.js
import React, { useState } from 'react';
import styled from 'styled-components';
import FbImg from './images/icon/fb2.png';
import InsImg from './images/icon/insta2.png';
import tt2Img from './images/icon/tt2.png';
import user from './images/icon/user.png';
import password from "./images/icon/password.png";
import google from "./images/icon/google.png";
import Logo from '../Logo.js';
import backgroundWallpaper from './images/extra/backwallpaper.jpg';

const LoginSignUp = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Great Job!");
  };

  return (
    <Container>
      <Logo></Logo>
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
        
        {/* Login Form */}
        {isLogin && (
          <Form onSubmit={handleSubmit}>
            <InputWrapper>
              <img src={user} alt="user icon" />
              <Input type="text" placeholder="Nombre de usuario" required />
            </InputWrapper>
            <InputWrapper>
              <img src={password} alt="password icon" />
              <Input type="password" placeholder="Contraseña" required />
            </InputWrapper>
            <InlineDiv>
              <CheckBox type="checkbox" /> Recordar contraseña
            </InlineDiv>
            <SubmitButton type="submit">Iniciar sesion</SubmitButton>
          </Form>
        )}

        {/* Registration Form */}
        {!isLogin && (
          <Form onSubmit={handleSubmit}>
            <Input type="text" placeholder="Nombre completo" required />
            <Input type="email" placeholder="Correo electronico" required />
            <Input type="password" placeholder="Crear contraseña" required />
            <Input type="password" placeholder="Confirmar contraseña" required />
            <InlineDiv>
              <CheckBox type="checkbox" /> Acepto los terminos y condiciones
            </InlineDiv>
            <SubmitButton type="submit">Registrarse</SubmitButton>

          </Form>
        )}

        <Other>
          <Separator>Tambien</Separator>
          <ConnectButton onClick={() => alert('Sign in with Google')}>
            <img src={google} alt="google icon" />
            <span>Utiliza tu cuenta de Google</span>
          </ConnectButton>
        </Other>
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
