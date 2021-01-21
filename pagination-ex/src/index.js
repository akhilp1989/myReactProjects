import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import {createStore} from 'redux'
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(

    <BrowserRouter>
    <React.StrictMode>
    <App />
  </React.StrictMode>
    </BrowserRouter>

  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();