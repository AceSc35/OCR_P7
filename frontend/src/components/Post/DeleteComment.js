import React, { useContext, useEffect, useState } from 'react';

//Redux

import { useDispatch, useSelector } from 'react-redux';

//Utils

import { UidContext } from '../Utils/AppContext';

//Actions

import { deleteComment } from '../../actions/post.actions';

//Bootstrap

import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';

const DeleteComment = ({ comment, postId }) => {
  const [isAuthor, setIsAuthor] = useState(false);
  const uid = useContext(UidContext);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);

  const handleDelete = () => {
    dispatch(deleteComment(comment.id, uid, postId));
  };

  useEffect(() => {
    const checkAuthor = () => {
      if (uid === comment.UserId || userData.isAdmin === true) {
        setIsAuthor(true);
      }
    };
    checkAuthor();
  }, [uid, comment.UserId, userData.isAdmin]);

  return (
    <Container>
      {isAuthor && (
        <span
          onClick={() => {
            if (window.confirm('Voulez-vous supprimer ce commentaire ?')) {
              handleDelete();
              window.location.reload();
            }
          }}
        >
          <Image width={20} height={20} fluid={true} src="./img/icons/trash.svg" alt="trash" />
        </span>
      )}
    </Container>
  );
};

export default DeleteComment;
