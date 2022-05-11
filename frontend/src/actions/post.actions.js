import axios from 'axios';

//Posts

export const GET_POSTS = 'GET_POSTS';
export const ADD_POST = 'ADD_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const DELETE_POST = 'DELETE_POST';

//Comments

export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

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

//Création de post
export const addPost = (data) => {
  const token = JSON.parse(localStorage.getItem('user')).token;
  return (dispatch) => {
    return axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}api/post/`,
      data: data,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    });
  };
};

//Modification d'un post

export const updatePost = (postId, message) => {
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
        dispatch({ type: UPDATE_POST, payload: { message, postId } });
      })
      .catch((err) => err.message);
  };
};

//Supprimer un post

export const deletePost = (postId) => {
  const token = JSON.parse(localStorage.getItem('user')).token;
  return (dispatch) => {
    return axios({
      method: 'delete',
      url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    })
      .then((res) => {
        dispatch({ type: DELETE_POST, payload: { postId } });
      })
      .catch((err) => err.message);
  };
};

//Ajouter un comment

export const addComment = (postId, UserId, message, username) => {
  const token = JSON.parse(localStorage.getItem('user')).token;
  return (dispatch) => {
    return axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}api/post/${postId}/comment-post`,
      data: {
        UserId,
        message,
        username,
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    })
      .then((res) => {
        dispatch({ type: ADD_COMMENT, payload: res.data.comment });
      })
      .catch((err) => err.message);
  };
};

//Supprimer un comment

export const deleteComment = (id, UserId, PostId, username) => {
  const token = JSON.parse(localStorage.getItem('user')).token;
  return (dispatch) => {
    return axios({
      method: 'delete',
      url: `${process.env.REACT_APP_API_URL}api/post/delete-comment-post/${id}`,
      data: {
        UserId,
        PostId,
        username,
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    })
      .then((res) => {
        dispatch({ type: ADD_COMMENT, payload: { id } });
      })
      .catch((err) => err.message);
  };
};
