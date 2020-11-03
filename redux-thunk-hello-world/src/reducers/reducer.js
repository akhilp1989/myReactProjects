import { combineReducers } from 'redux'
import { userReducer } from './userReducer'
import { postReducer } from './postReducer'
export const reducer = combineReducers({
    user: userReducer,
    posts:postReducer
}) 