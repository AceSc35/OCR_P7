import React, { useContext } from 'react';

//Component
import Log from '../components/Log';

//Utils

import { UidContext } from '../components/Utils/AppContext';

//Bootstrap Class
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//Component
import UpdateProfil from '../components/profil/UpdateProfil';

const Profil = () => {
  const uid = useContext(UidContext);

  return (
    <Container fluid>
      {uid ? (
        <UpdateProfil />
      ) : (
        <Row>
          <Col>
            <Log signin={false} signup={true} />
          </Col>
          <Col>
            <Image src="./img/logo-groupomania/icon-above-font.svg" alt="img-log" />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Profil;
