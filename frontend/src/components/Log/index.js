import React, { useState } from 'react';

//Components dossier "Log"
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

//Bootstrap class
import '../../style/Log.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

const Log = (props) => {
  //Pour éditer SignIn/Signup
  const [signUpModal, setSignUpModal] = useState(props.signup);
  const [signInModal, setSignInModal] = useState(props.signin);

  const handleModals = (e) => {
    //si la cible doit se register on passe le signup a true
    if (e.target.id === 'register') {
      setSignInModal(false);
      setSignUpModal(true);
    } else if (e.target.id === 'login') {
      //si la cible doit se login, on passe le signin a true
      setSignUpModal(false);
      setSignInModal(true);
    }
  };

  return (
    <>
      <Container fluid>
        <Row className="row-background" style={{ minWidth: '0px', margin: 'auto', width: '83%' }}>
          <Col
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ gap: '10px' }}
          >
            <Button
              onClick={handleModals}
              style={{ marginBottom: '10px', width: '119px' }}
              id="register"
              variant="outline-danger"
            >
              S'inscrire
            </Button>
            <Button
              onClick={handleModals}
              id="login"
              variant="outline-danger"
              style={{ marginBottom: '10px', width: '119px' }}
            >
              Se connecter
            </Button>
          </Col>
          <Col>
            {signUpModal && <SignUpForm />}
            {signInModal && <SignInForm />}
          </Col>
        </Row>
      </Container>
      <Image
        fluid
        src="./img/logo-groupomania/icon-above-font.svg"
        alt="img-log"
        style={{ width: '500px', display: 'flex', margin: 'auto' }}
      />
    </>
  );
};

export default Log;
