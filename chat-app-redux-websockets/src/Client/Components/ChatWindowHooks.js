import React,{useEffect,useRef,useState} from "react";
import { io } from "socket.io-client";
//let socket = io('http://localhost:5000', {transports: ['websocket']});

const connectToChatServer = ()=>{
    const socket = io('http://localhost:5000', {transports: ['websocket']});
    socket.on('get-message',(msg)=>console.log('From server',msg));
    return socket;
}

function UserInfo(msg){
    const {data,isColorBlind} = msg;
    const color = isColorBlind ? 'black' : '#'+data.data.color
    return (
        <>
        <span style = {{color:color}}><b>{data.id}</b></span>
        <span>{":===> "}</span>
        <span>{data.data.message}</span>
        </>
    )
  
}

const ChatWindowHooks = (props)=>{
    const [text,setText] = useState('');
    const [messages,setMessages] = useState([])
    const [isColorBlind,setColorBlind] = useState(false);
    const [isLoading,setIsLoading] = useState(true);
    const [error, setErrorMessage] = useState(null)
    const socketRef = useRef(null)

useEffect(()=>{
    let socket = connectToChatServer();
    socketRef.current = socket;
    rebuildMessageHistory().then(data =>{
        setIsLoading(false);
        setMessages(data)
      
       
    }) ;
},[])

useEffect (()=>{
    if(!socketRef.current) throw ('No Socket');
    let socket = socketRef.current
    socket.on('get-message',(msgArr)=>{
        setMessages(msgArr);
        
    })
},[messages])
const sendMessage = (e) =>{
    if(e.which == undefined || e.which === 13){
        if(!socketRef.current) throw('No socket');
        let socket = socketRef.current
        socket.emit('send-message',text);
        setText('')
    }
  
}
// if(!socketRef.current) throw('No socket');
// let socket = socketRef.current
//     socket.on('get-message',(msgArr)=>{
//     setMessages(msgArr);
// })

const rebuildMessageHistory = ()=>{
    return fetch('http://localhost:5000')
    .then(res =>res = res.json())
    .then(data=>{
        return data;
    }).catch(err =>{
        setIsLoading(false);
        setErrorMessage(err.message);
    });
}

return(
    <div>
        
        {isLoading ? <div>Loading..</div> : 
        <div>
        <span>Enter text : </span>
        <span></span>
        <input value = {text} onChange = {(e)=>setText(e.target.value)}  onKeyDown = {(e) => sendMessage(e)}/>
        <br />
        <button onClick = {sendMessage}>Send Message</button>
        <br/>
        Color Blind :<input type = 'checkbox' defaultChecked= {isColorBlind} onClick = {(e)=>setColorBlind(e.target.checked)} />
        <br />
        {messages && messages.length > 0 ? messages.map((m,idx)=>{
            return(
                    <li key ={idx}><UserInfo data = {m} isColorBlind = {isColorBlind}  /></li>
               )
        })
    :null}
    
    </div>} 
    </div>
    )


}

export default ChatWindowHooks
