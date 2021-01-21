import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import { deleteStream } from '../../actions/createStream'
import {connect} from 'react-redux'

class StreamDelete extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: true
        }
        this.id = this.props.match.params.id
    }
    handleClose = (e) => {
        this.setState({ show: false })
    }
    render() {
        
       
        return (
            <>
          
        
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header>
                        <Modal.Title>Delete the Record</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose} >
                            Cancel
          </Button>
                        <Button variant="danger" onClick={()=>this.props.deleteStream(this.id)} >
                            Delete
          </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        deleteStream:(id)=>dispatch(deleteStream(id))
    }
}
export default connect(null,mapDispatchToProps)(StreamDelete)