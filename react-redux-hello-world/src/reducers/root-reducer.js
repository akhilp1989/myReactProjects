import { combineReducers } from 'redux'
import { songListReducer } from './songListReducer'
import { songSelectedReducer } from './songSelectedReducer'

export default combineReducers({
    songs: songListReducer,
    selectedSong:songSelectedReducer
})