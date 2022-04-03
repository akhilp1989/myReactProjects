import React, { Component } from './node_modules/react'
import axios from './node_modules/axios'
import { Redirect } from './node_modules/react-router-dom'

class Login extends Component{
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            pass: '',
            loginSuccessful: false
            
        }
        this.serverURL='http://localhost:5000'
        this.loginChangeHandler=this.loginChangeHandler.bind(this)
        
        
    }
     submitForm = (e) => {
        e.preventDefault()
         axios.post(this.serverURL+'/login', this.state)
             .then(resp => this.loginChangeHandler(resp))
     }
    loginChangeHandler = (resp) => {
        if (resp.status === 200 && resp.data !== '') {
            localStorage.setItem('email',resp.data)
           this.setState({loginSuccessful:true})
            
       }
    }
    
    onChangeHandler = (e) => {
        e.preventDefault()
        //console.log(e.target.value)
        const {name,value}=e.target
        this.setState({ [name]: value }, () => {
          // console.log('After-',this.state)
       })
    }

    render() {
        
        if (this.state.loginSuccessful) {
                return <Redirect to='/' />
            }
        return (
           
                < form id = 'login-form' onSubmit = { this.submitForm } >
            <label>User Name: </label>
            <input type='email' name='email'
                onChange={this.onChangeHandler} />
            <br />
            <label>Password : </label>
            <input type='password' name='pass'
                onChange={this.onChangeHandler}
            />
            <br />
            <button type='submit'>Log In </button>
                </form >
            
        )
    }
}
export default Login
