import React, { useState } from 'react';

//Components dossier "Log"
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

//Bootstrap class
import './Log.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
        <Row className="row-background">
          <Col>
            <li>
              <Button
                onClick={handleModals}
                style={{ marginBottom: '10px' }}
                id="register"
                variant="outline-danger"
              >
                S'inscrire
              </Button>
            </li>
            <li>
              <Button onClick={handleModals} id="login" variant="outline-danger">
                Se connecter
              </Button>
            </li>
          </Col>
          <Col>
            {signUpModal && <SignUpForm />}
            {signInModal && <SignInForm />}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Log;
