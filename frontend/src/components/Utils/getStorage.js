export const getStorage = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.token) {
    return { 'x-access-token': user.token }; //envoyer le jeton généré côté client
  } else {
    return {};
  }
};
