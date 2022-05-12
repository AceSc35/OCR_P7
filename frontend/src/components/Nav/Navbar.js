import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

//components

import { UidContext } from '../Utils/AppContext';
import Logout from '../Log/Logout';

//bootstrap

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';

//redux

import { useSelector } from 'react-redux';

const Nav = () => {
  const uid = useContext(UidContext);
  //UseSelector permet d'extraire des données de l'état du magasin Redux
  const userData = useSelector((state) => state.userReducer);

  return (
    <Navbar style={{ backgroundColor: '#ebc9d1' }} variant="dark" className="mb-4">
      <Container fluid>
        <Navbar.Brand href="/home">
          <Image
            alt="logo-groupomania"
            src="./img/logo-groupomania/icon-left-font-monochrome-white.svg"
            className="d-inline-block align-top"
            width={'150px'}
          />{' '}
        </Navbar.Brand>
        {uid ? (
          <>
            <NavLink to="/profil" className={'profil'}>
              <h6 style={{ color: '#DC4535' }}>Bienvenue {userData.username}</h6>
            </NavLink>
            <Logout />
          </>
        ) : (
          <NavLink to="/profil">
            <img src="./img/icons/login.svg" alt="login" style={{ width: '90%' }} />
          </NavLink>
        )}
      </Container>
    </Navbar>
  );
};

export default Nav;
