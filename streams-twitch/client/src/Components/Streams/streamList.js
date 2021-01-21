import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchStreams } from '../../actions/createStream'
import { Link } from 'react-router-dom'

class StreamList extends Component{
   
    componentDidMount() {
        this.props.fetchStreams()
    }
    
    render() {
        console.log(this.props.streams)
        return (
            
            <div >
                {this.props.streams ? this.props.streams.map(k => (
                    <div key={k.id}>
                        <Link to={`/streams/stream/${k.id}`}
                            style={{ 'header':'header'}}>{k.title}</Link>
                        
                         <p>{k.description}</p>
                        <span>
                            <Link style={{'marginRight':'10px'}} to={`/streams/edit/${k.id}`}>Edit</Link>
                            <Link to={`/streams/delete/${k.id}` }>Delete</Link>
                        </span>
                  </div>
                )) : null}  
                <br />
               
                  
                <Link style={{ 'textAlign': 'right' }} to='/streams/create'>  Create Stream</Link>
        
                
                
       </div>
    )
}
}
const mapStateToProps = (state) => {
    
    return {
        streams:Object.values(state.streamReducer)
    }
}
const mapDispatchToProps = (dispatch) => {
    
    return { fetchStreams: () => dispatch(fetchStreams()) }
}
export default connect(mapStateToProps,mapDispatchToProps)(StreamList)