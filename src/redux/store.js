import {createStore,applyMiddleware,combineReducers} from 'redux';
import { thunk } from 'redux-thunk';
import socketMiddleware from './middleware/socketMiddleware';
import socketReducer from './reducers/socketReducer';


const rootReducer=combineReducers({
    socket:socketReducer
});

const store=createStore(rootReducer,applyMiddleware(thunk,socketMiddleware));

export default store;