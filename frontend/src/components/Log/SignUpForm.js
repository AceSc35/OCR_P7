import React, { useState } from 'react';
import axios from 'axios';

//bootstrap

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

//Components

import SignInForm from './SignInForm';

const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const inscriptionError = document.querySelector('.inputInscription.error');

  const handleRegister = async (e) => {
    e.preventDefault();

    await axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}api/user/register`,
      withCredentials: true,
      data: {
        username,
        email,
        password,
      },
    })
      .then((res) => {
        if (res.data.error) {
          inscriptionError.textContent = res.data.error;
        } else {
          setFormSubmit(true);
        }
      })
      .catch((err) => {
        if (err.response.status === 400) inscriptionError.textContent = err.response.data.error;
      });
  };

  return (
    //On met un fragment "<>" qui est une balise supérieure
    <>
      {formSubmit ? (
        <>
          <SignInForm />
          <p className="mt-2" style={{ color: '#248232' }}>
            L'inscription est un succès, veuillez-vous connecter
          </p>
        </>
      ) : (
        <Form onSubmit={handleRegister}>
          <Form.Group className="mb-1" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Prénom et Nom"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </Form.Group>
          <Form.Group className="mb-1" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Mot de Passe</Form.Label>
            <Form.Control
              type="password"
              placeholder="Mot de Passe"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </Form.Group>
          <div className="inputInscription error mb-3" style={{ color: '#dc3545' }}></div>
          <Button variant="danger" type="submit">
            S'inscrire
          </Button>
        </Form>
      )}
    </>
  );
};

export default SignUpForm;
