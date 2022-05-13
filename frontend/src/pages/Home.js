import React, { useContext } from 'react';

//Components - Utils

import { UidContext } from '../components/Utils/AppContext';
import Thread from '../components/Thread/Thread';
import Log from '../components/Log';

//Bootstrap

import Container from 'react-bootstrap/Container';
import NewPostForm from '../components/Post/NewPostForm';

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
