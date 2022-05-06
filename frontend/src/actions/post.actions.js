import axios from 'axios';

// posts

export const GET_POSTS = 'GET_POSTS';
export const UPDATE_POST = 'UPDATE_POST';

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

//Modification d'un post

export const updatePost = (message, postId) => {
  const token = JSON.parse(localStorage.getItem('user')).token;
  return (dispatch) => {
    return axios({
      method: 'put',
      url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
      data: { message },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    })
      .then((res) => {
        dispatch({ UPDATE_POST, payload: { message, postId } });
      })
      .catch((err) => err.message);
  };
};
