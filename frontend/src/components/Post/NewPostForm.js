import React, { useEffect, useState } from 'react';

//Redux

import { useSelector } from 'react-redux';

//Utils

import { isEmpty } from '../Utils/Utils';

//Bootstrap

import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';

const NewPostForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [postPicture, setPostPicture] = useState(null);
  const [video, setVideo] = useState('');
  const [file, setFile] = useState();

  const userData = useSelector((state) => state.userReducer);

  useEffect(() => {
    if (!isEmpty(userData)) setIsLoading(false);
  }, [userData]);

  return (
    <Container className="d-flex justify-content-center">
      {isLoading ? (
        <Spinner animation="border" role="status" variant="danger">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <>
          <Card style={{ width: '50%' }}>
            <Card.Header className="d-flex align-items-center" style={{ flexDirection: 'column' }}>
              <Image
                roundedCircle
                className="mb-2"
                width={70}
                height={70}
                src={userData.picture}
                alt="profil-picture-newform"
              />
              <Card.Title>{userData.username}</Card.Title>
            </Card.Header>
            <Form.Control
              as="textarea"
              size="md"
              rows="4"
              name="message"
              id="message"
              placeholder="Exprimez-vous.."
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
          </Card>
        </>
      )}
    </Container>
  );
};

export default NewPostForm;
