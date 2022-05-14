import React, { useEffect, useState } from 'react';

//Redux

import { useDispatch, useSelector } from 'react-redux';

//Utils - Actions

import { addPost, getPosts } from '../../actions/post.actions';
import { isEmpty, timestampParser } from '../Utils/Utils';

//Bootstrap

import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../../style/NewPostFormStyle.css';

const NewPostForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [postPicture, setPostPicture] = useState(null);
  const [link, setLink] = useState('');
  const [file, setFile] = useState();
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
    setLink('');
  };

  const handlePost = async () => {
    if (message || postPicture || link) {
      const data = new FormData();
      data.append('message', message);
      data.append('posterId', userData.id);
      if (file) data.append('file', file);
      data.append('link', link);

      await dispatch(addPost(data));
      dispatch(getPosts());
      cancelPost();
    } else {
      alert('Veuillez entrer un message.');
    }
  };

  const cancelPost = () => {
    setMessage('');
    setPostPicture('');
    setLink('');
    setFile('');
  };

  useEffect(() => {
    if (!isEmpty(userData)) setIsLoading(false);

    const handleVideo = () => {
      let findLink = message.split(' ');
      for (let i = 0; i < findLink.length; i++) {
        if (findLink[i].includes('https://www.yout') || findLink[i].includes('https://yout')) {
          let embedVideo = findLink[i].replace('watch?v=', 'embed/');
          setLink(embedVideo.split('&')[0]);
          findLink.splice(i, 1);
          setMessage(findLink.join(' '));
          setPostPicture('');
        }
      }
    };
    handleVideo();
  }, [userData, message, link]);

  return (
    <Container fluid className="d-flex flex-column align-items-center">
      {isLoading ? (
        <Spinner animation="border" role="status" variant="danger">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <>
          <Card className="card-profil-form">
            <Card.Header className="d-flex flex-column align-items-center card-profil-form-header">
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
              className="text-area-color"
              as="textarea"
              size="md"
              rows="3"
              name="message"
              id="message"
              placeholder="Exprimez-vous.."
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
          </Card>

          {message || postPicture || link.length > 20 ? (
            <>
              <Card className="card-profil-form mt-2">
                <Card.Header className="card-profil-form-header d-flex flex-column align-items-center">
                  <Image
                    roundedCircle
                    className="mb-3"
                    width={70}
                    height={70}
                    src={userData.picture}
                    alt="profil-picture-newform"
                  />
                  <Card.Title>{userData.username}</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Image src={postPicture} fluid={true} alt="" />
                  {link && (
                    <iframe
                      title="link"
                      width="200"
                      height="200"
                      src={link}
                      frameBorder="0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  )}
                  <Card.Text>{message}</Card.Text>
                </Card.Body>
                <span className=" d-flex justify-content-end mb-2" style={{ fontSize: '14px' }}>
                  {timestampParser(Date.now())}
                </span>
              </Card>
            </>
          ) : null}

          {isEmpty(link) && (
            <>
              <Image
                className="mt-2 icon-img-file"
                fluid={true}
                width={25}
                height={25}
                src="./img/icons/picture.svg"
                alt="post-img-newform"
              />
              <input
                className="input-icon-img-file"
                type="file"
                id="file"
                name="file"
                accept=".jpg, .jpeg, .png .gif"
                onChange={handlePicture}
              />
            </>
          )}

          {link && (
            <Button onClick={() => setLink('')} variant="danger" className="mb-2">
              Supprimer la vidéo
            </Button>
          )}
          {message || postPicture || link.length > 20 ? (
            <Button onClick={cancelPost} variant="danger" className="mb-2">
              Annuler message
            </Button>
          ) : null}

          <Button onClick={handlePost} variant="danger" className="mb-2">
            Envoyer
          </Button>
        </>
      )}
    </Container>
  );
};

export default NewPostForm;
