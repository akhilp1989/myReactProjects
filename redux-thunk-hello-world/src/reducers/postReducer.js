const origState = []
export const postReducer = (state = origState, action) => {
    if (action.type === 'GET_POSTS') {
        return action.payload
    }
   return state
    
}
export default postReducer