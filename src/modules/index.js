import { combineReducers } from 'redux';
import articleReducer from './articles';
import authReducer from './auth';
import commentReducer from './comments';

const rootReducer = combineReducers({
  auth: authReducer,
  article: articleReducer,
  comments: commentReducer,
});

export default rootReducer;
