import React,{Component} from "react";
import { io } from "socket.io-client";
import TextArea from "./TextArea";
let socket = io('http://localhost:5000', {transports: ['websocket']});
class ChatWindow extends Component{
    constructor(){
        super()
        
        this.state = {
            chatHistory:[],
            text:''
        }
    }
    componentDidMount(){
        socket.on('connect',()=>{
            console.log('connected to server');
        })
        socket.on('get-message',(msg)=>{
            //console.log('got',msg);
           let currentdata = [...this.state.chatHistory]
           currentdata.push(msg)
           //currentdata.concat(msg);
           this.setState({chatHistory:currentdata});
        })
    }

    setText = (e)=>{
        e.preventDefault();
        this.setState({text:e.target.value});
    }
    updateChatHistory = (e)=>{
        e.preventDefault()
        let currentHistory = [...this.state.chatHistory,this.state.text];
        this.setState({chatHistory:currentHistory},()=>{
            return this.sendMessage(this.state.chatHistory)
        });
    }
    sendMessage=(e)=>{
        //e.preventDefault();
        if((e.which && e.which == 13) || e.which == undefined){
            this.setState({text:''});
            socket.emit('send-message',this.state.text);
        }
        
    }
    render(){
        return(
            <div>
                <ul>
                {this.state.chatHistory? this.state.chatHistory.map((d,id)=>{
                    return <li key = {id}>{d}</li>
                }):'No feed'}
                </ul>
                <br/>
                <label>
                    Enter your message:
                    <input type='text' value = {this.state.text}  onChange = {this.setText} onKeyPress = {this.sendMessage} ></input>
                </label>
                <button onClick = {this.sendMessage}>Send</button>
                <br />
                <TextArea />
            </div>
        )
    }
}

export default ChatWindow