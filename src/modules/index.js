import { combineReducers } from 'redux';
import articleReducer from './articles';
import authReducer from './auth';

const rootReducer = combineReducers({
  auth: authReducer,
  article: articleReducer,
});

export default rootReducer;
