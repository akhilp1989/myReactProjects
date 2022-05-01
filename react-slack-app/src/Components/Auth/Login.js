import axios from "axios";
import React,{useState,useCallback} from "react";

const Login = ()=>{
    
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        const {uname , pass} = e.target;
        const sendingData = {
            email:uname.value,
            pass:pass.value

        }
        //axios.get('http://localhost:8088/room').then(resp=>console.log('hi0',resp));
        axios.post('http://localhost:8088/login', {sendingData})
        .then(resp=> console.log(resp));
        
    }
    return(
        <div className = 'login-form'>
             <form onSubmit = {handleSubmit}>
            <label>Email</label>
            <input type = 'email' name  = 'uname' />
            <br/>
            <label>Password</label>
            <input type = 'password' name = 'pass' />
            <br/>
            <button type = 'submit'>Login</button>
        </form>
        </div>
       
    )
}
export default Login