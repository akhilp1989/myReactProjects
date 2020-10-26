var express = require('./node_modules/express');
//var axios = require('axios');
var bodyParser = require('./node_modules/body-parser');
var cors = require('./node_modules/cors');
var app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
var PORT = 5000
var userPosts = [{ 'user': 'a@abc.com', 'time_stamp': 1, 'posts': 'Hello from User A' },
    { 'user': 'b@abc.com', 'time_stamp': 1, 'posts': 'Hello from User B' },
    { 'user': 'a@abc.com', 'time_stamp': 2, 'posts': 'Hello from User A again' },
    { 'user': 'b@abc.com', 'time_stamp': 2, 'posts': 'Hello from User B ' },
]
var userDB = new Map()
userDB.set('a@abc.com', '123456')
userDB.set('b@abc.com','1234')
app.get('/', async (req, resp) => {
    resp.send(userPosts);
})
app.post('/login', async (req, resp) => {
    var { email, pass } = req.body
    var check = getLoginDetails(email, pass)
    if (check) {
        resp.send(req.body.email)
    }
})
app.post('/signup', async (req, resp)=>{
    var { email, pass } = req.body
    if (getLoginDetails(email, pass)) {
        console.log('email already exists')
        return 
    }
    else {
        userDB.set(email,pass)
    }
    resp.send('user inserted')
})
app.post('/reply', async (req, resp) => {
    updateUserPost(req.body)
    resp.send(req.body)
})
function updateUserPost(data) {
    userPosts.push(data)
}
function getLoginDetails(email, pass) {
    if (userDB.has(email)) {
        if (userDB.get(email) == pass) {
            return true
        }
        else return false
    }
    else {
        return false
    }
}
app.listen(PORT, () => console.log(` Server running on port ${PORT}`))
