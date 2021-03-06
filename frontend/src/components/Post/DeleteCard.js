import React from 'react';

//Redux

import { useDispatch } from 'react-redux';

//Actions

import { deletePost } from '../../actions/post.actions';

//Bootstrap

import Image from 'react-bootstrap/Image';

function DeleteCard(props) {
  const dispatch = useDispatch();

  const deleteQuote = () => dispatch(deletePost(props.id));

  return (
    <div
      onClick={() => {
        if (window.confirm('Voulez-vous supprimer ce post ?')) {
          deleteQuote();
        }
      }}
    >
      <Image
        width={30}
        height={30}
        fluid={true}
        src="./img/icons/trash.svg"
        alt="trash"
        className="mt-2"
        style={{ marginRight: '3px' }}
      />
    </div>
  );
}

export default DeleteCard;
