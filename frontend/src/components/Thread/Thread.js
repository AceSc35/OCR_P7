import React, { useEffect, useState } from 'react';

//Redux

import { useDispatch, useSelector } from 'react-redux';

//Component

import Card from '../Post/Card';

//Actions

import { getPosts } from '../../actions/post.actions';

//Utils
import { isEmpty } from '../Utils/Utils';

//bootstrap

import Container from 'react-bootstrap/Container';

const Thread = () => {
  //Quand on va lancer le component du thread on va récuperer tous les posts
  const [loadPost, setLoadPost] = useState(true);
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.postReducer);

  useEffect(() => {
    //Creation d'une fonction/condition qui permet de charger une seule fois tout les posts
    if (loadPost) {
      dispatch(getPosts());
      setLoadPost(false);
    }
  }, [loadPost]);

  return (
    <Container fluid className="mt-3">
      {!isEmpty(posts[0]) &&
        posts.map((post) => {
          return <Card post={post} key={post.id} />;
        })}
    </Container>
  );
};

export default Thread;
