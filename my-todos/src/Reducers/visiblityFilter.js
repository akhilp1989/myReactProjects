import { SET_VISIBILITY_FILTER } from '../Constants/ActionTypes'
import { SHOW_ALL } from '../Constants/TodoFilter'

const visibilityFilter = (state = SHOW_ALL, action) => {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

export default visibilityFilter