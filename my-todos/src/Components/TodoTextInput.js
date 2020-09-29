import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

class TodoTextInput extends Component {
    static propTypes = {
        onSave: PropTypes.func.isRequired,
        text: PropTypes.string,
        placeHolder: PropTypes.string,
        newTodo: PropTypes.string,
        editing:PropTypes.bool
    }
   state= {
    text:this.props.text || ''
   }

    handleSubmit = (event) => {
        const text = event.target.value.trim()
        if (event.which === 13) {
            this.props.onSave(text)
            if (this.props.newTodo) {
                this.setState({text:''})
            }
        }
    }
    handleChange = (event) => {
       this.setState({text:event.target.value})
    }

    handleBlur = (event) => {
        if (!this.props.newTodo) {
            this.props.onSave(event.target.value)
        }
    }
    render() {
        return (
            <input className={
                classnames({
                    edit: this.props.editing,
                    'new-todo':this.props.newTodo
                })}
                type="text"
                placeholder={this.props.placeHolder}
                value={this.props.text}
                onChange={this.handleChange}
                onKeyDown={this.handleSubmit}
                onBlur={this.handleBlur}
                autoFocus={true} />
        )
    }
}

export default TodoTextInput