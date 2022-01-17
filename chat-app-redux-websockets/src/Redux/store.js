import {createStore, applyMiddleware} from "redux";
import chatReducer from './reducers';
import thunk from 'redux-thunk'
const middleWare = applyMiddleware(thunk)
export default createStore(chatReducer,middleWare);