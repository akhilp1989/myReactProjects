export const songSelectedReducer = (selectedSong=null, action) => {
    if (action.type === 'GET_DETAILS') {
        return action.payload
    }
    return selectedSong
}