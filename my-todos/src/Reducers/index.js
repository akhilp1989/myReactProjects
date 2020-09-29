import { combineReducers } from 'redux'
import todos from '../Reducers/todo'

const rootReducer = combineReducers({
    todos
})
export default rootReducer