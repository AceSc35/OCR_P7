import { GET_POSTS } from '../actions/post.actions';

const initialState = {};

export default function postReducer(state = initialState, action) {
  //On évite d'écraser le reste des éléments = ... + state
  switch (action.type) {
    case GET_POSTS:
      return action.payload;
    default:
      return state;
  }
}
