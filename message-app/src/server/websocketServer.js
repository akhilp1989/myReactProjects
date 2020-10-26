const webSocketsServerPort = 8000;
const webSocketServer = require('websocket').server;
const http = require('http');

// Spinning the http server and the websocket server.
const server = http.createServer();
server.listen(webSocketsServerPort);
console.log('listening on port 8000');


const wsServer = new webSocketServer({
  httpServer: server
});



wsServer.on('request', function (request) {

  console.log((new Date()) + ' Recieved a new connection from origin ' + request.origin + '.');

  // You can rewrite this part of the code to accept only the requests from allowed origin
  const connection = request.accept(null, request.origin);
  
  console.log('connected');

  connection.on('message', function(message) {
    if (message.type === 'utf8') {
      console.log('Received Message: ', message.utf8Data);

      // broadcasting message to all connected clients
      
    }
  })
});