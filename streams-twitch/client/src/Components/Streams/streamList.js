import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchStreams } from '../../actions/createStream'
import {Link} from 'react-router-dom'


class StreamList extends Component{
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.props.fetchStreams()
    }
   
    render() {

        return (
            <div >
                {this.props.streams ? this.props.streams.map(k => (
                    <div key={k.id}>
                       
                         <h1>{k.title}</h1>
                        
                         <h3>{k.description}</h3>
                        <span>
                            <Link style={{'marginRight':'10px'}} to={`/streams/edit/${k.id}`}>Edit</Link>
                            <Link to={`/streams/delete/${k.id}` }>Delete</Link>
                        </span>
                  </div>
                )) : null}  
                <br />
                <Link style= {{'textAlign':'right'}} to ='/streams/create'>Create Stream</Link>
       </div>
    )
}
}
const mapStateToProps = (state) => {
    console.log(state.streamReducer,Object.values(state.streamReducer))
    return {
        streams:Object.values(state.streamReducer)
    }
}
const mapDispatchToProps = (dispatch) => {
    
    return { fetchStreams: () => dispatch(fetchStreams()) }
}
export default connect(mapStateToProps,mapDispatchToProps)(StreamList)