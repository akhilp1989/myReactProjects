import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Register from './Components/Auth/Register';
import Login from './Components/Auth/Login';

const Root = ()=>(
  <Router>
    <Switch>
      <Route exact path = '/' component = {App} />
      <Route path = '/login' component = {Login} />
      <Route path = '/register' component = {Register} />
    </Switch>
  </Router>
)
ReactDOM.render(<Root />,document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
