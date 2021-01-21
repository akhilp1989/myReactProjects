import React,{Component} from 'react'
import {connect} from 'react-redux'
import { fetchStream } from '../../actions/createStream'

class streamShow extends Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id)
    }
    render() {
        
        if (!this.props.stream) {
            return <div>Loading...</div>
        }
        return (
            
            <div>
                <h1>{this.props.stream.title}</h1>
                <h3>{this.props.stream.description}</h3>
            </div>
        ) 
    }
    
}
const mapStateToProps = (state, ownProps) => {

    return { stream:state.streamReducer[ownProps.match.params.id] }
}
const mapDispatchToProps = (dispatch) => {
    return {fetchStream:(id)=>dispatch(fetchStream(id))}
}
export default connect(mapStateToProps,mapDispatchToProps)(streamShow)