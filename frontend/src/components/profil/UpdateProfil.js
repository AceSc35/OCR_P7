import React, { useState } from 'react';

//Components
import UploadImg from './UploadImg';
import DeleteAccount from './DeleteAccount';

//bootstrap

import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

//redux

import { useDispatch, useSelector } from 'react-redux';
import { updateBio } from '../../actions/user.actions';
import { dateParser } from '../Utils/Utils';

const UpdateProfil = () => {
  const [bio, setBio] = useState('');
  const [updateForm, setUpdateForm] = useState(false);

  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleUpdate = (e) => {
    dispatch(updateBio(userData.id, bio));
    setUpdateForm(false);
  };

  return (
    <>
      <Container fluid>
        <h1>Profil de {userData.username}</h1>
        <h3>Photo de profil</h3>
        <Image src={userData.picture} alt="user-picture" width={300} height={300} />
        <UploadImg />
      </Container>
      <Container fluid>
        <h3>Bio</h3>
        {/* On modifie les conditions updateForm sur false et ensuite sur true*/}
        {updateForm === false && (
          <>
            <p onClick={() => setUpdateForm(!updateForm)}>{userData.bio}</p>
            <Button
              variant="danger"
              id="button-addon2"
              className="mt-1"
              onClick={() => setUpdateForm(!updateForm)}
            >
              Modifier bio
            </Button>
          </>
        )}
        {updateForm && (
          <>
            <FloatingLabel controlId="floatingTextarea2">
              <Form.Control
                type="text"
                defaultValue={userData.bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-25 h-50"
              />
            </FloatingLabel>
            <Button variant="danger" onClick={handleUpdate} className="mt-1">
              Valider modifications
            </Button>
          </>
        )}
        <br />
        <h6>Membre depuis le : {dateParser(userData.createdAt)}</h6>
        <DeleteAccount />
      </Container>
    </>
  );
};

export default UpdateProfil;
