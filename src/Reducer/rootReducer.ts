import { combineReducers } from 'redux';
import userRepositaryReducer from './userRepositaryDataReducer';

const rootReducer = combineReducers({
  userRepositary: userRepositaryReducer,
});

export default rootReducer;