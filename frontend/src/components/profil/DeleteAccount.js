import React from 'react';
//import cookie from 'js-cookie';
//Redux

import { useDispatch, useSelector } from 'react-redux';

//Action

import { deleteAccount } from '../../actions/user.actions';

//Bootstrap

import Button from 'react-bootstrap/Button';

const DeleteAccount = () => {
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteAccount(userData.id));
    localStorage.clear();
  };

  return (
    <Button
      variant="danger"
      id="button-addon2"
      className="mt-1 mb-1"
      onClick={() => {
        if (
          window.confirm(
            'Cette action est irréversible ! Voulez-vous vraiment supprimer votre compte ? '
          )
        ) {
          handleDelete();
          window.location.href = '/';
        }
      }}
    >
      Supprimer compte
    </Button>
  );
};

export default DeleteAccount;
