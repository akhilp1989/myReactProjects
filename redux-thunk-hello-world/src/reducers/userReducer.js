const origState = []
export const userReducer = (state = origState, action) => {
    if (action.type === 'GET_USER') {
        return [...origState,action.payload]
    }
   return state
    
}
export default userReducer