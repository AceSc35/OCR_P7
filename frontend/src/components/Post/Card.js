import React, { useEffect, useState } from 'react';

//redux

import { useDispatch, useSelector } from 'react-redux';

//bootstrap

import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

//Actions

import { updatePost } from '../../actions/post.actions';

//Utils-Components

import { dateParser, isEmpty } from '../Utils/Utils';
import DeleteCard from './DeleteCard';

//Style

import '../../style/CardPost.css';

const CardPost = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const userData = useSelector((state) => state.userReducer);
  const postsData = useSelector((state) => state.postReducer);
  const dispatch = useDispatch();

  const updateItem = () => {
    if (textUpdate) {
      dispatch(updatePost(post.id, textUpdate));
    }
    setIsUpdated(false);
  };

  useEffect(() => {
    !isEmpty(postsData[0]) && setIsLoading(false);
  }, [postsData]);

  return (
    <Container fluid key={post.id} className="d-flex mb-4 border-container py-2">
      {isLoading ? (
        <Spinner animation="border" role="status" variant="danger">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <>
          <Card style={{ width: '12rem' }}>
            <Card.Img
              width={100}
              height={150}
              variant="top"
              src={
                !isEmpty(postsData[0]) &&
                postsData
                  .map((user) => {
                    if (user.id === post.id) return user.User.picture;
                    else return null;
                  })
                  .join('')
              }
              alt="img-profil"
              className="mx-auto"
            />
            <Card.Body>
              {!isEmpty(postsData[0]) &&
                postsData.map((user) => {
                  if (user.id === post.id) {
                    return <Card.Title>{user.User.username}</Card.Title>;
                  } else {
                    return null;
                  }
                })}
              {!isEmpty(postsData[0]) &&
                postsData.map((user) => {
                  if (user.id === post.id) {
                    return (
                      <Card.Text>
                        <span>Membre depuis le : </span>
                        <span style={{ fontSize: '12px' }}>{dateParser(userData.createdAt)}</span>
                      </Card.Text>
                    );
                  } else {
                    return null;
                  }
                })}
            </Card.Body>
          </Card>
          <Card className="sans-bordure d-flex" style={{ marginLeft: '2%' }}>
            <Card.Body>
              {post.postImg && (
                <Image
                  src={post.postImg}
                  alt="post-img"
                  width={300}
                  height={300}
                  fluid={true}
                  className="mx-auto"
                />
              )}
              {post.link && (
                <Col sm={4}>
                  <iframe
                    className="mb-4"
                    title="post-video"
                    width="300"
                    height="300"
                    src={post.link}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </Col>
              )}
              {isUpdated === false && <p>{post.message}</p>}
              {isUpdated && (
                <>
                  <Form.Control
                    as="textarea"
                    id="message"
                    name="message"
                    size="md"
                    rows="3"
                    defaultValue={post.message}
                    onChange={(e) => setTextUpdate(e.target.value)}
                  />
                  <div className="button-container">
                    <Button onClick={updateItem}>Valider Modification</Button>
                  </div>
                </>
              )}

              <span>{dateParser(post.createdAt)}</span>
              {userData.id === post.User.id ? (
                <>
                  <Image
                    className="mt-2"
                    width={20}
                    height={20}
                    fluid={true}
                    onClick={() => setIsUpdated(!isUpdated)}
                    src="./img/icons/edit.svg"
                    alt="edit"
                  />
                  <DeleteCard id={post.id} />
                </>
              ) : (
                userData.isAdmin && (
                  <>
                    <Image
                      width={20}
                      height={20}
                      fluid={true}
                      onClick={() => setIsUpdated(!isUpdated)}
                      src="./img/icons/edit.svg"
                      alt="edit"
                    />
                    <DeleteCard id={post.id} />
                  </>
                )
              )}
            </Card.Body>
          </Card>
        </>
      )}
    </Container>
  );
};

export default CardPost;
