//Redux
import { combineReducers } from 'redux';

//Reducers
import userReducer from './user.reducers';
import usersReducer from './users.reducers';
import postReducer from './post.reducers';

export default combineReducers({
  userReducer,
  usersReducer,
  postReducer,
});
