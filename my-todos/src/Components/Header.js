import React from 'react'
import PropTypes from 'prop-types'
import TodoTextInput from './TodoTextInput'

const Header = ({ addToDo }) => {
    return (
        <header className='header'>
            <h1>ToDos</h1>
            <TodoTextInput
                newTodo
                onSave={(text) => {
                    if (text.length > 0) {
                        addToDo(text)
                    }
                }}
                
                placeholder="What needs to be done?"
            />

        </header>

    )
}
Header.propTypes = {
    addToDo:PropTypes.func.isRequired
}
export default Header