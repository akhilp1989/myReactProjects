import React,{useReducer,useEffect} from "react";
import './App.css'
import * as io from 'socket.io-client'

const socket = io.connect('http://localhost:8088');
socket.on('connect',()=>{
  console.log('Server connected');
})
const App = () =>{
  return(
    <h1 className="slack-welcome">Welcome to chat world</h1>
  )
}
export default App;
