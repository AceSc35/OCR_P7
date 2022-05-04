import React, { useState } from 'react';

//bootstrap

import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';

const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Container fluid key={post.id}>
      {isLoading ? (
        <Spinner animation="border" role="status" variant="danger">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <h2>test</h2>
      )}
    </Container>
  );
};

export default Card;
