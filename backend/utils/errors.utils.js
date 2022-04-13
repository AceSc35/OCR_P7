module.exports.signInErrors = (err) => {
  let errors = { email: '', password: '' };

  if (err.message.includes('email' || 'password'))
    errors.email = 'Email et/ou mot de passe incorrect.';

  return errors;
};
