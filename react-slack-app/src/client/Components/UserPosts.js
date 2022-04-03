import React, { Component } from './node_modules/react'
import axios from './node_modules/axios'
//import { w3cwebsocket as W3CWebSocket } from "websocket";
const client = new WebSocket('ws://localhost:8000');


class UserPosts extends Component{
    constructor(props) {
        super()
        this.state = {
            responses:[]
        }
        this.SERVER_URL='http://localhost:8000'
    }
    componentDidMount() {
        this.fetch()
        client.addEventListen = ('open', function (e) {
            console.log('connection open')
        })
    }
    

    fetch = () => {
        axios.get('http://localhost:5000')
        .then(resp=>this.populateResponse(resp.data))
      }
    
    populateResponse = (resp) => {
        var origState = [...this.state.responses]
        origState=resp
        this.setState({responses:origState})
    }
    onKeyDownHandler = (e) => {
        if (e.which === 13) {
            var data = {
                user: localStorage.getItem('email'),
                posts:e.target.value
            }
            axios.post(this.SERVER_URL+'/reply',data)
            .then(resp=>this.updateResponse(resp.data))
        }
    }
    updateResponse = (data) => {
        var origPosts = [...this.state.responses]
        origPosts.push(data)
        this.setState({responses:origPosts})
    }
    render() {
      
        return (
            <div>
               
            </div>
        )
    }
    
}

export default UserPosts

