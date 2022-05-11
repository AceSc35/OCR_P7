import React, { useEffect, useState } from 'react';

//Redux

import { useDispatch, useSelector } from 'react-redux';

//Utils - actions

import { addPost, getPosts } from '../../actions/post.actions';
import { isEmpty, timestampParser } from '../Utils/Utils';

//Bootstrap

import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
    <Container className="d-flex justify-content-center">
      {isLoading ? (
        <Spinner animation="border" role="status" variant="danger">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <>
          <Card style={{ width: '50%' }}>
            <Card.Header
              className="d-flex flex-column align-items-center"
              style={{ backgroundColor: 'rgb(235, 201, 209)' }}
            >
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
            {message || postPicture || link.length > 20 ? (
              <>
                <Image src={userData.picture} alt="user-pic" width={50} height={50} />

                <h5>{userData.username}</h5>

                <span>{timestampParser(Date.now())}</span>

                <p>{message}</p>

                <Image src={postPicture} alt="" />
                {link && (
                  <iframe
                    title="link"
                    width="415"
                    height="400"
                    src={link}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                )}
              </>
            ) : null}
            <div className="icon">
              {isEmpty(link) && (
                <>
                  <Image
                    className="mt-2"
                    width={20}
                    height={20}
                    fluid={true}
                    src="./img/icons/picture.svg"
                    alt="post-img-newform"
                  />
                  <input
                    type="file"
                    id="file"
                    name="file"
                    accept=".jpg, .jpeg, .png .gif"
                    onChange={handlePicture}
                  />
                </>
              )}
              {link && <Button onClick={() => setLink('')}>Supprimer la vidéo</Button>}
            </div>

            {message || postPicture || link.length > 20 ? (
              <Button onClick={cancelPost}>Annuler message</Button>
            ) : null}

            <Button onClick={handlePost}>Envoyer</Button>
          </Card>
        </>
      )}
    </Container>
  );
};

export default NewPostForm;
