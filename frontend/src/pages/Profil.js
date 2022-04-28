import React from 'react';

//Component
import Log from '../components/Log';

//Bootstrap Class
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Profil = () => {
  return (
    <Container fluid>
      <Row>
        <Col>
          <Log signin={false} signup={true} />
        </Col>
        <Col>
          <Image src="./img/logo-groupomania/icon-above-font.svg" alt="img-log" />
        </Col>
      </Row>
    </Container>
  );
};

export default Profil;
