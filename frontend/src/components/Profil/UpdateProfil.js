import React, { useState } from 'react';

//redux

import { useDispatch, useSelector } from 'react-redux';
import { updateBio } from '../../actions/user.actions';
import { dateParser } from '../Utils/Utils';

//Components

import UploadImg from './UploadImg';
import DeleteAccount from './DeleteAccount';

//Bootstrap

import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../../style/ProfilStyle.css';

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
    <Container fluid>
      <>
        <Container fluid className="d-flex flex-column align-items-center img-container">
          <>
            <h1 className="my-3 profil-name">Profil de {userData.username}</h1>
            <Image
              src={userData.picture}
              alt="user-picture"
              width={200}
              height={200}
              roundedCircle
              className="img-profilpage"
            />
          </>
        </Container>

        <Card className="d-flex flex-column align-items-center mt-2 card-container-bio">
          <h3>Bio</h3>
          {/* On modifie les conditions updateForm sur false et ensuite sur true*/}
          {updateForm === false && (
            <>
              <Card.Text onClick={() => setUpdateForm(!updateForm)} className="text-bio">
                {userData.bio}
              </Card.Text>
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
              <textarea
                type="text"
                defaultValue={userData.bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-50 h-50 textarea-profil"
                rows="3"
              ></textarea>
              <Button variant="danger" onClick={handleUpdate} className="mt-1">
                Valider modifications
              </Button>
            </>
          )}
        </Card>

        <Container fluid className="d-flex flex-column align-items-end bottom-profil">
          <UploadImg />
          <h6>Membre depuis le : {dateParser(userData.createdAt)}</h6>
          <DeleteAccount />
        </Container>
      </>
    </Container>
  );
};

export default UpdateProfil;
