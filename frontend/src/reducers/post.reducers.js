import { DELETE_COMMENT, DELETE_POST, GET_POSTS, UPDATE_POST } from '../actions/post.actions';

const initialState = {};

export default function postReducer(state = initialState, action) {
  //On évite d'écraser le reste des éléments = ... + state
  switch (action.type) {
    case GET_POSTS:
      return action.payload;
    case UPDATE_POST:
      return state.map((post) => {
        if (post.id === action.payload.postId) {
          return {
            ...post,
            message: action.payload.message,
          };
        } else return post;
      });
    case DELETE_POST:
      return state.filter((post) => post.id !== action.payload.postId);
    case DELETE_COMMENT:
      return state.map((post) => {
        if (post.id === action.payload.postId) {
          post.Comments = post.Comments.filter(
            (comment) => comment.id !== action.payload.commentId
          );
          return post;
        }
        return post;
      });
    default:
      return state;
  }
}
