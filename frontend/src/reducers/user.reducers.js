import { DELETE_ACCOUNT, GET_USER, UPDATE_BIO, UPLOAD_PICTURE } from '../actions/user.actions';

const initialState = {};

export default function userReducer(state = initialState, action) {
  //On évite d'écraser le reste des éléments = ... + state
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        ...action.payload,
      };
    case UPLOAD_PICTURE:
      return {
        ...state,
        picture: action.payload,
      };
    case UPDATE_BIO:
      return {
        ...state,
        bio: action.payload,
      };
    case DELETE_ACCOUNT:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
