import axios from "axios";
import React,{useEffect,useState} from "react";
import './styles.scss'

const Register = ()=>{
    const [fname,setFname] = useState('');
    const [lname,setLName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const handleFormSubmit = (e)=>{
        e.preventDefault();
        createUserWithEmailAndPassword();
        //clearStateValues();

    }

    const createUserWithEmailAndPassword = ()=>{
        const data = {fame:fname,lname:lname,email:email,password:password}
        axios.post('http://localhost:8088/register',data)
        .then(resp=>console.log(resp))
        .catch(err=>console.log(err.message))
        .then(clearStateValues);
    }
    const clearStateValues = ()=>{
        setFname('');
        setLName('');
        setEmail('');
        setPassword('');

    }

    return(
        <div className = 'register'>
            <form className = 'register-form' onSubmit = {handleFormSubmit}>
                <label>First Name : </label>
                <input type= 'text' name = 'fname'  onChange = {(e)=>setFname(e.target.value)} val = {fname}/>
                <br/>
                <label>Last Name : </label>
                <input type= 'text' name = 'lname' onChange = {(e)=>setLName(e.target.value)} val = {lname}/>
                <br/>
                <label>Email : </label>
                <input type= 'email' name = 'email' onChange = {(e)=>setEmail(e.target.value)} val = {email} />
                <br/>
                <label>Password : </label>
                <input type= 'password' name = 'password' onChange = {(e)=>setPassword(e.target.value)} val = {password} />
                <br/>
                <button variant = 'primary' type= 'submit'>Register</button>
            </form>
        </div>
    )
}
export default Register