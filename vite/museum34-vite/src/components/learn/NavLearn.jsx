import React, { useState } from 'react';
import styled from 'styled-components';

import search from "./images/icon/search.png";
import menu from "./images/icon/menu.png";
import close from "./images/icon/close.png";

const Header = styled.header`
    border: 2px solid rgba(0, 0, 0, 0.5);
    width: 100%;
    position: absolute;
    top: 100px;
`;

const Nav = styled.nav`

    padding-top: 20px;
    padding-bottom: 20px;
    top: 0;
    right: 200px;
    position: fixed;
    display: flex;
    width: 100%;
    z-index: 100000;
    background: #fff;
    justify-content: space-around;
    transition: 1.5s;
    align-items: center;



    /* Estilos anidados */
    ul {
        display: flex;
        align-items: center;
    }
    ul li {
        list-style: none;
        margin: 5px 10px;
    }
    ul li a {
        padding: 2px 10px;
        color: #2e2e2e;
        cursor: pointer;
        transition: 0.5s;
        text-decoration: none;
    }
    ul li a:hover {
        color: #fff;
        border-radius: 5px;
        background: #DF2771;
    }

    @media screen and (max-width: 960px) {
        ul {
            display: none;
        }
    }
`;


const Logo = styled.div`
  height: 50px;
  transition: 1s;
  margin-left: 30%;
  img{
  	width: 120px;
	cursor: pointer;
	transition: all 1s;
  }
`;

const SearchContainer = styled.div`
	padding: 2px 10px;
	display: flex;
	/* align-items: center; */
	justify-content: center;
	/* background: #0066ff; */
	border: 1px solid;
	border-radius: 20px;
    img {
        width: 25px;
        cursor: pointer;
    }
    input {
        /* padding: 2px 10px; */
        outline: none;
        border: none;
        background: transparent;
    }

  @media (max-width: 960px) {
    display: none;
  }`
;

const MenuIcon = styled.img`
  display: block;
  position: absolute;
  top: 10px; 
  right: 10px; 
  cursor: pointer;

  @media (min-width: 961px) {
    display: none;
  }
`;

const SideMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 300px;
  height: 100%;
  background-color: gray;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease;
  z-index: 1000;
  transform: ${(props) => (props.isOpen ? 'translateX(0)' : 'translateX(-100%)')};
  
  ul {
    margin-top: 35%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0;
  }

  ul li {
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0; /* Ajusta el padding según sea necesario */
    /* background: #009900; Si necesitas un fondo */
    border-bottom: 1px solid #fff; /* Si deseas bordes entre los elementos */
  }
  ul li a{
    text-align: center;
  	color: #FFF;
	width: 100%;
	font-size: 1em;
	/* background: #2E3D49; */
	text-decoration: none;
	padding: 15px 0px;
  }
  ul li:hover a{
  	background: #fff;
	color: #DF2771;
  }
`;

const SideMenuClose = styled.div`
  z-index: 1000;
`;

const SideMenuUser = styled.div`
  text-align: center;
  padding: 20px;
    img{
        float: right;
        width: 35px;
        cursor: pointer;
        margin: 10px;
    }
`;

const MenuList = styled.ul`
  display: flex;
  gap: 20px;

  @media (max-width: 960px) {
    display: none;
  }
`;

const GetStartedLink = styled.a`
	margin-left: 50px;
	padding: 5px 20px;
	border: 2px solid #DF2771;
	border-radius: 20px;
	text-decoration: none;
	transition: 0.5s;
	background-color: #DF2771;
	color: #fff;

	&:hover {
		color: #2e2e2e;
		background: #fff;
	}

	@media (max-width: 960px) {
		display: none;
	}
`;


const ResponsiveWrapper = styled.div`
  display: none;

  @media (max-width: 960px) {
    display: block;
  }
`;

function NavLearn() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const openSideMenu = () => {
    console.log("menu lateral");
    setIsSideMenuOpen(true);
  };

  const closeSideMenu = () => {
    setIsSideMenuOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive);
  };

  return (
    <Header>
      <Nav>
        <Logo>
          <GetStartedLink href="#">LEARN34!</GetStartedLink>
        </Logo>
        <MenuList>
          <li><a className="active" href="/">Home</a></li>
          <li><a href="#portfolio_section">Temas populares</a></li>
          <li><a href="#team_section">Equipo</a></li>
          <li><a href="#services_section">Servicios</a></li>
          <li><a href="#contactus_section">Contacto</a></li>
        </MenuList>

        <SearchContainer>
          <input type="text" placeholder="Busca aqui" />
          <img src={search} alt="search" onClick={toggleSearch} style={{ cursor: 'pointer' }} />
        </SearchContainer>

        <MenuIcon src={menu} onClick={openSideMenu} alt="menu" />
      </Nav>
      {/* Menú Lateral */}
      <SideMenu isOpen={isSideMenuOpen}>
        <SideMenuClose onClick={closeSideMenu}>
          <img src={close} alt="close" style={{ cursor: 'pointer' }} />
        </SideMenuClose>    
        <SideMenuUser>
          <p>roshank9419</p>
        </SideMenuUser>
        <ul>
          <li><a href="#about_section">Home</a></li>
          <li><a href="#portfolio_section">Temas populares</a></li>
          <li><a href="#team_section">Equipo</a></li>
          <li><a href="#services_section">Servicios</a></li>
          <li><a href="#contactus_section">Contacto</a></li>
        </ul>
      </SideMenu>
    </Header>
  );
}

export default NavLearn;
