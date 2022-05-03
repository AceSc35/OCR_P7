import React from 'react';

//Components
import UploadImg from './UploadImg';

//bootstrap

import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';

//redux

import { useSelector } from 'react-redux';

const UpdateProfil = () => {
  const userData = useSelector((state) => state.userReducer);
  console.log(userData);

  return (
    <Container fluid>
      <h1>Profil de {userData.username}</h1>
      <h3>Photo de profil</h3>
      <Image src={userData.picture} alt="user-picture" width={300} height={300} />
      <UploadImg />
    </Container>
  );
};

export default UpdateProfil;
