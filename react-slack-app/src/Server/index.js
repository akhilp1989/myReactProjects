const PORT = 8088;
const app = require('express')();
const http = require('http').createServer(app);
const  io = require('socket.io')(http,{
    cors: {
        origin:'http://localhost:3000',
        method:['GET','POST']

    }
})
const cors = require('cors');
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
const LoginHelper = require('./LoginHelper');
const loginHelper = new LoginHelper();
app.use(cors());
app.use(bodyParser.json());


app.post('/login',(req,resp)=>{
    console.log(JSON.stringify(req.body.sendingData))
    // const {email,pass} = req.body.=
    // console.log(email)
    resp.send('hello world');

})
app.post('/register',(req,resp)=>{
   loginHelper.createUserProfile(req.body)
   .then(rep=>resp.send(rep))
   .catch(err=>{
       resp.status(400);
       resp.send(err.message);
   });

})

io.on('connection',()=>{
    console.log('connection setup');
})

http.listen(PORT, function(){
	console.log(`listening on ${PORT}`);
});