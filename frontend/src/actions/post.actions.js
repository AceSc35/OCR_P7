import axios from 'axios';

// posts

export const GET_POSTS = 'GET_POSTS';

//On récupère tout les posts

export const getPosts = () => {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}api/post/`,
    })
      .then((res) => {
        dispatch({
          type: GET_POSTS,
          payload: res.data,
        });
      })
      .catch((err) => err.message);
  };
};
