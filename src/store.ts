import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // If you are using thunk middleware
import rootReducer from './Reducer/rootReducer';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
