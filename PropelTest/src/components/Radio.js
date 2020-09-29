import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

class Radio extends Component {
	constructor() {
        super()
		this.state = {
			radioClick: ""
    };
    this.onChange = this.onChange.bind(this)
    this.updateParent=this.updateParent.bind(this)
	}

  onChange(type) {

    let initialState = { ...this.state }
   initialState.radioClick=type.target.value
    this.setState({ radioClick: initialState.radioClick },
      () => this.updateParent())
    
  }
  updateParent=()=> {
    this.props.onClick(this.state.radioClick)
  }

  render() {
    //console.log(this.state.radioClick)
		return (
  <div className='radioButtons'>
    <div className='left'>
          <input type='radio'
            name='sort'
            value='name'
           onClick={this.onChange} />
      <label>&nbsp;&nbsp;Sort by name</label>
    </div>
    <div className='right'>
          <input type='radio'
            name='sort'
            value='age'
            onClick={this.onChange}
          />
      <label>&nbsp;&nbsp;Sort by age</label>
    </div>
  </div>
);

	}
}

// Uncomment the snippet below
Radio.propTypes = {
	sortBy: PropTypes.func
}

export default Radio;
