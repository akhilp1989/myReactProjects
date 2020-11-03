import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPosts } from '../actions/action'
import UserList from './userList'

class PostList extends Component{
    constructor(props) {
        super()
        this.userIds=new Set()
    }
    componentDidMount() {
        this.props.fetchPosts()
    }
    updateUserIds = () => {
        this.props.posts.map(k => {

            return this.userIds.add(k.userId)
        })
    }
    render() {
        if (this.props.posts) this.updateUserIds()
        console.log(this.userIds)
        return (
            <div>
                {this.props.posts.length>0 ?
                    this.props.posts.map(k => (
                        <div key={k.id}>
                            <h2>{k.title}</h2>
                           
                            <UserList userId= {k.userId} />
                        </div>
                    ))
                    : null}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        posts:state.posts
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchPosts:()=>dispatch(fetchPosts())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(PostList)
