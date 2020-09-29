import {
    ADD_TODO,
    DELETE_TODO,
    EDIT_TODO,
    COMPLETE_TODO,
    COMPLETE_ALL_TODOS,
    CLEAR_COMPLETED
} from '../Constants/ActionTypes'
  
const intialState =[ {
    text: 'This is by Default',
    completed: false,
    id:0
}]
export default function todos(state = intialState, action) {
    switch (action.type) {
        case ADD_TODO:
            return [
                ...state,
                {
                    id: state.reduce((maxId, todos) => Math.max(todos.id, maxId) - 1) + 1,
                    text: action.text,
                    completed:false
                }
            ]
        case DELETE_TODO:
            return state.filter(todo =>
                todo.id !== action.id)
        
        case EDIT_TODO:
            return state.map(todo =>
                todo.id === action.id ?
                    { ...todo, text: action.text } : todo)
        
        case COMPLETE_TODO:
            return state.map(todo =>
                todo.id === action.id ?
                    {...todo,completed:!todo.completed}:todo
                )

        case COMPLETE_ALL_TODOS:
            const allCompleted = state.every(todo => todo.completed)
            return state.map(todo => ({
                ...todo,
                completed:!allCompleted
            }))
        
            case CLEAR_COMPLETED:
                return state.filter(todo => todo.completed === false)
        default:
            return state
    }
}