import React,{createContext} from "react";
import io from 'socket.io-client';
import { WS_BASE } from "../Config/config";
import {updateChatLog} from '../Redux/actions'
import { useDispatch } from "react-redux";
const WebSocketContext = createContext(null);
export {WebSocketContext}
export default  ({children})=>{
    let socket,ws;
    const dispatch = useDispatch();
    const sendMessage = (roomId,message)=>{
        const payload = {
            roomId:roomId,
            data:message
        }
        socket.emit('event://send-message',JSON.stringify(payload));
        dispatch(updateChatLog(payload));
    }
    if(!socket){
        socket= io.connect(WS_BASE)
        socket.on('event://get-message',(msg)=>{
            const payload  = JSON.parse(msg);
            dispatch(updateChatLog(payload));
        })

        ws = {socket:socket,sendMessage}
    }
    return(
        <WebSocketContext.Provider value={ws}>
            {children}
        </WebSocketContext.Provider>
    )

}

