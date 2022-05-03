import axios from 'axios';

export const GET_USER = 'GET_USER';
export const UPLOAD_PICTURE = 'UPLOAD_PICTURE';

export const getUser = (uid) => {
  //dispatch -> envoie aux réducers
  return (dispatch) => {
    return (
      axios
        //On recupère les users
        .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
        .then((res) => {
          //On les dispatch aka il les envoie sur les reducers
          dispatch({ type: GET_USER, payload: { ...res.data.user } });
        })
        .catch((err) => console.log(err))
    );
  };
};

//Modifier la photo de profil de l'utilisateur
export const uploadPicture = (data, id) => {
  return (dispatch) => {
    return axios
      .put(`${process.env.REACT_APP_API_URL}api/user/images/${id}`, data)
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
