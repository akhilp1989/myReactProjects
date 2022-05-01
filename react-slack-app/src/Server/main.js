'use strict'
const port = 8088
const fs = require('fs');
const express  = require('express');
const  app = express();
const LoginHelper = require('./LoginHelper');
const https = require('https');
const websocket = require('ws');
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const httpServer = https.createServer(app);
const wss = new websocket.Server({server:httpServer})
app.get('/',(req,resp)=>{
    console.log('get');
})
app.post('/login',(req,resp)=>{
    console.log('post');
    const loginHelper = new LoginHelper();
    loginHelper.validateLogin('abcd');
    resp.send('hiii');
})

wss.addListener('connection',()=>{
    console.log('got a new connection');
})
httpServer.listen(()=>console.log(`listening to ${port}`));