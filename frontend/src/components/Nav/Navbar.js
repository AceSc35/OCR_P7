import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

//Redux

import { useSelector } from 'react-redux';

//Components

import { UidContext } from '../Utils/AppContext';
import Logout from '../Log/Logout';

//Bootstrap - Style

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import '../../style/Log.css';

const Nav = () => {
  const uid = useContext(UidContext);
  //UseSelector permet d'extraire des données de l'état du magasin Redux
  const userData = useSelector((state) => state.userReducer);

  return (
    <Navbar variant="dark" className="mb-4 navbar-color">
      <Container fluid>
        <Navbar.Brand href="/home">
          <Image
            alt="logo-groupomania"
            src="./img/logo-groupomania/icon-left-font-monochrome-black.svg"
            className="d-inline-block align-top"
            width={'150px'}
          />{' '}
        </Navbar.Brand>
        {uid ? (
          <>
            <NavLink to="/profil" className={'profil'}>
              <h6 style={{ color: 'black' }}>Bienvenue {userData.username}</h6>
            </NavLink>
            <Logout />
          </>
        ) : (
          <NavLink to="/profil">
            <img src="./img/icons/login.svg" alt="login" className="icon-logout" />
          </NavLink>
        )}
      </Container>
    </Navbar>
  );
};

export default Nav;
