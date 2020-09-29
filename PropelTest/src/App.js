import React, {Component} from 'react';
import Radio from './components/Radio';
import Table from './components/Table';

//import Temp from './components/Temp'

class App extends Component {
  constructor() {
      super()
    this.state = {
      parameterState: ""
    }
    this.sortByParameter=this.sortByParameter.bind(this)
  }

  sortByParameter(parameter) {
    //console.log('parameter-',parameter)
    let initialState = { ...this.state }
    initialState.parameterState = parameter
    //console.log(initialState.parameterState)
    this.setState({parameterState:initialState.parameterState})
    
    // set state of 'parameterState' here
  }

  render() {
    
    return (
      <div className='container-fluid'>
        <center>
          <h1>Birthday Records</h1>
        </center>
        <Radio onClick={this.sortByParameter} />
        <Table sortByParam={this.state.parameterState} />
      </div>
);


  }
}

export default App;
