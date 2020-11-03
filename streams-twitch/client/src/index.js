import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import reportWebVitals from './reportWebVitals';
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore,applyMiddleware } from 'redux'
import { reducer } from './reducer/reducer'
import thunk from 'redux-thunk'
import history from './history'


const store=createStore(reducer,applyMiddleware(thunk))
ReactDOM.render(
  <Provider store={store}>
<React.StrictMode>
    <Router history={history}>
      <App />
      </Router>
  </React.StrictMode>
  </Provider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
