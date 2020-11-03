import React,{Component} from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import {fetchStream, editStream} from '../../actions/createStream'

class StreamEdit extends Component {
    constructor(props) {
        super(props)
        this.id=this.props.match.params.id
    }
    
    componentDidMount() {
        this.props.fetchStream(this.id)
    }
   
    renderInput = (formProps) => {
        return (
            <div>
            <label>{formProps.label}</label>
            <input
                    onChange={formProps.input.onChange}
                    defaultValue={this.props.stream[formProps.input.name]}
                />
            </div>
           
        );
    }
    onSubmit = (formValues) => {
        console.log(formValues)
        
       this.props.editStream(this.id,formValues)
        
    }

    render() {
        if (!this.props.stream) {
            console.log('No stream')
            return <div>Loading...</div>
        }
     
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field name='title' component={this.renderInput}
                    label='Enter Title' />
                <Field name='description' component={this.renderInput}
                    label='Enter Description' />
                <button >Submit</button>
            </form>
        )
 }  
}
const mapStateToProps = (state,ownProps) => {
    let id = ownProps.match.params.id
    return { stream: state.streamReducer[id] }
}
const mapDispatchToProps = (dispatch) => {
    return {
        editStream: (id, formValues) => dispatch(editStream(id, formValues)) ,
        fetchStream:(id)=>dispatch(fetchStream(id))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(reduxForm({
    form:'streamEdit'
})(StreamEdit))








        
        

