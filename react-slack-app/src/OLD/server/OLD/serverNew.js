var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const cors = require('cors');
var uuidv4 = require('uuid').v4;

let rooms = {};
let chatLogs = {};

app.use(cors());

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
    console.log('Connection is on');
	// socket.on('event://send-message', function(msg){
	// 	console.log("got", msg);
		
	// 	const payload = JSON.parse(msg);
	// 	if(chatLogs[payload.roomID]){
	// 		chatLogs[msg.roomID].push(payload.data);
	// 	}
		
	// 	socket.broadcast.emit('event://get-message', msg);
	// })
});
  
http.listen(5000, function(){
	console.log('listening on 5000');
});