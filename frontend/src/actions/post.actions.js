import axios from 'axios';

// posts

export const GET_POSTS = 'GET_POSTS';

//On récupère tout les posts

export const getPosts = (num) => {
  return (dispatch) => {
    return axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}api/post/`,
    })
      .then((res) => {
        const array = res.data.slice(0, num);
        dispatch({
          type: GET_POSTS,
          payload: array,
        });
      })
      .catch((err) => err.message);
  };
};
