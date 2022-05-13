import React, { useEffect, useState } from 'react';

//Redux

import { useDispatch, useSelector } from 'react-redux';

//Components

import Card from '../Post/Card';

//Actions

import { getPosts } from '../../actions/post.actions';

//Utils

import { isEmpty } from '../Utils/Utils';

//Bootstrap

import Container from 'react-bootstrap/Container';

const Thread = () => {
  //Quand on va lancer le component du thread on va récuperer tous les posts
  const [loadPost, setLoadPost] = useState(true);
  const [count, setCount] = useState(5);

  const dispatch = useDispatch();

  const posts = useSelector((state) => state.postReducer);

  const loadMore = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >
      document.scrollingElement.scrollHeight
    ) {
      setLoadPost(true);
    }
  };

  useEffect(() => {
    //Creation d'une fonction/condition qui permet de charger une seule fois tout les posts
    if (loadPost) {
      dispatch(getPosts(count));
      setLoadPost(false);
      setCount(count + 5);
    }

    window.addEventListener('scroll', loadMore);
    return () => window.removeEventListener('scroll', loadMore);
  }, [loadPost, dispatch, count]);

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
