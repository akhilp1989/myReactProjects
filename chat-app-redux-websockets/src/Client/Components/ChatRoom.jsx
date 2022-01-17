import React,{Component} from "react";
import { connect } from "react-redux";
import {setUserName} from '../../Redux/actions'

class ChatRoom extends Component{
   
    constructor(props){
        super(props)
        this.state = {
            userNameInput:null
       }
       this.setUserNameInput  = this.setUserNameInput.bind(this);
       //this.enterRoom = this.enterRoom.bind(this);
    }
    setUserNameInput= (e) =>{
        e.preventDefault();
        this.setState({userNameInput:e.target.value});
    }
    render(){
        console.log(this.props);
        let userNameInput = this.state.userNameInput
        let userName = this.props.userName;
        return(
            <div>
               {!userName && 
               <div className = 'user'>
                   <input type = 'text' placeholder = 'Enter User Name'  onChange = {this.setUserNameInput} />
                   <button  onClick = {()=>this.props.enterRoom(userNameInput)}>Enter Room</button>
               </div>}
               {userName &&
            <div className="room">
                <div className="history"></div>
                <div className="control">
                    <input type="text" />
                    <button>Send</button>
                </div>
            </div>
            }
            </div>
            
        )
    }
}
const mapStateToProps = (state)=>{
    //console.log('mpa is called',state)
    return {
      //  userName:state.userName
    }
}
const mapDispatchToProps = (dispatch)=>{
    console.log('dispatched called')
return {
    enterRoom : (userNameInput)=>dispatch(setUserName(userNameInput))
}

}
   


export default connect(mapStateToProps,mapDispatchToProps)(ChatRoom);