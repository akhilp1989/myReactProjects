var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const cors = require('cors');
var uuidv4 = require('uuid').v4;
app.use(cors());

let rooms = {};
let chatLogs = {};
let usersMap = {};
let messages = [];

function addUniqueIdtoMap(id){
	if(!usersMap[id]){
		usersMap[id] = [];
	}
}

app.get('/room', function (req, res) {
	const room = {
		name: req.query.name,
		id: uuidv4()
	};
	rooms[room.id] = room;
	chatLogs[room.id] = [];
	res.json(room);
});

app.get('/room/:roomId', function (req, res) {
	const roomId = req.params.roomId;
	const response = {
		...rooms[roomId],
		chats: chatLogs[roomId]
	};
	res.json(response);
});

io.on('connection', function(socket){
	console.log('Connected',socket.id);
	socket.on('send-message', function(msg){
		console.log("got", msg);
		messages.push(msg);
	
	// 	const payload = JSON.parse(msg);
	// 	if(chatLogs[payload.roomID]){
	// 		chatLogs[msg.roomID].push(payload.data);
	// 	}
	//const payload = JSON.parse(msg)
	socket.broadcast.emit('get-message', msg);
	 })
});
function printUserIdMap(){
	console.log(JSON.stringify(usersMap));
}
http.listen(5000, function(){
	console.log('listening on 5000');
});