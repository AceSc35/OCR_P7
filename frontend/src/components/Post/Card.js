import React, { useEffect, useState } from 'react';

//Redux

import { useDispatch, useSelector } from 'react-redux';

//Actions

import { updatePost } from '../../actions/post.actions';

//Utils-Components

import { dateParser, isEmpty } from '../Utils/Utils';
import DeleteCard from './DeleteCard';
import CardComments from './CardComments';

//Bootstrap - Style

import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../../style/CardPost.css';

const CardPost = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const [showComments, setShowComments] = useState(false);
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
    <Container className="mb-5 d-flex flex-column" key={post.id}>
      {isLoading ? (
        <Spinner animation="border" role="status" variant="danger">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <>
          <Card>
            <Card.Header className="d-flex flex-column align-items-center card-background">
              <Image
                className="mb-2"
                width={100}
                height={100}
                roundedCircle
                src={
                  !isEmpty(postsData[0]) &&
                  postsData
                    .map((user) => {
                      if (user.id === post.id) return user.User.picture;
                      else return null;
                    })
                    .join('')
                }
                alt="profil-img"
              />
              {!isEmpty(postsData[0]) &&
                postsData.map((user) => {
                  if (user.id === post.id) {
                    return (
                      <Card.Title className="mt-auto mb-auto">
                        <h5>{user.User.username}</h5>
                      </Card.Title>
                    );
                  } else return null;
                })}
            </Card.Header>

            {post.postImg && (
              <Col sm={3}>
                <Image
                  className="mb-3"
                  width={300}
                  height={300}
                  fluid={true}
                  src={post.postImg}
                  alt="image-post"
                />
              </Col>
            )}

            {post.link && (
              <Col sm={4}>
                <iframe
                  className="mb-3"
                  title="post-video"
                  width="247"
                  height="220"
                  src={post.link}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </Col>
            )}
            {isUpdated === false && (
              <>
                <Card.Body>
                  <Card.Text>{post.message}</Card.Text>
                  <span className="d-flex justify-content-end px-1" style={{ fontSize: '12px' }}>
                    {dateParser(post.createdAt)}
                  </span>
                </Card.Body>
              </>
            )}
          </Card>
          {isUpdated && (
            <>
              <Form.Control
                as="textarea"
                size="md"
                rows="3"
                name="message"
                id="message"
                defaultValue={post.message}
                onChange={(e) => setTextUpdate(e.target.value)}
              />
              <Button className="mt-3 mb-3" variant="danger" onClick={updateItem}>
                Valider
              </Button>
            </>
          )}

          <div className="d-flex mt-2">
            {userData.id === post.User.id ? (
              <>
                <Image
                  className="mt-2 icon-post"
                  width={30}
                  height={30}
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
                    className="icon-post"
                    width={30}
                    height={30}
                    fluid={true}
                    onClick={() => setIsUpdated(!isUpdated)}
                    src="./img/icons/edit.svg"
                    alt="edit"
                  />
                  <DeleteCard id={post.id} />
                </>
              )
            )}
            <Image
              className="mt-2"
              width={30}
              height={30}
              fluid={true}
              onClick={() => setShowComments(!showComments)}
              src="./img/icons/message1.svg"
              alt="show-comment"
            />
            <span>{post.Comments.length}</span>
          </div>
          <br />
          {showComments && <CardComments post={post} />}
        </>
      )}
    </Container>
  );
};

export default CardPost;
