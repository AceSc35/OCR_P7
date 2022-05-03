import React, { useState } from 'react';
import axios from 'axios';

//bootstrap

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //Erreur de log

  const emailError = document.querySelector('.email.error');

  const handleLogin = (e) => {
    e.preventDefault();

    axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
      withCredentials: true,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        console.log(res.data);
        if (res.data.error) {
          emailError.textContent = res.data.error;
        } else {
          window.location = '/';
          localStorage.setItem('user', JSON.stringify(res.data));
        }
      })
      .catch((err) => {
        if (err.response.status === 400) emailError.textContent = err.response.data.error;
      });
  };

  return (
    <Form onSubmit={handleLogin}>
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
      <div className="email error mb-2" style={{ color: '#dc3545' }}></div>
      <Button variant="danger" type="submit">
        Connexion
      </Button>
    </Form>
  );
};

export default SignInForm;
