import axios from "axios";
import {API_BASE} from '../Config/config'

export const SEND_MESSAGE_REQUEST = "SEND_MESSAGE_REQUEST"
export const UPDATE_CHAT_LOG = "UPDATE_CHAT_LOG"

// These are our action types
export const CREATE_ROOM_REQUEST = "CREATE_ROOM_REQUEST"
export const CREATE_ROOM_SUCCESS = "CREATE_ROOM_SUCCESS"
export const CREATE_ROOM_ERROR = "CREATE_ROOM_ERROR"

export const JOIN_ROOM_REQUEST = "JOIN_ROOM_REQUEST"
export const JOIN_ROOM_SUCCESS = "JOIN_ROOM_SUCCESS"
export const JOIN_ROOM_ERROR = "JOIN_ROOM_ERROR"

export function createRoomRequest(){
    return{
        type : CREATE_ROOM_REQUEST
    }
}
export function createRoomSuccess(payload){
    return{
        type : CREATE_ROOM_SUCCESS,
        payload
    }
}
export function createRoomError(payload){
    return{
        type : CREATE_ROOM_ERROR,
        payload
    }
}
export function createRoom(roomName){
    return async function(dispatch){
        dispatch(createRoomRequest());
        try{
            const response = await axios.get(`${API_BASE}/room?name=${roomName}`);
            dispatch(createRoomSuccess(response.data));
        }
        catch(error){
            dispatch(createRoomError(error));
        }
    }
}
export function joinRoomRequest(){
    return{
        type : CREATE_ROOM_REQUEST
    }
}
export function joinRoomSuccess(payload){
    return{
        type : CREATE_ROOM_SUCCESS,
        payload
    }
}
export function joinRoomError(payload){
    return{
        type : CREATE_ROOM_ERROR,
        payload
    }
}
export function joinRoom(roomId){
    return async function(dispatch){
        dispatch(joinRoomRequest());
        try{
            const response = await axios.get(`${API_BASE}/room/${roomId}`);
            dispatch(joinRoomSuccess(response.data))
        }
        catch(err){
            dispatch(joinRoomError(err));
        }
    }
}
export const SET_USERNAME = 'SET_USERNAME';
export function setUserName(userName){
    console.log('set here',userName)
    return {
        type:SET_USERNAME,
        userName
    }
}
export function updateChatLog(update){
    return{
        type:UPDATE_CHAT_LOG,
        update
    }
}