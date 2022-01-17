import React,{Component} from "react";
import { connect } from "react-redux";
import  {createRoom,joinRoom} from '../../Redux/actions'

import ChatRoom from "./ChatRoom";
class HomeComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            roomName:'',
            roomId:''
        } 
    }
    setRoomName = (e) => {
        this.setState({roomName:e.target.value})
    };
    setRoomId = (e) => {
        this.setState({roomId:e.target.value})
    }
    render(){
        console.log('From home,',this.props.currentRoom)
        return(
            <div>
                {!this.props.currentRoom &&   <div className="create">
                        <div>
                            <span>Create new room</span>
                            <input type="text" placeholder="Room name" value={this.state.roomName} onChange = {this.setRoomName} />
                            <button onClick = {()=>{this.props.createRoom(this.state.roomName)}} >Create</button>
                        </div>
                        <div>
                            <span>Join existing room</span>
                            <input type="text" placeholder="Room code" value={this.state.roomId} onChange = {this.setRoomId} />
                            <button onClick ={()=>this.props.joinRoom(this.state.roomId)} >Join</button>
                        </div>
                    </div> }
            {this.props.currentRoom && <ChatRoom />}
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    console.log('from home is called')
    return {
       currentRoom: state.room
    }
}
const mapDispatchToProps = (dispatch)=>{
    console.log(' from home dispatched called')
return {
    createRoom : (roomName) => dispatch(createRoom(roomName)),
    joinRoom: (roomId) => dispatch(joinRoom(roomId))

}
}
export default connect(mapStateToProps,mapDispatchToProps)(HomeComponent);