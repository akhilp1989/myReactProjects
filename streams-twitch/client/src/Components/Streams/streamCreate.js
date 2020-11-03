import React, { Component }from 'react'
import { Field, reduxForm } from 'redux-form'
import { createStream } from '../../actions/createStream'
import {connect} from 'react-redux'

class StreamCreate extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props)
        
    }
    
    renderInput = (formProps) => {
        return (
            <div>
            <label>{formProps.label}</label>
            <input
                onChange={formProps.input.onChange}
                value={formProps.input.value} />
            </div>
           
        );
    }
    onSubmit = (formValues) => {
        console.log(formValues)
       this.props.createStream(formValues)
        
    }
    render() {
        
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field name='title' component={this.renderInput}  label='Enter Title'/>
                <Field name='description' component={this.renderInput}
                    label='Enter Description' />
                <button >Submit</button>
            </form>
        )
    }
}
const mapPropsToState = (dispatch) => {
   
    return{
        createStream: (formValues) => dispatch(createStream(formValues))
    }
}

export default connect(null,mapPropsToState)(reduxForm({
    form:'StreamCreate'
})(StreamCreate))