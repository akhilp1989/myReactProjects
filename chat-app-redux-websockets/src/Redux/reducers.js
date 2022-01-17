import { act } from 'react-dom/test-utils';
import {CREATE_ROOM_SUCCESS,JOIN_ROOM_SUCCESS,SET_USERNAME, UPDATE_CHAT_LOG} from './actions'

const initalState = {
    room:null,
    chatLog :[],
    userName : null
}

export default function chatReducer(state,action){
    if(typeof state == 'undefined') return initalState
    switch(action.type){
        case CREATE_ROOM_SUCCESS:
            state.room = action.payload
            break;
        case JOIN_ROOM_SUCCESS:
            state.room = action.payload
            break;
        case SET_USERNAME:
            state.userName = action.userName
            break
        case UPDATE_CHAT_LOG:
            if(state.room!=null && action.update.roomId == state.roomId){
                state.chatLog = [...state.chatLog,action.update.data]
            }
    }
    console.log('state',state)
    return state;
}