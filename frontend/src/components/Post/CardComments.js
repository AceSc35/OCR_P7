import React, { useState } from 'react';

//Redux

import { useDispatch, useSelector } from 'react-redux';

//Components

import DeleteComment from './DeleteComment';

//Actions

import { addComment, getPosts } from '../../actions/post.actions';

//Bootstrap

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../../style/CardPost.css';

const CardComments = ({ post }) => {
  const [message, setMessage] = useState('');
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleComment = (e) => {
    e.preventDefault();

    if (message) {
      dispatch(addComment(post.id, userData.id, message, userData.username))
        .then(() => dispatch(getPosts()))
        .then(() => setMessage(''));
    }
  };

  return (
    <Container fluid>
      {post.Comments.map((comment) => {
        return (
          <Container fluid key={comment.id} className="mb-2">
            <Card>
              <Card.Header className="d-flex flex-column align-items-center card-background">
                <Image
                  roundedCircle
                  width={70}
                  height={70}
                  src={comment.User.picture}
                  alt="profil-picture-comment"
                />
                <Card.Title className="mt-2 title-card">{comment.User.username}</Card.Title>
              </Card.Header>
              <Card.Body>
                <Card.Text className="text-card">{comment.message}</Card.Text>
                <DeleteComment comment={comment} postId={post.id} />
              </Card.Body>
            </Card>
          </Container>
        );
      })}

      {userData.id && (
        <Form action="" onSubmit={handleComment} className="CommentFormContent">
          <Form.Control
            type="text"
            name="text"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Laisser un commentaire"
          />
          <Button type="submit" className="mt-3" variant="danger">
            Commenter
          </Button>
        </Form>
      )}
    </Container>
  );
};

export default CardComments;
