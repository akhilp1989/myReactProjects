import React, { Component } from 'react'
import { fetchUser } from '../actions/action'
import {connect} from 'react-redux'

class User extends Component{
    constructor(props) {
        super(props)
        this.userIdMap=new Map()
    }
    componentDidMount() {
       // this.props.fetchUser(this.props.userId)
    }
    render() {
        //console.log(this.props.userId)
        return (
            <div>User Name</div>
        )
    }
}
const mapStateToProps = (state) => {
   // console.log(state.user[0].name)
    return {
        user:state.user
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchUser:(id)=>dispatch(fetchUser(id))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(User)