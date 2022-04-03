import React, {Component} from './node_modules/react';
import {Header} from './Containers/Header/Header'
import { Switch, Route } from './node_modules/react-router-dom';
import Login from './Components/Login/Login'

class App extends Component  {
  constructor(props) {
    super()
 
  }

  
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={Header} />
          <Route path='/login'
            render={(props) => (
              <Login serverURL={this.SERVER_URL}
              />
            )}
          />
        </Switch>
       
      </div>
    );
  }
}

export default App;
