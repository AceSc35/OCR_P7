import axios from 'axios';

export const GET_USER = 'GET_USER';
export const UPLOAD_PICTURE = 'UPLOAD_PICTURE';
export const UPDATE_BIO = 'UPDATE_BIO';
export const DELETE_ACCOUNT = 'DELETE_ACCOUNT';

//Récupérer un utilisateur

export const getUser = (uid) => {
  //dispatch -> envoie aux réducers
  return (dispatch) => {
    return (
      axios
        //On recupère les users
        .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
        .then((res) => {
          //On les dispatch -> il les envoie sur les reducers
          dispatch({ type: GET_USER, payload: { ...res.data.user } });
        })
        .catch((err) => console.log(err))
    );
  };
};

//Modifier la photo de profil de l'utilisateur
export const uploadPicture = (data, id) => {
  //On prend le token stocké dans le local storage pour assurer la sécurité coté front
  const token = JSON.parse(localStorage.getItem('user')).token;
  return (dispatch) => {
    return axios
      .put(`${process.env.REACT_APP_API_URL}api/user/images/${id}`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
      })
      .then((res) => {
        return axios
          .get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
          .then((res) => {
            dispatch({ type: UPLOAD_PICTURE, payload: res.data.user.picture });
          })
          .catch((err) => err.message);
      })
      .catch((err) => err.message);
  };
};

//Modification de la bio
export const updateBio = (id, bio) => {
  const token = JSON.parse(localStorage.getItem('user')).token;
  return (dispatch) => {
    return axios({
      method: 'put',
      url: `${process.env.REACT_APP_API_URL}api/user/images/` + id,
      data: { bio },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    })
      .then((res) => {
        dispatch({ type: UPDATE_BIO, payload: bio });
      })
      .catch((err) => err.message);
  };
};

//Suppression d'un compte
export const deleteAccount = (id) => {
  const token = JSON.parse(localStorage.getItem('user')).token;
  return (dispatch) => {
    return axios({
      method: 'delete',
      url: `${process.env.REACT_APP_API_URL}api/user/${id}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    })
      .then((res) => {
        dispatch({ type: DELETE_ACCOUNT });
      })
      .catch((err) => err.message);
  };
};
