import React, { useContext } from 'react';

//Components - Utils

import Thread from '../components/Thread/Thread';
import { UidContext } from '../components/Utils/AppContext';

//bootstrap

import Container from 'react-bootstrap/Container';
import NewPostForm from '../components/Post/NewPostForm';
import Log from '../components/Log';

const Home = () => {
  const uid = useContext(UidContext);

  return (
    <Container fluid>
      {uid ? <NewPostForm /> : <Log signin={true} signup={false} />}
      {uid && <Thread />}
    </Container>
  );
};

export default Home;
